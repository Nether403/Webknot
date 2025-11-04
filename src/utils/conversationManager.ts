/**
 * Conversation Manager
 * 
 * Manages conversation history for the AI chat interface
 * Handles persistence, summarization, and cleanup
 * 
 * Phase 3: Conversational AI Assistant
 * Requirements: 6.4, 6.5
 */

import type { ConversationMessage } from '../types/gemini';

const STORAGE_KEY = 'webknot-chat-history';
const MAX_MESSAGES = 20; // Store last 20 messages
const SUMMARIZE_THRESHOLD = 10; // Summarize after 10 exchanges (20 messages)

/**
 * Saves conversation history to localStorage
 * 
 * @param messages - Array of conversation messages
 */
export function saveConversationHistory(messages: ConversationMessage[]): void {
  try {
    // Keep only the most recent messages
    const recentMessages = messages.slice(-MAX_MESSAGES);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentMessages));
    
    console.log('[ConversationManager] Saved conversation history:', {
      totalMessages: messages.length,
      savedMessages: recentMessages.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[ConversationManager] Failed to save conversation history:', error);
    
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('[ConversationManager] Storage quota exceeded, clearing old history');
      clearConversationHistory();
    }
  }
}

/**
 * Loads conversation history from localStorage
 * 
 * @returns Array of conversation messages
 */
export function loadConversationHistory(): ConversationMessage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) {
      console.log('[ConversationManager] No conversation history found');
      return [];
    }
    
    const messages = JSON.parse(stored) as ConversationMessage[];
    
    console.log('[ConversationManager] Loaded conversation history:', {
      messageCount: messages.length,
      timestamp: new Date().toISOString(),
    });
    
    return messages;
  } catch (error) {
    console.error('[ConversationManager] Failed to load conversation history:', error);
    
    // Clear corrupted data
    clearConversationHistory();
    
    return [];
  }
}

/**
 * Clears conversation history from localStorage
 */
export function clearConversationHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    
    console.log('[ConversationManager] Cleared conversation history');
  } catch (error) {
    console.error('[ConversationManager] Failed to clear conversation history:', error);
  }
}

/**
 * Adds a message to conversation history
 * Automatically saves to localStorage
 * 
 * @param message - The message to add
 * @returns Updated conversation history
 */
export function addMessageToHistory(message: ConversationMessage): ConversationMessage[] {
  const history = loadConversationHistory();
  const updatedHistory = [...history, message];
  
  saveConversationHistory(updatedHistory);
  
  return updatedHistory;
}

/**
 * Checks if conversation history should be summarized
 * Returns true if history exceeds the summarization threshold
 * 
 * @param messages - Array of conversation messages
 * @returns True if summarization is needed
 */
export function shouldSummarizeHistory(messages: ConversationMessage[]): boolean {
  return messages.length >= SUMMARIZE_THRESHOLD;
}

/**
 * Creates a summary of old messages to reduce token usage
 * Keeps the most recent messages and summarizes older ones
 * 
 * @param messages - Array of conversation messages
 * @returns Summarized conversation history
 */
export function summarizeHistory(messages: ConversationMessage[]): ConversationMessage[] {
  if (messages.length <= SUMMARIZE_THRESHOLD) {
    return messages;
  }
  
  // Keep last 6 messages (3 exchanges)
  const recentMessages = messages.slice(-6);
  
  // Summarize older messages
  const oldMessages = messages.slice(0, -6);
  const summary = createSummary(oldMessages);
  
  // Create summary message
  const summaryMessage: ConversationMessage = {
    role: 'assistant',
    content: `[Previous conversation summary: ${summary}]`,
    timestamp: oldMessages[oldMessages.length - 1]?.timestamp || Date.now(),
  };
  
  console.log('[ConversationManager] Summarized conversation history:', {
    originalCount: messages.length,
    summarizedCount: recentMessages.length + 1,
    timestamp: new Date().toISOString(),
  });
  
  return [summaryMessage, ...recentMessages];
}

/**
 * Creates a text summary of conversation messages
 * 
 * @param messages - Array of conversation messages to summarize
 * @returns Summary text
 */
function createSummary(messages: ConversationMessage[]): string {
  if (messages.length === 0) {
    return 'No previous conversation';
  }
  
  // Extract key topics from user messages
  const userMessages = messages.filter(m => m.role === 'user');
  const topics = userMessages.map(m => {
    // Extract first few words as topic
    const words = m.content.split(' ').slice(0, 5).join(' ');
    return words.length < m.content.length ? `${words}...` : words;
  });
  
  // Create summary
  const uniqueTopics = [...new Set(topics)];
  const topicList = uniqueTopics.slice(0, 3).join(', ');
  
  return `User asked about: ${topicList}. ${messages.length} messages exchanged.`;
}

/**
 * Gets the most recent messages for API context
 * Returns last N messages to keep token usage manageable
 * 
 * @param messages - Full conversation history
 * @param count - Number of recent messages to return (default: 10)
 * @returns Recent messages
 */
export function getRecentMessages(
  messages: ConversationMessage[],
  count: number = 10
): ConversationMessage[] {
  return messages.slice(-count);
}

/**
 * Clears conversation history when wizard is reset
 * Should be called when user starts a new project
 */
export function clearHistoryOnReset(): void {
  console.log('[ConversationManager] Clearing conversation history on wizard reset');
  clearConversationHistory();
}

/**
 * Gets conversation statistics
 * 
 * @returns Statistics about the conversation
 */
export function getConversationStats(): {
  totalMessages: number;
  userMessages: number;
  assistantMessages: number;
  oldestTimestamp: number | null;
  newestTimestamp: number | null;
} {
  const messages = loadConversationHistory();
  
  return {
    totalMessages: messages.length,
    userMessages: messages.filter(m => m.role === 'user').length,
    assistantMessages: messages.filter(m => m.role === 'assistant').length,
    oldestTimestamp: messages[0]?.timestamp || null,
    newestTimestamp: messages[messages.length - 1]?.timestamp || null,
  };
}
