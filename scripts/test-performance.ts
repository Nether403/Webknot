/**
 * Performance Test Runner
 * 
 * Runs performance tests for AI features and outputs results
 */

import {
  runAllPerformanceTests,
  logPerformanceMetrics,
  exportPerformanceMetrics,
} from '../src/utils/performanceTesting';

// Mock data for testing
const testData = {
  prompt: `
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
  `,
  selections: {
    projectInfo: {
      name: 'Test Portfolio',
      type: 'Portfolio',
      description: 'A modern portfolio website',
      purpose: 'Showcase creative work',
      targetAudience: 'Potential clients and employers',
    },
    selectedDesignStyle: {
      id: 'minimalist',
      title: 'Minimalist',
      description: 'Clean and simple design',
      features: [],
    },
    selectedColorTheme: {
      id: 'monochrome-modern',
      title: 'Monochrome Modern',
      description: 'Black and white color scheme',
      colors: ['#000000', '#FFFFFF'],
    },
    selectedComponents: [],
    selectedFunctionality: [],
    selectedAnimations: [],
  },
  description: 'I want to build a modern portfolio website with a clean minimalist design using blue colors',
  designStyle: {
    id: 'minimalist',
    title: 'Minimalist',
    description: 'Clean and simple design',
    features: [],
  },
};

// Run tests
console.log('\n🚀 Running AI Features Performance Tests...\n');

const results = runAllPerformanceTests(testData);

// Log results
logPerformanceMetrics(results);

// Export results to JSON
const jsonResults = exportPerformanceMetrics(results);
console.log('\n📊 JSON Results:\n');
console.log(jsonResults);

// Exit with appropriate code
const allPassed = results.every(m => m.passed);
process.exit(allPassed ? 0 : 1);
