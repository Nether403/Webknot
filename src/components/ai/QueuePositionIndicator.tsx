/**
 * Queue Position Indicator Component
 * 
 * Displays the user's position in the AI request queue
 * Shows different messages for premium vs free users
 * 
 * Requirements:
 * - 20.2: Show queue position to users
 * - 7.5: Premium tier benefits
 */

import React from 'react';
import { Clock, Zap } from 'lucide-react';
import { isPremiumUser } from '../../utils/premiumTier';

interface QueuePositionIndicatorProps {
  position: number;
  className?: string;
}

export const QueuePositionIndicator: React.FC<QueuePositionIndicatorProps> = ({
  position,
  className = '',
}) => {
  const premium = isPremiumUser();
  
  // Don't show if position is 0 or undefined
  if (!position || position <= 0) {
    return null;
  }
  
  // Estimate wait time (rough approximation: 3 seconds per request)
  const estimatedWaitSeconds = position * 3;
  const estimatedWaitMinutes = Math.ceil(estimatedWaitSeconds / 60);
  
  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border ${
        premium
          ? 'bg-teal-500/10 border-teal-500/30'
          : 'bg-gray-800/50 border-gray-700'
      } ${className}`}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {premium ? (
          <Zap className="w-5 h-5 text-teal-500" />
        ) : (
          <Clock className="w-5 h-5 text-gray-400" />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-white">
            {premium ? 'Priority Queue' : 'Request Queued'}
          </span>
          {premium && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-teal-500/20 text-teal-400 rounded">
              PREMIUM
            </span>
          )}
        </div>
        
        <p className="text-xs text-gray-400">
          {premium ? (
            <>
              Position <span className="font-semibold text-teal-400">#{position}</span> in priority queue
              {estimatedWaitMinutes > 0 && (
                <> · Est. wait: ~{estimatedWaitMinutes} min</>
              )}
            </>
          ) : (
            <>
              Position <span className="font-semibold text-white">#{position}</span> in queue
              {estimatedWaitMinutes > 0 && (
                <> · Est. wait: ~{estimatedWaitMinutes} min</>
              )}
            </>
          )}
        </p>
        
        {!premium && position > 5 && (
          <button
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('show-upgrade-prompt', {
                  detail: { reason: 'queue-priority' },
                })
              );
            }}
            className="mt-2 text-xs text-teal-500 hover:text-teal-400 transition-colors"
          >
            Upgrade to Premium for priority access →
          </button>
        )}
      </div>
      
      {/* Loading animation */}
      <div className="flex-shrink-0">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 border-2 border-gray-700 rounded-full" />
          <div
            className={`absolute inset-0 border-2 ${
              premium ? 'border-teal-500' : 'border-gray-500'
            } border-t-transparent rounded-full animate-spin`}
          />
        </div>
      </div>
    </div>
  );
};
