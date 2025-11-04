import React, { useState, useEffect } from 'react';
import { Settings, Shield, Zap, Info, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Switch } from '../ui/switch';
import { isPremiumUser } from '../../utils/premiumTier';

export interface AISettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AIPreferences {
  aiEnabled: boolean;
  consentGiven: boolean;
  consentTimestamp?: number;
}

/**
 * AISettings provides a settings panel with AI enable/disable toggle.
 * Persists preference to localStorage and disables all AI features when toggled off.
 * 
 * @param isOpen - Whether the settings panel is open
 * @param onClose - Callback to close the settings panel
 */
export const AISettings: React.FC<AISettingsProps> = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState<AIPreferences>({
    aiEnabled: true,
    consentGiven: false
  });
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    try {
      const storedConsent = localStorage.getItem('lovabolt-ai-consent');
      const storedPrefs = localStorage.getItem('lovabolt-ai-preferences');
      
      if (storedConsent) {
        const consent = JSON.parse(storedConsent);
        setPreferences(prev => ({
          ...prev,
          consentGiven: consent.accepted || false,
          consentTimestamp: consent.timestamp
        }));
      }
      
      if (storedPrefs) {
        const prefs = JSON.parse(storedPrefs);
        setPreferences(prev => ({
          ...prev,
          aiEnabled: prefs.aiEnabled !== undefined ? prefs.aiEnabled : true
        }));
      }
      
      // Check premium status
      setIsPremium(isPremiumUser());
    } catch (error) {
      console.error('Failed to load AI preferences:', error);
    }
  }, [isOpen]);
  
  // Listen for premium status changes
  useEffect(() => {
    const handlePremiumStatusChanged = (event: CustomEvent) => {
      setIsPremium(event.detail.isPremium);
    };
    
    window.addEventListener('premium-status-changed', handlePremiumStatusChanged as EventListener);
    
    return () => {
      window.removeEventListener('premium-status-changed', handlePremiumStatusChanged as EventListener);
    };
  }, []);

  const handleToggleAI = (enabled: boolean) => {
    const newPreferences = {
      ...preferences,
      aiEnabled: enabled
    };
    
    setPreferences(newPreferences);
    
    // Save to localStorage
    try {
      localStorage.setItem('lovabolt-ai-preferences', JSON.stringify({
        aiEnabled: enabled,
        updatedAt: Date.now()
      }));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('ai-preferences-changed', {
        detail: { aiEnabled: enabled }
      }));
    } catch (error) {
      console.error('Failed to save AI preferences:', error);
    }
  };

  const handleResetConsent = () => {
    try {
      localStorage.removeItem('lovabolt-ai-consent');
      setPreferences(prev => ({
        ...prev,
        consentGiven: false,
        consentTimestamp: undefined
      }));
      
      // Reload page to show consent dialog again
      window.location.reload();
    } catch (error) {
      console.error('Failed to reset consent:', error);
    }
  };
  
  const handleUpgrade = () => {
    // Dispatch event to show upgrade modal
    window.dispatchEvent(new CustomEvent('show-upgrade-prompt', {
      detail: { reason: 'general', type: 'modal' }
    }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" 
        onClick={onClose}
      />
      
      {/* Settings Panel */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-6">
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none" />
          
          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Settings className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Settings</h2>
                <p className="text-sm text-gray-400">Manage your AI preferences</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              {/* Premium Status / Upgrade Button */}
              {isPremium ? (
                <div className="bg-gradient-to-r from-teal-500/20 to-teal-600/20 p-5 rounded-lg border border-teal-500/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-500/30 rounded-lg">
                      <Sparkles className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        Premium Active
                      </h3>
                      <p className="text-sm text-gray-300">
                        You have unlimited access to all AI features
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-5 rounded-lg border border-purple-500/20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-purple-500/20 rounded-lg mt-1">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">
                          Upgrade to Premium
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">
                          Get unlimited AI requests, priority support, and advanced features
                        </p>
                        <Button
                          onClick={handleUpgrade}
                          className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
                          size="sm"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Upgrade Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* AI Toggle */}
              <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-teal-500/20 rounded-lg mt-1">
                      <Zap className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        Enable AI Features
                      </h3>
                      <p className="text-sm text-gray-400">
                        Use Google's Gemini AI for intelligent suggestions, 
                        smart defaults, and enhanced project analysis.
                      </p>
                      {!preferences.aiEnabled && (
                        <p className="text-sm text-yellow-400 mt-2">
                          AI features are disabled. Using rule-based system only.
                        </p>
                      )}
                    </div>
                  </div>
                  <Switch
                    checked={preferences.aiEnabled}
                    onCheckedChange={handleToggleAI}
                    className="mt-1"
                  />
                </div>
              </div>
              
              {/* Consent Status */}
              <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg mt-1">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">
                      Privacy Consent
                    </h3>
                    {preferences.consentGiven ? (
                      <>
                        <p className="text-sm text-gray-400 mb-3">
                          You have consented to AI features.
                          {preferences.consentTimestamp && (
                            <span className="block text-xs text-gray-500 mt-1">
                              Granted on {new Date(preferences.consentTimestamp).toLocaleDateString()}
                            </span>
                          )}
                        </p>
                        <Button
                          onClick={handleResetConsent}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800/50"
                        >
                          Reset Consent
                        </Button>
                      </>
                    ) : (
                      <p className="text-sm text-gray-400">
                        No consent given. AI features will prompt for consent on first use.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Info Box */}
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-300">
                    <p className="mb-2">
                      <span className="font-semibold text-white">How it works:</span>
                    </p>
                    <ul className="space-y-1 text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500/60 rounded-full mt-1.5 flex-shrink-0" />
                        <span>When enabled, AI features enhance your experience with intelligent suggestions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500/60 rounded-full mt-1.5 flex-shrink-0" />
                        <span>When disabled, the app uses only rule-based algorithms (no AI)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500/60 rounded-full mt-1.5 flex-shrink-0" />
                        <span>All features work perfectly in both modes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="mt-6 flex justify-end">
              <Button
                onClick={onClose}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
