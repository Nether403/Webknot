# Design Suggestions Integration Guide

## Overview

The Design Suggestions feature provides AI-powered recommendations for improving design compatibility and user experience. This guide explains how to integrate design suggestions into wizard steps.

## Architecture

### Components

1. **GeminiService.suggestImprovements()** - Core AI service method that analyzes wizard state
2. **useGemini.suggestImprovements()** - Hook method with caching and rate limiting
3. **useDesignSuggestions()** - High-level hook for managing suggestions state
4. **DesignSuggestions** - UI component for displaying suggestions
5. **CompatibilityIndicator** - Enhanced to show AI suggestions count

### Data Flow

```
Wizard State Changes
  ↓
useDesignSuggestions (debounced)
  ↓
useGemini.suggestImprovements
  ↓
Cache Check → GeminiService.suggestImprovements → Gemini API
  ↓
DesignSuggestion[] returned
  ↓
DesignSuggestions Component displays results
```

## Integration Steps

### Step 1: Import Required Dependencies

```typescript
import { DesignSuggestions } from '../ai/DesignSuggestions';
import { useDesignSuggestions } from '../../hooks/useDesignSuggestions';
import type { DesignSuggestion } from '../../types/gemini';
```

### Step 2: Initialize the Hook

```typescript
const {
  suggestions,
  isLoading: suggestionsLoading,
  isVisible: suggestionsVisible,
  showSuggestions,
  hideSuggestions,
  analyzeSuggestions, // Manual trigger
} = useDesignSuggestions({
  autoAnalyze: true,      // Auto-trigger on state changes
  minSelections: 2,       // Minimum selections before analyzing
  debounceMs: 1000,       // Debounce delay
});
```

### Step 3: Add Suggestions Component to UI

```typescript
{/* AI Design Suggestions */}
{suggestionsVisible && (suggestions.length > 0 || suggestionsLoading) && (
  <DesignSuggestions
    suggestions={suggestions}
    isLoading={suggestionsLoading}
    onApplyFixes={handleApplyFixes}
    onDismiss={hideSuggestions}
  />
)}
```

### Step 4: Add View Suggestions Button (Optional)

```typescript
{suggestions.length > 0 && !suggestionsVisible && (
  <Button
    onClick={showSuggestions}
    variant="outline"
    className="border-teal-500/30 hover:bg-teal-500/10 text-teal-300"
  >
    View {suggestions.length} Suggestion{suggestions.length !== 1 ? 's' : ''}
  </Button>
)}
```

### Step 5: Implement Auto-Fix Handler (Optional)

```typescript
const handleApplyFixes = (fixableSuggestions: DesignSuggestion[]) => {
  console.log('Applying fixes:', fixableSuggestions);
  
  // Example: Apply color theme fix
  fixableSuggestions.forEach(suggestion => {
    if (suggestion.message.includes('color theme')) {
      // Update wizard state based on suggestion
      // setSelectedColorTheme(recommendedTheme);
    }
  });
};
```

## Hook Options

### useDesignSuggestions Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoAnalyze` | boolean | `true` | Automatically trigger analysis on state changes |
| `minSelections` | number | `2` | Minimum selections required before analysis |
| `debounceMs` | number | `1000` | Debounce delay before triggering analysis |

### Hook Return Values

| Property | Type | Description |
|----------|------|-------------|
| `suggestions` | `DesignSuggestion[]` | Current AI suggestions |
| `isLoading` | boolean | Whether analysis is in progress |
| `error` | `Error \| null` | Error from analysis |
| `isVisible` | boolean | Whether suggestions panel is visible |
| `analyzeSuggestions` | function | Manually trigger analysis |
| `showSuggestions` | function | Show suggestions panel |
| `hideSuggestions` | function | Hide suggestions panel |
| `toggleSuggestions` | function | Toggle panel visibility |
| `clearSuggestions` | function | Clear current suggestions |

## Suggestion Types

### DesignSuggestion Interface

```typescript
interface DesignSuggestion {
  type: 'improvement' | 'warning' | 'tip';
  message: string;
  reasoning: string;
  autoFixable: boolean;
  severity: 'low' | 'medium' | 'high';
}
```

### Suggestion Types

- **improvement**: Enhancement opportunity
- **warning**: Potential issue that should be addressed
- **tip**: Helpful advice or best practice

### Severity Levels

- **high**: Critical issue (red badge)
- **medium**: Should address (yellow badge)
- **low**: Nice to have (blue badge)

## CompatibilityIndicator Integration

The CompatibilityIndicator can now show AI suggestions:

```typescript
<CompatibilityIndicator
  compatibility={compatibilityResult}
  onAutoFix={handleAutoFix}
  onViewAISuggestions={showSuggestions}
  aiSuggestionsCount={suggestions.length}
/>
```

This adds a "View X AI Suggestions" button at the bottom of the indicator.

## Performance Considerations

### Caching

- Suggestions are cached based on wizard state
- Cache key includes: projectType, designStyle, colorTheme, components, background, animations
- Cache TTL: 1 hour (configurable in CacheService)
- Cache hits don't consume rate limit quota

### Rate Limiting

- Free users: 20 requests/hour
- Cache hits don't count toward limit
- Rate limit status shown in UI
- Graceful degradation when limit reached

### Debouncing

- Default 1000ms debounce prevents excessive API calls
- Adjustable via `debounceMs` option
- Only triggers when `minSelections` threshold met

## Example: Complete Integration

```typescript
import React from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { Button } from '../ui/button';
import { DesignSuggestions } from '../ai/DesignSuggestions';
import { useDesignSuggestions } from '../../hooks/useDesignSuggestions';
import type { DesignSuggestion } from '../../types/gemini';

const MyWizardStep: React.FC = () => {
  const { setCurrentStep } = useBoltBuilder();
  
  // Initialize suggestions
  const {
    suggestions,
    isLoading: suggestionsLoading,
    isVisible: suggestionsVisible,
    showSuggestions,
    hideSuggestions,
  } = useDesignSuggestions({
    autoAnalyze: true,
    minSelections: 2,
    debounceMs: 1000,
  });
  
  // Handle auto-fixes
  const handleApplyFixes = (fixableSuggestions: DesignSuggestion[]) => {
    console.log('Applying fixes:', fixableSuggestions);
    // Implement fix logic here
  };

  return (
    <div className="space-y-8">
      {/* Step content */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Step Title</h2>
        <p className="text-gray-300">Step description</p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Your step content here */}
      </div>
      
      {/* AI Suggestions */}
      {suggestionsVisible && (suggestions.length > 0 || suggestionsLoading) && (
        <DesignSuggestions
          suggestions={suggestions}
          isLoading={suggestionsLoading}
          onApplyFixes={handleApplyFixes}
          onDismiss={hideSuggestions}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button onClick={() => setCurrentStep('previous')} variant="outline">
          Back
        </Button>
        
        <div className="flex gap-2">
          {suggestions.length > 0 && !suggestionsVisible && (
            <Button
              onClick={showSuggestions}
              variant="outline"
              className="border-teal-500/30 hover:bg-teal-500/10 text-teal-300"
            >
              View {suggestions.length} Suggestion{suggestions.length !== 1 ? 's' : ''}
            </Button>
          )}
          
          <Button onClick={() => setCurrentStep('next')}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyWizardStep;
```

## Best Practices

### When to Show Suggestions

1. **Auto-show**: Display automatically when high-severity suggestions are found
2. **Button**: Show button when suggestions exist but panel is hidden
3. **Inline**: Integrate with CompatibilityIndicator for contextual display

### Minimum Selections

- **2 selections**: Good for early feedback (design + color)
- **3 selections**: More comprehensive analysis (design + color + components)
- **4+ selections**: Full compatibility analysis

### Debounce Timing

- **500ms**: Responsive but may trigger frequently
- **1000ms**: Balanced (recommended)
- **2000ms**: Conservative, fewer API calls

### Manual vs Auto Analysis

**Use Auto Analysis When:**
- User is actively making selections
- Real-time feedback is valuable
- Step has multiple selection points

**Use Manual Analysis When:**
- Step has single selection
- User explicitly requests analysis
- Conserving API quota is important

## Troubleshooting

### Suggestions Not Appearing

1. Check minimum selections threshold met
2. Verify AI is enabled in preferences
3. Check rate limit status
4. Review console for errors
5. Verify API key is configured

### Suggestions Loading Forever

1. Check network connectivity
2. Verify Gemini API is accessible
3. Check for timeout errors in console
4. Verify API key is valid

### Cache Not Working

1. Check cache is enabled in useGemini options
2. Verify localStorage is available
3. Check cache TTL hasn't expired
4. Review cache key generation

## Related Documentation

- [Gemini AI Integration Spec](../.kiro/specs/gemini-ai-integration/)
- [AI Features Guide](./AI_FEATURES_GUIDE.md)
- [Gemini Service README](../src/services/README.md)
- [useGemini Hook README](../src/hooks/README.md)

## Future Enhancements

- Auto-fix implementation for common issues
- Suggestion history and tracking
- User feedback on suggestion quality
- A/B testing different suggestion prompts
- Premium tier with unlimited suggestions
