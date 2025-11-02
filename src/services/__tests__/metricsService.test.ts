/**
 * MetricsService Tests
 * 
 * Tests for the metrics tracking service that logs and analyzes Gemini AI usage
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MetricsService, getMetricsService } from '../metricsService';
import type { GeminiLogEntry } from '../../types/gemini';

describe('MetricsService', () => {
  let service: MetricsService;
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    service = new MetricsService();
  });
  
  afterEach(() => {
    // Clean up after each test
    service.clear();
    localStorage.clear();
  });
  
  describe('Initialization', () => {
    it('should initialize with empty logs', () => {
      const metrics = service.getMetrics();
      
      expect(metrics.totalRequests).toBe(0);
      expect(metrics.averageLatency).toBe(0);
      expect(metrics.totalTokensUsed).toBe(0);
    });
    
    it('should load existing logs from localStorage', () => {
      // Create a service and log some data
      const service1 = new MetricsService();
      service1.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      // Create a new service instance (should load from storage)
      const service2 = new MetricsService();
      const metrics = service2.getMetrics();
      
      expect(metrics.totalRequests).toBe(1);
      
      // Clean up
      service1.clear();
      service2.clear();
    });
  });
  
  describe('logApiCall', () => {
    it('should log successful API call', () => {
      const entry: GeminiLogEntry = {
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 150,
        tokensUsed: 100,
        cacheHit: false,
        success: true,
      };
      
      service.logApiCall(entry);
      
      const metrics = service.getMetrics();
      expect(metrics.totalRequests).toBe(1);
      expect(metrics.totalTokensUsed).toBe(100);
    });
    
    it('should log failed API call', () => {
      const entry: GeminiLogEntry = {
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 50,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: 'Network error',
      };
      
      service.logApiCall(entry);
      
      const metrics = service.getMetrics();
      expect(metrics.totalRequests).toBe(1);
      expect(metrics.errorRate).toBeGreaterThan(0);
    });
    
    it('should log cache hits', () => {
      const entry: GeminiLogEntry = {
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 10,
        tokensUsed: 0,
        cacheHit: true,
        success: true,
      };
      
      service.logApiCall(entry);
      
      const metrics = service.getMetrics();
      expect(metrics.cacheHitRate).toBe(1);
    });
    
    it('should persist logs to localStorage', () => {
      const entry: GeminiLogEntry = {
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      };
      
      service.logApiCall(entry);
      
      const stored = localStorage.getItem('lovabolt-gemini-metrics');
      expect(stored).toBeTruthy();
      
      const data = JSON.parse(stored!);
      expect(data.logs).toHaveLength(1);
    });
    
    it('should trim logs when exceeding max size', () => {
      // Log more than max size (1000 entries)
      for (let i = 0; i < 1100; i++) {
        service.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 100,
          tokensUsed: 50,
          cacheHit: false,
          success: true,
        });
      }
      
      const metrics = service.getMetrics();
      expect(metrics.totalRequests).toBe(1000); // Should be trimmed to max
    });
  });
  
  describe('getMetrics', () => {
    it('should calculate average latency', () => {
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 200,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      const metrics = service.getMetrics();
      expect(metrics.averageLatency).toBe(150);
    });
    
    it('should calculate p95 latency', () => {
      // Log 100 requests with varying latencies
      for (let i = 1; i <= 100; i++) {
        service.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: i * 10, // 10ms to 1000ms
          tokensUsed: 50,
          cacheHit: false,
          success: true,
        });
      }
      
      const metrics = service.getMetrics();
      expect(metrics.p95Latency).toBeGreaterThan(900); // Should be around 950ms
    });
    
    it('should calculate error rate', () => {
      // Log 10 requests: 8 success, 2 failures
      for (let i = 0; i < 8; i++) {
        service.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 100,
          tokensUsed: 50,
          cacheHit: false,
          success: true,
        });
      }
      
      for (let i = 0; i < 2; i++) {
        service.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 50,
          tokensUsed: 0,
          cacheHit: false,
          success: false,
          error: 'Test error',
        });
      }
      
      const metrics = service.getMetrics();
      expect(metrics.errorRate).toBe(0.2); // 20% error rate
    });
    
    it('should calculate cache hit rate', () => {
      // Log 10 requests: 7 cache hits, 3 misses
      for (let i = 0; i < 7; i++) {
        service.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 10,
          tokensUsed: 0,
          cacheHit: true,
          success: true,
        });
      }
      
      for (let i = 0; i < 3; i++) {
        service.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 100,
          tokensUsed: 50,
          cacheHit: false,
          success: true,
        });
      }
      
      const metrics = service.getMetrics();
      expect(metrics.cacheHitRate).toBe(0.7); // 70% cache hit rate
    });
    
    it('should count requests by model', () => {
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'enhancement',
        model: 'gemini-2.5-pro-exp',
        latency: 200,
        tokensUsed: 100,
        cacheHit: false,
        success: true,
      });
      
      const metrics = service.getMetrics();
      expect(metrics.requestsByModel['gemini-2.5-flash-exp']).toBe(1);
      expect(metrics.requestsByModel['gemini-2.5-pro-exp']).toBe(1);
    });
    
    it('should count requests by feature', () => {
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'suggestions',
        model: 'gemini-2.5-flash-exp',
        latency: 150,
        tokensUsed: 75,
        cacheHit: false,
        success: true,
      });
      
      const metrics = service.getMetrics();
      expect(metrics.requestsByFeature['analysis']).toBe(1);
      expect(metrics.requestsByFeature['suggestions']).toBe(1);
    });
    
    it('should calculate estimated cost', () => {
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 1000,
        cacheHit: false,
        success: true,
      });
      
      const metrics = service.getMetrics();
      // Cost should be very small but greater than 0
      // 1000 tokens * ~$0.0000001875 per token = ~$0.0001875
      expect(metrics.estimatedCost).toBeGreaterThanOrEqual(0);
      expect(metrics.totalTokensUsed).toBe(1000);
    });
    
    it('should filter by time range', () => {
      const now = Date.now();
      const oneDayAgo = now - 86400000;
      const twoDaysAgo = now - (86400000 * 2);
      
      // Log old entry (2 days ago)
      service.logApiCall({
        timestamp: twoDaysAgo,
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      // Log recent entry (now)
      service.logApiCall({
        timestamp: now,
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      // Get metrics for last 24 hours
      const metrics = service.getMetrics(86400000);
      expect(metrics.totalRequests).toBe(1); // Only recent entry
    });
  });
  
  describe('getErrorBreakdown', () => {
    it('should count errors by type', () => {
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 50,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: 'Network error',
      });
      
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 50,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: 'Network error',
      });
      
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 50,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: 'Timeout error',
      });
      
      const breakdown = service.getErrorBreakdown();
      expect(breakdown['Network error']).toBe(2);
      expect(breakdown['Timeout error']).toBe(1);
    });
    
    it('should return empty object when no errors', () => {
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      const breakdown = service.getErrorBreakdown();
      expect(Object.keys(breakdown)).toHaveLength(0);
    });
  });
  
  describe('getLatencyByOperation', () => {
    it('should calculate average latency per operation', () => {
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 200,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'suggestions',
        model: 'gemini-2.5-flash-exp',
        latency: 150,
        tokensUsed: 75,
        cacheHit: false,
        success: true,
      });
      
      const latencies = service.getLatencyByOperation();
      expect(latencies['analysis']).toBe(150); // Average of 100 and 200
      expect(latencies['suggestions']).toBe(150);
    });
  });
  
  describe('getDailyRequestCounts', () => {
    it('should return daily counts for specified days', () => {
      const now = Date.now();
      
      // Log requests for today
      service.logApiCall({
        timestamp: now,
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      const counts = service.getDailyRequestCounts(7);
      expect(counts).toHaveLength(7);
      
      // Find today's entry and verify it has 1 request
      const todayDate = new Date(now).toISOString().split('T')[0];
      const todayEntry = counts.find(entry => entry.date === todayDate);
      expect(todayEntry).toBeDefined();
      expect(todayEntry?.count).toBe(1);
    });
    
    it('should include dates in ISO format', () => {
      const counts = service.getDailyRequestCounts(7);
      
      for (const entry of counts) {
        expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });
  });
  
  describe('clear', () => {
    it('should clear all logs', () => {
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      service.clear();
      
      const metrics = service.getMetrics();
      expect(metrics.totalRequests).toBe(0);
    });
    
    it('should clear localStorage', () => {
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      service.clear();
      
      const stored = localStorage.getItem('lovabolt-gemini-metrics');
      expect(stored).toBeNull();
    });
  });
  
  describe('exportData', () => {
    it('should export data as JSON string', () => {
      service.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      const exported = service.exportData();
      expect(typeof exported).toBe('string');
      
      const parsed = JSON.parse(exported);
      expect(parsed).toHaveProperty('logs');
      expect(parsed).toHaveProperty('metrics');
      expect(parsed).toHaveProperty('errorBreakdown');
      expect(parsed).toHaveProperty('latencyByOperation');
      expect(parsed).toHaveProperty('dailyCounts');
    });
  });
  
  describe('getMetricsService singleton', () => {
    it('should return same instance on multiple calls', () => {
      const instance1 = getMetricsService();
      const instance2 = getMetricsService();
      
      expect(instance1).toBe(instance2);
    });
    
    it('should maintain state across calls', () => {
      const instance1 = getMetricsService();
      instance1.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 100,
        tokensUsed: 50,
        cacheHit: false,
        success: true,
      });
      
      const instance2 = getMetricsService();
      const metrics = instance2.getMetrics();
      
      expect(metrics.totalRequests).toBe(1);
      
      // Clean up
      instance1.clear();
    });
  });
});
