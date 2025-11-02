/**
 * AI Features Performance Tests
 * 
 * Tests to ensure all AI features meet performance targets:
 * - Prompt Analysis: <100ms
 * - Compatibility Check: <50ms
 * - NLP Parsing: <200ms
 * - Suggestion Generation: <100ms
 */

import { describe, it, expect } from 'vitest';
import {
  testPromptAnalysisPerformance,
  testCompatibilityCheckPerformance,
  testNLPParsingPerformance,
  testSuggestionGenerationPerformance,
  runAllPerformanceTests,
  logPerformanceMetrics,
} from '../../utils/performanceTesting';
import { designStyles } from '../../data/designStyles';
import { colorThemes } from '../../data/colorThemes';
import type { BoltBuilderState } from '../../types';

describe('AI Features Performance Tests', () => {
  // Test data
  const testPrompt = `
# Project: Modern Portfolio Website

## 1. Project Overview
Create a modern, minimalist portfolio website to showcase creative work.

## 2. Design System
- Style: Minimalist
- Colors: Monochrome Modern
- Typography: Clean sans-serif

## 3. Technical Requirements
- Responsive design
- Accessibility: WCAG 2.1 AA
- Performance: Optimized loading
- SEO: Semantic HTML structure
  `;

  const testSelections: Partial<BoltBuilderState> = {
    projectInfo: {
      name: 'Test Portfolio',
      type: 'Portfolio',
      description: 'A modern portfolio website',
      purpose: 'Showcase creative work',
      targetAudience: 'Potential clients and employers',
    },
    selectedDesignStyle: designStyles[0],
    selectedColorTheme: colorThemes[0],
    selectedComponents: [],
    selectedFunctionality: [],
    selectedAnimations: [],
  };

  const testDescription = 'I want to build a modern portfolio website with a clean minimalist design using blue colors';

  const testDesignStyle = designStyles[0];

  describe('Prompt Analysis Performance', () => {
    it('should complete prompt analysis in <100ms', () => {
      const metrics = testPromptAnalysisPerformance(testPrompt, testSelections);
      
      console.log(`Prompt Analysis: ${metrics.duration}ms (target: <${metrics.target}ms)`);
      
      expect(metrics.duration).toBeLessThan(metrics.target);
      expect(metrics.passed).toBe(true);
    });

    it('should handle long prompts efficiently', () => {
      const longPrompt = testPrompt.repeat(5);
      const metrics = testPromptAnalysisPerformance(longPrompt, testSelections);
      
      console.log(`Long Prompt Analysis: ${metrics.duration}ms`);
      
      // Allow slightly more time for longer prompts
      expect(metrics.duration).toBeLessThan(150);
    });
  });

  describe('Compatibility Check Performance', () => {
    it('should complete compatibility check in <50ms', () => {
      const metrics = testCompatibilityCheckPerformance(testSelections);
      
      console.log(`Compatibility Check: ${metrics.duration}ms (target: <${metrics.target}ms)`);
      
      expect(metrics.duration).toBeLessThan(metrics.target);
      expect(metrics.passed).toBe(true);
    });

    it('should handle complex selections efficiently', () => {
      const complexSelections: Partial<BoltBuilderState> = {
        ...testSelections,
        selectedComponents: Array(10).fill(null).map((_, i) => ({
          id: `comp-${i}`,
          title: `Component ${i}`,
          description: 'Test component',
        })),
        selectedAnimations: Array(5).fill(null).map((_, i) => ({
          id: `anim-${i}`,
          title: `Animation ${i}`,
          description: 'Test animation',
        })),
      };

      const metrics = testCompatibilityCheckPerformance(complexSelections);
      
      console.log(`Complex Compatibility Check: ${metrics.duration}ms`);
      
      expect(metrics.duration).toBeLessThan(75);
    });
  });

  describe('NLP Parsing Performance', () => {
    it('should complete NLP parsing in <200ms', () => {
      const metrics = testNLPParsingPerformance(testDescription);
      
      console.log(`NLP Parsing: ${metrics.duration}ms (target: <${metrics.target}ms)`);
      
      expect(metrics.duration).toBeLessThan(metrics.target);
      expect(metrics.passed).toBe(true);
    });

    it('should handle long descriptions efficiently', () => {
      const longDescription = testDescription.repeat(3);
      const metrics = testNLPParsingPerformance(longDescription);
      
      console.log(`Long Description Parsing: ${metrics.duration}ms`);
      
      expect(metrics.duration).toBeLessThan(250);
    });
  });

  describe('Suggestion Generation Performance', () => {
    it('should complete suggestion generation in <100ms', () => {
      const metrics = testSuggestionGenerationPerformance(testDesignStyle);
      
      console.log(`Suggestion Generation: ${metrics.duration}ms (target: <${metrics.target}ms)`);
      
      expect(metrics.duration).toBeLessThan(metrics.target);
      expect(metrics.passed).toBe(true);
    });
  });

  describe('Overall Performance', () => {
    it('should complete all AI operations in <200ms total', () => {
      const results = runAllPerformanceTests({
        prompt: testPrompt,
        selections: testSelections,
        description: testDescription,
        designStyle: testDesignStyle,
      });

      logPerformanceMetrics(results);

      const totalDuration = results.reduce((sum, m) => sum + m.duration, 0);
      
      console.log(`\nTotal AI Operations Duration: ${totalDuration}ms`);
      
      expect(totalDuration).toBeLessThan(200);
      expect(results.every(m => m.passed)).toBe(true);
    });
  });
});
