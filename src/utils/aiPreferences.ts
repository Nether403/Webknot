/**
 * AI Preferences Utilities
 * 
 * Helper functions for managing AI feature preferences
 */

export interface AIPreferences {
  aiEnabled: boolean;
  updatedAt?: number;
}

export interface AIConsent {
  accepted: boolean;
  timestamp: number;
  version: string;
}

/**
 * Check if AI features are enabled
 * @returns true if AI is enabled, false otherwise
 */
export function isAIEnabled(): boolean {
  try {
    const prefs = localStorage.getItem('webknot-ai-preferences');
    if (prefs) {
      const parsed: AIPreferences = JSON.parse(prefs);
      return parsed.aiEnabled !== false; // Default to true if not set
    }
    return true; // Default to enabled
  } catch (error) {
    console.error('Failed to check AI preferences:', error);
    return true; // Default to enabled on error
  }
}

/**
 * Check if user has given consent for AI features
 * @returns true if consent given, false otherwise
 */
export function hasAIConsent(): boolean {
  try {
    const consent = localStorage.getItem('webknot-ai-consent');
    if (consent) {
      const parsed: AIConsent = JSON.parse(consent);
      return parsed.accepted === true;
    }
    return false;
  } catch (error) {
    console.error('Failed to check AI consent:', error);
    return false;
  }
}

/**
 * Set AI enabled preference
 * @param enabled - Whether AI should be enabled
 */
export function setAIEnabled(enabled: boolean): void {
  try {
    const prefs: AIPreferences = {
      aiEnabled: enabled,
      updatedAt: Date.now()
    };
    localStorage.setItem('webknot-ai-preferences', JSON.stringify(prefs));
    
    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('ai-preferences-changed', {
      detail: { aiEnabled: enabled }
    }));
  } catch (error) {
    console.error('Failed to set AI preference:', error);
  }
}

/**
 * Get AI preferences
 * @returns Current AI preferences
 */
export function getAIPreferences(): AIPreferences {
  try {
    const prefs = localStorage.getItem('webknot-ai-preferences');
    if (prefs) {
      return JSON.parse(prefs);
    }
  } catch (error) {
    console.error('Failed to get AI preferences:', error);
  }
  
  return {
    aiEnabled: true // Default
  };
}

/**
 * Get AI consent details
 * @returns Current AI consent or null if not given
 */
export function getAIConsent(): AIConsent | null {
  try {
    const consent = localStorage.getItem('webknot-ai-consent');
    if (consent) {
      return JSON.parse(consent);
    }
  } catch (error) {
    console.error('Failed to get AI consent:', error);
  }
  
  return null;
}
