/**
 * Analytics Service
 * 
 * Advanced analytics for Gemini AI integration including:
 * - AI feature adoption rate tracking
 * - User engagement metrics
 * - Cost trend analysis
 * - ROI calculations
 * - User segmentation data
 */

import { getMetricsService } from './metricsService';
import { getCostTracker } from './costTracker';
import type { GeminiLogEntry } from '../types/gemini';

export interface AdoptionMetrics {
  totalUsers: number;
  aiUsers: number;
  adoptionRate: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
}

export interface EngagementMetrics {
  averageRequestsPerUser: number;
  averageSessionDuration: number;
  returnUserRate: number;
  featureUsageRate: Record<string, number>;
  mostUsedFeature: string;
}

export interface CostTrend {
  date: string;
  cost: number;
  requests: number;
  costPerRequest: number;
}

export interface ROIMetrics {
  totalCost: number;
  estimatedTimeSaved: number; // in hours
  estimatedValueGenerated: number; // in USD
  roi: number; // percentage
  paybackPeriod: number; // in days
}

export interface UserSegment {
  segment: 'free' | 'premium' | 'power' | 'casual';
  count: number;
  percentage: number;
  avgRequests: number;
  avgCost: number;
}

interface AnalyticsStorage {
  users: Set<string>;
  sessions: Map<string, SessionData>;
  lastUpdate: number;
}

interface SessionData {
  userId: string;
  startTime: number;
  endTime: number;
  requestCount: number;
  featuresUsed: Set<string>;
}

export class AnalyticsService {
  private storageKey = 'webknot-analytics';
  private users: Set<string> = new Set();
  private sessions: Map<string, SessionData> = new Map();
  
  constructor() {
    this.loadFromStorage();
    this.initializeTracking();
  }
  
  /**
   * Tracks a user interaction with AI features
   * 
   * @param userId - Unique user identifier
   * @param feature - Feature being used
   */
  trackUserInteraction(userId: string, feature: string): void {
    // Add user to set
    this.users.add(userId);
    
    // Get or create session
    let session = this.sessions.get(userId);
    if (!session) {
      session = {
        userId,
        startTime: Date.now(),
        endTime: Date.now(),
        requestCount: 0,
        featuresUsed: new Set(),
      };
      this.sessions.set(userId, session);
    }
    
    // Update session
    session.endTime = Date.now();
    session.requestCount++;
    session.featuresUsed.add(feature);
    
    this.saveToStorage();
  }
  
  /**
   * Gets AI feature adoption metrics
   * 
   * @returns Adoption metrics
   */
  getAdoptionMetrics(): AdoptionMetrics {
    const metricsService = getMetricsService();
    const logs = (metricsService as any).logs as GeminiLogEntry[];
    
    // Estimate total users (assuming each unique session is a user)
    const totalUsers = Math.max(this.users.size, 100); // Minimum 100 for demo
    const aiUsers = this.users.size;
    const adoptionRate = aiUsers / totalUsers;
    
    // Count new users this week/month
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    
    let newUsersThisWeek = 0;
    let newUsersThisMonth = 0;
    
    for (const session of this.sessions.values()) {
      if (session.startTime >= oneWeekAgo) {
        newUsersThisWeek++;
      }
      if (session.startTime >= oneMonthAgo) {
        newUsersThisMonth++;
      }
    }
    
    return {
      totalUsers,
      aiUsers,
      adoptionRate: Math.round(adoptionRate * 100) / 100,
      newUsersThisWeek,
      newUsersThisMonth,
    };
  }
  
  /**
   * Gets user engagement metrics
   * 
   * @returns Engagement metrics
   */
  getEngagementMetrics(): EngagementMetrics {
    const metricsService = getMetricsService();
    const metrics = metricsService.getMetrics();
    
    // Calculate average requests per user
    const totalRequests = metrics.totalRequests;
    const totalUsers = Math.max(this.users.size, 1);
    const averageRequestsPerUser = totalRequests / totalUsers;
    
    // Calculate average session duration
    let totalDuration = 0;
    let sessionCount = 0;
    
    for (const session of this.sessions.values()) {
      totalDuration += session.endTime - session.startTime;
      sessionCount++;
    }
    
    const averageSessionDuration = sessionCount > 0 
      ? Math.round(totalDuration / sessionCount / 1000) // in seconds
      : 0;
    
    // Calculate return user rate (users with >1 session)
    const returnUsers = Array.from(this.sessions.values())
      .filter(session => session.requestCount > 1).length;
    const returnUserRate = totalUsers > 0 ? returnUsers / totalUsers : 0;
    
    // Calculate feature usage rates
    const featureUsageRate: Record<string, number> = {};
    let mostUsedFeature = '';
    let maxUsage = 0;
    
    for (const [feature, count] of Object.entries(metrics.requestsByFeature)) {
      const rate = count / totalRequests;
      featureUsageRate[feature] = Math.round(rate * 100) / 100;
      
      if (count > maxUsage) {
        maxUsage = count;
        mostUsedFeature = feature;
      }
    }
    
    return {
      averageRequestsPerUser: Math.round(averageRequestsPerUser * 10) / 10,
      averageSessionDuration,
      returnUserRate: Math.round(returnUserRate * 100) / 100,
      featureUsageRate,
      mostUsedFeature,
    };
  }
  
  /**
   * Gets cost trends over time
   * 
   * @param days - Number of days to analyze (default: 30)
   * @returns Array of cost trends
   */
  getCostTrends(days: number = 30): CostTrend[] {
    const metricsService = getMetricsService();
    const costTracker = getCostTracker();
    const logs = (metricsService as any).logs as GeminiLogEntry[];
    
    const trends: CostTrend[] = [];
    const oneDayMs = 24 * 60 * 60 * 1000;
    const now = Date.now();
    
    for (let i = days - 1; i >= 0; i--) {
      const dayStart = now - (i * oneDayMs);
      const dayEnd = dayStart + oneDayMs;
      
      // Filter logs for this day
      const dayLogs = logs.filter(
        log => log.timestamp >= dayStart && log.timestamp < dayEnd
      );
      
      // Calculate cost for this day
      let dayCost = 0;
      for (const log of dayLogs) {
        dayCost += costTracker.calculateRequestCost(log.tokensUsed, log.model);
      }
      
      const requests = dayLogs.length;
      const costPerRequest = requests > 0 ? dayCost / requests : 0;
      
      const dateStr = new Date(dayStart).toISOString().split('T')[0];
      trends.push({
        date: dateStr ?? 'Unknown',
        cost: Math.round(dayCost * 10000) / 10000,
        requests,
        costPerRequest: Math.round(costPerRequest * 10000) / 10000,
      });
    }
    
    return trends;
  }
  
  /**
   * Calculates ROI metrics
   * 
   * @returns ROI metrics
   */
  getROIMetrics(): ROIMetrics {
    const costTracker = getCostTracker();
    const metricsService = getMetricsService();
    const metrics = metricsService.getMetrics(2592000000); // 30 days
    
    const totalCost = costTracker.getCurrentMonthCost();
    
    // Estimate time saved per AI request
    // Assumptions:
    // - Each AI suggestion saves ~5 minutes of manual work
    // - Each prompt enhancement saves ~10 minutes
    // - Each analysis saves ~3 minutes
    const timeSavings: Record<string, number> = {
      'analysis': 3,
      'suggestions': 5,
      'enhancement': 10,
      'chat': 2,
    };
    
    let totalMinutesSaved = 0;
    for (const [feature, count] of Object.entries(metrics.requestsByFeature)) {
      const minutesPerRequest = timeSavings[feature] || 3;
      totalMinutesSaved += count * minutesPerRequest;
    }
    
    const estimatedTimeSaved = totalMinutesSaved / 60; // in hours
    
    // Estimate value generated
    // Assuming $50/hour developer time
    const hourlyRate = 50;
    const estimatedValueGenerated = estimatedTimeSaved * hourlyRate;
    
    // Calculate ROI
    const roi = totalCost > 0 
      ? ((estimatedValueGenerated - totalCost) / totalCost) * 100
      : 0;
    
    // Calculate payback period (days to recover investment)
    const dailyCost = totalCost / 30;
    const dailyValue = estimatedValueGenerated / 30;
    const paybackPeriod = dailyCost > 0 && dailyValue > dailyCost
      ? totalCost / (dailyValue - dailyCost)
      : Infinity;
    
    return {
      totalCost: Math.round(totalCost * 100) / 100,
      estimatedTimeSaved: Math.round(estimatedTimeSaved * 10) / 10,
      estimatedValueGenerated: Math.round(estimatedValueGenerated * 100) / 100,
      roi: Math.round(roi * 10) / 10,
      paybackPeriod: isFinite(paybackPeriod) ? Math.round(paybackPeriod) : 0,
    };
  }
  
  /**
   * Gets user segmentation data with detailed analysis
   * 
   * @returns Array of user segments with enhanced metrics
   */
  getUserSegmentation(): UserSegment[] {
    const metricsService = getMetricsService();
    const costTracker = getCostTracker();
    const metrics = metricsService.getMetrics();
    
    const totalUsers = Math.max(this.users.size, 1);
    const segments: UserSegment[] = [];
    
    // Analyze sessions to segment users with detailed stats
    const userStats = new Map<string, { 
      requests: number; 
      cost: number; 
      isPremium: boolean;
      featuresUsed: Set<string>;
      lastActive: number;
      firstSeen: number;
    }>();
    
    for (const session of this.sessions.values()) {
      const stats = userStats.get(session.userId) || { 
        requests: 0, 
        cost: 0, 
        isPremium: false,
        featuresUsed: new Set<string>(),
        lastActive: 0,
        firstSeen: session.startTime,
      };
      
      stats.requests += session.requestCount;
      stats.lastActive = Math.max(stats.lastActive, session.endTime);
      stats.firstSeen = Math.min(stats.firstSeen, session.startTime);
      
      // Merge features used
      for (const feature of session.featuresUsed) {
        stats.featuresUsed.add(feature);
      }
      
      userStats.set(session.userId, stats);
    }
    
    // Calculate costs (rough estimate)
    const avgCostPerRequest = metrics.totalRequests > 0 
      ? metrics.estimatedCost / metrics.totalRequests 
      : 0;
    
    // Check premium status for all users
    let premiumUserIds: Set<string> = new Set();
    try {
      const premiumData = localStorage.getItem('webknot-premium-tier');
      if (premiumData) {
        const data = JSON.parse(premiumData);
        if (data.isPremium) {
          // Current user is premium
          const currentUserId = localStorage.getItem('webknot-user-id');
          if (currentUserId) {
            premiumUserIds.add(currentUserId);
          }
        }
      }
    } catch (error) {
      // Ignore
    }
    
    for (const [userId, stats] of userStats.entries()) {
      stats.cost = stats.requests * avgCostPerRequest;
      stats.isPremium = premiumUserIds.has(userId);
    }
    
    // Segment users with enhanced criteria
    const freeUsers: typeof userStats = new Map();
    const premiumUsers: typeof userStats = new Map();
    const powerUsers: typeof userStats = new Map();
    const casualUsers: typeof userStats = new Map();
    
    // Define power user threshold (top 20% by request count)
    const requestCounts = Array.from(userStats.values()).map(s => s.requests).sort((a, b) => b - a);
    const powerUserThreshold = requestCounts[Math.floor(requestCounts.length * 0.2)] || 50;
    
    // Define casual user threshold (bottom 30% by request count)
    const casualUserThreshold = requestCounts[Math.floor(requestCounts.length * 0.7)] || 10;
    
    for (const [userId, stats] of userStats.entries()) {
      // Segment by premium status
      if (stats.isPremium) {
        premiumUsers.set(userId, stats);
      } else {
        freeUsers.set(userId, stats);
      }
      
      // Segment by usage level
      if (stats.requests >= powerUserThreshold) {
        powerUsers.set(userId, stats);
      } else if (stats.requests <= casualUserThreshold) {
        casualUsers.set(userId, stats);
      }
    }
    
    // Calculate segment metrics with enhanced data
    const calculateSegmentMetrics = (
      users: typeof userStats,
      segment: UserSegment['segment']
    ): UserSegment => {
      const count = users.size;
      const percentage = count / totalUsers;
      
      let totalRequests = 0;
      let totalCost = 0;
      
      for (const stats of users.values()) {
        totalRequests += stats.requests;
        totalCost += stats.cost;
      }
      
      const avgRequests = count > 0 ? totalRequests / count : 0;
      const avgCost = count > 0 ? totalCost / count : 0;
      
      return {
        segment,
        count,
        percentage: Math.round(percentage * 100) / 100,
        avgRequests: Math.round(avgRequests * 10) / 10,
        avgCost: Math.round(avgCost * 10000) / 10000,
      };
    };
    
    segments.push(calculateSegmentMetrics(freeUsers, 'free'));
    segments.push(calculateSegmentMetrics(premiumUsers, 'premium'));
    segments.push(calculateSegmentMetrics(powerUsers, 'power'));
    segments.push(calculateSegmentMetrics(casualUsers, 'casual'));
    
    return segments;
  }
  
  /**
   * Gets detailed feature usage patterns by user segment
   * 
   * @returns Feature usage breakdown by segment
   */
  getFeatureUsageBySegment(): {
    segment: 'free' | 'premium' | 'power' | 'casual';
    features: Record<string, number>;
    totalRequests: number;
  }[] {
    const metricsService = getMetricsService();
    const metrics = metricsService.getMetrics();
    
    // Build user stats with feature usage
    const userStats = new Map<string, { 
      requests: number; 
      isPremium: boolean;
      featuresUsed: Map<string, number>;
    }>();
    
    for (const session of this.sessions.values()) {
      const stats = userStats.get(session.userId) || { 
        requests: 0, 
        isPremium: false,
        featuresUsed: new Map<string, number>(),
      };
      
      stats.requests += session.requestCount;
      
      // Count feature usage (estimate based on session features)
      for (const feature of session.featuresUsed) {
        const currentCount = stats.featuresUsed.get(feature) || 0;
        stats.featuresUsed.set(feature, currentCount + 1);
      }
      
      userStats.set(session.userId, stats);
    }
    
    // Check premium status
    let premiumUserIds: Set<string> = new Set();
    try {
      const premiumData = localStorage.getItem('webknot-premium-tier');
      if (premiumData) {
        const data = JSON.parse(premiumData);
        if (data.isPremium) {
          const currentUserId = localStorage.getItem('webknot-user-id');
          if (currentUserId) {
            premiumUserIds.add(currentUserId);
          }
        }
      }
    } catch (error) {
      // Ignore
    }
    
    for (const [userId, stats] of userStats.entries()) {
      stats.isPremium = premiumUserIds.has(userId);
    }
    
    // Define thresholds
    const requestCounts = Array.from(userStats.values()).map(s => s.requests).sort((a, b) => b - a);
    const powerUserThreshold = requestCounts[Math.floor(requestCounts.length * 0.2)] || 50;
    const casualUserThreshold = requestCounts[Math.floor(requestCounts.length * 0.7)] || 10;
    
    // Aggregate feature usage by segment
    const segmentData: Record<string, { features: Map<string, number>; totalRequests: number }> = {
      free: { features: new Map(), totalRequests: 0 },
      premium: { features: new Map(), totalRequests: 0 },
      power: { features: new Map(), totalRequests: 0 },
      casual: { features: new Map(), totalRequests: 0 },
    };
    
    for (const [userId, stats] of userStats.entries()) {
      // Determine segments
      const segments: string[] = [];
      
      if (stats.isPremium) {
        segments.push('premium');
      } else {
        segments.push('free');
      }
      
      if (stats.requests >= powerUserThreshold) {
        segments.push('power');
      } else if (stats.requests <= casualUserThreshold) {
        segments.push('casual');
      }
      
      // Add feature usage to each applicable segment
      for (const segment of segments) {
        const data = segmentData[segment];
        if (data) {
          data.totalRequests += stats.requests;
          
          for (const [feature, count] of stats.featuresUsed.entries()) {
            const currentCount = data.features.get(feature) || 0;
            data.features.set(feature, currentCount + count);
          }
        }
      }
    }
    
    // Convert to array format
    return Object.entries(segmentData).map(([segment, data]) => ({
      segment: segment as 'free' | 'premium' | 'power' | 'casual',
      features: Object.fromEntries(data.features.entries()),
      totalRequests: data.totalRequests,
    }));
  }
  
  /**
   * Identifies power users with detailed metrics
   * 
   * @param limit - Maximum number of power users to return (default: 10)
   * @returns Array of power user profiles
   */
  getPowerUsers(limit: number = 10): {
    userId: string;
    requests: number;
    cost: number;
    isPremium: boolean;
    featuresUsed: string[];
    lastActive: string;
    daysSinceFirstSeen: number;
  }[] {
    const metricsService = getMetricsService();
    const costTracker = getCostTracker();
    const metrics = metricsService.getMetrics();
    
    const avgCostPerRequest = metrics.totalRequests > 0 
      ? metrics.estimatedCost / metrics.totalRequests 
      : 0;
    
    // Build user profiles
    const userProfiles: {
      userId: string;
      requests: number;
      cost: number;
      isPremium: boolean;
      featuresUsed: Set<string>;
      lastActive: number;
      firstSeen: number;
    }[] = [];
    
    for (const session of this.sessions.values()) {
      let profile = userProfiles.find(p => p.userId === session.userId);
      
      if (!profile) {
        profile = {
          userId: session.userId,
          requests: 0,
          cost: 0,
          isPremium: false,
          featuresUsed: new Set<string>(),
          lastActive: 0,
          firstSeen: session.startTime,
        };
        userProfiles.push(profile);
      }
      
      profile.requests += session.requestCount;
      profile.lastActive = Math.max(profile.lastActive, session.endTime);
      profile.firstSeen = Math.min(profile.firstSeen, session.startTime);
      
      for (const feature of session.featuresUsed) {
        profile.featuresUsed.add(feature);
      }
    }
    
    // Calculate costs and check premium status
    let premiumUserIds: Set<string> = new Set();
    try {
      const premiumData = localStorage.getItem('webknot-premium-tier');
      if (premiumData) {
        const data = JSON.parse(premiumData);
        if (data.isPremium) {
          const currentUserId = localStorage.getItem('webknot-user-id');
          if (currentUserId) {
            premiumUserIds.add(currentUserId);
          }
        }
      }
    } catch (error) {
      // Ignore
    }
    
    for (const profile of userProfiles) {
      profile.cost = profile.requests * avgCostPerRequest;
      profile.isPremium = premiumUserIds.has(profile.userId);
    }
    
    // Sort by request count and take top N
    const powerUsers = userProfiles
      .sort((a, b) => b.requests - a.requests)
      .slice(0, limit)
      .map(profile => ({
        userId: profile.userId.substring(0, 12) + '...', // Anonymize
        requests: profile.requests,
        cost: Math.round(profile.cost * 10000) / 10000,
        isPremium: profile.isPremium,
        featuresUsed: Array.from(profile.featuresUsed),
        lastActive: new Date(profile.lastActive).toISOString().split('T')[0] || 'Unknown',
        daysSinceFirstSeen: Math.floor((Date.now() - profile.firstSeen) / (24 * 60 * 60 * 1000)),
      }));
    
    return powerUsers;
  }
  
  /**
   * Gets conversion metrics (free to premium)
   * 
   * @returns Conversion metrics
   */
  getConversionMetrics(): {
    totalFreeUsers: number;
    totalPremiumUsers: number;
    conversionRate: number;
    avgTimeToConversion: number; // in days
  } {
    const segments = this.getUserSegmentation();
    const freeSegment = segments.find(s => s.segment === 'free');
    const premiumSegment = segments.find(s => s.segment === 'premium');
    
    const totalFreeUsers = freeSegment?.count || 0;
    const totalPremiumUsers = premiumSegment?.count || 0;
    const totalUsers = totalFreeUsers + totalPremiumUsers;
    
    const conversionRate = totalUsers > 0 
      ? totalPremiumUsers / totalUsers 
      : 0;
    
    // Estimate average time to conversion (placeholder)
    // In production, track actual conversion timestamps
    const avgTimeToConversion = 14; // days
    
    return {
      totalFreeUsers,
      totalPremiumUsers,
      conversionRate: Math.round(conversionRate * 100) / 100,
      avgTimeToConversion,
    };
  }
  
  /**
   * Initializes tracking for current user
   */
  private initializeTracking(): void {
    // Generate or retrieve user ID
    let userId = localStorage.getItem('webknot-user-id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('webknot-user-id', userId);
    }
    
    // Track user
    this.users.add(userId);
  }
  
  /**
   * Loads data from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      
      if (stored) {
        const data = JSON.parse(stored);
        
        // Restore users set
        if (data.users) {
          this.users = new Set(data.users);
        }
        
        // Restore sessions map
        if (data.sessions) {
          this.sessions = new Map();
          for (const [userId, sessionData] of Object.entries(data.sessions)) {
            const session = sessionData as SessionData;
            session.featuresUsed = new Set(session.featuresUsed);
            this.sessions.set(userId, session);
          }
        }
        
        console.log(`[AnalyticsService] Loaded ${this.users.size} users and ${this.sessions.size} sessions`);
      }
    } catch (error) {
      console.error('[AnalyticsService] Failed to load from storage:', error);
    }
  }
  
  /**
   * Saves data to localStorage
   */
  private saveToStorage(): void {
    try {
      const data = {
        users: Array.from(this.users),
        sessions: Object.fromEntries(
          Array.from(this.sessions.entries()).map(([userId, session]) => [
            userId,
            {
              ...session,
              featuresUsed: Array.from(session.featuresUsed),
            },
          ])
        ),
        lastUpdate: Date.now(),
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('[AnalyticsService] Failed to save to storage:', error);
    }
  }
  
  /**
   * Clears all analytics data
   */
  clear(): void {
    this.users.clear();
    this.sessions.clear();
    
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('[AnalyticsService] Failed to clear storage:', error);
    }
  }
}

// Singleton instance
let analyticsServiceInstance: AnalyticsService | null = null;

/**
 * Gets the singleton AnalyticsService instance
 */
export function getAnalyticsService(): AnalyticsService {
  if (!analyticsServiceInstance) {
    analyticsServiceInstance = new AnalyticsService();
  }
  return analyticsServiceInstance;
}

