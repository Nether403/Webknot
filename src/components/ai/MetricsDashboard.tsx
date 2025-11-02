import React, { useState, useEffect } from 'react';
import { 
  getMetricsSummary, 
  exportMetricsData, 
  clearMetricsData,
  MetricsSummary 
} from '../../utils/metricsTracking';
import { 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  XCircle, 
  Download,
  Trash2,
  BarChart3,
  Clock,
  Target,
  Users,
  Zap
} from 'lucide-react';

/**
 * MetricsDashboard Component
 * 
 * Displays comprehensive metrics about AI feature effectiveness including:
 * - Wizard completion time
 * - Prompt quality scores
 * - Smart defaults acceptance rate
 * - Suggestion application rate
 * - Wizard completion rate
 */
export const MetricsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsSummary | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = () => {
    const summary = getMetricsSummary();
    setMetrics(summary);
  };

  const handleExport = () => {
    const data = exportMetricsData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lovabolt-metrics-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    clearMetricsData();
    setShowConfirmClear(false);
    loadMetrics();
  };

  if (!metrics) {
    return (
      <div className="glass-card p-6 rounded-xl">
        <p className="text-gray-400">Loading metrics...</p>
      </div>
    );
  }

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    target: string | number;
    meetsTarget: boolean;
    icon: React.ReactNode;
    description: string;
  }> = ({ title, value, target, meetsTarget, icon, description }) => (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-500/10">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        {meetsTarget ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <XCircle className="w-6 h-6 text-yellow-500" />
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          {meetsTarget ? (
            <TrendingUp className="w-5 h-5 text-green-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-yellow-500" />
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Target: {target}</span>
          <span className={meetsTarget ? 'text-green-400' : 'text-yellow-400'}>
            {meetsTarget ? 'Met' : 'Not Met'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">AI Feature Effectiveness</h2>
          <p className="text-gray-300">
            Comprehensive metrics tracking AI feature performance and user engagement
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
          
          <button
            onClick={() => setShowConfirmClear(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear Data
          </button>
        </div>
      </div>

      {/* Confirm Clear Dialog */}
      {showConfirmClear && (
        <div className="glass-card p-6 rounded-xl border border-red-500/20">
          <h3 className="text-lg font-semibold text-white mb-2">Confirm Clear Data</h3>
          <p className="text-gray-300 mb-4">
            Are you sure you want to clear all metrics data? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              Yes, Clear Data
            </button>
            <button
              onClick={() => setShowConfirmClear(false)}
              className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg font-semibold text-white">Total Sessions</h3>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.totalSessions}</p>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Completed</h3>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.completedSessions}</p>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Abandoned</h3>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.abandonedSessions}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricCard
          title="Wizard Completion Time"
          value={formatTime(metrics.averageCompletionTime)}
          target="6m 0s (40% reduction)"
          meetsTarget={metrics.meetsTargets.completionTime}
          icon={<Clock className="w-5 h-5 text-teal-400" />}
          description="Average time to complete the wizard"
        />
        
        <MetricCard
          title="Prompt Quality Score"
          value={`${metrics.averagePromptQualityScore.toFixed(1)}/100`}
          target="85+"
          meetsTarget={metrics.meetsTargets.promptQuality}
          icon={<BarChart3 className="w-5 h-5 text-teal-400" />}
          description="Average quality score of generated prompts"
        />
        
        <MetricCard
          title="Smart Defaults Acceptance"
          value={`${metrics.smartDefaultsAcceptanceRate.toFixed(1)}%`}
          target=">60%"
          meetsTarget={metrics.meetsTargets.smartDefaults}
          icon={<Zap className="w-5 h-5 text-teal-400" />}
          description="Rate of users accepting smart defaults"
        />
        
        <MetricCard
          title="Suggestion Application Rate"
          value={`${metrics.suggestionApplicationRate.toFixed(1)}%`}
          target=">40%"
          meetsTarget={metrics.meetsTargets.suggestions}
          icon={<Target className="w-5 h-5 text-teal-400" />}
          description="Rate of users applying AI suggestions"
        />
      </div>

      {/* Completion Rate - Full Width */}
      <MetricCard
        title="Wizard Completion Rate"
        value={`${metrics.wizardCompletionRate.toFixed(1)}%`}
        target="80%+"
        meetsTarget={metrics.meetsTargets.completion}
        icon={<CheckCircle className="w-5 h-5 text-teal-400" />}
        description="Percentage of sessions that reach completion"
      />

      {/* Overall Status */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-4">Overall Performance</h3>
        
        <div className="space-y-3">
          {Object.entries(metrics.meetsTargets).map(([key, met]) => {
            const labels: Record<string, string> = {
              completionTime: 'Completion Time Reduction',
              promptQuality: 'Prompt Quality Score',
              smartDefaults: 'Smart Defaults Acceptance',
              suggestions: 'Suggestion Application',
              completion: 'Wizard Completion Rate',
            };
            
            return (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-300">{labels[key]}</span>
                <div className="flex items-center gap-2">
                  {met ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-400 font-medium">Target Met</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-yellow-500" />
                      <span className="text-yellow-400 font-medium">Below Target</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Targets Met</span>
            <span className="text-2xl font-bold text-white">
              {Object.values(metrics.meetsTargets).filter(Boolean).length} / 5
            </span>
          </div>
        </div>
      </div>

      {/* Data Info */}
      <div className="glass-card p-4 rounded-xl bg-gray-800/30">
        <p className="text-sm text-gray-400">
          <strong>Note:</strong> All metrics are calculated from local session data. 
          Export data for detailed analysis or backup. Clearing data will reset all metrics.
        </p>
      </div>
    </div>
  );
};
