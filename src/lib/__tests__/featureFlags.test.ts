/**
 * Feature Flags Tests
 * 
 * Basic tests to verify feature flag system works correctly
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { featureFlags, isAIAvailable, getRateLimit } from '../featureFlags';

describe('Feature Flags', () => {
  beforeEach(() => {
    // Reset to defaults before each test
    featureFlags.reset();
    localStorage.clear();
  });

  describe('featureFlags manager', () => {
    it('should have default flags', () => {
      const flags = featureFlags.getAll();
      expect(flags).toBeDefined();
      expect(flags.aiProjectAnalysis).toBe(false);
      expect(flags.aiSuggestions).toBe(false);
      expect(flags.aiPromptEnhancement).toBe(false);
      expect(flags.aiChat).toBe(false);
      expect(flags.premiumTier).toBe(false);
    });

    it('should enable a feature', () => {
      featureFlags.enable('aiProjectAnalysis');
      expect(featureFlags.isEnabled('aiProjectAnalysis')).toBe(true);
    });

    it('should disable a feature', () => {
      featureFlags.enable('aiProjectAnalysis');
      featureFlags.disable('aiProjectAnalysis');
      expect(featureFlags.isEnabled('aiProjectAnalysis')).toBe(false);
    });

    it('should toggle a feature', () => {
      const initialState = featureFlags.isEnabled('aiProjectAnalysis');
      featureFlags.toggle('aiProjectAnalysis');
      expect(featureFlags.isEnabled('aiProjectAnalysis')).toBe(!initialState);
    });

    it('should respect global AI toggle', () => {
      featureFlags.enable('aiProjectAnalysis');
      featureFlags.disable('aiEnabled');
      expect(featureFlags.isEnabled('aiProjectAnalysis')).toBe(false);
    });

    it('should persist flags to localStorage', () => {
      featureFlags.enable('aiProjectAnalysis');
      const stored = localStorage.getItem('webknot-feature-flags');
      expect(stored).toBeDefined();
      const parsed = JSON.parse(stored!);
      expect(parsed.aiProjectAnalysis).toBe(true);
    });
  });

  describe('getRateLimit', () => {
    it('should return default rate limit', () => {
      const limit = getRateLimit();
      expect(limit).toBe(20);
    });
  });
});
