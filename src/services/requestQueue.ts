/**
 * Request Queue Service
 * 
 * Implements request queuing for AI API calls during high load
 * Prioritizes premium users and implements fair scheduling
 * 
 * Requirements:
 * - 20.2: Queue requests during high load
 * - 20.2: Prioritize premium users
 * - 20.2: Implement fair scheduling
 * - 20.2: Show queue position to users
 * - 7.5: Premium tier benefits
 */

import { isPremiumUser } from '../utils/premiumTier';

export type RequestPriority = 'high' | 'normal';
export type RequestStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface QueuedRequest<T = unknown> {
  id: string;
  operation: () => Promise<T>;
  priority: RequestPriority;
  userId: string;
  timestamp: number;
  status: RequestStatus;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
  retries: number;
  maxRetries: number;
}

export interface QueueConfig {
  maxConcurrent: number; // Maximum concurrent requests
  maxQueueSize: number; // Maximum queue size
  requestTimeout: number; // Timeout for individual requests (ms)
  enablePriorityQueue: boolean; // Whether to prioritize premium users
}

export interface QueueStats {
  queueSize: number;
  processing: number;
  completed: number;
  failed: number;
  averageWaitTime: number;
  position?: number; // User's position in queue
}

/**
 * Request Queue Service
 * Manages queuing and execution of AI requests with priority support
 */
export class RequestQueue {
  private config: QueueConfig;
  private queue: QueuedRequest[] = [];
  private processing: Set<string> = new Set();
  private completed: Map<string, { timestamp: number; success: boolean }> = new Map();
  private waitTimes: number[] = [];
  private nextRequestId = 0;
  
  constructor(config: Partial<QueueConfig> = {}) {
    this.config = {
      maxConcurrent: config.maxConcurrent ?? 3, // Process 3 requests concurrently
      maxQueueSize: config.maxQueueSize ?? 50, // Max 50 queued requests
      requestTimeout: config.requestTimeout ?? 30000, // 30 second timeout
      enablePriorityQueue: config.enablePriorityQueue ?? true,
    };
    
    console.log('[RequestQueue] Initialized with config:', this.config);
  }
  
  /**
   * Enqueue a request for processing
   * Premium users get high priority, free users get normal priority
   * 
   * @param operation - The async operation to execute
   * @param userId - User identifier (for tracking and priority)
   * @returns Promise that resolves when request completes
   */
  async enqueue<T>(
    operation: () => Promise<T>,
    userId: string = 'anonymous'
  ): Promise<T> {
    // Check if queue is full
    if (this.queue.length >= this.config.maxQueueSize) {
      throw new Error(
        `Request queue is full (${this.config.maxQueueSize} requests). Please try again later.`
      );
    }
    
    // Determine priority based on user tier
    const priority: RequestPriority = this.config.enablePriorityQueue && isPremiumUser()
      ? 'high'
      : 'normal';
    
    // Generate unique request ID
    const requestId = `req_${++this.nextRequestId}_${Date.now()}`;
    
    // Create promise that will be resolved/rejected when request completes
    return new Promise<T>((resolve, reject) => {
      const request: QueuedRequest = {
        id: requestId,
        operation: operation as () => Promise<unknown>,
        priority,
        userId,
        timestamp: Date.now(),
        status: 'queued',
        resolve: resolve as (value: unknown) => void,
        reject,
        retries: 0,
        maxRetries: 2, // Allow 2 retries for failed requests
      };
      
      // Add to queue
      this.queue.push(request);
      
      // Sort queue by priority (high priority first) and timestamp (FIFO within priority)
      this.sortQueue();
      
      console.log(
        `[RequestQueue] Enqueued request ${requestId} with ${priority} priority. Queue size: ${this.queue.length}`
      );
      
      // Log queue position for user
      const position = this.getQueuePosition(requestId);
      if (position > 0) {
        console.log(`[RequestQueue] Request ${requestId} is at position ${position} in queue`);
      }
      
      // Try to process queue
      this.processQueue();
    });
  }
  
  /**
   * Get current queue statistics
   * Includes user's position in queue if userId is provided
   * 
   * @param userId - Optional user ID to get position for
   * @returns Queue statistics
   */
  getStats(userId?: string): QueueStats {
    // Calculate average wait time from recent completions
    const recentWaitTimes = this.waitTimes.slice(-20); // Last 20 requests
    const averageWaitTime = recentWaitTimes.length > 0
      ? recentWaitTimes.reduce((sum, time) => sum + time, 0) / recentWaitTimes.length
      : 0;
    
    // Count completed and failed requests
    let completed = 0;
    let failed = 0;
    
    for (const [, result] of this.completed) {
      if (result.success) {
        completed++;
      } else {
        failed++;
      }
    }
    
    // Get user's position in queue if userId provided
    let position: number | undefined;
    if (userId) {
      const userRequest = this.queue.find(req => req.userId === userId && req.status === 'queued');
      if (userRequest) {
        position = this.getQueuePosition(userRequest.id);
      }
    }
    
    return {
      queueSize: this.queue.length,
      processing: this.processing.size,
      completed,
      failed,
      averageWaitTime: Math.round(averageWaitTime),
      position,
    };
  }
  
  /**
   * Get position of a request in the queue
   * Returns 0 if request is being processed or not found
   * 
   * @param requestId - The request ID
   * @returns Position in queue (1-based) or 0 if not queued
   */
  private getQueuePosition(requestId: string): number {
    const index = this.queue.findIndex(req => req.id === requestId && req.status === 'queued');
    return index >= 0 ? index + 1 : 0;
  }
  
  /**
   * Sort queue by priority and timestamp
   * High priority requests come first, then sorted by timestamp (FIFO)
   */
  private sortQueue(): void {
    this.queue.sort((a, b) => {
      // First sort by priority (high before normal)
      if (a.priority !== b.priority) {
        return a.priority === 'high' ? -1 : 1;
      }
      
      // Within same priority, sort by timestamp (FIFO)
      return a.timestamp - b.timestamp;
    });
  }
  
  /**
   * Process queued requests
   * Executes requests up to maxConcurrent limit
   */
  private async processQueue(): Promise<void> {
    // Check if we can process more requests
    while (
      this.processing.size < this.config.maxConcurrent &&
      this.queue.length > 0
    ) {
      // Get next queued request
      const request = this.queue.find(req => req.status === 'queued');
      
      if (!request) {
        break; // No more queued requests
      }
      
      // Mark as processing
      request.status = 'processing';
      this.processing.add(request.id);
      
      console.log(
        `[RequestQueue] Processing request ${request.id} (${request.priority} priority). ` +
        `Processing: ${this.processing.size}/${this.config.maxConcurrent}`
      );
      
      // Execute request (don't await - process concurrently)
      this.executeRequest(request).catch(error => {
        console.error(`[RequestQueue] Unexpected error executing request ${request.id}:`, error);
      });
    }
  }
  
  /**
   * Execute a single request with timeout and retry logic
   * 
   * @param request - The request to execute
   */
  private async executeRequest(request: QueuedRequest): Promise<void> {
    const startTime = Date.now();
    
    try {
      // Execute with timeout
      const result = await this.executeWithTimeout(
        request.operation,
        this.config.requestTimeout
      );
      
      // Calculate wait time
      const waitTime = Date.now() - request.timestamp;
      this.waitTimes.push(waitTime);
      
      // Keep only last 100 wait times
      if (this.waitTimes.length > 100) {
        this.waitTimes.shift();
      }
      
      // Mark as completed
      request.status = 'completed';
      this.completed.set(request.id, { timestamp: Date.now(), success: true });
      
      // Remove from processing
      this.processing.delete(request.id);
      
      // Remove from queue
      this.removeFromQueue(request.id);
      
      console.log(
        `[RequestQueue] Request ${request.id} completed in ${Date.now() - startTime}ms ` +
        `(waited ${waitTime}ms in queue)`
      );
      
      // Resolve the promise
      request.resolve(result);
      
      // Process next request
      this.processQueue();
      
    } catch (error) {
      const err = error as Error;
      
      console.error(
        `[RequestQueue] Request ${request.id} failed (attempt ${request.retries + 1}/${request.maxRetries + 1}):`,
        err.message
      );
      
      // Check if we should retry
      if (request.retries < request.maxRetries && this.shouldRetry(err)) {
        // Increment retry count
        request.retries++;
        
        // Reset status to queued
        request.status = 'queued';
        
        // Remove from processing
        this.processing.delete(request.id);
        
        // Re-sort queue (retried requests go to back of their priority level)
        request.timestamp = Date.now(); // Update timestamp for fair scheduling
        this.sortQueue();
        
        console.log(
          `[RequestQueue] Retrying request ${request.id} (attempt ${request.retries + 1}/${request.maxRetries + 1})`
        );
        
        // Process queue (will pick up this request again)
        this.processQueue();
        
      } else {
        // Max retries exceeded or non-retryable error
        request.status = 'failed';
        this.completed.set(request.id, { timestamp: Date.now(), success: false });
        
        // Remove from processing
        this.processing.delete(request.id);
        
        // Remove from queue
        this.removeFromQueue(request.id);
        
        console.error(
          `[RequestQueue] Request ${request.id} failed permanently after ${request.retries + 1} attempts`
        );
        
        // Reject the promise
        request.reject(err);
        
        // Process next request
        this.processQueue();
      }
    }
  }
  
  /**
   * Execute operation with timeout
   * 
   * @param operation - The operation to execute
   * @param timeout - Timeout in milliseconds
   * @returns Result of the operation
   */
  private async executeWithTimeout<T>(
    operation: () => Promise<T>,
    timeout: number
  ): Promise<T> {
    return Promise.race([
      operation(),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error(`Request timeout after ${timeout}ms`)),
          timeout
        )
      ),
    ]);
  }
  
  /**
   * Determine if an error should trigger a retry
   * 
   * @param error - The error that occurred
   * @returns True if request should be retried
   */
  private shouldRetry(error: Error): boolean {
    const message = error.message.toLowerCase();
    
    // Retry on network errors and timeouts
    if (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('econnrefused') ||
      message.includes('enotfound') ||
      message.includes('etimedout')
    ) {
      return true;
    }
    
    // Retry on 5xx server errors
    if (
      message.includes('500') ||
      message.includes('502') ||
      message.includes('503') ||
      message.includes('504')
    ) {
      return true;
    }
    
    // Don't retry on client errors (4xx) or rate limits
    return false;
  }
  
  /**
   * Remove a request from the queue
   * 
   * @param requestId - The request ID to remove
   */
  private removeFromQueue(requestId: string): void {
    const index = this.queue.findIndex(req => req.id === requestId);
    if (index >= 0) {
      this.queue.splice(index, 1);
    }
  }
  
  /**
   * Cancel a queued request
   * Only works for requests that haven't started processing yet
   * 
   * @param requestId - The request ID to cancel
   * @returns True if request was cancelled, false if not found or already processing
   */
  cancelRequest(requestId: string): boolean {
    const request = this.queue.find(req => req.id === requestId);
    
    if (!request || request.status !== 'queued') {
      return false; // Not found or already processing
    }
    
    // Mark as cancelled
    request.status = 'cancelled';
    
    // Remove from queue
    this.removeFromQueue(requestId);
    
    // Reject the promise
    request.reject(new Error('Request cancelled by user'));
    
    console.log(`[RequestQueue] Cancelled request ${requestId}`);
    
    return true;
  }
  
  /**
   * Clear all queued requests (not processing ones)
   * Useful for testing or emergency situations
   */
  clearQueue(): void {
    const queuedRequests = this.queue.filter(req => req.status === 'queued');
    
    for (const request of queuedRequests) {
      request.status = 'cancelled';
      request.reject(new Error('Queue cleared'));
    }
    
    this.queue = this.queue.filter(req => req.status === 'processing');
    
    console.log(`[RequestQueue] Cleared ${queuedRequests.length} queued requests`);
  }
  
  /**
   * Get detailed queue information for debugging
   */
  getDebugInfo(): {
    config: QueueConfig;
    queue: Array<{
      id: string;
      priority: RequestPriority;
      status: RequestStatus;
      userId: string;
      queuedFor: number;
      retries: number;
    }>;
    processing: string[];
    stats: QueueStats;
  } {
    const now = Date.now();
    
    return {
      config: this.config,
      queue: this.queue.map(req => ({
        id: req.id,
        priority: req.priority,
        status: req.status,
        userId: req.userId,
        queuedFor: now - req.timestamp,
        retries: req.retries,
      })),
      processing: Array.from(this.processing),
      stats: this.getStats(),
    };
  }
}

// Singleton instance
let requestQueueInstance: RequestQueue | null = null;

/**
 * Get the singleton RequestQueue instance
 * Creates a new instance if one doesn't exist
 * 
 * @returns The RequestQueue instance
 */
export function getRequestQueue(): RequestQueue {
  if (!requestQueueInstance) {
    requestQueueInstance = new RequestQueue({
      maxConcurrent: 3, // Process 3 requests at a time
      maxQueueSize: 50, // Max 50 queued requests
      requestTimeout: 30000, // 30 second timeout per request
      enablePriorityQueue: true, // Enable premium user priority
    });
  }
  
  return requestQueueInstance;
}

/**
 * Reset the singleton instance (useful for testing)
 */
export function resetRequestQueue(): void {
  requestQueueInstance = null;
}
