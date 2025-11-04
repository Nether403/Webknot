---
inclusion: always
---

# Gemini AI Integration Standards

## Overview

This steering guide provides standards and best practices for implementing the Gemini 2.5 AI integration into LovaBolt. The integration follows a hybrid approach: combining fast, reliable rule-based algorithms (fallback) with intelligent Gemini AI (enhancement) for optimal user experience.

**Spec Location**: `.kiro/specs/gemini-ai-integration/`

## Core Principles

### 1. Hybrid Architecture
- **Always maintain fallback**: Rule-based system must work independently
- **AI enhances, doesn't replace**: Core functionality works without AI
- **Graceful degradation**: System remains functional when AI fails
- **User control**: Always allow disabling AI features

### 2. Performance First
- **Cache aggressively**: 1-hour TTL, >80% hit rate target
- **Optimize tokens**: Concise prompts, structured output (JSON)
- **Timeout quickly**: 2s for analysis, 3s for enhancement
- **Show loading states**: Within 100ms of operation start

### 3. Cost Consciousness
- **Rate limiting**: 20 requests/hour for free users
- **Smart model selection**: Flash for speed, Pro for quality
- **Monitor spending**: Alert at $500/month threshold
- **Batch when possible**: Reduce redundant API calls

### 4. Privacy and Security
- **No PII**: Never send personally identifiable information
- **Sanitize inputs**: Remove emails, phones, SSNs before API calls
- **User consent**: Show privacy dialog on first AI use
- **Transparent**: Clear about what data is sent to Google

## Code Organization

### Directory Structure

```
src/
├── services/
│   ├── geminiService.ts      # Core Gemini API integration
│   ├── cacheService.ts       # Caching layer with LRU eviction
│   └── rateLimiter.ts        # Rate limiting logic
├── hooks/
│   └── useGemini.ts          # AI orchestrator hook
├── components/
│   ├── ai/
│   │   ├── AIConsentDialog.tsx
│   │   ├── AILoadingIndicator.tsx
│   │   ├── DesignSuggestions.tsx
│   │   ├── PromptEnhancement.tsx
│   │   └── ChatInterface.tsx  # Phase 3
│   └── settings/
│       └── AISettings.tsx
├── types/
│   └── gemini.ts             # Gemini-specific types
└── utils/
    ├── smartDefaults.ts      # Existing rule-based (fallback)
    ├── nlpParser.ts          # Existing rule-based (fallback)
    └── sanitization.ts       # Input sanitization
```

## TypeScript Standards

### Gemini-Specific Types

```typescript
// src/types/gemini.ts

export interface GeminiConfig {
  apiKey: string;
  model: 'gemini-2.5-flash-exp' | 'gemini-2.5-pro-exp';
  temperature: number;
  maxOutputTokens: number;
  timeout: number;
}

export interface ProjectAnalysis {
  projectType: ProjectInfo['type'];
  designStyle: string;
  colorTheme: string;
  reasoning: string;
  confidence: number; // 0.0 to 1.0
  suggestedComponents?: string[];
  suggestedAnimations?: string[];
}

export interface DesignSuggestion {
  type: 'improvement' | 'warning' | 'tip';
  message: string;
  reasoning: string;
  autoFixable: boolean;
  severity: 'low' | 'medium' | 'high';
}

export interface PromptEnhancement {
  originalPrompt: string;
  enhancedPrompt: string;
  improvements: string[];
  addedSections: string[];
}

export enum GeminiErrorType {
  API_ERROR = 'API_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
  RATE_LIMIT = 'RATE_LIMIT',
  INVALID_API_KEY = 'INVALID_API_KEY'
}

export class GeminiError extends Error {
  type: GeminiErrorType;
  originalError?: Error;
  shouldFallback: boolean;
  
  constructor(type: GeminiErrorType, message: string, shouldFallback: boolean) {
    super(message);
    this.name = 'GeminiError';
    this.type = type;
    this.shouldFallback = shouldFallback;
  }
}
```

### Type Safety Rules

- **Never use `any`**: Always define explicit types for Gemini responses
- **Validate responses**: Use TypeScript guards to validate API responses
- **Strict null checks**: Handle null/undefined cases explicitly
- **Generic types**: Use generics for cache service to maintain type safety

## Service Implementation Patterns

### GeminiService Pattern

```typescript
// src/services/geminiService.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GeminiConfig, ProjectAnalysis, GeminiError } from '../types/gemini';

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private flashModel: GenerativeModel;
  private proModel: GenerativeModel;
  private config: GeminiConfig;
  
  constructor(config: GeminiConfig) {
    this.config = config;
    this.genAI = new GoogleGenerativeAI(config.apiKey);
    
    // Initialize both models
    this.flashModel = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-exp',
      generationConfig: {
        temperature: config.temperature,
        maxOutputTokens: config.maxOutputTokens,
        responseMimeType: 'application/json' // Structured output
      }
    });
    
    this.proModel = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-pro-exp',
      generationConfig: {
        temperature: config.temperature,
        maxOutputTokens: config.maxOutputTokens
      }
    });
  }
  
  async analyzeProject(description: string): Promise<ProjectAnalysis> {
    try {
      // Sanitize input
      const sanitized = sanitizeInput(description);
      
      // Build prompt
      const prompt = this.buildAnalysisPrompt(sanitized);
      
      // Call API with timeout
      const result = await this.callWithTimeout(
        () => this.flashModel.generateContent(prompt),
        this.config.timeout
      );
      
      // Parse and validate response
      const response = JSON.parse(result.response.text());
      this.validateAnalysisResponse(response);
      
      return response;
      
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  private buildAnalysisPrompt(description: string): string {
    return `You are a web design expert. Analyze this project description:

"${description}"

Respond in JSON format:
{
  "projectType": "Portfolio|E-commerce|Dashboard|Web App|Mobile App|Website",
  "designStyle": "minimalist|glassmorphism|material-design|...",
  "colorTheme": "ocean-breeze|sunset-warmth|monochrome-modern|...",
  "reasoning": "Brief explanation of recommendations",
  "confidence": 0.0-1.0,
  "suggestedComponents": ["component-id-1", "component-id-2"],
  "suggestedAnimations": ["animation-id-1"]
}

Only suggest IDs that exist in our system.`;
  }
  
  private validateAnalysisResponse(data: any): asserts data is ProjectAnalysis {
    const validProjectTypes = ['Portfolio', 'E-commerce', 'Dashboard', 'Web App', 'Mobile App', 'Website'];
    
    if (!data.projectType || !validProjectTypes.includes(data.projectType)) {
      throw new GeminiError(
        GeminiErrorType.INVALID_RESPONSE,
        'Invalid project type in response',
        true
      );
    }
    
    if (typeof data.confidence !== 'number' || data.confidence < 0 || data.confidence > 1) {
      throw new GeminiError(
        GeminiErrorType.INVALID_RESPONSE,
        'Invalid confidence score',
        true
      );
    }
    
    // Additional validation...
  }
  
  private async callWithTimeout<T>(
    operation: () => Promise<T>,
    timeout: number
  ): Promise<T> {
    return Promise.race([
      operation(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), timeout)
      )
    ]);
  }
  
  private handleError(error: unknown): GeminiError {
    if (error instanceof GeminiError) {
      return error;
    }
    
    if (error instanceof Error) {
      if (error.message.includes('Timeout')) {
        return new GeminiError(
          GeminiErrorType.TIMEOUT_ERROR,
          'Request timed out',
          true
        );
      }
      
      if (error.message.includes('API key')) {
        return new GeminiError(
          GeminiErrorType.INVALID_API_KEY,
          'Invalid API key',
          false
        );
      }
    }
    
    return new GeminiError(
      GeminiErrorType.API_ERROR,
      'Unknown error occurred',
      true
    );
  }
}
```

### CacheService Pattern

```typescript
// src/services/cacheService.ts

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  hits: number;
}

export class CacheService {
  private cache: Map<string, CacheEntry<any>>;
  private maxSize: number;
  private ttl: number;
  
  constructor(maxSize = 100, ttl = 3600000) { // 1 hour default
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
    this.loadFromStorage();
  }
  
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Check expiration
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    // Update hit count
    entry.hits++;
    
    return entry.data as T;
  }
  
  set<T>(key: string, data: T): void {
    // Evict if at capacity
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + this.ttl,
      hits: 0
    };
    
    this.cache.set(key, entry);
    this.saveToStorage();
  }
  
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }
  
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('lovabolt-gemini-cache');
      if (stored) {
        const data = JSON.parse(stored);
        // Restore cache entries
        Object.entries(data.entries || {}).forEach(([key, entry]) => {
          this.cache.set(key, entry as CacheEntry<any>);
        });
      }
    } catch (error) {
      console.error('Failed to load cache from storage:', error);
    }
  }
  
  private saveToStorage(): void {
    try {
      const data = {
        entries: Object.fromEntries(this.cache.entries()),
        lastUpdate: Date.now()
      };
      localStorage.setItem('lovabolt-gemini-cache', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save cache to storage:', error);
    }
  }
}
```

### useGemini Hook Pattern

```typescript
// src/hooks/useGemini.ts

import { useState, useCallback, useRef } from 'react';
import { GeminiService } from '../services/geminiService';
import { CacheService } from '../services/cacheService';
import { RateLimiter } from '../services/rateLimiter';
import { safeParseProjectDescription } from '../utils/nlpParser';

export function useGemini() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  
  const geminiService = useRef<GeminiService | null>(null);
  const cacheService = useRef(new CacheService());
  const rateLimiter = useRef(new RateLimiter({ maxRequests: 20, windowMs: 3600000 }));
  
  // Initialize service
  if (!geminiService.current) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      geminiService.current = new GeminiService({
        apiKey,
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000
      });
    }
  }
  
  const analyzeProject = useCallback(async (description: string) => {
    setIsLoading(true);
    setError(null);
    setIsUsingFallback(false);
    
    try {
      // Check cache first
      const cacheKey = `analysis:${description}`;
      const cached = cacheService.current.get(cacheKey);
      if (cached) {
        return cached;
      }
      
      // Check rate limit
      const rateStatus = rateLimiter.current.checkLimit();
      if (rateStatus.isLimited) {
        throw new Error(`Rate limit exceeded. Try again in ${Math.ceil((rateStatus.resetTime - Date.now()) / 60000)} minutes.`);
      }
      
      // Try AI analysis
      if (geminiService.current) {
        const result = await geminiService.current.analyzeProject(description);
        
        // Cache successful result
        cacheService.current.set(cacheKey, result);
        rateLimiter.current.consumeRequest();
        
        return result;
      }
      
      // No AI service, use fallback
      throw new Error('AI service not available');
      
    } catch (err) {
      console.error('AI analysis failed:', err);
      setError(err as Error);
      setIsUsingFallback(true);
      
      // Fallback to rule-based system
      const fallbackResult = safeParseProjectDescription(description);
      return {
        projectType: fallbackResult.projectType || 'Website',
        designStyle: fallbackResult.designStyle || 'minimalist',
        colorTheme: fallbackResult.colorTheme || 'monochrome-modern',
        reasoning: 'Using standard analysis (AI temporarily unavailable)',
        confidence: 0.6
      };
      
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    isLoading,
    error,
    isUsingFallback,
    analyzeProject,
    remainingRequests: rateLimiter.current.checkLimit().remaining,
    clearCache: () => cacheService.current.clear()
  };
}
```

## Component Patterns

### AI Loading Indicator

```typescript
// src/components/ai/AILoadingIndicator.tsx

interface AILoadingIndicatorProps {
  message?: string;
}

export const AILoadingIndicator: React.FC<AILoadingIndicatorProps> = ({ 
  message = 'AI is analyzing...' 
}) => {
  return (
    <div className="flex items-center gap-3 p-4 glass-card rounded-lg">
      <div className="relative">
        <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-white font-medium">{message}</span>
        <span className="text-xs text-gray-400">This may take a moment...</span>
      </div>
    </div>
  );
};
```

### AI Consent Dialog

```typescript
// src/components/ai/AIConsentDialog.tsx

export const AIConsentDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const consent = localStorage.getItem('lovabolt-ai-consent');
    if (!consent) {
      setIsOpen(true);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('lovabolt-ai-consent', JSON.stringify({
      accepted: true,
      timestamp: Date.now()
    }));
    setIsOpen(false);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">AI Features</h2>
        <p className="text-gray-300 mb-4">
          LovaBolt uses Google's Gemini AI to provide intelligent suggestions
          and enhance your project specifications.
        </p>
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">What we send to Google:</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✓ Your project descriptions (anonymized)</li>
            <li>✓ Design selections (no personal data)</li>
            <li>✓ Generated prompts (technical content only)</li>
          </ul>
          <h3 className="font-semibold mt-3 mb-2">What we DON'T send:</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✗ Personal information (names, emails)</li>
            <li>✗ IP addresses or session data</li>
          </ul>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          You can disable AI features anytime in settings.{' '}
          <a href="/privacy" className="text-teal-500 hover:underline">
            Privacy Policy
          </a>
        </p>
        <button
          onClick={handleAccept}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg"
        >
          Accept and Continue
        </button>
      </div>
    </Modal>
  );
};
```

## Error Handling Standards

### Error Handling Flow

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
```

### User-Facing Error Messages

```typescript
function getErrorMessage(error: GeminiError): string {
  switch (error.type) {
    case GeminiErrorType.RATE_LIMIT:
      return 'You\'ve reached the AI request limit. Please try again later or upgrade to premium.';
    
    case GeminiErrorType.TIMEOUT_ERROR:
      return 'AI analysis is taking longer than expected. Using standard analysis instead.';
    
    case GeminiErrorType.NETWORK_ERROR:
      return 'Unable to connect to AI service. Using standard analysis instead.';
    
    case GeminiErrorType.INVALID_API_KEY:
      return 'AI service configuration error. Please contact support.';
    
    default:
      return 'AI analysis unavailable. Using standard analysis instead.';
  }
}
```

## Testing Standards

### Unit Test Pattern

```typescript
// src/services/__tests__/geminiService.test.ts

describe('GeminiService', () => {
  let service: GeminiService;
  
  beforeEach(() => {
    service = new GeminiService({
      apiKey: 'test-key',
      model: 'gemini-2.5-flash-exp',
      temperature: 0.7,
      maxOutputTokens: 1000,
      timeout: 2000
    });
  });
  
  describe('analyzeProject', () => {
    it('should return valid analysis for portfolio description', async () => {
      const result = await service.analyzeProject(
        'I want to build a portfolio to showcase my design work'
      );
      
      expect(result.projectType).toBe('Portfolio');
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.reasoning).toBeTruthy();
    });
    
    it('should throw timeout error after 2 seconds', async () => {
      // Mock slow API response
      jest.useFakeTimers();
      
      const promise = service.analyzeProject('test description');
      jest.advanceTimersByTime(2100);
      
      await expect(promise).rejects.toThrow(GeminiError);
      await expect(promise).rejects.toMatchObject({
        type: GeminiErrorType.TIMEOUT_ERROR
      });
    });
    
    it('should sanitize PII before sending', async () => {
      const spy = jest.spyOn(service as any, 'buildAnalysisPrompt');
      
      await service.analyzeProject(
        'Contact me at john@example.com or 555-1234'
      );
      
      const prompt = spy.mock.results[0].value;
      expect(prompt).not.toContain('john@example.com');
      expect(prompt).not.toContain('555-1234');
    });
  });
});
```

### Integration Test Pattern

```typescript
// src/hooks/__tests__/useGemini.test.ts

describe('useGemini', () => {
  it('should use cache on second identical request', async () => {
    const { result } = renderHook(() => useGemini());
    
    // First request
    const result1 = await result.current.analyzeProject('test description');
    expect(result.current.isLoading).toBe(false);
    
    // Second identical request (should be cached)
    const startTime = Date.now();
    const result2 = await result.current.analyzeProject('test description');
    const duration = Date.now() - startTime;
    
    expect(duration).toBeLessThan(100); // Cache hit should be <100ms
    expect(result1).toEqual(result2);
  });
  
  it('should fallback to rule-based on AI failure', async () => {
    // Mock AI service to fail
    jest.spyOn(GeminiService.prototype, 'analyzeProject')
      .mockRejectedValue(new Error('API Error'));
    
    const { result } = renderHook(() => useGemini());
    
    const analysis = await result.current.analyzeProject('portfolio site');
    
    expect(result.current.isUsingFallback).toBe(true);
    expect(analysis.reasoning).toContain('standard analysis');
  });
});
```

## Performance Optimization

### Caching Strategy

1. **Cache Key Format**: `{operation}:{hash(input)}`
   - Example: `analysis:abc123`, `suggestions:def456`

2. **TTL Strategy**:
   - Project analysis: 1 hour
   - Design suggestions: 30 minutes
   - Prompt enhancement: 1 hour
   - Chat responses: 5 minutes

3. **Eviction Policy**: LRU (Least Recently Used)

4. **Cache Warming**: Pre-cache common queries on app init

### Token Optimization

```typescript
// Good: Concise prompt
const prompt = `Analyze: "${description}"
Return JSON: {projectType, designStyle, colorTheme, confidence}`;

// Bad: Verbose prompt
const prompt = `I would like you to please analyze the following project description
and provide me with detailed recommendations including the project type,
the most suitable design style, an appropriate color theme, and your
confidence level in these recommendations...`;
```

## Monitoring and Logging

### Structured Logging

```typescript
interface GeminiLogEntry {
  timestamp: number;
  operation: 'analysis' | 'suggestions' | 'enhancement' | 'chat';
  model: string;
  latency: number;
  tokensUsed: number;
  cacheHit: boolean;
  success: boolean;
  error?: string;
}

function logGeminiOperation(entry: GeminiLogEntry): void {
  console.log('[Gemini]', JSON.stringify(entry));
  
  // Send to analytics service
  if (window.analytics) {
    window.analytics.track('gemini_operation', entry);
  }
}
```

### Cost Tracking

```typescript
function calculateCost(tokensUsed: number, model: string): number {
  const pricing = {
    'gemini-2.5-flash-exp': {
      input: 0.075 / 1_000_000,
      output: 0.30 / 1_000_000
    },
    'gemini-2.5-pro-exp': {
      input: 0.075 / 1_000_000,
      output: 0.30 / 1_000_000
    }
  };
  
  const rate = pricing[model as keyof typeof pricing];
  return tokensUsed * (rate.input + rate.output);
}
```

## Security Best Practices

### Input Sanitization

```typescript
// src/utils/sanitization.ts

export function sanitizeInput(text: string): string {
  let sanitized = text;
  
  // Remove email addresses
  sanitized = sanitized.replace(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    '[email]'
  );
  
  // Remove phone numbers
  sanitized = sanitized.replace(
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
    '[phone]'
  );
  
  // Remove SSNs
  sanitized = sanitized.replace(
    /\b\d{3}-\d{2}-\d{4}\b/g,
    '[ssn]'
  );
  
  // Remove credit card numbers
  sanitized = sanitized.replace(
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    '[card]'
  );
  
  return sanitized;
}
```

### API Key Management

```typescript
// ✅ Good: Environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// ❌ Bad: Hardcoded
const apiKey = 'AIzaSyC...'; // Never do this!

// ✅ Good: Validate key format
function isValidApiKey(key: string): boolean {
  return /^AIza[0-9A-Za-z-_]{35}$/.test(key);
}
```

## Common Pitfalls to Avoid

### ❌ Don't: Skip Fallback Implementation

```typescript
// Bad: No fallback
const result = await geminiService.analyzeProject(description);
// App breaks if AI fails
```

```typescript
// Good: Always have fallback
try {
  const result = await geminiService.analyzeProject(description);
  return result;
} catch (error) {
  return fallbackAnalysis(description);
}
```

### ❌ Don't: Send PII to API

```typescript
// Bad: Sending user email
const prompt = `User ${userEmail} wants to build...`;

// Good: Anonymized
const prompt = `User wants to build...`;
```

### ❌ Don't: Ignore Rate Limits

```typescript
// Bad: No rate limiting
for (const description of descriptions) {
  await analyzeProject(description); // Will hit rate limit
}

// Good: Check rate limit
for (const description of descriptions) {
  if (rateLimiter.checkLimit().isLimited) {
    break;
  }
  await analyzeProject(description);
}
```

### ❌ Don't: Skip Response Validation

```typescript
// Bad: Trust API response blindly
const result = JSON.parse(response.text());
return result.projectType; // May be undefined or invalid

// Good: Validate response
const result = JSON.parse(response.text());
validateAnalysisResponse(result); // Throws if invalid
return result.projectType;
```

## Phase-Specific Guidelines

### Phase 1: MVP
- **Focus**: Core functionality with fallback
- **Priority**: Reliability over features
- **Testing**: Unit tests for all services
- **Deployment**: Feature flag for gradual rollout

### Phase 2: Enhancement
- **Focus**: User experience improvements
- **Priority**: Performance and cost optimization
- **Testing**: Integration tests for complete flows
- **Deployment**: Monitor costs and adjust

### Phase 3: Advanced
- **Focus**: Premium features and scale
- **Priority**: Monetization and ROI
- **Testing**: Load testing and stress testing
- **Deployment**: Premium tier gating

## Quick Reference

### Model Selection
- **gemini-2.5-flash-exp**: Fast, cost-effective (analysis, suggestions)
- **gemini-2.5-pro-exp**: High quality (prompt enhancement, complex reasoning)

### Performance Targets
- Cache hit: <50ms
- AI analysis: <5000ms (increased for reliability)
- Prompt enhancement: <8000ms (complex processing)
- Chat responses: <6000ms (conversational)
- Fallback activation: <100ms

### Cost Estimates
- Per request: $0.0001-0.0005
- Per user session: $0.001-0.005
- 10K users/month: $10-50

### Rate Limits
- Free users: 20 requests/hour
- Premium users: Unlimited
- Cache hits: Don't count toward limit

## Related Documentation

- **Spec**: `.kiro/specs/gemini-ai-integration/`
- **Analysis**: `docs/GEMINI_AI_INTEGRATION_ANALYSIS.md`
- **Summary**: `docs/GEMINI_INTEGRATION_SUMMARY.md`
- **LovaBolt Standards**: `.kiro/steering/lovabolt-standards.md`

## Questions?

- **Architecture**: See design.md in spec
- **Requirements**: See requirements.md in spec
- **Implementation**: See tasks.md in spec
- **Testing**: See comprehensive-testing-strategy.md

Remember: AI enhances the experience, but the app must work perfectly without it. Always implement fallback, always validate responses, always protect user privacy.
