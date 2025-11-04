/**
 * Gemini AI Integration Types
 * 
 * Type definitions for Google Gemini 2.5 API integration
 */

import type { ProjectInfo } from './index';

// ============================================================================
// Configuration Types
// ============================================================================

export interface GeminiConfig {
  apiKey: string;
  model: 'gemini-2.5-flash-exp' | 'gemini-2.5-pro-exp';
  temperature: number;
  maxOutputTokens: number;
  timeout: number; // milliseconds
}

// ============================================================================
// Response Types
// ============================================================================

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

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// ============================================================================
// Error Types
// ============================================================================

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

// ============================================================================
// Cache Types
// ============================================================================

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

// ============================================================================
// Rate Limiting Types
// ============================================================================

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

// ============================================================================
// Storage Types
// ============================================================================

export interface GeminiStoredConfig {
  apiKey: string;
  preferredModel: 'flash' | 'pro';
  aiEnabled: boolean;
  consentGiven: boolean;
  consentTimestamp: number;
}

export interface GeminiCacheStorage {
  entries: Record<string, CacheEntry<unknown>>;
  lastCleanup: number;
}

export interface RateLimitStorage {
  requests: number[];
  windowStart: number;
}

// ============================================================================
// Hook Types
// ============================================================================

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
  chat: (message: string, wizardState?: BoltBuilderState, currentStep?: string) => Promise<string>;
  
  // Rate limiting
  remainingRequests: number;
  resetTime: number;
  
  // Queue position (Phase 3, Task 20.2)
  queuePosition?: number;
  
  // Cache control
  clearCache: () => void;
}

// Import BoltBuilderState type for UseGeminiResult
import type { BoltBuilderState } from './index';

// ============================================================================
// Metrics Types
// ============================================================================

export interface GeminiMetrics {
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

export interface GeminiLogEntry {
  timestamp: number;
  operation: 'analysis' | 'suggestions' | 'enhancement' | 'chat';
  model: string;
  latency: number;
  tokensUsed: number;
  cacheHit: boolean;
  success: boolean;
  error?: string;
}

// ============================================================================
// Feedback Types (Phase 3, Task 18)
// ============================================================================

export type FeedbackType = 'thumbs-up' | 'thumbs-down';
export type FeedbackTarget = 'suggestion' | 'enhancement' | 'analysis' | 'chat';

export interface UserFeedback {
  id: string;
  timestamp: number;
  type: FeedbackType;
  target: FeedbackTarget;
  targetId: string; // ID of the suggestion, enhancement, etc.
  content?: string; // Optional text feedback
  metadata?: {
    suggestionType?: DesignSuggestion['type'];
    suggestionSeverity?: DesignSuggestion['severity'];
    wasAutoFixed?: boolean;
    wasAccepted?: boolean;
    [key: string]: unknown;
  };
}

export interface FeedbackStats {
  totalFeedback: number;
  positiveCount: number;
  negativeCount: number;
  acceptanceRate: number;
  feedbackByType: Record<FeedbackTarget, {
    positive: number;
    negative: number;
    total: number;
  }>;
  suggestionAcceptanceRate: Record<string, number>; // By suggestion type
}

export interface FeedbackStorage {
  feedback: UserFeedback[];
  lastSync: number;
}
