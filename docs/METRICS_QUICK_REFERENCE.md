# Metrics System Quick Reference

## Quick Start

### View Metrics Dashboard

```typescript
import { MetricsDashboard } from '../components/ai/MetricsDashboard';

// In your component
<MetricsDashboard />
```

### Track Events

```typescript
import {
  startWizardSession,
  updateWizardStep,
  completeWizardSession,
  trackSmartDefaultsAcceptance,
  trackSuggestionShown,
  trackSuggestionApplication,
} from '../utils/metricsTracking';

// Start session (automatic in BoltBuilderContext)
startWizardSession();

// Track step changes (automatic in BoltBuilderContext)
updateWizardStep('design-style');

// Track smart defaults
trackSmartDefaultsAcceptance(true); // or false

// Track suggestions
trackSuggestionShown();
trackSuggestionApplication();

// Complete session (automatic when prompt generated)
completeWizardSession(promptQualityScore);
```

### Get Metrics Summary

```typescript
import { getMetricsSummary } from '../utils/metricsTracking';

const summary = getMetricsSummary();

console.log('Total Sessions:', summary.totalSessions);
console.log('Completion Rate:', summary.wizardCompletionRate);
console.log('Avg Quality:', summary.averagePromptQualityScore);
console.log('Smart Defaults:', summary.smartDefaultsAcceptanceRate);
console.log('Suggestions:', summary.suggestionApplicationRate);
```

### Export Data

```typescript
import { exportMetricsData } from '../utils/metricsTracking';
import { exportAnalysisReport } from '../utils/metricsAnalysis';

// Export raw JSON data
const jsonData = exportMetricsData();
downloadFile(jsonData, 'metrics.json');

// Export formatted text report
const textReport = exportAnalysisReport();
downloadFile(textReport, 'report.txt');
```

### Analyze Data

```typescript
import {
  analyzeCompletionTimes,
  analyzePromptQuality,
  analyzeUserEngagement,
  generateEffectivenessReport,
} from '../utils/metricsAnalysis';

// Time analysis
const timeAnalysis = analyzeCompletionTimes();
console.log('Fastest:', timeAnalysis.fastestCompletion);
console.log('Median:', timeAnalysis.medianCompletion);

// Quality analysis
const qualityAnalysis = analyzePromptQuality();
console.log('High Quality:', qualityAnalysis.highQuality);
console.log('Trend:', qualityAnalysis.improvementTrend);

// Engagement analysis
const engagement = analyzeUserEngagement();
console.log('Smart Defaults Usage:', engagement.smartDefaultsUsage.usageRate);
console.log('Drop-off Points:', engagement.dropOffPoints);

// Full report
const report = generateEffectivenessReport();
console.log('Strengths:', report.strengths);
console.log('Weaknesses:', report.weaknesses);
console.log('Recommendations:', report.recommendations);
```

## Key Metrics

### Targets

| Metric | Target | How to Check |
|--------|--------|--------------|
| Completion Time | 6 min (40% reduction) | `summary.averageCompletionTimeMinutes` |
| Prompt Quality | 85+ | `summary.averagePromptQualityScore` |
| Smart Defaults | >60% | `summary.smartDefaultsAcceptanceRate` |
| Suggestions | >40% | `summary.suggestionApplicationRate` |
| Completion Rate | 80%+ | `summary.wizardCompletionRate` |

### Check if Targets Met

```typescript
const summary = getMetricsSummary();

if (summary.meetsTargets.completionTime) {
  console.log('✓ Completion time target met');
}

if (summary.meetsTargets.promptQuality) {
  console.log('✓ Prompt quality target met');
}

// Check all targets
const allTargetsMet = Object.values(summary.meetsTargets).every(Boolean);
console.log('All targets met:', allTargetsMet);
```

## Common Tasks

### Clear All Data

```typescript
import { clearMetricsData } from '../utils/metricsTracking';

// Clear all metrics (use with caution!)
clearMetricsData();
```

### Get Session Details

```typescript
import { getSessionDetails, getAllSessions } from '../utils/metricsTracking';

// Get specific session
const session = getSessionDetails('session_123');
console.log('Completed:', session?.completed);
console.log('Steps:', session?.stepsCompleted);

// Get all sessions
const allSessions = getAllSessions();
console.log('Total sessions:', allSessions.length);
```

### Compare to Baseline

```typescript
import { compareToBaseline } from '../utils/metricsAnalysis';

const comparison = compareToBaseline();

comparison.forEach(comp => {
  console.log(`${comp.metric}:`);
  console.log(`  Baseline: ${comp.baseline}`);
  console.log(`  Current: ${comp.current}`);
  console.log(`  Change: ${comp.changePercent}%`);
  console.log(`  Improved: ${comp.improved}`);
});
```

## Integration Examples

### In a Component

```typescript
import React, { useEffect, useState } from 'react';
import { getMetricsSummary, MetricsSummary } from '../utils/metricsTracking';

const MyComponent: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsSummary | null>(null);

  useEffect(() => {
    const summary = getMetricsSummary();
    setMetrics(summary);
  }, []);

  if (!metrics) return <div>Loading...</div>;

  return (
    <div>
      <h2>Metrics</h2>
      <p>Completion Rate: {metrics.wizardCompletionRate.toFixed(1)}%</p>
      <p>Avg Quality: {metrics.averagePromptQualityScore.toFixed(1)}</p>
    </div>
  );
};
```

### In Context

```typescript
// Already integrated in BoltBuilderContext
// Sessions start automatically
// Steps tracked automatically
// Completion tracked when prompt generated
```

### Manual Tracking

```typescript
import { trackAIEvent } from '../utils/analyticsTracking';

// Track custom events
trackAIEvent('custom_event', {
  customData: 'value',
  timestamp: Date.now(),
});
```

## Troubleshooting

### No Data Showing

```typescript
// Check if data exists
import { getAllSessions } from '../utils/metricsTracking';

const sessions = getAllSessions();
console.log('Sessions:', sessions.length);

if (sessions.length === 0) {
  console.log('No sessions tracked yet');
}
```

### Metrics Not Updating

```typescript
// Force reload
const summary = getMetricsSummary();
console.log('Fresh data:', summary);

// Check localStorage
const stored = localStorage.getItem('lovabolt-ai-metrics');
console.log('Stored data:', stored);
```

### Clear Corrupted Data

```typescript
import { clearMetricsData } from '../utils/metricsTracking';

// Clear and restart
clearMetricsData();
window.location.reload();
```

## Best Practices

### DO

✅ Track events consistently
✅ Use provided functions
✅ Check metrics regularly
✅ Export data for backup
✅ Act on insights

### DON'T

❌ Skip tracking calls
❌ Modify localStorage directly
❌ Ignore warning signs
❌ Clear data without backup
❌ Track sensitive information

## Performance Tips

### Optimize Tracking

```typescript
// Debounce frequent events
import { debounce } from 'lodash';

const debouncedTrack = debounce(() => {
  trackSuggestionShown();
}, 300);
```

### Batch Operations

```typescript
// Process multiple sessions at once
const sessions = getAllSessions();
const analysis = sessions.map(s => ({
  id: s.sessionId,
  completed: s.completed,
  time: s.endTime ? s.endTime - s.startTime : null,
}));
```

### Limit Data Size

```typescript
// Keep only recent sessions (e.g., last 100)
const sessions = getAllSessions();
if (sessions.length > 100) {
  const recent = sessions.slice(-100);
  // Save only recent sessions
}
```

## API Reference

### metricsTracking.ts

- `startWizardSession()`: Start tracking session
- `updateWizardStep(step)`: Track step change
- `completeWizardSession(score?)`: Mark completed
- `abandonWizardSession()`: Mark abandoned
- `trackSmartDefaultsAcceptance(accepted)`: Track defaults
- `trackSuggestionShown()`: Track suggestion shown
- `trackSuggestionApplication()`: Track suggestion applied
- `getMetricsSummary()`: Get comprehensive summary
- `exportMetricsData()`: Export as JSON
- `clearMetricsData()`: Clear all data

### metricsAnalysis.ts

- `analyzeCompletionTimes()`: Time analysis
- `analyzePromptQuality()`: Quality analysis
- `analyzeUserEngagement()`: Engagement analysis
- `generateEffectivenessReport()`: Full report
- `compareToBaseline()`: Baseline comparison
- `exportAnalysisReport()`: Export as text

## Support

For detailed documentation, see:
- `docs/AI_EFFECTIVENESS_METRICS.md`
- `docs/AI_IMPROVEMENTS_SUMMARY.md`

For issues or questions:
- Check browser console for errors
- Verify LocalStorage is enabled
- Review tracking function calls
- Export data for debugging

---

**Quick Reference Version**: 1.0
**Last Updated**: 2024
