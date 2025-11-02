# AI Components

This directory contains AI-powered components that enhance the LovaBolt wizard experience.

## Components

### AIFeaturesTour
Interactive tour for first-time users explaining AI features.

**Usage:**
```tsx
import { AIFeaturesTour } from './components/ai';

<AIFeaturesTour
  onComplete={() => console.log('Tour completed')}
  onSkip={() => console.log('Tour skipped')}
/>
```

### SmartSuggestionPanel
Displays context-aware suggestions based on user selections.

**Features:**
- Confidence scores for each suggestion
- Reasoning explanations
- One-click apply buttons
- Collapsible panel
- Help tooltip with documentation link

**Usage:**
```tsx
import { SmartSuggestionPanel } from './components/ai';

<SmartSuggestionPanel
  suggestions={suggestions}
  onApplySuggestion={(suggestion, item) => {
    // Apply the suggestion
  }}
/>
```

### PromptQualityScore
Analyzes and displays prompt quality with actionable suggestions.

**Features:**
- Quality score (0-100)
- Strengths and weaknesses
- Categorized suggestions (warnings, tips, recommendations)
- Auto-fix button
- Help tooltip with documentation link

**Usage:**
```tsx
import { PromptQualityScore } from './components/ai';

<PromptQualityScore
  analysis={analysisResult}
  onApplyFixes={() => {
    // Apply auto-fixes
  }}
/>
```

### CompatibilityIndicator
Shows design harmony score and compatibility issues.

**Features:**
- Design Harmony score
- Color-coded harmony levels (excellent, good, fair, poor)
- Issues and warnings with suggestions
- Auto-fix buttons for fixable issues
- Help tooltip with documentation link

**Usage:**
```tsx
import { CompatibilityIndicator } from './components/ai';

<CompatibilityIndicator
  compatibility={compatibilityResult}
  onAutoFix={(issue) => {
    // Handle auto-fix
  }}
/>
```

### NLPInput
Natural language input for project description parsing.

**Features:**
- Real-time parsing with debouncing
- Confidence indicators for detections
- Visual feedback for detected preferences
- Help tooltip with documentation link

**Usage:**
```tsx
import { NLPInput } from './components/ai';

<NLPInput
  onApplyDetections={(result) => {
    // Apply detected preferences
  }}
/>
```

### FeedbackPrompt
Collects user feedback on AI features.

**Features:**
- Thumbs up/down buttons
- Optional comment field
- Glassmorphism design
- LocalStorage persistence

**Usage:**
```tsx
import { FeedbackPrompt } from './components/ai';

<FeedbackPrompt
  feature="smart_defaults"
  onFeedback={(feedback) => {
    // Handle feedback
  }}
  onDismiss={() => {
    // Handle dismiss
  }}
/>
```

## Help Features

All AI components include:

1. **Tooltips**: Hover over the help icon (?) to see a brief explanation
2. **Documentation Links**: Click the help icon to open detailed documentation
3. **Contextual Help**: Each component explains its purpose and how to use it
4. **Tour Integration**: Components are highlighted during the first-time user tour

## Data Attributes

Components use `data-tour` attributes for tour highlighting:

- `data-tour="ai-suggestions"` - SmartSuggestionPanel
- `data-tour="prompt-quality"` - PromptQualityScore
- `data-tour="design-harmony"` - CompatibilityIndicator
- `data-tour="smart-defaults"` - Smart defaults button (in parent component)

## Accessibility

All AI components follow WCAG 2.1 AA guidelines:

- Keyboard navigation support
- ARIA labels and roles
- Focus indicators
- Screen reader announcements
- Color contrast compliance

## Performance

AI components are optimized for performance:

- React.memo for expensive components
- useCallback for event handlers
- Debouncing for real-time features
- Memoization for calculations

### AIErrorBoundary
Error boundary for AI features that provides graceful degradation.

**Features:**
- Catches errors in AI components
- Shows user-friendly error messages
- Allows wizard to continue functioning
- Logs errors for debugging
- Provides retry functionality

**Usage:**
```tsx
import { AIErrorBoundary, AIFeatureWrapper } from './components/ai';

// Basic usage
<AIErrorBoundary fallbackMessage="Smart suggestions temporarily unavailable">
  <SmartSuggestionPanel suggestions={suggestions} />
</AIErrorBoundary>

// Using the wrapper with feature name
<AIFeatureWrapper featureName="Smart suggestions">
  <SmartSuggestionPanel suggestions={suggestions} />
</AIFeatureWrapper>

// Wrapping multiple AI features
<AIErrorBoundary>
  <SmartSuggestionPanel suggestions={suggestions} />
  <CompatibilityIndicator compatibility={compatibility} />
</AIErrorBoundary>
```

**Props:**
- `fallbackMessage` (optional): Custom error message to display
- `showRetry` (optional): Whether to show retry button (default: true)

**Best Practices:**
1. Wrap each AI component individually for isolated error handling
2. Use descriptive fallback messages that explain what feature is unavailable
3. Always allow the wizard to continue functioning even if AI features fail
4. Test error scenarios to ensure graceful degradation

## Error Handling

All AI features include comprehensive error handling:

### Safe Wrappers
Each AI utility function has a safe wrapper that handles errors gracefully:

```tsx
// Prompt Analysis
import { safeAnalyzePrompt } from '../utils/promptAnalyzer';
const analysis = safeAnalyzePrompt(input); // Returns default on error

// Compatibility Checking
import { safeCheckCompatibility } from '../utils/compatibilityChecker';
const compatibility = safeCheckCompatibility(selections); // Returns default on error

// NLP Parsing
import { safeParseProjectDescription } from '../utils/nlpParser';
const result = safeParseProjectDescription(description); // Returns empty on error

// Smart Defaults
import { safeGetSmartDefaults, safeApplySmartDefaults } from '../utils/smartDefaults';
const defaults = safeGetSmartDefaults(projectType, purpose); // Returns empty on error

// Compatibility Mappings
import {
  safeGetCompatibleThemes,
  safeGetCompatibleAnimations,
  safeGetCompatibleBackgrounds,
  safeGetAdvancedComponents,
  safeGetBasicComponents
} from '../utils/compatibilityMappings';
```

### Error Boundary Integration
Wrap AI components with error boundaries in your wizard steps:

```tsx
import { AIFeatureWrapper } from './components/ai';
import { SmartSuggestionPanel } from './components/ai';

const ColorThemeStep = () => {
  return (
    <div>
      {/* Main content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Color theme options */}
      </div>

      {/* AI features with error boundary */}
      <AIFeatureWrapper featureName="Smart suggestions">
        <SmartSuggestionPanel
          suggestions={suggestions}
          onApplySuggestion={handleApply}
        />
      </AIFeatureWrapper>
    </div>
  );
};
```

### Graceful Degradation
AI features are designed to fail gracefully:

1. **Safe Wrappers**: Return sensible defaults instead of throwing errors
2. **Error Boundaries**: Catch component errors and show fallback UI
3. **Wizard Continuity**: Main wizard functionality always works
4. **User Feedback**: Clear messages explain what's unavailable
5. **Retry Options**: Users can attempt to reload failed features

## Documentation

For detailed information about AI features, see:

- `/docs/AI_FEATURES_GUIDE.md` - User guide
- `/docs/AI_ALGORITHMS.md` - Technical documentation
- `.kiro/specs/ai-intelligence-features/` - Requirements and design specs
