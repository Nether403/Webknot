/**
 * Cache API Routes
 * Handles cache operations for Gemini AI responses
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import {
  getCache,
  setCache,
  deleteCache,
  clearCacheByPrefix,
  getCacheStats,
  CACHE_KEYS,
} from '../services/redis.js';
import { appConfig } from '../config.js';

const router = Router();

/**
 * Request validation schemas
 */
const getCacheSchema = z.object({
  key: z.string().min(1),
  type: z.enum(['analysis', 'suggestions', 'enhancement', 'chat']),
});

const setCacheSchema = z.object({
  key: z.string().min(1),
  type: z.enum(['analysis', 'suggestions', 'enhancement', 'chat']),
  value: z.any(),
  ttl: z.number().optional(),
});

const deleteCacheSchema = z.object({
  key: z.string().min(1),
  type: z.enum(['analysis', 'suggestions', 'enhancement', 'chat']),
});

const clearCacheSchema = z.object({
  type: z.enum(['analysis', 'suggestions', 'enhancement', 'chat', 'all']),
});

/**
 * Get cache key prefix based on type
 */
function getCachePrefix(type: string): string {
  switch (type) {
    case 'analysis':
      return CACHE_KEYS.ANALYSIS;
    case 'suggestions':
      return CACHE_KEYS.SUGGESTIONS;
    case 'enhancement':
      return CACHE_KEYS.ENHANCEMENT;
    case 'chat':
      return CACHE_KEYS.CHAT;
    default:
      throw new Error(`Invalid cache type: ${type}`);
  }
}

/**
 * GET /api/cache
 * Retrieve a cached value
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { key, type } = getCacheSchema.parse(req.query);
    
    const prefix = getCachePrefix(type);
    const fullKey = `${prefix}${key}`;
    
    const value = await getCache(fullKey);
    
    if (value === null) {
      return res.status(404).json({
        success: false,
        message: 'Cache miss',
        data: null,
      });
    }
    
    return res.json({
      success: true,
      message: 'Cache hit',
      data: value,
    });
  } catch (error) {
    console.error('[Cache API] GET error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request parameters',
        errors: error.errors,
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/cache
 * Store a value in cache
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { key, type, value, ttl } = setCacheSchema.parse(req.body);
    
    const prefix = getCachePrefix(type);
    const fullKey = `${prefix}${key}`;
    
    await setCache(fullKey, value, ttl || appConfig.cacheTtl);
    
    return res.json({
      success: true,
      message: 'Cache set successfully',
      data: {
        key: fullKey,
        ttl: ttl || appConfig.cacheTtl,
      },
    });
  } catch (error) {
    console.error('[Cache API] POST error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body',
        errors: error.errors,
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * DELETE /api/cache
 * Delete a cached value
 */
router.delete('/', async (req: Request, res: Response) => {
  try {
    const { key, type } = deleteCacheSchema.parse(req.query);
    
    const prefix = getCachePrefix(type);
    const fullKey = `${prefix}${key}`;
    
    await deleteCache(fullKey);
    
    return res.json({
      success: true,
      message: 'Cache deleted successfully',
    });
  } catch (error) {
    console.error('[Cache API] DELETE error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request parameters',
        errors: error.errors,
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/cache/clear
 * Clear cache entries by type
 */
router.post('/clear', async (req: Request, res: Response) => {
  try {
    const { type } = clearCacheSchema.parse(req.body);
    
    let deletedCount = 0;
    
    if (type === 'all') {
      // Clear all cache types
      const types = ['analysis', 'suggestions', 'enhancement', 'chat'];
      for (const t of types) {
        const prefix = getCachePrefix(t);
        deletedCount += await clearCacheByPrefix(prefix);
      }
    } else {
      const prefix = getCachePrefix(type);
      deletedCount = await clearCacheByPrefix(prefix);
    }
    
    return res.json({
      success: true,
      message: `Cleared ${deletedCount} cache entries`,
      data: {
        deletedCount,
        type,
      },
    });
  } catch (error) {
    console.error('[Cache API] CLEAR error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body',
        errors: error.errors,
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/cache/stats
 * Get cache statistics
 */
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await getCacheStats();
    
    return res.json({
      success: true,
      message: 'Cache statistics retrieved',
      data: stats,
    });
  } catch (error) {
    console.error('[Cache API] STATS error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
