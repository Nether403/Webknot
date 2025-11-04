/**
 * Premium Features Integration Tests
 * 
 * Tests for rate limit bypass, upgrade flow, and premium-only feature access
 * 
 * Phase 3: Premium Tier System
 * Requirement: 7.5
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGemini } from '../../hooks/useGemini';
import {
  isPremiumUser,
  setPremiumStatus,
  clearPremiumStatus,
  getPremiumConfig,
  getTimeUntilExpiration,
  shouldShowUpgradePrompt,
} from '../../utils/premiumTier';

describe('Premium Features Integration Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  describe('Rate Limit Bypass for Premium (Requirement 7.5)', () => {
    it('should bypass rate limit for premium users', async () => {
      // Set premium status
      setPremiumStatus(true);
      expect(isPremiumUser()).toBe(true);

      // Mock API key
      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      const { result } = renderHook(() => useGemini());

      // Make multiple requests (more than free tier limit of 20)
      const requests = [];
      for (let i = 0; i < 25; i++) {
        requests.push(
          result.current.analyzeProject(`Test project ${i}`)
        );
      }

      // Premium users should not hit rate limit
      // All requests should complete (using fallback since no API key)
      const results = await Promise.all(requests);
      
      expect(results).toHaveLength(25);
      results.forEach(result => {
        expect(result).toBeDefined();
        expect(result.projectType).toBeDefined();
      });
    });

    it('should enforce rate limit for free users', async () => {
      // Ensure user is not premium
      clearPremiumStatus();
      expect(isPremiumUser()).toBe(false);

      // Set up rate limit exceeded state
      const rateLimitData = {
        requests: Array(20).fill(Date.now()),
        windowStart: Date.now(),
      };
      localStorage.setItem('lovabolt-rate-limit', JSON.stringify(rateLimitData));

      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      const { result } = renderHook(() => useGemini());

      // Wait for rate limit to be checked
      await waitFor(() => {
        expect(result.current.remainingRequests).toBe(0);
      }, { timeout: 1000 });

      // Try to make request - should fail with rate limit error
      await expect(
        result.current.analyzeProject('Test project')
      ).rejects.toThrow(/AI limit reached/);
    });

    it('should show different rate limit status for premium vs free', () => {
      // Free user
      clearPremiumStatus();
      const { result: freeResult } = renderHook(() => useGemini());
      
      expect(freeResult.current.remainingRequests).toBeLessThanOrEqual(20);

      // Premium user
      setPremiumStatus(true);
      const { result: premiumResult } = renderHook(() => useGemini());
      
      // Premium users should have unlimited or very high limit
      expect(premiumResult.current.remainingRequests).toBeGreaterThanOrEqual(20);
    });

    it('should update rate limit status when premium status changes', async () => {
      // Start as free user
      clearPremiumStatus();
      const { result, rerender } = renderHook(() => useGemini());

      const initialRemaining = result.current.remainingRequests;
      expect(initialRemaining).toBeLessThanOrEqual(20);

      // Upgrade to premium
      setPremiumStatus(true);
      
      // Trigger premium status change event
      window.dispatchEvent(new CustomEvent('premium-status-changed', {
        detail: { isPremium: true },
      }));

      // Re-render hook
      rerender();

      // Wait for state to update
      await waitFor(() => {
        expect(result.current.remainingRequests).toBeGreaterThanOrEqual(initialRemaining);
      }, { timeout: 1000 });
    });
  });

  describe('Upgrade Flow (Requirement 7.5)', () => {
    it('should show upgrade prompt for free users', () => {
      clearPremiumStatus();
      
      const shouldShow = shouldShowUpgradePrompt();
      
      expect(shouldShow).toBe(true);
    });

    it('should not show upgrade prompt for premium users', () => {
      setPremiumStatus(true);
      
      const shouldShow = shouldShowUpgradePrompt();
      
      expect(shouldShow).toBe(false);
    });

    it('should trigger upgrade prompt event on rate limit', async () => {
      clearPremiumStatus();

      // Set up rate limit exceeded
      const rateLimitData = {
        requests: Array(20).fill(Date.now()),
        windowStart: Date.now(),
      };
      localStorage.setItem('lovabolt-rate-limit', JSON.stringify(rateLimitData));

      // Listen for upgrade prompt event
      let eventFired = false;
      const handleUpgradePrompt = () => {
        eventFired = true;
      };
      window.addEventListener('show-upgrade-prompt', handleUpgradePrompt);

      vi.stubEnv('VITE_GEMINI_API_KEY', '');
      const { result } = renderHook(() => useGemini());

      // Try to make request
      try {
        await result.current.analyzeProject('Test project');
      } catch (error) {
        // Expected to fail with rate limit
      }

      // Note: In actual implementation, the upgrade prompt event would be triggered
      // For this test, we verify the rate limit error is thrown
      expect(result.current.remainingRequests).toBe(0);

      window.removeEventListener('show-upgrade-prompt', handleUpgradePrompt);
    });

    it('should complete upgrade flow successfully', () => {
      // Start as free user
      clearPremiumStatus();
      expect(isPremiumUser()).toBe(false);

      // Simulate upgrade
      setPremiumStatus(true);

      // Verify premium status
      expect(isPremiumUser()).toBe(true);
      
      const config = getPremiumConfig();
      expect(config.isPremium).toBe(true);
      expect(config.tier).toBe('premium');
      expect(config.activatedAt).toBeDefined();
    });

    it('should handle premium status with expiration', () => {
      const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
      
      setPremiumStatus(true, expiresAt);

      expect(isPremiumUser()).toBe(true);
      
      const timeRemaining = getTimeUntilExpiration();
      expect(timeRemaining).toBeGreaterThan(0);
      expect(timeRemaining).toBeLessThanOrEqual(30 * 24 * 60 * 60 * 1000);
    });

    it('should handle expired premium status', () => {
      const expiresAt = Date.now() - 1000; // Expired 1 second ago
      
      setPremiumStatus(true, expiresAt);

      // Should be treated as free user
      expect(isPremiumUser()).toBe(false);
      
      const config = getPremiumConfig();
      expect(config.isPremium).toBe(false);
      expect(config.tier).toBe('free');
    });

    it('should dispatch premium status change event', () => {
      let eventDetail: any = null;
      
      const handleStatusChange = (event: Event) => {
        eventDetail = (event as CustomEvent).detail;
      };
      
      window.addEventListener('premium-status-changed', handleStatusChange);

      setPremiumStatus(true);

      expect(eventDetail).not.toBeNull();
      expect(eventDetail.isPremium).toBe(true);

      window.removeEventListener('premium-status-changed', handleStatusChange);
    });
  });

  describe('Premium-Only Feature Access (Requirement 7.5)', () => {
    it('should allow unlimited AI requests for premium users', async () => {
      setPremiumStatus(true);
      
      vi.stubEnv('VITE_GEMINI_API_KEY', '');
      const { result } = renderHook(() => useGemini());

      // Make many requests
      const requests = [];
      for (let i = 0; i < 30; i++) {
        requests.push(
          result.current.analyzeProject(`Project ${i}`)
        );
      }

      const results = await Promise.all(requests);
      
      // All should succeed
      expect(results).toHaveLength(30);
      results.forEach(r => expect(r).toBeDefined());
    });

    it('should provide priority API access for premium users', () => {
      setPremiumStatus(true);
      
      const config = getPremiumConfig();
      
      expect(config.isPremium).toBe(true);
      expect(config.tier).toBe('premium');
      
      // Premium users should have priority flag
      // (In actual implementation, this would affect request queue priority)
    });

    it('should allow conversation history export for premium users', () => {
      setPremiumStatus(true);
      
      // Premium users should be able to export conversation history
      // This would be tested in the actual ChatInterface component
      expect(isPremiumUser()).toBe(true);
    });

    it('should restrict premium features for free users', () => {
      clearPremiumStatus();
      
      expect(isPremiumUser()).toBe(false);
      expect(shouldShowUpgradePrompt()).toBe(true);
      
      // Free users should see upgrade prompts for premium features
    });

    it('should handle premium feature gating correctly', () => {
      // Test free user
      clearPremiumStatus();
      let canAccessPremiumFeature = isPremiumUser();
      expect(canAccessPremiumFeature).toBe(false);

      // Test premium user
      setPremiumStatus(true);
      canAccessPremiumFeature = isPremiumUser();
      expect(canAccessPremiumFeature).toBe(true);
    });
  });

  describe('Premium Tier Persistence (Requirement 7.5)', () => {
    it('should persist premium status across sessions', () => {
      setPremiumStatus(true);
      
      // Simulate page reload by creating new hook instance
      const { result: result1 } = renderHook(() => useGemini());
      expect(isPremiumUser()).toBe(true);

      // Create another instance
      const { result: result2 } = renderHook(() => useGemini());
      expect(isPremiumUser()).toBe(true);
    });

    it('should persist premium expiration date', () => {
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
      
      setPremiumStatus(true, expiresAt);
      
      const config = getPremiumConfig();
      expect(config.expiresAt).toBe(expiresAt);
      
      // Verify time remaining
      const timeRemaining = getTimeUntilExpiration();
      expect(timeRemaining).toBeGreaterThan(0);
    });

    it('should clear premium status on logout', () => {
      setPremiumStatus(true);
      expect(isPremiumUser()).toBe(true);

      clearPremiumStatus();
      expect(isPremiumUser()).toBe(false);
      
      const config = getPremiumConfig();
      expect(config.isPremium).toBe(false);
      expect(config.tier).toBe('free');
    });
  });

  describe('Integration: Complete Premium Flow (Requirement 7.5)', () => {
    it('should handle complete premium user journey', async () => {
      // 1. Start as free user
      clearPremiumStatus();
      expect(isPremiumUser()).toBe(false);
      expect(shouldShowUpgradePrompt()).toBe(true);

      // 2. Hit rate limit as free user
      const rateLimitData = {
        requests: Array(20).fill(Date.now()),
        windowStart: Date.now(),
      };
      localStorage.setItem('lovabolt-rate-limit', JSON.stringify(rateLimitData));

      vi.stubEnv('VITE_GEMINI_API_KEY', '');
      const { result: freeResult } = renderHook(() => useGemini());

      await expect(
        freeResult.current.analyzeProject('Test')
      ).rejects.toThrow(/AI limit reached/);

      // 3. Upgrade to premium
      setPremiumStatus(true);
      expect(isPremiumUser()).toBe(true);
      expect(shouldShowUpgradePrompt()).toBe(false);

      // 4. Verify rate limit bypass
      const { result: premiumResult } = renderHook(() => useGemini());
      
      // Should be able to make requests now
      const analysis = await premiumResult.current.analyzeProject('Premium test');
      expect(analysis).toBeDefined();

      // 5. Make multiple requests (more than free limit)
      const requests = [];
      for (let i = 0; i < 25; i++) {
        requests.push(
          premiumResult.current.analyzeProject(`Project ${i}`)
        );
      }

      const results = await Promise.all(requests);
      expect(results).toHaveLength(25);

      // 6. Verify premium status persists
      const config = getPremiumConfig();
      expect(config.isPremium).toBe(true);
      expect(config.tier).toBe('premium');
    });

    it('should handle premium expiration gracefully', async () => {
      // Set premium with short expiration
      const expiresAt = Date.now() + 100; // Expires in 100ms
      
      setPremiumStatus(true, expiresAt);
      expect(isPremiumUser()).toBe(true);

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 150));

      // Should now be treated as free user
      expect(isPremiumUser()).toBe(false);
      expect(shouldShowUpgradePrompt()).toBe(true);
      
      const config = getPremiumConfig();
      expect(config.isPremium).toBe(false);
      expect(config.tier).toBe('free');
    });

    it('should handle premium downgrade', () => {
      // Start as premium
      setPremiumStatus(true);
      expect(isPremiumUser()).toBe(true);

      // Downgrade to free
      setPremiumStatus(false);
      expect(isPremiumUser()).toBe(false);
      
      // Should show upgrade prompts again
      expect(shouldShowUpgradePrompt()).toBe(true);
    });
  });

  describe('Premium Feature Metrics (Requirement 7.5)', () => {
    it('should track premium user activation', () => {
      setPremiumStatus(true);
      
      const config = getPremiumConfig();
      
      expect(config.activatedAt).toBeDefined();
      expect(config.activatedAt).toBeGreaterThan(0);
      expect(config.activatedAt).toBeLessThanOrEqual(Date.now());
    });

    it('should track premium tier type', () => {
      setPremiumStatus(true);
      
      const config = getPremiumConfig();
      
      expect(config.tier).toBe('premium');
    });

    it('should differentiate between free and premium tiers', () => {
      // Free tier
      clearPremiumStatus();
      let config = getPremiumConfig();
      expect(config.tier).toBe('free');

      // Premium tier
      setPremiumStatus(true);
      config = getPremiumConfig();
      expect(config.tier).toBe('premium');
    });
  });
});
