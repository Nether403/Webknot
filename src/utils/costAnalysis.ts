/**
 * Cost Analysis Utility
 * 
 * Provides comprehensive cost analysis for Gemini AI integration including:
 * - Actual cost per user calculation
 * - Monthly cost verification against targets
 * - Optimization opportunity identification
 * - Cost projection and forecasting
 */

import { getMetricsService } from '../services/metricsService';
import { getCostTracker } from '../services/costTracker';
import type { GeminiLogEntry } from '../types/gemini';

export interface CostPerUserAnalysis {
  averageCostPerUser: number;
  medianCostPerUser: number;
  p95CostPerUser: number;
  totalUsers: number;
  totalCost: number;
  costDistribution: {
    range: string;
    count: number;
    percentage: number;
  }[];
}

export interface MonthlyCostVerification {
  currentMonthCost: number;
  projectedMonthCost: number;
  targetCost: number;
  isUnderTarget: boolean;
  percentageOfTarget: number;
  daysRemaining: number;
  dailyBudgetRemaining: number;
  recommendation: string;
}

export interface OptimizationOpportunity {
  category: 'caching' | 'model-selection' | 'token-usage' | 'rate-limiting' | 'batching';
  title: string;
  description: string;
  potentialSavings: number;
  savingsPercentage: number;
  priority: 'high' | 'medium' | 'low';
  implementation: string;
  effort: 'low' | 'medium' | 'high';
}

export interface CostAnalysisReport {
  timestamp: number;
  timeRange: string;
  costPerUser: CostPerUserAnalysis;
  monthlyVerification: MonthlyCostVerification;
  optimizationOpportunities: OptimizationOpportunity[];
  summary: {
    totalRequests: number;
    totalCost: number;
    averageRequestCost: number;
    cacheHitRate: number;
    estimatedMonthlySavingsFromCache: number;
  };
}

/**
 * Calculates actual cost per user based on usage patterns
 * 
 * Assumptions:
 * - Average user makes 10-15 requests per session
 * - Power users make 30+ requests per session
 * - Casual users make 3-5 requests per session
 */
export function calculateCostPerUser(timeRangeMs: number = 2592000000): CostPerUserAnalysis {
  const metricsService = getMetricsService();
  const costTracker = getCostTracker();
  
  // Get all logs in time range
  const logs = (metricsService as any).logs as GeminiLogEntry[];
  const cutoff = Date.now() - timeRangeMs;
  const recentLogs = logs.filter(log => log.timestamp >= cutoff);
  
  if (recentLogs.length === 0) {
    return {
      averageCostPerUser: 0,
      medianCostPerUser: 0,
      p95CostPerUser: 0,
      totalUsers: 0,
      totalCost: 0,
      costDistribution: [],
    };
  }
  
  // Calculate total cost
  const totalCost = recentLogs.reduce((sum, log) => {
    return sum + costTracker.calculateRequestCost(log.tokensUsed, log.model);
  }, 0);
  
  // Estimate users based on request patterns
  // Group requests by day and assume each day represents unique users
  const requestsByDay: Record<string, number> = {};
  
  for (const log of recentLogs) {
    const date = new Date(log.timestamp).toISOString().split('T')[0];
    if (date) {
      requestsByDay[date] = (requestsByDay[date] || 0) + 1;
    }
  }
  
  // Estimate users: assume average 10 requests per user per day
  const avgRequestsPerUser = 10;
  const estimatedUsers = Object.values(requestsByDay).reduce((sum, count) => {
    return sum + Math.ceil(count / avgRequestsPerUser);
  }, 0);
  
  // Calculate cost per user
  const averageCostPerUser = totalCost / Math.max(1, estimatedUsers);
  
  // Calculate cost distribution
  const costPerDay = Object.entries(requestsByDay).map(([date, count]) => {
    const dayCost = recentLogs
      .filter(log => new Date(log.timestamp).toISOString().split('T')[0] === date)
      .reduce((sum, log) => sum + costTracker.calculateRequestCost(log.tokensUsed, log.model), 0);
    
    const dayUsers = Math.ceil(count / avgRequestsPerUser);
    return dayCost / Math.max(1, dayUsers);
  });
  
  // Sort for median and p95
  costPerDay.sort((a, b) => a - b);
  const medianIndex = Math.floor(costPerDay.length / 2);
  const p95Index = Math.floor(costPerDay.length * 0.95);
  
  const medianCostPerUser = costPerDay[medianIndex] ?? 0;
  const p95CostPerUser = costPerDay[p95Index] ?? costPerDay[costPerDay.length - 1] ?? 0;
  
  // Create cost distribution buckets
  const buckets = [
    { range: '$0.000 - $0.001', min: 0, max: 0.001 },
    { range: '$0.001 - $0.005', min: 0.001, max: 0.005 },
    { range: '$0.005 - $0.010', min: 0.005, max: 0.010 },
    { range: '$0.010 - $0.050', min: 0.010, max: 0.050 },
    { range: '$0.050+', min: 0.050, max: Infinity },
  ];
  
  const costDistribution = buckets.map(bucket => {
    const count = costPerDay.filter(cost => cost >= bucket.min && cost < bucket.max).length;
    return {
      range: bucket.range,
      count,
      percentage: (count / Math.max(1, costPerDay.length)) * 100,
    };
  });
  
  return {
    averageCostPerUser,
    medianCostPerUser,
    p95CostPerUser,
    totalUsers: estimatedUsers,
    totalCost,
    costDistribution,
  };
}

/**
 * Verifies monthly costs against target of <$50 for 10K users
 */
export function verifyMonthlyCosts(): MonthlyCostVerification {
  const costTracker = getCostTracker();
  
  // Get current month cost
  const currentMonthCost = costTracker.getCurrentMonthCost();
  
  // Get projected cost
  const projectedMonthCost = costTracker.getProjectedMonthlyCost();
  
  // Target: $50 for 10K users = $0.005 per user
  const targetCost = 50;
  
  // Calculate days remaining in month
  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysRemaining = lastDayOfMonth.getDate() - now.getDate();
  
  // Calculate daily budget remaining
  const dailyBudgetRemaining = daysRemaining > 0 
    ? (targetCost - currentMonthCost) / daysRemaining 
    : 0;
  
  // Determine if under target
  const isUnderTarget = projectedMonthCost <= targetCost;
  const percentageOfTarget = (projectedMonthCost / targetCost) * 100;
  
  // Generate recommendation
  let recommendation: string;
  
  if (isUnderTarget) {
    if (percentageOfTarget < 50) {
      recommendation = 'Excellent! Costs are well below target. Consider enabling more AI features.';
    } else if (percentageOfTarget < 80) {
      recommendation = 'Good! Costs are on track. Continue monitoring usage patterns.';
    } else {
      recommendation = 'Costs are approaching target. Monitor closely and optimize if needed.';
    }
  } else {
    if (percentageOfTarget < 120) {
      recommendation = 'Warning: Projected costs slightly exceed target. Implement optimization strategies.';
    } else if (percentageOfTarget < 150) {
      recommendation = 'Alert: Costs significantly exceed target. Immediate optimization required.';
    } else {
      recommendation = 'Critical: Costs far exceed target. Consider rate limiting or premium tier gating.';
    }
  }
  
  return {
    currentMonthCost,
    projectedMonthCost,
    targetCost,
    isUnderTarget,
    percentageOfTarget,
    daysRemaining,
    dailyBudgetRemaining,
    recommendation,
  };
}

/**
 * Identifies optimization opportunities based on usage patterns
 */
export function identifyOptimizationOpportunities(
  timeRangeMs: number = 2592000000
): OptimizationOpportunity[] {
  const metricsService = getMetricsService();
  const costTracker = getCostTracker();
  const metrics = metricsService.getMetrics(timeRangeMs);
  
  const opportunities: OptimizationOpportunity[] = [];
  
  // 1. Caching Optimization
  if (metrics.cacheHitRate < 0.8) {
    const currentCacheHits = metrics.totalRequests * metrics.cacheHitRate;
    const potentialCacheHits = metrics.totalRequests * 0.8;
    const additionalCacheHits = potentialCacheHits - currentCacheHits;
    
    // Calculate savings from additional cache hits
    const avgCostPerRequest = metrics.estimatedCost / Math.max(1, metrics.totalRequests);
    const potentialSavings = additionalCacheHits * avgCostPerRequest;
    const savingsPercentage = ((potentialSavings / metrics.estimatedCost) * 100);
    
    opportunities.push({
      category: 'caching',
      title: 'Improve Cache Hit Rate',
      description: `Current cache hit rate is ${(metrics.cacheHitRate * 100).toFixed(1)}%. Increasing to 80% could save ${potentialSavings.toFixed(4)} per period.`,
      potentialSavings,
      savingsPercentage,
      priority: savingsPercentage > 20 ? 'high' : savingsPercentage > 10 ? 'medium' : 'low',
      implementation: 'Implement cache warming for common queries, increase TTL for stable responses, add pre-caching for popular project types.',
      effort: 'medium',
    });
  }
  
  // 2. Model Selection Optimization
  const modelCosts = Object.entries(metrics.requestsByModel).map(([model, count]) => {
    const logs = (metricsService as any).logs as GeminiLogEntry[];
    const modelLogs = logs.filter(log => log.model === model);
    const totalCost = modelLogs.reduce((sum, log) => {
      return sum + costTracker.calculateRequestCost(log.tokensUsed, log.model);
    }, 0);
    
    return { model, count, totalCost };
  });
  
  const proUsage = modelCosts.find(m => m.model.includes('pro'));
  if (proUsage && proUsage.count > metrics.totalRequests * 0.3) {
    // Pro model is used more than 30% of the time
    const potentialSavings = proUsage.totalCost * 0.5; // Assume 50% could use Flash
    const savingsPercentage = (potentialSavings / metrics.estimatedCost) * 100;
    
    opportunities.push({
      category: 'model-selection',
      title: 'Optimize Model Selection',
      description: `Pro model is used ${((proUsage.count / metrics.totalRequests) * 100).toFixed(1)}% of the time. Consider using Flash model for simpler operations.`,
      potentialSavings,
      savingsPercentage,
      priority: savingsPercentage > 15 ? 'high' : 'medium',
      implementation: 'Use Flash model for project analysis and suggestions. Reserve Pro model only for prompt enhancement and complex reasoning.',
      effort: 'low',
    });
  }
  
  // 3. Token Usage Optimization
  const avgTokensPerRequest = metrics.totalTokensUsed / Math.max(1, metrics.totalRequests);
  if (avgTokensPerRequest > 500) {
    // Average tokens per request is high
    const targetTokens = 300;
    const tokenReduction = avgTokensPerRequest - targetTokens;
    const potentialSavings = (tokenReduction / avgTokensPerRequest) * metrics.estimatedCost;
    const savingsPercentage = (potentialSavings / metrics.estimatedCost) * 100;
    
    opportunities.push({
      category: 'token-usage',
      title: 'Reduce Token Usage',
      description: `Average ${avgTokensPerRequest.toFixed(0)} tokens per request. Reducing to ${targetTokens} could save ${potentialSavings.toFixed(4)}.`,
      potentialSavings,
      savingsPercentage,
      priority: savingsPercentage > 10 ? 'high' : 'medium',
      implementation: 'Optimize prompts to be more concise, use structured output (JSON), remove unnecessary context from requests.',
      effort: 'medium',
    });
  }
  
  // 4. Rate Limiting Optimization
  const highCostRequests = costTracker.getHighCostRequests(0.001, timeRangeMs);
  if (highCostRequests.length > metrics.totalRequests * 0.1) {
    // More than 10% of requests are high-cost
    const highCostTotal = highCostRequests.reduce((sum, req) => sum + req.cost, 0);
    const potentialSavings = highCostTotal * 0.3; // Assume 30% reduction with better rate limiting
    const savingsPercentage = (potentialSavings / metrics.estimatedCost) * 100;
    
    opportunities.push({
      category: 'rate-limiting',
      title: 'Implement Stricter Rate Limiting',
      description: `${highCostRequests.length} high-cost requests detected. Stricter rate limiting could reduce costs by ${potentialSavings.toFixed(4)}.`,
      potentialSavings,
      savingsPercentage,
      priority: savingsPercentage > 15 ? 'high' : 'medium',
      implementation: 'Reduce free tier limit from 20 to 15 requests/hour, implement progressive rate limiting based on cost.',
      effort: 'low',
    });
  }
  
  // 5. Request Batching Optimization
  const latencyByOp = metricsService.getLatencyByOperation(timeRangeMs);
  const rapidRequests = Object.entries(latencyByOp).filter(([_, latency]) => latency < 100);
  
  if (rapidRequests.length > 0) {
    // Some operations are very fast, indicating potential for batching
    const potentialSavings = metrics.estimatedCost * 0.1; // Assume 10% savings from batching
    const savingsPercentage = 10;
    
    opportunities.push({
      category: 'batching',
      title: 'Implement Request Batching',
      description: 'Multiple rapid requests detected. Batching could reduce API calls and costs.',
      potentialSavings,
      savingsPercentage,
      priority: 'low',
      implementation: 'Implement request queuing and batching for operations that can be combined (e.g., multiple suggestions).',
      effort: 'high',
    });
  }
  
  // Sort by potential savings (descending)
  opportunities.sort((a, b) => b.potentialSavings - a.potentialSavings);
  
  return opportunities;
}

/**
 * Generates a comprehensive cost analysis report
 */
export function generateCostAnalysisReport(timeRangeMs: number = 2592000000): CostAnalysisReport {
  const metricsService = getMetricsService();
  const metrics = metricsService.getMetrics(timeRangeMs);
  
  const costPerUser = calculateCostPerUser(timeRangeMs);
  const monthlyVerification = verifyMonthlyCosts();
  const optimizationOpportunities = identifyOptimizationOpportunities(timeRangeMs);
  
  // Calculate cache savings
  const avgCostPerRequest = metrics.estimatedCost / Math.max(1, metrics.totalRequests);
  const cacheHits = metrics.totalRequests * metrics.cacheHitRate;
  const estimatedMonthlySavingsFromCache = cacheHits * avgCostPerRequest;
  
  return {
    timestamp: Date.now(),
    timeRange: `${timeRangeMs / 86400000} days`,
    costPerUser,
    monthlyVerification,
    optimizationOpportunities,
    summary: {
      totalRequests: metrics.totalRequests,
      totalCost: metrics.estimatedCost,
      averageRequestCost: avgCostPerRequest,
      cacheHitRate: metrics.cacheHitRate,
      estimatedMonthlySavingsFromCache,
    },
  };
}

/**
 * Exports cost analysis report as formatted text
 */
export function exportCostAnalysisReport(report: CostAnalysisReport): string {
  const lines: string[] = [];
  
  lines.push('='.repeat(80));
  lines.push('GEMINI AI COST ANALYSIS REPORT');
  lines.push('='.repeat(80));
  lines.push('');
  lines.push(`Generated: ${new Date(report.timestamp).toISOString()}`);
  lines.push(`Time Range: ${report.timeRange}`);
  lines.push('');
  
  // Summary
  lines.push('SUMMARY');
  lines.push('-'.repeat(80));
  lines.push(`Total Requests: ${report.summary.totalRequests.toLocaleString()}`);
  lines.push(`Total Cost: $${report.summary.totalCost.toFixed(4)}`);
  lines.push(`Average Cost per Request: $${report.summary.averageRequestCost.toFixed(6)}`);
  lines.push(`Cache Hit Rate: ${(report.summary.cacheHitRate * 100).toFixed(1)}%`);
  lines.push(`Estimated Monthly Savings from Cache: $${report.summary.estimatedMonthlySavingsFromCache.toFixed(4)}`);
  lines.push('');
  
  // Cost Per User
  lines.push('COST PER USER ANALYSIS');
  lines.push('-'.repeat(80));
  lines.push(`Total Users (estimated): ${report.costPerUser.totalUsers.toLocaleString()}`);
  lines.push(`Average Cost per User: $${report.costPerUser.averageCostPerUser.toFixed(6)}`);
  lines.push(`Median Cost per User: $${report.costPerUser.medianCostPerUser.toFixed(6)}`);
  lines.push(`P95 Cost per User: $${report.costPerUser.p95CostPerUser.toFixed(6)}`);
  lines.push('');
  lines.push('Cost Distribution:');
  report.costPerUser.costDistribution.forEach(bucket => {
    lines.push(`  ${bucket.range.padEnd(20)} ${bucket.count.toString().padStart(6)} users (${bucket.percentage.toFixed(1)}%)`);
  });
  lines.push('');
  
  // Monthly Verification
  lines.push('MONTHLY COST VERIFICATION');
  lines.push('-'.repeat(80));
  lines.push(`Target: $${report.monthlyVerification.targetCost.toFixed(2)} for 10K users`);
  lines.push(`Current Month Cost: $${report.monthlyVerification.currentMonthCost.toFixed(4)}`);
  lines.push(`Projected Month Cost: $${report.monthlyVerification.projectedMonthCost.toFixed(4)}`);
  lines.push(`Percentage of Target: ${report.monthlyVerification.percentageOfTarget.toFixed(1)}%`);
  lines.push(`Status: ${report.monthlyVerification.isUnderTarget ? '✓ UNDER TARGET' : '✗ OVER TARGET'}`);
  lines.push(`Days Remaining: ${report.monthlyVerification.daysRemaining}`);
  lines.push(`Daily Budget Remaining: $${report.monthlyVerification.dailyBudgetRemaining.toFixed(4)}`);
  lines.push('');
  lines.push(`Recommendation: ${report.monthlyVerification.recommendation}`);
  lines.push('');
  
  // Optimization Opportunities
  lines.push('OPTIMIZATION OPPORTUNITIES');
  lines.push('-'.repeat(80));
  
  if (report.optimizationOpportunities.length === 0) {
    lines.push('No optimization opportunities identified. System is well-optimized!');
  } else {
    report.optimizationOpportunities.forEach((opp, index) => {
      lines.push(`${index + 1}. ${opp.title} [${opp.priority.toUpperCase()} PRIORITY]`);
      lines.push(`   Category: ${opp.category}`);
      lines.push(`   Potential Savings: $${opp.potentialSavings.toFixed(4)} (${opp.savingsPercentage.toFixed(1)}%)`);
      lines.push(`   Implementation Effort: ${opp.effort}`);
      lines.push(`   Description: ${opp.description}`);
      lines.push(`   Implementation: ${opp.implementation}`);
      lines.push('');
    });
  }
  
  lines.push('='.repeat(80));
  lines.push('END OF REPORT');
  lines.push('='.repeat(80));
  
  return lines.join('\n');
}

/**
 * Calculates cost for 10K users scenario
 */
export function calculateCostFor10KUsers(): {
  monthlyCost: number;
  costPerUser: number;
  isUnderTarget: boolean;
  breakdown: {
    requestsPerUser: number;
    costPerRequest: number;
    totalRequests: number;
  };
} {
  const metricsService = getMetricsService();
  const metrics = metricsService.getMetrics(2592000000); // 30 days
  
  // Calculate average cost per request
  const avgCostPerRequest = metrics.totalRequests > 0
    ? metrics.estimatedCost / metrics.totalRequests
    : 0.0001; // Default estimate
  
  // Assume average 10 requests per user per month
  const requestsPerUser = 10;
  const totalUsers = 10000;
  const totalRequests = totalUsers * requestsPerUser;
  
  // Calculate costs
  const costPerUser = avgCostPerRequest * requestsPerUser;
  const monthlyCost = costPerUser * totalUsers;
  
  // Target is $50 for 10K users
  const isUnderTarget = monthlyCost <= 50;
  
  return {
    monthlyCost,
    costPerUser,
    isUnderTarget,
    breakdown: {
      requestsPerUser,
      costPerRequest: avgCostPerRequest,
      totalRequests,
    },
  };
}
