import type {
  GeminiConfig,
  ProjectAnalysis,
  DesignSuggestion,
  PromptEnhancement,
  GeminiError,
  GeminiErrorType,
  ConversationMessage,
} from '../types/gemini';
import type { BoltBuilderState } from '../types';
import { sanitizeInput } from '../utils/sanitization';
import { getMetricsService } from './metricsService';

export class GeminiService {
  private config: GeminiConfig;
  private baseUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/ai`;

  constructor(config: GeminiConfig) {
    this.config = config;
  }

  private createError(type: GeminiErrorType, message: string, retryable: boolean): GeminiError {
    const error = new Error(message) as GeminiError;
    error.type = type;
    error.retryable = retryable;
    return error;
  }

  private handleError(error: unknown): GeminiError {
    if (error && typeof error === 'object' && 'type' in error) {
      return error as GeminiError;
    }
    return this.createError(
      'NETWORK_ERROR',
      error instanceof Error ? error.message : 'An unknown error occurred',
      true
    );
  }

  async suggestImprovements(state: BoltBuilderState): Promise<DesignSuggestion[]> {
    const startTime = Date.now();
    const metricsService = getMetricsService();

    try {
      const response = await fetch(`${this.baseUrl}/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();

      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'suggestions',
        model: this.config.model,
        latency: Date.now() - startTime,
        tokensUsed: 0,
        cacheHit: false,
        success: true,
      });

      return result.suggestions || [];
    } catch (error) {
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'suggestions',
        model: this.config.model,
        latency: Date.now() - startTime,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw this.handleError(error);
    }
  }

  async enhancePrompt(basicPrompt: string): Promise<PromptEnhancement> {
    const startTime = Date.now();
    const metricsService = getMetricsService();

    try {
      const response = await fetch(`${this.baseUrl}/enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ basicPrompt }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();

      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'enhancement',
        model: this.config.model,
        latency: Date.now() - startTime,
        tokensUsed: 0,
        cacheHit: false,
        success: true,
      });

      // Provide dummy parsing since backend returns text
      return {
        originalPrompt: basicPrompt,
        enhancedPrompt: result.enhancedPrompt,
        improvements: ['Added professional details'],
        addedSections: [],
      };
    } catch (error) {
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'enhancement',
        model: this.config.model,
        latency: Date.now() - startTime,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw this.handleError(error);
    }
  }

  async chat(
    message: string,
    context: BoltBuilderState,
    history: ConversationMessage[]
  ): Promise<string> {
    const startTime = Date.now();
    const metricsService = getMetricsService();

    try {
      const sanitized = sanitizeInput(message);
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: sanitized, context, history }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();

      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'chat',
        model: this.config.model,
        latency: Date.now() - startTime,
        tokensUsed: 0,
        cacheHit: false,
        success: true,
      });

      return result.response;
    } catch (error) {
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'chat',
        model: this.config.model,
        latency: Date.now() - startTime,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw this.handleError(error);
    }
  }

  async analyzeProject(description: string): Promise<ProjectAnalysis> {
    const startTime = Date.now();
    const metricsService = getMetricsService();

    try {
      const sanitized = sanitizeInput(description);
      const response = await fetch(`${this.baseUrl}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: sanitized }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();

      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: this.config.model,
        latency: Date.now() - startTime,
        tokensUsed: 0,
        cacheHit: false,
        success: true,
      });

      return result as ProjectAnalysis;
    } catch (error) {
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: this.config.model,
        latency: Date.now() - startTime,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw this.handleError(error);
    }
  }
}
