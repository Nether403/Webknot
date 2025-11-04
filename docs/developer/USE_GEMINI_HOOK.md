# useGemini Hook Documentation

## Overview

The `useGemini` hook is the primary interface for integrating Gemini AI features into React components. It provides intelligent project analysis with automatic caching, fallback support, and comprehensive error handling.

**Location:** `src/hooks/useGemini.ts`

## Features

- 🤖 **AI-Powered Analysis** - Semantic understanding using Gemini 2.5
- ⚡ **Intelligent Caching** - <50ms cache hits with LRU eviction
- 🔄 **Automatic Fallback** - Seamless switch to rule-based system on failure
- 🛡️ **Error Handling** - Comprehensive error management with user-friendly messages
- ⏱️ **Performance Optimized** - Loading indicators within 100ms
- 🚦 **Rate Limiting** - Built-in request throttling
- 📊 **State Management** - Loading, error, and fallback states

## Installation

No additional installation required - the hook is part of the LovaBolt codebase.

## Basic Usage

```typescript
import { useGemini } from './hooks/useGemini';

function ProjectSetupStep() {
  const { isLoading, error, isUsingFallback, analyzeProject } = useGemini();
  
  const handleAnalyze = async (description: string) => {
    try {
      const analysis = await analyzeProject(description);
      console.log('Project type:', analysis.projectType);
      console.log('Confidence:', analysis.confidence);
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };
  
  return (
    <div>
      {isLoading && <LoadingIndicator />}
      {isUsingFallback && <FallbackNotice />}
      {error && <ErrorMessage error={error} />}
      <button onClick={() => handleAnalyze(userInput)}>
        Analyze Project
      </button>
    </div>
  );
}
```

## API Reference

### Hook Signature

```typescript
function useGemini(options?: UseGeminiOptions): UseGeminiResult
```

### Options

```typescript
interface UseGeminiOptions {
  enableCache?: boolean;      // Enable response caching (default: true)
  enableFallback?: boolean;   // Enable fallback to rule-based system (default: true)
  timeout?: number;           // API timeout in milliseconds (default: 2000)
  onError?: (error: Error) => void;  // Error callback
}
```

**Option Details:**

- **enableCache** - When true, identical requests return cached responses
- **enableFallback** - When true, automatically uses rule-based system on AI failure
- **timeout** - Maximum time to wait for AI response before fallback
- **onError** - Callback function called when errors occur

### Return Value

```typescript
interface UseGeminiResult {
  // State
  isLoading: boolean;
  error: Error | null;
  isUsingFallback: boolean;
  
  // Methods
  analyzeProject: (description: string) => Promise<ProjectAnalysis>;
  suggestImprovements: (state: BoltBuilderState) => Promise<DesignSuggestion[]>;
  enhancePrompt: (prompt: string) => Promise<PromptEnhancement>;
  chat: (message: string) => Promise<string>;
  
  // Rate limiting
  remainingRequests: number;
  resetTime: number;
  
  // Cache control
  clearCache: () => void;
}
```

## Methods

### analyzeProject()

Analyzes a project description and returns intelligent recommendations.

```typescript
analyzeProject(description: string): Promise<ProjectAnalysis>
```

**Example:**

```typescript
const { analyzeProject } = useGemini();

const analysis = await analyzeProject(
  'I want to build a modern e-commerce site for selling handmade jewelry'
);

console.log(analysis);
// {
//   projectType: 'E-commerce',
//   designStyle: 'elegant',
//   colorTheme: 'warm-luxury',
//   reasoning: 'E-commerce sites for luxury items benefit from elegant designs...',
//   confidence: 0.89,
//   suggestedComponents: ['product-grid', 'shopping-cart'],
//   suggestedAnimations: ['fade-in', 'slide-up']
// }
```

**Performance:**
- Cache hit: <50ms
- AI call: 500-2000ms
- Fallback: <100ms

### suggestImprovements() (Phase 2)

Analyzes current design selections and provides compatibility suggestions.

```typescript
suggestImprovements(state: BoltBuilderState): Promise<DesignSuggestion[]>
```

**Example:**

```typescript
const { suggestImprovements } = useGemini();

const suggestions = await suggestImprovements(wizardState);

suggestions.forEach(suggestion => {
  if (suggestion.severity === 'high') {
    console.warn(suggestion.message);
  }
  if (suggestion.autoFixable) {
    // Can be automatically fixed
    applyFix(suggestion);
  }
});
```

### enhancePrompt() (Phase 2)

Enhances a basic prompt with professional details and best practices.

```typescript
enhancePrompt(prompt: string): Promise<PromptEnhancement>
```

**Example:**

```typescript
const { enhancePrompt } = useGemini();

const enhancement = await enhancePrompt(generatedPrompt);

if (enhancement.improvements.length > 0) {
  console.log('Improvements made:');
  enhancement.improvements.forEach(improvement => {
    console.log('-', improvement);
  });
}
```

### chat() (Phase 3)

Provides conversational AI assistance with context awareness.

```typescript
chat(message: string): Promise<string>
```

**Example:**

```typescript
const { chat } = useGemini();

const response = await chat(
  "What colors work well with glassmorphism?"
);

console.log('AI:', response);
```

### clearCache()

Clears all cached AI responses.

```typescript
clearCache(): void
```

**Example:**

```typescript
const { clearCache } = useGemini();

// Clear cache when user resets project
const handleReset = () => {
  clearCache();
  resetWizardState();
};
```

## State Management

### Loading State

```typescript
const { isLoading, analyzeProject } = useGemini();

return (
  <div>
    <button 
      onClick={() => analyzeProject(description)}
      disabled={isLoading}
    >
      {isLoading ? 'Analyzing...' : 'Analyze Project'}
    </button>
  </div>
);
```

### Error State

```typescript
const { error, analyzeProject } = useGemini();

return (
  <div>
    {error && (
      <div className="error-message">
        <p>{error.message}</p>
        <button onClick={() => analyzeProject(description)}>
          Retry
        </button>
      </div>
    )}
  </div>
);
```

### Fallback State

```typescript
const { isUsingFallback, analyzeProject } = useGemini();

return (
  <div>
    {isUsingFallback && (
      <div className="fallback-notice">
        <p>Using standard analysis (AI temporarily unavailable)</p>
      </div>
    )}
  </div>
);
```

## Rate Limiting

The hook automatically enforces rate limits (20 requests/hour for free users).

```typescript
const { remainingRequests, resetTime, analyzeProject } = useGemini();

const handleAnalyze = async () => {
  if (remainingRequests === 0) {
    const minutesUntilReset = Math.ceil((resetTime - Date.now()) / 60000);
    alert(`Rate limit reached. Try again in ${minutesUntilReset} minutes.`);
    return;
  }
  
  await analyzeProject(description);
};

return (
  <div>
    <p>Remaining requests: {remainingRequests}</p>
    <button onClick={handleAnalyze}>Analyze</button>
  </div>
);
```

## Caching

The hook automatically caches responses for 1 hour.

### Cache Behavior

- **Cache Key**: Hash of input parameters
- **TTL**: 1 hour (3600 seconds)
- **Eviction**: LRU (Least Recently Used)
- **Max Size**: 100 entries
- **Persistence**: localStorage

### Cache Hit Example

```typescript
const { analyzeProject } = useGemini();

// First call - hits API (1500ms)
const result1 = await analyzeProject('portfolio site');

// Second call - cache hit (<50ms)
const result2 = await analyzeProject('portfolio site');

// result1 === result2 (same object)
```

### Disabling Cache

```typescript
const { analyzeProject } = useGemini({
  enableCache: false  // Disable caching
});
```

## Error Handling

### Comprehensive Error Handling

```typescript
const { analyzeProject, error, isUsingFallback } = useGemini({
  onError: (err) => {
    console.error('AI error:', err);
    // Log to analytics
    analytics.track('ai_error', { error: err.message });
  }
});

const handleAnalyze = async (description: string) => {
  try {
    const analysis = await analyzeProject(description);
    
    if (isUsingFallback) {
      // Notify user that fallback was used
      showNotification('Using standard analysis', 'info');
    }
    
    return analysis;
  } catch (err) {
    // Error is also available in error state
    showNotification('Analysis failed', 'error');
  }
};
```

### Error Types

The hook handles these error types automatically:

- **API_ERROR** - Gemini API returned error → Fallback
- **NETWORK_ERROR** - Network connectivity issue → Fallback
- **TIMEOUT_ERROR** - Request exceeded timeout → Fallback
- **INVALID_RESPONSE** - Response validation failed → Fallback
- **RATE_LIMIT** - User exceeded rate limit → Show message
- **INVALID_API_KEY** - API key is invalid → Show error

## Advanced Usage

### Custom Timeout

```typescript
const { analyzeProject } = useGemini({
  timeout: 5000  // 5 seconds instead of default 2 seconds
});
```

### Disable Fallback

```typescript
const { analyzeProject } = useGemini({
  enableFallback: false  // Throw errors instead of using fallback
});

try {
  const analysis = await analyzeProject(description);
} catch (error) {
  // Handle error without fallback
  showError('AI service is unavailable');
}
```

### Multiple Hook Instances

```typescript
// Fast analysis with fallback
const fastAI = useGemini({
  timeout: 1000,
  enableFallback: true
});

// Slow analysis without fallback
const slowAI = useGemini({
  timeout: 5000,
  enableFallback: false
});
```

## Performance Optimization

### Debouncing

Debounce user input to avoid excessive API calls:

```typescript
import { useDebounce } from './hooks/useDebounce';

function ProjectSetup() {
  const [description, setDescription] = useState('');
  const debouncedDescription = useDebounce(description, 500);
  const { analyzeProject } = useGemini();
  
  useEffect(() => {
    if (debouncedDescription.length >= 20) {
      analyzeProject(debouncedDescription);
    }
  }, [debouncedDescription]);
  
  return (
    <input
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Describe your project..."
    />
  );
}
```

### Conditional Analysis

Only analyze when necessary:

```typescript
const { analyzeProject } = useGemini();
const [lastAnalyzed, setLastAnalyzed] = useState('');

const handleAnalyze = async (description: string) => {
  // Skip if description hasn't changed significantly
  if (description === lastAnalyzed) {
    return;
  }
  
  // Skip if description is too short
  if (description.length < 20) {
    return;
  }
  
  const analysis = await analyzeProject(description);
  setLastAnalyzed(description);
  return analysis;
};
```

## Testing

### Unit Tests

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useGemini } from './useGemini';

describe('useGemini', () => {
  it('should analyze project description', async () => {
    const { result } = renderHook(() => useGemini());
    
    const analysis = await result.current.analyzeProject('portfolio site');
    
    expect(analysis.projectType).toBe('Portfolio');
    expect(analysis.confidence).toBeGreaterThan(0.7);
  });
  
  it('should use cache on second call', async () => {
    const { result } = renderHook(() => useGemini());
    
    const start1 = Date.now();
    await result.current.analyzeProject('portfolio site');
    const duration1 = Date.now() - start1;
    
    const start2 = Date.now();
    await result.current.analyzeProject('portfolio site');
    const duration2 = Date.now() - start2;
    
    expect(duration2).toBeLessThan(100); // Cache hit
    expect(duration2).toBeLessThan(duration1);
  });
  
  it('should fallback on error', async () => {
    const { result } = renderHook(() => useGemini());
    
    // Mock API failure
    jest.spyOn(GeminiService.prototype, 'analyzeProject')
      .mockRejectedValue(new Error('API Error'));
    
    const analysis = await result.current.analyzeProject('test');
    
    expect(result.current.isUsingFallback).toBe(true);
    expect(analysis).toBeDefined(); // Fallback provides result
  });
});
```

### Integration Tests

```bash
npm test src/hooks/__tests__/useGemini.test.ts
```

## Best Practices

### DO:
✅ Debounce user input before calling analyzeProject
✅ Check remainingRequests before making calls
✅ Handle isUsingFallback state in UI
✅ Show loading indicators during analysis
✅ Provide retry options on errors
✅ Clear cache when user resets project
✅ Use appropriate timeout values
✅ Handle all error states

### DON'T:
❌ Call analyzeProject on every keystroke
❌ Ignore rate limit warnings
❌ Skip loading state indicators
❌ Assume AI is always available
❌ Ignore fallback state
❌ Use without error handling
❌ Disable cache unnecessarily
❌ Set timeout too low (<1000ms)

## Common Patterns

### Pattern 1: Auto-Analyze on Input

```typescript
function ProjectSetup() {
  const [description, setDescription] = useState('');
  const debouncedDescription = useDebounce(description, 500);
  const { analyzeProject, isLoading } = useGemini();
  const [analysis, setAnalysis] = useState(null);
  
  useEffect(() => {
    if (debouncedDescription.length >= 20) {
      analyzeProject(debouncedDescription).then(setAnalysis);
    }
  }, [debouncedDescription]);
  
  return (
    <div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {isLoading && <Spinner />}
      {analysis && <AnalysisResults analysis={analysis} />}
    </div>
  );
}
```

### Pattern 2: Manual Analyze with Button

```typescript
function ProjectSetup() {
  const [description, setDescription] = useState('');
  const { analyzeProject, isLoading, error } = useGemini();
  const [analysis, setAnalysis] = useState(null);
  
  const handleAnalyze = async () => {
    const result = await analyzeProject(description);
    setAnalysis(result);
  };
  
  return (
    <div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button 
        onClick={handleAnalyze}
        disabled={isLoading || description.length < 20}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Project'}
      </button>
      {error && <ErrorMessage error={error} />}
      {analysis && <AnalysisResults analysis={analysis} />}
    </div>
  );
}
```

### Pattern 3: Apply AI Suggestions

```typescript
function ProjectSetup() {
  const { analyzeProject, isLoading } = useGemini();
  const { updateWizardState } = useBoltBuilder();
  const [analysis, setAnalysis] = useState(null);
  
  const handleApplySuggestions = () => {
    if (!analysis) return;
    
    updateWizardState({
      projectInfo: { type: analysis.projectType },
      selectedDesignStyle: findDesignStyle(analysis.designStyle),
      selectedColorTheme: findColorTheme(analysis.colorTheme)
    });
    
    showNotification('AI suggestions applied!', 'success');
  };
  
  return (
    <div>
      {analysis && analysis.confidence > 0.8 && (
        <button onClick={handleApplySuggestions}>
          Apply AI Suggestions
        </button>
      )}
    </div>
  );
}
```

## Troubleshooting

### Issue: Hook returns stale data

**Solution:** Clear cache or disable caching

```typescript
const { clearCache } = useGemini();
clearCache();
```

### Issue: Rate limit reached too quickly

**Solution:** Implement debouncing and conditional analysis

```typescript
const debouncedDescription = useDebounce(description, 1000);
```

### Issue: Fallback always activates

**Solution:** Check API key configuration

```bash
# Verify .env file
VITE_GEMINI_API_KEY=your_key_here
```

### Issue: Slow performance

**Solution:** Check cache is enabled and working

```typescript
const { analyzeProject } = useGemini({
  enableCache: true  // Ensure cache is enabled
});
```

## Related Documentation

- **GeminiService API**: `docs/developer/GEMINI_SERVICE_API.md`
- **Caching Strategy**: `docs/developer/CACHING_STRATEGY.md`
- **Error Handling**: `docs/developer/ERROR_HANDLING_PATTERNS.md`
- **Type Definitions**: `src/types/gemini.ts`
- **Hook README**: `src/hooks/README.md`

## Support

For issues or questions:
- GitHub Issues: [github.com/yourusername/lovabolt/issues](https://github.com/yourusername/lovabolt/issues)
- Documentation: `.kiro/specs/gemini-ai-integration/`
- Standards: `.kiro/steering/gemini-ai-integration-standards.md`

---

**Last Updated:** November 4, 2025  
**Version:** 1.0.0  
**Maintainer:** LovaBolt Team
