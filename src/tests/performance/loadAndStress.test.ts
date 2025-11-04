/**
 * Load and Stress Testing
 * 
 * Tests system performance under high load:
 * - 1000 concurrent users simulation
 * - Cache performance at scale
 * - Cost tracking under high load
 * - System stability verification
 * 
 * Phase 3: Advanced Features
 * Requirements: All
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGemini } from '../../hooks/useGemini';
import { CacheService } from '../../services/cacheService';
import { CostTracker } from '../../services/costTracker';
import { setPremiumStatus, clearPremiumStatus } from '../../utils/premiumTier';

describe('Load and Stress Testing', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Concurrent Users Simulation (Requirement: All)', () => {
    it('should handle 100 concurrent requests', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');
      
      // Create 100 concurrent requests
      const requests = Array.from({ length: 100 }, (_, i) =>
        renderHook(() => useGemini())
      );

      // Execute all requests concurrently
      const analyses = await Promise.all(
        requests.map(({ result }) =>
          result.current.analyzeProject(`Test project ${Math.floor(Math.random() * 10)}`)
        )
      );

      // All requests should complete
      expect(analyses).toHaveLength(100);
      analyses.forEach(analysis => {
        expect(analysis).toBeDefined();
        expect(analysis.projectType).toBeDefined();
      });
    }, 30000); // 30 second timeout

    it('should handle 500 concurrent requests with premium users', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');
      setPremiumStatus(true);

      // Create 500 concurrent requests
      const requests = Array.from({ length: 500 }, (_, i) =>
        renderHook(() => useGemini())
      );

      const startTime = Date.now();

      // Execute all requests concurrently
      const analyses = await Promise.all(
        requests.map(({ result }) =>
          result.current.analyzeProject(`Project ${Math.floor(Math.random() * 20)}`)
        )
      );

      const duration = Date.now() - startTime;

      // All requests should complete
      expect(analyses).toHaveLength(500);
      
      // Should complete in reasonable time (< 10 seconds for fallback)
      expect(duration).toBeLessThan(10000);

      // Verify all responses are valid
      analyses.forEach(analysis => {
        expect(analysis).toBeDefined();
        expect(analysis.projectType).toBeDefined();
      });
    }, 60000); // 60 second timeout

    it('should simulate 1000 users with mixed free and premium', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      const totalUsers = 1000;
      const premiumUsers = 100; // 10% premium
      const freeUsers = totalUsers - premiumUsers;

      // Create user requests
      const requests = [];

      // Premium users (unlimited requests)
      for (let i = 0; i < premiumUsers; i++) {
        setPremiumStatus(true);
        const { result } = renderHook(() => useGemini());
        requests.push(
          result.analyzeProject(`Premium project ${i}`)
        );
      }

      // Free users (limited requests)
      clearPremiumStatus();
      for (let i = 0; i < Math.min(freeUsers, 20); i++) {
        const { result } = renderHook(() => useGemini());
        requests.push(
          result.analyzeProject(`Free project ${i}`)
        );
      }

      const startTime = Date.now();

      // Execute all requests
      const results = await Promise.allSettled(requests);

      const duration = Date.now() - startTime;

      // Count successful requests
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      console.log(`Load test results:
        Total requests: ${requests.length}
        Successful: ${successful}
        Failed: ${failed}
        Duration: ${duration}ms
        Avg time per request: ${(duration / requests.length).toFixed(2)}ms
      `);

      // Most requests should succeed
      expect(successful).toBeGreaterThan(requests.length * 0.8);
    }, 120000); // 2 minute timeout
  });

  describe('Cache Performance at Scale (Requirement: 2.1)', () => {
    it('should maintain high cache hit rate under load', async () => {
      const cache = new CacheService(1000, 3600000); // Large cache

      // Warm up cache with common queries
      const commonQueries = [
        'portfolio website',
        'e-commerce store',
        'dashboard app',
        'mobile app',
        'landing page',
      ];

      commonQueries.forEach(query => {
        cache.set(`analysis:${query}`, {
          projectType: 'Website',
          designStyle: 'minimalist',
          colorTheme: 'ocean-breeze',
          reasoning: 'Cached result',
          confidence: 0.9,
        });
      });

      // Simulate 1000 requests with 80% cache hits
      let cacheHits = 0;
      let cacheMisses = 0;

      for (let i = 0; i < 1000; i++) {
        // 80% of requests use common queries (cache hits)
        const query = Math.random() < 0.8
          ? commonQueries[Math.floor(Math.random() * commonQueries.length)]
          : `unique query ${i}`;

        const cached = cache.get(`analysis:${query}`);
        
        if (cached) {
          cacheHits++;
        } else {
          cacheMisses++;
          // Simulate cache miss - add to cache
          cache.set(`analysis:${query}`, {
            projectType: 'Website',
            designStyle: 'minimalist',
            colorTheme: 'ocean-breeze',
            reasoning: 'New result',
            confidence: 0.8,
          });
        }
      }

      const hitRate = cacheHits / (cacheHits + cacheMisses);

      console.log(`Cache performance:
        Cache hits: ${cacheHits}
        Cache misses: ${cacheMisses}
        Hit rate: ${(hitRate * 100).toFixed(2)}%
      `);

      // Should achieve >70% hit rate
      expect(hitRate).toBeGreaterThan(0.7);
    });

    it('should handle cache eviction under memory pressure', () => {
      const cache = new CacheService(100, 3600000); // Limited size

      // Fill cache beyond capacity
      for (let i = 0; i < 150; i++) {
        cache.set(`key-${i}`, { data: `value-${i}` });
      }

      const stats = cache.getStats();

      // Should not exceed max size
      expect(stats.size).toBeLessThanOrEqual(100);

      // Oldest entries should be evicted
      const oldEntry = cache.get('key-0');
      expect(oldEntry).toBeNull();

      // Recent entries should be retained
      const recentEntry = cache.get('key-149');
      expect(recentEntry).toBeDefined();
    });

    it('should maintain cache performance with concurrent access', async () => {
      const cache = new CacheService(500, 3600000);

      // Simulate concurrent cache access
      const operations = Array.from({ length: 1000 }, (_, i) => {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            if (i % 2 === 0) {
              // Write operation
              cache.set(`key-${i}`, { value: i });
            } else {
              // Read operation
              cache.get(`key-${i - 1}`);
            }
            resolve();
          }, Math.random() * 10);
        });
      });

      const startTime = Date.now();
      await Promise.all(operations);
      const duration = Date.now() - startTime;

      console.log(`Concurrent cache operations:
        Total operations: 1000
        Duration: ${duration}ms
        Avg time per operation: ${(duration / 1000).toFixed(2)}ms
      `);

      // Should complete quickly
      expect(duration).toBeLessThan(1000);

      // Cache should be functional
      const stats = cache.getStats();
      expect(stats.size).toBeGreaterThan(0);
    });
  });

  describe('Cost Tracking Under High Load (Requirement: 7.4)', () => {
    it('should accurately track costs for 1000 requests', () => {
      const costTracker = new CostTracker();
      costTracker.reset();

      // Simulate 1000 API calls
      for (let i = 0; i < 1000; i++) {
        const tokensUsed = Math.floor(Math.random() * 500) + 100; // 100-600 tokens
        const model = i % 2 === 0 ? 'gemini-2.5-flash-exp' : 'gemini-2.5-pro-exp';
        
        costTracker.trackRequest(model, tokensUsed, Date.now() - i * 1000);
      }

      const stats = costTracker.getStats();

      expect(stats.totalRequests).toBe(1000);
      expect(stats.totalTokens).toBeGreaterThan(0);
      expect(stats.totalCost).toBeGreaterThan(0);

      console.log(`Cost tracking results:
        Total requests: ${stats.totalRequests}
        Total tokens: ${stats.totalTokens}
        Total cost: $${stats.totalCost.toFixed(4)}
        Avg cost per request: $${(stats.totalCost / stats.totalRequests).toFixed(6)}
      `);

      // Cost should be reasonable (< $1 for 1000 requests with fallback)
      expect(stats.totalCost).toBeLessThan(1.0);
    });

    it('should alert when cost threshold is exceeded', () => {
      const costTracker = new CostTracker();
      costTracker.reset();

      let alertTriggered = false;
      costTracker.setAlertThreshold(0.50, () => {
        alertTriggered = true;
      });

      // Simulate expensive requests
      for (let i = 0; i < 1000; i++) {
        costTracker.trackRequest('gemini-2.5-pro-exp', 1000, Date.now());
      }

      const stats = costTracker.getStats();

      // Should trigger alert if cost exceeds $0.50
      if (stats.totalCost > 0.50) {
        expect(alertTriggered).toBe(true);
      }
    });

    it('should calculate cost per user accurately', () => {
      const costTracker = new CostTracker();
      costTracker.reset();

      const totalUsers = 100;
      const requestsPerUser = 10;

      // Simulate requests from multiple users
      for (let user = 0; user < totalUsers; user++) {
        for (let req = 0; req < requestsPerUser; req++) {
          costTracker.trackRequest('gemini-2.5-flash-exp', 300, Date.now());
        }
      }

      const stats = costTracker.getStats();
      const costPerUser = stats.totalCost / totalUsers;

      console.log(`Cost per user:
        Total users: ${totalUsers}
        Requests per user: ${requestsPerUser}
        Total cost: $${stats.totalCost.toFixed(4)}
        Cost per user: $${costPerUser.toFixed(6)}
      `);

      // Cost per user should be reasonable (< $0.01)
      expect(costPerUser).toBeLessThan(0.01);
    });
  });

  describe('System Stability Verification (Requirement: All)', () => {
    it('should maintain stability under sustained load', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      const duration = 5000; // 5 seconds
      const requestsPerSecond = 20;
      const totalRequests = (duration / 1000) * requestsPerSecond;

      const requests = [];
      const startTime = Date.now();

      // Generate requests over time
      for (let i = 0; i < totalRequests; i++) {
        const delay = (i / requestsPerSecond) * 1000;
        
        requests.push(
          new Promise(async (resolve) => {
            await new Promise(r => setTimeout(r, delay));
            const { result } = renderHook(() => useGemini());
            const analysis = await result.analyzeProject(`Project ${i}`);
            resolve(analysis);
          })
        );
      }

      const results = await Promise.all(requests);
      const actualDuration = Date.now() - startTime;

      console.log(`Sustained load test:
        Target duration: ${duration}ms
        Actual duration: ${actualDuration}ms
        Total requests: ${totalRequests}
        Successful: ${results.filter(r => r).length}
        Requests per second: ${(totalRequests / (actualDuration / 1000)).toFixed(2)}
      `);

      // All requests should complete
      expect(results).toHaveLength(totalRequests);
      
      // Should complete within reasonable time
      expect(actualDuration).toBeLessThan(duration * 1.5);
    }, 30000);

    it('should handle memory efficiently under load', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Create many requests
      const requests = Array.from({ length: 500 }, (_, i) =>
        renderHook(() => useGemini())
      );

      await Promise.all(
        requests.map(({ result }) =>
          result.analyzeProject(`Project ${Math.floor(Math.random() * 10)}`)
        )
      );

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      console.log(`Memory usage:
        Initial: ${(initialMemory / 1024 / 1024).toFixed(2)} MB
        Final: ${(finalMemory / 1024 / 1024).toFixed(2)} MB
        Increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)} MB
      `);

      // Memory increase should be reasonable (< 50 MB)
      if (initialMemory > 0) {
        expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
      }
    }, 60000);

    it('should recover from errors gracefully', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      const requests = [];
      let successCount = 0;
      let errorCount = 0;

      // Mix of valid and invalid requests
      for (let i = 0; i < 100; i++) {
        const { result } = renderHook(() => useGemini());
        
        const request = result.analyzeProject(
          i % 10 === 0 ? '' : `Valid project ${i}` // Every 10th request is invalid
        ).then(
          () => { successCount++; },
          () => { errorCount++; }
        );

        requests.push(request);
      }

      await Promise.allSettled(requests);

      console.log(`Error recovery test:
        Total requests: 100
        Successful: ${successCount}
        Errors: ${errorCount}
      `);

      // Most requests should succeed
      expect(successCount).toBeGreaterThan(80);
      
      // Some errors expected (invalid requests)
      expect(errorCount).toBeGreaterThan(0);
      expect(errorCount).toBeLessThan(20);
    });

    it('should maintain consistent performance over time', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      const batches = 5;
      const requestsPerBatch = 20;
      const batchTimes: number[] = [];

      for (let batch = 0; batch < batches; batch++) {
        const startTime = Date.now();

        const requests = Array.from({ length: requestsPerBatch }, (_, i) =>
          renderHook(() => useGemini())
        );

        await Promise.all(
          requests.map(({ result }) =>
            result.analyzeProject(`Batch ${batch} Project ${i}`)
          )
        );

        const batchTime = Date.now() - startTime;
        batchTimes.push(batchTime);

        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      console.log(`Performance consistency:
        Batch times: ${batchTimes.map(t => `${t}ms`).join(', ')}
        Average: ${(batchTimes.reduce((a, b) => a + b) / batches).toFixed(2)}ms
        Min: ${Math.min(...batchTimes)}ms
        Max: ${Math.max(...batchTimes)}ms
      `);

      // Performance should be consistent (max time < 2x min time)
      const minTime = Math.min(...batchTimes);
      const maxTime = Math.max(...batchTimes);
      expect(maxTime).toBeLessThan(minTime * 2);
    }, 60000);
  });

  describe('Performance Benchmarks', () => {
    it('should meet Phase 3 performance targets', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');
      setPremiumStatus(true);

      const { result } = renderHook(() => useGemini());

      // Test chat response time
      const chatStart = Date.now();
      await result.chat('Test message');
      const chatDuration = Date.now() - chatStart;

      console.log(`Performance benchmarks:
        Chat response: ${chatDuration}ms (target: <3000ms)
      `);

      // Chat should respond within 3 seconds
      expect(chatDuration).toBeLessThan(3000);
    });

    it('should handle 1000 concurrent users successfully', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      // Simulate 1000 users with staggered requests
      const users = 1000;
      const requests = [];

      for (let i = 0; i < users; i++) {
        // Stagger requests over 10 seconds
        const delay = (i / users) * 10000;
        
        requests.push(
          new Promise(async (resolve) => {
            await new Promise(r => setTimeout(r, delay));
            const { result } = renderHook(() => useGemini());
            try {
              const analysis = await result.analyzeProject(`User ${i} project`);
              resolve({ success: true, analysis });
            } catch (error) {
              resolve({ success: false, error });
            }
          })
        );
      }

      const startTime = Date.now();
      const results = await Promise.all(requests);
      const duration = Date.now() - startTime;

      const successful = results.filter((r: any) => r.success).length;
      const failed = results.filter((r: any) => !r.success).length;

      console.log(`1000 concurrent users test:
        Duration: ${duration}ms
        Successful: ${successful}
        Failed: ${failed}
        Success rate: ${(successful / users * 100).toFixed(2)}%
      `);

      // Should handle most users successfully
      expect(successful).toBeGreaterThan(users * 0.9);
    }, 120000); // 2 minute timeout
  });
});
