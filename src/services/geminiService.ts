/**
 * Gemini AI Service
 * 
 * Core service for interacting with Google's Gemini 2.5 API
 * Handles project analysis, design suggestions, and prompt enhancement
 */

import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
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
import { sanitizeInput, isValidApiKey } from '../utils/sanitization';
import { getMetricsService } from './metricsService';

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private flashModel: GenerativeModel;
  private proModel: GenerativeModel; // Reserved for Phase 2: prompt enhancement
  private config: GeminiConfig;
  
  constructor(config: GeminiConfig) {
    // Validate API key
    if (!isValidApiKey(config.apiKey)) {
      throw this.createError(
        'INVALID_API_KEY' as GeminiErrorType,
        'Invalid API key format. Expected format: AIza[35 characters]',
        false
      );
    }
    
    this.config = config;
    this.genAI = new GoogleGenerativeAI(config.apiKey);
    
    // Initialize Flash model (fast, cost-effective)
    this.flashModel = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: config.temperature,
        maxOutputTokens: config.maxOutputTokens,
        responseMimeType: 'application/json', // Structured output
      },
    });
    
    // Initialize Pro model (high quality)
    this.proModel = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp', // Using flash for now as pro-exp may not be available
      generationConfig: {
        temperature: config.temperature,
        maxOutputTokens: config.maxOutputTokens,
      },
    });
  }
  
  /**
   * Suggests design improvements based on current wizard state
   * Analyzes compatibility between selections and provides actionable recommendations
   * 
   * @param state - Current wizard state with all user selections
   * @returns Array of design suggestions with severity and reasoning
   */
  async suggestImprovements(state: BoltBuilderState): Promise<DesignSuggestion[]> {
    const startTime = Date.now();
    const metricsService = getMetricsService();
    
    try {
      // Build compatibility analysis prompt
      const prompt = this.buildSuggestionsPrompt(state);
      
      // Call API with timeout and retry logic
      const result = await this.callWithRetry(
        () => this.callWithTimeout(
          () => this.flashModel.generateContent(prompt),
          this.config.timeout
        )
      );
      
      // Parse and validate response
      const responseText = result.response.text();
      const response = JSON.parse(responseText);
      this.validateSuggestionsResponse(response);
      
      // Calculate metrics
      const latency = Date.now() - startTime;
      const tokensUsed = this.estimateTokens(prompt, responseText);
      
      // Log successful API call
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'suggestions',
        model: this.config.model,
        latency,
        tokensUsed,
        cacheHit: false,
        success: true,
      });
      
      return response.suggestions as DesignSuggestion[];
      
    } catch (error) {
      // Calculate metrics for failed call
      const latency = Date.now() - startTime;
      
      // Log failed API call
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'suggestions',
        model: this.config.model,
        latency,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      
      throw this.handleError(error);
    }
  }
  
  /**
   * Enhances a basic prompt with professional details and best practices
   * Uses Pro model for higher quality output
   * 
   * @param basicPrompt - The basic prompt to enhance
   * @returns Enhanced prompt with improvements and added sections
   */
  async enhancePrompt(basicPrompt: string): Promise<PromptEnhancement> {
    const startTime = Date.now();
    const metricsService = getMetricsService();
    
    try {
      // Build enhancement prompt
      const prompt = this.buildEnhancementPrompt(basicPrompt);
      
      // Use Pro model for higher quality (with 8s timeout for enhancement - more complex processing)
      const enhancementTimeout = 8000;
      const result = await this.callWithRetry(
        () => this.callWithTimeout(
          () => this.proModel.generateContent(prompt),
          enhancementTimeout
        )
      );
      
      // Parse response (not JSON, plain text)
      const responseText = result.response.text();
      
      // Extract enhanced prompt and metadata
      const enhancement = this.parseEnhancementResponse(responseText, basicPrompt);
      
      // Calculate metrics
      const latency = Date.now() - startTime;
      const tokensUsed = this.estimateTokens(prompt, responseText);
      
      // Log successful API call
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'enhancement',
        model: this.config.model,
        latency,
        tokensUsed,
        cacheHit: false,
        success: true,
      });
      
      return enhancement;
      
    } catch (error) {
      // Calculate metrics for failed call
      const latency = Date.now() - startTime;
      
      // Log failed API call
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'enhancement',
        model: this.config.model,
        latency,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      
      throw this.handleError(error);
    }
  }
  
  /**
   * Handles conversational chat with context awareness
   * Maintains conversation continuity across multiple turns
   * 
   * @param message - The user's message
   * @param context - Current wizard state for context-aware responses
   * @param history - Previous conversation messages
   * @returns AI assistant's response
   */
  async chat(
    message: string,
    context: BoltBuilderState,
    history: ConversationMessage[]
  ): Promise<string> {
    const startTime = Date.now();
    const metricsService = getMetricsService();
    
    try {
      // Sanitize input
      const sanitized = sanitizeInput(message);
      
      // Build context-aware prompt
      const prompt = this.buildChatPrompt(sanitized, context, history);
      
      // Call API with timeout (6s for chat - conversational responses can be longer)
      const chatTimeout = 6000;
      const result = await this.callWithRetry(
        () => this.callWithTimeout(
          () => this.flashModel.generateContent(prompt),
          chatTimeout
        )
      );
      
      // Get response text
      const responseText = result.response.text();
      
      // Calculate metrics
      const latency = Date.now() - startTime;
      const tokensUsed = this.estimateTokens(prompt, responseText);
      
      // Log successful API call
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'chat',
        model: this.config.model,
        latency,
        tokensUsed,
        cacheHit: false,
        success: true,
      });
      
      return responseText.trim();
      
    } catch (error) {
      // Calculate metrics for failed call
      const latency = Date.now() - startTime;
      
      // Log failed API call
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'chat',
        model: this.config.model,
        latency,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      
      throw this.handleError(error);
    }
  }
  
  /**
   * Analyzes a project description and returns intelligent recommendations
   * 
   * @param description - The user's project description
   * @returns Project analysis with recommendations and confidence score
   */
  async analyzeProject(description: string): Promise<ProjectAnalysis> {
    const startTime = Date.now();
    const metricsService = getMetricsService();
    
    try {
      // Sanitize input to remove PII
      const sanitized = sanitizeInput(description);
      
      // Build analysis prompt
      const prompt = this.buildAnalysisPrompt(sanitized);
      
      // Call API with timeout and retry logic
      const result = await this.callWithRetry(
        () => this.callWithTimeout(
          () => this.flashModel.generateContent(prompt),
          this.config.timeout
        )
      );
      
      // Parse and validate response
      const responseText = result.response.text();
      const response = JSON.parse(responseText);
      this.validateAnalysisResponse(response);
      
      // Calculate metrics
      const latency = Date.now() - startTime;
      const tokensUsed = this.estimateTokens(prompt, responseText);
      
      // Log successful API call
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: this.config.model,
        latency,
        tokensUsed,
        cacheHit: false,
        success: true,
      });
      
      return response as ProjectAnalysis;
      
    } catch (error) {
      // Calculate metrics for failed call
      const latency = Date.now() - startTime;
      
      // Log failed API call
      metricsService.logApiCall({
        timestamp: Date.now(),
        operation: 'analysis',
        model: this.config.model,
        latency,
        tokensUsed: 0,
        cacheHit: false,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      
      throw this.handleError(error);
    }
  }
  
  /**
   * Builds the prompt for design suggestions
   * 
   * @param state - Current wizard state
   * @returns Formatted prompt for Gemini API
   */
  private buildSuggestionsPrompt(state: BoltBuilderState): string {
    // Extract relevant selections
    const projectType = state.projectInfo.type;
    const designStyle = state.selectedDesignStyle?.title || 'None';
    const colorTheme = state.selectedColorTheme?.title || 'None';
    const components = state.selectedComponents.map(c => c.title).join(', ') || 'None';
    const background = state.selectedBackground?.title || 'None';
    const animations = state.selectedAnimations.map(a => a.title).join(', ') || 'None';
    
    return `Analyze design compatibility. Provide 3-5 suggestions.

Project: ${projectType}
Style: ${designStyle}
Colors: ${colorTheme}
Components: ${components}
Background: ${background}
Animations: ${animations}

JSON format:
{
  "suggestions": [{
    "type": "improvement|warning|tip",
    "message": "actionable text",
    "reasoning": "why it matters",
    "autoFixable": boolean,
    "severity": "low|medium|high"
  }]
}`;
  }
  
  /**
   * Builds the prompt for project analysis
   * 
   * @param description - Sanitized project description
   * @returns Formatted prompt for Gemini API
   */
  private buildAnalysisPrompt(description: string): string {
    return `Analyze project and recommend design choices.

"${description}"

JSON format:
{
  "projectType": "Portfolio|E-commerce|Dashboard|Web App|Mobile App|Website",
  "designStyle": "minimalist|glassmorphism|material-design|neumorphism|brutalism|modern",
  "colorTheme": "ocean-breeze|sunset-warmth|monochrome-modern|forest-green|tech-neon|purple-haze",
  "reasoning": "1-2 sentence explanation",
  "confidence": 0.85,
  "suggestedComponents": ["id1", "id2"],
  "suggestedAnimations": ["id1"]
}`;
  }
  
  /**
   * Builds the prompt for enhancing a basic project prompt
   * 
   * @param basicPrompt - The basic prompt to enhance
   * @returns Formatted prompt for Gemini API
   */
  private buildEnhancementPrompt(basicPrompt: string): string {
    return `Enhance this prompt with professional details. Add sections for:
1. Accessibility (WCAG 2.1 AA, keyboard nav, ARIA, contrast 4.5:1)
2. Performance (code splitting, image optimization, <200KB bundle, Lighthouse 90+)
3. SEO (meta tags, semantic HTML, mobile-first)
4. Security (validation, HTTPS, CSP, XSS/CSRF protection)
5. Testing (unit, integration, E2E, accessibility)
6. Code Quality (TypeScript strict, ESLint, error boundaries)

Original:
${basicPrompt}

Return complete enhanced prompt with ## headers for new sections.`;
  }
  
  /**
   * Builds a context-aware chat prompt
   * Includes current wizard state and conversation history
   * Uses intelligent question routing and follow-up handling
   * 
   * @param message - The user's message
   * @param context - Current wizard state
   * @param history - Previous conversation messages
   * @param currentStep - Current wizard step (optional)
   * @returns Formatted prompt for Gemini API
   */
  private buildChatPrompt(
    message: string,
    context: BoltBuilderState,
    history: ConversationMessage[],
    currentStep?: string
  ): string {
    // Build context summary using the existing method
    const contextSummary = this.buildContextSummary(context);
    
    // Build conversation history (last 6 messages for context)
    const recentHistory = history.slice(-6);
    const historyText = recentHistory.length > 0
      ? recentHistory.map(msg => 
          `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        ).join('\n')
      : 'No previous conversation';
    
    // Basic prompt with context
    return `You are a helpful AI assistant for a web design wizard. Answer the user's question based on their current project context.

Current Project Context:
${contextSummary}

Conversation History:
${historyText}

User Question: ${message}

Provide a helpful, concise response (2-3 sentences). Focus on practical advice related to their design choices.`;
  }
  
  /**
   * Builds a summary of the current wizard state for context
   * 
   * @param context - Current wizard state
   * @returns Formatted context summary
   */
  private buildContextSummary(context: BoltBuilderState): string {
    const parts: string[] = [];
    
    // Project info
    if (context.projectInfo.name) {
      parts.push(`Project: ${context.projectInfo.name} (${context.projectInfo.type})`);
    }
    
    // Design selections
    if (context.selectedDesignStyle) {
      parts.push(`Design Style: ${context.selectedDesignStyle.title}`);
    }
    
    if (context.selectedColorTheme) {
      parts.push(`Color Theme: ${context.selectedColorTheme.title}`);
    }
    
    if (context.selectedLayout) {
      parts.push(`Layout: ${context.selectedLayout.title}`);
    }
    
    // React-Bits selections
    if (context.selectedBackground) {
      parts.push(`Background: ${context.selectedBackground.title}`);
    }
    
    if (context.selectedComponents.length > 0) {
      parts.push(`Components: ${context.selectedComponents.map(c => c.title).join(', ')}`);
    }
    
    if (context.selectedAnimations.length > 0) {
      parts.push(`Animations: ${context.selectedAnimations.map(a => a.title).join(', ')}`);
    }
    
    return parts.length > 0 ? parts.join('\n') : 'No selections made yet';
  }
  
  /**
   * Parses the enhancement response and extracts metadata
   * 
   * @param responseText - The raw response from Gemini
   * @param originalPrompt - The original prompt for comparison
   * @returns Parsed enhancement with metadata
   */
  private parseEnhancementResponse(
    responseText: string,
    originalPrompt: string
  ): PromptEnhancement {
    // Clean up the response
    const enhancedPrompt = responseText.trim();
    
    // Identify added sections by looking for new ## headers
    const originalSections = this.extractSections(originalPrompt);
    const enhancedSections = this.extractSections(enhancedPrompt);
    
    // Find sections that are in enhanced but not in original
    const addedSections = enhancedSections.filter(
      section => !originalSections.includes(section)
    );
    
    // Generate improvements list
    const improvements: string[] = [];
    
    if (addedSections.some(s => s.toLowerCase().includes('accessibility'))) {
      improvements.push('Added comprehensive accessibility requirements (WCAG 2.1 AA)');
    }
    
    if (addedSections.some(s => s.toLowerCase().includes('performance'))) {
      improvements.push('Added performance optimization guidelines');
    }
    
    if (addedSections.some(s => s.toLowerCase().includes('seo'))) {
      improvements.push('Added SEO best practices');
    }
    
    if (addedSections.some(s => s.toLowerCase().includes('security'))) {
      improvements.push('Added security considerations');
    }
    
    if (addedSections.some(s => s.toLowerCase().includes('testing'))) {
      improvements.push('Added testing recommendations');
    }
    
    if (addedSections.some(s => s.toLowerCase().includes('code quality'))) {
      improvements.push('Added code quality standards');
    }
    
    return {
      originalPrompt,
      enhancedPrompt,
      improvements,
      addedSections,
    };
  }
  
  /**
   * Extracts section headers from a prompt
   * 
   * @param prompt - The prompt text
   * @returns Array of section titles
   */
  private extractSections(prompt: string): string[] {
    const sections: string[] = [];
    const lines = prompt.split('\n');
    
    for (const line of lines) {
      // Match markdown headers (## Section Name)
      const match = line.match(/^##\s+(.+)$/);
      if (match && match[1]) {
        sections.push(match[1].trim());
      }
    }
    
    return sections;
  }
  
  /**
   * Validates the structure and content of a suggestions response
   * 
   * @param data - The parsed JSON response
   * @throws GeminiError if validation fails
   */
  private validateSuggestionsResponse(data: unknown): asserts data is { suggestions: DesignSuggestion[] } {
    if (!data || typeof data !== 'object') {
      throw this.createError(
        'INVALID_RESPONSE' as GeminiErrorType,
        'Response is not a valid object',
        true
      );
    }
    
    const response = data as Record<string, unknown>;
    
    // Validate suggestions array exists
    if (!Array.isArray(response['suggestions'])) {
      throw this.createError(
        'INVALID_RESPONSE' as GeminiErrorType,
        'Response must contain a suggestions array',
        true
      );
    }
    
    const suggestions = response['suggestions'] as unknown[];
    
    // Validate each suggestion
    const validTypes = ['improvement', 'warning', 'tip'];
    const validSeverities = ['low', 'medium', 'high'];
    
    for (let i = 0; i < suggestions.length; i++) {
      const suggestion = suggestions[i];
      
      if (!suggestion || typeof suggestion !== 'object') {
        throw this.createError(
          'INVALID_RESPONSE' as GeminiErrorType,
          `Suggestion at index ${i} is not a valid object`,
          true
        );
      }
      
      const s = suggestion as Record<string, unknown>;
      
      // Validate type
      if (!s['type'] || !validTypes.includes(s['type'] as string)) {
        throw this.createError(
          'INVALID_RESPONSE' as GeminiErrorType,
          `Invalid suggestion type at index ${i}. Must be one of: ${validTypes.join(', ')}`,
          true
        );
      }
      
      // Validate severity
      if (!s['severity'] || !validSeverities.includes(s['severity'] as string)) {
        throw this.createError(
          'INVALID_RESPONSE' as GeminiErrorType,
          `Invalid severity at index ${i}. Must be one of: ${validSeverities.join(', ')}`,
          true
        );
      }
      
      // Validate required string fields
      if (!s['message'] || typeof s['message'] !== 'string') {
        throw this.createError(
          'INVALID_RESPONSE' as GeminiErrorType,
          `Missing or invalid message at index ${i}`,
          true
        );
      }
      
      if (!s['reasoning'] || typeof s['reasoning'] !== 'string') {
        throw this.createError(
          'INVALID_RESPONSE' as GeminiErrorType,
          `Missing or invalid reasoning at index ${i}`,
          true
        );
      }
      
      // Validate autoFixable boolean
      if (typeof s['autoFixable'] !== 'boolean') {
        throw this.createError(
          'INVALID_RESPONSE' as GeminiErrorType,
          `Invalid autoFixable value at index ${i}. Must be boolean`,
          true
        );
      }
    }
  }
  
  /**
   * Validates the structure and content of an analysis response
   * 
   * @param data - The parsed JSON response
   * @throws GeminiError if validation fails
   */
  private validateAnalysisResponse(data: unknown): asserts data is ProjectAnalysis {
    const validProjectTypes = [
      'Portfolio',
      'E-commerce',
      'Dashboard',
      'Web App',
      'Mobile App',
      'Website',
    ];
    
    if (!data || typeof data !== 'object') {
      throw this.createError(
        'INVALID_RESPONSE' as GeminiErrorType,
        'Response is not a valid object',
        true
      );
    }
    
    const response = data as Record<string, unknown>;
    
    // Validate projectType
    if (!response['projectType'] || !validProjectTypes.includes(response['projectType'] as string)) {
      throw this.createError(
        'INVALID_RESPONSE' as GeminiErrorType,
        `Invalid project type: ${response['projectType']}. Must be one of: ${validProjectTypes.join(', ')}`,
        true
      );
    }
    
    // Validate confidence score
    if (
      typeof response['confidence'] !== 'number' ||
      response['confidence'] < 0 ||
      response['confidence'] > 1
    ) {
      throw this.createError(
        'INVALID_RESPONSE' as GeminiErrorType,
        'Invalid confidence score. Must be a number between 0 and 1',
        true
      );
    }
    
    // Validate required string fields
    if (!response['designStyle'] || typeof response['designStyle'] !== 'string') {
      throw this.createError(
        'INVALID_RESPONSE' as GeminiErrorType,
        'Missing or invalid designStyle',
        true
      );
    }
    
    if (!response['colorTheme'] || typeof response['colorTheme'] !== 'string') {
      throw this.createError(
        'INVALID_RESPONSE' as GeminiErrorType,
        'Missing or invalid colorTheme',
        true
      );
    }
    
    if (!response['reasoning'] || typeof response['reasoning'] !== 'string') {
      throw this.createError(
        'INVALID_RESPONSE' as GeminiErrorType,
        'Missing or invalid reasoning',
        true
      );
    }
  }
  
  /**
   * Executes an async operation with a timeout
   * 
   * @param operation - The async operation to execute
   * @param timeout - Timeout in milliseconds
   * @returns The result of the operation
   * @throws Error if timeout is exceeded
   */
  private async callWithTimeout<T>(
    operation: () => Promise<T>,
    timeout: number
  ): Promise<T> {
    return Promise.race([
      operation(),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error('Request timeout exceeded')),
          timeout
        )
      ),
    ]);
  }
  
  /**
   * Executes an operation with exponential backoff retry logic
   * Implements exponential backoff (1s, 2s, 4s) with max 3 retries
   * Only retries on network errors and 429 rate limit errors
   * Logs all retry attempts for monitoring
   * 
   * @param operation - The async operation to execute
   * @param maxRetries - Maximum number of retry attempts (default: 3)
   * @returns The result of the operation
   * @throws The last error if all retries fail
   */
  private async callWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    let lastError: Error | undefined;
    const metricsService = getMetricsService();
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        // If this is a retry attempt, log it
        if (attempt > 0) {
          console.log(`[GeminiService] Retry attempt ${attempt}/${maxRetries}`);
          metricsService.logRetryAttempt({
            timestamp: Date.now(),
            attempt,
            maxRetries,
            error: lastError?.message || 'Unknown error',
          });
        }
        
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        // Check if we should retry this error
        const shouldRetry = this.shouldRetryError(lastError);
        
        // Log the error
        console.error(
          `[GeminiService] API call failed (attempt ${attempt + 1}/${maxRetries + 1}):`,
          lastError.message,
          `shouldRetry: ${shouldRetry}`
        );
        
        // Don't retry on certain error types
        if (!shouldRetry) {
          console.log('[GeminiService] Error is not retryable, failing immediately');
          throw error;
        }
        
        // If this was the last attempt, throw the error
        if (attempt === maxRetries) {
          console.error('[GeminiService] All retry attempts exhausted');
          metricsService.logRetryExhausted({
            timestamp: Date.now(),
            totalAttempts: maxRetries + 1,
            finalError: lastError.message,
          });
          throw error;
        }
        
        // Calculate exponential backoff delay: 1s, 2s, 4s
        const delay = Math.pow(2, attempt) * 1000;
        
        console.warn(
          `[GeminiService] Retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})...`
        );
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // This should never be reached, but TypeScript needs it
    throw lastError || new Error('All retry attempts failed');
  }
  
  /**
   * Determines if an error should be retried
   * Retries on network errors and 429 rate limit errors
   * Does NOT retry on 4xx errors (except 429) or timeout errors
   * 
   * @param error - The error to check
   * @returns True if the error should be retried
   */
  private shouldRetryError(error: Error): boolean {
    const message = error.message.toLowerCase();
    
    // Retry on network errors
    if (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('econnrefused') ||
      message.includes('enotfound') ||
      message.includes('etimedout') ||
      message.includes('connection')
    ) {
      return true;
    }
    
    // Retry on 429 rate limit errors (from API, not our client-side rate limiter)
    if (message.includes('429') || message.includes('rate limit')) {
      return true;
    }
    
    // Retry on 5xx server errors
    if (
      message.includes('500') ||
      message.includes('502') ||
      message.includes('503') ||
      message.includes('504') ||
      message.includes('internal server error') ||
      message.includes('bad gateway') ||
      message.includes('service unavailable') ||
      message.includes('gateway timeout')
    ) {
      return true;
    }
    
    // Don't retry on:
    // - Invalid API key (401, 403)
    // - Invalid request format (400)
    // - Timeout errors (already timed out, retry won't help immediately)
    // - Other 4xx errors
    if (
      message.includes('api key') ||
      message.includes('invalid') ||
      message.includes('bad request') ||
      message.includes('unauthorized') ||
      message.includes('forbidden') ||
      message.includes('timeout') ||
      message.includes('400') ||
      message.includes('401') ||
      message.includes('403') ||
      message.includes('404')
    ) {
      return false;
    }
    
    // Default: don't retry unknown errors
    return false;
  }
  
  /**
   * Handles errors and converts them to GeminiError instances
   * 
   * @param error - The error to handle
   * @returns A GeminiError instance
   */
  private handleError(error: unknown): GeminiError {
    // If already a GeminiError, return as-is
    if (this.isGeminiError(error)) {
      return error;
    }
    
    // Handle standard Error instances
    if (error instanceof Error) {
      // Timeout errors
      if (error.message.includes('timeout') || error.message.includes('Timeout')) {
        return this.createError(
          'TIMEOUT_ERROR' as GeminiErrorType,
          'Request timed out. The AI service took too long to respond.',
          true
        );
      }
      
      // API key errors
      if (error.message.includes('API key') || error.message.includes('API_KEY')) {
        return this.createError(
          'INVALID_API_KEY' as GeminiErrorType,
          'Invalid or missing API key',
          false
        );
      }
      
      // Network errors
      if (
        error.message.includes('network') ||
        error.message.includes('fetch') ||
        error.message.includes('ECONNREFUSED')
      ) {
        return this.createError(
          'NETWORK_ERROR' as GeminiErrorType,
          'Network error. Please check your internet connection.',
          true
        );
      }
      
      // JSON parsing errors
      if (error.message.includes('JSON') || error.message.includes('parse')) {
        return this.createError(
          'INVALID_RESPONSE' as GeminiErrorType,
          'Failed to parse AI response. The response format was invalid.',
          true
        );
      }
    }
    
    // Default to API error
    return this.createError(
      'API_ERROR' as GeminiErrorType,
      error instanceof Error ? error.message : 'Unknown error occurred',
      true
    );
  }
  
  /**
   * Creates a GeminiError instance
   * 
   * @param type - The error type
   * @param message - The error message
   * @param shouldFallback - Whether to activate fallback
   * @returns A GeminiError instance
   */
  private createError(
    type: GeminiErrorType,
    message: string,
    shouldFallback: boolean
  ): GeminiError {
    const error = new Error(message) as GeminiError;
    error.name = 'GeminiError';
    error.type = type;
    error.shouldFallback = shouldFallback;
    return error;
  }
  
  /**
   * Type guard to check if an error is a GeminiError
   * 
   * @param error - The error to check
   * @returns True if the error is a GeminiError
   */
  private isGeminiError(error: unknown): error is GeminiError {
    return (
      error instanceof Error &&
      'type' in error &&
      'shouldFallback' in error
    );
  }
  
  /**
   * Estimates token count for prompt and response
   * Uses rough approximation: 1 token ≈ 4 characters
   * 
   * @param prompt - The prompt text
   * @param response - The response text
   * @returns Estimated token count
   */
  private estimateTokens(prompt: string, response: string): number {
    const totalChars = prompt.length + response.length;
    return Math.ceil(totalChars / 4);
  }
}
