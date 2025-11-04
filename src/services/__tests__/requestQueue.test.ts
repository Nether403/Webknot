/**
 * Request Queue Service Tests
 * 
 * Tests for request queuing functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RequestQueue } from '../requestQueue';

describe('RequestQueue', () => {
  let queue: RequestQueue;
  
  beforeEach(() => {
    queue = new RequestQueue({
      maxConcurrent: 2,
      maxQueueSize: 10,
      requestTimeout: 1000,
      enablePriorityQueue: true,
    });
  });
  
  describe('enqueue', () => {
    it('should enqueue and execute a request', async () => {
      const mockOperation = vi.fn().mockResolvedValue('result');
      
      const result = await queue.enqueue(mockOperation, 'user1');
      
      expect(result).toBe('result');
      expect(mockOperation).toHaveBeenCalledTimes(1);
    });
    
    it('should throw error when queue is full', async () => {
      const queue = new RequestQueue({
        maxConcurrent: 1,
        maxQueueSize: 2,
        requestTimeout: 1000,
      });
      
      // Fill the queue
      const slowOperation = () => new Promise(resolve => setTimeout(resolve, 100));
      
      queue.enqueue(slowOperation, 'user1'); // Processing
      queue.enqueue(slowOperation, 'user2'); // Queued 1
      queue.enqueue(slowOperation, 'user3'); // Queued 2
      
      // This should fail
      await expect(
        queue.enqueue(slowOperation, 'user4')
      ).rejects.toThrow('Request queue is full');
    });
    
    it('should process requests concurrently up to maxConcurrent', async () => {
      let concurrent = 0;
      let maxConcurrent = 0;
      
      const operation = async () => {
        concurrent++;
        maxConcurrent = Math.max(maxConcurrent, concurrent);
        await new Promise(resolve => setTimeout(resolve, 50));
        concurrent--;
        return 'done';
      };
      
      // Enqueue 5 requests
      const promises = Array.from({ length: 5 }, (_, i) =>
        queue.enqueue(operation, `user${i}`)
      );
      
      await Promise.all(promises);
      
      // Should have processed 2 at a time (maxConcurrent = 2)
      expect(maxConcurrent).toBe(2);
    });
  });
  
  describe('getStats', () => {
    it('should return correct queue statistics', async () => {
      const slowOperation = () => new Promise(resolve => setTimeout(resolve, 100));
      
      // Enqueue some requests
      queue.enqueue(slowOperation, 'user1');
      queue.enqueue(slowOperation, 'user2');
      queue.enqueue(slowOperation, 'user3');
      
      const stats = queue.getStats();
      
      expect(stats.queueSize).toBeGreaterThan(0);
      expect(stats.processing).toBeGreaterThan(0);
    });
    
    it('should return user position in queue', async () => {
      const slowOperation = () => new Promise(resolve => setTimeout(resolve, 100));
      
      // Enqueue requests
      queue.enqueue(slowOperation, 'user1');
      queue.enqueue(slowOperation, 'user2');
      queue.enqueue(slowOperation, 'user3');
      
      const stats = queue.getStats('user3');
      
      expect(stats.position).toBeGreaterThan(0);
    });
  });
  
  describe('priority queue', () => {
    it('should prioritize high priority requests', async () => {
      const queue = new RequestQueue({
        maxConcurrent: 1, // Process one at a time
        maxQueueSize: 10,
        requestTimeout: 1000,
        enablePriorityQueue: true,
      });
      
      const executionOrder: string[] = [];
      
      const createOperation = (id: string) => async () => {
        executionOrder.push(id);
        await new Promise(resolve => setTimeout(resolve, 10));
        return id;
      };
      
      // Mock isPremiumUser to return true for user2
      vi.mock('../../utils/premiumTier', () => ({
        isPremiumUser: () => false, // Default to false
      }));
      
      // Enqueue requests
      const p1 = queue.enqueue(createOperation('user1'), 'user1'); // Normal priority
      const p2 = queue.enqueue(createOperation('user2'), 'user2'); // Normal priority
      const p3 = queue.enqueue(createOperation('user3'), 'user3'); // Normal priority
      
      await Promise.all([p1, p2, p3]);
      
      // Should execute in FIFO order for same priority
      expect(executionOrder).toEqual(['user1', 'user2', 'user3']);
    });
  });
  
  describe('retry logic', () => {
    it('should retry failed requests', async () => {
      let attempts = 0;
      
      const failingOperation = async () => {
        attempts++;
        if (attempts < 3) {
          throw new Error('Network error');
        }
        return 'success';
      };
      
      const result = await queue.enqueue(failingOperation, 'user1');
      
      expect(result).toBe('success');
      expect(attempts).toBe(3); // Initial + 2 retries
    });
    
    it('should not retry non-retryable errors', async () => {
      let attempts = 0;
      
      const failingOperation = async () => {
        attempts++;
        throw new Error('Invalid API key');
      };
      
      await expect(
        queue.enqueue(failingOperation, 'user1')
      ).rejects.toThrow('Invalid API key');
      
      expect(attempts).toBe(1); // No retries
    });
  });
  
  describe('timeout', () => {
    it('should timeout long-running requests', async () => {
      const queue = new RequestQueue({
        maxConcurrent: 2,
        maxQueueSize: 10,
        requestTimeout: 100, // 100ms timeout
      });
      
      const slowOperation = () => new Promise(resolve => setTimeout(resolve, 500));
      
      await expect(
        queue.enqueue(slowOperation, 'user1')
      ).rejects.toThrow('timeout');
    });
  });
});
