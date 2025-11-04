/**
 * Premium Tier Management
 * 
 * Utilities for managing premium tier status and features
 */

/**
 * Premium tier configuration stored in localStorage
 */
interface PremiumTierConfig {
  isPremium: boolean;
  activatedAt?: number;
  expiresAt?: number;
  tier?: 'free' | 'premium' | 'enterprise';
}

const STORAGE_KEY = 'lovabolt-premium-tier';

/**
 * Gets the current premium tier status
 * 
 * @returns True if user has premium tier, false otherwise
 */
export function isPremiumUser(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return false;
    }
    
    const config: PremiumTierConfig = JSON.parse(stored);
    
    // Check if premium status has expired
    if (config.expiresAt && Date.now() > config.expiresAt) {
      console.log('[Premium] Premium tier has expired');
      // Clear expired premium status
      setPremiumStatus(false);
      return false;
    }
    
    return config.isPremium;
  } catch (error) {
    console.error('[Premium] Failed to load premium status:', error);
    return false;
  }
}

/**
 * Sets the premium tier status
 * 
 * @param isPremium - Whether user has premium tier
 * @param expiresAt - Optional expiration timestamp (for trial periods)
 */
export function setPremiumStatus(isPremium: boolean, expiresAt?: number): void {
  try {
    const config: PremiumTierConfig = {
      isPremium,
      activatedAt: isPremium ? Date.now() : undefined,
      expiresAt,
      tier: isPremium ? 'premium' : 'free',
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    
    console.log('[Premium] Premium status updated:', {
      isPremium,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : 'never',
    });
    
    // Dispatch event for components to react to premium status changes
    window.dispatchEvent(new CustomEvent('premium-status-changed', {
      detail: { isPremium, expiresAt },
    }));
  } catch (error) {
    console.error('[Premium] Failed to save premium status:', error);
  }
}

/**
 * Gets the full premium tier configuration
 * 
 * @returns Premium tier configuration
 */
export function getPremiumConfig(): PremiumTierConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { isPremium: false, tier: 'free' };
    }
    
    const config: PremiumTierConfig = JSON.parse(stored);
    
    // Check expiration
    if (config.expiresAt && Date.now() > config.expiresAt) {
      return { isPremium: false, tier: 'free' };
    }
    
    return config;
  } catch (error) {
    console.error('[Premium] Failed to load premium config:', error);
    return { isPremium: false, tier: 'free' };
  }
}

/**
 * Clears premium tier status (for testing or logout)
 */
export function clearPremiumStatus(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[Premium] Premium status cleared');
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('premium-status-changed', {
      detail: { isPremium: false },
    }));
  } catch (error) {
    console.error('[Premium] Failed to clear premium status:', error);
  }
}

/**
 * Gets time remaining until premium expires (in milliseconds)
 * Returns null if premium doesn't expire or user is not premium
 */
export function getTimeUntilExpiration(): number | null {
  const config = getPremiumConfig();
  
  if (!config.isPremium || !config.expiresAt) {
    return null;
  }
  
  const remaining = config.expiresAt - Date.now();
  return remaining > 0 ? remaining : 0;
}

/**
 * Checks if user should see upgrade prompts
 * 
 * @returns True if user is on free tier and should see upgrade prompts
 */
export function shouldShowUpgradePrompt(): boolean {
  return !isPremiumUser();
}
