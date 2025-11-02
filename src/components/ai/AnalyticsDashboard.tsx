/**
 * Analytics Dashboard Component
 * 
 * Displays comprehensive metrics for Gemini AI usage including:
 * - Daily request counts
 * - Estimated API costs
 * - Error rates over time
 * - Cache performance metrics
 */

import React, { useState, useEffect } from 'react';
import { Activity, DollarSign, AlertCircle, Zap, TrendingUp, Database } from 'lucide-react';
import { getMetricsService } from '../../services/metricsService';
import type { GeminiMetrics } from '../../types/gemini';

export const AnalyticsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<GeminiMetrics | null>(null);
  const [dailyCounts, setDailyCounts] = useState<Array<{ date: string; count: number }>>([]);
  const [errorBreakdown, setErrorBreakdown] = useState<Record<string, number>>({});
  const [latencyByOp, setLatencyByOp] = useState<Record<string, number>>({});
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  
  useEffect(() => {
    const metricsService = getMetricsService();
    
    // Calculate time range in milliseconds
    const timeRangeMs = {
      '24h': 86400000,
      '7d': 604800000,
      '30d': 2592000000,
    }[timeRange];
    
    // Get metrics
    const currentMetrics = metricsService.getMetrics(timeRangeMs);
    setMetrics(currentMetrics);
    
    // Get daily counts
    const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
    const counts = metricsService.getDailyRequestCounts(days);
    setDailyCounts(counts);
    
    // Get error breakdown
    const errors = metricsService.getErrorBreakdown(timeRangeMs);
    setErrorBreakdown(errors);
    
    // Get latency by operation
    const latency = metricsService.getLatencyByOperation(timeRangeMs);
    setLatencyByOp(latency);
  }, [timeRange]);
  
  if (!metrics) {
    return (
      <div className="p-6 text-center text-gray-400">
        Loading analytics...
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Analytics Dashboard</h2>
          <p className="text-gray-400">Monitor Gemini AI usage, performance, and costs</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>
      
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Requests */}
        <MetricCard
          icon={<Activity className="w-5 h-5" />}
          title="Total Requests"
          value={metrics.totalRequests.toString()}
          subtitle={`${metrics.cacheHitRate * 100}% cache hit rate`}
          color="teal"
        />
        
        {/* Estimated Cost */}
        <MetricCard
          icon={<DollarSign className="w-5 h-5" />}
          title="Estimated Cost"
          value={`$${metrics.estimatedCost.toFixed(4)}`}
          subtitle={`$${metrics.costPerUser.toFixed(4)} per user`}
          color="green"
        />
        
        {/* Error Rate */}
        <MetricCard
          icon={<AlertCircle className="w-5 h-5" />}
          title="Error Rate"
          value={`${(metrics.errorRate * 100).toFixed(1)}%`}
          subtitle={`${(metrics.fallbackRate * 100).toFixed(1)}% fallback rate`}
          color={metrics.errorRate > 0.05 ? 'red' : 'yellow'}
        />
        
        {/* Average Latency */}
        <MetricCard
          icon={<Zap className="w-5 h-5" />}
          title="Avg Latency"
          value={`${metrics.averageLatency}ms`}
          subtitle={`P95: ${metrics.p95Latency}ms`}
          color="blue"
        />
      </div>
      
      {/* Daily Request Chart */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 glass-card" />
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-teal-500" />
            <h3 className="text-lg font-semibold text-white">Daily Requests</h3>
          </div>
          
          <div className="space-y-2">
            {dailyCounts.map((day) => (
              <div key={day.date} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-24">{day.date}</span>
                <div className="flex-1 bg-gray-800 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-teal-600 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (day.count / Math.max(...dailyCounts.map(d => d.count))) * 100)}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-white w-12 text-right">{day.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latency by Operation */}
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 glass-card" />
          <div className="relative p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">Latency by Operation</h3>
            </div>
            
            <div className="space-y-3">
              {Object.entries(latencyByOp).map(([operation, latency]) => (
                <div key={operation}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300 capitalize">{operation}</span>
                    <span className="text-sm text-white font-medium">{latency}ms</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        latency < 1000 ? 'bg-green-500' :
                        latency < 2000 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{
                        width: `${Math.min(100, (latency / 3000) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              
              {Object.keys(latencyByOp).length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  No data available
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Error Breakdown */}
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 glass-card" />
          <div className="relative p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-white">Error Breakdown</h3>
            </div>
            
            <div className="space-y-3">
              {Object.entries(errorBreakdown).map(([error, count]) => (
                <div key={error}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300 truncate flex-1">{error}</span>
                    <span className="text-sm text-white font-medium ml-2">{count}</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (count / metrics.totalRequests) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              
              {Object.keys(errorBreakdown).length === 0 && (
                <p className="text-sm text-green-400 text-center py-4">
                  ✓ No errors in this time period
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cache Performance */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 glass-card" />
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-white">Cache Performance</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {(metrics.cacheHitRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Cache Hit Rate</div>
              <div className="text-xs text-gray-500 mt-1">
                Target: &gt;80%
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {metrics.totalTokensUsed.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Tokens</div>
              <div className="text-xs text-gray-500 mt-1">
                Saved by caching
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {Object.keys(metrics.requestsByModel).length}
              </div>
              <div className="text-sm text-gray-400">Models Used</div>
              <div className="text-xs text-gray-500 mt-1">
                Flash & Pro
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Request Distribution */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 glass-card" />
        <div className="relative p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Request Distribution</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* By Model */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">By Model</h4>
              <div className="space-y-2">
                {Object.entries(metrics.requestsByModel).map(([model, count]) => (
                  <div key={model} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{model}</span>
                    <span className="text-sm text-white font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* By Feature */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">By Feature</h4>
              <div className="space-y-2">
                {Object.entries(metrics.requestsByFeature).map(([feature, count]) => (
                  <div key={feature} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300 capitalize">{feature}</span>
                    <span className="text-sm text-white font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: 'teal' | 'green' | 'red' | 'yellow' | 'blue';
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, subtitle, color }) => {
  const colorClasses = {
    teal: 'text-teal-500',
    green: 'text-green-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
    blue: 'text-blue-500',
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
