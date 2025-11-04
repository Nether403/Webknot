/**
 * Health Check Routes
 * Provides health status for the API and its dependencies
 */

import { Router, Request, Response } from 'express';
import { checkRedisHealth } from '../services/redis.js';

const router = Router();

/**
 * GET /api/health
 * Basic health check
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const redisHealthy = await checkRedisHealth();
    
    const health = {
      status: redisHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        redis: redisHealthy ? 'up' : 'down',
        api: 'up',
      },
    };
    
    const statusCode = redisHealthy ? 200 : 503;
    
    return res.status(statusCode).json(health);
  } catch (error) {
    console.error('[Health] Health check failed:', error);
    
    return res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
