/**
 * WebKnot Backend API Server
 * Provides caching and data persistence for the WebKnot application
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { appConfig } from './config.js';
import cacheRoutes from './routes/cache.js';
import healthRoutes from './routes/health.js';

// Initialize Express app
const app: Express = express();

// Middleware
app.use(cors({
  origin: appConfig.allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
    );
  });
  
  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/cache', cacheRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'WebKnot API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      cache: '/api/cache',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Server] Unhandled error:', err);
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: appConfig.nodeEnv === 'development' ? err.message : undefined,
  });
});

// Start server
const server = app.listen(appConfig.port, () => {
  console.log(`
╔════════════════════════════════════════╗
║       WebKnot API Server               ║
╠════════════════════════════════════════╣
║ Status:      Running                   ║
║ Port:        ${appConfig.port}                      ║
║ Environment: ${appConfig.nodeEnv.padEnd(11)}        ║
║ Redis:       Connected                 ║
╚════════════════════════════════════════╝

API Endpoints:
  - Health:  http://localhost:${appConfig.port}/api/health
  - Cache:   http://localhost:${appConfig.port}/api/cache
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('[Server] Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[Server] SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('[Server] Server closed');
    process.exit(0);
  });
});

export default app;
