# Caching Strategy Documentation

## Overview

LovaBolt's caching system is designed to minimize API calls, reduce costs, and provide instant responses for repeated requests. The caching layer uses an in-memory Map with localStorage persistence and LRU (Least Recently Used) eviction.

**Location:** `src/services/cacheService.ts`

## Architecture

```
┌─────────────────────────────────────────────┐
│           Application Layer                  │
│  (useGemini hook, Components)               │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│          Cache Service                       │
│  ┌─────────────────────────────────────┐   │
│  │   In-Memory Map Cache                │   │
│  │   (Fast access, <50ms)               │   │
│  └─────────────────────────────────────┘   │
│                   │                          │
│                   ▼                          │
│  ┌─────────────────────────────────────┐   │
│  │   localStorage Persistence           │   │
│  │   (Survives page reloads)            │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

## Cache Configuration

### Default Settings

```typescript
interface CacheConfig {
  maxSize: number;              // 100 entries
  ttl: number;                  // 3600000ms (1 hour)
  persistToLocalStorage: boolean; // true
  storageKey: string;           // 'lovabolt-gemini-cache'
}
```

### Customization

```typescript
import { CacheService } from './services/cacheService';

const cache = new CacheService({
  maxSize: 200,           // Increase cache size
  ttl: 7200000,          // 2 hours
  persistToLocalStorage: true,
  storageKey: 'my-custom-cache-key'
});
```

## Cache Entry Structure

```typescript
interface CacheEntry<T> {
  data: T;                // The cached response
  timestamp: number;      // When entry was created
  expiresAt: number;      // When entry expires
  hits: number;           // Number of times accessed
}
```

## Core Operations

### get()

Retrieves a cached value if it exists and hasn't expired.

```typescript
get<T>(key: string): T | null
```

**Example:**

```typescript
const cache = new CacheService();

// Try to get cached value
const cached = cache.get<ProjectAnalysis>('analysis:portfolio-site');

if (cached) {
  console.log('Cache hit!', cached);
  return cached;
} else {
  console.log('Cache miss, calling API...');
  const result = await callAPI();
  cache.set('analysis:portfolio-site', result);
  return result;
}
```

**Behavior:**
- Returns `null` if key doesn't exist
- Returns `null` if entry has expired
- Increments hit count on successful retrieval
- Removes expired entries automatically

### set()

Stores a value in the cache with automatic expiration.

```typescript
set<T>(key: string, data: T): void
```

**Example:**

```typescript
const cache = new CacheService();

// Store API response
const analysis = await geminiService.analyzeProject(description);
cache.set('analysis:' + description, analysis);

// Entry will expire after 1 hour (default TTL)
```

**Behavior:**
- Evicts oldest entry if cache is full (maxSize reached)
- Sets expiration time based on TTL
- Persists to localStorage if enabled
- Overwrites existing entry with same key

### has()

Checks if a key exists in the cache (without retrieving it).

```typescript
has(key: string): boolean
```

**Example:**

```typescript
if (cache.has('analysis:portfolio-site')) {
  console.log('Cache contains this key');
}
```

### clear()

Removes all entries from the cache.

```typescript
clear(): void
```

**Example:**

```typescript
// Clear cache when user resets project
const handleReset = () => {
  cache.clear();
  resetWizardState();
};
```

## Cache Key Generation

### Key Format

Use descriptive, consistent key formats:

```typescript
// Format: {operation}:{hash(input)}
'analysis:portfolio-site'
'suggestions:minimalist-ocean-breeze'
'enhancement:basic-prompt-v1'
'chat:what-is-glassmorphism'
```

### Key Generation Helper

```typescript
function generateCacheKey(operation: string, input: string): string {
  // Simple hash function
  const hash = input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  return `${operation}:${hash}`;
}

// Usage
const key = generateCacheKey('analysis', userDescription);
const cached = cache.get(key);
```

### Advanced Key Generation

For complex inputs, use JSON serialization:

```typescript
function generateComplexKey(operation: string, data: object): string {
  const serialized = JSON.stringify(data);
  const hash = hashString(serialized); // Use a hash function
  return `${operation}:${hash}`;
}

// Usage
const key = generateComplexKey('suggestions', {
  designStyle: 'minimalist',
  colorTheme: 'ocean-breeze',
  components: ['carousel', 'accordion']
});
```

## LRU Eviction

When the cache reaches `maxSize`, the oldest entry is automatically removed.

### Eviction Algorithm

```typescript
private evictOldest(): void {
  let oldestKey: string | null = null;
  let oldestTime = Infinity;
  
  for (const [key, entry] of this.cache.entries()) {
    if (entry.timestamp < oldestTime) {
      oldestTime = entry.timestamp;
      oldestKey = key;
    }
  }
  
  if (oldestKey) {
    this.cache.delete(oldestKey);
  }
}
```

### Eviction Behavior

- Triggered when `cache.size >= maxSize`
- Removes entry with oldest `timestamp`
- Happens automatically during `set()` operations
- Does not consider `hits` (pure LRU, not LFU)

## localStorage Persistence

### Automatic Persistence

Cache is automatically saved to localStorage:

- **On set()** - After adding/updating entries
- **On clear()** - After clearing cache
- **On eviction** - After removing old entries

### Storage Format

```typescript
interface CacheStorage {
  entries: Record<string, CacheEntry<any>>;
  lastUpdate: number;
}
```

### Loading from Storage

Cache is automatically loaded on initialization:

```typescript
const cache = new CacheService();
// Automatically loads from localStorage
```

### Storage Errors

Handles localStorage quota errors gracefully:

```typescript
try {
  localStorage.setItem(key, value);
} catch (error) {
  console.error('Failed to save cache:', error);
  // Cache continues to work in-memory
}
```

## TTL (Time To Live)

### Default TTL

- **Project Analysis**: 1 hour (3600000ms)
- **Design Suggestions**: 30 minutes (1800000ms)
- **Prompt Enhancement**: 1 hour (3600000ms)
- **Chat Responses**: 5 minutes (300000ms)

### Custom TTL per Operation

```typescript
class SmartCacheService {
  private analysisCache: CacheService;
  private suggestionsCache: CacheService;
  private chatCache: CacheService;
  
  constructor() {
    this.analysisCache = new CacheService({
      maxSize: 100,
      ttl: 3600000  // 1 hour
    });
    
    this.suggestionsCache = new CacheService({
      maxSize: 50,
      ttl: 1800000  // 30 minutes
    });
    
    this.chatCache = new CacheService({
      maxSize: 20,
      ttl: 300000   // 5 minutes
    });
  }
  
  getCachedAnalysis(key: string) {
    return this.analysisCache.get(key);
  }
  
  getCachedSuggestions(key: string) {
    return this.suggestionsCache.get(key);
  }
  
  getCachedChat(key: string) {
    return this.chatCache.get(key);
  }
}
```

## Cache Statistics

### getStats()

Returns cache performance metrics.

```typescript
getStats(): {
  size: number;
  hitRate: number;
  oldestEntry: number;
}
```

**Example:**

```typescript
const stats = cache.getStats();

console.log('Cache size:', stats.size);
console.log('Hit rate:', (stats.hitRate * 100).toFixed(1) + '%');
console.log('Oldest entry age:', Date.now() - stats.oldestEntry, 'ms');
```

### Tracking Hit Rate

```typescript
class CacheWithMetrics extends CacheService {
  private hits = 0;
  private misses = 0;
  
  get<T>(key: string): T | null {
    const result = super.get<T>(key);
    
    if (result !== null) {
      this.hits++;
    } else {
      this.misses++;
    }
    
    return result;
  }
  
  getHitRate(): number {
    const total = this.hits + this.misses;
    return total > 0 ? this.hits / total : 0;
  }
}
```

## Integration with useGemini

### Automatic Caching

The `useGemini` hook automatically uses caching:

```typescript
const analyzeProject = useCallback(async (description: string) => {
  // Check cache first
  const cacheKey = `analysis:${description}`;
  const cached = cacheService.current.get(cacheKey);
  
  if (cached) {
    return cached; // <50ms cache hit
  }
  
  // Call API if not cached
  const result = await geminiService.current.analyzeProject(description);
  
  // Cache the result
  cacheService.current.set(cacheKey, result);
  
  return result;
}, []);
```

### Cache Control

```typescript
const { clearCache } = useGemini();

// Clear cache when needed
clearCache();
```

## Performance Optimization

### Cache Warming

Pre-cache common queries on app initialization:

```typescript
async function warmCache() {
  const commonDescriptions = [
    'portfolio website',
    'e-commerce store',
    'dashboard application',
    'mobile app',
    'blog website'
  ];
  
  for (const description of commonDescriptions) {
    const analysis = await geminiService.analyzeProject(description);
    cache.set(`analysis:${description}`, analysis);
  }
}

// Call on app init
warmCache();
```

### Batch Operations

Cache multiple results at once:

```typescript
async function batchAnalyze(descriptions: string[]) {
  const results = await Promise.all(
    descriptions.map(desc => geminiService.analyzeProject(desc))
  );
  
  descriptions.forEach((desc, index) => {
    cache.set(`analysis:${desc}`, results[index]);
  });
  
  return results;
}
```

## Best Practices

### DO:
✅ Use descriptive cache keys
✅ Set appropriate TTL for each operation type
✅ Clear cache when user resets project
✅ Monitor cache hit rate (target: >80%)
✅ Handle localStorage errors gracefully
✅ Use cache warming for common queries
✅ Implement cache statistics tracking
✅ Test cache behavior in tests

### DON'T:
❌ Cache sensitive user data
❌ Use cache for real-time data
❌ Set TTL too long (stale data)
❌ Set TTL too short (defeats purpose)
❌ Ignore cache size limits
❌ Skip cache key validation
❌ Cache error responses
❌ Forget to clear cache on logout

## Testing

### Unit Tests

```typescript
describe('CacheService', () => {
  let cache: CacheService;
  
  beforeEach(() => {
    cache = new CacheService({
      maxSize: 3,
      ttl: 1000
    });
  });
  
  it('should store and retrieve values', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });
  
  it('should return null for expired entries', async () => {
    cache.set('key1', 'value1');
    
    // Wait for expiration
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    expect(cache.get('key1')).toBeNull();
  });
  
  it('should evict oldest entry when full', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');
    cache.set('key4', 'value4'); // Triggers eviction
    
    expect(cache.get('key1')).toBeNull(); // Evicted
    expect(cache.get('key4')).toBe('value4'); // New entry
  });
  
  it('should persist to localStorage', () => {
    cache.set('key1', 'value1');
    
    // Create new instance (loads from storage)
    const newCache = new CacheService();
    
    expect(newCache.get('key1')).toBe('value1');
  });
});
```

### Integration Tests

```bash
npm test src/services/__tests__/cacheService.test.ts
```

## Monitoring

### Cache Metrics

Track these metrics in production:

```typescript
interface CacheMetrics {
  hits: number;
  misses: number;
  hitRate: number;
  size: number;
  evictions: number;
  averageAge: number;
}

function collectCacheMetrics(cache: CacheService): CacheMetrics {
  const stats = cache.getStats();
  
  return {
    hits: cache.hits,
    misses: cache.misses,
    hitRate: stats.hitRate,
    size: stats.size,
    evictions: cache.evictions,
    averageAge: calculateAverageAge(cache)
  };
}
```

### Logging

```typescript
// Log cache operations
cache.on('hit', (key) => {
  console.log('[Cache] Hit:', key);
});

cache.on('miss', (key) => {
  console.log('[Cache] Miss:', key);
});

cache.on('eviction', (key) => {
  console.log('[Cache] Evicted:', key);
});
```

## Troubleshooting

### Issue: Low cache hit rate

**Symptoms:** Hit rate <50%

**Solutions:**
1. Check cache key consistency
2. Increase TTL if appropriate
3. Implement cache warming
4. Review cache size limits

### Issue: localStorage quota exceeded

**Symptoms:** "QuotaExceededError" in console

**Solutions:**
1. Reduce cache size
2. Implement cache cleanup
3. Use shorter TTL
4. Clear old entries

### Issue: Stale data

**Symptoms:** Cached data is outdated

**Solutions:**
1. Reduce TTL
2. Implement cache invalidation
3. Clear cache on specific events
4. Use versioned cache keys

### Issue: Memory leaks

**Symptoms:** Memory usage grows over time

**Solutions:**
1. Ensure eviction is working
2. Check for circular references
3. Clear cache periodically
4. Monitor cache size

## Related Documentation

- **GeminiService API**: `docs/developer/GEMINI_SERVICE_API.md`
- **useGemini Hook**: `docs/developer/USE_GEMINI_HOOK.md`
- **Error Handling**: `docs/developer/ERROR_HANDLING_PATTERNS.md`
- **Service README**: `src/services/README.md`

## Support

For issues or questions:
- GitHub Issues: [github.com/yourusername/lovabolt/issues](https://github.com/yourusername/lovabolt/issues)
- Documentation: `.kiro/specs/gemini-ai-integration/`
- Standards: `.kiro/steering/gemini-ai-integration-standards.md`

---

**Last Updated:** November 4, 2025  
**Version:** 1.0.0  
**Maintainer:** LovaBolt Team
