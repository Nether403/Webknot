/**
 * FeedbackAnalytics Component
 * 
 * Displays analytics and insights from user feedback
 * Shows acceptance rates, low-quality suggestions, and trends over time
 */

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingDown, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { getFeedbackService } from '../../services/feedbackService';
import type { FeedbackStats } from '../../types/gemini';

export interface FeedbackAnalyticsProps {
  className?: string;
}

/**
 * FeedbackAnalytics displays comprehensive feedback statistics and insights
 */
export const FeedbackAnalytics: React.FC<FeedbackAnalyticsProps> = ({
  className = '',
}) => {
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [timeRange, setTimeRange] = useState<'all' | '7d' | '30d'>('30d');
  const [lowQualitySuggestions, setLowQualitySuggestions] = useState<Array<{
    type: string;
    acceptanceRate: number;
    totalCount: number;
  }>>([]);
  
  useEffect(() => {
    const feedbackService = getFeedbackService();
    
    // Calculate time range
    const since = timeRange === 'all' 
      ? undefined 
      : Date.now() - (timeRange === '7d' ? 7 : 30) * 24 * 60 * 60 * 1000;
    
    // Get stats
    const currentStats = feedbackService.getStats(since);
    setStats(currentStats);
    
    // Get low-quality suggestions
    const lowQuality = feedbackService.getLowQualitySuggestions(0.5);
    setLowQualitySuggestions(lowQuality);
  }, [timeRange]);
  
  if (!stats) {
    return null;
  }
  
  // Calculate overall acceptance rate
  const overallAcceptanceRate = stats.acceptanceRate * 100;
  
  // Determine if acceptance rate is good, okay, or poor
  const getAcceptanceRateColor = (rate: number) => {
    if (rate >= 70) return 'text-teal-400';
    if (rate >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getAcceptanceRateIcon = (rate: number) => {
    if (rate >= 70) return <TrendingUp className="w-5 h-5" />;
    if (rate >= 50) return <BarChart3 className="w-5 h-5" />;
    return <TrendingDown className="w-5 h-5" />;
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-teal-500" />
          <h2 className="text-xl font-bold text-white">Feedback Analytics</h2>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1.5 text-sm rounded transition-colors ${
              timeRange === '7d'
                ? 'bg-teal-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1.5 text-sm rounded transition-colors ${
              timeRange === '30d'
                ? 'bg-teal-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setTimeRange('all')}
            className={`px-3 py-1.5 text-sm rounded transition-colors ${
              timeRange === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            All Time
          </button>
        </div>
      </div>
      
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Feedback */}
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Total Feedback</span>
            <BarChart3 className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {stats.totalFeedback}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {stats.positiveCount} positive, {stats.negativeCount} negative
          </div>
        </div>
        
        {/* Acceptance Rate */}
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Acceptance Rate</span>
            {getAcceptanceRateIcon(overallAcceptanceRate)}
          </div>
          <div className={`text-3xl font-bold ${getAcceptanceRateColor(overallAcceptanceRate)}`}>
            {overallAcceptanceRate.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {overallAcceptanceRate >= 70 ? 'Excellent' : overallAcceptanceRate >= 50 ? 'Good' : 'Needs improvement'}
          </div>
        </div>
        
        {/* Low Quality Suggestions */}
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Low Quality Items</span>
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {lowQualitySuggestions.length}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Suggestions below 50% acceptance
          </div>
        </div>
      </div>
      
      {/* Feedback by Type */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Feedback by Feature</h3>
        <div className="space-y-4">
          {Object.entries(stats.feedbackByType).map(([type, data]) => {
            const rate = data.total > 0 ? (data.positive / data.total) * 100 : 0;
            
            return (
              <div key={type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300 capitalize">
                    {type}
                  </span>
                  <span className={`text-sm font-semibold ${getAcceptanceRateColor(rate)}`}>
                    {rate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 transition-all duration-300"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-16 text-right">
                    {data.total} total
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Low Quality Suggestions */}
      {lowQualitySuggestions.length > 0 && (
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">
              Suggestions Needing Improvement
            </h3>
          </div>
          <div className="space-y-3">
            {lowQualitySuggestions.map((suggestion) => (
              <div
                key={suggestion.type}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-white capitalize">
                    {suggestion.type}
                  </div>
                  <div className="text-xs text-gray-400">
                    {suggestion.totalCount} feedback entries
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-red-400">
                    {(suggestion.acceptanceRate * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">acceptance</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Recommendations */}
      {stats.totalFeedback > 0 && (
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg font-semibold text-white">Recommendations</h3>
          </div>
          <div className="space-y-3">
            {overallAcceptanceRate < 50 && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-300">
                  <strong>Critical:</strong> Overall acceptance rate is below 50%. 
                  Consider reviewing and refining AI prompts to improve suggestion quality.
                </p>
              </div>
            )}
            
            {lowQualitySuggestions.length > 0 && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-300">
                  <strong>Action needed:</strong> {lowQualitySuggestions.length} suggestion 
                  type{lowQualitySuggestions.length !== 1 ? 's have' : ' has'} low acceptance rates. 
                  Review and optimize prompts for these categories.
                </p>
              </div>
            )}
            
            {overallAcceptanceRate >= 70 && (
              <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                <p className="text-sm text-teal-300">
                  <strong>Great job!</strong> Your AI features have a high acceptance rate. 
                  Continue monitoring feedback to maintain quality.
                </p>
              </div>
            )}
            
            {stats.totalFeedback < 50 && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-300">
                  <strong>Tip:</strong> Collect more feedback to get more reliable insights. 
                  Aim for at least 50-100 feedback entries per feature.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {stats.totalFeedback === 0 && (
        <div className="glass-card rounded-lg p-12 text-center">
          <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No Feedback Yet
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Start collecting feedback from users to see analytics and insights here. 
            Feedback helps improve AI suggestion quality over time.
          </p>
        </div>
      )}
    </div>
  );
};
