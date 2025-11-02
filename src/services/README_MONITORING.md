# Gemini AI Monitoring and Analytics

## Overview

This directory contains the monitoring and analytics infrastructure for the Gemini AI integration. The system provides comprehensive tracking of API usage, performance metrics, cost monitoring, and automated alerting.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ GeminiService│  │  useGemini   │  │  Components  │     │
│  │              │  │    Hook      │  │              │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                    ┌───────▼────────┐                       │
│                    │ Metrics Service│                       │
│                    └───────┬────────┘                       │
│                            │                                 │
│         ┌──────────────────┼──────────────────┐             │
│         │                  │                  │             │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐    │
│  │   Storage    │  │     Cost     │  │  Analytics   │    │
│  │ (localStorage)│  │   Tracker    │  │  Dashboard   │    │
│  └──────────────┘  └──────┬───────┘  └──────────────┘    │
│                            │                                 │
│                    ┌───────▼────────┐                       │
│                    │  Cost Alerts   │                       │
│                    └────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. MetricsService (`metricsService.ts`)

**Purpose**: Core metrics tracking and analysis

**Responsibilities**:
- Log all API calls with metadata
- Calculate performance metrics
- Track error rates
- Compute cache hit rates
- Persist data to localStorage

**Key Features**:
- Automatic log rotation (keeps last 1000 entries)
- Time-range based queries
- Export functionality
- Real-time metrics calculation

**Usage**:
```typescript
import { getMetricsService } from './services/metricsService';

const metricsService = getMetricsService();

// Log an API call
metricsService.logApiCall({
  timestamp: Date.now(),
  operation: 'analysis',
  model: 'gemini-2.5-flash-exp',
  latency: 1234,
  tokensUsed: 456,
  cacheHit: false,
  success: true,
});

// Get metrics for last 24 hours
const metrics = metricsService.getMetrics(86400000);
console.log('Cache hit rate:', metrics.cacheHitRate);
console.log('Average latency:', metrics.averageLatency);
```

### 2. CostTracker (`costTracker.ts`)

**Purpose**: Cost monitoring and budget management

**Responsibilities**:
- Calculate cost per request
- Track monthly spending
- Generate budget alerts
- Identify high-cost requests
- Project future costs

**Key Features**:
- Configurable budget thresholds
- Automatic alert generation
- Cost breakdown by operation
- High-cost request identification

**Usage**:
```typescript
import { getCostTracker } from './services/costTracker';

const costTracker = getCostTracker();

// Get current month cost
const cost = costTracker.getCurrentMonthCost();
console.log('Current cost:', cost);

// Check thresholds (generates alerts if needed)
const alerts = costTracker.checkThresholds();

// Set custom budget
costTracker.setMonthlyBudget(1000); // $1000/month

// Get high-cost requests
const highCost = costTracker.getHighCostRequests(0.001);
```

### 3. AnalyticsDashboard (`../components/ai/AnalyticsDashboard.tsx`)

**Purpose**: Visual dashboard for monitoring

**Features**:
- Key metrics cards (requests, cost, errors, latency)
- Daily request chart
- Performance breakdown by operation
- Error breakdown by type
- Cache performance metrics
- Request distribution (by model and feature)
- Time range selector (24h, 7d, 30d)

**Usage**:
```tsx
import { AnalyticsDashboard } from './components/ai/AnalyticsDashboard';

function AdminPage() {
  return (
    <div>
      <h1>AI Analytics</h1>
      <AnalyticsDashboard />
    </div>
  );
}
```

### 4. CostAlerts (`../components/ai/CostAlerts.tsx`)

**Purpose**: Display cost alerts to users

**Features**:
- Fixed position alerts (top-right)
- Warning and critical severity levels
- Progress bar showing budget usage
- Dismissible alerts
- Real-time event listening

**Usage**:
```tsx
import { CostAlerts } from './components/ai/CostAlerts';

function App() {
  return (
    <div>
      <CostAlerts />
      {/* Rest of app */}
    </div>
  );
}
```

## Data Flow

### 1. API Call Logging

```
GeminiService.analyzeProject()
  ↓
Calculate latency & tokens
  ↓
MetricsService.logApiCall()
  ↓
Store in memory + localStorage
```

### 2. Cache Hit Logging

```
useGemini.analyzeProject()
  ↓
Check cache
  ↓
Cache hit found
  ↓
MetricsService.logApiCall({ cacheHit: true })
```

### 3. Cost Alert Flow

```
useGemini initialization
  ↓
CostTracker.checkThresholds() (every hour)
  ↓
Calculate current month cost
  ↓
Compare to budget thresholds
  ↓
Generate alerts if needed
  ↓
Dispatch 'cost-alert' event
  ↓
CostAlerts component displays alert
```

## Metrics Tracked

### Usage Metrics
- **Total Requests**: Count of all API calls
- **Requests by Model**: Flash vs Pro usage
- **Requests by Feature**: Analysis, suggestions, enhancement

### Performance Metrics
- **Average Latency**: Mean response time
- **P95 Latency**: 95th percentile response time
- **P99 Latency**: 99th percentile response time

### Reliability Metrics
- **Error Rate**: Percentage of failed requests
- **Fallback Rate**: Percentage using rule-based fallback
- **Cache Hit Rate**: Percentage of requests served from cache

### Cost Metrics
- **Total Tokens Used**: Sum of all tokens consumed
- **Estimated Cost**: Calculated cost in USD
- **Cost Per User**: Average cost per user

## Cost Calculation

### Pricing Model

```typescript
Gemini 2.0 Flash:
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens
- Average: $0.1875 per 1M tokens (assuming 50/50 split)
```

### Token Estimation

```typescript
// Rough approximation: 1 token ≈ 4 characters
tokens = (promptLength + responseLength) / 4
```

### Cost Formula

```typescript
cost = tokens × (inputPrice + outputPrice) / 2
```

## Alert Thresholds

### Budget Alerts

| Threshold | Severity | Action |
|-----------|----------|--------|
| 80% of budget | Warning | Yellow alert, notify user |
| 100% of budget | Critical | Red alert, recommend action |

**Default Budget**: $500/month

**Alert Cooldown**: 24 hours per severity level

## Storage

### LocalStorage Keys

- `lovabolt-gemini-metrics`: Metrics logs and metadata
- `lovabolt-cost-tracker`: Cost alerts and budget settings

### Storage Limits

- **Metrics**: Last 1000 log entries (~100KB)
- **Cost Tracker**: All alerts for current month (~10KB)

### Quota Management

Both services handle `QuotaExceededError` gracefully:
1. Remove oldest entries
2. Retry save operation
3. Log error if retry fails

## Performance Considerations

### Metrics Service
- **Log Rotation**: Automatic at 1000 entries
- **Calculation Speed**: <10ms for metrics
- **Storage Impact**: ~100KB for 1000 entries

### Cost Tracker
- **Check Frequency**: Once per hour
- **Alert Generation**: <5ms
- **Storage Impact**: Minimal (~10KB)

### Analytics Dashboard
- **Render Time**: <100ms
- **Update Frequency**: On mount and time range change
- **Data Processing**: Client-side only

## Best Practices

### 1. Regular Monitoring

```typescript
// Check metrics daily
const metrics = metricsService.getMetrics(86400000);
if (metrics.errorRate > 0.05) {
  console.warn('High error rate detected:', metrics.errorRate);
}
```

### 2. Cost Optimization

```typescript
// Identify high-cost requests
const highCost = costTracker.getHighCostRequests(0.001);
console.log('High-cost requests:', highCost.length);

// Analyze cost by operation
const costByOp = costTracker.getCostByOperation();
console.log('Most expensive operation:', 
  Object.entries(costByOp).sort((a, b) => b[1] - a[1])[0]
);
```

### 3. Performance Monitoring

```typescript
// Check latency by operation
const latency = metricsService.getLatencyByOperation();
for (const [op, lat] of Object.entries(latency)) {
  if (lat > 2000) {
    console.warn(`Slow operation detected: ${op} (${lat}ms)`);
  }
}
```

### 4. Error Analysis

```typescript
// Get error breakdown
const errors = metricsService.getErrorBreakdown();
console.log('Error distribution:', errors);

// Most common error
const mostCommon = Object.entries(errors)
  .sort((a, b) => b[1] - a[1])[0];
console.log('Most common error:', mostCommon);
```

## Troubleshooting

### Issue: Metrics not appearing in dashboard

**Solution**:
1. Check if MetricsService is logging calls
2. Verify localStorage is not full
3. Check browser console for errors
4. Ensure time range includes logged data

### Issue: Cost alerts not appearing

**Solution**:
1. Verify CostTracker is initialized
2. Check if budget threshold is set correctly
3. Ensure cost exceeds 80% of budget
4. Check if alert was already shown in last 24h

### Issue: High memory usage

**Solution**:
1. Check log count: `metricsService.getStats().size`
2. If >1000, logs should auto-rotate
3. Manually clear if needed: `metricsService.clear()`

### Issue: Inaccurate cost calculations

**Solution**:
1. Verify token estimation is reasonable
2. Check pricing model is up to date
3. Compare with actual Gemini API billing
4. Adjust estimation if needed

## Future Enhancements

### Phase 3 Additions

1. **Advanced Analytics**:
   - User segmentation
   - Conversion tracking
   - A/B testing results
   - ROI calculations

2. **Enhanced Monitoring**:
   - Real-time alerting
   - Slack/email notifications
   - Custom alert rules
   - Alert history and trends

3. **Cost Optimization**:
   - Automatic optimization suggestions
   - Token usage analysis
   - Model selection recommendations
   - Batch request optimization

4. **Reporting**:
   - Weekly/monthly reports
   - Executive summaries
   - Trend analysis
   - Comparative analysis

## Related Documentation

- [Task 12 Completion Summary](../../docs/TASK_12_COMPLETION_SUMMARY.md)
- [Gemini Integration Summary](../../docs/GEMINI_INTEGRATION_SUMMARY.md)
- [Requirements](../../.kiro/specs/gemini-ai-integration/requirements.md)
- [Design](../../.kiro/specs/gemini-ai-integration/design.md)

## Support

For questions or issues:
1. Check this README
2. Review completion summary
3. Check browser console for errors
4. Verify localStorage is accessible
5. Test with sample data
