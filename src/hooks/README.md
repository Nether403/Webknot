# React Hooks

This directory contains custom React hooks for the LovaBolt application.

## Available Hooks

### useGemini

**Location:** `src/hooks/useGemini.ts`

**Purpose:** AI orchestrator hook that provides intelligent project analysis with caching and fallback support.

**Features:**
- 🤖 AI-powered project analysis using Gemini 2.5
- ⚡ Intelligent caching with <50ms cache hits
- 🔄 Automatic fallback to rule-based system
- 🛡️ Comprehensive error handling
- ⏱️ Performance optimized (<100ms loading indicators)

**Usage:**

```typescript
import { useGemini } from './hooks/useGemini';

function MyComponent() {
  const {
    isLoading,
    error,
    isUsingFallback,
    analyzeProject,
    clearCache
  } = useGemini({
    enableCache: true,
    enableFallback: true,
    timeout: 2000,
    onError: (err) => console.error('AI error:', err)
  });

  const handleAnalyze = async (description: string) => {
    const analysis = await analyzeProject(description);
    console.log('Project type:', analysis.projectType);
    console.log('Design style:', analysis.designStyle);
    console.log('Confidence:', analysis.confidence);
  };

  return (
    <div>
      {isLoading && <p>Analyzing...</p>}
      {isUsingFallback && <p>Using standard analysis</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

**Options:**

```typescript
interface UseGeminiOptions {
  enableCache?: boolean;      // Enable response caching (default: true)
  enableFallback?: boolean;   // Enable fallback to rule-based system (default: true)
  timeout?: number;           // API timeout in milliseconds (default: 2000)
  onError?: (error: Error) => void;  // Error callback
}
```

**Return Value:**

```typescript
interface UseGeminiResult {
  // State
  isLoading: boolean;         // True when API call is in progress
  error: Error | null;        // Last error that occurred
  isUsingFallback: boolean;   // True when using rule-based fallback
  
  // Methods
  analyzeProject: (description: string) => Promise<ProjectAnalysis>;
  suggestImprovements: (state: unknown) => Promise<DesignSuggestion[]>;  // Phase 2
  enhancePrompt: (prompt: string) => Promise<PromptEnhancement>;         // Phase 2
  chat: (message: string) => Promise<string>;                            // Phase 3
  
  // Rate limiting
  remainingRequests: number;  // Requests remaining in current window
  resetTime: number;          // Timestamp when rate limit resets
  
  // Cache control
  clearCache: () => void;     // Clear all cached responses
}
```

**Performance:**
- Cache hits: <50ms
- Loading indicator: <100ms
- Fallback activation: <100ms

**Testing:**
- Test suite: `src/hooks/__tests__/useGemini.test.ts`
- Coverage: 14/14 tests passing
- Run tests: `npx vitest run src/hooks/__tests__/useGemini.test.ts`

**Documentation:**
- Implementation details: `docs/TASK_4_COMPLETION_SUMMARY.md`
- Spec: `.kiro/specs/gemini-ai-integration/`

## Adding New Hooks

When adding new hooks to this directory:

1. Create the hook file: `src/hooks/useYourHook.ts`
2. Add TypeScript types in `src/types/`
3. Create test file: `src/hooks/__tests__/useYourHook.test.ts`
4. Document in this README
5. Export from `src/hooks/index.ts` if needed

## Best Practices

- Use TypeScript for type safety
- Follow React hooks rules (no conditional calls, etc.)
- Add comprehensive tests
- Document with JSDoc comments
- Handle errors gracefully
- Optimize for performance
- Consider accessibility
