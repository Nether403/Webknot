# Design Document

## Overview

This design implements a hybrid AI system that combines the speed and reliability of rule-based algorithms with the intelligence and creativity of Google's Gemini 2.5 API. The architecture prioritizes user experience, cost efficiency, and system reliability through aggressive caching, graceful degradation, and intelligent fallback mechanisms.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     LovaBolt Frontend                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ ProjectSetup │  │ DesignSteps  │  │ PreviewStep  │     │
│  │    Step      │  │              │  │              │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                    ┌───────▼────────┐                       │
│                    │  AI Orchestrator│                       │
│                    │   (useGemini)   │                       │
│                    └───────┬────────┘                       │
│                            │                                 │
│         ┌──────────────────┼──────────────────┐             │
│         │                  │                  │             │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐    │
│  │   Caching    │  │    Gemini    │  │  Rule-Based  │    │
│  │    Layer     │  │   Service    │  │   Fallback   │    │
│  └──────────────┘  └──────┬───────┘  └──────────────┘    │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Gemini 2.5 API │
                    │  (Google Cloud) │
                    └─────────────────┘
```

### Component Responsibilities

**AI Orchestrator (useGemini hook)**
- Coordinates between caching, AI service, and fallback
- Manages loading states and error handling
- Implements rate limiting and retry logic
- Provides unified interface for all AI operations

**Caching Layer**
- In-memory cache (Map) for instant responses
- LocalStorage persistence for session continuity
- LRU eviction for memory management
- 1-hour TTL for cached responses

**Gemini Service**
- API communication with Gemini 2.0
- Request/response formatting
- Model selection (Flash vs Pro)
- Token counting and cost tracking

**Rule-Based Fallback**
- Existing smartDefaults, nlpParser, etc.
- Activated on AI failure or timeout
- Provides deterministic baseline functionality
- Zero latency, zero cost

## Components and Interfaces

### 1. Gemini Service (`src/services/geminiService.ts`)

```typescript
export interface GeminiConfig {
  apiKey: string;
  model: 'gemini-2.5-flash-exp' | 'gemini-2.5-pro-exp';
  temperature: number;
  maxOutputTokens: number;
  timeout: number; // milliseconds
}

export interface ProjectAnalysis {
  projectType: ProjectInfo['type'];
  designStyle: string;
  colorTheme: string;
  reasoning: string;
  confidence: number;
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

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private flashModel: GenerativeModel;
  private proModel: GenerativeModel;
  private config: GeminiConfig;
  
  constructor(config: GeminiConfig);
  
  // Phase 1: Core Analysis
  async analyzeProject(description: string): Promise<ProjectAnalysis>;
  
  // Phase 2: Suggestions
  async suggestImprovements(state: BoltBuilderState): Promise<DesignSuggestion[]>;
  async enhancePrompt(basicPrompt: string): Promise<PromptEnhancement>;
  
  // Phase 3: Conversational
  async chat(
    message: string, 
    context: BoltBuilderState,
    history: ConversationMessage[]
  ): Promise<string>;
  
  // Utility methods
  private buildPrompt(type: string, data: any): string;
  private validateResponse(response: any, schema: any): boolean;
  private handleError(error: Error): never;
}
```

### 2. Caching Layer (`src/services/cacheService.ts`)

```typescript
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  hits: number;
}

export interface CacheConfig {
  maxSize: number;
  ttl: number; // milliseconds
  persistToLocalStorage: boolean;
  storageKey: string;
}

export class CacheService {
  private cache: Map<string, CacheEntry<any>>;
  private config: CacheConfig;
  
  constructor(config: CacheConfig);
  
  get<T>(key: string): T | null;
  set<T>(key: string, data: T): void;
  has(key: string): boolean;
  clear(): void;
  
  // LRU eviction
  private evictOldest(): void;
  
  // Persistence
  private loadFromStorage(): void;
  private saveToStorage(): void;
  
  // Statistics
  getStats(): {
    size: number;
    hitRate: number;
    oldestEntry: number;
  };
}
```

### 3. AI Orchestrator Hook (`src/hooks/useGemini.ts`)

```typescript
export interface UseGeminiOptions {
  enableCache?: boolean;
  enableFallback?: boolean;
  timeout?: number;
  onError?: (error: Error) => void;
}

export interface UseGeminiResult {
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

export function useGemini(options?: UseGeminiOptions): UseGeminiResult;
```

### 4. Rate Limiter (`src/services/rateLimiter.ts`)

```typescript
export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  storageKey: string;
}

export interface RateLimitStatus {
  remaining: number;
  resetTime: number;
  isLimited: boolean;
}

export class RateLimiter {
  private config: RateLimitConfig;
  
  constructor(config: RateLimitConfig);
  
  checkLimit(): RateLimitStatus;
  consumeRequest(): boolean;
  reset(): void;
  
  private loadFromStorage(): void;
  private saveToStorage(): void;
}
```

## Data Models

### Configuration Storage

```typescript
// localStorage: 'lovabolt-gemini-config'
interface GeminiStoredConfig {
  apiKey: string;
  preferredModel: 'flash' | 'pro';
  aiEnabled: boolean;
  consentGiven: boolean;
  consentTimestamp: number;
}

// localStorage: 'lovabolt-gemini-cache'
interface GeminiCacheStorage {
  entries: Record<string, CacheEntry<any>>;
  lastCleanup: number;
}

// localStorage: 'lovabolt-rate-limit'
interface RateLimitStorage {
  requests: number[];
  windowStart: number;
}
```

### API Request/Response Formats

**Project Analysis Request:**
```typescript
{
  prompt: `You are a web design expert. Analyze this project description:

"${description}"

Respond in JSON format:
{
  "projectType": "Portfolio|E-commerce|Dashboard|Web App|Mobile App|Website",
  "designStyle": "minimalist|glassmorphism|material-design|...",
  "colorTheme": "ocean-breeze|sunset-warmth|monochrome-modern|...",
  "reasoning": "Brief explanation",
  "confidence": 0.0-1.0,
  "suggestedComponents": ["component-id-1", "component-id-2"],
  "suggestedAnimations": ["animation-id-1"]
}

Only suggest IDs that exist in our system.`,
  model: "gemini-2.5-flash-exp"
}
```

**Design Suggestions Request:**
```typescript
{
  prompt: `Analyze these design selections for compatibility and provide suggestions:

Project Type: ${state.projectInfo.type}
Design Style: ${state.selectedDesignStyle?.title}
Color Theme: ${state.selectedColorTheme?.title}
Components: ${state.selectedComponents.map(c => c.title).join(', ')}
Background: ${state.selectedBackground?.title}

Respond in JSON format:
{
  "suggestions": [
    {
      "type": "improvement|warning|tip",
      "message": "Clear suggestion text",
      "reasoning": "Why this matters",
      "autoFixable": true|false,
      "severity": "low|medium|high"
    }
  ]
}`,
  model: "gemini-2.5-flash-exp"
}
```

**Prompt Enhancement Request:**
```typescript
{
  prompt: `Enhance this project specification prompt with professional details:

${basicPrompt}

Add:
- Technical best practices
- Accessibility requirements (WCAG 2.1 AA)
- Performance optimization suggestions
- SEO considerations (if applicable)
- Security best practices (if applicable)
- Testing recommendations

Maintain the original structure and add new sections where appropriate.
Return the complete enhanced prompt.`,
  model: "gemini-2.5-pro-exp" // Use Pro for higher quality
}
```

## Error Handling

### Error Types and Responses

```typescript
enum GeminiErrorType {
  API_ERROR = 'API_ERROR',           // Gemini API returned error
  NETWORK_ERROR = 'NETWORK_ERROR',   // Network connectivity issue
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',   // Request exceeded timeout
  INVALID_RESPONSE = 'INVALID_RESPONSE', // Response validation failed
  RATE_LIMIT = 'RATE_LIMIT',         // User exceeded rate limit
  INVALID_API_KEY = 'INVALID_API_KEY' // API key is invalid
}

class GeminiError extends Error {
  type: GeminiErrorType;
  originalError?: Error;
  shouldFallback: boolean;
  
  constructor(type: GeminiErrorType, message: string, shouldFallback: boolean);
}
```

### Error Handling Strategy

1. **API Errors (4xx, 5xx)**
   - Log error details
   - Activate fallback immediately
   - Show user-friendly message
   - Don't retry (except 429 rate limit)

2. **Network Errors**
   - Retry with exponential backoff (1s, 2s, 4s)
   - Max 3 retries
   - Activate fallback after retries exhausted
   - Cache last successful response

3. **Timeout Errors**
   - Cancel request after timeout (2s for analysis, 3s for enhancement)
   - Activate fallback immediately
   - Log slow response for monitoring

4. **Invalid Response**
   - Validate against TypeScript schema
   - Log validation errors
   - Activate fallback
   - Alert developers if frequent

5. **Rate Limit**
   - Show countdown timer to user
   - Don't activate fallback (user can wait)
   - Suggest premium tier

### Fallback Activation Logic

```typescript
function shouldActivateFallback(error: GeminiError): boolean {
  return error.shouldFallback && (
    error.type === GeminiErrorType.API_ERROR ||
    error.type === GeminiErrorType.NETWORK_ERROR ||
    error.type === GeminiErrorType.TIMEOUT_ERROR ||
    error.type === GeminiErrorType.INVALID_RESPONSE
  );
}

async function executeWithFallback<T>(
  aiOperation: () => Promise<T>,
  fallbackOperation: () => T
): Promise<T> {
  try {
    return await aiOperation();
  } catch (error) {
    if (error instanceof GeminiError && shouldActivateFallback(error)) {
      console.warn('AI failed, using fallback:', error.message);
      return fallbackOperation();
    }
    throw error;
  }
}
```

## Testing Strategy

### Unit Tests

**GeminiService Tests:**
- ✅ API request formatting
- ✅ Response parsing and validation
- ✅ Error handling for each error type
- ✅ Model selection (Flash vs Pro)
- ✅ Token counting

**CacheService Tests:**
- ✅ Get/set operations
- ✅ TTL expiration
- ✅ LRU eviction
- ✅ LocalStorage persistence
- ✅ Cache statistics

**RateLimiter Tests:**
- ✅ Request counting
- ✅ Window reset
- ✅ Limit enforcement
- ✅ Storage persistence

### Integration Tests

**AI Orchestrator Tests:**
- ✅ Cache hit/miss scenarios
- ✅ Fallback activation
- ✅ Rate limit enforcement
- ✅ Error propagation
- ✅ Loading state management

**End-to-End Tests:**
- ✅ Complete project analysis flow
- ✅ Suggestion generation and application
- ✅ Prompt enhancement workflow
- ✅ Conversational chat session
- ✅ Offline/online transitions

### Performance Tests

**Latency Targets:**
- Cache hit: <50ms
- AI analysis: <2000ms
- Prompt enhancement: <3000ms
- Fallback activation: <100ms

**Load Tests:**
- 100 concurrent users
- 1000 requests/hour
- Cache efficiency >80%
- Error rate <1%

## Security Considerations

### API Key Management

```typescript
// Never commit API keys to repository
// Use environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Validate key format
function isValidApiKey(key: string): boolean {
  return /^AIza[0-9A-Za-z-_]{35}$/.test(key);
}

// Rotate keys periodically
// Use different keys for dev/staging/prod
```

### Data Privacy

**What we send to Gemini:**
- ✅ Project descriptions (anonymized)
- ✅ Design selections (no PII)
- ✅ Generated prompts (technical content only)

**What we DON'T send:**
- ❌ User names or emails
- ❌ IP addresses
- ❌ Session tokens
- ❌ Any personally identifiable information

### Content Filtering

```typescript
function sanitizeInput(text: string): string {
  // Remove potential PII patterns
  text = text.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[email]');
  text = text.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[phone]');
  text = text.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[ssn]');
  
  return text;
}
```

## Monitoring and Observability

### Metrics to Track

```typescript
interface GeminiMetrics {
  // Usage
  totalRequests: number;
  requestsByModel: Record<string, number>;
  requestsByFeature: Record<string, number>;
  
  // Performance
  averageLatency: number;
  p95Latency: number;
  p99Latency: number;
  
  // Reliability
  errorRate: number;
  fallbackRate: number;
  cacheHitRate: number;
  
  // Cost
  totalTokensUsed: number;
  estimatedCost: number;
  costPerUser: number;
}
```

### Logging Strategy

```typescript
// Structured logging
logger.info('gemini.request', {
  feature: 'project-analysis',
  model: 'gemini-2.5-flash-exp',
  cacheHit: false,
  timestamp: Date.now()
});

logger.info('gemini.response', {
  feature: 'project-analysis',
  latency: 1234,
  tokensUsed: 456,
  success: true
});

logger.error('gemini.error', {
  feature: 'prompt-enhancement',
  errorType: 'TIMEOUT_ERROR',
  fallbackActivated: true,
  timestamp: Date.now()
});
```

## Phase-Specific Implementation Details

### Phase 1: MVP (Weeks 1-2)

**Focus:** Project analysis with caching and fallback

**Components to Build:**
1. GeminiService (basic)
2. CacheService (in-memory + localStorage)
3. useGemini hook (analysis only)
4. ProjectSetupStep integration
5. Error handling and fallback

**Success Criteria:**
- >80% accuracy on project type detection
- <2s response time (95th percentile)
- <1% error rate
- Cache hit rate >50%

### Phase 2: Enhancement (Weeks 3-4)

**Focus:** Suggestions and prompt optimization

**Components to Build:**
1. Design suggestion system
2. Prompt enhancement feature
3. CompatibilityIndicator UI updates
4. PreviewStep AI enhancement button
5. Rate limiting

**Success Criteria:**
- 30% improvement in prompt quality scores
- 50% of users use AI suggestions
- <$50/month API costs
- Rate limiting prevents abuse

### Phase 3: Advanced (Month 2+)

**Focus:** Conversational interface and premium features

**Components to Build:**
1. Chat interface component
2. Conversation history management
3. Context-aware responses
4. Premium tier gating
5. Analytics dashboard

**Success Criteria:**
- 10% conversion to premium
- 90% user satisfaction
- Positive ROI
- <3s chat response time

## Deployment Strategy

### Environment Configuration

```typescript
// .env.development
VITE_GEMINI_API_KEY=AIza...dev-key
VITE_GEMINI_MODEL=gemini-2.5-flash-exp
VITE_AI_ENABLED=true
VITE_RATE_LIMIT=20

// .env.production
VITE_GEMINI_API_KEY=AIza...prod-key
VITE_GEMINI_MODEL=gemini-2.5-flash-exp
VITE_AI_ENABLED=true
VITE_RATE_LIMIT=20
```

### Feature Flags

```typescript
interface FeatureFlags {
  aiProjectAnalysis: boolean;
  aiSuggestions: boolean;
  aiPromptEnhancement: boolean;
  aiChat: boolean;
  premiumTier: boolean;
}

// Gradual rollout
const flags: FeatureFlags = {
  aiProjectAnalysis: true,  // Phase 1
  aiSuggestions: false,      // Phase 2
  aiPromptEnhancement: false, // Phase 2
  aiChat: false,             // Phase 3
  premiumTier: false         // Phase 3
};
```

### Rollback Plan

If issues arise:
1. Disable AI features via feature flag
2. System automatically uses rule-based fallback
3. No data loss or user impact
4. Fix issues in development
5. Re-enable gradually (10% → 50% → 100%)

## Cost Optimization Strategies

1. **Aggressive Caching**
   - 1-hour TTL for identical requests
   - LocalStorage persistence across sessions
   - Cache warming for common queries

2. **Model Selection**
   - Use Flash (cheaper) for most operations
   - Use Pro only for prompt enhancement
   - Batch requests when possible

3. **Token Optimization**
   - Concise prompts with clear instructions
   - Structured output (JSON) reduces tokens
   - Summarize long conversations

4. **Rate Limiting**
   - 20 requests/hour for free users
   - Unlimited for premium users
   - Prevents abuse and runaway costs

5. **Monitoring and Alerts**
   - Daily cost tracking
   - Alert at $500/month threshold
   - Automatic throttling if needed
