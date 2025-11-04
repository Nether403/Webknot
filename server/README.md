# WebKnot Backend API

Backend API server for WebKnot providing shared caching and data persistence.

## Features

- **Shared Cache**: Redis-based caching shared across all users
- **Cache Invalidation**: Automatic TTL-based expiration
- **Health Monitoring**: Health check endpoints for monitoring
- **Statistics**: Cache performance metrics and analytics

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Cache**: Upstash Redis (serverless)
- **Database**: Neon Postgres (for future features)

## Setup

### Prerequisites

- Node.js 18+ installed
- Upstash Redis account (free tier available)
- Neon Postgres account (free tier available)

### Installation

```bash
cd server
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your credentials:
```env
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
DATABASE_URL=your_postgres_url
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

The server will start on `http://localhost:3001`

### Production

Build and start the production server:

```bash
npm run build
npm start
```

## API Endpoints

### Health Check

```
GET /api/health
```

Returns server health status and service availability.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "redis": "up",
    "api": "up"
  }
}
```

### Cache Operations

#### Get Cache Entry

```
GET /api/cache?key={key}&type={type}
```

**Parameters:**
- `key`: Cache key (string)
- `type`: Cache type (`analysis`, `suggestions`, `enhancement`, `chat`)

**Response (Hit):**
```json
{
  "success": true,
  "message": "Cache hit",
  "data": { ... }
}
```

**Response (Miss):**
```json
{
  "success": false,
  "message": "Cache miss",
  "data": null
}
```

#### Set Cache Entry

```
POST /api/cache
Content-Type: application/json

{
  "key": "cache-key",
  "type": "analysis",
  "value": { ... },
  "ttl": 3600000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cache set successfully",
  "data": {
    "key": "cache:analysis:cache-key",
    "ttl": 3600000
  }
}
```

#### Delete Cache Entry

```
DELETE /api/cache?key={key}&type={type}
```

**Response:**
```json
{
  "success": true,
  "message": "Cache deleted successfully"
}
```

#### Clear Cache

```
POST /api/cache/clear
Content-Type: application/json

{
  "type": "all"
}
```

**Types:** `analysis`, `suggestions`, `enhancement`, `chat`, `all`

**Response:**
```json
{
  "success": true,
  "message": "Cleared 42 cache entries",
  "data": {
    "deletedCount": 42,
    "type": "all"
  }
}
```

#### Get Cache Statistics

```
GET /api/cache/stats
```

**Response:**
```json
{
  "success": true,
  "message": "Cache statistics retrieved",
  "data": {
    "totalKeys": 150,
    "hitRate": 0.85,
    "totalHits": 425,
    "totalMisses": 75,
    "lastUpdated": 1704067200000
  }
}
```

## Architecture

### Cache Strategy

1. **Client Request** → Frontend checks backend cache first
2. **Cache Hit** → Return cached data immediately
3. **Cache Miss** → Call Gemini API, cache result, return to client
4. **Fallback** → If backend unavailable, use client-side cache

### Cache Invalidation

- **TTL-based**: Entries expire after 1 hour (configurable)
- **Manual**: Clear cache via API endpoint
- **Type-specific**: Clear only specific cache types

### Performance

- **Redis**: Sub-millisecond response times
- **Shared**: All users benefit from cached responses
- **Reduced API Calls**: Significant cost savings on Gemini API

## Monitoring

### Health Checks

Monitor server health:
```bash
curl http://localhost:3001/api/health
```

### Cache Statistics

View cache performance:
```bash
curl http://localhost:3001/api/cache/stats
```

### Logs

Server logs include:
- Request/response timing
- Cache hits/misses
- Error details
- Health check results

## Deployment

### Environment Variables

Required for production:
- `NODE_ENV=production`
- `PORT=3001`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `DATABASE_URL`
- `ALLOWED_ORIGINS` (comma-separated)

### Recommended Platforms

- **Vercel**: Serverless deployment
- **Railway**: Container deployment
- **Fly.io**: Global edge deployment
- **Render**: Managed deployment

### Example Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd server
vercel
```

3. Set environment variables in Vercel dashboard

## Security

- **CORS**: Configured allowed origins
- **Rate Limiting**: Implemented at application level
- **Input Validation**: Zod schema validation
- **Error Handling**: Graceful error responses

## Future Enhancements

- [ ] User authentication
- [ ] Project persistence (Postgres)
- [ ] Analytics dashboard
- [ ] Cache warming strategies
- [ ] Advanced rate limiting
- [ ] WebSocket support for real-time updates

## License

MIT
