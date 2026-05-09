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
import { getMetricsService } from './metricsService';
import { aiClient } from './aiClient';

export class GeminiService {
  private config: GeminiConfig;

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
      const result = await aiClient.suggestImprovements(state);

      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'suggestions',
        model: this.config.model,
        latency: Date.now() - startTime,
        tokensUsed: 0,
        cacheHit: false,
        success: true,
      });

      return result.suggestions;
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
      const result = await aiClient.enhancePrompt(basicPrompt);

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
      const result = await aiClient.chat(message, context, history);

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
      const result = await aiClient.analyzeProject(description);

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
