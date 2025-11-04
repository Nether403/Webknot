# Error Handling Patterns Documentation

## Overview

LovaBolt's Gemini AI integration implements comprehensive error handling to ensure the application remains functional even when AI services fail. The system uses a hybrid approach with automatic fallback to rule-based algorithms.

## Error Philosophy

### Core Principles

1. **Never Break the App** - AI failures should never crash the application
2. **Graceful Degradation** - Fall back to rule-based system automatically
3. **User-Friendly Messages** - Show clear, actionable error messages
4. **Transparent Fallback** - Inform users when using standard analysis
5. **Comprehensive Logging** - Log all errors for monitoring and debugging

## Error Types

### GeminiErrorType Enum

```typescript
enum GeminiErrorType {
  API_ERROR = 'API_ERROR',           // Gemini API returned error
  NETWORK_ERROR = 'NETWORK_ERROR',   // Network connectivity issue
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',   // Request exceeded timeout
  INVALID_RESPONSE = 'INVALID_RESPONSE', // Response validation failed
  RATE_LIMIT = 'RATE_LIMIT',         // User exceeded rate limit
  INVALID_API_KEY = 'INVALID_API_KEY' // API key is invalid
}
```

### GeminiError Class

```typescript
class GeminiError extends Error {
  type: GeminiErrorType;
  originalError?: Error;
  shouldFallback: boolean;
  
  constructor(
    type: GeminiErrorType, 
    message: string, 
    shouldFallback: boolean
  ) {
    super(message);
    this.name = 'GeminiError';
    this.type = type;
    this.shouldFallback = shouldFallback;
  }
}
```

## Error Handling Patterns

### Pattern 1: Try-Catch with Fallback

The most common pattern - attempt AI operation, fall back on failure.

```typescript
async function analyzeProject(description: string): Promise<ProjectAnalysis> {
  try {
    // Try AI analysis
    const result = await geminiService.analyzeProject(description);
    return result;
    
  } catch (error) {
    if (error instanceof GeminiError && error.shouldFallback) {
      // Log the error
      console.warn('AI analysis failed, using fallback:', error.message);
      
      // Use rule-based fallback
      return fallbackAnalysis(description);
    }
    
    // Re-throw if not a fallback-eligible error
    throw error;
  }
}
```

### Pattern 2: Execute with Fallback Helper

Reusable helper function for operations with fallback.

```typescript
async function executeWithFallback<T>(
  aiOperation: () => Promise<T>,
  fallbackOperation: () => T,
  onFallback?: () => void
): Promise<T> {
  try {
    return await aiOperation();
  } catch (error) {
    if (error instanceof GeminiError && error.shouldFallback) {
      console.warn('AI failed, using fallback:', error.message);
      onFallback?.();
      return fallbackOperation();
    }
    throw error;
  }
}

// Usage
const analysis = await executeWithFallback(
  () => geminiService.analyzeProject(description),
  () => nlpParser.parse(description),
  () => setIsUsingFallback(true)
);
```

### Pattern 3: Retry with Exponential Backoff

For transient network errors, retry before falling back.

```typescript
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on 4xx errors (except 429)
      if (error instanceof GeminiError) {
        if (error.type === GeminiErrorType.API_ERROR && 
            !error.message.includes('429')) {
          throw error;
        }
      }
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      console.log(`Retry attempt ${attempt + 1} after ${delay}ms`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

// Usage
const result = await retryWithBackoff(
  () => geminiService.analyzeProject(description),
  3,  // max retries
  1000 // base delay (1s, 2s, 4s)
);
```

### Pattern 4: Circuit Breaker

Prevent cascading failures by opening circuit after repeated failures.

```typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  
  constructor(
    private threshold: number = 5,
    private timeout: number = 60000 // 1 minute
  ) {}
  
  async execute<T>(
    operation: () => Promise<T>,
    fallback: () => T
  ): Promise<T> {
    // Check if circuit is open
    if (this.state === 'open') {
      const timeSinceFailure = Date.now() - this.lastFailureTime;
      
      if (timeSinceFailure < this.timeout) {
        console.warn('Circuit breaker open, using fallback');
        return fallback();
      }
      
      // Try half-open state
      this.state = 'half-open';
    }
    
    try {
      const result = await operation();
      
      // Success - reset circuit
      this.failures = 0;
      this.state = 'closed';
      
      return result;
      
    } catch (error) {
      this.failures++;
      this.lastFailureTime = Date.now();
      
      // Open circuit if threshold reached
      if (this.failures >= this.threshold) {
        this.state = 'open';
        console.error('Circuit breaker opened after', this.failures, 'failures');
      }
      
      return fallback();
    }
  }
}

// Usage
const circuitBreaker = new CircuitBreaker(5, 60000);

const analysis = await circuitBreaker.execute(
  () => geminiService.analyzeProject(description),
  () => nlpParser.parse(description)
);
```

### Pattern 5: Timeout Wrapper

Ensure operations don't hang indefinitely.

```typescript
async function withTimeout<T>(
  operation: () => Promise<T>,
  timeout: number,
  timeoutError: string = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    operation(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(timeoutError)), timeout)
    )
  ]);
}

// Usage
try {
  const result = await withTimeout(
    () => geminiService.analyzeProject(description),
    2000,
    'AI analysis timed out'
  );
} catch (error) {
  if (error.message === 'AI analysis timed out') {
    // Use fallback
    return fallbackAnalysis(description);
  }
  throw error;
}
```

## Error Handling in Components

### Pattern 1: Error State Management

```typescript
function ProjectSetupStep() {
  const [error, setError] = useState<Error | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const { analyzeProject } = useGemini({
    onError: (err) => {
      setError(err);
      if (err instanceof GeminiError && err.shouldFallback) {
        setIsUsingFallback(true);
      }
    }
  });
  
  const handleAnalyze = async (description: string) => {
    setError(null);
    setIsUsingFallback(false);
    
    try {
      const analysis = await analyzeProject(description);
      // Use analysis
    } catch (err) {
      // Error already handled by onError callback
      console.error('Analysis failed:', err);
    }
  };
  
  return (
    <div>
      {error && <ErrorMessage error={error} />}
      {isUsingFallback && <FallbackNotice />}
      <button onClick={() => handleAnalyze(description)}>
        Analyze
      </button>
    </div>
  );
}
```

### Pattern 2: Error Boundary

Catch errors at component tree level.

```typescript
class AIErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('AI Error Boundary caught error:', error, errorInfo);
    
    // Log to error tracking service
    if (window.analytics) {
      window.analytics.track('ai_error_boundary', {
        error: error.message,
        stack: error.stack
      });
    }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>AI Feature Unavailable</h2>
          <p>Using standard analysis instead.</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
<AIErrorBoundary>
  <ProjectSetupStep />
</AIErrorBoundary>
```

### Pattern 3: Toast Notifications

Show non-intrusive error messages.

```typescript
function ProjectSetupStep() {
  const { toast } = useToast();
  const { analyzeProject } = useGemini({
    onError: (error) => {
      if (error instanceof GeminiError) {
        toast({
          title: 'AI Analysis Failed',
          description: getUserFriendlyMessage(error),
          variant: error.shouldFallback ? 'default' : 'destructive'
        });
      }
    }
  });
  
  return (
    // Component JSX
  );
}
```

## User-Friendly Error Messages

### Message Mapping

```typescript
function getUserFriendlyMessage(error: GeminiError): string {
  const messages: Record<GeminiErrorType, string> = {
    [GeminiErrorType.API_ERROR]: 
      'AI service encountered an error. Using standard analysis instead.',
    
    [GeminiErrorType.NETWORK_ERROR]: 
      'Unable to connect to AI service. Using standard analysis instead.',
    
    [GeminiErrorType.TIMEOUT_ERROR]: 
      'AI analysis is taking longer than expected. Using standard analysis instead.',
    
    [GeminiErrorType.INVALID_RESPONSE]: 
      'AI service returned invalid data. Using standard analysis instead.',
    
    [GeminiErrorType.RATE_LIMIT]: 
      'You\'ve reached the AI request limit. Please try again later or upgrade to premium.',
    
    [GeminiErrorType.INVALID_API_KEY]: 
      'AI service configuration error. Please contact support.'
  };
  
  return messages[error.type] || 'An unexpected error occurred.';
}
```

### Actionable Messages

Provide users with clear next steps.

```typescript
function getActionableMessage(error: GeminiError): {
  message: string;
  action?: string;
  actionLabel?: string;
} {
  switch (error.type) {
    case GeminiErrorType.RATE_LIMIT:
      const resetTime = getRateLimitResetTime();
      const minutes = Math.ceil((resetTime - Date.now()) / 60000);
      return {
        message: `AI limit reached. Try again in ${minutes} minutes.`,
        action: 'upgrade',
        actionLabel: 'Upgrade to Premium'
      };
    
    case GeminiErrorType.NETWORK_ERROR:
      return {
        message: 'Network connection issue. Check your internet connection.',
        action: 'retry',
        actionLabel: 'Retry'
      };
    
    case GeminiErrorType.TIMEOUT_ERROR:
      return {
        message: 'AI analysis timed out. Using standard analysis.',
        action: 'continue',
        actionLabel: 'Continue'
      };
    
    default:
      return {
        message: getUserFriendlyMessage(error),
        action: 'continue',
        actionLabel: 'Continue'
      };
  }
}
```

## Logging and Monitoring

### Structured Error Logging

```typescript
interface ErrorLogEntry {
  timestamp: number;
  errorType: GeminiErrorType;
  message: string;
  stack?: string;
  context: {
    operation: string;
    userId?: string;
    sessionId?: string;
  };
  fallbackActivated: boolean;
}

function logError(error: GeminiError, context: any): void {
  const entry: ErrorLogEntry = {
    timestamp: Date.now(),
    errorType: error.type,
    message: error.message,
    stack: error.stack,
    context,
    fallbackActivated: error.shouldFallback
  };
  
  console.error('[Gemini Error]', JSON.stringify(entry));
  
  // Send to error tracking service
  if (window.analytics) {
    window.analytics.track('gemini_error', entry);
  }
}
```

### Error Rate Monitoring

```typescript
class ErrorRateMonitor {
  private errors: number[] = [];
  private windowMs: number = 3600000; // 1 hour
  
  recordError(): void {
    this.errors.push(Date.now());
    this.cleanup();
  }
  
  private cleanup(): void {
    const cutoff = Date.now() - this.windowMs;
    this.errors = this.errors.filter(time => time > cutoff);
  }
  
  getErrorRate(): number {
    this.cleanup();
    return this.errors.length;
  }
  
  isHighErrorRate(threshold: number = 10): boolean {
    return this.getErrorRate() > threshold;
  }
}

// Usage
const errorMonitor = new ErrorRateMonitor();

try {
  await geminiService.analyzeProject(description);
} catch (error) {
  errorMonitor.recordError();
  
  if (errorMonitor.isHighErrorRate()) {
    console.error('High error rate detected!');
    // Alert administrators
  }
}
```

## Testing Error Handling

### Unit Tests

```typescript
describe('Error Handling', () => {
  it('should fallback on API error', async () => {
    // Mock API to throw error
    jest.spyOn(GeminiService.prototype, 'analyzeProject')
      .mockRejectedValue(new GeminiError(
        GeminiErrorType.API_ERROR,
        'API Error',
        true
      ));
    
    const { result } = renderHook(() => useGemini());
    
    const analysis = await result.current.analyzeProject('test');
    
    expect(result.current.isUsingFallback).toBe(true);
    expect(analysis).toBeDefined(); // Fallback provides result
  });
  
  it('should retry on network error', async () => {
    let attempts = 0;
    jest.spyOn(GeminiService.prototype, 'analyzeProject')
      .mockImplementation(async () => {
        attempts++;
        if (attempts < 3) {
          throw new GeminiError(
            GeminiErrorType.NETWORK_ERROR,
            'Network Error',
            true
          );
        }
        return { projectType: 'Portfolio', confidence: 0.9 };
      });
    
    const result = await retryWithBackoff(
      () => geminiService.analyzeProject('test'),
      3
    );
    
    expect(attempts).toBe(3);
    expect(result.projectType).toBe('Portfolio');
  });
  
  it('should open circuit breaker after threshold', async () => {
    const circuitBreaker = new CircuitBreaker(3, 60000);
    
    // Cause 3 failures
    for (let i = 0; i < 3; i++) {
      await circuitBreaker.execute(
        () => Promise.reject(new Error('Failure')),
        () => 'fallback'
      );
    }
    
    // Circuit should be open
    const result = await circuitBreaker.execute(
      () => Promise.resolve('success'),
      () => 'fallback'
    );
    
    expect(result).toBe('fallback'); // Circuit open, uses fallback
  });
});
```

### Integration Tests

```bash
npm test src/hooks/__tests__/useGemini.test.ts
```

## Best Practices

### DO:
✅ Always provide fallback mechanisms
✅ Use specific error types
✅ Log errors with context
✅ Show user-friendly messages
✅ Implement retry logic for transient errors
✅ Use circuit breakers for repeated failures
✅ Monitor error rates
✅ Test error scenarios
✅ Provide actionable error messages
✅ Handle timeout errors

### DON'T:
❌ Let AI errors crash the app
❌ Show technical error messages to users
❌ Retry on 4xx errors (except 429)
❌ Ignore error logging
❌ Skip fallback implementation
❌ Use generic error messages
❌ Retry indefinitely
❌ Ignore circuit breaker state
❌ Skip error monitoring
❌ Forget to test error paths

## Common Error Scenarios

### Scenario 1: API Key Invalid

```typescript
// Error thrown during initialization
try {
  const service = new GeminiService({ apiKey: 'invalid-key' });
} catch (error) {
  if (error instanceof GeminiError && 
      error.type === GeminiErrorType.INVALID_API_KEY) {
    // Show configuration error to admin
    showAdminError('Invalid API key. Please check configuration.');
  }
}
```

### Scenario 2: Rate Limit Exceeded

```typescript
try {
  const analysis = await geminiService.analyzeProject(description);
} catch (error) {
  if (error instanceof GeminiError && 
      error.type === GeminiErrorType.RATE_LIMIT) {
    const resetTime = getRateLimitResetTime();
    const minutes = Math.ceil((resetTime - Date.now()) / 60000);
    
    showMessage(`Rate limit reached. Try again in ${minutes} minutes.`);
    showUpgradePrompt(); // Suggest premium tier
  }
}
```

### Scenario 3: Network Timeout

```typescript
try {
  const analysis = await withTimeout(
    () => geminiService.analyzeProject(description),
    2000
  );
} catch (error) {
  if (error.message.includes('timed out')) {
    // Use fallback
    const fallbackAnalysis = nlpParser.parse(description);
    showNotification('Using standard analysis (AI timed out)');
    return fallbackAnalysis;
  }
}
```

## Related Documentation

- **GeminiService API**: `docs/developer/GEMINI_SERVICE_API.md`
- **useGemini Hook**: `docs/developer/USE_GEMINI_HOOK.md`
- **Caching Strategy**: `docs/developer/CACHING_STRATEGY.md`
- **Type Definitions**: `src/types/gemini.ts`

## Support

For issues or questions:
- GitHub Issues: [github.com/yourusername/lovabolt/issues](https://github.com/yourusername/lovabolt/issues)
- Documentation: `.kiro/specs/gemini-ai-integration/`
- Standards: `.kiro/steering/gemini-ai-integration-standards.md`

---

**Last Updated:** November 4, 2025  
**Version:** 1.0.0  
**Maintainer:** LovaBolt Team
