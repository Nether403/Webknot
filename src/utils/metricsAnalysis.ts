/**
 * Metrics Analysis Utilities
 * 
 * Provides detailed analysis and insights from collected metrics data
 */

import {
  getAllSessions,
  getMetricsSummary,
  MetricsSummary,
} from './metricsTracking';

/**
 * Time-based analysis
 */
export interface TimeAnalysis {
  fastestCompletion: number;
  slowestCompletion: number;
  medianCompletion: number;
  completionTimeDistribution: {
    under5min: number;
    between5and10min: number;
    between10and15min: number;
    over15min: number;
  };
  averageTimePerStep: Record<string, number>;
}

export const analyzeCompletionTimes = (): TimeAnalysis => {
  const sessions = getAllSessions().filter(s => s.completed && s.endTime);
  
  if (sessions.length === 0) {
    return {
      fastestCompletion: 0,
      slowestCompletion: 0,
      medianCompletion: 0,
      completionTimeDistribution: {
        under5min: 0,
        between5and10min: 0,
        between10and15min: 0,
        over15min: 0,
      },
      averageTimePerStep: {},
    };
  }
  
  const completionTimes = sessions.map(s => s.endTime! - s.startTime).sort((a, b) => a - b);
  
  const fastest = completionTimes[0] || 0;
  const slowest = completionTimes[completionTimes.length - 1] || 0;
  const median = completionTimes[Math.floor(completionTimes.length / 2)] || 0;
  
  // Distribution
  const under5min = completionTimes.filter(t => t < 300000).length;
  const between5and10min = completionTimes.filter(t => t >= 300000 && t < 600000).length;
  const between10and15min = completionTimes.filter(t => t >= 600000 && t < 900000).length;
  const over15min = completionTimes.filter(t => t >= 900000).length;
  
  // Average time per step (simplified - would need more detailed tracking)
  const stepCounts: Record<string, number> = {};
  sessions.forEach(session => {
    session.stepsCompleted.forEach(step => {
      stepCounts[step] = (stepCounts[step] || 0) + 1;
    });
  });
  
  return {
    fastestCompletion: fastest,
    slowestCompletion: slowest,
    medianCompletion: median,
    completionTimeDistribution: {
      under5min,
      between5and10min,
      between10and15min,
      over15min,
    },
    averageTimePerStep: stepCounts,
  };
};

/**
 * Quality score analysis
 */
export interface QualityAnalysis {
  highQuality: number; // 85+
  mediumQuality: number; // 70-84
  lowQuality: number; // <70
  averageScore: number;
  scoreDistribution: number[];
  improvementTrend: 'improving' | 'declining' | 'stable';
}

export const analyzePromptQuality = (): QualityAnalysis => {
  const sessions = getAllSessions().filter(s => s.promptQualityScore !== undefined);
  
  if (sessions.length === 0) {
    return {
      highQuality: 0,
      mediumQuality: 0,
      lowQuality: 0,
      averageScore: 0,
      scoreDistribution: [],
      improvementTrend: 'stable',
    };
  }
  
  const scores = sessions.map(s => s.promptQualityScore!);
  
  const highQuality = scores.filter(s => s >= 85).length;
  const mediumQuality = scores.filter(s => s >= 70 && s < 85).length;
  const lowQuality = scores.filter(s => s < 70).length;
  
  const averageScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  
  // Analyze trend (compare first half vs second half)
  const midpoint = Math.floor(scores.length / 2);
  const firstHalfAvg = scores.slice(0, midpoint).reduce((sum, s) => sum + s, 0) / midpoint;
  const secondHalfAvg = scores.slice(midpoint).reduce((sum, s) => sum + s, 0) / (scores.length - midpoint);
  
  let improvementTrend: 'improving' | 'declining' | 'stable' = 'stable';
  if (secondHalfAvg > firstHalfAvg + 5) improvementTrend = 'improving';
  else if (secondHalfAvg < firstHalfAvg - 5) improvementTrend = 'declining';
  
  return {
    highQuality,
    mediumQuality,
    lowQuality,
    averageScore,
    scoreDistribution: scores,
    improvementTrend,
  };
};

/**
 * User engagement analysis
 */
export interface EngagementAnalysis {
  smartDefaultsUsage: {
    used: number;
    notUsed: number;
    usageRate: number;
  };
  suggestionEngagement: {
    highEngagement: number; // >50% applied
    mediumEngagement: number; // 25-50% applied
    lowEngagement: number; // <25% applied
    averageApplicationRate: number;
  };
  stepCompletionRates: Record<string, number>;
  dropOffPoints: string[];
}

export const analyzeUserEngagement = (): EngagementAnalysis => {
  const sessions = getAllSessions();
  
  if (sessions.length === 0) {
    return {
      smartDefaultsUsage: {
        used: 0,
        notUsed: 0,
        usageRate: 0,
      },
      suggestionEngagement: {
        highEngagement: 0,
        mediumEngagement: 0,
        lowEngagement: 0,
        averageApplicationRate: 0,
      },
      stepCompletionRates: {},
      dropOffPoints: [],
    };
  }
  
  // Smart defaults usage
  const smartDefaultsUsed = sessions.filter(s => s.smartDefaultsAccepted).length;
  const smartDefaultsNotUsed = sessions.length - smartDefaultsUsed;
  const smartDefaultsUsageRate = (smartDefaultsUsed / sessions.length) * 100;
  
  // Suggestion engagement
  const sessionsWithSuggestions = sessions.filter(s => s.totalSuggestionsShown > 0);
  const applicationRates = sessionsWithSuggestions.map(s => 
    (s.suggestionsApplied / s.totalSuggestionsShown) * 100
  );
  
  const highEngagement = applicationRates.filter(r => r > 50).length;
  const mediumEngagement = applicationRates.filter(r => r >= 25 && r <= 50).length;
  const lowEngagement = applicationRates.filter(r => r < 25).length;
  const averageApplicationRate = applicationRates.length > 0
    ? applicationRates.reduce((sum, r) => sum + r, 0) / applicationRates.length
    : 0;
  
  // Step completion rates
  const stepCounts: Record<string, number> = {};
  sessions.forEach(session => {
    session.stepsCompleted.forEach(step => {
      stepCounts[step] = (stepCounts[step] || 0) + 1;
    });
  });
  
  const stepCompletionRates: Record<string, number> = {};
  Object.entries(stepCounts).forEach(([step, count]) => {
    stepCompletionRates[step] = (count / sessions.length) * 100;
  });
  
  // Find drop-off points (steps with <50% completion)
  const dropOffPoints = Object.entries(stepCompletionRates)
    .filter(([_, rate]) => rate < 50)
    .map(([step]) => step);
  
  return {
    smartDefaultsUsage: {
      used: smartDefaultsUsed,
      notUsed: smartDefaultsNotUsed,
      usageRate: smartDefaultsUsageRate,
    },
    suggestionEngagement: {
      highEngagement,
      mediumEngagement,
      lowEngagement,
      averageApplicationRate,
    },
    stepCompletionRates,
    dropOffPoints,
  };
};

/**
 * Comprehensive effectiveness report
 */
export interface EffectivenessReport {
  summary: MetricsSummary;
  timeAnalysis: TimeAnalysis;
  qualityAnalysis: QualityAnalysis;
  engagementAnalysis: EngagementAnalysis;
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
}

export const generateEffectivenessReport = (): EffectivenessReport => {
  const summary = getMetricsSummary();
  const timeAnalysis = analyzeCompletionTimes();
  const qualityAnalysis = analyzePromptQuality();
  const engagementAnalysis = analyzeUserEngagement();
  
  const recommendations: string[] = [];
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  // Analyze completion time
  if (summary.meetsTargets.completionTime) {
    strengths.push('Wizard completion time meets target (40% reduction achieved)');
  } else {
    weaknesses.push('Wizard completion time below target');
    recommendations.push('Consider adding more smart defaults to reduce decision time');
    recommendations.push('Simplify complex steps or provide better guidance');
  }
  
  // Analyze prompt quality
  if (summary.meetsTargets.promptQuality) {
    strengths.push('Prompt quality consistently high (85+ average)');
  } else {
    weaknesses.push('Prompt quality below target');
    recommendations.push('Enhance prompt analyzer with more validation rules');
    recommendations.push('Provide more examples and templates');
  }
  
  // Analyze smart defaults
  if (summary.meetsTargets.smartDefaults) {
    strengths.push('High smart defaults acceptance rate (>60%)');
  } else {
    weaknesses.push('Low smart defaults acceptance rate');
    recommendations.push('Review smart defaults mappings for accuracy');
    recommendations.push('Improve explanation of why defaults are suggested');
  }
  
  // Analyze suggestions
  if (summary.meetsTargets.suggestions) {
    strengths.push('Good suggestion application rate (>40%)');
  } else {
    weaknesses.push('Low suggestion application rate');
    recommendations.push('Make suggestions more relevant and contextual');
    recommendations.push('Improve suggestion UI/UX for easier application');
  }
  
  // Analyze completion rate
  if (summary.meetsTargets.completion) {
    strengths.push('High wizard completion rate (80%+)');
  } else {
    weaknesses.push('Low wizard completion rate');
    recommendations.push('Identify and address drop-off points');
    recommendations.push('Add progress indicators and motivation');
  }
  
  // Quality trend analysis
  if (qualityAnalysis.improvementTrend === 'improving') {
    strengths.push('Prompt quality showing improvement trend');
  } else if (qualityAnalysis.improvementTrend === 'declining') {
    weaknesses.push('Prompt quality showing decline');
    recommendations.push('Investigate recent changes that may have impacted quality');
  }
  
  // Engagement analysis
  if (engagementAnalysis.suggestionEngagement.averageApplicationRate > 50) {
    strengths.push('High user engagement with AI suggestions');
  }
  
  if (engagementAnalysis.dropOffPoints.length > 0) {
    weaknesses.push(`Drop-off detected at: ${engagementAnalysis.dropOffPoints.join(', ')}`);
    recommendations.push('Focus on improving user experience at drop-off points');
  }
  
  return {
    summary,
    timeAnalysis,
    qualityAnalysis,
    engagementAnalysis,
    recommendations,
    strengths,
    weaknesses,
  };
};

/**
 * Compare metrics against baseline
 */
export interface BaselineComparison {
  metric: string;
  baseline: number;
  current: number;
  change: number;
  changePercent: number;
  improved: boolean;
}

export const compareToBaseline = (): BaselineComparison[] => {
  const summary = getMetricsSummary();
  
  // Baseline values (before AI features)
  const baselines = {
    completionTime: 600000, // 10 minutes
    promptQuality: 70, // Estimated baseline
    smartDefaultsAcceptance: 0, // New feature
    suggestionApplication: 0, // New feature
    completionRate: 60, // Estimated baseline
  };
  
  return [
    {
      metric: 'Wizard Completion Time',
      baseline: baselines.completionTime,
      current: summary.averageCompletionTime,
      change: baselines.completionTime - summary.averageCompletionTime,
      changePercent: ((baselines.completionTime - summary.averageCompletionTime) / baselines.completionTime) * 100,
      improved: summary.averageCompletionTime < baselines.completionTime,
    },
    {
      metric: 'Prompt Quality Score',
      baseline: baselines.promptQuality,
      current: summary.averagePromptQualityScore,
      change: summary.averagePromptQualityScore - baselines.promptQuality,
      changePercent: ((summary.averagePromptQualityScore - baselines.promptQuality) / baselines.promptQuality) * 100,
      improved: summary.averagePromptQualityScore > baselines.promptQuality,
    },
    {
      metric: 'Wizard Completion Rate',
      baseline: baselines.completionRate,
      current: summary.wizardCompletionRate,
      change: summary.wizardCompletionRate - baselines.completionRate,
      changePercent: ((summary.wizardCompletionRate - baselines.completionRate) / baselines.completionRate) * 100,
      improved: summary.wizardCompletionRate > baselines.completionRate,
    },
  ];
};

/**
 * Export analysis as formatted text report
 */
export const exportAnalysisReport = (): string => {
  const report = generateEffectivenessReport();
  const comparison = compareToBaseline();
  
  let output = '# AI Feature Effectiveness Report\n\n';
  output += `Generated: ${new Date().toISOString()}\n\n`;
  
  output += '## Executive Summary\n\n';
  output += `- Total Sessions: ${report.summary.totalSessions}\n`;
  output += `- Completed Sessions: ${report.summary.completedSessions}\n`;
  output += `- Completion Rate: ${report.summary.wizardCompletionRate.toFixed(1)}%\n`;
  output += `- Average Completion Time: ${(report.summary.averageCompletionTimeMinutes).toFixed(1)} minutes\n`;
  output += `- Average Prompt Quality: ${report.summary.averagePromptQualityScore.toFixed(1)}/100\n\n`;
  
  output += '## Targets Status\n\n';
  Object.entries(report.summary.meetsTargets).forEach(([key, met]) => {
    output += `- ${key}: ${met ? '✓ Met' : '✗ Not Met'}\n`;
  });
  output += '\n';
  
  output += '## Baseline Comparison\n\n';
  comparison.forEach(comp => {
    output += `### ${comp.metric}\n`;
    output += `- Baseline: ${comp.baseline}\n`;
    output += `- Current: ${comp.current.toFixed(2)}\n`;
    output += `- Change: ${comp.change > 0 ? '+' : ''}${comp.change.toFixed(2)} (${comp.changePercent > 0 ? '+' : ''}${comp.changePercent.toFixed(1)}%)\n`;
    output += `- Status: ${comp.improved ? '✓ Improved' : '✗ Declined'}\n\n`;
  });
  
  output += '## Strengths\n\n';
  report.strengths.forEach(strength => {
    output += `- ${strength}\n`;
  });
  output += '\n';
  
  output += '## Weaknesses\n\n';
  report.weaknesses.forEach(weakness => {
    output += `- ${weakness}\n`;
  });
  output += '\n';
  
  output += '## Recommendations\n\n';
  report.recommendations.forEach(rec => {
    output += `- ${rec}\n`;
  });
  output += '\n';
  
  output += '## Detailed Analysis\n\n';
  
  output += '### Time Analysis\n';
  output += `- Fastest Completion: ${(report.timeAnalysis.fastestCompletion / 60000).toFixed(1)} minutes\n`;
  output += `- Slowest Completion: ${(report.timeAnalysis.slowestCompletion / 60000).toFixed(1)} minutes\n`;
  output += `- Median Completion: ${(report.timeAnalysis.medianCompletion / 60000).toFixed(1)} minutes\n\n`;
  
  output += '### Quality Analysis\n';
  output += `- High Quality (85+): ${report.qualityAnalysis.highQuality}\n`;
  output += `- Medium Quality (70-84): ${report.qualityAnalysis.mediumQuality}\n`;
  output += `- Low Quality (<70): ${report.qualityAnalysis.lowQuality}\n`;
  output += `- Trend: ${report.qualityAnalysis.improvementTrend}\n\n`;
  
  output += '### Engagement Analysis\n';
  output += `- Smart Defaults Usage: ${report.engagementAnalysis.smartDefaultsUsage.usageRate.toFixed(1)}%\n`;
  output += `- Average Suggestion Application: ${report.engagementAnalysis.suggestionEngagement.averageApplicationRate.toFixed(1)}%\n`;
  
  if (report.engagementAnalysis.dropOffPoints.length > 0) {
    output += `- Drop-off Points: ${report.engagementAnalysis.dropOffPoints.join(', ')}\n`;
  }
  
  return output;
};
