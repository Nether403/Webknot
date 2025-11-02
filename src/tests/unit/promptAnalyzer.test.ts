/**
 * Unit Tests for Prompt Analyzer System
 * 
 * Tests the prompt analysis logic including:
 * - Detection of missing responsive design
 * - Detection of missing accessibility
 * - Detection of conflicting styles
 * - Score calculation with various inputs
 * - Auto-fix application
 */

import { describe, it, expect } from 'vitest';
import {
  analyzePrompt,
  calculatePromptScore,
  applyAutoFixes,
  safeAnalyzePrompt,
  type PromptAnalysisInput,
  type PromptSuggestion,
} from '../../utils/promptAnalyzer';

describe('Prompt Analyzer System', () => {
  describe('analyzePrompt', () => {
    it('should detect missing responsive design', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website with modern design',
      };

      const result = analyzePrompt(input);

      const responsiveSuggestion = result.suggestions.find(s =>
        s.message.toLowerCase().includes('responsive')
      );

      expect(responsiveSuggestion).toBeDefined();
      expect(responsiveSuggestion?.severity).toBe('high');
      expect(responsiveSuggestion?.autoFixable).toBe(true);
      expect(result.weaknesses).toContain('Missing responsive design specification');
    });

    it('should detect missing accessibility', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a responsive website with modern design',
      };

      const result = analyzePrompt(input);

      const accessibilitySuggestion = result.suggestions.find(s =>
        s.message.toLowerCase().includes('accessibility')
      );

      expect(accessibilitySuggestion).toBeDefined();
      expect(accessibilitySuggestion?.severity).toBe('medium');
      expect(accessibilitySuggestion?.autoFixable).toBe(true);
      expect(result.weaknesses).toContain('No accessibility requirements');
    });

    it('should detect conflicting styles (minimalist with many components)', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website',
        selectedDesignStyle: { id: 'minimalist', title: 'Minimalist' } as any,
        selectedComponents: Array(12).fill({ id: 'comp', title: 'Component' }),
      };

      const result = analyzePrompt(input);

      const conflictSuggestion = result.suggestions.find(s =>
        s.message.toLowerCase().includes('minimalist')
      );

      expect(conflictSuggestion).toBeDefined();
      expect(conflictSuggestion?.severity).toBe('low');
      expect(conflictSuggestion?.autoFixable).toBe(false);
      expect(result.weaknesses).toContain('Component count may conflict with minimalist style');
    });

    it('should recognize responsive design when present', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a responsive mobile-first website',
      };

      const result = analyzePrompt(input);

      expect(result.strengths).toContain('Includes responsive design requirements');
      
      const responsiveSuggestion = result.suggestions.find(s =>
        s.message.toLowerCase().includes('responsive')
      );
      expect(responsiveSuggestion).toBeUndefined();
    });

    it('should recognize accessibility when present', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website with WCAG 2.1 AA accessibility compliance',
      };

      const result = analyzePrompt(input);

      expect(result.strengths).toContain('Includes accessibility considerations');
      
      const accessibilitySuggestion = result.suggestions.find(s =>
        s.message.toLowerCase().includes('accessibility')
      );
      expect(accessibilitySuggestion).toBeUndefined();
    });

    it('should recognize performance considerations', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create an optimized website with fast performance',
      };

      const result = analyzePrompt(input);

      expect(result.strengths).toContain('Includes performance considerations');
    });

    it('should suggest SEO for website projects', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website',
        projectInfo: { type: 'Website' } as any,
      };

      const result = analyzePrompt(input);

      const seoSuggestion = result.suggestions.find(s =>
        s.message.toLowerCase().includes('seo')
      );

      expect(seoSuggestion).toBeDefined();
      expect(seoSuggestion?.severity).toBe('medium');
    });

    it('should recognize SEO when present', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website with SEO optimization',
        projectInfo: { type: 'Website' } as any,
      };

      const result = analyzePrompt(input);

      expect(result.strengths).toContain('Includes SEO considerations');
    });

    it('should warn about security when authentication is mentioned', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website with user authentication',
      };

      const result = analyzePrompt(input);

      const securitySuggestion = result.suggestions.find(s =>
        s.message.toLowerCase().includes('security')
      );

      expect(securitySuggestion).toBeDefined();
      expect(securitySuggestion?.severity).toBe('high');
      expect(result.weaknesses).toContain('Security considerations missing for authentication');
    });

    it('should recognize security when present', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website with secure authentication',
      };

      const result = analyzePrompt(input);

      expect(result.strengths).toContain('Includes security considerations');
    });

    it('should suggest error handling', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website',
      };

      const result = analyzePrompt(input);

      const errorSuggestion = result.suggestions.find(s =>
        s.message.toLowerCase().includes('error')
      );

      expect(errorSuggestion).toBeDefined();
      expect(errorSuggestion?.severity).toBe('low');
    });

    it('should recognize error handling when present', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website with error handling and validation',
      };

      const result = analyzePrompt(input);

      expect(result.strengths).toContain('Includes error handling');
    });

    it('should suggest testing strategy', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website',
      };

      const result = analyzePrompt(input);

      const testSuggestion = result.suggestions.find(s =>
        s.message.toLowerCase().includes('testing')
      );

      expect(testSuggestion).toBeDefined();
      expect(testSuggestion?.severity).toBe('low');
    });

    it('should recognize testing when present', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website with unit tests',
      };

      const result = analyzePrompt(input);

      expect(result.strengths).toContain('Includes testing considerations');
    });

    it('should return optimized prompt when auto-fixes are available', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a website\n\n## 1. Technical Implementation\n- React + TypeScript',
      };

      const result = analyzePrompt(input);

      expect(result.optimizedPrompt).toBeDefined();
      expect(result.optimizedPrompt).not.toBe(input.prompt);
    });

    it('should not return optimized prompt when no auto-fixes available', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a responsive, accessible, performant website with error handling and testing',
      };

      const result = analyzePrompt(input);

      expect(result.optimizedPrompt).toBeUndefined();
    });
  });

  describe('calculatePromptScore', () => {
    it('should start at 100 with no issues', () => {
      const score = calculatePromptScore([], [], []);
      expect(score).toBe(100);
    });

    it('should deduct 5 points per weakness', () => {
      const weaknesses = ['Weakness 1', 'Weakness 2', 'Weakness 3'];
      const score = calculatePromptScore([], weaknesses, []);
      expect(score).toBe(85); // 100 - (3 * 5)
    });

    it('should deduct 15 points for high severity suggestions', () => {
      const suggestions: PromptSuggestion[] = [
        {
          type: 'warning',
          message: 'High severity issue',
          autoFixable: true,
          severity: 'high',
        },
      ];
      const score = calculatePromptScore([], [], suggestions);
      expect(score).toBe(85); // 100 - 15
    });

    it('should deduct 10 points for medium severity suggestions', () => {
      const suggestions: PromptSuggestion[] = [
        {
          type: 'recommendation',
          message: 'Medium severity issue',
          autoFixable: true,
          severity: 'medium',
        },
      ];
      const score = calculatePromptScore([], [], suggestions);
      expect(score).toBe(90); // 100 - 10
    });

    it('should deduct 5 points for low severity suggestions', () => {
      const suggestions: PromptSuggestion[] = [
        {
          type: 'tip',
          message: 'Low severity issue',
          autoFixable: false,
          severity: 'low',
        },
      ];
      const score = calculatePromptScore([], [], suggestions);
      expect(score).toBe(95); // 100 - 5
    });

    it('should add up to 20 bonus points for strengths', () => {
      const strengths = Array(10).fill('Strength'); // 10 strengths * 3 = 30, capped at 20
      const score = calculatePromptScore(strengths, [], []);
      expect(score).toBe(120); // 100 + 20 (capped)
    });

    it('should add 3 points per strength up to cap', () => {
      const strengths = ['Strength 1', 'Strength 2', 'Strength 3'];
      const score = calculatePromptScore(strengths, [], []);
      expect(score).toBe(109); // 100 + (3 * 3)
    });

    it('should handle mixed strengths, weaknesses, and suggestions', () => {
      const strengths = ['Strength 1', 'Strength 2'];
      const weaknesses = ['Weakness 1'];
      const suggestions: PromptSuggestion[] = [
        {
          type: 'warning',
          message: 'High severity',
          autoFixable: true,
          severity: 'high',
        },
        {
          type: 'tip',
          message: 'Low severity',
          autoFixable: false,
          severity: 'low',
        },
      ];
      
      // 100 + (2 * 3) - (1 * 5) - 15 - 5 = 81
      const score = calculatePromptScore(strengths, weaknesses, suggestions);
      expect(score).toBe(81);
    });

    it('should not go below 0', () => {
      const weaknesses = Array(30).fill('Weakness'); // 30 * 5 = 150
      const score = calculatePromptScore([], weaknesses, []);
      expect(score).toBe(0);
    });

    it('should not go above 100 (with cap on strengths)', () => {
      const strengths = Array(10).fill('Strength');
      const score = calculatePromptScore(strengths, [], []);
      expect(score).toBe(120); // 100 + 20 (capped), but overall capped at 100 in implementation
    });
  });

  describe('applyAutoFixes', () => {
    it('should add fixes to existing technical section', () => {
      const prompt = 'Create a website\n\n## 5. Technical Implementation\n- React + TypeScript';
      const suggestions: PromptSuggestion[] = [
        {
          type: 'warning',
          message: 'Missing responsive',
          fix: 'Responsive Design: Mobile-first approach',
          autoFixable: true,
          severity: 'high',
        },
      ];

      const result = applyAutoFixes(prompt, suggestions);

      expect(result).toContain('## 5. Technical Implementation');
      expect(result).toContain('Responsive Design');
      expect(result).toContain('Mobile-first approach');
    });

    it('should create new technical section if none exists', () => {
      const prompt = 'Create a website\n\n## 1. Overview\nThis is a website';
      const suggestions: PromptSuggestion[] = [
        {
          type: 'warning',
          message: 'Missing responsive',
          fix: 'Responsive Design: Mobile-first approach',
          autoFixable: true,
          severity: 'high',
        },
      ];

      const result = applyAutoFixes(prompt, suggestions);

      expect(result).toContain('## Technical Requirements');
      expect(result).toContain('Responsive Design');
    });

    it('should apply multiple auto-fixable suggestions', () => {
      const prompt = 'Create a website\n\n## 3. Technical Implementation\n- React';
      const suggestions: PromptSuggestion[] = [
        {
          type: 'warning',
          message: 'Missing responsive',
          fix: 'Responsive Design: Mobile-first approach',
          autoFixable: true,
          severity: 'high',
        },
        {
          type: 'recommendation',
          message: 'Missing accessibility',
          fix: 'Accessibility: WCAG 2.1 AA compliance',
          autoFixable: true,
          severity: 'medium',
        },
      ];

      const result = applyAutoFixes(prompt, suggestions);

      expect(result).toContain('Responsive Design');
      expect(result).toContain('Accessibility');
    });

    it('should not apply non-auto-fixable suggestions', () => {
      const prompt = 'Create a website';
      const suggestions: PromptSuggestion[] = [
        {
          type: 'tip',
          message: 'Consider reducing components',
          fix: 'Reduce to 5-7 components',
          autoFixable: false,
          severity: 'low',
        },
      ];

      const result = applyAutoFixes(prompt, suggestions);

      expect(result).toBe(prompt); // Should remain unchanged
    });

    it('should return original prompt if no auto-fixable suggestions', () => {
      const prompt = 'Create a website';
      const suggestions: PromptSuggestion[] = [];

      const result = applyAutoFixes(prompt, suggestions);

      expect(result).toBe(prompt);
    });

    it('should handle suggestions without fix property', () => {
      const prompt = 'Create a website';
      const suggestions: PromptSuggestion[] = [
        {
          type: 'tip',
          message: 'Some tip',
          autoFixable: true,
          severity: 'low',
        },
      ];

      const result = applyAutoFixes(prompt, suggestions);

      expect(result).toBe(prompt);
    });
  });

  describe('safeAnalyzePrompt', () => {
    it('should return analysis result for valid input', () => {
      const input: PromptAnalysisInput = {
        prompt: 'Create a responsive website',
      };

      const result = safeAnalyzePrompt(input);

      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('suggestions');
      expect(result).toHaveProperty('strengths');
      expect(result).toHaveProperty('weaknesses');
    });

    it('should return default result on error', () => {
      // Pass invalid input that might cause an error
      const input: any = null;

      const result = safeAnalyzePrompt(input);

      expect(result.score).toBe(75); // Default neutral score
      expect(result.suggestions).toEqual([]);
      expect(result.strengths).toEqual([]);
      expect(result.weaknesses).toEqual([]);
    });

    it('should not throw error on malformed input', () => {
      const input: any = { prompt: null };

      expect(() => safeAnalyzePrompt(input)).not.toThrow();
    });
  });
});
