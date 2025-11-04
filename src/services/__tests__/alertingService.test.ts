/**
 * AlertingService Tests
 * 
 * Tests for the alerting service that monitors metrics and triggers alerts
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getAlertingService } from '../alertingService';
import { getMetricsService } from '../metricsService';
import type { GeminiLogEntry } from '../../types/gemini';

describe('AlertingService', () => {
  let service: ReturnType<typeof getAlertingService>;
  let metricsService: ReturnType<typeof getMetricsService>;
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Get fresh instances
    metricsService = getMetricsService();
    metricsService.clear();
    
    service = getAlertingService();
    service.clear(); // Clear any existing data
    service.stopMonitoring(); // Stop any existing monitoring
    
    // Update config for testing
    service.updateConfig({
      enabled: false, // Don't start monitoring automatically in tests
      checkIntervalMs: 1000, // Shorter interval for testing
    });
  });
  
  afterEach(() => {
    // Clean up after each test
    if (service) {
      service.stopMonitoring();
      service.clear();
    }
    metricsService.clear();
    localStorage.clear();
  });
  
  describe('Initialization', () => {
    it('should initialize with default configuration', () => {
      const config = service.getConfig();
      
      expect(config.thresholds.errorRate).toBe(5);
      expect(config.thresholds.p95Latency).toBe(3000);
      expect(config.thresholds.costSpikeMultiplier).toBe(2);
      expect(config.thresholds.cacheHitRate).toBe(70);
    });
    
    it('should persist alerts to localStorage', () => {
      // Manually create an alert
      (service as any).createAlert({
        type: 'error-rate',
        severity: 'warning',
        message: 'Test alert',
        details: {},
      });
      
      // Check that it was saved to localStorage
      const stored = localStorage.getItem('lovabolt-gemini-alerts');
      expect(stored).toBeTruthy();
      
      const data = JSON.parse(stored!);
      expect(data.alerts).toHaveLength(1);
      expect(data.alerts[0].message).toBe('Test alert');
    });
  });
  
  describe('Error Rate Monitoring', () => {
    it('should create alert when error rate exceeds threshold', () => {
      // Log requests with high error rate (6 errors out of 10 = 60%)
      for (let i = 0; i < 4; i++) {
        metricsService.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 100,
          tokensUsed: 50,
          cacheHit: false,
          success: true,
        });
      }
      
      for (let i = 0; i < 6; i++) {
        metricsService.logApiCall({
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
      
      // Check metrics
      service.checkMetrics();
      
      const alerts = service.getAlerts();
      expect(alerts.length).toBeGreaterThan(0);
      
      const errorRateAlert = alerts.find(a => a.type === 'error-rate');
      expect(errorRateAlert).toBeDefined();
      expect(errorRateAlert?.severity).toBe('critical'); // 60% > 10% (2x threshold)
    });
    
    it('should not create alert when error rate is below threshold', () => {
      // Log requests with low error rate (1 error out of 20 = 5%)
      for (let i = 0; i < 19; i++) {
        metricsService.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 100,
          tokensUsed: 50,
          cacheHit: false,
          success: true,
        });
      }
      
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: 'gemini-2.5-flash-exp',
        latency: 50,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: 'Test error',
      });
      
      // Check metrics
      service.checkMetrics();
      
      const alerts = service.getAlerts();
      const errorRateAlert = alerts.find(a => a.type === 'error-rate');
      expect(errorRateAlert).toBeUndefined();
    });
  });
  
  describe('Response Time Monitoring', () => {
    it('should create alert when p95 latency exceeds threshold', () => {
      // Log 100 requests with high latencies
      for (let i = 1; i <= 100; i++) {
        metricsService.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: i * 50, // 50ms to 5000ms
          tokensUsed: 50,
          cacheHit: false,
          success: true,
        });
      }
      
      // Check metrics
      service.checkMetrics();
      
      const alerts = service.getAlerts();
      const slowResponseAlert = alerts.find(a => a.type === 'slow-response');
      expect(slowResponseAlert).toBeDefined();
      expect(slowResponseAlert?.severity).toBe('critical'); // p95 > 4500ms (1.5x threshold)
    });
    
    it('should not create alert when p95 latency is below threshold', () => {
      // Log 100 requests with low latencies
      for (let i = 1; i <= 100; i++) {
        metricsService.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: i * 10, // 10ms to 1000ms
          tokensUsed: 50,
          cacheHit: false,
          success: true,
        });
      }
      
      // Check metrics
      service.checkMetrics();
      
      const alerts = service.getAlerts();
      const slowResponseAlert = alerts.find(a => a.type === 'slow-response');
      expect(slowResponseAlert).toBeUndefined();
    });
  });
  
  describe('Cache Hit Rate Monitoring', () => {
    it('should create alert when cache hit rate is below threshold', () => {
      // Log 20 requests with low cache hit rate (5 hits out of 20 = 25%)
      for (let i = 0; i < 5; i++) {
        metricsService.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 10,
          tokensUsed: 0,
          cacheHit: true,
          success: true,
        });
      }
      
      for (let i = 0; i < 15; i++) {
        metricsService.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 100,
          tokensUsed: 50,
          cacheHit: false,
          success: true,
        });
      }
      
      // Check metrics
      service.checkMetrics();
      
      const alerts = service.getAlerts();
      const cacheAlert = alerts.find(a => a.type === 'cache-hit-rate');
      expect(cacheAlert).toBeDefined();
      expect(cacheAlert?.severity).toBe('critical'); // 25% < 35% (0.5x threshold)
    });
    
    it('should not create alert when cache hit rate is above threshold', () => {
      // Log 20 requests with high cache hit rate (18 hits out of 20 = 90%)
      for (let i = 0; i < 18; i++) {
        metricsService.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 10,
          tokensUsed: 0,
          cacheHit: true,
          success: true,
        });
      }
      
      for (let i = 0; i < 2; i++) {
        metricsService.logApiCall({
          timestamp: Date.now(),
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 100,
          tokensUsed: 50,
          cacheHit: false,
          success: true,
        });
      }
      
      // Check metrics
      service.checkMetrics();
      
      const alerts = service.getAlerts();
      const cacheAlert = alerts.find(a => a.type === 'cache-hit-rate');
      expect(cacheAlert).toBeUndefined();
    });
  });
  
  describe('Alert Management', () => {
    it('should get alerts by type', () => {
      // Create alerts of different types
      (service as any).createAlert({
        type: 'error-rate',
        severity: 'warning',
        message: 'Error rate alert',
        details: {},
      });
      
      (service as any).createAlert({
        type: 'slow-response',
        severity: 'warning',
        message: 'Slow response alert',
        details: {},
      });
      
      const errorAlerts = service.getAlertsByType('error-rate');
      expect(errorAlerts.length).toBe(1);
      expect(errorAlerts[0].type).toBe('error-rate');
    });
    
    it('should get alerts by severity', () => {
      // Create alerts of different severities
      (service as any).createAlert({
        type: 'error-rate',
        severity: 'warning',
        message: 'Warning alert',
        details: {},
      });
      
      (service as any).createAlert({
        type: 'slow-response',
        severity: 'critical',
        message: 'Critical alert',
        details: {},
      });
      
      const criticalAlerts = service.getAlertsBySeverity('critical');
      expect(criticalAlerts.length).toBe(1);
      expect(criticalAlerts[0].severity).toBe('critical');
    });
    
    it('should acknowledge alerts', () => {
      // Create an alert
      (service as any).createAlert({
        type: 'error-rate',
        severity: 'warning',
        message: 'Test alert',
        details: {},
      });
      
      const alerts = service.getAlerts();
      expect(alerts.length).toBe(1);
      
      const alertId = alerts[0].id;
      const acknowledged = service.acknowledgeAlert(alertId);
      
      expect(acknowledged).toBe(true);
      
      const unacknowledgedAlerts = service.getAlerts(false);
      expect(unacknowledgedAlerts.length).toBe(0);
      
      const allAlerts = service.getAlerts(true);
      expect(allAlerts.length).toBe(1);
      expect(allAlerts[0].acknowledged).toBe(true);
    });
    
    it('should acknowledge all alerts', () => {
      // Create multiple alerts
      (service as any).createAlert({
        type: 'error-rate',
        severity: 'warning',
        message: 'Alert 1',
        details: {},
      });
      
      (service as any).createAlert({
        type: 'slow-response',
        severity: 'warning',
        message: 'Alert 2',
        details: {},
      });
      
      const count = service.acknowledgeAllAlerts();
      expect(count).toBe(2);
      
      const unacknowledgedAlerts = service.getAlerts(false);
      expect(unacknowledgedAlerts.length).toBe(0);
    });
    
    it('should clear old acknowledged alerts', () => {
      // Create an old acknowledged alert
      const oldTimestamp = Date.now() - (8 * 86400000); // 8 days ago
      (service as any).alerts.push({
        id: 'old-alert',
        timestamp: oldTimestamp,
        type: 'error-rate',
        severity: 'warning',
        message: 'Old alert',
        details: {},
        acknowledged: true,
      });
      
      // Create a recent acknowledged alert
      (service as any).alerts.push({
        id: 'recent-alert',
        timestamp: Date.now(),
        type: 'error-rate',
        severity: 'warning',
        message: 'Recent alert',
        details: {},
        acknowledged: true,
      });
      
      const clearedCount = service.clearOldAlerts(7 * 86400000); // 7 days
      expect(clearedCount).toBe(1);
      
      const alerts = service.getAlerts(true);
      expect(alerts.length).toBe(1);
      expect(alerts[0].id).toBe('recent-alert');
    });
  });
  
  describe('Alert Statistics', () => {
    it('should calculate alert statistics', () => {
      // Create various alerts with different types to avoid duplicate detection
      (service as any).createAlert({
        type: 'error-rate',
        severity: 'warning',
        message: 'Alert 1',
        details: {},
      });
      
      (service as any).createAlert({
        type: 'slow-response',
        severity: 'critical',
        message: 'Alert 2',
        details: {},
      });
      
      (service as any).createAlert({
        type: 'cache-hit-rate',
        severity: 'warning',
        message: 'Alert 3',
        details: {},
      });
      
      const stats = service.getAlertStats();
      
      expect(stats.total).toBe(3);
      expect(stats.unacknowledged).toBe(3);
      expect(stats.byType['error-rate']).toBe(1);
      expect(stats.byType['slow-response']).toBe(1);
      expect(stats.byType['cache-hit-rate']).toBe(1);
      expect(stats.bySeverity['warning']).toBe(2);
      expect(stats.bySeverity['critical']).toBe(1);
    });
  });
  
  describe('Configuration', () => {
    it('should update configuration', () => {
      service.updateConfig({
        thresholds: {
          errorRate: 10,
          p95Latency: 5000,
          costSpikeMultiplier: 3,
          cacheHitRate: 60,
        },
      });
      
      const config = service.getConfig();
      expect(config.thresholds.errorRate).toBe(10);
      expect(config.thresholds.p95Latency).toBe(5000);
    });
    
    it('should start monitoring when enabled', () => {
      const startSpy = vi.spyOn(service, 'startMonitoring');
      
      service.updateConfig({ enabled: true });
      
      expect(startSpy).toHaveBeenCalled();
      
      service.stopMonitoring();
    });
    
    it('should stop monitoring when disabled', () => {
      service.startMonitoring();
      
      const stopSpy = vi.spyOn(service, 'stopMonitoring');
      
      service.updateConfig({ enabled: false });
      
      expect(stopSpy).toHaveBeenCalled();
    });
  });
  
  describe('Event Dispatching', () => {
    it('should dispatch custom event when alert is created', () => {
      let eventFired = false;
      let eventDetail: any = null;
      
      const handler = (event: Event) => {
        eventFired = true;
        eventDetail = (event as CustomEvent).detail;
      };
      
      window.addEventListener('gemini-alert', handler);
      
      // Trigger an alert
      (service as any).createAlert({
        type: 'error-rate',
        severity: 'warning',
        message: 'Test alert',
        details: {},
      });
      
      expect(eventFired).toBe(true);
      expect(eventDetail).toBeDefined();
      expect(eventDetail.type).toBe('error-rate');
      
      window.removeEventListener('gemini-alert', handler);
    });
  });
  
  describe('Monitoring', () => {
    it('should start and stop monitoring', () => {
      service.startMonitoring();
      expect((service as any).checkInterval).not.toBeNull();
      
      service.stopMonitoring();
      expect((service as any).checkInterval).toBeNull();
    });
    
    it('should not start monitoring twice', () => {
      service.startMonitoring();
      const interval1 = (service as any).checkInterval;
      
      service.startMonitoring();
      const interval2 = (service as any).checkInterval;
      
      expect(interval1).toBe(interval2);
      
      service.stopMonitoring();
    });
  });
  
  describe('Data Export', () => {
    it('should export data as JSON string', () => {
      // Create an alert
      (service as any).createAlert({
        type: 'error-rate',
        severity: 'warning',
        message: 'Test alert',
        details: {},
      });
      
      const exported = service.exportData();
      expect(typeof exported).toBe('string');
      
      const parsed = JSON.parse(exported);
      expect(parsed).toHaveProperty('alerts');
      expect(parsed).toHaveProperty('stats');
      expect(parsed).toHaveProperty('config');
    });
  });
  
  describe('getAlertingService singleton', () => {
    it('should return same instance on multiple calls', () => {
      const instance1 = getAlertingService();
      const instance2 = getAlertingService();
      
      expect(instance1).toBe(instance2);
      
      // Clean up
      instance1.stopMonitoring();
      instance1.clear();
    });
  });
});
