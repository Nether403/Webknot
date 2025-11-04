import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  startWizardSession,
  updateWizardStep,
  completeWizardSession,
  trackSmartDefaultsAcceptance,
  trackSuggestionShown,
  trackSuggestionApplication,
  getMetricsSummary,
  getAverageCompletionTime,
  getAveragePromptQualityScore,
  getSmartDefaultsAcceptanceRate,
  getSuggestionApplicationRate,
  getWizardCompletionRate,
  clearMetricsData,
} from '../../utils/metricsTracking';

describe('Metrics Tracking', () => {
  beforeEach(() => {
    // Clear all data before each test
    clearMetricsData();
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('Session Tracking', () => {
    it('should start a new wizard session', () => {
      startWizardSession();
      
      const summary = getMetricsSummary();
      expect(summary.totalSessions).toBe(1);
    });

    it('should not create duplicate sessions', () => {
      startWizardSession();
      startWizardSession();
      
      const summary = getMetricsSummary();
      expect(summary.totalSessions).toBe(1);
    });

    it('should track step changes', () => {
      startWizardSession();
      updateWizardStep('design-style');
      updateWizardStep('color-theme');
      
      // Session should exist with steps tracked
      const summary = getMetricsSummary();
      expect(summary.totalSessions).toBe(1);
    });

    it('should mark session as completed', () => {
      startWizardSession();
      completeWizardSession(85);
      
      const summary = getMetricsSummary();
      expect(summary.completedSessions).toBe(1);
      expect(summary.wizardCompletionRate).toBe(100);
    });
  });

  describe('Smart Defaults Tracking', () => {
    it('should track smart defaults acceptance', () => {
      startWizardSession();
      trackSmartDefaultsAcceptance(true);
      
      const rate = getSmartDefaultsAcceptanceRate();
      expect(rate).toBe(100);
    });

    it('should track smart defaults rejection', () => {
      startWizardSession();
      trackSmartDefaultsAcceptance(false);
      
      const rate = getSmartDefaultsAcceptanceRate();
      expect(rate).toBe(0);
    });

    it('should calculate acceptance rate correctly', () => {
      // Session 1: Accept
      startWizardSession();
      trackSmartDefaultsAcceptance(true);
      
      // Session 2: Reject
      sessionStorage.clear(); // New session
      startWizardSession();
      trackSmartDefaultsAcceptance(false);
      
      const rate = getSmartDefaultsAcceptanceRate();
      expect(rate).toBe(50);
    });
  });

  describe('Suggestion Tracking', () => {
    it('should track suggestions shown', () => {
      startWizardSession();
      trackSuggestionShown();
      trackSuggestionShown();
      trackSuggestionShown();
      
      // Should have 3 suggestions shown
      const summary = getMetricsSummary();
      expect(summary.totalSessions).toBe(1);
    });

    it('should track suggestions applied', () => {
      startWizardSession();
      trackSuggestionShown();
      trackSuggestionShown();
      trackSuggestionApplication();
      
      const rate = getSuggestionApplicationRate();
      expect(rate).toBe(50); // 1 applied out of 2 shown
    });

    it('should calculate application rate correctly', () => {
      startWizardSession();
      trackSuggestionShown();
      trackSuggestionShown();
      trackSuggestionShown();
      trackSuggestionShown();
      trackSuggestionApplication();
      trackSuggestionApplication();
      
      const rate = getSuggestionApplicationRate();
      expect(rate).toBe(50); // 2 applied out of 4 shown
    });
  });

  describe('Completion Time Tracking', () => {
    it('should calculate average completion time', () => {
      // Mock Date.now for consistent timing
      const mockNow = vi.spyOn(Date, 'now');
      
      // Session 1: 5 minutes
      mockNow.mockReturnValue(1000);
      startWizardSession();
      mockNow.mockReturnValue(1000 + 300000); // +5 minutes
      completeWizardSession(85);
      
      // Session 2: 7 minutes
      sessionStorage.clear();
      mockNow.mockReturnValue(2000);
      startWizardSession();
      mockNow.mockReturnValue(2000 + 420000); // +7 minutes
      completeWizardSession(90);
      
      const avgTime = getAverageCompletionTime();
      expect(avgTime).toBe(360000); // Average of 5 and 7 minutes
      
      mockNow.mockRestore();
    });
  });

  describe('Prompt Quality Tracking', () => {
    it('should calculate average prompt quality score', () => {
      startWizardSession();
      completeWizardSession(85);
      
      sessionStorage.clear();
      startWizardSession();
      completeWizardSession(95);
      
      const avgScore = getAveragePromptQualityScore();
      expect(avgScore).toBe(90); // Average of 85 and 95
    });

    it('should handle sessions without quality scores', () => {
      startWizardSession();
      completeWizardSession(); // No score
      
      const avgScore = getAveragePromptQualityScore();
      expect(avgScore).toBe(0);
    });
  });

  describe('Completion Rate Tracking', () => {
    it('should calculate wizard completion rate', () => {
      // Session 1: Complete
      startWizardSession();
      completeWizardSession(85);
      
      // Session 2: Incomplete
      sessionStorage.clear();
      startWizardSession();
      
      const rate = getWizardCompletionRate();
      expect(rate).toBe(50); // 1 completed out of 2 total
    });

    it('should return 0 for no sessions', () => {
      const rate = getWizardCompletionRate();
      expect(rate).toBe(0);
    });
  });

  describe('Metrics Summary', () => {
    it('should provide comprehensive metrics summary', () => {
      startWizardSession();
      trackSmartDefaultsAcceptance(true);
      trackSuggestionShown();
      trackSuggestionApplication();
      completeWizardSession(90);
      
      const summary = getMetricsSummary();
      
      expect(summary.totalSessions).toBe(1);
      expect(summary.completedSessions).toBe(1);
      expect(summary.wizardCompletionRate).toBe(100);
      expect(summary.averagePromptQualityScore).toBe(90);
      expect(summary.smartDefaultsAcceptanceRate).toBe(100);
      expect(summary.suggestionApplicationRate).toBe(100);
    });

    it('should include target comparison', () => {
      const summary = getMetricsSummary();
      
      expect(summary.targets).toBeDefined();
      expect(summary.targets.completionTimeReduction).toBe(40);
      expect(summary.targets.promptQualityScore).toBe(85);
      expect(summary.targets.smartDefaultsAcceptance).toBe(60);
      expect(summary.targets.suggestionApplication).toBe(40);
      expect(summary.targets.completionRate).toBe(80);
    });

    it('should indicate if targets are met', () => {
      const summary = getMetricsSummary();
      
      expect(summary.meetsTargets).toBeDefined();
      expect(typeof summary.meetsTargets.completionTime).toBe('boolean');
      expect(typeof summary.meetsTargets.promptQuality).toBe('boolean');
      expect(typeof summary.meetsTargets.smartDefaults).toBe('boolean');
      expect(typeof summary.meetsTargets.suggestions).toBe('boolean');
      expect(typeof summary.meetsTargets.completion).toBe('boolean');
    });
  });

  describe('Data Persistence', () => {
    it('should persist data to localStorage', () => {
      startWizardSession();
      completeWizardSession(85);
      
      const stored = localStorage.getItem('webknot-ai-metrics');
      expect(stored).toBeTruthy();
      
      const data = JSON.parse(stored!);
      expect(data.sessions).toBeDefined();
      expect(data.sessions.length).toBe(1);
    });

    it('should handle localStorage errors gracefully', () => {
      // Mock console.error to suppress error logs
      const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Mock localStorage.setItem to throw error
      const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');
      mockSetItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });
      
      // Should not throw - errors are caught internally
      try {
        startWizardSession();
        // If we get here, error was handled gracefully
        expect(true).toBe(true);
      } catch (error) {
        // Should not reach here
        expect(error).toBeUndefined();
      }
      
      mockSetItem.mockRestore();
      mockConsoleError.mockRestore();
    });
  });

  describe('Data Clearing', () => {
    it('should clear all metrics data', () => {
      // Ensure clean state
      clearMetricsData();
      localStorage.clear();
      sessionStorage.clear();
      
      startWizardSession();
      trackSmartDefaultsAcceptance(true);
      completeWizardSession(85);
      
      clearMetricsData();
      
      const summary = getMetricsSummary();
      expect(summary.totalSessions).toBe(0);
      expect(summary.completedSessions).toBe(0);
    });
  });
});
