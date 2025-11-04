/**
 * Cache Service
 * 
 * Provides in-memory caching with localStorage persistence for Gemini AI responses
 * Implements LRU (Least Recently Used) eviction and TTL (Time To Live) expiration
 */

import type { CacheEntry, CacheConfig, GeminiCacheStorage } from '../types/gemini';

export class CacheService {
  private cache: Map<string, CacheEntry<unknown>>;
  private config: CacheConfig;
  private totalHits: number = 0;
  private totalMisses: number = 0;
  
  constructor(config?: Partial<CacheConfig>) {
    // Default configuration
    this.config = {
      maxSize: config?.maxSize ?? 100,
      ttl: config?.ttl ?? 3600000, // 1 hour default
      persistToLocalStorage: config?.persistToLocalStorage ?? true,
      storageKey: config?.storageKey ?? 'webknot-gemini-cache',
    };
    
    this.cache = new Map();
    
    // Load cached data from localStorage on initialization
    if (this.config.persistToLocalStorage) {
      this.loadFromStorage();
    }
  }
  
  /**
   * Retrieves a value from the cache
   * 
   * @param key - The cache key
   * @returns The cached value or null if not found or expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.totalMisses++;
      return null;
    }
    
    // Check if entry has expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.totalMisses++;
      
      // Save to storage after deletion
      if (this.config.persistToLocalStorage) {
        this.saveToStorage();
      }
      
      return null;
    }
    
    // Update hit count and timestamp (for LRU tracking)
    entry.hits++;
    entry.timestamp = Date.now();
    
    this.totalHits++;
    
    return entry.data as T;
  }
  
  /**
   * Stores a value in the cache
   * 
   * @param key - The cache key
   * @param data - The data to cache
   */
  set<T>(key: string, data: T): void {
    // Evict oldest entry if cache is at capacity
    if (this.cache.size >= this.config.maxSize && !this.cache.has(key)) {
      this.evictOldest();
    }
    
    const now = Date.now();
    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expiresAt: now + this.config.ttl,
      hits: 0,
    };
    
    this.cache.set(key, entry as CacheEntry<unknown>);
    
    // Persist to localStorage
    if (this.config.persistToLocalStorage) {
      this.saveToStorage();
    }
  }
  
  /**
   * Checks if a key exists in the cache and is not expired
   * 
   * @param key - The cache key
   * @returns True if the key exists and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }
    
    // Check expiration
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      
      if (this.config.persistToLocalStorage) {
        this.saveToStorage();
      }
      
      return false;
    }
    
    return true;
  }
  
  /**
   * Clears all entries from the cache
   */
  clear(): void {
    this.cache.clear();
    this.totalHits = 0;
    this.totalMisses = 0;
    
    // Clear from localStorage
    if (this.config.persistToLocalStorage) {
      try {
        localStorage.removeItem(this.config.storageKey);
      } catch (error) {
        console.error('Failed to clear cache from localStorage:', error);
      }
    }
  }
  
  /**
   * Evicts the oldest (least recently used) entry from the cache
   * Based on the timestamp of last access
   */
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTimestamp = Infinity;
    
    // Find the entry with the oldest timestamp
    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    }
    
    // Remove the oldest entry
    if (oldestKey) {
      this.cache.delete(oldestKey);
      console.log(`[CacheService] Evicted oldest entry: ${oldestKey}`);
    }
  }
  
  /**
   * Loads cache entries from localStorage
   * Clears expired entries during load
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.config.storageKey);
      
      if (!stored) {
        return;
      }
      
      const data: GeminiCacheStorage = JSON.parse(stored);
      const now = Date.now();
      let expiredCount = 0;
      
      // Restore cache entries, filtering out expired ones
      Object.entries(data.entries || {}).forEach(([key, entry]) => {
        // Skip expired entries
        if (now > entry.expiresAt) {
          expiredCount++;
          return;
        }
        
        this.cache.set(key, entry);
      });
      
      console.log(
        `[CacheService] Loaded ${this.cache.size} entries from localStorage ` +
        `(${expiredCount} expired entries cleared)`
      );
      
      // If we cleared expired entries, save the cleaned cache
      if (expiredCount > 0) {
        this.saveToStorage();
      }
      
    } catch (error) {
      console.error('Failed to load cache from localStorage:', error);
      // If loading fails, start with empty cache
      this.cache.clear();
    }
  }
  
  /**
   * Saves cache entries to localStorage
   * Handles quota exceeded errors gracefully
   */
  private saveToStorage(): void {
    try {
      const data: GeminiCacheStorage = {
        entries: Object.fromEntries(this.cache.entries()),
        lastCleanup: Date.now(),
      };
      
      localStorage.setItem(this.config.storageKey, JSON.stringify(data));
      
    } catch (error) {
      // Handle localStorage quota exceeded error
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn(
          '[CacheService] localStorage quota exceeded. Clearing oldest entries...'
        );
        
        // Clear half of the cache to free up space
        const entriesToRemove = Math.floor(this.cache.size / 2);
        const sortedEntries = Array.from(this.cache.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp);
        
        for (let i = 0; i < entriesToRemove; i++) {
          this.cache.delete(sortedEntries[i][0]);
        }
        
        // Try saving again
        try {
          const data: GeminiCacheStorage = {
            entries: Object.fromEntries(this.cache.entries()),
            lastCleanup: Date.now(),
          };
          localStorage.setItem(this.config.storageKey, JSON.stringify(data));
        } catch (retryError) {
          console.error('Failed to save cache after clearing entries:', retryError);
        }
      } else {
        console.error('Failed to save cache to localStorage:', error);
      }
    }
  }
  
  /**
   * Pre-warms the cache with common entries
   * Reduces cold start latency by pre-caching frequently used data
   * 
   * @param entries - Array of key-value pairs to pre-cache
   */
  warm<T>(entries: Array<{ key: string; data: T }>): void {
    console.log(`[CacheService] Warming cache with ${entries.length} entries`);
    
    for (const entry of entries) {
      // Only add if not already cached
      if (!this.has(entry.key)) {
        this.set(entry.key, entry.data);
      }
    }
    
    console.log(`[CacheService] Cache warming complete. Cache size: ${this.cache.size}`);
  }
  
  /**
   * Returns cache statistics
   * 
   * @returns Statistics about cache performance
   */
  getStats(): {
    size: number;
    hitRate: number;
    oldestEntry: number;
  } {
    let oldestTimestamp = Date.now();
    
    // Find oldest entry
    for (const entry of this.cache.values()) {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
      }
    }
    
    const totalRequests = this.totalHits + this.totalMisses;
    const hitRate = totalRequests > 0 ? this.totalHits / totalRequests : 0;
    
    return {
      size: this.cache.size,
      hitRate,
      oldestEntry: oldestTimestamp,
    };
  }
}
