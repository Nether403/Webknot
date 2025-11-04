/**
 * Service Worker Registration Utility
 * 
 * Handles registration, updates, and lifecycle management of the service worker
 * Provides offline support and caching for mobile optimization
 */

export interface ServiceWorkerConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onOffline?: () => void;
  onOnline?: () => void;
}

/**
 * Registers the service worker
 * 
 * @param config - Configuration callbacks for SW lifecycle events
 */
export function registerServiceWorker(config?: ServiceWorkerConfig): void {
  // Only register in production and if service workers are supported
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${import.meta.env.BASE_URL}sw.js`;
      
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('[SW] Service worker registered:', registration);
          
          // Check for updates periodically (every hour)
          setInterval(() => {
            registration.update();
          }, 3600000);
          
          // Handle updates
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New update available
                    console.log('[SW] New content available, please refresh');
                    
                    if (config?.onUpdate) {
                      config.onUpdate(registration);
                    }
                  } else {
                    // Content cached for offline use
                    console.log('[SW] Content cached for offline use');
                    
                    if (config?.onSuccess) {
                      config.onSuccess(registration);
                    }
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.error('[SW] Service worker registration failed:', error);
        });
      
      // Listen for online/offline events
      window.addEventListener('online', () => {
        console.log('[SW] Back online');
        if (config?.onOnline) {
          config.onOnline();
        }
      });
      
      window.addEventListener('offline', () => {
        console.log('[SW] Gone offline');
        if (config?.onOffline) {
          config.onOffline();
        }
      });
    });
  }
}

/**
 * Unregisters the service worker
 */
export function unregisterServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('[SW] Service worker unregistered');
      })
      .catch((error) => {
        console.error('[SW] Service worker unregistration failed:', error);
      });
  }
}

/**
 * Checks if the app is running in standalone mode (installed as PWA)
 */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

/**
 * Checks if the device is online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Prompts user to install the PWA
 */
export function promptInstall(): void {
  const deferredPrompt = (window as any).deferredPrompt;
  
  if (deferredPrompt) {
    deferredPrompt.prompt();
    
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('[SW] User accepted the install prompt');
      } else {
        console.log('[SW] User dismissed the install prompt');
      }
      
      (window as any).deferredPrompt = null;
    });
  }
}

/**
 * Clears all service worker caches
 */
export async function clearServiceWorkerCaches(): Promise<void> {
  if ('serviceWorker' in navigator && 'caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((name) => caches.delete(name))
    );
    console.log('[SW] All caches cleared');
  }
}

/**
 * Gets cache statistics
 */
export async function getCacheStats(): Promise<{
  cacheNames: string[];
  totalSize: number;
  itemCount: number;
}> {
  if (!('caches' in window)) {
    return { cacheNames: [], totalSize: 0, itemCount: 0 };
  }
  
  const cacheNames = await caches.keys();
  let totalSize = 0;
  let itemCount = 0;
  
  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    itemCount += keys.length;
    
    // Estimate size (rough approximation)
    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return {
    cacheNames,
    totalSize,
    itemCount,
  };
}
