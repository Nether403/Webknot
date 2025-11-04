/**
 * Network Optimization Utilities
 * 
 * Provides utilities for optimizing network requests on slow connections
 * Implements adaptive loading, request prioritization, and bandwidth detection
 */

/**
 * Network connection types
 */
export type ConnectionType = 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';

/**
 * Network quality levels
 */
export type NetworkQuality = 'poor' | 'moderate' | 'good' | 'excellent';

/**
 * Gets the current network connection type
 */
export function getConnectionType(): ConnectionType {
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  
  if (!connection) {
    return 'unknown';
  }
  
  const effectiveType = connection.effectiveType;
  
  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return effectiveType;
  }
  
  if (effectiveType === '3g') {
    return '3g';
  }
  
  if (effectiveType === '4g') {
    return '4g';
  }
  
  return 'unknown';
}

/**
 * Gets the network quality based on connection type and RTT
 */
export function getNetworkQuality(): NetworkQuality {
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  
  if (!connection) {
    return 'good'; // Assume good if we can't detect
  }
  
  const effectiveType = connection.effectiveType;
  const rtt = connection.rtt || 0;
  const downlink = connection.downlink || 10;
  
  // Poor: slow-2g, 2g, or high RTT
  if (effectiveType === 'slow-2g' || effectiveType === '2g' || rtt > 1000) {
    return 'poor';
  }
  
  // Moderate: 3g or moderate RTT
  if (effectiveType === '3g' || rtt > 500 || downlink < 1.5) {
    return 'moderate';
  }
  
  // Excellent: 4g with low RTT and high bandwidth
  if (effectiveType === '4g' && rtt < 100 && downlink > 5) {
    return 'excellent';
  }
  
  // Good: default
  return 'good';
}

/**
 * Checks if the connection is slow
 */
export function isSlowConnection(): boolean {
  const quality = getNetworkQuality();
  return quality === 'poor' || quality === 'moderate';
}

/**
 * Checks if data saver mode is enabled
 */
export function isDataSaverEnabled(): boolean {
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  
  return connection?.saveData === true;
}

/**
 * Gets recommended timeout based on network quality
 */
export function getAdaptiveTimeout(baseTimeout: number = 5000): number {
  const quality = getNetworkQuality();
  
  switch (quality) {
    case 'poor':
      return baseTimeout * 3; // 15s for poor connections
    case 'moderate':
      return baseTimeout * 2; // 10s for moderate connections
    case 'good':
      return baseTimeout * 1.5; // 7.5s for good connections
    case 'excellent':
      return baseTimeout; // 5s for excellent connections
    default:
      return baseTimeout;
  }
}

/**
 * Gets recommended chunk size for progressive loading
 */
export function getAdaptiveChunkSize(): number {
  const quality = getNetworkQuality();
  
  switch (quality) {
    case 'poor':
      return 5; // Load 5 items at a time
    case 'moderate':
      return 10; // Load 10 items at a time
    case 'good':
      return 20; // Load 20 items at a time
    case 'excellent':
      return 50; // Load 50 items at a time
    default:
      return 20;
  }
}

/**
 * Determines if images should be loaded based on network quality
 */
export function shouldLoadImages(): boolean {
  if (isDataSaverEnabled()) {
    return false;
  }
  
  const quality = getNetworkQuality();
  return quality !== 'poor';
}

/**
 * Determines if animations should be enabled based on network quality
 */
export function shouldEnableAnimations(): boolean {
  if (isDataSaverEnabled()) {
    return false;
  }
  
  const quality = getNetworkQuality();
  return quality === 'good' || quality === 'excellent';
}

/**
 * Compresses data before sending over network
 */
export async function compressData(data: string): Promise<Blob> {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(data);
  
  // Use CompressionStream if available (modern browsers)
  if ('CompressionStream' in window) {
    const stream = new Blob([uint8Array]).stream();
    const compressedStream = stream.pipeThrough(
      new (window as any).CompressionStream('gzip')
    );
    return new Response(compressedStream).blob();
  }
  
  // Fallback: return uncompressed
  return new Blob([uint8Array]);
}

/**
 * Decompresses data received from network
 */
export async function decompressData(blob: Blob): Promise<string> {
  // Use DecompressionStream if available (modern browsers)
  if ('DecompressionStream' in window) {
    const stream = blob.stream();
    const decompressedStream = stream.pipeThrough(
      new (window as any).DecompressionStream('gzip')
    );
    const decompressedBlob = await new Response(decompressedStream).blob();
    return await decompressedBlob.text();
  }
  
  // Fallback: assume uncompressed
  return await blob.text();
}

/**
 * Prioritizes requests based on importance
 */
export interface RequestPriority {
  url: string;
  priority: 'high' | 'medium' | 'low';
  timeout?: number;
}

/**
 * Request queue for managing prioritized requests
 */
class RequestQueue {
  private highPriority: RequestPriority[] = [];
  private mediumPriority: RequestPriority[] = [];
  private lowPriority: RequestPriority[] = [];
  private processing = false;
  
  /**
   * Adds a request to the queue
   */
  add(request: RequestPriority): void {
    switch (request.priority) {
      case 'high':
        this.highPriority.push(request);
        break;
      case 'medium':
        this.mediumPriority.push(request);
        break;
      case 'low':
        this.lowPriority.push(request);
        break;
    }
    
    this.process();
  }
  
  /**
   * Processes requests in priority order
   */
  private async process(): Promise<void> {
    if (this.processing) {
      return;
    }
    
    this.processing = true;
    
    while (this.hasRequests()) {
      const request = this.getNextRequest();
      
      if (request) {
        try {
          await this.executeRequest(request);
        } catch (error) {
          console.error('[NetworkOptimization] Request failed:', error);
        }
      }
    }
    
    this.processing = false;
  }
  
  /**
   * Checks if there are pending requests
   */
  private hasRequests(): boolean {
    return (
      this.highPriority.length > 0 ||
      this.mediumPriority.length > 0 ||
      this.lowPriority.length > 0
    );
  }
  
  /**
   * Gets the next request to process (highest priority first)
   */
  private getNextRequest(): RequestPriority | null {
    if (this.highPriority.length > 0) {
      return this.highPriority.shift()!;
    }
    
    if (this.mediumPriority.length > 0) {
      return this.mediumPriority.shift()!;
    }
    
    if (this.lowPriority.length > 0) {
      return this.lowPriority.shift()!;
    }
    
    return null;
  }
  
  /**
   * Executes a request
   */
  private async executeRequest(request: RequestPriority): Promise<void> {
    const timeout = request.timeout || getAdaptiveTimeout();
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      await fetch(request.url, { signal: controller.signal });
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

// Singleton instance
let requestQueue: RequestQueue | null = null;

/**
 * Gets the request queue instance
 */
export function getRequestQueue(): RequestQueue {
  if (!requestQueue) {
    requestQueue = new RequestQueue();
  }
  return requestQueue;
}

/**
 * Monitors network quality changes
 */
export function monitorNetworkQuality(
  callback: (quality: NetworkQuality) => void
): () => void {
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  
  if (!connection) {
    return () => {}; // No-op cleanup
  }
  
  const handler = () => {
    const quality = getNetworkQuality();
    callback(quality);
  };
  
  connection.addEventListener('change', handler);
  
  // Return cleanup function
  return () => {
    connection.removeEventListener('change', handler);
  };
}

/**
 * Gets network information for debugging
 */
export function getNetworkInfo(): {
  type: ConnectionType;
  quality: NetworkQuality;
  rtt: number;
  downlink: number;
  saveData: boolean;
  online: boolean;
} {
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  
  return {
    type: getConnectionType(),
    quality: getNetworkQuality(),
    rtt: connection?.rtt || 0,
    downlink: connection?.downlink || 0,
    saveData: connection?.saveData || false,
    online: navigator.onLine,
  };
}
