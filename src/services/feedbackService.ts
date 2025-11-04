/**
 * Feedback Service
 * 
 * Collects and stores user feedback on AI suggestions and enhancements
 * Tracks acceptance rates and provides analytics for prompt optimization
 */

import type {
  UserFeedback,
  FeedbackType,
  FeedbackTarget,
  FeedbackStats,
  FeedbackStorage,
} from '../types/gemini';

const STORAGE_KEY = 'webknot-ai-feedback';
const MAX_FEEDBACK_ITEMS = 1000; // Limit storage size

export class FeedbackService {
  private feedback: UserFeedback[] = [];
  
  constructor() {
    this.loadFromStorage();
  }
  
  /**
   * Records user feedback on an AI feature
   * 
   * @param type - Thumbs up or thumbs down
   * @param target - What feature the feedback is for
   * @param targetId - Unique identifier for the specific item
   * @param metadata - Additional context about the feedback
   * @param content - Optional text feedback from user
   * @returns The created feedback entry
   */
  recordFeedback(
    type: FeedbackType,
    target: FeedbackTarget,
    targetId: string,
    metadata?: UserFeedback['metadata'],
    content?: string
  ): UserFeedback {
    const feedback: UserFeedback = {
      id: this.generateId(),
      timestamp: Date.now(),
      type,
      target,
      targetId,
      content,
      metadata,
    };
    
    this.feedback.push(feedback);
    
    // Limit storage size by removing oldest entries
    if (this.feedback.length > MAX_FEEDBACK_ITEMS) {
      this.feedback = this.feedback.slice(-MAX_FEEDBACK_ITEMS);
    }
    
    this.saveToStorage();
    
    console.log(`[FeedbackService] Recorded ${type} feedback for ${target}:`, targetId);
    
    return feedback;
  }
  
  /**
   * Records when a user accepts or rejects a suggestion
   * 
   * @param suggestionId - The suggestion identifier
   * @param accepted - Whether the suggestion was accepted
   * @param suggestionType - Type of suggestion
   * @param severity - Severity level
   */
  recordSuggestionAction(
    suggestionId: string,
    accepted: boolean,
    suggestionType?: string,
    severity?: string
  ): void {
    this.recordFeedback(
      accepted ? 'thumbs-up' : 'thumbs-down',
      'suggestion',
      suggestionId,
      {
        wasAccepted: accepted,
        suggestionType: suggestionType as 'improvement' | 'warning' | 'tip' | undefined,
        suggestionSeverity: severity as 'low' | 'medium' | 'high' | undefined,
      }
    );
  }
  
  /**
   * Records when a user accepts or rejects a prompt enhancement
   * 
   * @param enhancementId - The enhancement identifier
   * @param accepted - Whether the enhancement was accepted
   */
  recordEnhancementAction(
    enhancementId: string,
    accepted: boolean
  ): void {
    this.recordFeedback(
      accepted ? 'thumbs-up' : 'thumbs-down',
      'enhancement',
      enhancementId,
      {
        wasAccepted: accepted,
      }
    );
  }
  
  /**
   * Gets all feedback entries
   * 
   * @param target - Optional filter by target type
   * @param since - Optional timestamp to get feedback since
   * @returns Array of feedback entries
   */
  getFeedback(target?: FeedbackTarget, since?: number): UserFeedback[] {
    let filtered = this.feedback;
    
    if (target) {
      filtered = filtered.filter(f => f.target === target);
    }
    
    if (since) {
      filtered = filtered.filter(f => f.timestamp >= since);
    }
    
    return filtered;
  }
  
  /**
   * Calculates feedback statistics
   * 
   * @param since - Optional timestamp to calculate stats since
   * @returns Feedback statistics
   */
  getStats(since?: number): FeedbackStats {
    const feedback = since
      ? this.feedback.filter(f => f.timestamp >= since)
      : this.feedback;
    
    const totalFeedback = feedback.length;
    const positiveCount = feedback.filter(f => f.type === 'thumbs-up').length;
    const negativeCount = feedback.filter(f => f.type === 'thumbs-down').length;
    
    // Calculate feedback by type
    const feedbackByType: FeedbackStats['feedbackByType'] = {
      suggestion: { positive: 0, negative: 0, total: 0 },
      enhancement: { positive: 0, negative: 0, total: 0 },
      analysis: { positive: 0, negative: 0, total: 0 },
      chat: { positive: 0, negative: 0, total: 0 },
    };
    
    feedback.forEach(f => {
      feedbackByType[f.target].total++;
      if (f.type === 'thumbs-up') {
        feedbackByType[f.target].positive++;
      } else {
        feedbackByType[f.target].negative++;
      }
    });
    
    // Calculate suggestion acceptance rate by type
    const suggestionAcceptanceRate: Record<string, number> = {};
    const suggestionFeedback = feedback.filter(f => f.target === 'suggestion');
    
    // Group by suggestion type
    const byType: Record<string, { accepted: number; total: number }> = {};
    
    suggestionFeedback.forEach(f => {
      const type = f.metadata?.suggestionType as string || 'unknown';
      
      if (!byType[type]) {
        byType[type] = { accepted: 0, total: 0 };
      }
      
      byType[type].total++;
      if (f.metadata?.wasAccepted) {
        byType[type].accepted++;
      }
    });
    
    // Calculate rates
    Object.entries(byType).forEach(([type, stats]) => {
      suggestionAcceptanceRate[type] = stats.total > 0
        ? stats.accepted / stats.total
        : 0;
    });
    
    return {
      totalFeedback,
      positiveCount,
      negativeCount,
      acceptanceRate: totalFeedback > 0 ? positiveCount / totalFeedback : 0,
      feedbackByType,
      suggestionAcceptanceRate,
    };
  }
  
  /**
   * Gets low-quality suggestions (those with low acceptance rates)
   * 
   * @param threshold - Acceptance rate threshold (default: 0.5)
   * @returns Array of suggestion types with low acceptance
   */
  getLowQualitySuggestions(threshold: number = 0.5): Array<{
    type: string;
    acceptanceRate: number;
    totalCount: number;
  }> {
    const stats = this.getStats();
    
    return Object.entries(stats.suggestionAcceptanceRate)
      .filter(([_, rate]) => rate < threshold)
      .map(([type, rate]) => {
        const feedback = this.feedback.filter(
          f => f.target === 'suggestion' && f.metadata?.suggestionType === type
        );
        
        return {
          type,
          acceptanceRate: rate,
          totalCount: feedback.length,
        };
      })
      .sort((a, b) => a.acceptanceRate - b.acceptanceRate);
  }
  
  /**
   * Clears all feedback data
   */
  clear(): void {
    this.feedback = [];
    this.saveToStorage();
    console.log('[FeedbackService] Cleared all feedback data');
  }
  
  /**
   * Tracks accuracy over time by calculating acceptance rates for different time periods
   * 
   * @param periods - Array of time periods in days (e.g., [7, 14, 30])
   * @returns Object mapping period to acceptance rate
   */
  trackAccuracyOverTime(periods: number[] = [7, 14, 30]): Record<string, number> {
    const now = Date.now();
    const accuracy: Record<string, number> = {};
    
    periods.forEach(days => {
      const since = now - (days * 24 * 60 * 60 * 1000);
      const stats = this.getStats(since);
      accuracy[`${days}d`] = stats.acceptanceRate;
    });
    
    return accuracy;
  }
  
  /**
   * Generates improvement recommendations based on feedback analysis
   * 
   * @returns Array of actionable recommendations
   */
  generateRecommendations(): Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    message: string;
    action: string;
  }> {
    const recommendations: Array<{
      priority: 'high' | 'medium' | 'low';
      category: string;
      message: string;
      action: string;
    }> = [];
    
    const stats = this.getStats();
    const lowQuality = this.getLowQualitySuggestions(0.5);
    
    // Check overall acceptance rate
    if (stats.acceptanceRate < 0.5) {
      recommendations.push({
        priority: 'high',
        category: 'Overall Quality',
        message: `Overall acceptance rate is ${(stats.acceptanceRate * 100).toFixed(1)}%, which is below the 50% threshold.`,
        action: 'Review and refine all AI prompts to improve suggestion quality across the board.',
      });
    }
    
    // Check low-quality suggestions
    if (lowQuality.length > 0) {
      lowQuality.forEach(suggestion => {
        recommendations.push({
          priority: suggestion.acceptanceRate < 0.3 ? 'high' : 'medium',
          category: `Suggestion Type: ${suggestion.type}`,
          message: `"${suggestion.type}" suggestions have ${(suggestion.acceptanceRate * 100).toFixed(1)}% acceptance rate.`,
          action: `Optimize prompts for "${suggestion.type}" suggestions to improve relevance and quality.`,
        });
      });
    }
    
    // Check feedback volume
    if (stats.totalFeedback < 50) {
      recommendations.push({
        priority: 'low',
        category: 'Data Collection',
        message: `Only ${stats.totalFeedback} feedback entries collected so far.`,
        action: 'Encourage more users to provide feedback to get more reliable insights.',
      });
    }
    
    // Check feature-specific acceptance rates
    Object.entries(stats.feedbackByType).forEach(([type, data]) => {
      if (data.total > 10) { // Only if we have enough data
        const rate = data.positive / data.total;
        if (rate < 0.5) {
          recommendations.push({
            priority: 'medium',
            category: `Feature: ${type}`,
            message: `${type} feature has ${(rate * 100).toFixed(1)}% acceptance rate.`,
            action: `Review and improve ${type} feature implementation and prompts.`,
          });
        }
      }
    });
    
    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    
    return recommendations;
  }
  
  /**
   * Exports feedback data for analysis
   * 
   * @returns JSON string of all feedback
   */
  export(): string {
    return JSON.stringify({
      feedback: this.feedback,
      stats: this.getStats(),
      accuracyOverTime: this.trackAccuracyOverTime(),
      recommendations: this.generateRecommendations(),
      exportedAt: Date.now(),
    }, null, 2);
  }
  
  /**
   * Generates a unique ID for feedback entries
   * 
   * @returns Unique identifier
   */
  private generateId(): string {
    return `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  /**
   * Loads feedback from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: FeedbackStorage = JSON.parse(stored);
        this.feedback = data.feedback || [];
        console.log(`[FeedbackService] Loaded ${this.feedback.length} feedback entries`);
      }
    } catch (error) {
      console.error('[FeedbackService] Failed to load feedback from storage:', error);
      this.feedback = [];
    }
  }
  
  /**
   * Saves feedback to localStorage
   */
  private saveToStorage(): void {
    try {
      const data: FeedbackStorage = {
        feedback: this.feedback,
        lastSync: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('[FeedbackService] Failed to save feedback to storage:', error);
    }
  }
}

// Singleton instance
let feedbackServiceInstance: FeedbackService | null = null;

/**
 * Gets the singleton feedback service instance
 * 
 * @returns The feedback service instance
 */
export function getFeedbackService(): FeedbackService {
  if (!feedbackServiceInstance) {
    feedbackServiceInstance = new FeedbackService();
  }
  return feedbackServiceInstance;
}
