/**
 * Analytics Tracking for AI Features
 * 
 * Tracks AI feature usage and performance metrics for analysis and improvement.
 * All events are stored in LocalStorage for privacy and can be exported for analysis.
 */

const ANALYTICS_STORAGE_KEY = 'webknot-ai-analytics';

export interface AIEvent {
  event: string;
  timestamp: number;
  data?: Record<string, any>;
}

export interface AnalyticsData {
  events: AIEvent[];
  sessionId: string;
  lastUpdated: number;
}

/**
 * Generate a unique session ID
 */
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get or create session ID
 */
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('webknot-session-id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('webknot-session-id', sessionId);
  }
  return sessionId;
};

/**
 * Get analytics data from LocalStorage
 */
const getAnalyticsData = (): AnalyticsData => {
  try {
    const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load analytics data:', error);
  }
  
  return {
    events: [],
    sessionId: getSessionId(),
    lastUpdated: Date.now(),
  };
};

/**
 * Save analytics data to LocalStorage
 */
const saveAnalyticsData = (data: AnalyticsData): void => {
  try {
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save analytics data:', error);
  }
};

/**
 * Track an AI event
 * 
 * @param event - Event name (e.g., 'smart_defaults_applied')
 * @param data - Optional event data
 * 
 * @example
 * ```typescript
 * trackAIEvent('smart_defaults_applied', {
 *   projectType: 'Portfolio',
 *   confidence: 0.85,
 *   accepted: true
 * });
 * ```
 */
export const trackAIEvent = (event: string, data?: Record<string, any>): void => {
  try {
    const analyticsData = getAnalyticsData();
    
    const aiEvent: AIEvent = {
      event,
      timestamp: Date.now(),
      data,
    };
    
    analyticsData.events.push(aiEvent);
    analyticsData.lastUpdated = Date.now();
    
    saveAnalyticsData(analyticsData);
    
    // Also log to console in development
    if (process.env['NODE_ENV'] === 'development') {
      console.log('[AI Analytics]', event, data);
    }
  } catch (error) {
    console.error('Failed to track AI event:', error);
  }
};

/**
 * Get all tracked events
 */
export const getTrackedEvents = (): AIEvent[] => {
  const data = getAnalyticsData();
  return data.events;
};

/**
 * Get events by type
 */
export const getEventsByType = (eventType: string): AIEvent[] => {
  const data = getAnalyticsData();
  return data.events.filter(e => e.event === eventType);
};

/**
 * Get events within a time range
 */
export const getEventsByTimeRange = (startTime: number, endTime: number): AIEvent[] => {
  const data = getAnalyticsData();
  return data.events.filter(e => e.timestamp >= startTime && e.timestamp <= endTime);
};

/**
 * Calculate event statistics
 */
export interface EventStats {
  totalEvents: number;
  eventCounts: Record<string, number>;
  averageEventsPerSession: number;
  mostCommonEvent: string | null;
  leastCommonEvent: string | null;
}

export const getEventStats = (): EventStats => {
  const data = getAnalyticsData();
  const events = data.events;
  
  // Count events by type
  const eventCounts: Record<string, number> = {};
  events.forEach(e => {
    eventCounts[e.event] = (eventCounts[e.event] || 0) + 1;
  });
  
  // Find most and least common events
  const sortedEvents = Object.entries(eventCounts).sort((a, b) => b[1] - a[1]);
  const mostCommonEvent = sortedEvents[0]?.[0] || null;
  const leastCommonEvent = sortedEvents[sortedEvents.length - 1]?.[0] || null;
  
  return {
    totalEvents: events.length,
    eventCounts,
    averageEventsPerSession: events.length, // Simplified - would need session tracking
    mostCommonEvent,
    leastCommonEvent,
  };
};

/**
 * Calculate acceptance rates for AI features
 */
export interface AcceptanceRates {
  smartDefaults: {
    applied: number;
    total: number;
    rate: number;
  };
  suggestions: {
    applied: number;
    total: number;
    rate: number;
  };
  promptAnalysis: {
    fixesApplied: number;
    total: number;
    rate: number;
  };
  compatibilityChecks: {
    fixesApplied: number;
    total: number;
    rate: number;
  };
}

export const getAcceptanceRates = (): AcceptanceRates => {
  const events = getTrackedEvents();
  
  // Smart Defaults
  const smartDefaultsApplied = events.filter(e => e.event === 'smart_defaults_applied').length;
  const smartDefaultsViewed = events.filter(e => 
    e.event === 'smart_defaults_viewed' || e.event === 'smart_defaults_applied'
  ).length;
  
  // Suggestions
  const suggestionsApplied = events.filter(e => e.event === 'suggestion_applied').length;
  const suggestionsViewed = events.filter(e => 
    e.event === 'suggestions_viewed' || e.event === 'suggestion_applied'
  ).length;
  
  // Prompt Analysis
  const promptFixesApplied = events.filter(e => e.event === 'prompt_fixes_applied').length;
  const promptsAnalyzed = events.filter(e => e.event === 'prompt_analyzed').length;
  
  // Compatibility Checks
  const compatibilityFixesApplied = events.filter(e => 
    e.event === 'compatibility_fix_applied'
  ).length;
  const compatibilityChecked = events.filter(e => e.event === 'compatibility_checked').length;
  
  return {
    smartDefaults: {
      applied: smartDefaultsApplied,
      total: smartDefaultsViewed,
      rate: smartDefaultsViewed > 0 ? (smartDefaultsApplied / smartDefaultsViewed) * 100 : 0,
    },
    suggestions: {
      applied: suggestionsApplied,
      total: suggestionsViewed,
      rate: suggestionsViewed > 0 ? (suggestionsApplied / suggestionsViewed) * 100 : 0,
    },
    promptAnalysis: {
      fixesApplied: promptFixesApplied,
      total: promptsAnalyzed,
      rate: promptsAnalyzed > 0 ? (promptFixesApplied / promptsAnalyzed) * 100 : 0,
    },
    compatibilityChecks: {
      fixesApplied: compatibilityFixesApplied,
      total: compatibilityChecked,
      rate: compatibilityChecked > 0 ? (compatibilityFixesApplied / compatibilityChecked) * 100 : 0,
    },
  };
};

/**
 * Calculate average prompt quality scores
 */
export const getAveragePromptQuality = (): number => {
  const events = getEventsByType('prompt_analyzed');
  
  if (events.length === 0) return 0;
  
  const scores = events
    .map(e => e.data?.['score'])
    .filter((score): score is number => typeof score === 'number');
  
  if (scores.length === 0) return 0;
  
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return sum / scores.length;
};

/**
 * Export analytics data as JSON
 */
export const exportAnalyticsData = (): string => {
  const data = getAnalyticsData();
  return JSON.stringify(data, null, 2);
};

/**
 * Clear all analytics data
 */
export const clearAnalyticsData = (): void => {
  try {
    localStorage.removeItem(ANALYTICS_STORAGE_KEY);
    sessionStorage.removeItem('webknot-session-id');
  } catch (error) {
    console.error('Failed to clear analytics data:', error);
  }
};

/**
 * Get analytics summary for display
 */
export interface AnalyticsSummary {
  totalEvents: number;
  sessionId: string;
  acceptanceRates: AcceptanceRates;
  averagePromptQuality: number;
  eventStats: EventStats;
  lastUpdated: number;
}

export const getAnalyticsSummary = (): AnalyticsSummary => {
  const data = getAnalyticsData();
  
  return {
    totalEvents: data.events.length,
    sessionId: data.sessionId,
    acceptanceRates: getAcceptanceRates(),
    averagePromptQuality: getAveragePromptQuality(),
    eventStats: getEventStats(),
    lastUpdated: data.lastUpdated,
  };
};
