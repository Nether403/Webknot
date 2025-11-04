/**
 * Service Worker for WebKnot
 * 
 * Provides offline support and caching for mobile optimization
 * Implements cache-first strategy for static assets and network-first for API calls
 */

const CACHE_VERSION = 'webknot-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const AI_CACHE = `${CACHE_VERSION}-ai`;

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Maximum cache sizes
const MAX_DYNAMIC_CACHE_SIZE = 50;
const MAX_AI_CACHE_SIZE = 100;

/**
 * Install event - cache static assets
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Service worker installed');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('webknot-') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE && name !== AI_CACHE)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

/**
 * Fetch event - implement caching strategies
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Handle different types of requests with appropriate strategies
  if (isStaticAsset(url)) {
    // Static assets: cache-first strategy
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (isAIRequest(url)) {
    // AI API requests: network-first with cache fallback
    event.respondWith(networkFirstWithCache(request, AI_CACHE, MAX_AI_CACHE_SIZE));
  } else if (isDynamicAsset(url)) {
    // Dynamic assets: stale-while-revalidate
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE));
  } else {
    // Default: network-first
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

/**
 * Cache-first strategy
 * Returns cached response if available, otherwise fetches from network
 */
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      console.log('[SW] Cache hit:', request.url);
      return cached;
    }
    
    console.log('[SW] Cache miss, fetching:', request.url);
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('[SW] Cache-first failed:', error);
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

/**
 * Network-first strategy with cache fallback
 * Tries network first, falls back to cache if offline
 */
async function networkFirstWithCache(request, cacheName, maxSize) {
  try {
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(cacheName);
      await cache.put(request, response.clone());
      await limitCacheSize(cacheName, maxSize);
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      console.log('[SW] Returning cached response');
      return cached;
    }
    
    console.error('[SW] No cached response available');
    return new Response(
      JSON.stringify({ error: 'Offline and no cached data available' }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * Network-first strategy
 * Tries network first, no cache fallback
 */
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(cacheName);
      await cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('[SW] Network request failed:', error);
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

/**
 * Stale-while-revalidate strategy
 * Returns cached response immediately, updates cache in background
 */
async function staleWhileRevalidate(request, cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  // Fetch fresh response in background
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
        limitCacheSize(cacheName, maxSize);
      }
      return response;
    })
    .catch((error) => {
      console.error('[SW] Background fetch failed:', error);
      return cached;
    });
  
  // Return cached response immediately if available
  return cached || fetchPromise;
}

/**
 * Limits cache size by removing oldest entries
 */
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    const toDelete = keys.length - maxSize;
    console.log(`[SW] Cache ${cacheName} exceeds max size, deleting ${toDelete} entries`);
    
    for (let i = 0; i < toDelete; i++) {
      await cache.delete(keys[i]);
    }
  }
}

/**
 * Checks if URL is a static asset
 */
function isStaticAsset(url) {
  const staticExtensions = ['.js', '.css', '.woff', '.woff2', '.ttf', '.eot', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico'];
  return staticExtensions.some(ext => url.pathname.endsWith(ext));
}

/**
 * Checks if URL is an AI API request
 */
function isAIRequest(url) {
  return url.pathname.includes('/api/gemini') || 
         url.pathname.includes('/api/cache') ||
         url.hostname.includes('generativelanguage.googleapis.com');
}

/**
 * Checks if URL is a dynamic asset
 */
function isDynamicAsset(url) {
  return url.pathname.includes('/api/') || url.pathname.includes('/data/');
}

/**
 * Message handler for cache management
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => caches.delete(name))
        );
      })
    );
  }
});
