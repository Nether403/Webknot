/**
 * Progressive Loading Utilities
 * 
 * Implements progressive loading strategies for better mobile performance
 * Loads content in chunks based on network quality and viewport visibility
 */

import { getAdaptiveChunkSize, isSlowConnection } from './networkOptimization';

/**
 * Progressive loading configuration
 */
export interface ProgressiveLoadConfig<T> {
  items: T[];
  chunkSize?: number;
  onChunkLoaded?: (chunk: T[], startIndex: number, endIndex: number) => void;
  onComplete?: () => void;
  delay?: number;
}

/**
 * Loads items progressively in chunks
 * Adapts chunk size based on network quality
 */
export async function loadProgressively<T>(
  config: ProgressiveLoadConfig<T>
): Promise<T[]> {
  const {
    items,
    chunkSize = getAdaptiveChunkSize(),
    onChunkLoaded,
    onComplete,
    delay = isSlowConnection() ? 100 : 50,
  } = config;
  
  const loadedItems: T[] = [];
  let currentIndex = 0;
  
  while (currentIndex < items.length) {
    const endIndex = Math.min(currentIndex + chunkSize, items.length);
    const chunk = items.slice(currentIndex, endIndex);
    
    loadedItems.push(...chunk);
    
    if (onChunkLoaded) {
      onChunkLoaded(chunk, currentIndex, endIndex);
    }
    
    currentIndex = endIndex;
    
    // Add delay between chunks to avoid blocking UI
    if (currentIndex < items.length) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  
  if (onComplete) {
    onComplete();
  }
  
  return loadedItems;
}

/**
 * Lazy loads images when they enter the viewport
 */
export function lazyLoadImage(
  img: HTMLImageElement,
  src: string,
  options?: IntersectionObserverInit
): () => void {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: load immediately
    img.src = src;
    return () => {};
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px', // Start loading 50px before entering viewport
      ...options,
    }
  );
  
  observer.observe(img);
  
  // Return cleanup function
  return () => {
    observer.unobserve(img);
    observer.disconnect();
  };
}

/**
 * Preloads critical resources
 */
export function preloadResource(
  url: string,
  type: 'script' | 'style' | 'image' | 'font'
): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  
  switch (type) {
    case 'script':
      link.as = 'script';
      break;
    case 'style':
      link.as = 'style';
      break;
    case 'image':
      link.as = 'image';
      break;
    case 'font':
      link.as = 'font';
      link.crossOrigin = 'anonymous';
      break;
  }
  
  document.head.appendChild(link);
}

/**
 * Defers non-critical scripts
 */
export function deferScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

/**
 * Implements virtual scrolling for large lists
 */
export interface VirtualScrollConfig<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  onRender: (visibleItems: T[], startIndex: number, endIndex: number) => void;
}

export class VirtualScroller<T> {
  private config: VirtualScrollConfig<T>;
  private scrollTop = 0;
  
  constructor(config: VirtualScrollConfig<T>) {
    this.config = config;
  }
  
  /**
   * Updates scroll position and renders visible items
   */
  onScroll(scrollTop: number): void {
    this.scrollTop = scrollTop;
    this.render();
  }
  
  /**
   * Renders only visible items
   */
  private render(): void {
    const {
      items,
      itemHeight,
      containerHeight,
      overscan = 3,
      onRender,
    } = this.config;
    
    const startIndex = Math.max(
      0,
      Math.floor(this.scrollTop / itemHeight) - overscan
    );
    
    const endIndex = Math.min(
      items.length,
      Math.ceil((this.scrollTop + containerHeight) / itemHeight) + overscan
    );
    
    const visibleItems = items.slice(startIndex, endIndex);
    onRender(visibleItems, startIndex, endIndex);
  }
  
  /**
   * Gets total height of all items
   */
  getTotalHeight(): number {
    return this.config.items.length * this.config.itemHeight;
  }
  
  /**
   * Gets offset for visible items
   */
  getOffset(startIndex: number): number {
    return startIndex * this.config.itemHeight;
  }
}

/**
 * Implements code splitting with dynamic imports
 */
export async function loadComponent<T>(
  importFn: () => Promise<{ default: T }>
): Promise<T> {
  try {
    const module = await importFn();
    return module.default;
  } catch (error) {
    console.error('[ProgressiveLoading] Failed to load component:', error);
    throw error;
  }
}

/**
 * Batches DOM updates using requestAnimationFrame
 */
export function batchDOMUpdates(callback: () => void): void {
  requestAnimationFrame(() => {
    callback();
  });
}

/**
 * Throttles function execution
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        func.apply(this, args);
      }, delay - (now - lastCall));
    }
  };
}

/**
 * Debounces function execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Measures performance of a function
 */
export async function measurePerformance<T>(
  name: string,
  fn: () => Promise<T> | T
): Promise<T> {
  const start = performance.now();
  
  try {
    const result = await fn();
    const duration = performance.now() - start;
    
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
    
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`[Performance] ${name} failed after ${duration.toFixed(2)}ms:`, error);
    throw error;
  }
}

/**
 * Implements idle callback for non-critical work
 */
export function runWhenIdle(callback: () => void, timeout: number = 2000): void {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout });
  } else {
    // Fallback: use setTimeout
    setTimeout(callback, 1);
  }
}
