/**
 * Metrics Service
 * 
 * Tracks and analyzes Gemini AI usage metrics including:
 * - API call logging with timestamp, model, tokens
 * - Latency tracking for each request type
 * - Cache hit rate calculation
 * - Error rate monitoring by type
 */

import type { GeminiLogEntry, GeminiMetrics } from '../types/gemini';

interface MetricsStorage {
  logs: GeminiLogEntry[];
  lastCleanup: number;
}

export class MetricsService {
  private storageKey = 'lovabolt-gemini-metrics';
  private maxLogs = 1000; // Keep last 1000 log entries
  private logs: GeminiLogEntry[] = [];
  
  constructor() {
    this.loadFromStorage();
  }
  
  /**
   * Logs an API call with all relevant metrics
   * 
   * @param entry - The log entry to record
   */
  logApiCall(entry: GeminiLogEntry): void {
    this.logs.push(entry);
    
    // Trim logs if exceeding max size
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
    
    // Save to localStorage
    this.saveToStorage();
    
    // Log to console for debugging
    console.log('[MetricsService]', {
      operation: entry.operation,
      model: entry.model,
      latency: `${entry.latency}ms`,
      tokens: entry.tokensUsed,
      cacheHit: entry.cacheHit,
      success: entry.success,
      error: entry.error,
    });
  }
  
  /**
   * Calculates comprehensive metrics from logged data
   * 
   * @param timeRangeMs - Time range to analyze (default: 24 hours)
   * @returns Calculated metrics
   */
  getMetrics(timeRangeMs: number = 86400000): GeminiMetrics {
    const now = Date.now();
    const cutoff = now - timeRangeMs;
    
    // Filter logs within time range
    const recentLogs = this.logs.filter(log => log.timestamp >= cutoff);
    
    if (recentLogs.length === 0) {
      return this.getEmptyMetrics();
    }
    
    // Calculate usage metrics
    const totalRequests = recentLogs.length;
    const requestsByModel: Record<string, number> = {};
    const requestsByFeature: Record<string, number> = {};
    
    for (const log of recentLogs) {
      // Count by model
      requestsByModel[log.model] = (requestsByModel[log.model] || 0) + 1;
      
      // Count by feature
      requestsByFeature[log.operation] = (requestsByFeature[log.operation] || 0) + 1;
    }
    
    // Calculate performance metrics
    const latencies = recentLogs.map(log => log.latency).sort((a, b) => a - b);
    const averageLatency = latencies.reduce((sum, lat) => sum + lat, 0) / latencies.length;
    const p95Index = Math.floor(latencies.length * 0.95);
    const p99Index = Math.floor(latencies.length * 0.99);
    const p95Latency = latencies[p95Index] ?? latencies[latencies.length - 1] ?? 0;
    const p99Latency = latencies[p99Index] ?? latencies[latencies.length - 1] ?? 0;
    
    // Calculate reliability metrics
    const successfulRequests = recentLogs.filter(log => log.success).length;
    const errorRate = 1 - (successfulRequests / totalRequests);
    
    const fallbackRequests = recentLogs.filter(log => !log.success && log.error).length;
    const fallbackRate = fallbackRequests / totalRequests;
    
    const cacheHits = recentLogs.filter(log => log.cacheHit).length;
    const cacheHitRate = cacheHits / totalRequests;
    
    // Calculate cost metrics
    const totalTokensUsed = recentLogs.reduce((sum, log) => sum + log.tokensUsed, 0);
    const estimatedCost = this.calculateCost(recentLogs);
    
    // Estimate cost per user (assuming average 10 requests per user)
    const estimatedUsers = Math.max(1, Math.floor(totalRequests / 10));
    const costPerUser = estimatedCost / estimatedUsers;
    
    return {
      // Usage
      totalRequests,
      requestsByModel,
      requestsByFeature,
      
      // Performance
      averageLatency: Math.round(averageLatency),
      p95Latency: Math.round(p95Latency),
      p99Latency: Math.round(p99Latency),
      
      // Reliability
      errorRate: Math.round(errorRate * 100) / 100,
      fallbackRate: Math.round(fallbackRate * 100) / 100,
      cacheHitRate: Math.round(cacheHitRate * 100) / 100,
      
      // Cost
      totalTokensUsed,
      estimatedCost: Math.round(estimatedCost * 100) / 100,
      costPerUser: Math.round(costPerUser * 10000) / 10000,
    };
  }
  
  /**
   * Gets error breakdown by type
   * 
   * @param timeRangeMs - Time range to analyze (default: 24 hours)
   * @returns Error counts by type
   */
  getErrorBreakdown(timeRangeMs: number = 86400000): Record<string, number> {
    const now = Date.now();
    const cutoff = now - timeRangeMs;
    
    const recentLogs = this.logs.filter(
      log => log.timestamp >= cutoff && !log.success && log.error
    );
    
    const errorCounts: Record<string, number> = {};
    
    for (const log of recentLogs) {
      if (log.error) {
        errorCounts[log.error] = (errorCounts[log.error] || 0) + 1;
      }
    }
    
    return errorCounts;
  }
  
  /**
   * Gets latency breakdown by operation type
   * 
   * @param timeRangeMs - Time range to analyze (default: 24 hours)
   * @returns Average latency by operation
   */
  getLatencyByOperation(timeRangeMs: number = 86400000): Record<string, number> {
    const now = Date.now();
    const cutoff = now - timeRangeMs;
    
    const recentLogs = this.logs.filter(log => log.timestamp >= cutoff);
    
    const latencyByOp: Record<string, number[]> = {};
    
    for (const log of recentLogs) {
      if (!latencyByOp[log.operation]) {
        latencyByOp[log.operation] = [];
      }
      const opArray = latencyByOp[log.operation];
      if (opArray) {
        opArray.push(log.latency);
      }
    }
    
    const averages: Record<string, number> = {};
    
    for (const [operation, latencies] of Object.entries(latencyByOp)) {
      const avg = latencies.reduce((sum, lat) => sum + lat, 0) / latencies.length;
      averages[operation] = Math.round(avg);
    }
    
    return averages;
  }
  
  /**
   * Gets daily request counts for the past N days
   * 
   * @param days - Number of days to retrieve (default: 7)
   * @returns Array of daily counts
   */
  getDailyRequestCounts(days: number = 7): Array<{ date: string; count: number }> {
    const now = Date.now();
    const oneDayMs = 86400000;
    const dailyCounts: Array<{ date: string; count: number }> = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const dayStart = now - (i * oneDayMs);
      const dayEnd = dayStart + oneDayMs;
      
      const count = this.logs.filter(
        log => log.timestamp >= dayStart && log.timestamp < dayEnd
      ).length;
      
      const dateStr = new Date(dayStart).toISOString().split('T')[0];
      dailyCounts.push({ date: dateStr ?? 'Unknown', count });
    }
    
    return dailyCounts;
  }
  
  /**
   * Calculates estimated cost from log entries
   * 
   * @param logs - Log entries to calculate cost for
   * @returns Estimated cost in USD
   */
  private calculateCost(logs: GeminiLogEntry[]): number {
    // Gemini 2.0 Flash pricing (as of 2024)
    // Input: $0.075 per 1M tokens
    // Output: $0.30 per 1M tokens
    // Assuming 50/50 split for simplicity
    const costPerToken = (0.075 + 0.30) / 2 / 1_000_000;
    
    const totalTokens = logs.reduce((sum, log) => sum + log.tokensUsed, 0);
    return totalTokens * costPerToken;
  }
  
  /**
   * Returns empty metrics structure
   */
  private getEmptyMetrics(): GeminiMetrics {
    return {
      totalRequests: 0,
      requestsByModel: {},
      requestsByFeature: {},
      averageLatency: 0,
      p95Latency: 0,
      p99Latency: 0,
      errorRate: 0,
      fallbackRate: 0,
      cacheHitRate: 0,
      totalTokensUsed: 0,
      estimatedCost: 0,
      costPerUser: 0,
    };
  }
  
  /**
   * Loads metrics from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      
      if (stored) {
        const data: MetricsStorage = JSON.parse(stored);
        this.logs = data.logs || [];
        
        console.log(`[MetricsService] Loaded ${this.logs.length} log entries from storage`);
      }
    } catch (error) {
      console.error('[MetricsService] Failed to load from storage:', error);
      this.logs = [];
    }
  }
  
  /**
   * Saves metrics to localStorage
   */
  private saveToStorage(): void {
    try {
      const data: MetricsStorage = {
        logs: this.logs,
        lastCleanup: Date.now(),
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('[MetricsService] Failed to save to storage:', error);
      
      // Handle quota exceeded by removing oldest logs
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn('[MetricsService] Storage quota exceeded, removing oldest logs');
        this.logs = this.logs.slice(-500); // Keep only last 500 logs
        
        try {
          const data: MetricsStorage = {
            logs: this.logs,
            lastCleanup: Date.now(),
          };
          localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (retryError) {
          console.error('[MetricsService] Failed to save after cleanup:', retryError);
        }
      }
    }
  }
  
  /**
   * Clears all metrics data
   */
  clear(): void {
    this.logs = [];
    
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('[MetricsService] Failed to clear storage:', error);
    }
  }
  
  /**
   * Logs a retry attempt for monitoring
   * 
   * @param data - Retry attempt data
   */
  logRetryAttempt(data: {
    timestamp: number;
    attempt: number;
    maxRetries: number;
    error: string;
  }): void {
    console.log('[MetricsService] Retry attempt:', {
      attempt: `${data.attempt}/${data.maxRetries}`,
      error: data.error,
    });
    
    // Could store retry attempts separately if needed for detailed analysis
    // For now, just log to console
  }
  
  /**
   * Logs when all retry attempts are exhausted
   * 
   * @param data - Retry exhaustion data
   */
  logRetryExhausted(data: {
    timestamp: number;
    totalAttempts: number;
    finalError: string;
  }): void {
    console.error('[MetricsService] All retry attempts exhausted:', {
      totalAttempts: data.totalAttempts,
      finalError: data.finalError,
    });
    
    // Could increment a counter for retry exhaustion rate
    // For now, just log to console
  }
  
  /**
   * Exports metrics data as JSON
   * 
   * @returns JSON string of all metrics data
   */
  exportData(): string {
    return JSON.stringify({
      logs: this.logs,
      metrics: this.getMetrics(),
      errorBreakdown: this.getErrorBreakdown(),
      latencyByOperation: this.getLatencyByOperation(),
      dailyCounts: this.getDailyRequestCounts(30),
    }, null, 2);
  }
}

// Singleton instance
let metricsServiceInstance: MetricsService | null = null;

/**
 * Gets the singleton MetricsService instance
 */
export function getMetricsService(): MetricsService {
  if (!metricsServiceInstance) {
    metricsServiceInstance = new MetricsService();
  }
  return metricsServiceInstance;
}
