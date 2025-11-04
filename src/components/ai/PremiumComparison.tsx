/**
 * PremiumComparison Component
 * 
 * Displays a comparison of free vs premium features
 * Helps users understand the value of upgrading
 */

import React from 'react';
import { Check, X, Sparkles, Zap, Clock, MessageSquare, Download, TrendingUp } from 'lucide-react';

interface Feature {
  name: string;
  free: boolean | string;
  premium: boolean | string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface PremiumComparisonProps {
  onUpgrade?: () => void;
  onClose?: () => void;
}

export const PremiumComparison: React.FC<PremiumComparisonProps> = ({
  onUpgrade,
  onClose,
}) => {
  const features: Feature[] = [
    {
      name: 'AI Project Analysis',
      free: '20 per hour',
      premium: 'Unlimited',
      icon: Sparkles,
    },
    {
      name: 'Design Suggestions',
      free: '20 per hour',
      premium: 'Unlimited',
      icon: Zap,
    },
    {
      name: 'Prompt Enhancement',
      free: '20 per hour',
      premium: 'Unlimited',
      icon: TrendingUp,
    },
    {
      name: 'AI Chat Assistant',
      free: '20 per hour',
      premium: 'Unlimited',
      icon: MessageSquare,
    },
    {
      name: 'Response Time',
      free: 'Standard',
      premium: 'Priority (Faster)',
      icon: Clock,
    },
    {
      name: 'Advanced Suggestions',
      free: false,
      premium: true,
      icon: Sparkles,
    },
    {
      name: 'Conversation History Export',
      free: false,
      premium: true,
      icon: Download,
    },
    {
      name: 'Priority Support',
      free: false,
      premium: true,
    },
  ];

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-teal-500" />
      ) : (
        <X className="w-5 h-5 text-gray-600" />
      );
    }
    return <span className="text-sm text-gray-300">{value}</span>;
  };

  return (
    <div className="relative overflow-hidden rounded-xl max-w-4xl mx-auto">
      <div className="absolute inset-0 glass-card" />
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h2>
            <p className="text-gray-400">Unlock unlimited AI features with Premium</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Feature</th>
                <th className="text-center py-4 px-4">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-white">Free</span>
                    <span className="text-sm text-gray-400 mt-1">$0/month</span>
                  </div>
                </th>
                <th className="text-center py-4 px-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-teal-500" />
                      <span className="text-lg font-semibold text-white">Premium</span>
                    </div>
                    <span className="text-sm text-teal-400 mt-1">$9.99/month</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {feature.icon && (
                        <feature.icon className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="text-white font-medium">{feature.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {renderValue(feature.free)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {renderValue(feature.premium)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Section */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-white font-semibold mb-1">Ready to unlock unlimited AI?</p>
            <p className="text-sm text-gray-400">Cancel anytime • No long-term commitment</p>
          </div>
          <button
            onClick={onUpgrade}
            className="px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-teal-500/20"
          >
            <TrendingUp className="w-5 h-5" />
            Upgrade to Premium
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-teal-500">10,000+</p>
              <p className="text-sm text-gray-400 mt-1">Active Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-500">99.9%</p>
              <p className="text-sm text-gray-400 mt-1">Uptime</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-500">4.9/5</p>
              <p className="text-sm text-gray-400 mt-1">User Rating</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="text-white font-medium mb-1">Can I cancel anytime?</p>
              <p className="text-sm text-gray-400">Yes, you can cancel your subscription at any time. No questions asked.</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">What payment methods do you accept?</p>
              <p className="text-sm text-gray-400">We accept all major credit cards, PayPal, and other popular payment methods.</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Is there a free trial?</p>
              <p className="text-sm text-gray-400">Yes! All new Premium users get a 7-day free trial to test all features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
