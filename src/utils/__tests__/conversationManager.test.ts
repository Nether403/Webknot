/**
 * Conversation Manager Tests
 * 
 * Tests for conversation history management, persistence, and summarization
 * 
 * Phase 3: Conversational AI Assistant
 * Requirements: 6.4, 6.5
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  saveConversationHistory,
  loadConversationHistory,
  clearConversationHistory,
  addMessageToHistory,
  shouldSummarizeHistory,
  summarizeHistory,
  getRecentMessages,
  clearHistoryOnReset,
  getConversationStats,
} from '../conversationManager';
import type { ConversationMessage } from '../../types/gemini';

describe('Conversation Manager', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  describe('saveConversationHistory (Requirement 6.4)', () => {
    it('should save conversation history to localStorage', () => {
      const messages: ConversationMessage[] = [
        { role: 'user', content: 'Hello', timestamp: Date.now() },
        { role: 'assistant', content: 'Hi there!', timestamp: Date.now() },
      ];

      saveConversationHistory(messages);

      const stored = localStorage.getItem('webknot-chat-history');
      expect(stored).toBeDefined();
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(2);
      expect(parsed[0].content).toBe('Hello');
    });

    it('should limit stored messages to last 20', () => {
      const messages: ConversationMessage[] = Array.from({ length: 30 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i}`,
        timestamp: Date.now() + i,
      }));

      saveConversationHistory(messages);

      const stored = localStorage.getItem('webknot-chat-history');
      const parsed = JSON.parse(stored!);

      expect(parsed).toHaveLength(20);
      // Should keep the most recent messages (10-29)
      expect(parsed[0].content).toBe('Message 10');
      expect(parsed[19].content).toBe('Message 29');
    });

    it('should handle empty message array', () => {
      saveConversationHistory([]);

      const stored = localStorage.getItem('webknot-chat-history');
      const parsed = JSON.parse(stored!);

      expect(parsed).toEqual([]);
    });

    it('should handle storage quota exceeded gracefully', () => {
      // Create a very large message array to exceed quota
      const largeMessages: ConversationMessage[] = Array.from({ length: 1000 }, (_, i) => ({
        role: 'user',
        content: 'x'.repeat(10000), // Large content
        timestamp: Date.now() + i,
      }));

      // Should not throw error
      expect(() => saveConversationHistory(largeMessages)).not.toThrow();
    });
  });

  describe('loadConversationHistory (Requirement 6.4)', () => {
    it('should load conversation history from localStorage', () => {
      const messages: ConversationMessage[] = [
        { role: 'user', content: 'Test message', timestamp: Date.now() },
      ];

      localStorage.setItem('webknot-chat-history', JSON.stringify(messages));

      const loaded = loadConversationHistory();

      expect(loaded).toHaveLength(1);
      expect(loaded[0].content).toBe('Test message');
    });

    it('should return empty array when no history exists', () => {
      const loaded = loadConversationHistory();

      expect(loaded).toEqual([]);
    });

    it('should handle corrupted data gracefully', () => {
      localStorage.setItem('webknot-chat-history', 'invalid json');

      const loaded = loadConversationHistory();

      expect(loaded).toEqual([]);
      // Should also clear the corrupted data
      expect(localStorage.getItem('webknot-chat-history')).toBeNull();
    });
  });

  describe('clearConversationHistory (Requirement 6.4)', () => {
    it('should clear conversation history from localStorage', () => {
      const messages: ConversationMessage[] = [
        { role: 'user', content: 'Test', timestamp: Date.now() },
      ];

      saveConversationHistory(messages);
      expect(localStorage.getItem('webknot-chat-history')).not.toBeNull();

      clearConversationHistory();

      expect(localStorage.getItem('webknot-chat-history')).toBeNull();
    });

    it('should not throw error if no history exists', () => {
      expect(() => clearConversationHistory()).not.toThrow();
    });
  });

  describe('addMessageToHistory (Requirement 6.5)', () => {
    it('should add message to existing history', () => {
      const existingMessages: ConversationMessage[] = [
        { role: 'user', content: 'First', timestamp: Date.now() - 1000 },
      ];

      saveConversationHistory(existingMessages);

      const newMessage: ConversationMessage = {
        role: 'assistant',
        content: 'Second',
        timestamp: Date.now(),
      };

      const updated = addMessageToHistory(newMessage);

      expect(updated).toHaveLength(2);
      expect(updated[0].content).toBe('First');
      expect(updated[1].content).toBe('Second');
    });

    it('should create new history if none exists', () => {
      const message: ConversationMessage = {
        role: 'user',
        content: 'First message',
        timestamp: Date.now(),
      };

      const updated = addMessageToHistory(message);

      expect(updated).toHaveLength(1);
      expect(updated[0].content).toBe('First message');
    });

    it('should persist added message to localStorage', () => {
      const message: ConversationMessage = {
        role: 'user',
        content: 'Persisted',
        timestamp: Date.now(),
      };

      addMessageToHistory(message);

      const loaded = loadConversationHistory();
      expect(loaded).toHaveLength(1);
      expect(loaded[0].content).toBe('Persisted');
    });
  });

  describe('shouldSummarizeHistory (Requirement 6.4)', () => {
    it('should return false for short history', () => {
      const messages: ConversationMessage[] = Array.from({ length: 5 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i}`,
        timestamp: Date.now() + i,
      }));

      expect(shouldSummarizeHistory(messages)).toBe(false);
    });

    it('should return true when history reaches threshold', () => {
      const messages: ConversationMessage[] = Array.from({ length: 10 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i}`,
        timestamp: Date.now() + i,
      }));

      expect(shouldSummarizeHistory(messages)).toBe(true);
    });

    it('should return true for history exceeding threshold', () => {
      const messages: ConversationMessage[] = Array.from({ length: 15 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i}`,
        timestamp: Date.now() + i,
      }));

      expect(shouldSummarizeHistory(messages)).toBe(true);
    });
  });

  describe('summarizeHistory (Requirement 6.4)', () => {
    it('should keep recent messages and summarize old ones', () => {
      const messages: ConversationMessage[] = Array.from({ length: 12 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i}`,
        timestamp: Date.now() + i,
      }));

      const summarized = summarizeHistory(messages);

      // Should have 7 messages: 1 summary + 6 recent
      expect(summarized).toHaveLength(7);
      
      // First message should be summary
      expect(summarized[0].content).toContain('Previous conversation summary');
      
      // Last 6 messages should be preserved
      expect(summarized[6].content).toBe('Message 11');
    });

    it('should not summarize if below threshold', () => {
      const messages: ConversationMessage[] = Array.from({ length: 8 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i}`,
        timestamp: Date.now() + i,
      }));

      const summarized = summarizeHistory(messages);

      // Should return original messages unchanged
      expect(summarized).toEqual(messages);
    });

    it('should create meaningful summary', () => {
      const messages: ConversationMessage[] = [
        { role: 'user', content: 'What is React?', timestamp: Date.now() },
        { role: 'assistant', content: 'React is a library', timestamp: Date.now() + 1 },
        { role: 'user', content: 'How do I use hooks?', timestamp: Date.now() + 2 },
        { role: 'assistant', content: 'Hooks are functions', timestamp: Date.now() + 3 },
        { role: 'user', content: 'Tell me about useState', timestamp: Date.now() + 4 },
        { role: 'assistant', content: 'useState manages state', timestamp: Date.now() + 5 },
        { role: 'user', content: 'What about useEffect?', timestamp: Date.now() + 6 },
        { role: 'assistant', content: 'useEffect handles side effects', timestamp: Date.now() + 7 },
        { role: 'user', content: 'Can you explain more?', timestamp: Date.now() + 8 },
        { role: 'assistant', content: 'Sure, let me explain', timestamp: Date.now() + 9 },
        { role: 'user', content: 'Recent question 1', timestamp: Date.now() + 10 },
        { role: 'assistant', content: 'Recent answer 1', timestamp: Date.now() + 11 },
      ];

      const summarized = summarizeHistory(messages);

      const summary = summarized[0].content;
      expect(summary).toContain('User asked about');
      expect(summary).toContain('messages exchanged');
    });
  });

  describe('getRecentMessages (Requirement 6.5)', () => {
    it('should return last N messages', () => {
      const messages: ConversationMessage[] = Array.from({ length: 20 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i}`,
        timestamp: Date.now() + i,
      }));

      const recent = getRecentMessages(messages, 5);

      expect(recent).toHaveLength(5);
      expect(recent[0].content).toBe('Message 15');
      expect(recent[4].content).toBe('Message 19');
    });

    it('should return all messages if count exceeds length', () => {
      const messages: ConversationMessage[] = Array.from({ length: 5 }, (_, i) => ({
        role: 'user',
        content: `Message ${i}`,
        timestamp: Date.now() + i,
      }));

      const recent = getRecentMessages(messages, 10);

      expect(recent).toHaveLength(5);
      expect(recent).toEqual(messages);
    });

    it('should use default count of 10', () => {
      const messages: ConversationMessage[] = Array.from({ length: 15 }, (_, i) => ({
        role: 'user',
        content: `Message ${i}`,
        timestamp: Date.now() + i,
      }));

      const recent = getRecentMessages(messages);

      expect(recent).toHaveLength(10);
      expect(recent[0].content).toBe('Message 5');
    });
  });

  describe('clearHistoryOnReset (Requirement 6.5)', () => {
    it('should clear history when wizard is reset', () => {
      const messages: ConversationMessage[] = [
        { role: 'user', content: 'Test', timestamp: Date.now() },
      ];

      saveConversationHistory(messages);
      expect(loadConversationHistory()).toHaveLength(1);

      clearHistoryOnReset();

      expect(loadConversationHistory()).toEqual([]);
    });
  });

  describe('getConversationStats (Requirement 6.5)', () => {
    it('should return correct statistics', () => {
      const messages: ConversationMessage[] = [
        { role: 'user', content: 'Q1', timestamp: 1000 },
        { role: 'assistant', content: 'A1', timestamp: 2000 },
        { role: 'user', content: 'Q2', timestamp: 3000 },
        { role: 'assistant', content: 'A2', timestamp: 4000 },
        { role: 'user', content: 'Q3', timestamp: 5000 },
      ];

      saveConversationHistory(messages);

      const stats = getConversationStats();

      expect(stats.totalMessages).toBe(5);
      expect(stats.userMessages).toBe(3);
      expect(stats.assistantMessages).toBe(2);
      expect(stats.oldestTimestamp).toBe(1000);
      expect(stats.newestTimestamp).toBe(5000);
    });

    it('should return zeros for empty history', () => {
      const stats = getConversationStats();

      expect(stats.totalMessages).toBe(0);
      expect(stats.userMessages).toBe(0);
      expect(stats.assistantMessages).toBe(0);
      expect(stats.oldestTimestamp).toBeNull();
      expect(stats.newestTimestamp).toBeNull();
    });
  });

  describe('Integration: Complete Conversation Flow (Requirement 6.5)', () => {
    it('should handle complete conversation lifecycle', () => {
      // Start conversation
      const msg1: ConversationMessage = {
        role: 'user',
        content: 'Hello',
        timestamp: Date.now(),
      };
      addMessageToHistory(msg1);

      // Add response
      const msg2: ConversationMessage = {
        role: 'assistant',
        content: 'Hi!',
        timestamp: Date.now() + 1000,
      };
      addMessageToHistory(msg2);

      // Check stats
      let stats = getConversationStats();
      expect(stats.totalMessages).toBe(2);

      // Continue conversation
      for (let i = 0; i < 10; i++) {
        addMessageToHistory({
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: `Message ${i}`,
          timestamp: Date.now() + 2000 + i * 1000,
        });
      }

      // Check if should summarize
      const history = loadConversationHistory();
      expect(shouldSummarizeHistory(history)).toBe(true);

      // Summarize
      const summarized = summarizeHistory(history);
      expect(summarized.length).toBeLessThan(history.length);

      // Save summarized history
      saveConversationHistory(summarized);

      // Verify persistence
      const loaded = loadConversationHistory();
      expect(loaded[0].content).toContain('Previous conversation summary');

      // Clear on reset
      clearHistoryOnReset();
      expect(loadConversationHistory()).toEqual([]);
    });
  });
});
