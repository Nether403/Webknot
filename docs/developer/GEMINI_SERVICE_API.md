# GeminiService API Documentation

## Overview

The `GeminiService` class provides a comprehensive interface for integrating Google's Gemini 2.5 AI models into LovaBolt. It handles API communication, response validation, error handling, and model selection.

**Location:** `src/services/geminiService.ts`

## Installation

```bash
npm install @google/generative-ai
```

## Configuration

### Environment Variables

```bash
# .env
VITE_GEMINI_API_KEY=your_api_key_here
```

Get your API key from: https://aistudio.google.com/app/apikey

### TypeScript Configuration

Types are defined in `src/types/gemini.ts`:

```typescript
interface GeminiConfig {
  apiKey: string;
  model: 'gemini-2.5-flash-exp' | 'gemini-2.5-pro-exp';
  temperature: number;
  maxOutputTokens: number;
  timeout: number;
}
```

## Class: GeminiService

### Constructor

```typescript
constructor(config: GeminiConfig)
```

**Parameters:**
- `config.apiKey` - Your Gemini API key
- `config.model` - Model to use (flash for speed, pro for quality)
- `config.temperature` - Creativity level (0.0-1.0, default: 0.7)
- `config.maxOutputTokens` - Maximum response length (default: 1000)
- `config.timeout` - Request timeout in milliseconds (default: 2000)

**Example:**

```typescript
import { GeminiService } from './services/geminiService';

const service = new GeminiService({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  model: 'gemini-2.5-flash-exp',
  temperature: 0.7,
  maxOutputTokens: 1000,
  timeout: 2000
});
```

## Methods

### analyzeProject()

Analyzes a project description and returns intelligent recommendations.

```typescript
async analyzeProject(description: string): Promise<ProjectAnalysis>
```

**Parameters:**
- `description` - User's project description (minimum 20 characters)

**Returns:**

```typescript
interface ProjectAnalysis {
  projectType: 'Portfolio' | 'E-commerce' | 'Dashboard' | 'Web App' | 'Mobile App' | 'Website';
  designStyle: string;
  colorTheme: string;
  reasoning: string;
  confidence: number; // 0.0 to 1.0
  suggestedComponents?: string[];
  suggestedAnimations?: string[];
}
```

**Example:**

```typescript
const analysis = await service.analyzeProject(
  'I want to build a modern portfolio to showcase my design work'
);

console.log(analysis);
// {
//   projectType: 'Portfolio',
//   designStyle: 'minimalist',
//   colorTheme: 'monochrome-modern',
//   reasoning: 'Portfolio projects benefit from clean, minimalist designs...',
//   confidence: 0.92,
//   suggestedComponents: ['carousel', 'accordion'],
//   suggestedAnimations: ['fade-in']
// }
```

**Performance:**
- Target: <2000ms (95th percentile)
- Typical: 500-1500ms
- Cache hit: <50ms

**Error Handling:**

```typescript
try {
  const analysis = await service.analyzeProject(description);
} catch (error) {
  if (error instanceof GeminiError) {
    switch (error.type) {
      case GeminiErrorType.TIMEOUT_ERROR:
        // Handle timeout
        break;
      case GeminiErrorType.RATE_LIMIT:
        // Handle rate limit
        break;
      case GeminiErrorType.INVALID_RESPONSE:
        // Handle invalid response
        break;
    }
  }
}
```

### suggestImprovements() (Phase 2)

Analyzes current design selections and provides compatibility suggestions.

```typescript
async suggestImprovements(state: BoltBuilderState): Promise<DesignSuggestion[]>
```

**Parameters:**
- `state` - Current wizard state with all user selections

**Returns:**

```typescript
interface DesignSuggestion {
  type: 'improvement' | 'warning' | 'tip';
  message: string;
  reasoning: string;
  autoFixable: boolean;
  severity: 'low' | 'medium' | 'high';
}
```

**Example:**

```typescript
const suggestions = await service.suggestImprovements(wizardState);

suggestions.forEach(suggestion => {
  console.log(`[${suggestion.severity}] ${suggestion.message}`);
  console.log(`Reason: ${suggestion.reasoning}`);
  if (suggestion.autoFixable) {
    console.log('This can be auto-fixed');
  }
});
```

### enhancePrompt() (Phase 2)

Enhances a basic prompt with professional details and best practices.

```typescript
async enhancePrompt(basicPrompt: string): Promise<PromptEnhancement>
```

**Parameters:**
- `basicPrompt` - The basic generated prompt

**Returns:**

```typescript
interface PromptEnhancement {
  originalPrompt: string;
  enhancedPrompt: string;
  improvements: string[];
  addedSections: string[];
}
```

**Example:**

```typescript
const enhancement = await service.enhancePrompt(generatedPrompt);

console.log('Original length:', enhancement.originalPrompt.length);
console.log('Enhanced length:', enhancement.enhancedPrompt.length);
console.log('Improvements:', enhancement.improvements);
console.log('Added sections:', enhancement.addedSections);
```

**Performance:**
- Target: <3000ms (95th percentile)
- Uses gemini-2.5-pro-exp for higher quality

### chat() (Phase 3)

Provides conversational AI assistance with context awareness.

```typescript
async chat(
  message: string,
  context: BoltBuilderState,
  history: ConversationMessage[]
): Promise<string>
```

**Parameters:**
- `message` - User's question or message
- `context` - Current wizard state for context
- `history` - Previous conversation messages

**Returns:**
- AI's response as a string

**Example:**

```typescript
const response = await service.chat(
  "What's the difference between glassmorphism and neumorphism?",
  currentState,
  conversationHistory
);

console.log('AI:', response);
```

## Error Handling

### Error Types

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
  
  constructor(type: GeminiErrorType, message: string, shouldFallback: boolean);
}
```

### Error Handling Pattern

```typescript
import { GeminiError, GeminiErrorType } from '../types/gemini';

try {
  const result = await service.analyzeProject(description);
  return result;
} catch (error) {
  if (error instanceof GeminiError) {
    // Handle specific error types
    if (error.shouldFallback) {
      // Activate fallback system
      return fallbackAnalysis(description);
    }
    
    // Show user-friendly message
    showError(getUserFriendlyMessage(error));
  } else {
    // Unknown error
    console.error('Unexpected error:', error);
  }
}
```

### User-Friendly Error Messages

```typescript
function getUserFriendlyMessage(error: GeminiError): string {
  switch (error.type) {
    case GeminiErrorType.RATE_LIMIT:
      return 'You\'ve reached the AI request limit. Please try again later.';
    
    case GeminiErrorType.TIMEOUT_ERROR:
      return 'AI analysis is taking longer than expected. Using standard analysis.';
    
    case GeminiErrorType.NETWORK_ERROR:
      return 'Unable to connect to AI service. Using standard analysis.';
    
    case GeminiErrorType.INVALID_API_KEY:
      return 'AI service configuration error. Please contact support.';
    
    default:
      return 'AI analysis unavailable. Using standard analysis.';
  }
}
```

## Model Selection

### gemini-2.5-flash-exp (Fast & Cost-Effective)

**Use for:**
- Project analysis
- Design suggestions
- Quick operations
- High-frequency requests

**Characteristics:**
- Fast response times (500-1500ms)
- Lower cost per request
- Good accuracy for structured tasks

### gemini-2.5-pro-exp (High Quality)

**Use for:**
- Prompt enhancement
- Complex reasoning
- Creative writing
- Quality-critical operations

**Characteristics:**
- Slower response times (1000-3000ms)
- Higher cost per request
- Superior quality and creativity

**Example:**

```typescript
// Fast model for analysis
const fastService = new GeminiService({
  apiKey: apiKey,
  model: 'gemini-2.5-flash-exp',
  temperature: 0.7,
  maxOutputTokens: 1000,
  timeout: 2000
});

// Pro model for enhancement
const proService = new GeminiService({
  apiKey: apiKey,
  model: 'gemini-2.5-pro-exp',
  temperature: 0.8,
  maxOutputTokens: 2000,
  timeout: 3000
});
```

## Response Validation

All responses are validated against TypeScript schemas before being returned.

### Validation Example

```typescript
private validateAnalysisResponse(data: any): asserts data is ProjectAnalysis {
  const validProjectTypes = [
    'Portfolio', 'E-commerce', 'Dashboard', 
    'Web App', 'Mobile App', 'Website'
  ];
  
  if (!data.projectType || !validProjectTypes.includes(data.projectType)) {
    throw new GeminiError(
      GeminiErrorType.INVALID_RESPONSE,
      'Invalid project type in response',
      true
    );
  }
  
  if (typeof data.confidence !== 'number' || 
      data.confidence < 0 || 
      data.confidence > 1) {
    throw new GeminiError(
      GeminiErrorType.INVALID_RESPONSE,
      'Invalid confidence score',
      true
    );
  }
  
  // Additional validation...
}
```

## Privacy & Security

### Input Sanitization

All user input is sanitized before being sent to the API:

```typescript
import { sanitizeInput } from '../utils/sanitization';

const sanitized = sanitizeInput(userDescription);
// Removes: emails, phone numbers, SSNs, credit cards
```

### What We Send

✅ **Sent to Gemini:**
- Project descriptions (sanitized)
- Design selections (no PII)
- Generated prompts (technical content)

❌ **Never Sent:**
- User names or emails
- IP addresses
- Session tokens
- Any personally identifiable information

## Performance Optimization

### Timeout Configuration

```typescript
// Analysis: 2 seconds
const analysisService = new GeminiService({
  timeout: 2000,
  // ...
});

// Enhancement: 3 seconds (more complex)
const enhancementService = new GeminiService({
  timeout: 3000,
  // ...
});
```

### Retry Logic

The service implements exponential backoff for network errors:

```typescript
// Retry delays: 1s, 2s, 4s
// Maximum 3 retries
// Only for network errors (not 4xx errors)
```

## Testing

### Unit Tests

```bash
npm test src/services/__tests__/geminiService.test.ts
```

**Test Coverage:**
- API request formatting
- Response parsing and validation
- Error handling for each error type
- Model selection
- Token counting
- Timeout handling

### Integration Tests

```bash
npm test src/hooks/__tests__/useGemini.test.ts
```

**Test Coverage:**
- Cache integration
- Fallback activation
- Rate limiting
- Loading states

## Cost Tracking

Track API usage and costs:

```typescript
import { costTracker } from './services/costTracker';

// After each API call
costTracker.trackRequest({
  model: 'gemini-2.5-flash-exp',
  tokensUsed: 456,
  latency: 1234,
  success: true
});

// Get cost summary
const summary = costTracker.getSummary();
console.log('Total cost:', summary.totalCost);
console.log('Requests today:', summary.requestsToday);
```

## Monitoring

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

// Log each operation
console.log('[Gemini]', JSON.stringify(logEntry));
```

### Metrics

Track these metrics:
- Request count by operation
- Average latency by operation
- Error rate by type
- Cache hit rate
- Token usage
- Estimated costs

## Best Practices

### DO:
✅ Use appropriate model for the task (Flash vs Pro)
✅ Implement timeout handling
✅ Validate all responses
✅ Sanitize user input
✅ Cache responses when possible
✅ Provide fallback mechanisms
✅ Log errors for monitoring
✅ Track costs and usage

### DON'T:
❌ Send PII to the API
❌ Skip response validation
❌ Ignore timeout errors
❌ Use Pro model for simple tasks
❌ Skip error handling
❌ Hardcode API keys
❌ Trust responses blindly
❌ Ignore rate limits

## Related Documentation

- **useGemini Hook**: `docs/developer/USE_GEMINI_HOOK.md`
- **Caching Strategy**: `docs/developer/CACHING_STRATEGY.md`
- **Error Handling**: `docs/developer/ERROR_HANDLING_PATTERNS.md`
- **Type Definitions**: `src/types/gemini.ts`
- **Service README**: `src/services/README.md`

## Support

For issues or questions:
- GitHub Issues: [github.com/yourusername/lovabolt/issues](https://github.com/yourusername/lovabolt/issues)
- Documentation: `.kiro/specs/gemini-ai-integration/`
- Standards: `.kiro/steering/gemini-ai-integration-standards.md`

---

**Last Updated:** November 4, 2025  
**Version:** 1.0.0  
**Maintainer:** LovaBolt Team
