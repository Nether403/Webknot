/**
 * Feature Flag System
 * 
 * Manages feature flags for gradual rollout of AI features
 */

export interface FeatureFlags {
  // Phase 1: MVP - Core AI Integration
  aiProjectAnalysis: boolean;
  
  // Phase 2: Enhancement - Suggestions and Optimization
  aiSuggestions: boolean;
  aiPromptEnhancement: boolean;
  
  // Phase 3: Advanced - Conversational AI and Premium Features
  aiChat: boolean;
  premiumTier: boolean;
  
  // Global AI toggle
  aiEnabled: boolean;
}

/**
 * Default feature flags configuration
 * Can be overridden by environment variables or user settings
 */
const defaultFlags: FeatureFlags = {
  // Phase 1 - Initially enabled for testing
  aiProjectAnalysis: false,
  
  // Phase 2 - Disabled until Phase 1 is stable
  aiSuggestions: false,
  aiPromptEnhancement: false,
  
  // Phase 3 - Disabled until Phase 2 is stable
  aiChat: false,
  premiumTier: true, // Enable premium tier system
  
  // Global toggle - respects environment variable
  aiEnabled: import.meta.env.VITE_AI_ENABLED === 'true',
};

/**
 * Feature flag storage key
 */
const STORAGE_KEY = 'webknot-feature-flags';

/**
 * Load feature flags from localStorage
 */
function loadFlags(): FeatureFlags {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<FeatureFlags>;
      return { ...defaultFlags, ...parsed };
    }
  } catch (error) {
    console.error('Failed to load feature flags:', error);
  }
  return defaultFlags;
}

/**
 * Save feature flags to localStorage
 */
function saveFlags(flags: FeatureFlags): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  } catch (error) {
    console.error('Failed to save feature flags:', error);
  }
}

/**
 * Feature flag manager class
 */
class FeatureFlagManager {
  private flags: FeatureFlags;
  
  constructor() {
    this.flags = loadFlags();
  }
  
  /**
   * Check if a feature is enabled
   */
  isEnabled(feature: keyof FeatureFlags): boolean {
    // If global AI is disabled, all AI features are disabled
    if (feature !== 'aiEnabled' && !this.flags.aiEnabled) {
      return false;
    }
    return this.flags[feature];
  }
  
  /**
   * Enable a feature
   */
  enable(feature: keyof FeatureFlags): void {
    this.flags[feature] = true;
    saveFlags(this.flags);
  }
  
  /**
   * Disable a feature
   */
  disable(feature: keyof FeatureFlags): void {
    this.flags[feature] = false;
    saveFlags(this.flags);
  }
  
  /**
   * Toggle a feature
   */
  toggle(feature: keyof FeatureFlags): void {
    this.flags[feature] = !this.flags[feature];
    saveFlags(this.flags);
  }
  
  /**
   * Get all feature flags
   */
  getAll(): FeatureFlags {
    return { ...this.flags };
  }
  
  /**
   * Set multiple feature flags at once
   */
  setFlags(flags: Partial<FeatureFlags>): void {
    this.flags = { ...this.flags, ...flags };
    saveFlags(this.flags);
  }
  
  /**
   * Reset to default flags
   */
  reset(): void {
    this.flags = { ...defaultFlags };
    saveFlags(this.flags);
  }
  
  /**
   * Check if any AI feature is enabled
   */
  isAnyAIFeatureEnabled(): boolean {
    return (
      this.flags.aiEnabled &&
      (this.flags.aiProjectAnalysis ||
        this.flags.aiSuggestions ||
        this.flags.aiPromptEnhancement ||
        this.flags.aiChat)
    );
  }
}

/**
 * Singleton instance of feature flag manager
 */
export const featureFlags = new FeatureFlagManager();

/**
 * React hook for feature flags (to be implemented in Phase 1)
 * This is a placeholder for future implementation
 */
export function useFeatureFlags() {
  // TODO: Implement React hook with state management
  // For now, return the manager instance
  return {
    isEnabled: (feature: keyof FeatureFlags) => featureFlags.isEnabled(feature),
    enable: (feature: keyof FeatureFlags) => featureFlags.enable(feature),
    disable: (feature: keyof FeatureFlags) => featureFlags.disable(feature),
    toggle: (feature: keyof FeatureFlags) => featureFlags.toggle(feature),
    getAll: () => featureFlags.getAll(),
    setFlags: (flags: Partial<FeatureFlags>) => featureFlags.setFlags(flags),
    reset: () => featureFlags.reset(),
    isAnyAIFeatureEnabled: () => featureFlags.isAnyAIFeatureEnabled(),
  };
}

/**
 * Helper function to check if AI features are available
 */
export function isAIAvailable(): boolean {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const aiEnabled = featureFlags.isEnabled('aiEnabled');
  return Boolean(apiKey) && aiEnabled;
}

/**
 * Helper function to get rate limit from environment
 */
export function getRateLimit(): number {
  const limit = import.meta.env.VITE_AI_RATE_LIMIT;
  return limit ? parseInt(limit, 10) : 20;
}
