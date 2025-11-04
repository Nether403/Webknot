/**
 * FeedbackButtons Component
 * 
 * Simple thumbs up/down buttons for collecting user feedback on AI features
 */

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { getFeedbackService } from '../../services/feedbackService';
import type { FeedbackTarget } from '../../types/gemini';

export interface FeedbackButtonsProps {
  target: FeedbackTarget;
  targetId: string;
  metadata?: Record<string, unknown>;
  onFeedback?: (type: 'thumbs-up' | 'thumbs-down') => void;
  className?: string;
}

/**
 * FeedbackButtons displays thumbs up/down buttons for user feedback
 */
export const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({
  target,
  targetId,
  metadata,
  onFeedback,
  className = '',
}) => {
  const [selectedFeedback, setSelectedFeedback] = useState<'thumbs-up' | 'thumbs-down' | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  
  const handleFeedback = (type: 'thumbs-up' | 'thumbs-down') => {
    // Record feedback
    const feedbackService = getFeedbackService();
    feedbackService.recordFeedback(type, target, targetId, metadata);
    
    // Update UI
    setSelectedFeedback(type);
    setShowThankYou(true);
    
    // Call callback if provided
    if (onFeedback) {
      onFeedback(type);
    }
    
    // Hide thank you message after 2 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 2000);
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showThankYou ? (
        <span className="text-xs text-teal-400 animate-fade-in">
          Thanks for your feedback!
        </span>
      ) : (
        <>
          <span className="text-xs text-gray-400">Was this helpful?</span>
          <button
            onClick={() => handleFeedback('thumbs-up')}
            className={`p-1.5 rounded transition-all ${
              selectedFeedback === 'thumbs-up'
                ? 'bg-teal-500/20 text-teal-400'
                : 'text-gray-400 hover:text-teal-400 hover:bg-white/5'
            }`}
            aria-label="Thumbs up"
            disabled={selectedFeedback !== null}
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleFeedback('thumbs-down')}
            className={`p-1.5 rounded transition-all ${
              selectedFeedback === 'thumbs-down'
                ? 'bg-red-500/20 text-red-400'
                : 'text-gray-400 hover:text-red-400 hover:bg-white/5'
            }`}
            aria-label="Thumbs down"
            disabled={selectedFeedback !== null}
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
};
