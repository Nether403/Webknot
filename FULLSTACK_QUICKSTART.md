# WebKnot Full Stack Quick Start

## Overview

WebKnot now has a backend API server for shared caching and data persistence. This guide will help you run both the frontend and backend together.

## Prerequisites

- Node.js 18+ installed
- Upstash Redis credentials (already configured)
- Neon Postgres credentials (already configured)

## Quick Start

### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd server
npm install
npm run dev
```

Backend will start on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

### Option 2: Frontend Only (Fallback Mode)

If you don't want to run the backend, the frontend will automatically fall back to client-side caching:

```bash
npm run dev
```

Set in `.env`:
```env
VITE_ENABLE_BACKEND_CACHE=false
```

## Verify Setup

### 1. Check Backend Health

```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-03T18:41:54.076Z",
  "services": {
    "redis": "up",
    "api": "up"
  }
}
```

### 2. Check Frontend

Open `http://localhost:5173` in your browser

### 3. Test Cache Integration

1. Open browser DevTools Console
2. Use the app (e.g., enter a project description)
3. Look for cache logs:
   - `[BackendCache] Backend cache hit` - Cache working!
   - `[BackendCache] Local cache hit` - Fallback working!

## Architecture

```
┌─────────────────────┐
│   Frontend (React)  │
│   Port: 5173        │
└──────────┬──────────┘
           │
           │ HTTP Requests
           ↓
┌─────────────────────┐
│   Backend (Express) │
│   Port: 3001        │
└──────────┬──────────┘
           │
           ├─→ Redis (Upstash)
           │   - Shared cache
           │   - Sub-ms latency
           │
           └─→ Postgres (Neon)
               - Future: User data
               - Future: Projects
```

## Environment Variables

### Frontend (.env)
```env
# Gemini AI
VITE_GEMINI_API_KEY=your_key_here

# Backend API
VITE_API_URL=http://localhost:3001
VITE_ENABLE_BACKEND_CACHE=true

# Feature Flags
VITE_AI_ENABLED=true
VITE_AI_RATE_LIMIT=20
```

### Backend (server/.env)
```env
# Server
PORT=3001
NODE_ENV=development

# Redis
UPSTASH_REDIS_REST_URL=https://working-ostrich-32833.upstash.io
UPSTASH_REDIS_REST_TOKEN=***

# Postgres
DATABASE_URL=postgresql://...

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Cache
CACHE_TTL=3600000
CACHE_MAX_SIZE=1000
```

## Common Issues

### Backend Won't Start

**Problem**: Port 3001 already in use

**Solution**:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <pid> /F

# Change port in server/.env
PORT=3002
```

### Frontend Can't Connect to Backend

**Problem**: CORS error or connection refused

**Solution**:
1. Verify backend is running: `curl http://localhost:3001/api/health`
2. Check `VITE_API_URL` in frontend `.env`
3. Check `ALLOWED_ORIGINS` in backend `.env`

### Redis Connection Failed

**Problem**: Backend shows "Redis: down"

**Solution**:
1. Verify Upstash credentials in `server/.env`
2. Check Upstash dashboard for service status
3. Test connection: `curl http://localhost:3001/api/health`

## Development Tips

### Monitor Cache Performance

```bash
# View cache statistics
curl http://localhost:3001/api/cache/stats

# Clear all caches
curl -X POST http://localhost:3001/api/cache/clear \
  -H "Content-Type: application/json" \
  -d '{"type":"all"}'
```

### Debug Mode

Enable detailed logging:

**Backend**: Already enabled in development mode

**Frontend**: Open DevTools Console, look for:
- `[BackendCache]` - Cache operations
- `[useGemini]` - AI operations
- `[GeminiService]` - API calls

### Hot Reload

Both servers support hot reload:
- **Backend**: `tsx watch` automatically restarts on file changes
- **Frontend**: Vite HMR updates instantly

## Production Deployment

### Backend Deployment

**Recommended**: Vercel, Railway, Fly.io, or Render

1. Push code to GitHub
2. Connect repository to platform
3. Set environment variables
4. Deploy

### Frontend Deployment

1. Update `VITE_API_URL` to production backend URL
2. Build: `npm run build`
3. Deploy `dist/` folder to Vercel, Netlify, etc.

## Next Steps

- [ ] Test the full stack locally
- [ ] Monitor cache hit rates
- [ ] Deploy backend to production
- [ ] Update frontend with production API URL
- [ ] Deploy frontend to production

## Support

For issues or questions:
1. Check `server/README.md` for backend details
2. Check `README.md` for frontend details
3. Review `TASK_20.1_COMPLETION_SUMMARY.md` for implementation details

## Success!

You're now running the full WebKnot stack with:
- ✅ Shared caching across users
- ✅ Reduced API costs
- ✅ Improved performance
- ✅ Automatic fallback to local cache
- ✅ Ready for production deployment
