/**
 * RateLimiter Service Tests
 * 
 * Tests rate limiting functionality including:
 * - Request counting
 * - Window reset
 * - Limit enforcement
 * - Storage persistence
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RateLimiter } from '../rateLimiter';

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Create rate limiter with short window for testing
    rateLimiter = new RateLimiter({
      maxRequests: 3,
      windowMs: 1000, // 1 second for testing
      storageKey: 'test-rate-limit'
    });
  });
  
  afterEach(() => {
    localStorage.clear();
  });
  
  describe('checkLimit', () => {
    it('should return correct initial status', () => {
      const status = rateLimiter.checkLimit();
      
      expect(status.remaining).toBe(3);
      expect(status.isLimited).toBe(false);
      expect(status.resetTime).toBeGreaterThan(Date.now());
    });
    
    it('should update remaining count after consuming requests', () => {
      rateLimiter.consumeRequest();
      const status = rateLimiter.checkLimit();
      
      expect(status.remaining).toBe(2);
      expect(status.isLimited).toBe(false);
    });
    
    it('should indicate limited when max requests reached', () => {
      rateLimiter.consumeRequest();
      rateLimiter.consumeRequest();
      rateLimiter.consumeRequest();
      
      const status = rateLimiter.checkLimit();
      
      expect(status.remaining).toBe(0);
      expect(status.isLimited).toBe(true);
    });
  });
  
  describe('consumeRequest', () => {
    it('should allow requests under the limit', () => {
      expect(rateLimiter.consumeRequest()).toBe(true);
      expect(rateLimiter.consumeRequest()).toBe(true);
      expect(rateLimiter.consumeRequest()).toBe(true);
    });
    
    it('should deny requests over the limit', () => {
      rateLimiter.consumeRequest();
      rateLimiter.consumeRequest();
      rateLimiter.consumeRequest();
      
      expect(rateLimiter.consumeRequest()).toBe(false);
    });
    
    it('should allow requests after window expires', async () => {
      // Consume all requests
      rateLimiter.consumeRequest();
      rateLimiter.consumeRequest();
      rateLimiter.consumeRequest();
      
      expect(rateLimiter.consumeRequest()).toBe(false);
      
      // Wait for window to expire
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      // Should allow new requests
      expect(rateLimiter.consumeRequest()).toBe(true);
    });
  });
  
  describe('reset', () => {
    it('should clear all requests', () => {
      rateLimiter.consumeRequest();
      rateLimiter.consumeRequest();
      
      rateLimiter.reset();
      
      const status = rateLimiter.checkLimit();
      expect(status.remaining).toBe(3);
      expect(status.isLimited).toBe(false);
    });
  });
  
  describe('getTimeUntilReset', () => {
    it('should return time until oldest request expires', () => {
      rateLimiter.consumeRequest();
      
      const timeUntilReset = rateLimiter.getTimeUntilReset();
      
      expect(timeUntilReset).toBeGreaterThan(0);
      expect(timeUntilReset).toBeLessThanOrEqual(1000);
    });
    
    it('should return 0 when no requests have been made', () => {
      const timeUntilReset = rateLimiter.getTimeUntilReset();
      
      // Should be close to window duration since no requests yet
      expect(timeUntilReset).toBeGreaterThan(0);
    });
  });
  
  describe('localStorage persistence', () => {
    it('should persist requests to localStorage', () => {
      rateLimiter.consumeRequest();
      rateLimiter.consumeRequest();
      
      const stored = localStorage.getItem('test-rate-limit');
      expect(stored).toBeTruthy();
      
      const data = JSON.parse(stored!);
      expect(data.requests).toHaveLength(2);
    });
    
    it('should load requests from localStorage', () => {
      // Create first limiter and consume requests
      rateLimiter.consumeRequest();
      rateLimiter.consumeRequest();
      
      // Create new limiter (should load from storage)
      const newLimiter = new RateLimiter({
        maxRequests: 3,
        windowMs: 1000,
        storageKey: 'test-rate-limit'
      });
      
      const status = newLimiter.checkLimit();
      expect(status.remaining).toBe(1);
    });
    
    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('test-rate-limit', 'invalid json');
      
      // Should not throw, should start fresh
      const newLimiter = new RateLimiter({
        maxRequests: 3,
        windowMs: 1000,
        storageKey: 'test-rate-limit'
      });
      
      const status = newLimiter.checkLimit();
      expect(status.remaining).toBe(3);
    });
    
    it('should handle localStorage quota exceeded', () => {
      // Mock localStorage.setItem to throw QuotaExceededError
      const originalSetItem = localStorage.setItem;
      let callCount = 0;
      
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
        callCount++;
        if (callCount === 1) {
          const error = new Error('QuotaExceededError');
          error.name = 'QuotaExceededError';
          throw error;
        }
        originalSetItem.call(localStorage, key, value);
      });
      
      // Should handle error gracefully
      expect(() => rateLimiter.consumeRequest()).not.toThrow();
      
      vi.restoreAllMocks();
    });
  });
  
  describe('cleanup old requests', () => {
    it('should remove expired requests', async () => {
      rateLimiter.consumeRequest();
      
      // Wait for request to expire
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      const status = rateLimiter.checkLimit();
      expect(status.remaining).toBe(3);
    });
    
    it('should keep recent requests', () => {
      rateLimiter.consumeRequest();
      
      const status = rateLimiter.checkLimit();
      expect(status.remaining).toBe(2);
    });
  });
  
  describe('default configuration', () => {
    it('should use default values when not provided', () => {
      const defaultLimiter = new RateLimiter();
      
      const status = defaultLimiter.checkLimit();
      expect(status.remaining).toBe(20); // Default max requests
    });
  });
});
