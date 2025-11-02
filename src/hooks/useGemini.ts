/**
 * useGemini Hook
 * 
 * AI orchestrator hook that coordinates between caching, AI service, and fallback
 * Manages loading states, error handling, and provides unified interface for AI operations
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { CacheService } from '../services/cacheService';
import { RateLimiter } from '../services/rateLimiter';
import { getMetricsService } from '../services/metricsService';
import { getCostTracker } from '../services/costTracker';
import { getCircuitBreaker } from '../services/circuitBreaker';
import type {
  ProjectAnalysis,
  DesignSuggestion,
  UseGeminiOptions,
  UseGeminiResult,
  GeminiError,
} from '../types/gemini';
import type { BoltBuilderState } from '../types';
import { safeParseProjectDescription } from '../utils/nlpParser';
import { isAIEnabled } from '../utils/aiPreferences';
import { getProjectAnalysisWarmingData, estimateWarmingSize } from '../utils/cacheWarming';
import { debounceAsync } from '../utils/requestBatching';

/**
 * Determines if fallback should be activated based on error type
 * 
 * @param error - The error that occurred
 * @returns True if fallback should be activated
 */
function shouldActivateFallback(error: Error): boolean {
  // Check if it's a GeminiError with shouldFallback flag
  const geminiError = error as GeminiError;
  if (geminiError.shouldFallback !== undefined) {
    return geminiError.shouldFallback;
  }
  
  // Fallback on common error types
  const message = error.message.toLowerCase();
  return (
    message.includes('timeout') ||
    message.includes('network') ||
    message.includes('not available') ||
    message.includes('api error') ||
    message.includes('invalid response')
  );
}

/**
 * Custom hook for interacting with Gemini AI
 * Provides intelligent project analysis with caching and fallback support
 * 
 * @param options - Configuration options for the hook
 * @returns Hook interface with methods and state
 */
export function useGemini(options?: UseGeminiOptions): UseGeminiResult {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(20);
  const [resetTime, setResetTime] = useState(Date.now() + 3600000);
  
  // Service instances (persistent across renders)
  const geminiService = useRef<GeminiService | null>(null);
  const cacheService = useRef<CacheService>(new CacheService());
  const rateLimiter = useRef<RateLimiter>(
    new RateLimiter({
      maxRequests: 20,
      windowMs: 3600000, // 1 hour
      storageKey: 'lovabolt-rate-limit',
    })
  );
  const circuitBreaker = useRef(getCircuitBreaker());
  
  // Configuration
  const enableCache = options?.enableCache ?? true;
  const enableFallback = options?.enableFallback ?? true;
  const timeout = options?.timeout ?? 2000;
  
  // Initialize Gemini service and warm cache
  useEffect(() => {
    if (!geminiService.current) {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (apiKey && typeof apiKey === 'string') {
        try {
          geminiService.current = new GeminiService({
            apiKey,
            model: 'gemini-2.5-flash-exp',
            temperature: 0.7,
            maxOutputTokens: 1000,
            timeout,
          });
        } catch (err) {
          console.error('Failed to initialize Gemini service:', err);
          // Service will remain null, fallback will be used
        }
      } else {
        console.warn('Gemini API key not found. AI features will use fallback.');
      }
    }
    
    // Warm cache with common project analyses on initialization
    // This reduces cold start latency for frequently requested data
    if (enableCache) {
      const cacheStats = cacheService.current.getStats();
      const warmingSize = estimateWarmingSize(100, cacheStats.size);
      
      if (warmingSize > 0) {
        const warmingData = getProjectAnalysisWarmingData();
        // Only warm up to the estimated size
        const dataToWarm = warmingData.slice(0, warmingSize);
        
        cacheService.current.warm(dataToWarm);
        console.log(`[useGemini] Cache warmed with ${dataToWarm.length} common project analyses`);
      }
    }
    
    // Check cost thresholds periodically
    const costTracker = getCostTracker();
    costTracker.checkThresholds();
    
    // Check every hour
    const costCheckInterval = setInterval(() => {
      costTracker.checkThresholds();
    }, 3600000);
    
    return () => {
      clearInterval(costCheckInterval);
    };
  }, [timeout, enableCache]);
  
  // Update rate limit status
  useEffect(() => {
    const updateRateLimitStatus = () => {
      const status = rateLimiter.current.checkLimit();
      setRemainingRequests(status.remaining);
      setResetTime(status.resetTime);
    };
    
    // Update immediately
    updateRateLimitStatus();
    
    // Update every second to keep countdown accurate
    const interval = setInterval(updateRateLimitStatus, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Listen for AI preference changes
  useEffect(() => {
    const handlePreferenceChange = (event: CustomEvent) => {
      const { aiEnabled } = event.detail;
      console.log(`[useGemini] AI preferences changed: aiEnabled=${aiEnabled}`);
      
      // Clear error state when AI is re-enabled
      if (aiEnabled && isUsingFallback) {
        setIsUsingFallback(false);
        setError(null);
      }
    };
    
    window.addEventListener('ai-preferences-changed', handlePreferenceChange as EventListener);
    
    return () => {
      window.removeEventListener('ai-preferences-changed', handlePreferenceChange as EventListener);
    };
  }, [isUsingFallback]);
  
  /**
   * Internal implementation of project analysis
   * This is the actual analysis logic that will be debounced
   * 
   * @param description - The user's project description
   * @returns Project analysis with recommendations
   */
  const analyzeProjectInternal = useCallback(
    async (description: string): Promise<ProjectAnalysis> => {
      // Show loading indicator within 100ms
      const loadingTimeout = setTimeout(() => {
        setIsLoading(true);
      }, 100);
      
      setError(null);
      setIsUsingFallback(false);
      
      try {
        // Validate input
        if (!description || description.trim().length === 0) {
          throw new Error('Project description cannot be empty');
        }
        
        // Check if AI is enabled in preferences
        if (!isAIEnabled()) {
          console.log('[useGemini] AI features disabled by user preference, using fallback');
          throw new Error('AI features disabled');
        }
        
        // Check circuit breaker state
        if (!circuitBreaker.current.canAttempt()) {
          const statusMessage = circuitBreaker.current.getStatusMessage();
          
          console.warn('[useGemini] Circuit breaker is open, using fallback');
          console.log(`[useGemini] ${statusMessage}`);
          
          // Circuit is open or half-open with no attempts left, use fallback
          const circuitError = new Error(statusMessage);
          clearTimeout(loadingTimeout);
          setIsLoading(false);
          setError(circuitError);
          
          // Activate fallback
          if (enableFallback) {
            setIsUsingFallback(true);
            const fallbackResult = safeParseProjectDescription(description);
            
            if (options?.onError) {
              options.onError(circuitError);
            }
            
            return {
              projectType: fallbackResult.projectType || 'Website',
              designStyle: fallbackResult.designStyle || 'minimalist',
              colorTheme: fallbackResult.colorTheme || 'monochrome-modern',
              reasoning: statusMessage,
              confidence: Math.max(
                fallbackResult.confidence['projectType'] || 0,
                fallbackResult.confidence['designStyle'] || 0,
                fallbackResult.confidence['colorTheme'] || 0
              ) || 0.6,
            };
          }
          
          throw circuitError;
        }
        
        // Generate cache key
        const cacheKey = `analysis:${description.trim().toLowerCase()}`;
        
        // Check cache first if enabled (cache hits don't consume rate limit)
        if (enableCache) {
          const cached = cacheService.current.get<ProjectAnalysis>(cacheKey);
          if (cached) {
            console.log('[useGemini] Cache hit for project analysis');
            
            // Log cache hit
            const metricsService = getMetricsService();
            metricsService.logApiCall({
              timestamp: Date.now(),
              operation: 'analysis',
              model: 'cache',
              latency: 0,
              tokensUsed: 0,
              cacheHit: true,
              success: true,
            });
            
            clearTimeout(loadingTimeout);
            setIsLoading(false);
            return cached;
          }
        }
        
        // Cache miss - check rate limit before API call
        const rateLimitStatus = rateLimiter.current.checkLimit();
        
        if (rateLimitStatus.isLimited) {
          // Calculate time until reset in minutes
          const timeUntilReset = rateLimiter.current.getTimeUntilReset();
          const minutesUntilReset = Math.ceil(timeUntilReset / 60000);
          
          const rateLimitError = new Error(
            `AI limit reached. Please try again in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? 's' : ''}.`
          );
          
          console.warn('[useGemini] Rate limit exceeded');
          clearTimeout(loadingTimeout);
          setIsLoading(false);
          setError(rateLimitError);
          
          // Update rate limit status
          setRemainingRequests(rateLimitStatus.remaining);
          setResetTime(rateLimitStatus.resetTime);
          
          // Don't activate fallback for rate limit - user should wait
          // Call error callback if provided
          if (options?.onError) {
            options.onError(rateLimitError);
          }
          
          throw rateLimitError;
        }
        
        // Proceed with AI analysis
        console.log('[useGemini] Cache miss, calling Gemini API');
        
        // Try AI analysis if service is available
        if (geminiService.current) {
          // Consume a request from rate limit quota
          const consumed = rateLimiter.current.consumeRequest();
          
          if (!consumed) {
            // This shouldn't happen since we checked above, but handle it
            throw new Error('Failed to consume rate limit request');
          }
          
          // Update rate limit status
          const newStatus = rateLimiter.current.checkLimit();
          setRemainingRequests(newStatus.remaining);
          setResetTime(newStatus.resetTime);
          
          const result = await geminiService.current.analyzeProject(description);
          
          // Record success in circuit breaker
          circuitBreaker.current.recordSuccess();
          
          // Cache the successful result
          if (enableCache) {
            cacheService.current.set(cacheKey, result);
            console.log('[useGemini] Cached analysis result');
          }
          
          clearTimeout(loadingTimeout);
          setIsLoading(false);
          return result;
        }
        
        // No AI service available, use fallback
        throw new Error('AI service not available');
        
      } catch (err) {
        console.error('AI analysis failed:', err);
        clearTimeout(loadingTimeout);
        setIsLoading(false);
        
        const error = err as Error;
        setError(error);
        
        // Record failure in circuit breaker (unless it's a rate limit error)
        if (!error.message.toLowerCase().includes('rate limit') &&
            !error.message.toLowerCase().includes('ai features disabled')) {
          circuitBreaker.current.recordFailure();
        }
        
        // Determine if we should activate fallback
        const shouldFallback = enableFallback && shouldActivateFallback(error);
        
        // Activate fallback if enabled and error is recoverable
        if (shouldFallback) {
          // Ensure fallback activates within 100ms
          const fallbackStart = Date.now();
          setIsUsingFallback(true);
          
          console.log('[useGemini] Activating rule-based fallback system');
          
          // Use rule-based NLP parser as fallback
          const fallbackResult = safeParseProjectDescription(description);
          
          const fallbackDuration = Date.now() - fallbackStart;
          console.log(`[useGemini] Fallback completed in ${fallbackDuration}ms`);
          
          // Call error callback if provided
          if (options?.onError) {
            options.onError(error);
          }
          
          return {
            projectType: fallbackResult.projectType || 'Website',
            designStyle: fallbackResult.designStyle || 'minimalist',
            colorTheme: fallbackResult.colorTheme || 'monochrome-modern',
            reasoning: 'Using standard analysis (AI temporarily unavailable)',
            confidence: Math.max(
              fallbackResult.confidence['projectType'] || 0,
              fallbackResult.confidence['designStyle'] || 0,
              fallbackResult.confidence['colorTheme'] || 0
            ) || 0.6,
          };
        }
        
        // Call error callback if provided
        if (options?.onError) {
          options.onError(error);
        }
        
        // Re-throw if fallback is disabled or not applicable
        throw err;
      }
    },
    [enableCache, enableFallback, timeout, options]
  );
  
  // Create debounced version of analyzeProject to reduce API calls from rapid typing
  // Debounce by 500ms to wait for user to finish typing
  const debouncedAnalyzeProject = useRef(
    debounceAsync(analyzeProjectInternal as (...args: unknown[]) => Promise<unknown>, 500)
  );
  
  // Update debounced function when dependencies change
  useEffect(() => {
    debouncedAnalyzeProject.current = debounceAsync(analyzeProjectInternal as (...args: unknown[]) => Promise<unknown>, 500);
  }, [analyzeProjectInternal]);
  
  /**
   * Analyzes a project description using AI or fallback
   * Debounced to reduce API calls from rapid user input
   * 
   * @param description - The user's project description
   * @returns Project analysis with recommendations
   */
  const analyzeProject = useCallback(
    async (description: string): Promise<ProjectAnalysis> => {
      try {
        const result = await debouncedAnalyzeProject.current(description);
        return result as ProjectAnalysis;
      } catch (error) {
        // If debounced call was superseded, use fallback
        if (error instanceof Error && error.message.includes('superseded')) {
          console.log('[useGemini] Analysis superseded by newer request');
          // Return a pending state or throw to let caller handle
          throw error;
        }
        throw error;
      }
    },
    []
  );
  
  /**
   * Suggests design improvements based on current wizard state
   * 
   * @param state - Current wizard state with all selections
   * @returns Array of design suggestions
   */
  const suggestImprovements = useCallback(
    async (state: BoltBuilderState): Promise<DesignSuggestion[]> => {
      // Show loading indicator within 100ms
      const loadingTimeout = setTimeout(() => {
        setIsLoading(true);
      }, 100);
      
      setError(null);
      setIsUsingFallback(false);
      
      try {
        // Check if AI is enabled in preferences
        if (!isAIEnabled()) {
          console.log('[useGemini] AI features disabled by user preference');
          clearTimeout(loadingTimeout);
          setIsLoading(false);
          return [];
        }
        
        // Check circuit breaker state
        if (!circuitBreaker.current.canAttempt()) {
          console.warn('[useGemini] Circuit breaker is open, skipping suggestions');
          clearTimeout(loadingTimeout);
          setIsLoading(false);
          return [];
        }
        
        // Generate cache key based on state selections
        const cacheKey = `suggestions:${JSON.stringify({
          projectType: state.projectInfo.type,
          designStyle: state.selectedDesignStyle?.id,
          colorTheme: state.selectedColorTheme?.id,
          components: state.selectedComponents.map(c => c.id).sort(),
          background: state.selectedBackground?.id,
          animations: state.selectedAnimations.map(a => a.id).sort(),
        })}`;
        
        // Check cache first if enabled (cache hits don't consume rate limit)
        if (enableCache) {
          const cached = cacheService.current.get<DesignSuggestion[]>(cacheKey);
          if (cached) {
            console.log('[useGemini] Cache hit for design suggestions');
            
            // Log cache hit
            const metricsService = getMetricsService();
            metricsService.logApiCall({
              timestamp: Date.now(),
              operation: 'suggestions',
              model: 'cache',
              latency: 0,
              tokensUsed: 0,
              cacheHit: true,
              success: true,
            });
            
            clearTimeout(loadingTimeout);
            setIsLoading(false);
            return cached;
          }
        }
        
        // Cache miss - check rate limit before API call
        const rateLimitStatus = rateLimiter.current.checkLimit();
        
        if (rateLimitStatus.isLimited) {
          const timeUntilReset = rateLimiter.current.getTimeUntilReset();
          const minutesUntilReset = Math.ceil(timeUntilReset / 60000);
          
          const rateLimitError = new Error(
            `AI limit reached. Please try again in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? 's' : ''}.`
          );
          
          console.warn('[useGemini] Rate limit exceeded');
          clearTimeout(loadingTimeout);
          setIsLoading(false);
          setError(rateLimitError);
          
          if (options?.onError) {
            options.onError(rateLimitError);
          }
          
          return [];
        }
        
        // Proceed with AI suggestions
        console.log('[useGemini] Cache miss, calling Gemini API for suggestions');
        
        // Try AI suggestions if service is available
        if (geminiService.current) {
          // Consume a request from rate limit quota
          const consumed = rateLimiter.current.consumeRequest();
          
          if (!consumed) {
            throw new Error('Failed to consume rate limit request');
          }
          
          // Update rate limit status
          const newStatus = rateLimiter.current.checkLimit();
          setRemainingRequests(newStatus.remaining);
          setResetTime(newStatus.resetTime);
          
          const result = await geminiService.current.suggestImprovements(state);
          
          // Record success in circuit breaker
          circuitBreaker.current.recordSuccess();
          
          // Cache the successful result
          if (enableCache) {
            cacheService.current.set(cacheKey, result);
            console.log('[useGemini] Cached suggestions result');
          }
          
          clearTimeout(loadingTimeout);
          setIsLoading(false);
          return result;
        }
        
        // No AI service available
        throw new Error('AI service not available');
        
      } catch (err) {
        console.error('AI suggestions failed:', err);
        clearTimeout(loadingTimeout);
        setIsLoading(false);
        
        const error = err as Error;
        setError(error);
        
        // Record failure in circuit breaker (unless it's a rate limit error)
        if (!error.message.toLowerCase().includes('rate limit')) {
          circuitBreaker.current.recordFailure();
        }
        
        // For suggestions, we don't have a fallback - just return empty array
        if (options?.onError) {
          options.onError(error);
        }
        
        return [];
      }
    },
    [enableCache, options]
  );
  
  /**
   * Enhances a prompt with professional details and best practices
   * 
   * @param prompt - The basic prompt to enhance
   * @returns Enhanced prompt with improvements
   */
  const enhancePrompt = useCallback(
    async (prompt: string): Promise<{ originalPrompt: string; enhancedPrompt: string; improvements: string[]; addedSections: string[] }> => {
      // Show loading indicator within 100ms
      const loadingTimeout = setTimeout(() => {
        setIsLoading(true);
      }, 100);
      
      setError(null);
      setIsUsingFallback(false);
      
      try {
        // Validate input
        if (!prompt || prompt.trim().length === 0) {
          throw new Error('Prompt cannot be empty');
        }
        
        // Check if AI is enabled in preferences
        if (!isAIEnabled()) {
          console.log('[useGemini] AI features disabled by user preference');
          clearTimeout(loadingTimeout);
          setIsLoading(false);
          return {
            originalPrompt: prompt,
            enhancedPrompt: prompt,
            improvements: [],
            addedSections: [],
          };
        }
        
        // Check circuit breaker state
        if (!circuitBreaker.current.canAttempt()) {
          console.warn('[useGemini] Circuit breaker is open, skipping enhancement');
          clearTimeout(loadingTimeout);
          setIsLoading(false);
          return {
            originalPrompt: prompt,
            enhancedPrompt: prompt,
            improvements: [],
            addedSections: [],
          };
        }
        
        // Generate cache key
        const cacheKey = `enhancement:${prompt.substring(0, 100)}`;
        
        // Check cache first if enabled (cache hits don't consume rate limit)
        if (enableCache) {
          const cached = cacheService.current.get<{ originalPrompt: string; enhancedPrompt: string; improvements: string[]; addedSections: string[] }>(cacheKey);
          if (cached) {
            console.log('[useGemini] Cache hit for prompt enhancement');
            
            // Log cache hit
            const metricsService = getMetricsService();
            metricsService.logApiCall({
              timestamp: Date.now(),
              operation: 'enhancement',
              model: 'cache',
              latency: 0,
              tokensUsed: 0,
              cacheHit: true,
              success: true,
            });
            
            clearTimeout(loadingTimeout);
            setIsLoading(false);
            return cached;
          }
        }
        
        // Cache miss - check rate limit before API call
        const rateLimitStatus = rateLimiter.current.checkLimit();
        
        if (rateLimitStatus.isLimited) {
          const timeUntilReset = rateLimiter.current.getTimeUntilReset();
          const minutesUntilReset = Math.ceil(timeUntilReset / 60000);
          
          const rateLimitError = new Error(
            `AI limit reached. Please try again in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? 's' : ''}.`
          );
          
          console.warn('[useGemini] Rate limit exceeded');
          clearTimeout(loadingTimeout);
          setIsLoading(false);
          setError(rateLimitError);
          
          if (options?.onError) {
            options.onError(rateLimitError);
          }
          
          // Return original prompt without enhancement
          return {
            originalPrompt: prompt,
            enhancedPrompt: prompt,
            improvements: [],
            addedSections: [],
          };
        }
        
        // Proceed with AI enhancement
        console.log('[useGemini] Cache miss, calling Gemini API for prompt enhancement');
        
        // Try AI enhancement if service is available
        if (geminiService.current) {
          // Consume a request from rate limit quota
          const consumed = rateLimiter.current.consumeRequest();
          
          if (!consumed) {
            throw new Error('Failed to consume rate limit request');
          }
          
          // Update rate limit status
          const newStatus = rateLimiter.current.checkLimit();
          setRemainingRequests(newStatus.remaining);
          setResetTime(newStatus.resetTime);
          
          const result = await geminiService.current.enhancePrompt(prompt);
          
          // Record success in circuit breaker
          circuitBreaker.current.recordSuccess();
          
          // Cache the successful result
          if (enableCache) {
            cacheService.current.set(cacheKey, result);
            console.log('[useGemini] Cached enhancement result');
          }
          
          clearTimeout(loadingTimeout);
          setIsLoading(false);
          return result;
        }
        
        // No AI service available
        throw new Error('AI service not available');
        
      } catch (err) {
        console.error('AI prompt enhancement failed:', err);
        clearTimeout(loadingTimeout);
        setIsLoading(false);
        
        const error = err as Error;
        setError(error);
        
        // Record failure in circuit breaker (unless it's a rate limit error)
        if (!error.message.toLowerCase().includes('rate limit')) {
          circuitBreaker.current.recordFailure();
        }
        
        // For enhancement, return original prompt if it fails
        if (options?.onError) {
          options.onError(error);
        }
        
        return {
          originalPrompt: prompt,
          enhancedPrompt: prompt,
          improvements: [],
          addedSections: [],
        };
      }
    },
    [enableCache, options]
  );
  
  /**
   * Placeholder for chat functionality (Phase 3)
   */
  const chat = useCallback(
    async (_message: string): Promise<string> => {
      console.warn('chat not yet implemented (Phase 3)');
      return 'Chat functionality coming in Phase 3';
    },
    []
  );
  
  /**
   * Clears the cache
   */
  const clearCache = useCallback(() => {
    cacheService.current.clear();
  }, []);
  
  // Return hook interface
  return {
    // State
    isLoading,
    error,
    isUsingFallback,
    
    // Methods
    analyzeProject,
    suggestImprovements,
    enhancePrompt,
    chat,
    
    // Rate limiting (Phase 1, Task 6)
    remainingRequests,
    resetTime,
    
    // Cache control
    clearCache,
  };
}
