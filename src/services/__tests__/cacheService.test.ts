/**
 * CacheService Unit Tests
 * 
 * Tests for in-memory caching with localStorage persistence
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CacheService } from '../cacheService';

describe('CacheService', () => {
  let cacheService: CacheService;
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Create a new cache service instance
    cacheService = new CacheService({
      maxSize: 5,
      ttl: 1000, // 1 second for testing
      persistToLocalStorage: true,
      storageKey: 'test-cache',
    });
  });
  
  afterEach(() => {
    // Clean up
    localStorage.clear();
  });
  
  describe('Basic Operations', () => {
    it('should store and retrieve values', () => {
      const testData = { message: 'Hello, World!' };
      
      cacheService.set('test-key', testData);
      const retrieved = cacheService.get<typeof testData>('test-key');
      
      expect(retrieved).toEqual(testData);
    });
    
    it('should return null for non-existent keys', () => {
      const result = cacheService.get('non-existent');
      
      expect(result).toBeNull();
    });
    
    it('should check if key exists', () => {
      cacheService.set('test-key', 'test-value');
      
      expect(cacheService.has('test-key')).toBe(true);
      expect(cacheService.has('non-existent')).toBe(false);
    });
    
    it('should clear all entries', () => {
      cacheService.set('key1', 'value1');
      cacheService.set('key2', 'value2');
      
      expect(cacheService.has('key1')).toBe(true);
      expect(cacheService.has('key2')).toBe(true);
      
      cacheService.clear();
      
      expect(cacheService.has('key1')).toBe(false);
      expect(cacheService.has('key2')).toBe(false);
    });
  });
  
  describe('TTL Expiration', () => {
    it('should expire entries after TTL', async () => {
      cacheService.set('test-key', 'test-value');
      
      // Value should exist immediately
      expect(cacheService.get('test-key')).toBe('test-value');
      
      // Wait for TTL to expire (1 second + buffer)
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      // Value should be expired
      expect(cacheService.get('test-key')).toBeNull();
    });
    
    it('should remove expired entries on has() check', async () => {
      cacheService.set('test-key', 'test-value');
      
      expect(cacheService.has('test-key')).toBe(true);
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      expect(cacheService.has('test-key')).toBe(false);
    });
  });
  
  describe('LRU Eviction', () => {
    it('should evict oldest entry when cache is full', () => {
      // Fill cache to max size (5)
      cacheService.set('key1', 'value1');
      cacheService.set('key2', 'value2');
      cacheService.set('key3', 'value3');
      cacheService.set('key4', 'value4');
      cacheService.set('key5', 'value5');
      
      // All entries should exist
      expect(cacheService.has('key1')).toBe(true);
      expect(cacheService.has('key5')).toBe(true);
      
      // Add one more entry (should evict key1)
      cacheService.set('key6', 'value6');
      
      // key1 should be evicted (oldest)
      expect(cacheService.has('key1')).toBe(false);
      expect(cacheService.has('key6')).toBe(true);
    });
    
    it('should track hit counts', () => {
      cacheService.set('test-key', 'test-value');
      
      // Access the key multiple times
      cacheService.get('test-key');
      cacheService.get('test-key');
      cacheService.get('test-key');
      
      const stats = cacheService.getStats();
      
      // Should have 3 hits
      expect(stats.hitRate).toBeGreaterThan(0);
    });
  });
  
  describe('localStorage Persistence', () => {
    it('should save cache to localStorage', () => {
      cacheService.set('test-key', 'test-value');
      
      const stored = localStorage.getItem('test-cache');
      expect(stored).toBeTruthy();
      
      const parsed = JSON.parse(stored!);
      expect(parsed.entries['test-key']).toBeDefined();
      expect(parsed.entries['test-key'].data).toBe('test-value');
    });
    
    it('should load cache from localStorage on init', () => {
      // Set up initial cache
      cacheService.set('key1', 'value1');
      cacheService.set('key2', 'value2');
      
      // Create new instance (should load from localStorage)
      const newCache = new CacheService({
        maxSize: 5,
        ttl: 1000,
        persistToLocalStorage: true,
        storageKey: 'test-cache',
      });
      
      // Values should be loaded
      expect(newCache.get('key1')).toBe('value1');
      expect(newCache.get('key2')).toBe('value2');
    });
    
    it('should clear expired entries on load', async () => {
      // Set up cache with short TTL
      cacheService.set('key1', 'value1');
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      // Create new instance (should clear expired entries)
      const newCache = new CacheService({
        maxSize: 5,
        ttl: 1000,
        persistToLocalStorage: true,
        storageKey: 'test-cache',
      });
      
      // Expired entry should not be loaded
      expect(newCache.get('key1')).toBeNull();
    });
    
    it('should handle corrupted localStorage data', () => {
      // Set invalid JSON in localStorage
      localStorage.setItem('test-cache', 'invalid json {');
      
      // Should not throw, should start with empty cache
      const newCache = new CacheService({
        maxSize: 5,
        ttl: 1000,
        persistToLocalStorage: true,
        storageKey: 'test-cache',
      });
      
      const stats = newCache.getStats();
      expect(stats.size).toBe(0);
    });
    
    it('should work without localStorage persistence', () => {
      const memoryCache = new CacheService({
        maxSize: 5,
        ttl: 1000,
        persistToLocalStorage: false,
        storageKey: 'test-cache',
      });
      
      memoryCache.set('test-key', 'test-value');
      
      // Should work in memory
      expect(memoryCache.get('test-key')).toBe('test-value');
      
      // Should not save to localStorage
      const stored = localStorage.getItem('test-cache');
      expect(stored).toBeNull();
    });
  });
  
  describe('Statistics', () => {
    it('should calculate hit rate correctly', () => {
      cacheService.set('key1', 'value1');
      cacheService.set('key2', 'value2');
      
      // 2 hits
      cacheService.get('key1');
      cacheService.get('key2');
      
      // 1 miss
      cacheService.get('non-existent');
      
      const stats = cacheService.getStats();
      
      // Hit rate should be 2/3 = 0.666...
      expect(stats.hitRate).toBeCloseTo(0.666, 2);
    });
    
    it('should return cache size', () => {
      cacheService.set('key1', 'value1');
      cacheService.set('key2', 'value2');
      cacheService.set('key3', 'value3');
      
      const stats = cacheService.getStats();
      expect(stats.size).toBe(3);
    });
    
    it('should track oldest entry timestamp', () => {
      const before = Date.now();
      
      cacheService.set('key1', 'value1');
      
      const after = Date.now();
      
      const stats = cacheService.getStats();
      
      // Oldest entry timestamp should be between before and after
      expect(stats.oldestEntry).toBeGreaterThanOrEqual(before);
      expect(stats.oldestEntry).toBeLessThanOrEqual(after);
    });
  });
  
  describe('Edge Cases', () => {
    it('should handle updating existing keys', () => {
      cacheService.set('test-key', 'value1');
      expect(cacheService.get('test-key')).toBe('value1');
      
      cacheService.set('test-key', 'value2');
      expect(cacheService.get('test-key')).toBe('value2');
      
      // Should not increase cache size
      const stats = cacheService.getStats();
      expect(stats.size).toBe(1);
    });
    
    it('should handle complex data types', () => {
      const complexData = {
        nested: {
          array: [1, 2, 3],
          object: { key: 'value' },
        },
        date: new Date().toISOString(),
      };
      
      cacheService.set('complex', complexData);
      const retrieved = cacheService.get<typeof complexData>('complex');
      
      expect(retrieved).toEqual(complexData);
    });
    
    it('should handle empty cache statistics', () => {
      const stats = cacheService.getStats();
      
      expect(stats.size).toBe(0);
      expect(stats.hitRate).toBe(0);
    });
  });
});
