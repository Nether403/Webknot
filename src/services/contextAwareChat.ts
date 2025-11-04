/**
 * Context-Aware Chat Service
 * 
 * Enhanced chat service that uses context builder, question router,
 * and follow-up handler for intelligent conversations
 * 
 * Phase 3: Context-Aware Responses
 * Requirements: 6.2, 6.3, 6.5
 */

import type { BoltBuilderState } from '../types';
import type { ConversationMessage } from '../types/gemini';
import { buildContextSummary, buildDetailedContext, optimizeContext, extractPreviousSuggestions } from '../utils/contextBuilder';
import { routeQuestion, formatResponse } from '../utils/questionRouter';
import { maintainContinuity } from '../utils/followUpHandler';

/**
 * Builds an enhanced chat prompt with context awareness
 * 
 * @param message - The user's message
 * @param context - Current wizard state
 * @param history - Conversation history
 * @param currentStep - Current wizard step
 * @returns Enhanced prompt for AI
 */
export function buildEnhancedChatPrompt(
  message: string,
  context: BoltBuilderState,
  history: ConversationMessage[],
  currentStep: string
): string {
  // Step 1: Maintain conversation continuity (detect follow-ups)
  const enhancedMessage = maintainContinuity(message, history);
  
  // Step 2: Build detailed context
  const previousSuggestions = extractPreviousSuggestions(history);
  const detailedContext = buildDetailedContext(
    context,
    currentStep,
    previousSuggestions
  );
  
  // Step 3: Optimize context for token usage
  const optimizedContext = optimizeContext(detailedContext, 500);
  
  // Step 4: Route question to appropriate strategy
  const contextSummary = buildContextSummary(context, currentStep);
  const { questionType, strategy, prompt } = routeQuestion(
    enhancedMessage,
    context,
    contextSummary
  );
  
  console.log('[ContextAwareChat] Building enhanced prompt:', {
    questionType,
    includeContext: strategy.includeContext,
    contextTokens: optimizedContext.tokenCount,
    historyLength: history.length,
  });
  
  // Step 5: Build conversation history (last 6 messages)
  const recentHistory = history.slice(-6);
  const historyText = recentHistory.length > 0
    ? recentHistory.map(msg => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n')
    : 'No previous conversation';
  
  // Step 6: Combine all parts
  return `${prompt}

Conversation History:
${historyText}

Provide a helpful response following the guidelines above.`;
}

/**
 * Processes AI response with enhancements
 * Adds code examples and documentation links based on strategy
 * 
 * @param response - The AI's response
 * @param message - The original user message
 * @param context - Current wizard state
 * @returns Enhanced response
 */
export function processAIResponse(
  response: string,
  message: string,
  context: BoltBuilderState
): string {
  // Route question to get strategy
  const { strategy } = routeQuestion(message, context);
  
  // Format response with enhancements
  const enhancedResponse = formatResponse(response, strategy, message);
  
  console.log('[ContextAwareChat] Processed AI response:', {
    originalLength: response.length,
    enhancedLength: enhancedResponse.length,
    includeCodeExamples: strategy.includeCodeExamples,
    includeDocLinks: strategy.includeDocLinks,
  });
  
  return enhancedResponse;
}

/**
 * Validates that context is appropriate for the question
 * Prevents sending unnecessary context that wastes tokens
 * 
 * @param message - The user's message
 * @param context - Current wizard state
 * @returns True if context should be included
 */
export function shouldIncludeContextForQuestion(
  message: string,
  context: BoltBuilderState
): boolean {
  const lowerMessage = message.toLowerCase();
  
  // General questions that don't need project context
  const generalKeywords = [
    'what is',
    'how do i',
    'can you explain',
    'tell me about',
    'what are',
    'define',
    'meaning of',
  ];
  
  // Check if message starts with general question
  for (const keyword of generalKeywords) {
    if (lowerMessage.startsWith(keyword)) {
      return false;
    }
  }
  
  // Project-specific keywords that need context
  const projectKeywords = [
    'my project',
    'my design',
    'my selection',
    'this project',
    'current',
    'chosen',
    'selected',
    'my choices',
  ];
  
  // Check if message mentions project-specific terms
  for (const keyword of projectKeywords) {
    if (lowerMessage.includes(keyword)) {
      return true;
    }
  }
  
  // Check if user has made any selections (context is relevant)
  const hasSelections = 
    context.selectedDesignStyle !== null ||
    context.selectedColorTheme !== null ||
    context.selectedLayout !== null ||
    context.selectedBackground !== null ||
    context.selectedComponents.length > 0 ||
    context.selectedAnimations.length > 0;
  
  // If user has selections, include context by default
  return hasSelections;
}

/**
 * Estimates token usage for a chat interaction
 * Helps prevent exceeding token limits
 * 
 * @param message - The user's message
 * @param context - Current wizard state
 * @param history - Conversation history
 * @returns Estimated token count
 */
export function estimateChatTokens(
  message: string,
  context: BoltBuilderState,
  history: ConversationMessage[]
): number {
  // Rough estimation: 1 token ≈ 4 characters
  
  // Message tokens
  const messageTokens = Math.ceil(message.length / 4);
  
  // Context tokens (if included)
  const contextSummary = buildContextSummary(context, 'unknown');
  const contextTokens = Math.ceil(contextSummary.length / 4);
  
  // History tokens (last 6 messages)
  const recentHistory = history.slice(-6);
  const historyText = recentHistory.map(m => m.content).join(' ');
  const historyTokens = Math.ceil(historyText.length / 4);
  
  // System prompt tokens (approximately 100)
  const systemTokens = 100;
  
  const total = messageTokens + contextTokens + historyTokens + systemTokens;
  
  console.log('[ContextAwareChat] Token estimation:', {
    message: messageTokens,
    context: contextTokens,
    history: historyTokens,
    system: systemTokens,
    total,
  });
  
  return total;
}

/**
 * Checks if chat request is within token budget
 * 
 * @param message - The user's message
 * @param context - Current wizard state
 * @param history - Conversation history
 * @param maxTokens - Maximum allowed tokens (default: 1000)
 * @returns True if within budget
 */
export function isWithinTokenBudget(
  message: string,
  context: BoltBuilderState,
  history: ConversationMessage[],
  maxTokens: number = 1000
): boolean {
  const estimated = estimateChatTokens(message, context, history);
  return estimated <= maxTokens;
}

/**
 * Truncates conversation history to fit within token budget
 * 
 * @param history - Full conversation history
 * @param maxTokens - Maximum tokens for history
 * @returns Truncated history
 */
export function truncateHistoryForBudget(
  history: ConversationMessage[],
  maxTokens: number = 400
): ConversationMessage[] {
  let currentTokens = 0;
  const truncated: ConversationMessage[] = [];
  
  // Start from most recent and work backwards
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg) {
      const msgTokens = Math.ceil(msg.content.length / 4);
      
      if (currentTokens + msgTokens > maxTokens) {
        break;
      }
      
      truncated.unshift(msg);
      currentTokens += msgTokens;
    }
  }
  
  return truncated;
}
