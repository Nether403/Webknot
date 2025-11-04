# AI Feedback and Learning System

## Overview

The feedback and learning system collects user feedback on AI features, analyzes acceptance rates, and uses this data to optimize AI prompts over time. This creates a continuous improvement loop that enhances AI suggestion quality based on real user interactions.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interactions                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Suggestions  │  │ Enhancements │  │ Chat         │     │
│  │ (thumbs up/  │  │ (accept/     │  │ (thumbs up/  │     │
│  │  down)       │  │  reject)     │  │  down)       │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                    ┌────────▼────────┐
                    │ FeedbackService │
                    │  - Collection   │
                    │  - Storage      │
                    │  - Analysis     │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
   ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐
   │  Analytics   │  │ Optimization │  │   Insights   │
   │  Dashboard   │  │   Service    │  │  Generation  │
   └──────────────┘  └──────────────┘  └──────────────┘
```

## Components

### 1. FeedbackService (`feedbackService.ts`)

Core service for collecting and storing user feedback.

**Key Features:**
- Records thumbs up/down feedback
- Tracks suggestion acceptance/rejection
- Calculates acceptance rates by feature and type
- Identifies low-quality suggestions
- Generates improvement recommendations
- Exports data for analysis

**Usage:**
```typescript
import { getFeedbackService } from './services/feedbackService';

const feedbackService = getFeedbackService();

// Record feedback
feedbackService.recordFeedback(
  'thumbs-up',
  'suggestion',
  'suggestion_123',
  { suggestionType: 'improvement', severity: 'medium' }
);

// Get statistics
const stats = feedbackService.getStats();
console.log(`Acceptance rate: ${stats.acceptanceRate * 100}%`);

// Get low-quality suggestions
const lowQuality = feedbackService.getLowQualitySuggestions(0.5);
```

### 2. PromptOptimizationService (`promptOptimization.ts`)

Service for A/B testing prompt variations and rolling out winners.

**Key Features:**
- Create and manage prompt variations
- Run A/B tests between variations
- Analyze test results automatically
- Roll out winning variations
- Generate optimization suggestions

**Usage:**
```typescript
import { getPromptOptimizationService } from './services/promptOptimization';

const optimizationService = getPromptOptimizationService();

// Create variations
const variationA = optimizationService.createVariation(
  'Original Prompt',
  'Analyze this design...',
  'suggestion',
  'A'
);

const variationB = optimizationService.createVariation(
  'Improved Prompt',
  'Analyze this design with focus on...',
  'suggestion',
  'B'
);

// Start A/B test
const test = optimizationService.startABTest(
  'suggestion',
  variationA.id,
  variationB.id
);

// Analyze results (after collecting feedback)
const results = optimizationService.analyzeTest(test.id);

// Roll out winner
if (results?.results) {
  optimizationService.rolloutWinner(test.id);
}
```

### 3. UI Components

#### FeedbackButtons (`FeedbackButtons.tsx`)

Simple thumbs up/down buttons for collecting feedback.

```tsx
import { FeedbackButtons } from './components/ai';

<FeedbackButtons
  target="suggestion"
  targetId="suggestion_123"
  metadata={{
    suggestionType: 'improvement',
    suggestionSeverity: 'medium',
  }}
  onFeedback={(type) => console.log(`User gave ${type}`)}
/>
```

#### FeedbackAnalytics (`FeedbackAnalytics.tsx`)

Comprehensive analytics dashboard showing:
- Total feedback count
- Overall acceptance rate
- Feedback by feature type
- Low-quality suggestions
- Actionable recommendations

```tsx
import { FeedbackAnalytics } from './components/ai';

<FeedbackAnalytics className="my-6" />
```

#### PromptOptimizationPanel (`PromptOptimizationPanel.tsx`)

UI for managing prompt variations and A/B tests.

```tsx
import { PromptOptimizationPanel } from './components/ai';

<PromptOptimizationPanel
  target="suggestion"
  className="my-6"
/>
```

## Data Flow

### 1. Feedback Collection

```
User Action → FeedbackButtons → FeedbackService → localStorage
                                       ↓
                                  Analytics
```

### 2. Analysis

```
FeedbackService.getStats() → Calculate acceptance rates
                           → Identify low-quality items
                           → Generate recommendations
```

### 3. Optimization

```
Create Variations → Start A/B Test → Collect Feedback
                                           ↓
                    Analyze Results ← Enough Data?
                           ↓
                    Roll Out Winner
```

## Storage

### LocalStorage Keys

- `lovabolt-ai-feedback`: Feedback entries and metadata
- `lovabolt-prompt-optimization`: Prompt variations and test results

### Data Structure

**Feedback Entry:**
```typescript
{
  id: "feedback_1234567890_abc123",
  timestamp: 1234567890000,
  type: "thumbs-up" | "thumbs-down",
  target: "suggestion" | "enhancement" | "analysis" | "chat",
  targetId: "suggestion_123",
  content: "Optional text feedback",
  metadata: {
    suggestionType: "improvement",
    suggestionSeverity: "medium",
    wasAccepted: true
  }
}
```

**Prompt Variation:**
```typescript
{
  id: "opt_1234567890_abc123",
  name: "Improved Prompt v2",
  prompt: "Analyze this design...",
  target: "suggestion",
  createdAt: 1234567890000,
  isActive: true,
  testGroup: "A" | "B"
}
```

## Metrics

### Key Performance Indicators

1. **Acceptance Rate**: Percentage of positive feedback
   - Target: >70% (excellent), >50% (good), <50% (needs improvement)

2. **Feedback Volume**: Total feedback entries
   - Minimum: 50 entries per feature for reliable insights

3. **Low-Quality Items**: Features with <50% acceptance
   - Target: 0 low-quality items

4. **Test Improvement**: Percentage improvement from A/B tests
   - Track winning variation performance vs. baseline

### Tracking Accuracy Over Time

```typescript
const feedbackService = getFeedbackService();

// Get acceptance rates for different time periods
const accuracy = feedbackService.trackAccuracyOverTime([7, 14, 30]);
// Returns: { "7d": 0.75, "14d": 0.72, "30d": 0.68 }
```

## Best Practices

### 1. Collecting Feedback

- **Place feedback buttons prominently** but not intrusively
- **Show thank you message** after feedback is given
- **Disable buttons after feedback** to prevent duplicate entries
- **Include context in metadata** for better analysis

### 2. Analyzing Feedback

- **Wait for sufficient data** (minimum 30-50 entries) before making decisions
- **Look for patterns** in low-quality suggestions
- **Consider time ranges** (recent feedback may be more relevant)
- **Track trends over time** to measure improvement

### 3. Running A/B Tests

- **Test one variable at a time** for clear results
- **Run tests long enough** to collect 30+ feedback entries per variation
- **Use statistical significance** before declaring a winner
- **Document test results** for future reference

### 4. Optimizing Prompts

- **Start with low-hanging fruit** (items with <30% acceptance)
- **Make incremental changes** rather than complete rewrites
- **Test variations** before rolling out to all users
- **Monitor impact** after rolling out changes

## Integration with Existing Components

### DesignSuggestions

Feedback buttons are automatically added to each suggestion card:

```tsx
// In DesignSuggestions.tsx
<FeedbackButtons
  target="suggestion"
  targetId={`suggestion_${index}`}
  metadata={{
    suggestionType: suggestion.type,
    suggestionSeverity: suggestion.severity,
    autoFixable: suggestion.autoFixable,
  }}
/>
```

### PromptEnhancement

Tracks acceptance/rejection automatically:

```tsx
// In PromptEnhancement.tsx
const handleAccept = () => {
  feedbackService.recordEnhancementAction(enhancementId, true);
  onAccept();
};

const handleReject = () => {
  feedbackService.recordEnhancementAction(enhancementId, false);
  onReject();
};
```

## Troubleshooting

### Low Acceptance Rates

**Problem**: Overall acceptance rate is below 50%

**Solutions**:
1. Review feedback analytics to identify specific problem areas
2. Check low-quality suggestions list
3. Generate optimization suggestions
4. Create and test prompt variations
5. Monitor improvement after changes

### Insufficient Feedback Data

**Problem**: Not enough feedback to generate reliable insights

**Solutions**:
1. Make feedback buttons more prominent
2. Add feedback prompts at key interaction points
3. Consider incentivizing feedback (e.g., "Help us improve")
4. Wait for more user interactions before analyzing

### A/B Test Not Conclusive

**Problem**: Test results show no clear winner

**Solutions**:
1. Collect more feedback (aim for 50+ per variation)
2. Ensure variations are sufficiently different
3. Check if external factors affected results
4. Consider running test longer

## Future Enhancements

### Planned Features

1. **Machine Learning Integration**
   - Use feedback to train ML models
   - Predict suggestion quality before showing to users
   - Personalize suggestions based on user preferences

2. **Advanced Analytics**
   - Cohort analysis (user segments)
   - Time-series analysis (trends)
   - Correlation analysis (feature interactions)

3. **Automated Optimization**
   - Auto-generate prompt variations
   - Auto-start A/B tests when acceptance drops
   - Auto-rollout winners when statistically significant

4. **Real-time Monitoring**
   - Live dashboard with real-time updates
   - Alerts for sudden drops in acceptance
   - Anomaly detection

## API Reference

### FeedbackService

```typescript
class FeedbackService {
  // Record feedback
  recordFeedback(
    type: 'thumbs-up' | 'thumbs-down',
    target: FeedbackTarget,
    targetId: string,
    metadata?: Record<string, unknown>,
    content?: string
  ): UserFeedback;
  
  // Record suggestion action
  recordSuggestionAction(
    suggestionId: string,
    accepted: boolean,
    suggestionType?: string,
    severity?: string
  ): void;
  
  // Get feedback
  getFeedback(target?: FeedbackTarget, since?: number): UserFeedback[];
  
  // Get statistics
  getStats(since?: number): FeedbackStats;
  
  // Get low-quality suggestions
  getLowQualitySuggestions(threshold?: number): Array<{
    type: string;
    acceptanceRate: number;
    totalCount: number;
  }>;
  
  // Track accuracy over time
  trackAccuracyOverTime(periods?: number[]): Record<string, number>;
  
  // Generate recommendations
  generateRecommendations(): Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    message: string;
    action: string;
  }>;
  
  // Export data
  export(): string;
  
  // Clear data
  clear(): void;
}
```

### PromptOptimizationService

```typescript
class PromptOptimizationService {
  // Create variation
  createVariation(
    name: string,
    prompt: string,
    target: FeedbackTarget,
    testGroup?: 'A' | 'B'
  ): PromptVariation;
  
  // Start A/B test
  startABTest(
    target: FeedbackTarget,
    variationAId: string,
    variationBId: string
  ): PromptTest;
  
  // Analyze test
  analyzeTest(testId: string): PromptTest | null;
  
  // Roll out winner
  rolloutWinner(testId: string): PromptVariation;
  
  // Get active prompt
  getActivePrompt(target: FeedbackTarget): PromptVariation | null;
  
  // Get variations
  getVariations(target: FeedbackTarget): PromptVariation[];
  
  // Get tests
  getActiveTests(): PromptTest[];
  getCompletedTests(): PromptTest[];
  
  // Generate suggestions
  generateOptimizationSuggestions(target: FeedbackTarget): string[];
  
  // Clear data
  clear(): void;
}
```

## Conclusion

The feedback and learning system provides a comprehensive solution for continuously improving AI suggestion quality. By collecting user feedback, analyzing patterns, and optimizing prompts through A/B testing, the system ensures that AI features become more accurate and helpful over time.

For questions or issues, refer to the main Gemini AI integration documentation or contact the development team.
