/**
 * Performance Testing Utilities
 * 
 * Utilities for measuring and documenting AI feature performance.
 * All AI features should complete within target response times.
 */

import { analyzePrompt } from './promptAnalyzer';
import { checkCompatibility } from './compatibilityChecker';
import { parseProjectDescription } from './nlpParser';
import { getCompatibleThemes, getCompatibleAnimations } from './compatibilityMappings';
import type { BoltBuilderState, DesignStyle } from '../types';

export interface PerformanceMetrics {
  operation: string;
  duration: number;
  target: number;
  passed: boolean;
  timestamp: Date;
}

/**
 * Measure execution time of a function
 */
export const measurePerformance = <T>(
  operation: string,
  fn: () => T,
  target: number
): PerformanceMetrics => {
  const start = performance.now();
  fn();
  const duration = performance.now() - start;

  return {
    operation,
    duration: Math.round(duration * 100) / 100, // Round to 2 decimal places
    target,
    passed: duration < target,
    timestamp: new Date(),
  };
};

/**
 * Test prompt analysis performance
 * Target: <100ms
 */
export const testPromptAnalysisPerformance = (
  prompt: string,
  selections: Partial<BoltBuilderState>
): PerformanceMetrics => {
  return measurePerformance(
    'Prompt Analysis',
    () => analyzePrompt({
      prompt,
      projectInfo: selections.projectInfo,
      selectedDesignStyle: selections.selectedDesignStyle || undefined,
      selectedColorTheme: selections.selectedColorTheme || undefined,
      selectedComponents: selections.selectedComponents,
      selectedAnimations: selections.selectedAnimations,
    }),
    100
  );
};

/**
 * Test compatibility check performance
 * Target: <50ms
 */
export const testCompatibilityCheckPerformance = (
  selections: Partial<BoltBuilderState>
): PerformanceMetrics => {
  return measurePerformance(
    'Compatibility Check',
    () => checkCompatibility(selections),
    50
  );
};

/**
 * Test NLP parsing performance
 * Target: <200ms
 */
export const testNLPParsingPerformance = (description: string): PerformanceMetrics => {
  return measurePerformance(
    'NLP Parsing',
    () => parseProjectDescription(description),
    200
  );
};

/**
 * Test suggestion generation performance
 * Target: <100ms
 */
export const testSuggestionGenerationPerformance = (
  designStyle: DesignStyle
): PerformanceMetrics => {
  return measurePerformance(
    'Suggestion Generation',
    () => {
      getCompatibleThemes(designStyle);
      getCompatibleAnimations(designStyle);
    },
    100
  );
};

/**
 * Run all performance tests and return results
 */
export const runAllPerformanceTests = (
  testData: {
    prompt: string;
    selections: Partial<BoltBuilderState>;
    description: string;
    designStyle: DesignStyle;
  }
): PerformanceMetrics[] => {
  const results: PerformanceMetrics[] = [];

  // Test prompt analysis
  results.push(testPromptAnalysisPerformance(testData.prompt, testData.selections));

  // Test compatibility check
  results.push(testCompatibilityCheckPerformance(testData.selections));

  // Test NLP parsing
  results.push(testNLPParsingPerformance(testData.description));

  // Test suggestion generation
  results.push(testSuggestionGenerationPerformance(testData.designStyle));

  return results;
};

/**
 * Format performance metrics for console output
 */
export const formatPerformanceResults = (metrics: PerformanceMetrics[]): string => {
  const lines: string[] = [
    '\n=== AI Feature Performance Test Results ===\n',
  ];

  metrics.forEach(metric => {
    const status = metric.passed ? '✓ PASS' : '✗ FAIL';
    const statusColor = metric.passed ? '\x1b[32m' : '\x1b[31m';
    const resetColor = '\x1b[0m';

    lines.push(
      `${statusColor}${status}${resetColor} ${metric.operation}: ${metric.duration}ms (target: <${metric.target}ms)`
    );
  });

  const allPassed = metrics.every(m => m.passed);
  const totalDuration = metrics.reduce((sum, m) => sum + m.duration, 0);

  lines.push('\n---');
  lines.push(`Total Duration: ${Math.round(totalDuration * 100) / 100}ms`);
  lines.push(`Overall Status: ${allPassed ? '✓ ALL TESTS PASSED' : '✗ SOME TESTS FAILED'}`);
  lines.push('==========================================\n');

  return lines.join('\n');
};

/**
 * Log performance metrics to console
 */
export const logPerformanceMetrics = (metrics: PerformanceMetrics[]): void => {
  console.log(formatPerformanceResults(metrics));
};

/**
 * Export performance metrics to JSON
 */
export const exportPerformanceMetrics = (metrics: PerformanceMetrics[]): string => {
  return JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      metrics,
      summary: {
        totalTests: metrics.length,
        passed: metrics.filter(m => m.passed).length,
        failed: metrics.filter(m => !m.passed).length,
        totalDuration: metrics.reduce((sum, m) => sum + m.duration, 0),
      },
    },
    null,
    2
  );
};
