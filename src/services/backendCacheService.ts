/**
 * Backend Cache Service
 * 
 * Provides caching with backend API integration
 * Falls back to client-side caching if backend is unavailable
 */

import { CacheService } from './cacheService';
import type { CacheEntry } from '../types/gemini';

export type CacheType = 'analysis' | 'suggestions' | 'enhancement' | 'chat';

export interface BackendCacheConfig {
  apiUrl: string;
  enableBackend: boolean;
  fallbackToLocal: boolean;
  timeout: number;
}

export class BackendCacheService {
  private localCache: CacheService;
  private config: BackendCacheConfig;
  private backendAvailable: boolean = true;
  private lastHealthCheck: number = 0;
  private healthCheckInterval: number = 60000; // Check every minute
  
  constructor(config?: Partial<BackendCacheConfig>) {
    this.config = {
      apiUrl: config?.apiUrl ?? 'http://localhost:3001/api/cache',
      enableBackend: config?.enableBackend ?? true,
      fallbackToLocal: config?.fallbackToLocal ?? true,
      timeout: config?.timeout ?? 5000,
    };
    
    // Initialize local cache as fallback
    this.localCache = new CacheService();
    
    // Check backend health on initialization
    this.checkBackendHealth();
  }
  
  /**
   * Checks if backend is available
   */
  private async checkBackendHealth(): Promise<boolean> {
    // Don't check too frequently
    if (Date.now() - this.lastHealthCheck < this.healthCheckInterval) {
      return this.backendAvailable;
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch(
        this.config.apiUrl.replace('/cache', '/health'),
        {
          signal: controller.signal,
        }
      );
      
      clearTimeout(timeoutId);
      
      this.backendAvailable = response.ok;
      this.lastHealthCheck = Date.now();
      
      if (!this.backendAvailable) {
        console.warn('[BackendCache] Backend health check failed');
      }
      
      return this.backendAvailable;
    } catch (error) {
      console.warn('[BackendCache] Backend unavailable:', error);
      this.backendAvailable = false;
      this.lastHealthCheck = Date.now();
      return false;
    }
  }
  
  /**
   * Generates a cache key from input
   */
  private generateKey(input: string): string {
    // Simple hash function for cache keys
    return input.trim().toLowerCase();
  }
  
  /**
   * Retrieves a value from cache (backend first, then local)
   */
  async get<T>(key: string, type: CacheType): Promise<T | null> {
    const cacheKey = this.generateKey(key);
    
    // Try backend cache first if enabled
    if (this.config.enableBackend && this.backendAvailable) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(
          `${this.config.apiUrl}?key=${encodeURIComponent(cacheKey)}&type=${type}`,
          {
            method: 'GET',
            signal: controller.signal,
          }
        );
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            console.log(`[BackendCache] Backend cache hit: ${type}:${cacheKey}`);
            
            // Also store in local cache for faster subsequent access
            if (this.config.fallbackToLocal) {
              this.localCache.set(cacheKey, result.data);
            }
            
            return result.data as T;
          }
        }
        
        // 404 means cache miss, not an error
        if (response.status !== 404) {
          console.warn('[BackendCache] Backend cache error:', response.status);
        }
      } catch (error) {
        console.warn('[BackendCache] Backend cache request failed:', error);
        this.backendAvailable = false;
      }
    }
    
    // Fallback to local cache
    if (this.config.fallbackToLocal) {
      const localValue = this.localCache.get<T>(cacheKey);
      if (localValue) {
        console.log(`[BackendCache] Local cache hit: ${type}:${cacheKey}`);
        return localValue;
      }
    }
    
    console.log(`[BackendCache] Cache miss: ${type}:${cacheKey}`);
    return null;
  }
  
  /**
   * Stores a value in cache (both backend and local)
   */
  async set<T>(key: string, type: CacheType, value: T, ttl?: number): Promise<void> {
    const cacheKey = this.generateKey(key);
    
    // Store in local cache immediately
    if (this.config.fallbackToLocal) {
      this.localCache.set(cacheKey, value);
    }
    
    // Try to store in backend cache
    if (this.config.enableBackend && this.backendAvailable) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(this.config.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: cacheKey,
            type,
            value,
            ttl,
          }),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          console.log(`[BackendCache] Stored in backend: ${type}:${cacheKey}`);
        } else {
          console.warn('[BackendCache] Failed to store in backend:', response.status);
        }
      } catch (error) {
        console.warn('[BackendCache] Backend cache set failed:', error);
        this.backendAvailable = false;
      }
    }
  }
  
  /**
   * Checks if a key exists in cache
   */
  async has(key: string, type: CacheType): Promise<boolean> {
    const value = await this.get(key, type);
    return value !== null;
  }
  
  /**
   * Clears all cache entries
   */
  async clear(type?: CacheType): Promise<void> {
    // Clear local cache
    if (this.config.fallbackToLocal) {
      this.localCache.clear();
    }
    
    // Clear backend cache
    if (this.config.enableBackend && this.backendAvailable) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(`${this.config.apiUrl}/clear`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: type || 'all',
          }),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          console.log('[BackendCache] Backend cache cleared');
        }
      } catch (error) {
        console.warn('[BackendCache] Failed to clear backend cache:', error);
      }
    }
  }
  
  /**
   * Gets cache statistics
   */
  async getStats(): Promise<{
    backend: any;
    local: any;
    backendAvailable: boolean;
  }> {
    const localStats = this.localCache.getStats();
    let backendStats = null;
    
    if (this.config.enableBackend && this.backendAvailable) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(`${this.config.apiUrl}/stats`, {
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const result = await response.json();
          backendStats = result.data;
        }
      } catch (error) {
        console.warn('[BackendCache] Failed to get backend stats:', error);
      }
    }
    
    return {
      backend: backendStats,
      local: localStats,
      backendAvailable: this.backendAvailable,
    };
  }
  
  /**
   * Pre-warms the cache with common entries
   */
  warm<T>(entries: Array<{ key: string; type: CacheType; data: T }>): void {
    console.log(`[BackendCache] Warming cache with ${entries.length} entries`);
    
    // Warm local cache
    if (this.config.fallbackToLocal) {
      this.localCache.warm(
        entries.map(e => ({ key: this.generateKey(e.key), data: e.data }))
      );
    }
    
    // Warm backend cache (fire and forget)
    if (this.config.enableBackend && this.backendAvailable) {
      entries.forEach(entry => {
        this.set(entry.key, entry.type, entry.data).catch(err => {
          console.warn('[BackendCache] Failed to warm backend cache:', err);
        });
      });
    }
  }
}

// Singleton instance
let backendCacheInstance: BackendCacheService | null = null;

/**
 * Gets the singleton backend cache service instance
 */
export function getBackendCacheService(): BackendCacheService {
  if (!backendCacheInstance) {
    backendCacheInstance = new BackendCacheService({
      apiUrl: import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/api/cache`
        : 'http://localhost:3001/api/cache',
      enableBackend: import.meta.env.VITE_ENABLE_BACKEND_CACHE !== 'false',
      fallbackToLocal: true,
      timeout: 5000,
    });
  }
  
  return backendCacheInstance;
}
