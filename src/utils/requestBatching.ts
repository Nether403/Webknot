/**
 * Request Batching and Debouncing Utilities
 * 
 * Reduces API calls by batching multiple requests and debouncing rapid user input
 * Improves performance and reduces costs
 */

/**
 * Debounces a function call, delaying execution until after a specified wait time
 * has elapsed since the last invocation
 * 
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function debounced(...args: Parameters<T>): void {
    // Clear existing timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * Debounces an async function, returning a promise that resolves with the result
 * Only the last call within the wait period will be executed
 * 
 * @param func - The async function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the async function
 */
export function debounceAsync<T extends (...args: unknown[]) => Promise<unknown>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let pendingPromise: {
    resolve: (value: ReturnType<T>) => void;
    reject: (reason: unknown) => void;
  } | null = null;
  
  return function debouncedAsync(...args: Parameters<T>): Promise<ReturnType<T>> {
    // Clear existing timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    
    // Reject previous pending promise if it exists
    if (pendingPromise) {
      pendingPromise.reject(new Error('Debounced: newer call superseded this one'));
    }
    
    // Create new promise
    return new Promise<ReturnType<T>>((resolve, reject) => {
      pendingPromise = { resolve, reject };
      
      // Set new timeout
      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args);
          if (pendingPromise) {
            pendingPromise.resolve(result as ReturnType<T>);
          }
        } catch (error) {
          if (pendingPromise) {
            pendingPromise.reject(error);
          }
        } finally {
          timeoutId = null;
          pendingPromise = null;
        }
      }, wait);
    });
  };
}

/**
 * Request queue for batching multiple API requests
 * Collects requests over a time window and executes them together
 */
export class RequestQueue<TRequest, TResponse> {
  private queue: Array<{
    request: TRequest;
    resolve: (value: TResponse) => void;
    reject: (reason: unknown) => void;
  }> = [];
  
  private flushTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private isProcessing = false;
  
  constructor(
    private batchProcessor: (requests: TRequest[]) => Promise<TResponse[]>,
    private flushDelay: number = 100,
    private maxBatchSize: number = 10
  ) {}
  
  /**
   * Adds a request to the queue
   * Returns a promise that resolves when the request is processed
   * 
   * @param request - The request to queue
   * @returns Promise that resolves with the response
   */
  enqueue(request: TRequest): Promise<TResponse> {
    return new Promise<TResponse>((resolve, reject) => {
      // Add to queue
      this.queue.push({ request, resolve, reject });
      
      // If queue is at max size, flush immediately
      if (this.queue.length >= this.maxBatchSize) {
        this.flush();
      } else {
        // Otherwise, schedule a flush
        this.scheduleFlush();
      }
    });
  }
  
  /**
   * Schedules a flush of the queue after the flush delay
   */
  private scheduleFlush(): void {
    // Clear existing timeout
    if (this.flushTimeoutId !== null) {
      clearTimeout(this.flushTimeoutId);
    }
    
    // Schedule new flush
    this.flushTimeoutId = setTimeout(() => {
      this.flush();
    }, this.flushDelay);
  }
  
  /**
   * Flushes the queue, processing all pending requests
   */
  private async flush(): Promise<void> {
    // Clear timeout
    if (this.flushTimeoutId !== null) {
      clearTimeout(this.flushTimeoutId);
      this.flushTimeoutId = null;
    }
    
    // If already processing or queue is empty, return
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }
    
    // Mark as processing
    this.isProcessing = true;
    
    // Get current queue and clear it
    const batch = this.queue.splice(0, this.queue.length);
    
    try {
      // Extract requests
      const requests = batch.map(item => item.request);
      
      // Process batch
      const responses = await this.batchProcessor(requests);
      
      // Resolve promises
      batch.forEach((item, index) => {
        if (responses[index] !== undefined) {
          item.resolve(responses[index]);
        } else {
          item.reject(new Error('No response for request'));
        }
      });
      
    } catch (error) {
      // Reject all promises on error
      batch.forEach(item => {
        item.reject(error);
      });
    } finally {
      this.isProcessing = false;
      
      // If more items were added while processing, schedule another flush
      if (this.queue.length > 0) {
        this.scheduleFlush();
      }
    }
  }
  
  /**
   * Returns the current queue size
   */
  size(): number {
    return this.queue.length;
  }
  
  /**
   * Clears the queue without processing
   */
  clear(): void {
    // Reject all pending promises
    this.queue.forEach(item => {
      item.reject(new Error('Queue cleared'));
    });
    
    // Clear queue
    this.queue = [];
    
    // Clear timeout
    if (this.flushTimeoutId !== null) {
      clearTimeout(this.flushTimeoutId);
      this.flushTimeoutId = null;
    }
  }
}

/**
 * Throttles a function, ensuring it's called at most once per specified interval
 * Unlike debounce, throttle guarantees execution at regular intervals
 * 
 * @param func - The function to throttle
 * @param interval - The minimum time between calls in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastCallTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function throttled(...args: Parameters<T>): void {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;
    
    // Clear any pending timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    
    if (timeSinceLastCall >= interval) {
      // Enough time has passed, call immediately
      func(...args);
      lastCallTime = now;
    } else {
      // Schedule call for when interval has elapsed
      const remainingTime = interval - timeSinceLastCall;
      timeoutId = setTimeout(() => {
        func(...args);
        lastCallTime = Date.now();
        timeoutId = null;
      }, remainingTime);
    }
  };
}
