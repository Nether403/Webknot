/**
 * Cache Warming Tests
 * 
 * Tests for cache warming utilities that pre-cache common project analyses
 */

import { describe, it, expect } from 'vitest';
import {
  getProjectAnalysisWarmingData,
  estimateWarmingSize,
  COMMON_PROJECT_ANALYSES,
} from '../cacheWarming';

describe('Cache Warming', () => {
  describe('getProjectAnalysisWarmingData', () => {
    it('should return array of cache entries', () => {
      const data = getProjectAnalysisWarmingData();
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });
    
    it('should return entries with correct structure', () => {
      const data = getProjectAnalysisWarmingData();
      
      for (const entry of data) {
        expect(entry).toHaveProperty('key');
        expect(entry).toHaveProperty('data');
        expect(typeof entry.key).toBe('string');
        expect(entry.key).toMatch(/^analysis:/);
      }
    });
    
    it('should have valid ProjectAnalysis data', () => {
      const data = getProjectAnalysisWarmingData();
      
      const validProjectTypes = [
        'Portfolio',
        'E-commerce',
        'Dashboard',
        'Web App',
        'Mobile App',
        'Website',
      ];
      
      for (const entry of data) {
        const analysis = entry.data;
        
        expect(validProjectTypes).toContain(analysis.projectType);
        expect(typeof analysis.designStyle).toBe('string');
        expect(typeof analysis.colorTheme).toBe('string');
        expect(typeof analysis.reasoning).toBe('string');
        expect(typeof analysis.confidence).toBe('number');
        expect(analysis.confidence).toBeGreaterThanOrEqual(0);
        expect(analysis.confidence).toBeLessThanOrEqual(1);
      }
    });
    
    it('should include portfolio project analyses', () => {
      const data = getProjectAnalysisWarmingData();
      
      const portfolioEntries = data.filter(
        entry => entry.data.projectType === 'Portfolio'
      );
      
      expect(portfolioEntries.length).toBeGreaterThan(0);
    });
    
    it('should include e-commerce project analyses', () => {
      const data = getProjectAnalysisWarmingData();
      
      const ecommerceEntries = data.filter(
        entry => entry.data.projectType === 'E-commerce'
      );
      
      expect(ecommerceEntries.length).toBeGreaterThan(0);
    });
    
    it('should include dashboard project analyses', () => {
      const data = getProjectAnalysisWarmingData();
      
      const dashboardEntries = data.filter(
        entry => entry.data.projectType === 'Dashboard'
      );
      
      expect(dashboardEntries.length).toBeGreaterThan(0);
    });
    
    it('should have high confidence scores', () => {
      const data = getProjectAnalysisWarmingData();
      
      for (const entry of data) {
        // All pre-cached analyses should have high confidence (>0.8)
        expect(entry.data.confidence).toBeGreaterThan(0.8);
      }
    });
    
    it('should have unique cache keys', () => {
      const data = getProjectAnalysisWarmingData();
      
      const keys = data.map(entry => entry.key);
      const uniqueKeys = new Set(keys);
      
      expect(uniqueKeys.size).toBe(keys.length);
    });
    
    it('should include suggested components', () => {
      const data = getProjectAnalysisWarmingData();
      
      const entriesWithComponents = data.filter(
        entry => entry.data.suggestedComponents && entry.data.suggestedComponents.length > 0
      );
      
      expect(entriesWithComponents.length).toBeGreaterThan(0);
    });
  });
  
  describe('estimateWarmingSize', () => {
    it('should return 30% of max cache size when cache is empty', () => {
      const maxSize = 100;
      const currentSize = 0;
      
      const result = estimateWarmingSize(maxSize, currentSize);
      
      expect(result).toBe(30); // 30% of 100
    });
    
    it('should return available space when less than 30% budget', () => {
      const maxSize = 100;
      const currentSize = 80; // Only 20 slots available
      
      const result = estimateWarmingSize(maxSize, currentSize);
      
      expect(result).toBe(20); // Available space is less than 30% budget
    });
    
    it('should return 0 when cache is full', () => {
      const maxSize = 100;
      const currentSize = 100;
      
      const result = estimateWarmingSize(maxSize, currentSize);
      
      expect(result).toBe(0);
    });
    
    it('should handle small cache sizes', () => {
      const maxSize = 10;
      const currentSize = 0;
      
      const result = estimateWarmingSize(maxSize, currentSize);
      
      expect(result).toBe(3); // 30% of 10
    });
    
    it('should handle large cache sizes', () => {
      const maxSize = 1000;
      const currentSize = 0;
      
      const result = estimateWarmingSize(maxSize, currentSize);
      
      expect(result).toBe(300); // 30% of 1000
    });
    
    it('should never exceed available space', () => {
      const maxSize = 100;
      const currentSize = 95;
      
      const result = estimateWarmingSize(maxSize, currentSize);
      
      expect(result).toBeLessThanOrEqual(5);
    });
    
    it('should never exceed 30% budget', () => {
      const maxSize = 100;
      const currentSize = 0;
      
      const result = estimateWarmingSize(maxSize, currentSize);
      
      expect(result).toBeLessThanOrEqual(30);
    });
  });
  
  describe('COMMON_PROJECT_ANALYSES', () => {
    it('should be exported and accessible', () => {
      expect(COMMON_PROJECT_ANALYSES).toBeDefined();
      expect(Array.isArray(COMMON_PROJECT_ANALYSES)).toBe(true);
    });
    
    it('should have reasonable size for warming', () => {
      // Should have enough entries to be useful but not too many
      expect(COMMON_PROJECT_ANALYSES.length).toBeGreaterThan(5);
      expect(COMMON_PROJECT_ANALYSES.length).toBeLessThan(50);
    });
    
    it('should cover all major project types', () => {
      const projectTypes = COMMON_PROJECT_ANALYSES.map(entry => entry.data.projectType);
      const uniqueTypes = new Set(projectTypes);
      
      // Should cover at least 4 different project types
      expect(uniqueTypes.size).toBeGreaterThanOrEqual(4);
    });
    
    it('should have descriptive reasoning for each entry', () => {
      for (const entry of COMMON_PROJECT_ANALYSES) {
        expect(entry.data.reasoning.length).toBeGreaterThan(20);
      }
    });
  });
});
