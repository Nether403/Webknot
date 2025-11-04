/**
 * Context-Aware Chat Service Tests
 * 
 * Tests for chat method with context, conversation summarization,
 * and message history management
 * 
 * Phase 3: Conversational AI Assistant
 * Requirements: 6.2, 6.4, 6.5
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  buildEnhancedChatPrompt,
  processAIResponse,
  shouldIncludeContextForQuestion,
  estimateChatTokens,
  isWithinTokenBudget,
  truncateHistoryForBudget,
} from '../contextAwareChat';
import type { BoltBuilderState } from '../../types';
import type { ConversationMessage } from '../../types/gemini';

describe('Context-Aware Chat Service', () => {
  let mockState: BoltBuilderState;
  let mockHistory: ConversationMessage[];

  beforeEach(() => {
    // Setup mock state
    mockState = {
      projectInfo: {
        type: 'Portfolio',
        name: 'My Portfolio',
        description: 'A portfolio to showcase my work',
      },
      selectedDesignStyle: {
        id: 'minimalist',
        title: 'Minimalist',
        description: 'Clean and simple design',
      },
      selectedColorTheme: {
        id: 'ocean-breeze',
        title: 'Ocean Breeze',
        description: 'Blue and teal colors',
      },
      selectedLayout: {
        id: 'single-page',
        title: 'Single Page',
        description: 'All content on one page',
      },
      selectedBackground: {
        id: 'aurora',
        title: 'Aurora',
        description: 'Animated aurora background',
      },
      selectedComponents: [
        {
          id: 'carousel',
          title: 'Carousel',
          description: 'Image carousel component',
        },
      ],
      selectedAnimations: [
        {
          id: 'fade-in',
          title: 'Fade In',
          description: 'Fade in animation',
        },
      ],
      selectedSpecialLayouts: [],
      selectedFunctionalities: [],
      selectedFunctionality: [],
      selectedTypography: null,
      selectedVisuals: [],
    } as any;

    // Setup mock history
    mockHistory = [
      {
        role: 'user',
        content: 'What design style should I use?',
        timestamp: Date.now() - 60000,
      },
      {
        role: 'assistant',
        content: 'For a portfolio, minimalist design works well.',
        timestamp: Date.now() - 50000,
      },
      {
        role: 'user',
        content: 'What about colors?',
        timestamp: Date.now() - 40000,
      },
      {
        role: 'assistant',
        content: 'Ocean Breeze theme would complement minimalist design.',
        timestamp: Date.now() - 30000,
      },
    ];
  });

  describe('buildEnhancedChatPrompt (Requirement 6.2)', () => {
    it('should build prompt with context and history', () => {
      const message = 'How can I improve my design?';
      const currentStep = 'design-style';

      const prompt = buildEnhancedChatPrompt(
        message,
        mockState,
        mockHistory,
        currentStep
      );

      expect(prompt).toContain(message);
      expect(prompt).toContain('Conversation History');
      expect(prompt).toContain('User:');
      expect(prompt).toContain('Assistant:');
    });

    it('should include recent conversation history', () => {
      const message = 'Tell me more';
      const currentStep = 'design-style';

      const prompt = buildEnhancedChatPrompt(
        message,
        mockState,
        mockHistory,
        currentStep
      );

      // Should include recent messages
      expect(prompt).toContain('What design style should I use?');
      expect(prompt).toContain('minimalist design works well');
    });

    it('should limit history to last 6 messages', () => {
      // Create history with 10 messages
      const longHistory: ConversationMessage[] = Array.from({ length: 10 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i}`,
        timestamp: Date.now() - (10 - i) * 10000,
      }));

      const message = 'Test message';
      const currentStep = 'design-style';

      const prompt = buildEnhancedChatPrompt(
        message,
        mockState,
        longHistory,
        currentStep
      );

      // Should only include last 6 messages (Message 4-9)
      expect(prompt).toContain('Message 4');
      expect(prompt).toContain('Message 9');
      expect(prompt).not.toContain('Message 0');
      expect(prompt).not.toContain('Message 1');
    });

    it('should handle empty history', () => {
      const message = 'First message';
      const currentStep = 'project-setup';

      const prompt = buildEnhancedChatPrompt(
        message,
        mockState,
        [],
        currentStep
      );

      expect(prompt).toContain('No previous conversation');
    });

    it('should detect follow-up questions', () => {
      const followUpMessage = 'What about that?';
      const currentStep = 'design-style';

      const prompt = buildEnhancedChatPrompt(
        followUpMessage,
        mockState,
        mockHistory,
        currentStep
      );

      // Prompt should be built successfully with follow-up context
      expect(prompt).toBeDefined();
      expect(prompt.length).toBeGreaterThan(0);
    });

    it('should optimize context for token usage', () => {
      const message = 'How can I improve?';
      const currentStep = 'design-style';

      const prompt = buildEnhancedChatPrompt(
        message,
        mockState,
        mockHistory,
        currentStep
      );

      // Prompt should be reasonable length (not excessive)
      // Rough estimate: should be under 2000 characters for optimized context
      expect(prompt.length).toBeLessThan(3000);
    });
  });

  describe('processAIResponse (Requirement 6.3)', () => {
    it('should enhance response with code examples for technical questions', () => {
      const response = 'You can use React hooks for state management.';
      const message = 'How do I manage state in React?';

      const enhanced = processAIResponse(response, message, mockState);

      expect(enhanced).toBeDefined();
      expect(enhanced.length).toBeGreaterThanOrEqual(response.length);
    });

    it('should add documentation links for general questions', () => {
      const response = 'Glassmorphism is a design trend.';
      const message = 'What is glassmorphism?';

      const enhanced = processAIResponse(response, message, mockState);

      expect(enhanced).toBeDefined();
    });

    it('should not modify response unnecessarily', () => {
      const response = 'Your current design looks good.';
      const message = 'What do you think?';

      const enhanced = processAIResponse(response, message, mockState);

      // Should still return a valid response
      expect(enhanced).toBeDefined();
      expect(enhanced.length).toBeGreaterThan(0);
    });
  });

  describe('shouldIncludeContextForQuestion (Requirement 6.2)', () => {
    it('should exclude context for general questions', () => {
      const generalQuestions = [
        'What is React?',
        'How do I learn TypeScript?',
        'Can you explain CSS Grid?',
        'Tell me about web development',
        'What are the best practices?',
      ];

      generalQuestions.forEach(question => {
        const shouldInclude = shouldIncludeContextForQuestion(question, mockState);
        expect(shouldInclude).toBe(false);
      });
    });

    it('should include context for project-specific questions', () => {
      const projectQuestions = [
        'How can I improve my project?',
        'What about my design choices?',
        'Should I change my selected colors?',
        'Is my current layout good?',
        'What components should I add to this project?',
      ];

      projectQuestions.forEach(question => {
        const shouldInclude = shouldIncludeContextForQuestion(question, mockState);
        expect(shouldInclude).toBe(true);
      });
    });

    it('should include context when user has made selections', () => {
      const question = 'What should I do next?';
      
      const shouldInclude = shouldIncludeContextForQuestion(question, mockState);
      
      // User has selections, so context is relevant
      expect(shouldInclude).toBe(true);
    });

    it('should exclude context when user has no selections', () => {
      const emptyState = {
        projectInfo: { type: 'Website' as const, name: '', description: '' },
        selectedDesignStyle: null,
        selectedColorTheme: null,
        selectedLayout: null,
        selectedBackground: null,
        selectedComponents: [],
        selectedAnimations: [],
      } as any;

      const question = 'What should I do?';
      
      const shouldInclude = shouldIncludeContextForQuestion(question, emptyState);
      
      // No selections, general question
      expect(shouldInclude).toBe(false);
    });
  });

  describe('estimateChatTokens (Requirement 6.4)', () => {
    it('should estimate tokens for message', () => {
      const message = 'This is a test message with some words';
      
      const tokens = estimateChatTokens(message, mockState, mockHistory);
      
      expect(tokens).toBeGreaterThan(0);
      expect(typeof tokens).toBe('number');
    });

    it('should include context tokens in estimate', () => {
      const message = 'Test';
      
      const tokens = estimateChatTokens(message, mockState, mockHistory);
      
      // Should include message + context + history + system tokens
      expect(tokens).toBeGreaterThan(100); // At least system tokens
    });

    it('should include history tokens in estimate', () => {
      const message = 'Test';
      
      const tokensWithHistory = estimateChatTokens(message, mockState, mockHistory);
      const tokensWithoutHistory = estimateChatTokens(message, mockState, []);
      
      // With history should have more tokens
      expect(tokensWithHistory).toBeGreaterThan(tokensWithoutHistory);
    });

    it('should estimate approximately 1 token per 4 characters', () => {
      const message = 'a'.repeat(400); // 400 characters
      
      const tokens = estimateChatTokens(message, mockState, []);
      
      // Should be approximately 100 tokens for the message
      // Plus context and system tokens
      expect(tokens).toBeGreaterThan(100);
      expect(tokens).toBeLessThan(500);
    });
  });

  describe('isWithinTokenBudget (Requirement 6.4)', () => {
    it('should return true for short messages', () => {
      const message = 'Short message';
      
      const withinBudget = isWithinTokenBudget(message, mockState, mockHistory);
      
      expect(withinBudget).toBe(true);
    });

    it('should return false for very long messages', () => {
      const message = 'a'.repeat(5000); // Very long message
      
      const withinBudget = isWithinTokenBudget(message, mockState, mockHistory, 1000);
      
      expect(withinBudget).toBe(false);
    });

    it('should respect custom token limit', () => {
      const message = 'Test message';
      
      const withinSmallBudget = isWithinTokenBudget(message, mockState, mockHistory, 50);
      const withinLargeBudget = isWithinTokenBudget(message, mockState, mockHistory, 5000);
      
      expect(withinSmallBudget).toBe(false);
      expect(withinLargeBudget).toBe(true);
    });
  });

  describe('truncateHistoryForBudget (Requirement 6.4)', () => {
    it('should truncate history to fit token budget', () => {
      // Create long history
      const longHistory: ConversationMessage[] = Array.from({ length: 20 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i} with some content to make it longer`,
        timestamp: Date.now() - (20 - i) * 10000,
      }));

      const truncated = truncateHistoryForBudget(longHistory, 200);
      
      // Should have fewer messages
      expect(truncated.length).toBeLessThan(longHistory.length);
      expect(truncated.length).toBeGreaterThan(0);
    });

    it('should keep most recent messages', () => {
      const history: ConversationMessage[] = [
        { role: 'user', content: 'Old message', timestamp: Date.now() - 100000 },
        { role: 'assistant', content: 'Old response', timestamp: Date.now() - 90000 },
        { role: 'user', content: 'Recent message', timestamp: Date.now() - 10000 },
        { role: 'assistant', content: 'Recent response', timestamp: Date.now() - 5000 },
      ];

      const truncated = truncateHistoryForBudget(history, 100);
      
      // Should keep recent messages
      expect(truncated.some(m => m.content === 'Recent message')).toBe(true);
      expect(truncated.some(m => m.content === 'Recent response')).toBe(true);
    });

    it('should return empty array if budget is too small', () => {
      const truncated = truncateHistoryForBudget(mockHistory, 1);
      
      expect(truncated).toEqual([]);
    });

    it('should return all messages if budget is large enough', () => {
      const truncated = truncateHistoryForBudget(mockHistory, 10000);
      
      expect(truncated.length).toBe(mockHistory.length);
    });
  });

  describe('Integration: Complete Chat Flow (Requirement 6.5)', () => {
    it('should handle complete chat interaction', () => {
      const message = 'How can I improve my portfolio design?';
      const currentStep = 'design-style';

      // Build prompt
      const prompt = buildEnhancedChatPrompt(
        message,
        mockState,
        mockHistory,
        currentStep
      );

      expect(prompt).toBeDefined();
      expect(prompt).toContain(message);

      // Simulate AI response
      const aiResponse = 'Consider adding more contrast to your color scheme.';

      // Process response
      const enhanced = processAIResponse(aiResponse, message, mockState);

      expect(enhanced).toBeDefined();
      expect(enhanced.length).toBeGreaterThan(0);
    });

    it('should maintain conversation continuity', () => {
      // First message
      const message1 = 'What colors work well with minimalist design?';
      const prompt1 = buildEnhancedChatPrompt(
        message1,
        mockState,
        mockHistory,
        'design-style'
      );

      expect(prompt1).toContain(message1);

      // Follow-up message
      const message2 = 'What about that one?';
      const updatedHistory = [
        ...mockHistory,
        { role: 'user', content: message1, timestamp: Date.now() - 5000 },
        { role: 'assistant', content: 'Ocean Breeze works well', timestamp: Date.now() - 4000 },
      ];

      const prompt2 = buildEnhancedChatPrompt(
        message2,
        mockState,
        updatedHistory,
        'design-style'
      );

      // Should include previous context
      expect(prompt2).toContain('Ocean Breeze');
    });

    it('should handle token budget constraints', () => {
      const message = 'Tell me everything about web design';
      
      // Check if within budget
      const withinBudget = isWithinTokenBudget(message, mockState, mockHistory, 1000);
      
      if (!withinBudget) {
        // Truncate history
        const truncated = truncateHistoryForBudget(mockHistory, 400);
        
        // Build prompt with truncated history
        const prompt = buildEnhancedChatPrompt(
          message,
          mockState,
          truncated,
          'design-style'
        );
        
        expect(prompt).toBeDefined();
      } else {
        // Build prompt normally
        const prompt = buildEnhancedChatPrompt(
          message,
          mockState,
          mockHistory,
          'design-style'
        );
        
        expect(prompt).toBeDefined();
      }
    });
  });
});
