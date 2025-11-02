/**
 * Cost Analysis Tests
 * 
 * Tests for cost analysis utility functions
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  calculateCostPerUser,
  verifyMonthlyCosts,
  identifyOptimizationOpportunities,
  generateCostAnalysisReport,
  exportCostAnalysisReport,
  calculateCostFor10KUsers,
} from '../costAnalysis';
import { getMetricsService } from '../../services/metricsService';
import { getCostTracker } from '../../services/costTracker';
import type { GeminiLogEntry } from '../../types/gemini';

// Mock services
vi.mock('../../services/metricsService');
vi.mock('../../services/costTracker');

describe('Cost Analysis', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  
  describe('calculateCostPerUser', () => {
    it('should calculate cost per user with typical usage', () => {
      // Mock logs: 100 requests over 10 days
      const mockLogs: GeminiLogEntry[] = [];
      const now = Date.now();
      
      for (let day = 0; day < 10; day++) {
        for (let req = 0; req < 10; req++) {
          mockLogs.push({
            timestamp: now - (day * 86400000) - (req * 1000),
            operation: 'analysis',
            model: 'gemini-2.5-flash-exp',
            latency: 1500,
            tokensUsed: 400,
            cacheHit: false,
            success: true,
          });
        }
      }
      
      // Mock metrics service
      const mockMetricsService = {
        logs: mockLogs,
      };
      vi.mocked(getMetricsService).mockReturnValue(mockMetricsService as any);
      
      // Mock cost tracker
      const mockCostTracker = {
        calculateRequestCost: vi.fn().mockReturnValue(0.0002),
      };
      vi.mocked(getCostTracker).mockReturnValue(mockCostTracker as any);
      
      const result = calculateCostPerUser(30 * 86400000);
      
      expect(result.totalUsers).toBeGreaterThan(0);
      expect(result.averageCostPerUser).toBeGreaterThan(0);
      expect(result.totalCost).toBeCloseTo(0.02, 3); // 100 requests * 0.0002
      expect(result.costDistribution).toHaveLength(5);
    });
    
    it('should return zero values for no data', () => {
      const mockMetricsService = {
        logs: [],
      };
      vi.mocked(getMetricsService).mockReturnValue(mockMetricsService as any);
      
      const result = calculateCostPerUser();
      
      expect(result.totalUsers).toBe(0);
      expect(result.averageCostPerUser).toBe(0);
      expect(result.totalCost).toBe(0);
    });
    
    it('should calculate median and p95 correctly', () => {
      // Create logs with varying costs
      const mockLogs: GeminiLogEntry[] = [];
      const now = Date.now();
      
      // 20 days of data
      for (let day = 0; day < 20; day++) {
        const requestsPerDay = 5 + (day % 10); // Varying requests per day
        for (let req = 0; req < requestsPerDay; req++) {
          mockLogs.push({
            timestamp: now - (day * 86400000),
            operation: 'analysis',
            model: 'gemini-2.5-flash-exp',
            latency: 1500,
            tokensUsed: 300 + (day * 10), // Varying token usage
            cacheHit: false,
            success: true,
          });
        }
      }
      
      const mockMetricsService = {
        logs: mockLogs,
      };
      vi.mocked(getMetricsService).mockReturnValue(mockMetricsService as any);
      
      const mockCostTracker = {
        calculateRequestCost: vi.fn((tokens) => tokens * 0.0000005),
      };
      vi.mocked(getCostTracker).mockReturnValue(mockCostTracker as any);
      
      const result = calculateCostPerUser(30 * 86400000);
      
      expect(result.medianCostPerUser).toBeGreaterThan(0);
      expect(result.p95CostPerUser).toBeGreaterThanOrEqual(result.medianCostPerUser);
      expect(result.p95CostPerUser).toBeGreaterThanOrEqual(result.averageCostPerUser);
    });
  });
  
  describe('verifyMonthlyCosts', () => {
    it('should verify costs are under target', () => {
      const mockCostTracker = {
        getCurrentMonthCost: vi.fn().mockReturnValue(25),
        getProjectedMonthlyCost: vi.fn().mockReturnValue(40),
      };
      vi.mocked(getCostTracker).mockReturnValue(mockCostTracker as any);
      
      const result = verifyMonthlyCosts();
      
      expect(result.currentMonthCost).toBe(25);
      expect(result.projectedMonthCost).toBe(40);
      expect(result.targetCost).toBe(50);
      expect(result.isUnderTarget).toBe(true);
      expect(result.percentageOfTarget).toBe(80);
      expect(result.recommendation).toContain('approaching target');
    });
    
    it('should warn when costs exceed target', () => {
      const mockCostTracker = {
        getCurrentMonthCost: vi.fn().mockReturnValue(45),
        getProjectedMonthlyCost: vi.fn().mockReturnValue(60),
      };
      vi.mocked(getCostTracker).mockReturnValue(mockCostTracker as any);
      
      const result = verifyMonthlyCosts();
      
      expect(result.isUnderTarget).toBe(false);
      expect(result.percentageOfTarget).toBe(120);
      expect(result.recommendation).toContain('exceed');
    });
    
    it('should calculate daily budget remaining', () => {
      const mockCostTracker = {
        getCurrentMonthCost: vi.fn().mockReturnValue(30),
        getProjectedMonthlyCost: vi.fn().mockReturnValue(45),
      };
      vi.mocked(getCostTracker).mockReturnValue(mockCostTracker as any);
      
      const result = verifyMonthlyCosts();
      
      expect(result.daysRemaining).toBeGreaterThanOrEqual(0);
      expect(result.dailyBudgetRemaining).toBeGreaterThanOrEqual(0);
    });
  });
  
  describe('identifyOptimizationOpportunities', () => {
    it('should identify caching optimization when hit rate is low', () => {
      const mockMetrics = {
        totalRequests: 1000,
        estimatedCost: 0.5,
        cacheHitRate: 0.5, // 50% - below 80% target
        requestsByModel: {
          'gemini-2.5-flash-exp': 800,
          'gemini-2.5-pro-exp': 200,
        },
        totalTokensUsed: 400000,
      };
      
      const mockMetricsService = {
        getMetrics: vi.fn().mockReturnValue(mockMetrics),
        getLatencyByOperation: vi.fn().mockReturnValue({}),
        logs: [],
      };
      vi.mocked(getMetricsService).mockReturnValue(mockMetricsService as any);
      
      const mockCostTracker = {
        getHighCostRequests: vi.fn().mockReturnValue([]),
      };
      vi.mocked(getCostTracker).mockReturnValue(mockCostTracker as any);
      
      const opportunities = identifyOptimizationOpportunities();
      
      const cachingOpp = opportunities.find(opp => opp.category === 'caching');
      expect(cachingOpp).toBeDefined();
      expect(cachingOpp?.title).toContain('Cache Hit Rate');
      expect(cachingOpp?.potentialSavings).toBeGreaterThan(0);
    });
    
    it('should identify model selection optimization when Pro is overused', () => {
      const mockMetrics = {
        totalRequests: 1000,
        estimatedCost: 1.0,
        cacheHitRate: 0.85,
        requestsByModel: {
          'gemini-2.5-flash-exp': 300,
          'gemini-2.5-pro-exp': 700, // 70% Pro usage - too high
        },
        totalTokensUsed: 500000,
      };
      
      const mockLogs: GeminiLogEntry[] = [];
      for (let i = 0; i < 700; i++) {
        mockLogs.push({
          timestamp: Date.now() - i * 1000,
          operation: 'enhancement',
          model: 'gemini-2.5-pro-exp',
          latency: 2000,
          tokensUsed: 600,
          cacheHit: false,
          success: true,
        });
      }
      
      const mockMetricsService = {
        getMetrics: vi.fn().mockReturnValue(mockMetrics),
        getLatencyByOperation: vi.fn().mockReturnValue({}),
        logs: mockLogs,
      };
      vi.mocked(getMetricsService).mockReturnValue(mockMetricsService as any);
      
      const mockCostTracker = {
        getHighCostRequests: vi.fn().mockReturnValue([]),
        calculateRequestCost: vi.fn().mockReturnValue(0.001),
      };
      vi.mocked(getCostTracker).mockReturnValue(mockCostTracker as any);
      
      const opportunities = identifyOptimizationOpportunities();
      
      const modelOpp = opportunities.find(opp => opp.category === 'model-selection');
      expect(modelOpp).toBeDefined();
      expect(modelOpp?.title).toContain('Model Selection');
    });
    
    it('should identify token usage optimization when average is high', () => {
      const mockMetrics = {
        totalRequests: 1000,
        estimatedCost: 0.8,
        cacheHitRate: 0.85,
        requestsByModel: {
          'gemini-2.5-flash-exp': 1000,
        },
        totalTokensUsed: 600000, // 600 tokens per request - high
      };
      
      const mockMetricsService = {
        getMetrics: vi.fn().mockReturnValue(mockMetrics),
        getLatencyByOperation: vi.fn().mockReturnValue({}),
        logs: [],
      };
      vi.mocked(getMetricsService).mockReturnValue(mockMetricsService as any);
      
      const mockCostTracker = {
        getHighCostRequests: vi.fn().mockReturnValue([]),
      };
      vi.mocked(getCostTracker).mockReturnValue(mockCostTracker as any);
      
      const opportunities = identifyOptimizationOpportunities();
      
      const tokenOpp = opportunities.find(opp => opp.category === 'token-usage');
      expect(tokenOpp).toBeDefined();
      expect(tokenOpp?.title).toContain('Token Usage');
    });
    
    it('should sort opportunities by potential savings', () => {
      const mockMetrics = {
        totalRequests: 1000,
        estimatedCost: 1.0,
        cacheHitRate: 0.5, // Low cache rate
        requestsByModel: {
          'gemini-2.5-flash-exp': 300,
          'gemini-2.5-pro-exp': 700, // High Pro usage
        },
        totalTokensUsed: 600000, // High token usage
      };
      
      const mockLogs: GeminiLogEntry[] = [];
      for (let i = 0; i < 700; i++) {
        mockLogs.push({
          timestamp: Date.now() - i * 1000,
          operation: 'enhancement',
          model: 'gemini-2.5-pro-exp',
          latency: 2000,
          tokensUsed: 600,
          cacheHit: false,
          success: true,
        });
      }
      
      const mockMetricsService = {
        getMetrics: vi.fn().mockReturnValue(mockMetrics),
        getLatencyByOperation: vi.fn().mockReturnValue({}),
        logs: mockLogs,
      };
      vi.mocked(getMetricsService).mockReturnValue(mockMetricsService as any);
      
      const mockCostTracker = {
        getHighCostRequests: vi.fn().mockReturnValue([]),
        calculateRequestCost: vi.fn().mockReturnValue(0.001),
      };
      vi.mocked(getCostTracker).mockReturnValue(mockCostTracker as any);
      
      const opportunities = identifyOptimizationOpportunities();
      
      // Should be sorted by potential savings descending
      for (let i = 1; i < opportunities.length; i++) {
        expect(opportunities[i - 1]?.potentialSavings).toBeGreaterThanOrEqual(
          opportunities[i]?.potentialSavings ?? 0
        );
      }
    });
  });
  
  describe('generateCostAnalysisReport', () => {
    it('should generate comprehensive report', () => {
      const mockMetrics = {
        totalRequests: 1000,
        estimatedCost: 0.5,
        cacheHitRate: 0.8,
        requestsByModel: {
          'gemini-2.5-flash-exp': 800,
          'gemini-2.5-pro-exp': 200,
        },
        totalTokensUsed: 400000,
      };
      
      const mockLogs: GeminiLogEntry[] = [];
      const now = Date.now();
      for (let i = 0; i < 100; i++) {
        mockLogs.push({
          timestamp: now - i * 86400000,
          operation: 'analysis',
          model: 'gemini-2.5-flash-exp',
          latency: 1500,
          tokensUsed: 400,
          cacheHit: i % 2 === 0,
          success: true,
        });
      }
      
      const mockMetricsService = {
        getMetrics: vi.fn().mockReturnValue(mockMetrics),
        getLatencyByOperation: vi.fn().mockReturnValue({}),
        logs: mockLogs,
      };
      vi.mocked(getMetricsService).mockReturnValue(mockMetricsService as any);
      
      const mockCostTracker = {
        getCurrentMonthCost: vi.fn().mockReturnValue(30),
        getProjectedMonthlyCost: vi.fn().mockReturnValue(45),
        getHighCostRequests: vi.fn().mockReturnValue([]),
        calculateRequestCost: vi.fn().mockReturnValue(0.0005),
      };
      vi.mocked(getCostTracker).mockReturnValue(mockCostTracker as any);
      
      const report = generateCostAnalysisReport();
      
      expect(report.timestamp).toBeGreaterThan(0);
      expect(report.costPerUser).toBeDefined();
      expect(report.monthlyVerification).toBeDefined();
      expect(report.optimizationOpportunities).toBeDefined();
      expect(report.summary).toBeDefined();
      expect(report.summary.totalRequests).toBe(1000);
      expect(report.summary.totalCost).toBe(0.5);
    });
  });
  
  describe('exportCostAnalysisReport', () => {
    it('should export report as formatted text', () => {
      const mockReport = {
        timestamp: Date.now(),
        timeRange: '30 days',
        costPerUser: {
          averageCostPerUser: 0.005,
          medianCostPerUser: 0.004,
          p95CostPerUser: 0.008,
          totalUsers: 1000,
          totalCost: 5.0,
          costDistribution: [
            { range: '$0.000 - $0.001', count: 100, percentage: 10 },
            { range: '$0.001 - $0.005', count: 600, percentage: 60 },
            { range: '$0.005 - $0.010', count: 250, percentage: 25 },
            { range: '$0.010 - $0.050', count: 50, percentage: 5 },
            { range: '$0.050+', count: 0, percentage: 0 },
          ],
        },
        monthlyVerification: {
          currentMonthCost: 30,
          projectedMonthCost: 45,
          targetCost: 50,
          isUnderTarget: true,
          percentageOfTarget: 90,
          daysRemaining: 10,
          dailyBudgetRemaining: 2.0,
          recommendation: 'Costs are on track.',
        },
        optimizationOpportunities: [
          {
            category: 'caching' as const,
            title: 'Improve Cache Hit Rate',
            description: 'Increase cache hit rate to 80%',
            potentialSavings: 0.5,
            savingsPercentage: 10,
            priority: 'medium' as const,
            implementation: 'Implement cache warming',
            effort: 'medium' as const,
          },
        ],
        summary: {
          totalRequests: 10000,
          totalCost: 5.0,
          averageRequestCost: 0.0005,
          cacheHitRate: 0.75,
          estimatedMonthlySavingsFromCache: 3.75,
        },
      };
      
      const exported = exportCostAnalysisReport(mockReport);
      
      expect(exported).toContain('GEMINI AI COST ANALYSIS REPORT');
      expect(exported).toContain('SUMMARY');
      expect(exported).toContain('COST PER USER ANALYSIS');
      expect(exported).toContain('MONTHLY COST VERIFICATION');
      expect(exported).toContain('OPTIMIZATION OPPORTUNITIES');
      expect(exported).toContain('Total Requests: 10,000');
      expect(exported).toContain('$5.0000');
      expect(exported).toContain('✓ UNDER TARGET');
    });
  });
  
  describe('calculateCostFor10KUsers', () => {
    it('should calculate cost for 10K users scenario', () => {
      const mockMetrics = {
        totalRequests: 1000,
        estimatedCost: 0.5,
        cacheHitRate: 0.8,
        requestsByModel: {},
        totalTokensUsed: 400000,
      };
      
      const mockMetricsService = {
        getMetrics: vi.fn().mockReturnValue(mockMetrics),
      };
      vi.mocked(getMetricsService).mockReturnValue(mockMetricsService as any);
      
      const result = calculateCostFor10KUsers();
      
      expect(result.breakdown.requestsPerUser).toBe(10);
      expect(result.breakdown.totalRequests).toBe(100000);
      expect(result.costPerUser).toBeGreaterThan(0);
      expect(result.monthlyCost).toBeGreaterThan(0);
      expect(result.isUnderTarget).toBeDefined();
    });
    
    it('should verify if under $50 target for 10K users', () => {
      const mockMetrics = {
        totalRequests: 1000,
        estimatedCost: 0.4, // Low cost
        cacheHitRate: 0.85,
        requestsByModel: {},
        totalTokensUsed: 300000,
      };
      
      const mockMetricsService = {
        getMetrics: vi.fn().mockReturnValue(mockMetrics),
      };
      vi.mocked(getMetricsService).mockReturnValue(mockMetricsService as any);
      
      const result = calculateCostFor10KUsers();
      
      // With 0.4 cost for 1000 requests, cost per request is 0.0004
      // For 10K users * 10 requests = 100K requests * 0.0004 = $40
      expect(result.monthlyCost).toBeLessThan(50);
      expect(result.isUnderTarget).toBe(true);
    });
    
    it('should use default estimate when no data available', () => {
      const mockMetrics = {
        totalRequests: 0,
        estimatedCost: 0,
        cacheHitRate: 0,
        requestsByModel: {},
        totalTokensUsed: 0,
      };
      
      const mockMetricsService = {
        getMetrics: vi.fn().mockReturnValue(mockMetrics),
      };
      vi.mocked(getMetricsService).mockReturnValue(mockMetricsService as any);
      
      const result = calculateCostFor10KUsers();
      
      // Should use default estimate of 0.0001 per request
      expect(result.breakdown.costPerRequest).toBe(0.0001);
      expect(result.monthlyCost).toBe(10); // 10K users * 10 requests * 0.0001 = 10
    });
  });
});
