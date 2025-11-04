/**
 * UpgradePrompt Component
 * 
 * Displays upgrade prompts for free users when they hit rate limits
 * or when promoting premium features
 */

import React from 'react';
import { Sparkles, Zap, Clock, TrendingUp } from 'lucide-react';

interface UpgradePromptProps {
  reason?: 'rate-limit' | 'feature' | 'general';
  onUpgrade?: () => void;
  onDismiss?: () => void;
  compact?: boolean;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  reason = 'general',
  onUpgrade,
  onDismiss,
  compact = false,
}) => {
  const getMessage = () => {
    switch (reason) {
      case 'rate-limit':
        return {
          title: 'AI Request Limit Reached',
          description: 'You\'ve used all your free AI requests for this hour. Upgrade to Premium for unlimited access.',
          icon: Clock,
        };
      case 'feature':
        return {
          title: 'Premium Feature',
          description: 'This advanced AI feature is available to Premium users. Upgrade to unlock unlimited AI capabilities.',
          icon: Sparkles,
        };
      default:
        return {
          title: 'Unlock Unlimited AI',
          description: 'Get unlimited AI requests, priority support, and advanced features with Premium.',
          icon: Zap,
        };
    }
  };

  const { title, description, icon: Icon } = getMessage();

  if (compact) {
    return (
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0 glass-card" />
        <div className="relative p-4 flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="text-xs text-gray-400 mt-0.5">Upgrade to Premium</p>
          </div>
          <button
            onClick={onUpgrade}
            className="flex-shrink-0 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Upgrade
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 glass-card" />
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-gray-400 mt-0.5">Premium Feature</p>
            </div>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6">{description}</p>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Unlimited AI Requests</p>
              <p className="text-xs text-gray-400 mt-0.5">No hourly limits, use AI as much as you need</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Priority API Access</p>
              <p className="text-xs text-gray-400 mt-0.5">Faster response times for all AI features</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Advanced Suggestions</p>
              <p className="text-xs text-gray-400 mt-0.5">Get more detailed and creative AI recommendations</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Conversation History Export</p>
              <p className="text-xs text-gray-400 mt-0.5">Save and export your AI chat conversations</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onUpgrade}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Upgrade to Premium
          </button>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              Maybe Later
            </button>
          )}
        </div>

        {/* Pricing hint */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Starting at $9.99/month • Cancel anytime
        </p>
      </div>
    </div>
  );
};
