/**
 * Comprehensive Analytics Dashboard Component
 * 
 * Advanced analytics dashboard with:
 * - AI feature adoption rate
 * - User engagement metrics
 * - Cost trends over time
 * - ROI calculations
 * - User segmentation
 */

import React, { useState, useEffect } from 'react';
import {
  Activity,
  DollarSign,
  TrendingUp,
  Users,
  Target,
  PieChart,
  Zap,
  RefreshCw,
} from 'lucide-react';
import { getAnalyticsService } from '../../services/analyticsService';
import type {
  AdoptionMetrics,
  EngagementMetrics,
  CostTrend,
  ROIMetrics,
  UserSegment,
} from '../../services/analyticsService';

export const ComprehensiveAnalyticsDashboard: React.FC = () => {
  const [adoptionMetrics, setAdoptionMetrics] = useState<AdoptionMetrics | null>(null);
  const [engagementMetrics, setEngagementMetrics] = useState<EngagementMetrics | null>(null);
  const [costTrends, setCostTrends] = useState<CostTrend[]>([]);
  const [roiMetrics, setROIMetrics] = useState<ROIMetrics | null>(null);
  const [userSegments, setUserSegments] = useState<UserSegment[]>([]);
  const [featureUsageBySegment, setFeatureUsageBySegment] = useState<{
    segment: 'free' | 'premium' | 'power' | 'casual';
    features: Record<string, number>;
    totalRequests: number;
  }[]>([]);
  const [powerUsers, setPowerUsers] = useState<{
    userId: string;
    requests: number;
    cost: number;
    isPremium: boolean;
    featuresUsed: string[];
    lastActive: string;
    daysSinceFirstSeen: number;
  }[]>([]);
  const [conversionMetrics, setConversionMetrics] = useState<{
    totalFreeUsers: number;
    totalPremiumUsers: number;
    conversionRate: number;
    avgTimeToConversion: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<7 | 30 | 90>(30);
  
  const analyticsService = getAnalyticsService();
  
  // Load all metrics
  const loadMetrics = () => {
    setIsLoading(true);
    
    try {
      setAdoptionMetrics(analyticsService.getAdoptionMetrics());
      setEngagementMetrics(analyticsService.getEngagementMetrics());
      setCostTrends(analyticsService.getCostTrends(selectedTimeRange));
      setROIMetrics(analyticsService.getROIMetrics());
      setUserSegments(analyticsService.getUserSegmentation());
      setFeatureUsageBySegment(analyticsService.getFeatureUsageBySegment());
      setPowerUsers(analyticsService.getPowerUsers(10));
      setConversionMetrics(analyticsService.getConversionMetrics());
    } catch (error) {
      console.error('[ComprehensiveAnalyticsDashboard] Failed to load metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadMetrics();
  }, [selectedTimeRange]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-teal-500" />
          <span className="text-gray-300">Loading analytics...</span>
        </div>
      </div>
    );
  }

  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400">Comprehensive AI feature metrics and insights</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex items-center gap-2 glass-card p-1 rounded-lg">
            {[7, 30, 90].map((days) => (
              <button
                key={days}
                onClick={() => setSelectedTimeRange(days as 7 | 30 | 90)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedTimeRange === days
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {days}d
              </button>
            ))}
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={loadMetrics}
            className="glass-card p-3 rounded-lg hover:bg-white/10 transition-all"
            aria-label="Refresh metrics"
          >
            <RefreshCw className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
      
      {/* Adoption Metrics */}
      {adoptionMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            title="Total Users"
            value={adoptionMetrics.totalUsers.toLocaleString()}
            subtitle="All users"
            color="blue"
          />
          <MetricCard
            icon={<Zap className="w-6 h-6" />}
            title="AI Users"
            value={adoptionMetrics.aiUsers.toLocaleString()}
            subtitle={`${(adoptionMetrics.adoptionRate * 100).toFixed(1)}% adoption`}
            color="teal"
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="New This Week"
            value={adoptionMetrics.newUsersThisWeek.toLocaleString()}
            subtitle="Weekly growth"
            color="green"
          />
          <MetricCard
            icon={<Activity className="w-6 h-6" />}
            title="New This Month"
            value={adoptionMetrics.newUsersThisMonth.toLocaleString()}
            subtitle="Monthly growth"
            color="purple"
          />
        </div>
      )}

      
      {/* Engagement Metrics */}
      {engagementMetrics && (
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-teal-500" />
            <h3 className="text-xl font-bold text-white">User Engagement</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                {engagementMetrics.averageRequestsPerUser.toFixed(1)}
              </div>
              <div className="text-sm text-gray-400">Avg Requests per User</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                {Math.floor(engagementMetrics.averageSessionDuration / 60)}m {engagementMetrics.averageSessionDuration % 60}s
              </div>
              <div className="text-sm text-gray-400">Avg Session Duration</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                {(engagementMetrics.returnUserRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Return User Rate</div>
            </div>
          </div>
          
          {/* Feature Usage */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-sm font-semibold text-gray-300 mb-3">Feature Usage</div>
            <div className="space-y-2">
              {Object.entries(engagementMetrics.featureUsageRate)
                .sort(([, a], [, b]) => b - a)
                .map(([feature, rate]) => (
                  <div key={feature} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 capitalize">{feature}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full"
                          style={{ width: `${rate * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-white font-medium w-12 text-right">
                        {(rate * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      
      {/* Cost Trends */}
      {costTrends.length > 0 && (
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-teal-500" />
            <h3 className="text-xl font-bold text-white">Cost Trends</h3>
          </div>
          
          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">
                  ${costTrends.reduce((sum, t) => sum + t.cost, 0).toFixed(4)}
                </div>
                <div className="text-sm text-gray-400">Total Cost</div>
              </div>
              
              <div className="glass-card p-4 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">
                  {costTrends.reduce((sum, t) => sum + t.requests, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Total Requests</div>
              </div>
              
              <div className="glass-card p-4 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">
                  ${(costTrends.reduce((sum, t) => sum + t.costPerRequest, 0) / costTrends.length).toFixed(6)}
                </div>
                <div className="text-sm text-gray-400">Avg Cost per Request</div>
              </div>
            </div>
            
            {/* Trend Chart (Simple Bar Chart) */}
            <div className="mt-6">
              <div className="text-sm font-semibold text-gray-300 mb-3">Daily Cost Breakdown</div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {costTrends.slice(-14).map((trend) => (
                  <div key={trend.date} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-20">{trend.date.slice(5)}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-6 bg-gray-700 rounded overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded"
                          style={{
                            width: `${Math.min((trend.cost / Math.max(...costTrends.map(t => t.cost))) * 100, 100)}%`
                          }}
                        />
                      </div>
                      <span className="text-xs text-white font-medium w-16 text-right">
                        ${trend.cost.toFixed(4)}
                      </span>
                      <span className="text-xs text-gray-400 w-12 text-right">
                        {trend.requests}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      
      {/* ROI Metrics */}
      {roiMetrics && (
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-teal-500" />
            <h3 className="text-xl font-bold text-white">Return on Investment</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                ${roiMetrics.totalCost.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">Total Cost</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                {roiMetrics.estimatedTimeSaved.toFixed(1)}h
              </div>
              <div className="text-sm text-gray-400">Time Saved</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                ${roiMetrics.estimatedValueGenerated.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">Value Generated</div>
            </div>
            
            <div>
              <div className={`text-3xl font-bold mb-1 ${roiMetrics.roi > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {roiMetrics.roi > 0 ? '+' : ''}{roiMetrics.roi.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">ROI</div>
            </div>
          </div>
          
          {roiMetrics.paybackPeriod > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Payback Period</span>
                <span className="text-lg font-semibold text-white">
                  {roiMetrics.paybackPeriod} days
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      
      {/* User Segmentation */}
      {userSegments.length > 0 && (
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="w-6 h-6 text-teal-500" />
            <h3 className="text-xl font-bold text-white">User Segmentation</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userSegments.map((segment) => (
              <div key={segment.segment} className="glass-card p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-white capitalize">
                    {segment.segment} Users
                  </span>
                  <span className="text-sm text-gray-400">
                    {(segment.percentage * 100).toFixed(1)}%
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Count</span>
                    <span className="text-white font-medium">{segment.count}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Avg Requests</span>
                    <span className="text-white font-medium">{segment.avgRequests.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Avg Cost</span>
                    <span className="text-white font-medium">${segment.avgCost.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Feature Usage by Segment */}
      {featureUsageBySegment.length > 0 && (
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-teal-500" />
            <h3 className="text-xl font-bold text-white">Feature Usage Patterns by Segment</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureUsageBySegment.map((segmentData) => (
              <div key={segmentData.segment} className="glass-card p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-white capitalize">
                    {segmentData.segment} Users
                  </span>
                  <span className="text-sm text-gray-400">
                    {segmentData.totalRequests} requests
                  </span>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(segmentData.features)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([feature, count]) => {
                      const percentage = segmentData.totalRequests > 0 
                        ? (count / segmentData.totalRequests) * 100 
                        : 0;
                      
                      return (
                        <div key={feature} className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 capitalize">{feature}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-teal-500 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-white font-medium w-12 text-right">
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  
                  {Object.keys(segmentData.features).length === 0 && (
                    <div className="text-sm text-gray-500 text-center py-2">
                      No feature usage data
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Power Users */}
      {powerUsers.length > 0 && (
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-teal-500" />
            <h3 className="text-xl font-bold text-white">Top Power Users</h3>
            <span className="text-sm text-gray-400">(Top 10 by request count)</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-sm font-semibold text-gray-400 pb-3">User ID</th>
                  <th className="text-right text-sm font-semibold text-gray-400 pb-3">Requests</th>
                  <th className="text-right text-sm font-semibold text-gray-400 pb-3">Cost</th>
                  <th className="text-center text-sm font-semibold text-gray-400 pb-3">Tier</th>
                  <th className="text-right text-sm font-semibold text-gray-400 pb-3">Features</th>
                  <th className="text-right text-sm font-semibold text-gray-400 pb-3">Last Active</th>
                  <th className="text-right text-sm font-semibold text-gray-400 pb-3">Days Active</th>
                </tr>
              </thead>
              <tbody>
                {powerUsers.map((user, index) => (
                  <tr key={user.userId} className="border-b border-white/5">
                    <td className="py-3 text-sm text-gray-300 font-mono">
                      #{index + 1} {user.userId}
                    </td>
                    <td className="py-3 text-sm text-white font-medium text-right">
                      {user.requests}
                    </td>
                    <td className="py-3 text-sm text-white font-medium text-right">
                      ${user.cost.toFixed(4)}
                    </td>
                    <td className="py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        user.isPremium 
                          ? 'bg-teal-500/20 text-teal-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {user.isPremium ? 'Premium' : 'Free'}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-400 text-right">
                      {user.featuresUsed.length}
                    </td>
                    <td className="py-3 text-sm text-gray-400 text-right">
                      {user.lastActive}
                    </td>
                    <td className="py-3 text-sm text-gray-400 text-right">
                      {user.daysSinceFirstSeen}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Conversion Metrics */}
      {conversionMetrics && (
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-teal-500" />
            <h3 className="text-xl font-bold text-white">Conversion Metrics</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                {conversionMetrics.totalFreeUsers}
              </div>
              <div className="text-sm text-gray-400">Free Users</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-teal-500 mb-1">
                {conversionMetrics.totalPremiumUsers}
              </div>
              <div className="text-sm text-gray-400">Premium Users</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                {(conversionMetrics.conversionRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Conversion Rate</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                {conversionMetrics.avgTimeToConversion}d
              </div>
              <div className="text-sm text-gray-400">Avg Time to Convert</div>
            </div>
          </div>
          
          {/* Conversion Rate Visualization */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-sm font-semibold text-gray-300 mb-3">User Distribution</div>
            <div className="flex items-center gap-2">
              <div 
                className="h-8 bg-gray-500 rounded-l flex items-center justify-center text-xs font-semibold text-white"
                style={{ 
                  width: `${(conversionMetrics.totalFreeUsers / (conversionMetrics.totalFreeUsers + conversionMetrics.totalPremiumUsers)) * 100}%` 
                }}
              >
                {conversionMetrics.totalFreeUsers > 0 && 'Free'}
              </div>
              <div 
                className="h-8 bg-teal-500 rounded-r flex items-center justify-center text-xs font-semibold text-white"
                style={{ 
                  width: `${(conversionMetrics.totalPremiumUsers / (conversionMetrics.totalFreeUsers + conversionMetrics.totalPremiumUsers)) * 100}%` 
                }}
              >
                {conversionMetrics.totalPremiumUsers > 0 && 'Premium'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for metric cards
interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: 'blue' | 'teal' | 'green' | 'purple';
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, subtitle, color }) => {
  const colorClasses = {
    blue: 'text-blue-500',
    teal: 'text-teal-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
  };
  
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className={`${colorClasses[color]} mb-3`}>
        {icon}
      </div>
      <div className="text-sm text-gray-400 mb-1">{title}</div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
};
