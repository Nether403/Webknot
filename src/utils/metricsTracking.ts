/**
 * Metrics Tracking for AI Feature Effectiveness
 * 
 * Tracks comprehensive metrics to measure the effectiveness of AI features:
 * - Wizard completion time
 * - Prompt quality scores
 * - Smart defaults acceptance rate
 * - Suggestion application rate
 * - Wizard completion rate
 */

import { trackAIEvent } from './analyticsTracking';

const METRICS_STORAGE_KEY = 'webknot-ai-metrics';

export interface WizardSession {
  sessionId: string;
  startTime: number;
  endTime?: number;
  completed: boolean;
  abandoned: boolean;
  currentStep: string;
  stepsCompleted: string[];
  promptQualityScore?: number;
  smartDefaultsAccepted: boolean;
  suggestionsApplied: number;
  totalSuggestionsShown: number;
}

export interface MetricsData {
  sessions: WizardSession[];
  lastUpdated: number;
}

/**
 * Get metrics data from LocalStorage
 */
const getMetricsData = (): MetricsData => {
  try {
    const stored = localStorage.getItem(METRICS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load metrics data:', error);
  }
  
  return {
    sessions: [],
    lastUpdated: Date.now(),
  };
};

/**
 * Save metrics data to LocalStorage
 */
const saveMetricsData = (data: MetricsData): void => {
  try {
    localStorage.setItem(METRICS_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save metrics data:', error);
  }
};

/**
 * Get current session ID from sessionStorage
 */
const getCurrentSessionId = (): string => {
  try {
    let sessionId = sessionStorage.getItem('lovabolt-session-id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('lovabolt-session-id', sessionId);
    }
    return sessionId;
  } catch (error) {
    // If sessionStorage fails, generate a temporary session ID
    console.error('Failed to access sessionStorage:', error);
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};

/**
 * Start tracking a new wizard session
 */
export const startWizardSession = (): void => {
  const sessionId = getCurrentSessionId();
  const metricsData = getMetricsData();
  
  // Check if session already exists
  const existingSession = metricsData.sessions.find(s => s.sessionId === sessionId);
  if (existingSession) {
    return; // Session already started
  }
  
  const newSession: WizardSession = {
    sessionId,
    startTime: Date.now(),
    completed: false,
    abandoned: false,
    currentStep: 'project-setup',
    stepsCompleted: [],
    smartDefaultsAccepted: false,
    suggestionsApplied: 0,
    totalSuggestionsShown: 0,
  };
  
  metricsData.sessions.push(newSession);
  metricsData.lastUpdated = Date.now();
  saveMetricsData(metricsData);
  
  trackAIEvent('wizard_session_started', { sessionId });
};

/**
 * Update current wizard step
 */
export const updateWizardStep = (step: string): void => {
  const sessionId = getCurrentSessionId();
  const metricsData = getMetricsData();
  
  const session = metricsData.sessions.find(s => s.sessionId === sessionId);
  if (!session) {
    startWizardSession();
    return updateWizardStep(step);
  }
  
  session.currentStep = step;
  if (!session.stepsCompleted.includes(step)) {
    session.stepsCompleted.push(step);
  }
  
  metricsData.lastUpdated = Date.now();
  saveMetricsData(metricsData);
  
  trackAIEvent('wizard_step_changed', { sessionId, step });
};

/**
 * Mark wizard as completed
 */
export const completeWizardSession = (promptQualityScore?: number): void => {
  const sessionId = getCurrentSessionId();
  const metricsData = getMetricsData();
  
  const session = metricsData.sessions.find(s => s.sessionId === sessionId);
  if (!session) {
    return;
  }
  
  session.completed = true;
  session.endTime = Date.now();
  session.promptQualityScore = promptQualityScore;
  
  metricsData.lastUpdated = Date.now();
  saveMetricsData(metricsData);
  
  const completionTime = session.endTime - session.startTime;
  trackAIEvent('wizard_session_completed', { 
    sessionId, 
    completionTime,
    promptQualityScore 
  });
};

/**
 * Mark wizard as abandoned
 */
export const abandonWizardSession = (): void => {
  const sessionId = getCurrentSessionId();
  const metricsData = getMetricsData();
  
  const session = metricsData.sessions.find(s => s.sessionId === sessionId);
  if (!session || session.completed) {
    return;
  }
  
  session.abandoned = true;
  session.endTime = Date.now();
  
  metricsData.lastUpdated = Date.now();
  saveMetricsData(metricsData);
  
  trackAIEvent('wizard_session_abandoned', { 
    sessionId,
    currentStep: session.currentStep,
    stepsCompleted: session.stepsCompleted.length
  });
};

/**
 * Track smart defaults acceptance
 */
export const trackSmartDefaultsAcceptance = (accepted: boolean): void => {
  const sessionId = getCurrentSessionId();
  const metricsData = getMetricsData();
  
  const session = metricsData.sessions.find(s => s.sessionId === sessionId);
  if (session) {
    session.smartDefaultsAccepted = accepted;
    metricsData.lastUpdated = Date.now();
    saveMetricsData(metricsData);
  }
  
  trackAIEvent('smart_defaults_decision', { sessionId, accepted });
};

/**
 * Track suggestion shown
 */
export const trackSuggestionShown = (): void => {
  const sessionId = getCurrentSessionId();
  const metricsData = getMetricsData();
  
  const session = metricsData.sessions.find(s => s.sessionId === sessionId);
  if (session) {
    session.totalSuggestionsShown++;
    metricsData.lastUpdated = Date.now();
    saveMetricsData(metricsData);
  }
};

/**
 * Track suggestion application
 */
export const trackSuggestionApplication = (): void => {
  const sessionId = getCurrentSessionId();
  const metricsData = getMetricsData();
  
  const session = metricsData.sessions.find(s => s.sessionId === sessionId);
  if (session) {
    session.suggestionsApplied++;
    metricsData.lastUpdated = Date.now();
    saveMetricsData(metricsData);
  }
  
  trackAIEvent('suggestion_applied', { sessionId });
};

/**
 * Calculate average wizard completion time
 */
export const getAverageCompletionTime = (): number => {
  const metricsData = getMetricsData();
  const completedSessions = metricsData.sessions.filter(s => s.completed && s.endTime);
  
  if (completedSessions.length === 0) return 0;
  
  const totalTime = completedSessions.reduce((sum, session) => {
    return sum + (session.endTime! - session.startTime);
  }, 0);
  
  return totalTime / completedSessions.length;
};

/**
 * Calculate average prompt quality score
 */
export const getAveragePromptQualityScore = (): number => {
  const metricsData = getMetricsData();
  const sessionsWithScores = metricsData.sessions.filter(
    s => s.promptQualityScore !== undefined
  );
  
  if (sessionsWithScores.length === 0) return 0;
  
  const totalScore = sessionsWithScores.reduce((sum, session) => {
    return sum + (session.promptQualityScore || 0);
  }, 0);
  
  return totalScore / sessionsWithScores.length;
};

/**
 * Calculate smart defaults acceptance rate
 */
export const getSmartDefaultsAcceptanceRate = (): number => {
  const metricsData = getMetricsData();
  const sessionsWithDefaults = metricsData.sessions.filter(
    s => s.smartDefaultsAccepted !== undefined
  );
  
  if (sessionsWithDefaults.length === 0) return 0;
  
  const accepted = sessionsWithDefaults.filter(s => s.smartDefaultsAccepted).length;
  return (accepted / sessionsWithDefaults.length) * 100;
};

/**
 * Calculate suggestion application rate
 */
export const getSuggestionApplicationRate = (): number => {
  const metricsData = getMetricsData();
  const sessionsWithSuggestions = metricsData.sessions.filter(
    s => s.totalSuggestionsShown > 0
  );
  
  if (sessionsWithSuggestions.length === 0) return 0;
  
  const totalShown = sessionsWithSuggestions.reduce((sum, s) => sum + s.totalSuggestionsShown, 0);
  const totalApplied = sessionsWithSuggestions.reduce((sum, s) => sum + s.suggestionsApplied, 0);
  
  return (totalApplied / totalShown) * 100;
};

/**
 * Calculate wizard completion rate
 */
export const getWizardCompletionRate = (): number => {
  const metricsData = getMetricsData();
  const totalSessions = metricsData.sessions.length;
  
  if (totalSessions === 0) return 0;
  
  const completedSessions = metricsData.sessions.filter(s => s.completed).length;
  return (completedSessions / totalSessions) * 100;
};

/**
 * Get comprehensive metrics summary
 */
export interface MetricsSummary {
  totalSessions: number;
  completedSessions: number;
  abandonedSessions: number;
  averageCompletionTime: number;
  averageCompletionTimeMinutes: number;
  averagePromptQualityScore: number;
  smartDefaultsAcceptanceRate: number;
  suggestionApplicationRate: number;
  wizardCompletionRate: number;
  targets: {
    completionTimeReduction: number; // Target: 40% reduction
    promptQualityScore: number; // Target: 85+
    smartDefaultsAcceptance: number; // Target: >60%
    suggestionApplication: number; // Target: >40%
    completionRate: number; // Target: 80%+
  };
  meetsTargets: {
    completionTime: boolean;
    promptQuality: boolean;
    smartDefaults: boolean;
    suggestions: boolean;
    completion: boolean;
  };
}

export const getMetricsSummary = (): MetricsSummary => {
  const metricsData = getMetricsData();
  const avgCompletionTime = getAverageCompletionTime();
  const avgCompletionTimeMinutes = avgCompletionTime / 60000; // Convert to minutes
  const avgPromptQuality = getAveragePromptQualityScore();
  const smartDefaultsRate = getSmartDefaultsAcceptanceRate();
  const suggestionRate = getSuggestionApplicationRate();
  const completionRate = getWizardCompletionRate();
  
  // Baseline: 10 minutes (600000ms) - Target: 6 minutes (360000ms) = 40% reduction
  const baselineTime = 600000; // 10 minutes in ms
  const completionTimeReduction = ((baselineTime - avgCompletionTime) / baselineTime) * 100;
  
  return {
    totalSessions: metricsData.sessions.length,
    completedSessions: metricsData.sessions.filter(s => s.completed).length,
    abandonedSessions: metricsData.sessions.filter(s => s.abandoned).length,
    averageCompletionTime: avgCompletionTime,
    averageCompletionTimeMinutes: avgCompletionTimeMinutes,
    averagePromptQualityScore: avgPromptQuality,
    smartDefaultsAcceptanceRate: smartDefaultsRate,
    suggestionApplicationRate: suggestionRate,
    wizardCompletionRate: completionRate,
    targets: {
      completionTimeReduction: 40,
      promptQualityScore: 85,
      smartDefaultsAcceptance: 60,
      suggestionApplication: 40,
      completionRate: 80,
    },
    meetsTargets: {
      completionTime: completionTimeReduction >= 40,
      promptQuality: avgPromptQuality >= 85,
      smartDefaults: smartDefaultsRate >= 60,
      suggestions: suggestionRate >= 40,
      completion: completionRate >= 80,
    },
  };
};

/**
 * Export metrics data as JSON
 */
export const exportMetricsData = (): string => {
  const data = getMetricsData();
  const summary = getMetricsSummary();
  
  return JSON.stringify({
    summary,
    sessions: data.sessions,
    lastUpdated: data.lastUpdated,
  }, null, 2);
};

/**
 * Clear all metrics data
 */
export const clearMetricsData = (): void => {
  try {
    localStorage.removeItem(METRICS_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear metrics data:', error);
  }
};

/**
 * Get detailed session data for analysis
 */
export const getSessionDetails = (sessionId: string): WizardSession | null => {
  const metricsData = getMetricsData();
  return metricsData.sessions.find(s => s.sessionId === sessionId) || null;
};

/**
 * Get all sessions
 */
export const getAllSessions = (): WizardSession[] => {
  const metricsData = getMetricsData();
  return metricsData.sessions;
};
