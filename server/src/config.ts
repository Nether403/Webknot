/**
 * Server Configuration
 * Loads and validates environment variables
 */

import { config } from 'dotenv';
import { z } from 'zod';

// Load environment variables
config();

// Configuration schema
const configSchema = z.object({
  port: z.number().default(3001),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  
  // Redis configuration (optional)
  upstashRedisUrl: z.string().url().optional(),
  upstashRedisToken: z.string().min(1).optional(),
  
  // Postgres configuration
  databaseUrl: z.string().url(),

  // AI Configuration
  geminiApiKey: z.string().min(1, "GEMINI_API_KEY is required"),
  
  // CORS configuration
  allowedOrigins: z.string().transform(str => str.split(',')),
  
  // Cache configuration
  cacheTtl: z.number().default(3600000), // 1 hour
  cacheMaxSize: z.number().default(1000),
});

// Parse and validate configuration
export const appConfig = configSchema.parse({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  upstashRedisUrl: process.env.UPSTASH_REDIS_REST_URL,
  upstashRedisToken: process.env.UPSTASH_REDIS_REST_TOKEN,
  databaseUrl: process.env.DATABASE_URL,
  geminiApiKey: process.env.GEMINI_API_KEY,
  allowedOrigins: process.env.ALLOWED_ORIGINS || 'http://localhost:5173',
  cacheTtl: process.env.CACHE_TTL ? parseInt(process.env.CACHE_TTL, 10) : 3600000,
  cacheMaxSize: process.env.CACHE_MAX_SIZE ? parseInt(process.env.CACHE_MAX_SIZE, 10) : 1000,
});

export type AppConfig = z.infer<typeof configSchema>;
