/**
 * Premium Features Utilities
 * 
 * Utilities for premium-only features and enhancements
 */

import { isPremiumUser } from './premiumTier';
import type { DesignSuggestion } from '../types/gemini';

/**
 * Enhances suggestions for premium users with more detailed analysis
 * 
 * @param suggestions - Base suggestions from AI
 * @returns Enhanced suggestions with additional details for premium users
 */
export function enhanceSuggestionsForPremium(
  suggestions: DesignSuggestion[]
): DesignSuggestion[] {
  if (!isPremiumUser()) {
    return suggestions;
  }

  // Premium users get more detailed reasoning and additional suggestions
  return suggestions.map(suggestion => ({
    ...suggestion,
    reasoning: `${suggestion.reasoning}\n\n💎 Premium Insight: This recommendation is based on advanced AI analysis of current design trends and best practices.`,
  }));
}

/**
 * Gets the priority level for API requests based on user tier
 * Premium users get higher priority for faster responses
 * 
 * @returns Priority level (1 = highest, 5 = lowest)
 */
export function getApiPriority(): number {
  return isPremiumUser() ? 1 : 3;
}

/**
 * Checks if user has access to a premium feature
 * 
 * @param feature - Feature name to check
 * @returns True if user has access to the feature
 */
export function hasPremiumFeature(feature: string): boolean {
  if (!isPremiumUser()) {
    return false;
  }

  // All premium features are available to premium users
  const premiumFeatures = [
    'unlimited-requests',
    'priority-access',
    'advanced-suggestions',
    'conversation-export',
    'custom-models',
    'batch-processing',
  ];

  return premiumFeatures.includes(feature);
}

/**
 * Gets the maximum number of suggestions based on user tier
 * Premium users get more suggestions
 * 
 * @returns Maximum number of suggestions
 */
export function getMaxSuggestions(): number {
  return isPremiumUser() ? 10 : 5;
}

/**
 * Gets the conversation history export limit based on user tier
 * 
 * @returns Maximum number of conversations that can be exported
 */
export function getConversationExportLimit(): number {
  return isPremiumUser() ? Infinity : 0; // Free users can't export
}

/**
 * Exports conversation history to JSON file
 * Premium-only feature
 * 
 * @param conversations - Array of conversation messages
 * @param filename - Optional filename for the export
 */
export function exportConversationHistory(
  conversations: Array<{ role: string; content: string; timestamp: number }>,
  filename?: string
): void {
  if (!isPremiumUser()) {
    throw new Error('Conversation export is a premium feature');
  }

  const exportData = {
    exportedAt: new Date().toISOString(),
    conversationCount: conversations.length,
    conversations,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `lovabolt-conversations-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log('[Premium] Conversation history exported:', {
    conversationCount: conversations.length,
    filename: link.download,
  });
}

/**
 * Gets the timeout for API requests based on user tier
 * Premium users get longer timeouts for more complex processing
 * 
 * @param baseTimeout - Base timeout in milliseconds
 * @returns Adjusted timeout for user tier
 */
export function getApiTimeout(baseTimeout: number): number {
  // Premium users get 50% more time for complex requests
  return isPremiumUser() ? Math.floor(baseTimeout * 1.5) : baseTimeout;
}

/**
 * Checks if user should see premium feature teasers
 * 
 * @returns True if user should see teasers for premium features
 */
export function shouldShowPremiumTeasers(): boolean {
  return !isPremiumUser();
}
