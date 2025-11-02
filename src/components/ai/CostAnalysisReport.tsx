/**
 * Cost Analysis Report Component
 * 
 * Displays comprehensive cost analysis including:
 * - Cost per user calculations
 * - Monthly cost verification against targets
 * - Optimization opportunities
 */

import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  Users,
  Target,
  Lightbulb,
} from 'lucide-react';
import {
  generateCostAnalysisReport,
  exportCostAnalysisReport,
  calculateCostFor10KUsers,
  type CostAnalysisReport as CostAnalysisReportType,
  type OptimizationOpportunity,
} from '../../utils/costAnalysis';

export const CostAnalysisReport: React.FC = () => {
  const [report, setReport] = useState<CostAnalysisReportType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('30d');
  const [tenKScenario, setTenKScenario] = useState<ReturnType<typeof calculateCostFor10KUsers> | null>(null);
  
  useEffect(() => {
    loadReport();
  }, [timeRange]);
  
  const loadReport = () => {
    setIsLoading(true);
    
    try {
      const timeRangeMs = timeRange === '7d' ? 604800000 : 2592000000;
      const analysisReport = generateCostAnalysisReport(timeRangeMs);
      setReport(analysisReport);
      
      const scenario = calculateCostFor10KUsers();
      setTenKScenario(scenario);
    } catch (error) {
      console.error('Failed to generate cost analysis report:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExport = () => {
    if (!report) return;
    
    const exported = exportCostAnalysisReport(report);
    const blob = new Blob([exported], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cost-analysis-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  if (isLoading || !report) {
    return (
      <div className="p-6 text-center">
        <RefreshCw className="w-8 h-8 text-teal-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Generating cost analysis report...</p>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Cost Analysis Report</h2>
          <p className="text-gray-400">
            Comprehensive analysis of AI costs and optimization opportunities
          </p>
        </div>
        
        <div className="flex gap-2">
          {/* Time Range Selector */}
          <div className="flex gap-2">
            {(['7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  timeRange === range
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {range === '7d' ? '7 Days' : '30 Days'}
              </button>
            ))}
          </div>
          
          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          {/* Refresh Button */}
          <button
            onClick={loadReport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<DollarSign className="w-5 h-5" />}
          title="Total Cost"
          value={`$${report.summary.totalCost.toFixed(4)}`}
          subtitle={`${report.summary.totalRequests.toLocaleString()} requests`}
          color="green"
        />
        
        <SummaryCard
          icon={<Users className="w-5 h-5" />}
          title="Cost Per User"
          value={`$${report.costPerUser.averageCostPerUser.toFixed(6)}`}
          subtitle={`${report.costPerUser.totalUsers.toLocaleString()} users`}
          color="blue"
        />
        
        <SummaryCard
          icon={<TrendingDown className="w-5 h-5" />}
          title="Cache Savings"
          value={`$${report.summary.estimatedMonthlySavingsFromCache.toFixed(4)}`}
          subtitle={`${(report.summary.cacheHitRate * 100).toFixed(1)}% hit rate`}
          color="purple"
        />
        
        <SummaryCard
          icon={<Target className="w-5 h-5" />}
          title="Monthly Target"
          value={report.monthlyVerification.isUnderTarget ? '✓ On Track' : '✗ Over Budget'}
          subtitle={`${report.monthlyVerification.percentageOfTarget.toFixed(0)}% of target`}
          color={report.monthlyVerification.isUnderTarget ? 'teal' : 'red'}
        />
      </div>
      
      {/* Monthly Verification */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 glass-card" />
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-4">
            {report.monthlyVerification.isUnderTarget ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            )}
            <h3 className="text-lg font-semibold text-white">Monthly Cost Verification</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">Current Month</div>
              <div className="text-2xl font-bold text-white">
                ${report.monthlyVerification.currentMonthCost.toFixed(4)}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-1">Projected</div>
              <div className="text-2xl font-bold text-white">
                ${report.monthlyVerification.projectedMonthCost.toFixed(4)}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-1">Target</div>
              <div className="text-2xl font-bold text-white">
                ${report.monthlyVerification.targetCost.toFixed(2)}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Budget Usage</span>
              <span className="text-sm text-white font-medium">
                {report.monthlyVerification.percentageOfTarget.toFixed(1)}%
              </span>
            </div>
            <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  report.monthlyVerification.percentageOfTarget < 80
                    ? 'bg-green-500'
                    : report.monthlyVerification.percentageOfTarget < 100
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{
                  width: `${Math.min(100, report.monthlyVerification.percentageOfTarget)}%`,
                }}
              />
            </div>
          </div>
          
          {/* Recommendation */}
          <div className={`p-4 rounded-lg ${
            report.monthlyVerification.isUnderTarget
              ? 'bg-green-900/30 border border-green-500/30'
              : 'bg-red-900/30 border border-red-500/30'
          }`}>
            <p className="text-sm text-gray-200">
              {report.monthlyVerification.recommendation}
            </p>
          </div>
        </div>
      </div>
      
      {/* 10K Users Scenario */}
      {tenKScenario && (
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 glass-card" />
          <div className="relative p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">10K Users Scenario</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-400 mb-1">Monthly Cost</div>
                <div className="text-2xl font-bold text-white">
                  ${tenKScenario.monthlyCost.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  For 10,000 users
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-400 mb-1">Cost Per User</div>
                <div className="text-2xl font-bold text-white">
                  ${tenKScenario.costPerUser.toFixed(6)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {tenKScenario.breakdown.requestsPerUser} requests/user
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-400 mb-1">Target Status</div>
                <div className={`text-2xl font-bold ${
                  tenKScenario.isUnderTarget ? 'text-green-500' : 'text-red-500'
                }`}>
                  {tenKScenario.isUnderTarget ? '✓ Under $50' : '✗ Over $50'}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {((tenKScenario.monthlyCost / 50) * 100).toFixed(0)}% of target
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Cost Per User Distribution */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 glass-card" />
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-teal-500" />
            <h3 className="text-lg font-semibold text-white">Cost Per User Distribution</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Average</div>
              <div className="text-xl font-bold text-white">
                ${report.costPerUser.averageCostPerUser.toFixed(6)}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Median</div>
              <div className="text-xl font-bold text-white">
                ${report.costPerUser.medianCostPerUser.toFixed(6)}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">P95</div>
              <div className="text-xl font-bold text-white">
                ${report.costPerUser.p95CostPerUser.toFixed(6)}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {report.costPerUser.costDistribution.map((bucket) => (
              <div key={bucket.range}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">{bucket.range}</span>
                  <span className="text-sm text-white font-medium">
                    {bucket.count} users ({bucket.percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-teal-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${bucket.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Optimization Opportunities */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 glass-card" />
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-white">Optimization Opportunities</h3>
          </div>
          
          {report.optimizationOpportunities.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-300 font-medium mb-1">System is Well-Optimized!</p>
              <p className="text-sm text-gray-400">
                No optimization opportunities identified at this time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {report.optimizationOpportunities.map((opp, index) => (
                <OptimizationCard key={index} opportunity={opp} rank={index + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: 'teal' | 'green' | 'red' | 'yellow' | 'blue' | 'purple';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, value, subtitle, color }) => {
  const colorClasses = {
    teal: 'text-teal-500',
    green: 'text-green-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
  };
  
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 glass-card" />
      <div className="relative p-6">
        <div className={`${colorClasses[color]} mb-3`}>
          {icon}
        </div>
        <div className="text-sm text-gray-400 mb-1">{title}</div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
};

interface OptimizationCardProps {
  opportunity: OptimizationOpportunity;
  rank: number;
}

const OptimizationCard: React.FC<OptimizationCardProps> = ({ opportunity, rank }) => {
  const priorityColors = {
    high: 'border-red-500 bg-red-900/20',
    medium: 'border-yellow-500 bg-yellow-900/20',
    low: 'border-blue-500 bg-blue-900/20',
  };
  
  const effortBadges = {
    low: 'bg-green-900/50 text-green-400',
    medium: 'bg-yellow-900/50 text-yellow-400',
    high: 'bg-red-900/50 text-red-400',
  };
  
  return (
    <div className={`border rounded-lg p-4 ${priorityColors[opportunity.priority]}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-white font-bold text-sm">
            {rank}
          </div>
          
          <div className="flex-1">
            <h4 className="text-white font-semibold mb-1">{opportunity.title}</h4>
            <p className="text-sm text-gray-300 mb-2">{opportunity.description}</p>
            
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-1 rounded ${effortBadges[opportunity.effort]}`}>
                {opportunity.effort.toUpperCase()} EFFORT
              </span>
              <span className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300">
                {opportunity.category.toUpperCase()}
              </span>
            </div>
            
            <div className="text-sm text-gray-400 mb-2">
              <strong className="text-gray-300">Implementation:</strong> {opportunity.implementation}
            </div>
          </div>
        </div>
        
        <div className="text-right ml-4">
          <div className="text-lg font-bold text-green-400">
            ${opportunity.potentialSavings.toFixed(4)}
          </div>
          <div className="text-xs text-gray-400">
            {opportunity.savingsPercentage.toFixed(1)}% savings
          </div>
        </div>
      </div>
    </div>
  );
};
