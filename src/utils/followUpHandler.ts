/**
 * Follow-Up Handler
 * 
 * Detects and handles follow-up questions in conversation
 * Maintains topic continuity and references previous context
 * 
 * Phase 3: Context-Aware Responses
 * Requirements: 6.5
 */

import type { ConversationMessage } from '../types/gemini';

/**
 * Follow-up detection result
 */
export interface FollowUpDetection {
  isFollowUp: boolean;
  referencedMessageIndex: number | null;
  followUpType: 'clarification' | 'elaboration' | 'related' | 'new_topic';
  confidence: number; // 0.0 to 1.0
}

/**
 * Topic information for continuity tracking
 */
export interface TopicInfo {
  keywords: string[];
  lastMentioned: number; // timestamp
  messageCount: number;
}

/**
 * Detects if a message is a follow-up question
 * 
 * @param message - The current user message
 * @param history - Conversation history
 * @returns Follow-up detection result
 */
export function detectFollowUp(
  message: string,
  history: ConversationMessage[]
): FollowUpDetection {
  if (history.length === 0) {
    return {
      isFollowUp: false,
      referencedMessageIndex: null,
      followUpType: 'new_topic',
      confidence: 1.0,
    };
  }
  
  const lowerMessage = message.toLowerCase();
  
  // Check for explicit follow-up indicators
  const clarificationIndicators = [
    'what do you mean',
    'can you explain',
    'i don\'t understand',
    'clarify',
    'what about',
    'how about',
    'what if',
  ];
  
  const elaborationIndicators = [
    'tell me more',
    'more details',
    'elaborate',
    'expand on',
    'go deeper',
    'more about',
  ];
  
  const relatedIndicators = [
    'also',
    'additionally',
    'another question',
    'related to',
    'speaking of',
    'on that note',
  ];
  
  // Check for clarification
  for (const indicator of clarificationIndicators) {
    if (lowerMessage.includes(indicator)) {
      return {
        isFollowUp: true,
        referencedMessageIndex: history.length - 1,
        followUpType: 'clarification',
        confidence: 0.9,
      };
    }
  }
  
  // Check for elaboration
  for (const indicator of elaborationIndicators) {
    if (lowerMessage.includes(indicator)) {
      return {
        isFollowUp: true,
        referencedMessageIndex: history.length - 1,
        followUpType: 'elaboration',
        confidence: 0.9,
      };
    }
  }
  
  // Check for related questions
  for (const indicator of relatedIndicators) {
    if (lowerMessage.includes(indicator)) {
      return {
        isFollowUp: true,
        referencedMessageIndex: history.length - 1,
        followUpType: 'related',
        confidence: 0.8,
      };
    }
  }
  
  // Check for pronoun references (it, that, this, they, them)
  const pronouns = ['it', 'that', 'this', 'they', 'them', 'those', 'these'];
  const hasPronoun = pronouns.some(pronoun => {
    const regex = new RegExp(`\\b${pronoun}\\b`, 'i');
    return regex.test(message);
  });
  
  if (hasPronoun) {
    return {
      isFollowUp: true,
      referencedMessageIndex: history.length - 1,
      followUpType: 'clarification',
      confidence: 0.7,
    };
  }
  
  // Check for topic continuity by comparing keywords
  const recentMessages = history.slice(-3);
  const topicContinuity = checkTopicContinuity(message, recentMessages);
  
  if (topicContinuity.score > 0.5) {
    return {
      isFollowUp: true,
      referencedMessageIndex: topicContinuity.mostRelevantIndex,
      followUpType: 'related',
      confidence: topicContinuity.score,
    };
  }
  
  // Default: new topic
  return {
    isFollowUp: false,
    referencedMessageIndex: null,
    followUpType: 'new_topic',
    confidence: 0.8,
  };
}

/**
 * Checks topic continuity between current message and history
 * 
 * @param message - The current message
 * @param recentMessages - Recent conversation messages
 * @returns Topic continuity score and most relevant message index
 */
function checkTopicContinuity(
  message: string,
  recentMessages: ConversationMessage[]
): { score: number; mostRelevantIndex: number } {
  if (recentMessages.length === 0) {
    return { score: 0, mostRelevantIndex: -1 };
  }
  
  // Extract keywords from current message
  const currentKeywords = extractKeywords(message);
  
  let maxScore = 0;
  let mostRelevantIndex = -1;
  
  // Compare with each recent message
  recentMessages.forEach((msg, index) => {
    const msgKeywords = extractKeywords(msg.content);
    const overlap = calculateKeywordOverlap(currentKeywords, msgKeywords);
    
    if (overlap > maxScore) {
      maxScore = overlap;
      mostRelevantIndex = index;
    }
  });
  
  return { score: maxScore, mostRelevantIndex };
}

/**
 * Extracts keywords from a message
 * Filters out common stop words
 * 
 * @param message - The message text
 * @returns Array of keywords
 */
function extractKeywords(message: string): string[] {
  // Common stop words to filter out
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'i', 'you', 'my', 'your', 'can',
    'could', 'should', 'would', 'do', 'does', 'did', 'have', 'had',
  ]);
  
  // Extract words (alphanumeric sequences)
  const words = message.toLowerCase().match(/\b\w+\b/g) || [];
  
  // Filter out stop words and short words
  return words.filter(word => !stopWords.has(word) && word.length > 2);
}

/**
 * Calculates keyword overlap between two sets of keywords
 * 
 * @param keywords1 - First set of keywords
 * @param keywords2 - Second set of keywords
 * @returns Overlap score (0.0 to 1.0)
 */
function calculateKeywordOverlap(keywords1: string[], keywords2: string[]): number {
  if (keywords1.length === 0 || keywords2.length === 0) {
    return 0;
  }
  
  const set1 = new Set(keywords1);
  const set2 = new Set(keywords2);
  
  // Count overlapping keywords
  let overlap = 0;
  set1.forEach(keyword => {
    if (set2.has(keyword)) {
      overlap++;
    }
  });
  
  // Calculate Jaccard similarity
  const union = new Set([...set1, ...set2]);
  return overlap / union.size;
}

/**
 * Builds a follow-up aware prompt
 * Includes reference to previous conversation
 * 
 * @param message - The current user message
 * @param detection - Follow-up detection result
 * @param history - Conversation history
 * @returns Enhanced prompt with follow-up context
 */
export function buildFollowUpPrompt(
  message: string,
  detection: FollowUpDetection,
  history: ConversationMessage[]
): string {
  const parts: string[] = [];
  
  if (!detection.isFollowUp) {
    // New topic - no special handling needed
    return message;
  }
  
  // Add follow-up context
  parts.push('[This is a follow-up question]');
  
  // Include referenced message if available
  if (
    detection.referencedMessageIndex !== null &&
    detection.referencedMessageIndex >= 0 &&
    detection.referencedMessageIndex < history.length
  ) {
    const referencedMsg = history[detection.referencedMessageIndex];
    
    if (referencedMsg) {
      // Include last exchange (user question + assistant response)
      const userMsg = referencedMsg.role === 'user' 
        ? referencedMsg 
        : history[detection.referencedMessageIndex - 1];
      
      const assistantMsg = referencedMsg.role === 'assistant'
        ? referencedMsg
        : history[detection.referencedMessageIndex + 1];
      
      if (userMsg && assistantMsg) {
        parts.push('\nPrevious Exchange:');
        parts.push(`User: ${userMsg.content}`);
        parts.push(`Assistant: ${assistantMsg.content}`);
      }
    }
  }
  
  // Add follow-up type context
  switch (detection.followUpType) {
    case 'clarification':
      parts.push('\n[User is asking for clarification on the previous response]');
      break;
    case 'elaboration':
      parts.push('\n[User wants more details about the previous topic]');
      break;
    case 'related':
      parts.push('\n[User is asking a related question]');
      break;
  }
  
  // Add current question
  parts.push(`\nCurrent Question: ${message}`);
  
  return parts.join('\n');
}

/**
 * Detects topic switches in conversation
 * Helps maintain context when user changes subject
 * 
 * @param message - The current message
 * @param history - Conversation history
 * @returns True if topic switch detected
 */
export function detectTopicSwitch(
  message: string,
  history: ConversationMessage[]
): boolean {
  if (history.length < 2) {
    return false;
  }
  
  // Topic switch indicators
  const switchIndicators = [
    'by the way',
    'anyway',
    'moving on',
    'different question',
    'new question',
    'change of topic',
    'switching gears',
    'on another note',
  ];
  
  const lowerMessage = message.toLowerCase();
  
  for (const indicator of switchIndicators) {
    if (lowerMessage.includes(indicator)) {
      return true;
    }
  }
  
  // Check for low topic continuity
  const recentMessages = history.slice(-3);
  const continuity = checkTopicContinuity(message, recentMessages);
  
  // If continuity is very low, it's likely a topic switch
  return continuity.score < 0.2;
}

/**
 * Handles topic switches gracefully
 * Acknowledges the switch and resets context
 * 
 * @param message - The current message
 * @returns Enhanced message with topic switch acknowledgment
 */
export function handleTopicSwitch(message: string): string {
  return `[User is switching to a new topic]\n\nNew Question: ${message}`;
}

/**
 * Tracks conversation topics over time
 * Maintains a history of discussed topics
 */
export class TopicTracker {
  private topics: Map<string, TopicInfo>;
  
  constructor() {
    this.topics = new Map();
  }
  
  /**
   * Updates topic tracking with a new message
   * 
   * @param message - The message to analyze
   */
  updateTopics(message: string): void {
    const keywords = extractKeywords(message);
    const timestamp = Date.now();
    
    keywords.forEach(keyword => {
      const existing = this.topics.get(keyword);
      
      if (existing) {
        existing.lastMentioned = timestamp;
        existing.messageCount++;
      } else {
        this.topics.set(keyword, {
          keywords: [keyword],
          lastMentioned: timestamp,
          messageCount: 1,
        });
      }
    });
    
    // Clean up old topics (not mentioned in last 5 minutes)
    const fiveMinutesAgo = timestamp - 5 * 60 * 1000;
    
    for (const [keyword, info] of this.topics.entries()) {
      if (info.lastMentioned < fiveMinutesAgo) {
        this.topics.delete(keyword);
      }
    }
  }
  
  /**
   * Gets the most discussed topics
   * 
   * @param limit - Maximum number of topics to return
   * @returns Array of top topics
   */
  getTopTopics(limit: number = 5): string[] {
    const sorted = Array.from(this.topics.entries())
      .sort((a, b) => b[1].messageCount - a[1].messageCount)
      .slice(0, limit);
    
    return sorted.map(([keyword]) => keyword);
  }
  
  /**
   * Checks if a keyword is currently being discussed
   * 
   * @param keyword - The keyword to check
   * @returns True if keyword is in recent topics
   */
  isActiveTopic(keyword: string): boolean {
    return this.topics.has(keyword.toLowerCase());
  }
  
  /**
   * Clears all tracked topics
   */
  clear(): void {
    this.topics.clear();
  }
}

/**
 * Maintains conversation continuity across messages
 * Main entry point for follow-up handling
 * 
 * @param message - The current user message
 * @param history - Conversation history
 * @returns Enhanced message with follow-up context
 */
export function maintainContinuity(
  message: string,
  history: ConversationMessage[]
): string {
  // Detect if this is a follow-up
  const detection = detectFollowUp(message, history);
  
  console.log('[FollowUpHandler] Continuity analysis:', {
    isFollowUp: detection.isFollowUp,
    followUpType: detection.followUpType,
    confidence: detection.confidence,
  });
  
  // Check for topic switch
  if (detectTopicSwitch(message, history)) {
    console.log('[FollowUpHandler] Topic switch detected');
    return handleTopicSwitch(message);
  }
  
  // Build follow-up aware prompt
  if (detection.isFollowUp) {
    return buildFollowUpPrompt(message, detection, history);
  }
  
  // No special handling needed
  return message;
}

/**
 * Gets conversation context summary for follow-ups
 * Provides a brief summary of recent conversation
 * 
 * @param history - Conversation history
 * @param maxMessages - Maximum messages to include (default: 3)
 * @returns Context summary string
 */
export function getConversationContext(
  history: ConversationMessage[],
  maxMessages: number = 3
): string {
  if (history.length === 0) {
    return 'No previous conversation';
  }
  
  const recentMessages = history.slice(-maxMessages * 2); // Get last N exchanges
  
  const exchanges: string[] = [];
  
  for (let i = 0; i < recentMessages.length; i += 2) {
    const userMsg = recentMessages[i];
    const assistantMsg = recentMessages[i + 1];
    
    if (userMsg && assistantMsg) {
      // Truncate long messages
      const userText = userMsg.content.length > 50
        ? userMsg.content.substring(0, 50) + '...'
        : userMsg.content;
      
      const assistantText = assistantMsg.content.length > 50
        ? assistantMsg.content.substring(0, 50) + '...'
        : assistantMsg.content;
      
      exchanges.push(`Q: ${userText}\nA: ${assistantText}`);
    }
  }
  
  return exchanges.join('\n\n');
}
