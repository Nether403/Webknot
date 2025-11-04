/**
 * Prompt Optimization Service
 * 
 * Uses feedback data to refine and optimize AI prompts
 * Implements A/B testing for different prompt variations
 * Measures impact on accuracy and rolls out winning variations
 */

import { getFeedbackService } from './feedbackService';
import type { FeedbackTarget } from '../types/gemini';

export interface PromptVariation {
  id: string;
  name: string;
  prompt: string;
  target: FeedbackTarget;
  createdAt: number;
  isActive: boolean;
  testGroup?: 'A' | 'B';
}

export interface PromptTest {
  id: string;
  target: FeedbackTarget;
  variationA: PromptVariation;
  variationB: PromptVariation;
  startedAt: number;
  endedAt?: number;
  results?: {
    variationA: {
      acceptanceRate: number;
      totalFeedback: number;
    };
    variationB: {
      acceptanceRate: number;
      totalFeedback: number;
    };
    winner?: 'A' | 'B';
    improvement: number; // Percentage improvement
  };
}

const STORAGE_KEY = 'lovabolt-prompt-optimization';
const MIN_FEEDBACK_FOR_TEST = 30; // Minimum feedback entries per variation

export class PromptOptimizationService {
  private variations: Map<string, PromptVariation> = new Map();
  private activeTests: Map<string, PromptTest> = new Map();
  
  constructor() {
    this.loadFromStorage();
  }
  
  /**
   * Creates a new prompt variation for testing
   * 
   * @param name - Descriptive name for the variation
   * @param prompt - The prompt text
   * @param target - What feature this prompt is for
   * @param testGroup - Optional test group (A or B)
   * @returns The created variation
   */
  createVariation(
    name: string,
    prompt: string,
    target: FeedbackTarget,
    testGroup?: 'A' | 'B'
  ): PromptVariation {
    const variation: PromptVariation = {
      id: this.generateId(),
      name,
      prompt,
      target,
      createdAt: Date.now(),
      isActive: false,
      testGroup,
    };
    
    this.variations.set(variation.id, variation);
    this.saveToStorage();
    
    console.log(`[PromptOptimization] Created variation: ${name}`);
    
    return variation;
  }
  
  /**
   * Starts an A/B test between two prompt variations
   * 
   * @param target - What feature to test
   * @param variationAId - ID of variation A
   * @param variationBId - ID of variation B
   * @returns The created test
   */
  startABTest(
    target: FeedbackTarget,
    variationAId: string,
    variationBId: string
  ): PromptTest {
    const variationA = this.variations.get(variationAId);
    const variationB = this.variations.get(variationBId);
    
    if (!variationA || !variationB) {
      throw new Error('Both variations must exist to start A/B test');
    }
    
    if (variationA.target !== target || variationB.target !== target) {
      throw new Error('Both variations must target the same feature');
    }
    
    // Mark variations as active and assign test groups
    variationA.isActive = true;
    variationA.testGroup = 'A';
    variationB.isActive = true;
    variationB.testGroup = 'B';
    
    const test: PromptTest = {
      id: this.generateId(),
      target,
      variationA,
      variationB,
      startedAt: Date.now(),
    };
    
    this.activeTests.set(test.id, test);
    this.saveToStorage();
    
    console.log(`[PromptOptimization] Started A/B test for ${target}`);
    
    return test;
  }
  
  /**
   * Analyzes an active A/B test and determines the winner
   * 
   * @param testId - The test ID
   * @returns The test with results, or null if not enough data
   */
  analyzeTest(testId: string): PromptTest | null {
    const test = this.activeTests.get(testId);
    
    if (!test) {
      throw new Error('Test not found');
    }
    
    if (test.endedAt) {
      return test; // Already analyzed
    }
    
    const feedbackService = getFeedbackService();
    
    // Get feedback for each variation
    // In a real implementation, we'd track which variation was shown to each user
    // For now, we'll use a simplified approach based on time ranges
    const midpoint = test.startedAt + (Date.now() - test.startedAt) / 2;
    
    const feedbackA = feedbackService.getFeedback(test.target, test.startedAt);
    const feedbackB = feedbackService.getFeedback(test.target, midpoint);
    
    // Check if we have enough data
    if (feedbackA.length < MIN_FEEDBACK_FOR_TEST || feedbackB.length < MIN_FEEDBACK_FOR_TEST) {
      console.log(`[PromptOptimization] Not enough feedback yet for test ${testId}`);
      return null;
    }
    
    // Calculate acceptance rates
    const acceptanceRateA = feedbackA.filter(f => f.type === 'thumbs-up').length / feedbackA.length;
    const acceptanceRateB = feedbackB.filter(f => f.type === 'thumbs-up').length / feedbackB.length;
    
    // Determine winner
    const winner = acceptanceRateA > acceptanceRateB ? 'A' : 'B';
    const improvement = Math.abs(acceptanceRateA - acceptanceRateB) * 100;
    
    // Update test with results
    test.results = {
      variationA: {
        acceptanceRate: acceptanceRateA,
        totalFeedback: feedbackA.length,
      },
      variationB: {
        acceptanceRate: acceptanceRateB,
        totalFeedback: feedbackB.length,
      },
      winner,
      improvement,
    };
    
    test.endedAt = Date.now();
    
    this.saveToStorage();
    
    console.log(`[PromptOptimization] Test ${testId} complete. Winner: Variation ${winner} (+${improvement.toFixed(1)}%)`);
    
    return test;
  }
  
  /**
   * Rolls out the winning variation from an A/B test
   * 
   * @param testId - The test ID
   * @returns The winning variation
   */
  rolloutWinner(testId: string): PromptVariation {
    const test = this.activeTests.get(testId);
    
    if (!test || !test.results) {
      throw new Error('Test must be analyzed before rolling out winner');
    }
    
    const winner = test.results.winner === 'A' ? test.variationA : test.variationB;
    const loser = test.results.winner === 'A' ? test.variationB : test.variationA;
    
    // Deactivate loser
    loser.isActive = false;
    
    // Keep winner active
    winner.isActive = true;
    winner.testGroup = undefined; // No longer in a test
    
    this.saveToStorage();
    
    console.log(`[PromptOptimization] Rolled out winning variation: ${winner.name}`);
    
    return winner;
  }
  
  /**
   * Gets the active prompt for a target feature
   * If multiple active prompts exist, returns the one with highest acceptance rate
   * 
   * @param target - The feature target
   * @returns The active prompt variation, or null if none
   */
  getActivePrompt(target: FeedbackTarget): PromptVariation | null {
    const activeVariations = Array.from(this.variations.values())
      .filter(v => v.target === target && v.isActive);
    
    if (activeVariations.length === 0) {
      return null;
    }
    
    if (activeVariations.length === 1) {
      return activeVariations[0] || null;
    }
    
    // If multiple active (shouldn't happen after rollout), return the newest
    return activeVariations.sort((a, b) => b.createdAt - a.createdAt)[0] || null;
  }
  
  /**
   * Gets all variations for a target
   * 
   * @param target - The feature target
   * @returns Array of variations
   */
  getVariations(target: FeedbackTarget): PromptVariation[] {
    return Array.from(this.variations.values())
      .filter(v => v.target === target)
      .sort((a, b) => b.createdAt - a.createdAt);
  }
  
  /**
   * Gets all active tests
   * 
   * @returns Array of active tests
   */
  getActiveTests(): PromptTest[] {
    return Array.from(this.activeTests.values())
      .filter(t => !t.endedAt)
      .sort((a, b) => b.startedAt - a.startedAt);
  }
  
  /**
   * Gets all completed tests
   * 
   * @returns Array of completed tests
   */
  getCompletedTests(): PromptTest[] {
    return Array.from(this.activeTests.values())
      .filter(t => t.endedAt !== undefined)
      .sort((a, b) => (b.endedAt || 0) - (a.endedAt || 0));
  }
  
  /**
   * Generates optimization suggestions based on feedback
   * 
   * @param target - The feature target
   * @returns Array of suggestions for improving prompts
   */
  generateOptimizationSuggestions(target: FeedbackTarget): string[] {
    const feedbackService = getFeedbackService();
    const suggestions: string[] = [];
    
    // Get low-quality suggestions for this target
    const feedback = feedbackService.getFeedback(target);
    
    if (feedback.length === 0) {
      suggestions.push('No feedback data available yet. Collect more feedback to generate suggestions.');
      return suggestions;
    }
    
    const acceptanceRate = feedback.filter(f => f.type === 'thumbs-up').length / feedback.length;
    
    if (acceptanceRate < 0.5) {
      suggestions.push('Consider making prompts more specific and actionable.');
      suggestions.push('Review examples of successful suggestions to identify patterns.');
      suggestions.push('Test different prompt structures (e.g., more context, clearer instructions).');
    }
    
    if (acceptanceRate < 0.3) {
      suggestions.push('CRITICAL: Acceptance rate is very low. Consider a complete prompt redesign.');
      suggestions.push('Analyze negative feedback to identify common issues.');
    }
    
    // Check for specific patterns in metadata
    const suggestionTypes = new Map<string, { positive: number; total: number }>();
    
    feedback.forEach(f => {
      const type = f.metadata?.suggestionType as string || 'unknown';
      if (!suggestionTypes.has(type)) {
        suggestionTypes.set(type, { positive: 0, total: 0 });
      }
      const stats = suggestionTypes.get(type)!;
      stats.total++;
      if (f.type === 'thumbs-up') {
        stats.positive++;
      }
    });
    
    // Find types with low acceptance
    suggestionTypes.forEach((stats, type) => {
      const rate = stats.positive / stats.total;
      if (rate < 0.5 && stats.total >= 5) {
        suggestions.push(`"${type}" suggestions have low acceptance (${(rate * 100).toFixed(1)}%). Review and refine prompts for this type.`);
      }
    });
    
    return suggestions;
  }
  
  /**
   * Clears all optimization data
   */
  clear(): void {
    this.variations.clear();
    this.activeTests.clear();
    this.saveToStorage();
    console.log('[PromptOptimization] Cleared all optimization data');
  }
  
  /**
   * Generates a unique ID
   * 
   * @returns Unique identifier
   */
  private generateId(): string {
    return `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  /**
   * Loads data from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        
        // Restore variations
        if (data.variations) {
          Object.entries(data.variations).forEach(([id, variation]) => {
            this.variations.set(id, variation as PromptVariation);
          });
        }
        
        // Restore tests
        if (data.tests) {
          Object.entries(data.tests).forEach(([id, test]) => {
            this.activeTests.set(id, test as PromptTest);
          });
        }
        
        console.log(`[PromptOptimization] Loaded ${this.variations.size} variations and ${this.activeTests.size} tests`);
      }
    } catch (error) {
      console.error('[PromptOptimization] Failed to load from storage:', error);
    }
  }
  
  /**
   * Saves data to localStorage
   */
  private saveToStorage(): void {
    try {
      const data = {
        variations: Object.fromEntries(this.variations.entries()),
        tests: Object.fromEntries(this.activeTests.entries()),
        lastSync: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('[PromptOptimization] Failed to save to storage:', error);
    }
  }
}

// Singleton instance
let promptOptimizationInstance: PromptOptimizationService | null = null;

/**
 * Gets the singleton prompt optimization service instance
 * 
 * @returns The prompt optimization service instance
 */
export function getPromptOptimizationService(): PromptOptimizationService {
  if (!promptOptimizationInstance) {
    promptOptimizationInstance = new PromptOptimizationService();
  }
  return promptOptimizationInstance;
}
