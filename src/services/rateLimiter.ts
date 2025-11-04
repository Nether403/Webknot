/**
 * RateLimiter Service
 * 
 * Implements rate limiting for AI API requests to prevent abuse and control costs.
 * Tracks requests per user using localStorage with a sliding window approach.
 * 
 * Requirements:
 * - 7.1: Limit each user to 20 AI requests per hour
 * - 7.3: Track API usage per user using localStorage
 * - 7.5: Premium tier option that removes rate limits for paid users
 */

import { isPremiumUser } from '../utils/premiumTier';

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  storageKey: string;
  bypassForPremium?: boolean; // Whether to bypass rate limits for premium users
}

export interface RateLimitStatus {
  remaining: number;
  resetTime: number;
  isLimited: boolean;
}

interface RateLimitStorage {
  requests: number[]; // Array of timestamps
  windowStart: number;
}

export class RateLimiter {
  private config: RateLimitConfig;
  private requests: number[] = [];
  
  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = {
      maxRequests: config.maxRequests ?? 20,
      windowMs: config.windowMs ?? 3600000, // 1 hour default
      storageKey: config.storageKey ?? 'lovabolt-rate-limit',
      bypassForPremium: config.bypassForPremium ?? true // Default to bypassing for premium
    };
    
    this.loadFromStorage();
    this.cleanupOldRequests();
  }
  
  /**
   * Check if user is premium and should bypass rate limits
   */
  private shouldBypassRateLimit(): boolean {
    return this.config.bypassForPremium === true && isPremiumUser();
  }
  
  /**
   * Check current rate limit status without consuming a request
   */
  checkLimit(): RateLimitStatus {
    // Premium users bypass rate limits
    if (this.shouldBypassRateLimit()) {
      return {
        remaining: 999, // Show large number for premium users
        resetTime: Date.now() + this.config.windowMs,
        isLimited: false
      };
    }
    
    this.cleanupOldRequests();
    
    const now = Date.now();
    const remaining = Math.max(0, this.config.maxRequests - this.requests.length);
    const isLimited = remaining === 0;
    
    // Calculate reset time (when oldest request expires)
    let resetTime = now + this.config.windowMs;
    if (this.requests.length > 0 && this.requests[0] !== undefined) {
      resetTime = this.requests[0] + this.config.windowMs;
    }
    
    return {
      remaining,
      resetTime,
      isLimited
    };
  }
  
  /**
   * Consume a request from the rate limit quota
   * Returns true if request was allowed, false if limit exceeded
   */
  consumeRequest(): boolean {
    // Premium users bypass rate limits
    if (this.shouldBypassRateLimit()) {
      console.log('[RateLimiter] Premium user - bypassing rate limit');
      return true;
    }
    
    this.cleanupOldRequests();
    
    const status = this.checkLimit();
    if (status.isLimited) {
      return false;
    }
    
    // Add current timestamp
    this.requests.push(Date.now());
    this.saveToStorage();
    
    return true;
  }
  
  /**
   * Reset all rate limit data
   */
  reset(): void {
    this.requests = [];
    this.saveToStorage();
  }
  
  /**
   * Get time remaining until next request is available (in milliseconds)
   */
  getTimeUntilReset(): number {
    const status = this.checkLimit();
    return Math.max(0, status.resetTime - Date.now());
  }
  
  /**
   * Remove requests older than the time window
   */
  private cleanupOldRequests(): void {
    const now = Date.now();
    const cutoff = now - this.config.windowMs;
    
    // Filter out requests older than the window
    this.requests = this.requests.filter(timestamp => timestamp > cutoff);
    
    // Save if we removed any
    if (this.requests.length !== this.requests.filter(t => t > cutoff).length) {
      this.saveToStorage();
    }
  }
  
  /**
   * Load rate limit data from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.config.storageKey);
      if (stored) {
        const data: RateLimitStorage = JSON.parse(stored);
        
        // Validate data structure
        if (Array.isArray(data.requests)) {
          this.requests = data.requests;
        }
      }
    } catch (error) {
      console.error('Failed to load rate limit data from storage:', error);
      // Start fresh if corrupted
      this.requests = [];
    }
  }
  
  /**
   * Save rate limit data to localStorage
   */
  private saveToStorage(): void {
    try {
      const data: RateLimitStorage = {
        requests: this.requests,
        windowStart: Date.now()
      };
      
      localStorage.setItem(this.config.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save rate limit data to storage:', error);
      
      // Handle quota exceeded error
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        // Clear old data and try again
        this.requests = this.requests.slice(-this.config.maxRequests);
        try {
          const data: RateLimitStorage = {
            requests: this.requests,
            windowStart: Date.now()
          };
          localStorage.setItem(this.config.storageKey, JSON.stringify(data));
        } catch (retryError) {
          console.error('Failed to save rate limit data after cleanup:', retryError);
        }
      }
    }
  }
}
