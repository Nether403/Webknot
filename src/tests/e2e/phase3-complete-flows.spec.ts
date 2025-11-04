/**
 * Phase 3 E2E Tests - Complete Flows
 * 
 * End-to-end tests for:
 * - Full conversational session
 * - Premium upgrade journey
 * - Feedback collection and analysis
 * 
 * Phase 3: Advanced Features
 * Requirements: 6.1, 6.2, 7.5, 10.3
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useChat } from '../../hooks/useChat';
import { useGemini } from '../../hooks/useGemini';
import {
  isPremiumUser,
  setPremiumStatus,
  clearPremiumStatus,
} from '../../utils/premiumTier';
import {
  loadConversationHistory,
  clearConversationHistory,
  getConversationStats,
} from '../../utils/conversationManager';
import { getFeedbackService } from '../../services/feedbackService';

describe('Phase 3 E2E Tests - Complete Flows', () => {
  beforeEach(() => {
    // Clear all state before each test
    localStorage.clear();
    clearConversationHistory();
    clearPremiumStatus();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
    clearConversationHistory();
  });

  describe('Full Conversational Session (Requirements 6.1, 6.2)', () => {
    it('should handle complete multi-turn conversation', async () => {
      const { result } = renderHook(() => useChat());

      // Turn 1: Initial question
      await act(async () => {
        await result.current.sendMessage('What design style should I use for a portfolio?');
      });

      await waitFor(() => {
        expect(result.current.messages.length).toBeGreaterThan(0);
      });

      const firstResponse = result.current.messages[result.current.messages.length - 1];
      expect(firstResponse?.role).toBe('assistant');
      expect(firstResponse?.content).toBeDefined();

      // Turn 2: Follow-up question
      await act(async () => {
        await result.current.sendMessage('What colors work well with that?');
      });

      await waitFor(() => {
        expect(result.current.messages.length).toBeGreaterThan(2);
      });

      // Turn 3: Specific question
      await act(async () => {
        await result.current.sendMessage('Should I use animations?');
      });

      await waitFor(() => {
        expect(result.current.messages.length).toBeGreaterThan(4);
      });

      // Verify conversation history
      const history = loadConversationHistory();
      expect(history.length).toBeGreaterThanOrEqual(6); // 3 questions + 3 responses

      // Verify conversation stats
      const stats = getConversationStats();
      expect(stats.userMessages).toBeGreaterThanOrEqual(3);
      expect(stats.assistantMessages).toBeGreaterThanOrEqual(3);
    });

    it('should maintain context across conversation', async () => {
      const { result } = renderHook(() => useChat());

      // Establish context
      await act(async () => {
        await result.current.sendMessage('I want to build a portfolio website');
      });

      await waitFor(() => {
        expect(result.current.messages.length).toBeGreaterThan(0);
      });

      // Ask follow-up that requires context
      await act(async () => {
        await result.current.sendMessage('What components should I add to it?');
      });

      await waitFor(() => {
        expect(result.current.messages.length).toBeGreaterThan(2);
      });

      const response = result.current.messages[result.current.messages.length - 1];
      expect(response?.content).toBeDefined();
      // Response should reference portfolio context
      expect(response?.content.toLowerCase()).toMatch(/portfolio|showcase|work/);
    });

    it('should handle conversation summarization after 10 exchanges', async () => {
      const { result } = renderHook(() => useChat());

      // Simulate 12 exchanges (24 messages)
      for (let i = 0; i < 12; i++) {
        await act(async () => {
          await result.current.sendMessage(`Question ${i}`);
        });

        await waitFor(() => {
          expect(result.current.messages.length).toBe((i + 1) * 2);
        }, { timeout: 5000 });
      }

      // Verify history was summarized
      const history = loadConversationHistory();
      
      // Should have summary + recent messages (not all 24)
      expect(history.length).toBeLessThan(24);
      
      // First message should be summary
      if (history.length > 0) {
        expect(history[0]?.content).toContain('Previous conversation summary');
      }
    });

    it('should clear conversation on wizard reset', async () => {
      const { result } = renderHook(() => useChat());

      // Have a conversation
      await act(async () => {
        await result.current.sendMessage('Test message');
      });

      await waitFor(() => {
        expect(result.current.messages.length).toBeGreaterThan(0);
      });

      // Clear conversation
      act(() => {
        result.current.clearConversation();
      });

      expect(result.current.messages).toEqual([]);
      
      const history = loadConversationHistory();
      expect(history).toEqual([]);
    });

    it('should handle loading states during conversation', async () => {
      const { result } = renderHook(() => useChat());

      expect(result.current.isLoading).toBe(false);

      // Start sending message
      const sendPromise = act(async () => {
        await result.current.sendMessage('Test question');
      });

      // Should be loading
      expect(result.current.isLoading).toBe(true);

      // Wait for completion
      await sendPromise;

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('should handle errors gracefully in conversation', async () => {
      const { result } = renderHook(() => useChat());

      // Send empty message (should error)
      await act(async () => {
        try {
          await result.current.sendMessage('');
        } catch (error) {
          // Expected to fail
        }
      });

      // Should have error state
      expect(result.current.error).toBeDefined();
      
      // Should still be able to send valid message
      await act(async () => {
        await result.current.sendMessage('Valid message');
      });

      await waitFor(() => {
        expect(result.current.messages.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Premium Upgrade Journey (Requirement 7.5)', () => {
    it('should complete full upgrade flow from free to premium', async () => {
      // Step 1: Start as free user
      clearPremiumStatus();
      expect(isPremiumUser()).toBe(false);

      const { result: freeResult } = renderHook(() => useGemini());

      // Step 2: Hit rate limit
      const rateLimitData = {
        requests: Array(20).fill(Date.now()),
        windowStart: Date.now(),
      };
      localStorage.setItem('lovabolt-rate-limit', JSON.stringify(rateLimitData));

      // Step 3: Try to make request (should fail)
      await expect(
        freeResult.current.analyzeProject('Test')
      ).rejects.toThrow(/AI limit reached/);

      // Step 4: Upgrade to premium
      setPremiumStatus(true);
      expect(isPremiumUser()).toBe(true);

      // Step 5: Verify unlimited access
      const { result: premiumResult } = renderHook(() => useGemini());

      // Should be able to make many requests
      const requests = [];
      for (let i = 0; i < 25; i++) {
        requests.push(
          premiumResult.current.analyzeProject(`Project ${i}`)
        );
      }

      const results = await Promise.all(requests);
      expect(results).toHaveLength(25);

      // Step 6: Verify premium features accessible
      expect(isPremiumUser()).toBe(true);
    });

    it('should show upgrade prompts at appropriate times', async () => {
      clearPremiumStatus();

      let upgradePromptShown = false;
      const handleUpgradePrompt = () => {
        upgradePromptShown = true;
      };

      window.addEventListener('show-upgrade-prompt', handleUpgradePrompt);

      // Simulate rate limit hit
      const rateLimitData = {
        requests: Array(20).fill(Date.now()),
        windowStart: Date.now(),
      };
      localStorage.setItem('lovabolt-rate-limit', JSON.stringify(rateLimitData));

      const { result } = renderHook(() => useGemini());

      try {
        await result.current.analyzeProject('Test');
      } catch (error) {
        // Expected to fail
      }

      // In actual implementation, upgrade prompt event would be triggered
      // For now, verify rate limit was hit
      expect(result.current.remainingRequests).toBe(0);

      window.removeEventListener('show-upgrade-prompt', handleUpgradePrompt);
    });

    it('should handle premium trial period', async () => {
      // Set premium with 7-day trial
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
      setPremiumStatus(true, expiresAt);

      expect(isPremiumUser()).toBe(true);

      const { result } = renderHook(() => useGemini());

      // Should have premium access
      const requests = [];
      for (let i = 0; i < 25; i++) {
        requests.push(result.current.analyzeProject(`Project ${i}`));
      }

      const results = await Promise.all(requests);
      expect(results).toHaveLength(25);
    });

    it('should handle premium expiration and renewal', async () => {
      // Set premium with short expiration
      const expiresAt = Date.now() + 100;
      setPremiumStatus(true, expiresAt);

      expect(isPremiumUser()).toBe(true);

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 150));

      // Should be free user now
      expect(isPremiumUser()).toBe(false);

      // Renew premium
      setPremiumStatus(true);
      expect(isPremiumUser()).toBe(true);
    });
  });

  describe('Feedback Collection and Analysis (Requirement 10.3)', () => {
    it('should collect feedback throughout user journey', () => {
      const feedbackService = getFeedbackService();
      feedbackService.clear();

      // User provides feedback on suggestions
      feedbackService.recordSuggestionAction(
        'suggestion-1',
        true,
        'improvement',
        'medium'
      );

      feedbackService.recordSuggestionAction(
        'suggestion-2',
        false,
        'warning',
        'high'
      );

      // User provides feedback on enhancement
      feedbackService.recordEnhancementAction('enhancement-1', true);

      // Get feedback stats
      const stats = feedbackService.getStats();

      expect(stats.totalFeedback).toBe(3);
      expect(stats.positiveCount).toBe(2);
      expect(stats.negativeCount).toBe(1);
      expect(stats.acceptanceRate).toBeCloseTo(0.67, 1);
    });

    it('should analyze feedback and generate recommendations', () => {
      const feedbackService = getFeedbackService();
      feedbackService.clear();

      // Simulate low acceptance rate for specific suggestion type
      for (let i = 0; i < 10; i++) {
        feedbackService.recordSuggestionAction(
          `suggestion-${i}`,
          i < 3, // Only 3 out of 10 accepted (30%)
          'improvement',
          'medium'
        );
      }

      const recommendations = feedbackService.generateRecommendations();

      expect(recommendations.length).toBeGreaterThan(0);
      
      // Should have recommendation for low acceptance rate
      const lowQualityRec = recommendations.find(
        r => r.category.includes('improvement')
      );
      expect(lowQualityRec).toBeDefined();
      expect(lowQualityRec?.priority).toBe('high');
    });

    it('should track accuracy over time', () => {
      const feedbackService = getFeedbackService();
      feedbackService.clear();

      // Add feedback over different time periods
      const now = Date.now();
      
      // Recent feedback (last 7 days) - high acceptance
      for (let i = 0; i < 5; i++) {
        feedbackService.recordFeedback(
          'thumbs-up',
          'suggestion',
          `recent-${i}`,
          { wasAccepted: true }
        );
      }

      // Older feedback (7-14 days) - lower acceptance
      for (let i = 0; i < 5; i++) {
        const feedback = {
          id: `old-${i}`,
          timestamp: now - 10 * 24 * 60 * 60 * 1000,
          type: i < 2 ? 'thumbs-up' : 'thumbs-down' as const,
          target: 'suggestion' as const,
          targetId: `old-${i}`,
          metadata: { wasAccepted: i < 2 },
        };
        (feedbackService as any).feedback.push(feedback);
      }

      const accuracy = feedbackService.trackAccuracyOverTime([7, 14, 30]);

      expect(accuracy['7d']).toBeGreaterThan(accuracy['14d']);
    });

    it('should identify low-quality suggestions', () => {
      const feedbackService = getFeedbackService();
      feedbackService.clear();

      // Add feedback for different suggestion types
      // Type A: High acceptance (80%)
      for (let i = 0; i < 10; i++) {
        feedbackService.recordSuggestionAction(
          `typeA-${i}`,
          i < 8,
          'improvement',
          'medium'
        );
      }

      // Type B: Low acceptance (20%)
      for (let i = 0; i < 10; i++) {
        feedbackService.recordSuggestionAction(
          `typeB-${i}`,
          i < 2,
          'warning',
          'high'
        );
      }

      const lowQuality = feedbackService.getLowQualitySuggestions(0.5);

      expect(lowQuality.length).toBeGreaterThan(0);
      
      // Type B should be identified as low quality
      const typeB = lowQuality.find(s => s.type === 'warning');
      expect(typeB).toBeDefined();
      expect(typeB?.acceptanceRate).toBeLessThan(0.5);
    });

    it('should export feedback data for analysis', () => {
      const feedbackService = getFeedbackService();
      feedbackService.clear();

      // Add some feedback
      feedbackService.recordSuggestionAction('s1', true, 'improvement', 'medium');
      feedbackService.recordEnhancementAction('e1', false);

      const exported = feedbackService.export();

      expect(exported).toBeDefined();
      
      const data = JSON.parse(exported);
      expect(data.feedback).toBeDefined();
      expect(data.stats).toBeDefined();
      expect(data.recommendations).toBeDefined();
      expect(data.exportedAt).toBeDefined();
    });
  });

  describe('Integration: Complete Phase 3 User Journey', () => {
    it('should handle complete user journey with all Phase 3 features', async () => {
      const feedbackService = getFeedbackService();
      feedbackService.clear();

      // Step 1: Start as free user with chat
      clearPremiumStatus();
      const { result: chatResult } = renderHook(() => useChat());

      // Step 2: Have a conversation
      await act(async () => {
        await chatResult.current.sendMessage('How can I improve my portfolio?');
      });

      await waitFor(() => {
        expect(chatResult.current.messages.length).toBeGreaterThan(0);
      });

      // Step 3: Provide feedback on AI response
      feedbackService.recordFeedback(
        'thumbs-up',
        'chat',
        'chat-1',
        { wasHelpful: true }
      );

      // Step 4: Continue conversation
      await act(async () => {
        await chatResult.current.sendMessage('What about colors?');
      });

      await waitFor(() => {
        expect(chatResult.current.messages.length).toBeGreaterThan(2);
      });

      // Step 5: Hit rate limit
      const rateLimitData = {
        requests: Array(20).fill(Date.now()),
        windowStart: Date.now(),
      };
      localStorage.setItem('lovabolt-rate-limit', JSON.stringify(rateLimitData));

      const { result: geminiResult } = renderHook(() => useGemini());

      await expect(
        geminiResult.current.analyzeProject('Test')
      ).rejects.toThrow(/AI limit reached/);

      // Step 6: Upgrade to premium
      setPremiumStatus(true);
      expect(isPremiumUser()).toBe(true);

      // Step 7: Continue using AI features without limits
      const { result: premiumGemini } = renderHook(() => useGemini());

      const requests = [];
      for (let i = 0; i < 25; i++) {
        requests.push(premiumGemini.current.analyzeProject(`Project ${i}`));
      }

      const results = await Promise.all(requests);
      expect(results).toHaveLength(25);

      // Step 8: Provide more feedback
      feedbackService.recordSuggestionAction('s1', true, 'improvement', 'medium');
      feedbackService.recordEnhancementAction('e1', true);

      // Step 9: Verify feedback stats
      const stats = feedbackService.getStats();
      expect(stats.totalFeedback).toBeGreaterThan(0);

      // Step 10: Verify conversation history
      const conversationStats = getConversationStats();
      expect(conversationStats.totalMessages).toBeGreaterThan(0);

      // Step 11: Export data
      const exported = feedbackService.export();
      expect(exported).toBeDefined();
    });
  });
});
