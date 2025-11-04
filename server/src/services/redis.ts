/**
 * Redis Service
 * Handles connection and operations with Upstash Redis
 */

import { Redis } from '@upstash/redis';
import { appConfig } from '../config.js';

// Initialize Redis client
export const redis = new Redis({
  url: appConfig.upstashRedisUrl,
  token: appConfig.upstashRedisToken,
});

/**
 * Cache key prefixes for different data types
 */
export const CACHE_KEYS = {
  ANALYSIS: 'cache:analysis:',
  SUGGESTIONS: 'cache:suggestions:',
  ENHANCEMENT: 'cache:enhancement:',
  CHAT: 'cache:chat:',
  STATS: 'cache:stats',
} as const;

/**
 * Cache statistics interface
 */
export interface CacheStats {
  totalKeys: number;
  hitRate: number;
  totalHits: number;
  totalMisses: number;
  lastUpdated: number;
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<CacheStats> {
  try {
    const stats = await redis.get<CacheStats>(CACHE_KEYS.STATS);
    
    if (!stats) {
      return {
        totalKeys: 0,
        hitRate: 0,
        totalHits: 0,
        totalMisses: 0,
        lastUpdated: Date.now(),
      };
    }
    
    return stats;
  } catch (error) {
    console.error('[Redis] Failed to get cache stats:', error);
    throw error;
  }
}

/**
 * Update cache statistics
 */
export async function updateCacheStats(hit: boolean): Promise<void> {
  try {
    const stats = await getCacheStats();
    
    const updatedStats: CacheStats = {
      totalKeys: stats.totalKeys,
      hitRate: 0,
      totalHits: hit ? stats.totalHits + 1 : stats.totalHits,
      totalMisses: hit ? stats.totalMisses : stats.totalMisses + 1,
      lastUpdated: Date.now(),
    };
    
    // Calculate hit rate
    const totalRequests = updatedStats.totalHits + updatedStats.totalMisses;
    updatedStats.hitRate = totalRequests > 0 ? updatedStats.totalHits / totalRequests : 0;
    
    await redis.set(CACHE_KEYS.STATS, updatedStats);
  } catch (error) {
    console.error('[Redis] Failed to update cache stats:', error);
    // Don't throw - stats update failure shouldn't break the app
  }
}

/**
 * Get a value from cache
 */
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const value = await redis.get<T>(key);
    
    // Update stats
    await updateCacheStats(value !== null);
    
    if (value) {
      console.log(`[Redis] Cache hit: ${key}`);
    } else {
      console.log(`[Redis] Cache miss: ${key}`);
    }
    
    return value;
  } catch (error) {
    console.error(`[Redis] Failed to get cache for key ${key}:`, error);
    return null;
  }
}

/**
 * Set a value in cache with TTL
 */
export async function setCache<T>(
  key: string,
  value: T,
  ttlMs: number = appConfig.cacheTtl
): Promise<void> {
  try {
    // Convert TTL from milliseconds to seconds for Redis
    const ttlSeconds = Math.floor(ttlMs / 1000);
    
    await redis.set(key, value, { ex: ttlSeconds });
    
    console.log(`[Redis] Cache set: ${key} (TTL: ${ttlSeconds}s)`);
    
    // Update total keys count
    const stats = await getCacheStats();
    await redis.set(CACHE_KEYS.STATS, {
      ...stats,
      totalKeys: stats.totalKeys + 1,
      lastUpdated: Date.now(),
    });
  } catch (error) {
    console.error(`[Redis] Failed to set cache for key ${key}:`, error);
    throw error;
  }
}

/**
 * Delete a value from cache
 */
export async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key);
    console.log(`[Redis] Cache deleted: ${key}`);
  } catch (error) {
    console.error(`[Redis] Failed to delete cache for key ${key}:`, error);
    throw error;
  }
}

/**
 * Clear all cache entries with a specific prefix
 */
export async function clearCacheByPrefix(prefix: string): Promise<number> {
  try {
    // Scan for keys with the prefix
    const keys: string[] = [];
    let cursor = 0;
    
    do {
      const result = await redis.scan(cursor, { match: `${prefix}*`, count: 100 });
      cursor = result[0];
      keys.push(...result[1]);
    } while (cursor !== 0);
    
    if (keys.length === 0) {
      return 0;
    }
    
    // Delete all matching keys
    await redis.del(...keys);
    
    console.log(`[Redis] Cleared ${keys.length} cache entries with prefix: ${prefix}`);
    return keys.length;
  } catch (error) {
    console.error(`[Redis] Failed to clear cache with prefix ${prefix}:`, error);
    throw error;
  }
}

/**
 * Check if Redis connection is healthy
 */
export async function checkRedisHealth(): Promise<boolean> {
  try {
    await redis.ping();
    return true;
  } catch (error) {
    console.error('[Redis] Health check failed:', error);
    return false;
  }
}
