/**
 * Unit Tests for Compatibility Checker System
 * 
 * Tests the compatibility validation logic including:
 * - Detection of style-color conflicts
 * - Detection of component count issues
 * - Detection of functionality-component mismatches
 * - Score calculation
 * - Harmony level thresholds
 */

import { describe, it, expect } from 'vitest';
import {
  checkCompatibility,
  calculateCompatibilityScore,
  getHarmonyLevel,
  safeCheckCompatibility,
  type CompatibilityIssue,
  type SelectionsToCheck,
} from '../../utils/compatibilityChecker';

describe('Compatibility Checker System', () => {
  describe('checkCompatibility', () => {
    it('should detect minimalist style with too many colors', () => {
      const selections: SelectionsToCheck = {
        selectedDesignStyle: {
          id: 'minimalist',
          title: 'Minimalist',
        } as any,
        selectedColorTheme: {
          id: 'vibrant-theme',
          title: 'Vibrant Theme',
          colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
        } as any,
      };

      const result = checkCompatibility(selections);

      const styleColorWarning = result.warnings.find(w =>
        w.message.toLowerCase().includes('minimalist')
      );

      expect(styleColorWarning).toBeDefined();
      expect(styleColorWarning?.severity).toBe('medium');
      expect(styleColorWarning?.affected).toContain('design-style');
      expect(styleColorWarning?.affected).toContain('color-theme');
    });

    it('should detect brutalist style without high contrast', () => {
      const selections: SelectionsToCheck = {
        selectedDesignStyle: {
          id: 'digital-brutalism',
          title: 'Digital Brutalism',
        } as any,
        selectedColorTheme: {
          id: 'soft-pastels',
          title: 'Soft Pastels',
          colors: ['#FFE5E5', '#E5FFE5'],
        } as any,
      };

      const result = checkCompatibility(selections);

      const brutalismWarning = result.warnings.find(w =>
        w.message.toLowerCase().includes('brutalist')
      );

      expect(brutalismWarning).toBeDefined();
      expect(brutalismWarning?.severity).toBe('low');
    });

    it('should detect glassmorphism with monochrome theme', () => {
      const selections: SelectionsToCheck = {
        selectedDesignStyle: {
          id: 'glassmorphism',
          title: 'Glassmorphism',
        } as any,
        selectedColorTheme: {
          id: 'monochrome-modern',
          title: 'Monochrome Modern',
          colors: ['#000000', '#FFFFFF'],
        } as any,
      };

      const result = checkCompatibility(selections);

      const glassWarning = result.warnings.find(w =>
        w.message.toLowerCase().includes('glassmorphism')
      );

      expect(glassWarning).toBeDefined();
      expect(glassWarning?.severity).toBe('low');
    });

    it('should detect minimalist style with too many components', () => {
      const selections: SelectionsToCheck = {
        selectedDesignStyle: {
          id: 'minimalist',
          title: 'Minimalist',
        } as any,
        selectedComponents: Array(10).fill({ id: 'comp', title: 'Component' }),
      };

      const result = checkCompatibility(selections);

      const componentWarning = result.warnings.find(w =>
        w.message.toLowerCase().includes('fewer components')
      );

      expect(componentWarning).toBeDefined();
      expect(componentWarning?.severity).toBe('medium');
      expect(componentWarning?.affected).toContain('design-style');
      expect(componentWarning?.affected).toContain('components');
    });

    it('should detect brutalist style with too few components', () => {
      const selections: SelectionsToCheck = {
        selectedDesignStyle: {
          id: 'digital-brutalism',
          title: 'Digital Brutalism',
        } as any,
        selectedComponents: [
          { id: 'comp1', title: 'Component 1' },
          { id: 'comp2', title: 'Component 2' },
        ],
      };

      const result = checkCompatibility(selections);

      const componentWarning = result.warnings.find(w =>
        w.message.toLowerCase().includes('bold, prominent')
      );

      expect(componentWarning).toBeDefined();
      expect(componentWarning?.severity).toBe('low');
    });

    it('should detect authentication functionality without auth components', () => {
      const selections: SelectionsToCheck = {
        selectedFunctionality: [
          {
            id: 'auth',
            title: 'Authentication',
            features: ['User Authentication', 'Login System'],
          } as any,
        ],
        selectedComponents: [
          { id: 'card', title: 'Card' },
          { id: 'button', title: 'Button' },
        ],
      };

      const result = checkCompatibility(selections);

      const authIssue = result.issues.find(i =>
        i.message.toLowerCase().includes('authentication')
      );

      expect(authIssue).toBeDefined();
      expect(authIssue?.severity).toBe('high');
      expect(authIssue?.affected).toContain('functionality');
      expect(authIssue?.affected).toContain('components');
      expect(authIssue?.autoFixable).toBe(true);
    });

    it('should not flag authentication when auth components present', () => {
      const selections: SelectionsToCheck = {
        selectedFunctionality: [
          {
            id: 'auth',
            title: 'Authentication',
            features: ['User Authentication'],
          } as any,
        ],
        selectedComponents: [
          { id: 'login-form', title: 'Login Form' },
          { id: 'button', title: 'Button' },
        ],
      };

      const result = checkCompatibility(selections);

      const authIssue = result.issues.find(i =>
        i.message.toLowerCase().includes('authentication')
      );

      expect(authIssue).toBeUndefined();
    });

    it('should detect e-commerce functionality without shopping components', () => {
      const selections: SelectionsToCheck = {
        selectedFunctionality: [
          {
            id: 'ecommerce',
            title: 'E-commerce',
            features: ['Shopping Cart', 'Checkout'],
          } as any,
        ],
        selectedComponents: [
          { id: 'card', title: 'Card' },
        ],
      };

      const result = checkCompatibility(selections);

      const ecommerceIssue = result.issues.find(i =>
        i.message.toLowerCase().includes('e-commerce')
      );

      expect(ecommerceIssue).toBeDefined();
      expect(ecommerceIssue?.severity).toBe('high');
    });

    it('should detect vibrant background with monochrome theme', () => {
      const selections: SelectionsToCheck = {
        selectedBackground: {
          id: 'neon-gradient',
          title: 'Neon Gradient',
        } as any,
        selectedColorTheme: {
          id: 'monochrome-modern',
          title: 'Monochrome Modern',
          colors: ['#000000', '#FFFFFF'],
        } as any,
      };

      const result = checkCompatibility(selections);

      const bgWarning = result.warnings.find(w =>
        w.message.toLowerCase().includes('vibrant')
      );

      expect(bgWarning).toBeDefined();
      expect(bgWarning?.severity).toBe('medium');
    });

    it('should detect subtle background with bold theme', () => {
      const selections: SelectionsToCheck = {
        selectedBackground: {
          id: 'subtle-grid',
          title: 'Subtle Grid',
        } as any,
        selectedColorTheme: {
          id: 'tech-neon',
          title: 'Tech Neon',
          colors: ['#FF00FF', '#00FFFF'],
        } as any,
      };

      const result = checkCompatibility(selections);

      const bgWarning = result.warnings.find(w =>
        w.message.toLowerCase().includes('subtle')
      );

      expect(bgWarning).toBeDefined();
      expect(bgWarning?.severity).toBe('low');
    });

    it('should warn about too many animations', () => {
      const selections: SelectionsToCheck = {
        selectedAnimations: Array(7).fill({ id: 'anim', title: 'Animation' }),
      };

      const result = checkCompatibility(selections);

      const animWarning = result.warnings.find(w =>
        w.message.toLowerCase().includes('animations')
      );

      expect(animWarning).toBeDefined();
      expect(animWarning?.severity).toBe('low');
      expect(animWarning?.affected).toContain('animations');
    });

    it('should not warn about reasonable animation count', () => {
      const selections: SelectionsToCheck = {
        selectedAnimations: Array(4).fill({ id: 'anim', title: 'Animation' }),
      };

      const result = checkCompatibility(selections);

      const animWarning = result.warnings.find(w =>
        w.message.toLowerCase().includes('animations')
      );

      expect(animWarning).toBeUndefined();
    });

    it('should return perfect score with no issues', () => {
      const selections: SelectionsToCheck = {
        selectedDesignStyle: {
          id: 'minimalist',
          title: 'Minimalist',
        } as any,
        selectedColorTheme: {
          id: 'monochrome-modern',
          title: 'Monochrome',
          colors: ['#000000', '#FFFFFF'],
        } as any,
        selectedComponents: Array(5).fill({ id: 'comp', title: 'Component' }),
        selectedAnimations: Array(3).fill({ id: 'anim', title: 'Animation' }),
      };

      const result = checkCompatibility(selections);

      expect(result.score).toBe(100);
      expect(result.harmony).toBe('excellent');
      expect(result.issues).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    });

    it('should handle empty selections gracefully', () => {
      const selections: SelectionsToCheck = {};

      const result = checkCompatibility(selections);

      expect(result.score).toBe(100);
      expect(result.harmony).toBe('excellent');
      expect(result.issues).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    });
  });

  describe('calculateCompatibilityScore', () => {
    it('should start at 100 with no issues or warnings', () => {
      const score = calculateCompatibilityScore([], []);
      expect(score).toBe(100);
    });

    it('should deduct 20 points for high severity issues', () => {
      const issues: CompatibilityIssue[] = [
        {
          severity: 'high',
          message: 'High severity issue',
          affected: ['test'],
          suggestion: 'Fix it',
          autoFixable: false,
        },
      ];

      const score = calculateCompatibilityScore(issues, []);
      expect(score).toBe(80); // 100 - 20
    });

    it('should deduct 15 points for medium severity issues', () => {
      const issues: CompatibilityIssue[] = [
        {
          severity: 'medium',
          message: 'Medium severity issue',
          affected: ['test'],
          suggestion: 'Fix it',
          autoFixable: false,
        },
      ];

      const score = calculateCompatibilityScore(issues, []);
      expect(score).toBe(85); // 100 - 15
    });

    it('should deduct 10 points for low severity issues', () => {
      const issues: CompatibilityIssue[] = [
        {
          severity: 'low',
          message: 'Low severity issue',
          affected: ['test'],
          suggestion: 'Fix it',
          autoFixable: false,
        },
      ];

      const score = calculateCompatibilityScore(issues, []);
      expect(score).toBe(90); // 100 - 10
    });

    it('should deduct 10 points for medium severity warnings', () => {
      const warnings: CompatibilityIssue[] = [
        {
          severity: 'medium',
          message: 'Medium warning',
          affected: ['test'],
          suggestion: 'Consider this',
          autoFixable: false,
        },
      ];

      const score = calculateCompatibilityScore([], warnings);
      expect(score).toBe(90); // 100 - 10
    });

    it('should deduct 5 points for low severity warnings', () => {
      const warnings: CompatibilityIssue[] = [
        {
          severity: 'low',
          message: 'Low warning',
          affected: ['test'],
          suggestion: 'Consider this',
          autoFixable: false,
        },
      ];

      const score = calculateCompatibilityScore([], warnings);
      expect(score).toBe(95); // 100 - 5
    });

    it('should handle multiple issues and warnings', () => {
      const issues: CompatibilityIssue[] = [
        {
          severity: 'high',
          message: 'High issue',
          affected: ['test'],
          suggestion: 'Fix',
          autoFixable: false,
        },
        {
          severity: 'medium',
          message: 'Medium issue',
          affected: ['test'],
          suggestion: 'Fix',
          autoFixable: false,
        },
      ];

      const warnings: CompatibilityIssue[] = [
        {
          severity: 'low',
          message: 'Low warning',
          affected: ['test'],
          suggestion: 'Consider',
          autoFixable: false,
        },
      ];

      // 100 - 20 (high) - 15 (medium) - 5 (low warning) = 60
      const score = calculateCompatibilityScore(issues, warnings);
      expect(score).toBe(60);
    });

    it('should not go below 0', () => {
      const issues: CompatibilityIssue[] = Array(10).fill({
        severity: 'high',
        message: 'Issue',
        affected: ['test'],
        suggestion: 'Fix',
        autoFixable: false,
      });

      const score = calculateCompatibilityScore(issues, []);
      expect(score).toBe(0); // Would be -100, but clamped to 0
    });
  });

  describe('getHarmonyLevel', () => {
    it('should return "excellent" for scores 90-100', () => {
      expect(getHarmonyLevel(100)).toBe('excellent');
      expect(getHarmonyLevel(95)).toBe('excellent');
      expect(getHarmonyLevel(90)).toBe('excellent');
    });

    it('should return "good" for scores 75-89', () => {
      expect(getHarmonyLevel(89)).toBe('good');
      expect(getHarmonyLevel(80)).toBe('good');
      expect(getHarmonyLevel(75)).toBe('good');
    });

    it('should return "fair" for scores 60-74', () => {
      expect(getHarmonyLevel(74)).toBe('fair');
      expect(getHarmonyLevel(65)).toBe('fair');
      expect(getHarmonyLevel(60)).toBe('fair');
    });

    it('should return "poor" for scores below 60', () => {
      expect(getHarmonyLevel(59)).toBe('poor');
      expect(getHarmonyLevel(30)).toBe('poor');
      expect(getHarmonyLevel(0)).toBe('poor');
    });

    it('should handle boundary values correctly', () => {
      expect(getHarmonyLevel(90)).toBe('excellent');
      expect(getHarmonyLevel(89.9)).toBe('good');
      expect(getHarmonyLevel(75)).toBe('good');
      expect(getHarmonyLevel(74.9)).toBe('fair');
      expect(getHarmonyLevel(60)).toBe('fair');
      expect(getHarmonyLevel(59.9)).toBe('poor');
    });
  });

  describe('safeCheckCompatibility', () => {
    it('should return compatibility result for valid input', () => {
      const selections: SelectionsToCheck = {
        selectedDesignStyle: {
          id: 'minimalist',
          title: 'Minimalist',
        } as any,
      };

      const result = safeCheckCompatibility(selections);

      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('issues');
      expect(result).toHaveProperty('warnings');
      expect(result).toHaveProperty('harmony');
    });

    it('should return default result on error', () => {
      // Pass invalid input that might cause an error
      const selections: any = null;

      const result = safeCheckCompatibility(selections);

      expect(result.score).toBe(80); // Default "good" score
      expect(result.issues).toEqual([]);
      expect(result.warnings).toEqual([]);
      expect(result.harmony).toBe('good');
    });

    it('should not throw error on malformed input', () => {
      const selections: any = { selectedDesignStyle: null };

      expect(() => safeCheckCompatibility(selections)).not.toThrow();
    });

    it('should handle undefined selections', () => {
      const selections: SelectionsToCheck = {
        selectedDesignStyle: undefined,
        selectedColorTheme: undefined,
        selectedComponents: undefined,
      };

      const result = safeCheckCompatibility(selections);

      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });
  });
});
