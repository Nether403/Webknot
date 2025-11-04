import { FeedbackData } from '../components/ai/FeedbackPrompt';

const FEEDBACK_STORAGE_KEY = 'webknot-ai-feedback';

export interface StoredFeedback {
  feedbacks: FeedbackData[];
  lastUpdated: number;
}

/**
 * Save feedback to LocalStorage
 */
export const saveFeedback = (feedback: FeedbackData): void => {
  try {
    const stored = getFeedbackHistory();
    stored.feedbacks.push(feedback);
    stored.lastUpdated = Date.now();
    
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(stored));
  } catch (error) {
    console.error('Failed to save feedback:', error);
  }
};

/**
 * Get all feedback history from LocalStorage
 */
export const getFeedbackHistory = (): StoredFeedback => {
  try {
    const stored = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load feedback history:', error);
  }
  
  return {
    feedbacks: [],
    lastUpdated: Date.now(),
  };
};

/**
 * Get feedback for a specific feature
 */
export const getFeedbackForFeature = (feature: string): FeedbackData[] => {
  const history = getFeedbackHistory();
  return history.feedbacks.filter(f => f.feature === feature);
};

/**
 * Calculate acceptance rate for a feature
 */
export const calculateAcceptanceRate = (feature: string): number => {
  const feedbacks = getFeedbackForFeature(feature);
  
  if (feedbacks.length === 0) {
    return 0;
  }
  
  const helpful = feedbacks.filter(f => f.helpful).length;
  return (helpful / feedbacks.length) * 100;
};

/**
 * Get feedback statistics
 */
export interface FeedbackStats {
  totalFeedbacks: number;
  helpfulCount: number;
  notHelpfulCount: number;
  overallRate: number;
  byFeature: Record<string, {
    count: number;
    helpfulCount: number;
    rate: number;
  }>;
}

export const getFeedbackStats = (): FeedbackStats => {
  const history = getFeedbackHistory();
  const feedbacks = history.feedbacks;
  
  const helpfulCount = feedbacks.filter(f => f.helpful).length;
  const notHelpfulCount = feedbacks.filter(f => !f.helpful).length;
  
  // Group by feature
  const byFeature: Record<string, FeedbackData[]> = {};
  feedbacks.forEach(f => {
    if (!byFeature[f.feature]) {
      byFeature[f.feature] = [];
    }
    const featureArray = byFeature[f.feature];
    if (featureArray) {
      featureArray.push(f);
    }
  });
  
  // Calculate stats per feature
  const featureStats: Record<string, { count: number; helpfulCount: number; rate: number }> = {};
  Object.entries(byFeature).forEach(([feature, items]) => {
    if (items && items.length > 0) {
      const helpful = items.filter(f => f.helpful).length;
      featureStats[feature] = {
        count: items.length,
        helpfulCount: helpful,
        rate: (helpful / items.length) * 100,
      };
    }
  });
  
  return {
    totalFeedbacks: feedbacks.length,
    helpfulCount,
    notHelpfulCount,
    overallRate: feedbacks.length > 0 ? (helpfulCount / feedbacks.length) * 100 : 0,
    byFeature: featureStats,
  };
};

/**
 * Clear all feedback data
 */
export const clearFeedbackHistory = (): void => {
  try {
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear feedback history:', error);
  }
};
