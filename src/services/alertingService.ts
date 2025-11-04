/**
 * Alerting Service
 * 
 * Monitors Gemini AI metrics and triggers alerts when thresholds are exceeded:
 * - High error rates (>5%)
 * - Slow responses (>3s p95)
 * - Cost spikes
 * - Low cache hit rate (<70%)
 */

import { getMetricsService } from './metricsService';
import type { GeminiMetrics } from '../types/gemini';

export type AlertSeverity = 'info' | 'warning' | 'critical';
export type AlertType = 'error-rate' | 'slow-response' | 'cost-spike' | 'cache-hit-rate';

export interface Alert {
  id: string;
  timestamp: number;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  details: Record<string, unknown>;
  acknowledged: boolean;
}

export interface AlertThresholds {
  errorRate: number; // percentage (e.g., 5 for 5%)
  p95Latency: number; // milliseconds (e.g., 3000 for 3s)
  costSpikeMultiplier: number; // multiplier of average (e.g., 2 for 2x)
  cacheHitRate: number; // percentage (e.g., 70 for 70%)
}

export interface AlertingConfig {
  enabled: boolean;
  thresholds: AlertThresholds;
  checkIntervalMs: number;
  maxAlerts: number;
  notificationCallback?: (alert: Alert) => void;
}

interface AlertingStorage {
  alerts: Alert[];
  lastCheck: number;
  config: AlertingConfig;
}

const DEFAULT_THRESHOLDS: AlertThresholds = {
  errorRate: 5, // 5%
  p95Latency: 3000, // 3 seconds
  costSpikeMultiplier: 2, // 2x average
  cacheHitRate: 70, // 70%
};

const DEFAULT_CONFIG: AlertingConfig = {
  enabled: true,
  thresholds: DEFAULT_THRESHOLDS,
  checkIntervalMs: 300000, // 5 minutes
  maxAlerts: 100,
};

export class AlertingService {
  private storageKey = 'webknot-gemini-alerts';
  private alerts: Alert[] = [];
  private config: AlertingConfig;
  private checkInterval: number | null = null;
  private lastCostCheck: number = 0;
  private baselineCost: number = 0;
  
  constructor(config?: Partial<AlertingConfig>) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      thresholds: {
        ...DEFAULT_THRESHOLDS,
        ...(config?.thresholds || {}),
      },
    };
    
    this.loadFromStorage();
    
    if (this.config.enabled) {
      this.startMonitoring();
    }
    
    // Calculate baseline cost from historical data
    this.calculateBaselineCost();
  }
  
  /**
   * Starts periodic monitoring of metrics
   */
  startMonitoring(): void {
    if (this.checkInterval !== null) {
      return; // Already monitoring
    }
    
    console.log('[AlertingService] Starting monitoring');
    
    // Initial check
    this.checkMetrics();
    
    // Set up periodic checks
    this.checkInterval = window.setInterval(() => {
      this.checkMetrics();
    }, this.config.checkIntervalMs);
  }
  
  /**
   * Stops periodic monitoring
   */
  stopMonitoring(): void {
    if (this.checkInterval !== null) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      console.log('[AlertingService] Stopped monitoring');
    }
  }
  
  /**
   * Checks all metrics against thresholds and creates alerts
   */
  checkMetrics(): void {
    const metricsService = getMetricsService();
    const metrics = metricsService.getMetrics(3600000); // Last hour
    
    console.log('[AlertingService] Checking metrics:', {
      errorRate: `${(metrics.errorRate * 100).toFixed(1)}%`,
      p95Latency: `${metrics.p95Latency}ms`,
      cacheHitRate: `${(metrics.cacheHitRate * 100).toFixed(1)}%`,
    });
    
    // Check error rate
    this.checkErrorRate(metrics);
    
    // Check response time
    this.checkResponseTime(metrics);
    
    // Check cache hit rate
    this.checkCacheHitRate(metrics);
    
    // Check cost spikes (less frequently - every 15 minutes)
    const now = Date.now();
    if (now - this.lastCostCheck >= 900000) { // 15 minutes
      this.checkCostSpike();
      this.lastCostCheck = now;
    }
    
    // Clean up old alerts
    this.cleanupOldAlerts();
  }
  
  /**
   * Checks if error rate exceeds threshold
   * 
   * @param metrics - Current metrics
   */
  private checkErrorRate(metrics: GeminiMetrics): void {
    const errorRatePercent = metrics.errorRate * 100;
    const threshold = this.config.thresholds.errorRate;
    
    if (errorRatePercent > threshold && metrics.totalRequests >= 10) {
      // Only alert if we have enough data (at least 10 requests)
      const severity: AlertSeverity = errorRatePercent > threshold * 2 ? 'critical' : 'warning';
      
      this.createAlert({
        type: 'error-rate',
        severity,
        message: `High error rate detected: ${errorRatePercent.toFixed(1)}% (threshold: ${threshold}%)`,
        details: {
          currentErrorRate: errorRatePercent,
          threshold,
          totalRequests: metrics.totalRequests,
          errorCount: Math.round(metrics.totalRequests * metrics.errorRate),
          timeRange: '1 hour',
        },
      });
    }
  }
  
  /**
   * Checks if p95 latency exceeds threshold
   * 
   * @param metrics - Current metrics
   */
  private checkResponseTime(metrics: GeminiMetrics): void {
    const p95Latency = metrics.p95Latency;
    const threshold = this.config.thresholds.p95Latency;
    
    if (p95Latency > threshold && metrics.totalRequests >= 10) {
      // Only alert if we have enough data
      const severity: AlertSeverity = p95Latency > threshold * 1.5 ? 'critical' : 'warning';
      
      this.createAlert({
        type: 'slow-response',
        severity,
        message: `Slow response times detected: ${p95Latency}ms p95 (threshold: ${threshold}ms)`,
        details: {
          p95Latency,
          threshold,
          averageLatency: metrics.averageLatency,
          p99Latency: metrics.p99Latency,
          totalRequests: metrics.totalRequests,
          timeRange: '1 hour',
        },
      });
    }
  }
  
  /**
   * Checks if cache hit rate is below threshold
   * 
   * @param metrics - Current metrics
   */
  private checkCacheHitRate(metrics: GeminiMetrics): void {
    const cacheHitRatePercent = metrics.cacheHitRate * 100;
    const threshold = this.config.thresholds.cacheHitRate;
    
    if (cacheHitRatePercent < threshold && metrics.totalRequests >= 20) {
      // Only alert if we have enough data (at least 20 requests)
      const severity: AlertSeverity = cacheHitRatePercent < threshold * 0.5 ? 'critical' : 'warning';
      
      this.createAlert({
        type: 'cache-hit-rate',
        severity,
        message: `Low cache hit rate: ${cacheHitRatePercent.toFixed(1)}% (threshold: ${threshold}%)`,
        details: {
          currentCacheHitRate: cacheHitRatePercent,
          threshold,
          totalRequests: metrics.totalRequests,
          cacheHits: Math.round(metrics.totalRequests * metrics.cacheHitRate),
          cacheMisses: Math.round(metrics.totalRequests * (1 - metrics.cacheHitRate)),
          timeRange: '1 hour',
        },
      });
    }
  }
  
  /**
   * Checks for cost spikes compared to baseline
   */
  private checkCostSpike(): void {
    const metricsService = getMetricsService();
    
    // Get current hour cost
    const oneHourMs = 3600000;
    const hourMetrics = metricsService.getMetrics(oneHourMs);
    const currentHourlyCost = hourMetrics.estimatedCost;
    
    // Need baseline to compare against
    if (this.baselineCost === 0) {
      this.calculateBaselineCost();
      return;
    }
    
    const multiplier = currentHourlyCost / this.baselineCost;
    const threshold = this.config.thresholds.costSpikeMultiplier;
    
    if (multiplier > threshold && currentHourlyCost > 0.01) {
      // Only alert if cost is significant (>$0.01/hour)
      const severity: AlertSeverity = multiplier > threshold * 2 ? 'critical' : 'warning';
      
      this.createAlert({
        type: 'cost-spike',
        severity,
        message: `Cost spike detected: ${multiplier.toFixed(1)}x baseline (threshold: ${threshold}x)`,
        details: {
          currentHourlyCost: Math.round(currentHourlyCost * 10000) / 10000,
          baselineCost: Math.round(this.baselineCost * 10000) / 10000,
          multiplier: Math.round(multiplier * 10) / 10,
          threshold,
          dailyProjection: Math.round(currentHourlyCost * 24 * 100) / 100,
          monthlyProjection: Math.round(currentHourlyCost * 24 * 30 * 100) / 100,
        },
      });
    }
  }
  
  /**
   * Calculates baseline cost from historical data
   * Uses average hourly cost from past 7 days
   */
  private calculateBaselineCost(): void {
    const metricsService = getMetricsService();
    
    // Get daily request counts for past 7 days
    const dailyCounts = metricsService.getDailyRequestCounts(7);
    
    if (dailyCounts.length === 0) {
      this.baselineCost = 0;
      return;
    }
    
    // Get metrics for past 7 days to calculate cost
    const sevenDaysMs = 7 * 86400000;
    const weekMetrics = metricsService.getMetrics(sevenDaysMs);
    
    // Calculate average hourly cost
    const totalCost = weekMetrics.estimatedCost;
    const totalHours = 7 * 24;
    this.baselineCost = totalCost / totalHours;
    
    console.log('[AlertingService] Calculated baseline cost:', {
      totalCost: Math.round(totalCost * 10000) / 10000,
      baselineHourlyCost: Math.round(this.baselineCost * 10000) / 10000,
    });
  }
  
  /**
   * Creates a new alert if one doesn't already exist for this type
   * 
   * @param alertData - Alert data
   */
  private createAlert(alertData: {
    type: AlertType;
    severity: AlertSeverity;
    message: string;
    details: Record<string, unknown>;
  }): void {
    // Check if similar alert already exists (within last hour)
    const oneHourAgo = Date.now() - 3600000;
    const existingAlert = this.alerts.find(
      alert =>
        alert.type === alertData.type &&
        alert.timestamp > oneHourAgo &&
        !alert.acknowledged
    );
    
    if (existingAlert) {
      console.log('[AlertingService] Similar alert already exists, skipping');
      return;
    }
    
    // Create new alert
    const alert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      type: alertData.type,
      severity: alertData.severity,
      message: alertData.message,
      details: alertData.details,
      acknowledged: false,
    };
    
    this.alerts.push(alert);
    
    // Trim alerts if exceeding max
    if (this.alerts.length > this.config.maxAlerts) {
      this.alerts = this.alerts.slice(-this.config.maxAlerts);
    }
    
    this.saveToStorage();
    
    // Log alert
    console.warn('[AlertingService] Alert created:', {
      type: alert.type,
      severity: alert.severity,
      message: alert.message,
    });
    
    // Call notification callback if provided
    if (this.config.notificationCallback) {
      this.config.notificationCallback(alert);
    }
    
    // Dispatch custom event for UI components to listen to
    window.dispatchEvent(
      new CustomEvent('gemini-alert', {
        detail: alert,
      })
    );
  }
  
  /**
   * Gets all alerts
   * 
   * @param includeAcknowledged - Whether to include acknowledged alerts
   * @returns Array of alerts
   */
  getAlerts(includeAcknowledged: boolean = false): Alert[] {
    if (includeAcknowledged) {
      return [...this.alerts];
    }
    return this.alerts.filter(alert => !alert.acknowledged);
  }
  
  /**
   * Gets alerts by type
   * 
   * @param type - Alert type to filter by
   * @param includeAcknowledged - Whether to include acknowledged alerts
   * @returns Array of alerts
   */
  getAlertsByType(type: AlertType, includeAcknowledged: boolean = false): Alert[] {
    return this.getAlerts(includeAcknowledged).filter(alert => alert.type === type);
  }
  
  /**
   * Gets alerts by severity
   * 
   * @param severity - Alert severity to filter by
   * @param includeAcknowledged - Whether to include acknowledged alerts
   * @returns Array of alerts
   */
  getAlertsBySeverity(severity: AlertSeverity, includeAcknowledged: boolean = false): Alert[] {
    return this.getAlerts(includeAcknowledged).filter(alert => alert.severity === severity);
  }
  
  /**
   * Gets alert by ID
   * 
   * @param id - Alert ID
   * @returns Alert or undefined
   */
  getAlertById(id: string): Alert | undefined {
    return this.alerts.find(alert => alert.id === id);
  }
  
  /**
   * Acknowledges an alert
   * 
   * @param id - Alert ID
   * @returns True if alert was found and acknowledged
   */
  acknowledgeAlert(id: string): boolean {
    const alert = this.alerts.find(a => a.id === id);
    
    if (alert) {
      alert.acknowledged = true;
      this.saveToStorage();
      console.log('[AlertingService] Alert acknowledged:', id);
      return true;
    }
    
    return false;
  }
  
  /**
   * Acknowledges all alerts
   * 
   * @returns Number of alerts acknowledged
   */
  acknowledgeAllAlerts(): number {
    let count = 0;
    
    for (const alert of this.alerts) {
      if (!alert.acknowledged) {
        alert.acknowledged = true;
        count++;
      }
    }
    
    if (count > 0) {
      this.saveToStorage();
      console.log('[AlertingService] Acknowledged all alerts:', count);
    }
    
    return count;
  }
  
  /**
   * Clears acknowledged alerts older than specified time
   * 
   * @param olderThanMs - Time threshold in milliseconds (default: 24 hours)
   * @returns Number of alerts cleared
   */
  clearOldAlerts(olderThanMs: number = 86400000): number {
    const cutoff = Date.now() - olderThanMs;
    const initialCount = this.alerts.length;
    
    this.alerts = this.alerts.filter(
      alert => !alert.acknowledged || alert.timestamp > cutoff
    );
    
    const clearedCount = initialCount - this.alerts.length;
    
    if (clearedCount > 0) {
      this.saveToStorage();
      console.log('[AlertingService] Cleared old alerts:', clearedCount);
    }
    
    return clearedCount;
  }
  
  /**
   * Cleans up old acknowledged alerts (called periodically)
   */
  private cleanupOldAlerts(): void {
    // Clear acknowledged alerts older than 7 days
    this.clearOldAlerts(7 * 86400000);
  }
  
  /**
   * Gets alert statistics
   * 
   * @returns Alert statistics
   */
  getAlertStats(): {
    total: number;
    unacknowledged: number;
    byType: Record<AlertType, number>;
    bySeverity: Record<AlertSeverity, number>;
    last24Hours: number;
  } {
    const oneDayAgo = Date.now() - 86400000;
    
    const stats = {
      total: this.alerts.length,
      unacknowledged: this.alerts.filter(a => !a.acknowledged).length,
      byType: {
        'error-rate': 0,
        'slow-response': 0,
        'cost-spike': 0,
        'cache-hit-rate': 0,
      } as Record<AlertType, number>,
      bySeverity: {
        'info': 0,
        'warning': 0,
        'critical': 0,
      } as Record<AlertSeverity, number>,
      last24Hours: this.alerts.filter(a => a.timestamp > oneDayAgo).length,
    };
    
    for (const alert of this.alerts) {
      stats.byType[alert.type]++;
      stats.bySeverity[alert.severity]++;
    }
    
    return stats;
  }
  
  /**
   * Updates alerting configuration
   * 
   * @param config - Partial configuration to update
   */
  updateConfig(config: Partial<AlertingConfig>): void {
    this.config = {
      ...this.config,
      ...config,
      thresholds: {
        ...this.config.thresholds,
        ...(config.thresholds || {}),
      },
    };
    
    this.saveToStorage();
    
    // Restart monitoring if enabled state changed
    if (config.enabled !== undefined) {
      if (config.enabled) {
        this.startMonitoring();
      } else {
        this.stopMonitoring();
      }
    }
    
    console.log('[AlertingService] Configuration updated:', this.config);
  }
  
  /**
   * Gets current configuration
   * 
   * @returns Current configuration
   */
  getConfig(): AlertingConfig {
    return { ...this.config };
  }
  
  /**
   * Loads data from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      
      if (stored) {
        const data: AlertingStorage = JSON.parse(stored);
        this.alerts = data.alerts || [];
        
        // Merge stored config with defaults
        if (data.config) {
          this.config = {
            ...this.config,
            ...data.config,
            thresholds: {
              ...this.config.thresholds,
              ...(data.config.thresholds || {}),
            },
          };
        }
        
        console.log(`[AlertingService] Loaded ${this.alerts.length} alerts from storage`);
      }
    } catch (error) {
      console.error('[AlertingService] Failed to load from storage:', error);
      this.alerts = [];
    }
  }
  
  /**
   * Saves data to localStorage
   */
  private saveToStorage(): void {
    try {
      const data: AlertingStorage = {
        alerts: this.alerts,
        lastCheck: Date.now(),
        config: this.config,
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('[AlertingService] Failed to save to storage:', error);
      
      // Handle quota exceeded by removing old alerts
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn('[AlertingService] Storage quota exceeded, removing old alerts');
        this.alerts = this.alerts.slice(-50); // Keep only last 50 alerts
        
        try {
          const data: AlertingStorage = {
            alerts: this.alerts,
            lastCheck: Date.now(),
            config: this.config,
          };
          localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (retryError) {
          console.error('[AlertingService] Failed to save after cleanup:', retryError);
        }
      }
    }
  }
  
  /**
   * Clears all alerts and resets configuration
   */
  clear(): void {
    this.stopMonitoring();
    this.alerts = [];
    this.config = { ...DEFAULT_CONFIG };
    
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('[AlertingService] Failed to clear storage:', error);
    }
    
    console.log('[AlertingService] Cleared all data');
  }
  
  /**
   * Exports alerts data as JSON
   * 
   * @returns JSON string of alerts data
   */
  exportData(): string {
    return JSON.stringify({
      alerts: this.alerts,
      stats: this.getAlertStats(),
      config: this.config,
    }, null, 2);
  }
}

// Singleton instance
let alertingServiceInstance: AlertingService | null = null;

/**
 * Gets the singleton AlertingService instance
 */
export function getAlertingService(): AlertingService {
  if (!alertingServiceInstance) {
    alertingServiceInstance = new AlertingService();
  }
  return alertingServiceInstance;
}
