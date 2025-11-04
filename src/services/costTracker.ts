/**
 * Cost Tracker Service
 * 
 * Tracks and monitors Gemini AI costs including:
 * - Cost per request calculation (tokens × price)
 * - Monthly spending tracking
 * - Alerts when approaching $500 threshold
 * - High-cost request logging for optimization
 */

import type { GeminiLogEntry } from '../types/gemini';
import { getMetricsService } from './metricsService';

interface CostAlert {
  timestamp: number;
  message: string;
  severity: 'warning' | 'critical';
  currentCost: number;
  threshold: number;
}

interface CostTrackerStorage {
  alerts: CostAlert[];
  lastAlertCheck: number;
  monthlyBudget: number;
}

export class CostTracker {
  private storageKey = 'webknot-cost-tracker';
  private alerts: CostAlert[] = [];
  private monthlyBudget = 500; // $500 default threshold
  private lastAlertCheck = 0;
  
  // Gemini 2.0 Flash pricing (as of 2024)
  private readonly PRICING = {
    'gemini-2.5-flash-exp': {
      input: 0.075 / 1_000_000,  // $0.075 per 1M tokens
      output: 0.30 / 1_000_000,  // $0.30 per 1M tokens
    },
    'gemini-2.5-pro-exp': {
      input: 0.075 / 1_000_000,  // Same pricing for now
      output: 0.30 / 1_000_000,
    },
  };
  
  constructor() {
    this.loadFromStorage();
  }
  
  /**
   * Calculates cost for a single request
   * 
   * @param tokensUsed - Number of tokens used
   * @param model - Model used for the request
   * @returns Cost in USD
   */
  calculateRequestCost(tokensUsed: number, model: string): number {
    const pricing = this.PRICING[model as keyof typeof this.PRICING];
    
    if (!pricing) {
      // Default to Flash pricing if model not found
      return tokensUsed * ((0.075 + 0.30) / 2 / 1_000_000);
    }
    
    // Assume 50/50 split between input and output tokens
    const avgCostPerToken = (pricing.input + pricing.output) / 2;
    return tokensUsed * avgCostPerToken;
  }
  
  /**
   * Gets monthly spending from metrics
   * 
   * @returns Monthly cost in USD
   */
  getMonthlyCost(): number {
    const metricsService = getMetricsService();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const metrics = metricsService.getMetrics(thirtyDaysMs);
    
    return metrics.estimatedCost;
  }
  
  /**
   * Gets current month spending
   * 
   * @returns Current month cost in USD
   */
  getCurrentMonthCost(): number {
    const metricsService = getMetricsService();
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const timeRangeMs = Date.now() - monthStart.getTime();
    
    const metrics = metricsService.getMetrics(timeRangeMs);
    return metrics.estimatedCost;
  }
  
  /**
   * Checks if cost threshold is approaching and creates alerts
   * 
   * @returns Array of new alerts
   */
  checkThresholds(): CostAlert[] {
    const now = Date.now();
    
    // Only check once per hour
    if (now - this.lastAlertCheck < 3600000) {
      return [];
    }
    
    this.lastAlertCheck = now;
    const currentCost = this.getCurrentMonthCost();
    const newAlerts: CostAlert[] = [];
    
    // Warning at 80% of budget
    const warningThreshold = this.monthlyBudget * 0.8;
    if (currentCost >= warningThreshold && currentCost < this.monthlyBudget) {
      const alert: CostAlert = {
        timestamp: now,
        message: `AI costs approaching budget limit: $${currentCost.toFixed(2)} / $${this.monthlyBudget.toFixed(2)} (${((currentCost / this.monthlyBudget) * 100).toFixed(1)}%)`,
        severity: 'warning',
        currentCost,
        threshold: warningThreshold,
      };
      
      // Only add if we don't have a recent similar alert
      if (!this.hasRecentAlert('warning', 86400000)) { // 24 hours
        newAlerts.push(alert);
        this.alerts.push(alert);
        console.warn('[CostTracker]', alert.message);
      }
    }
    
    // Critical at 100% of budget
    if (currentCost >= this.monthlyBudget) {
      const alert: CostAlert = {
        timestamp: now,
        message: `AI costs exceeded budget limit: $${currentCost.toFixed(2)} / $${this.monthlyBudget.toFixed(2)}`,
        severity: 'critical',
        currentCost,
        threshold: this.monthlyBudget,
      };
      
      // Only add if we don't have a recent similar alert
      if (!this.hasRecentAlert('critical', 86400000)) { // 24 hours
        newAlerts.push(alert);
        this.alerts.push(alert);
        console.error('[CostTracker]', alert.message);
      }
    }
    
    // Save alerts
    if (newAlerts.length > 0) {
      this.saveToStorage();
      
      // Dispatch custom event for UI to listen to
      window.dispatchEvent(new CustomEvent('cost-alert', {
        detail: { alerts: newAlerts },
      }));
    }
    
    return newAlerts;
  }
  
  /**
   * Checks if there's a recent alert of the given severity
   * 
   * @param severity - Alert severity to check
   * @param timeRangeMs - Time range to check (default: 24 hours)
   * @returns True if recent alert exists
   */
  private hasRecentAlert(severity: 'warning' | 'critical', timeRangeMs: number): boolean {
    const cutoff = Date.now() - timeRangeMs;
    return this.alerts.some(
      alert => alert.severity === severity && alert.timestamp >= cutoff
    );
  }
  
  /**
   * Gets high-cost requests for optimization analysis
   * 
   * @param threshold - Cost threshold in USD (default: $0.001)
   * @param timeRangeMs - Time range to analyze (default: 7 days)
   * @returns Array of high-cost log entries
   */
  getHighCostRequests(
    threshold: number = 0.001,
    timeRangeMs: number = 604800000
  ): Array<GeminiLogEntry & { cost: number }> {
    const metricsService = getMetricsService();
    
    // Get all logs (accessing private property - in production, add public getter)
    const logs = (metricsService as any).logs as GeminiLogEntry[];
    
    const cutoff = Date.now() - timeRangeMs;
    const highCostRequests: Array<GeminiLogEntry & { cost: number }> = [];
    
    for (const log of logs) {
      if (log.timestamp < cutoff) continue;
      
      const cost = this.calculateRequestCost(log.tokensUsed, log.model);
      
      if (cost >= threshold) {
        highCostRequests.push({ ...log, cost });
      }
    }
    
    // Sort by cost descending
    highCostRequests.sort((a, b) => b.cost - a.cost);
    
    return highCostRequests;
  }
  
  /**
   * Gets cost breakdown by operation type
   * 
   * @param timeRangeMs - Time range to analyze (default: 30 days)
   * @returns Cost breakdown by operation
   */
  getCostByOperation(timeRangeMs: number = 2592000000): Record<string, number> {
    const metricsService = getMetricsService();
    const logs = (metricsService as any).logs as GeminiLogEntry[];
    
    const cutoff = Date.now() - timeRangeMs;
    const costByOp: Record<string, number> = {};
    
    for (const log of logs) {
      if (log.timestamp < cutoff) continue;
      
      const cost = this.calculateRequestCost(log.tokensUsed, log.model);
      costByOp[log.operation] = (costByOp[log.operation] || 0) + cost;
    }
    
    return costByOp;
  }
  
  /**
   * Gets projected monthly cost based on current usage
   * 
   * @returns Projected cost for the full month
   */
  getProjectedMonthlyCost(): number {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysPassed = now.getDate();
    
    const currentCost = this.getCurrentMonthCost();
    
    // Project based on current daily average
    const dailyAverage = currentCost / daysPassed;
    return dailyAverage * daysInMonth;
  }
  
  /**
   * Gets all alerts
   * 
   * @param timeRangeMs - Time range to retrieve (default: 30 days)
   * @returns Array of alerts
   */
  getAlerts(timeRangeMs: number = 2592000000): CostAlert[] {
    const cutoff = Date.now() - timeRangeMs;
    return this.alerts.filter(alert => alert.timestamp >= cutoff);
  }
  
  /**
   * Sets the monthly budget threshold
   * 
   * @param budget - Budget in USD
   */
  setMonthlyBudget(budget: number): void {
    this.monthlyBudget = budget;
    this.saveToStorage();
  }
  
  /**
   * Gets the current monthly budget
   * 
   * @returns Budget in USD
   */
  getMonthlyBudget(): number {
    return this.monthlyBudget;
  }
  
  /**
   * Clears all alerts
   */
  clearAlerts(): void {
    this.alerts = [];
    this.saveToStorage();
  }
  
  /**
   * Loads data from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      
      if (stored) {
        const data: CostTrackerStorage = JSON.parse(stored);
        this.alerts = data.alerts || [];
        this.lastAlertCheck = data.lastAlertCheck || 0;
        this.monthlyBudget = data.monthlyBudget || 500;
        
        console.log(`[CostTracker] Loaded ${this.alerts.length} alerts from storage`);
      }
    } catch (error) {
      console.error('[CostTracker] Failed to load from storage:', error);
      this.alerts = [];
    }
  }
  
  /**
   * Saves data to localStorage
   */
  private saveToStorage(): void {
    try {
      const data: CostTrackerStorage = {
        alerts: this.alerts,
        lastAlertCheck: this.lastAlertCheck,
        monthlyBudget: this.monthlyBudget,
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('[CostTracker] Failed to save to storage:', error);
    }
  }
}

// Singleton instance
let costTrackerInstance: CostTracker | null = null;

/**
 * Gets the singleton CostTracker instance
 */
export function getCostTracker(): CostTracker {
  if (!costTrackerInstance) {
    costTrackerInstance = new CostTracker();
  }
  return costTrackerInstance;
}

/**
 * Hook to automatically check cost thresholds periodically
 * Call this once in your app initialization
 */
export function initializeCostMonitoring(): void {
  const costTracker = getCostTracker();
  
  // Check thresholds immediately
  costTracker.checkThresholds();
  
  // Check every hour
  setInterval(() => {
    costTracker.checkThresholds();
  }, 3600000);
  
  console.log('[CostTracker] Cost monitoring initialized');
}
