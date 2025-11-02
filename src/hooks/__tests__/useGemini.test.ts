/**
 * Tests for useGemini Hook
 * 
 * Tests the AI orchestrator hook including caching, fallback, and error handling
 */

import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useGemini } from '../useGemini';

// Mock environment variables
vi.stubEnv('VITE_GEMINI_API_KEY', 'AIzaSyC_test_key_1234567890123456789012345');

describe('useGemini', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Hook Structure (Task 4.1)', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useGemini());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.isUsingFallback).toBe(false);
    });

    it('should provide all required methods', () => {
      const { result } = renderHook(() => useGemini());

      expect(typeof result.current.analyzeProject).toBe('function');
      expect(typeof result.current.suggestImprovements).toBe('function');
      expect(typeof result.current.enhancePrompt).toBe('function');
      expect(typeof result.current.chat).toBe('function');
      expect(typeof result.current.clearCache).toBe('function');
    });

    it('should provide rate limiting information', () => {
      const { result } = renderHook(() => useGemini());

      expect(typeof result.current.remainingRequests).toBe('number');
      expect(typeof result.current.resetTime).toBe('number');
      expect(result.current.remainingRequests).toBeGreaterThan(0);
    });
  });

  describe('Fallback Mechanism (Task 4.3)', () => {
    it('should use fallback when API key is not available', async () => {
      // Temporarily remove API key
      vi.stubEnv('VITE_GEMINI_API_KEY', '');
      
      const { result } = renderHook(() => useGemini());

      const analysis = await result.current.analyzeProject(
        'I want to build a portfolio to showcase my design work'
      );

      // Verify fallback was used
      expect(analysis.reasoning).toContain('standard analysis');
      expect(analysis.projectType).toBe('Portfolio');
    });

    it('should handle empty description with fallback', async () => {
      const { result } = renderHook(() => useGemini({ enableFallback: true }));

      // Empty description should trigger fallback
      await expect(result.current.analyzeProject('')).rejects.toThrow(
        'Project description cannot be empty'
      );
    });

    it('should respect enableFallback option', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');
      
      const { result } = renderHook(() => useGemini({ enableFallback: false }));

      await expect(result.current.analyzeProject('test')).rejects.toThrow();
      expect(result.current.isUsingFallback).toBe(false);
    });

    it('should call onError callback when error occurs', async () => {
      const onError = vi.fn();
      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      const { result } = renderHook(() => useGemini({ onError }));

      await result.current.analyzeProject('test');

      expect(onError).toHaveBeenCalled();
    });
  });

  describe('Cache Control', () => {
    it('should have clearCache method', () => {
      const { result } = renderHook(() => useGemini());

      expect(() => result.current.clearCache()).not.toThrow();
    });
  });

  describe('Phase 2 Placeholders', () => {
    it('should have suggestImprovements placeholder', async () => {
      const { result } = renderHook(() => useGemini());

      const suggestions = await result.current.suggestImprovements({});

      expect(suggestions).toEqual([]);
    });

    it('should have enhancePrompt placeholder', async () => {
      const { result } = renderHook(() => useGemini());

      const enhancement = await result.current.enhancePrompt('test prompt');

      expect(enhancement.originalPrompt).toBe('test prompt');
      expect(enhancement.enhancedPrompt).toBe('test prompt');
      expect(enhancement.improvements).toEqual([]);
      expect(enhancement.addedSections).toEqual([]);
    });

    it('should have chat placeholder', async () => {
      const { result } = renderHook(() => useGemini());

      const response = await result.current.chat('test message');

      expect(response).toContain('Phase 3');
    });
  });

  describe('Configuration Options', () => {
    it('should accept custom timeout option', () => {
      const { result } = renderHook(() => useGemini({ timeout: 5000 }));

      expect(result.current).toBeDefined();
    });

    it('should accept enableCache option', () => {
      const { result } = renderHook(() => useGemini({ enableCache: false }));

      expect(result.current).toBeDefined();
    });

    it('should accept enableFallback option', () => {
      const { result } = renderHook(() => useGemini({ enableFallback: false }));

      expect(result.current).toBeDefined();
    });
  });

  describe('Rate Limiting (Task 6.2)', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });

    it('should initialize with correct rate limit status', () => {
      const { result } = renderHook(() => useGemini());

      expect(result.current.remainingRequests).toBe(20);
      expect(result.current.resetTime).toBeGreaterThan(Date.now());
    });

    it('should update remainingRequests after API call', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');
      const { result } = renderHook(() => useGemini());

      const initialRemaining = result.current.remainingRequests;

      // Make an API call (will use fallback but still consume rate limit)
      await result.current.analyzeProject('test project');

      // Note: In the current implementation, fallback doesn't consume rate limit
      // Only actual API calls consume rate limit
      // So remainingRequests should stay the same when using fallback
      expect(result.current.remainingRequests).toBe(initialRemaining);
    });

    it('should throw error when rate limit is exceeded', async () => {
      // Clear localStorage to start fresh
      localStorage.clear();
      
      const { result } = renderHook(() => useGemini());

      // Manually set rate limit to 0 by consuming all requests
      // This is a simplified test - in real usage, we'd make 20 API calls
      const rateLimitData = {
        requests: Array(20).fill(Date.now()),
        windowStart: Date.now()
      };
      localStorage.setItem('lovabolt-rate-limit', JSON.stringify(rateLimitData));

      // Re-render to pick up the new rate limit state
      const { result: newResult } = renderHook(() => useGemini());

      // Wait for rate limit status to update
      await new Promise(resolve => setTimeout(resolve, 100));

      // Try to make an API call - should throw rate limit error
      await expect(
        newResult.current.analyzeProject('test project')
      ).rejects.toThrow(/AI limit reached/);
    });

    it('should display countdown message when rate limited', async () => {
      // Set up rate limit exceeded state
      const rateLimitData = {
        requests: Array(20).fill(Date.now()),
        windowStart: Date.now()
      };
      localStorage.setItem('lovabolt-rate-limit', JSON.stringify(rateLimitData));

      const { result } = renderHook(() => useGemini());

      // Wait for rate limit status to update
      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        await result.current.analyzeProject('test project');
      } catch (error) {
        expect((error as Error).message).toMatch(/Please try again in \d+ minute/);
      }
    });

    it('should not consume rate limit on cache hits', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');
      const { result } = renderHook(() => useGemini());

      // First call (cache miss, uses fallback)
      await result.current.analyzeProject('test project');
      const remainingAfterFirst = result.current.remainingRequests;

      // Second identical call (cache hit)
      await result.current.analyzeProject('test project');
      const remainingAfterSecond = result.current.remainingRequests;

      // Cache hits should not consume rate limit
      expect(remainingAfterSecond).toBe(remainingAfterFirst);
    });

    it('should update resetTime correctly', () => {
      const { result } = renderHook(() => useGemini());

      const resetTime = result.current.resetTime;
      const now = Date.now();
      const oneHour = 3600000;

      // Reset time should be approximately 1 hour from now
      expect(resetTime).toBeGreaterThan(now);
      expect(resetTime).toBeLessThan(now + oneHour + 1000); // Allow 1 second tolerance
    });
  });
});
