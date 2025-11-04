import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { Button } from '../ui/Button';

export interface FeedbackPromptProps {
  /**
   * The feature or action being rated
   */
  feature: string;
  
  /**
   * Callback when feedback is submitted
   */
  onFeedback: (feedback: FeedbackData) => void;
  
  /**
   * Callback when prompt is dismissed
   */
  onDismiss?: () => void;
  
  /**
   * Optional className for styling
   */
  className?: string;
  
  /**
   * Whether to show the comment field
   */
  showCommentField?: boolean;
}

export interface FeedbackData {
  feature: string;
  helpful: boolean;
  comment?: string;
  timestamp: number;
}

/**
 * FeedbackPrompt component for collecting user feedback on AI features
 * 
 * Displays a "Was this helpful?" prompt with thumbs up/down buttons
 * and an optional comment field. Styled with glassmorphism design.
 */
export const FeedbackPrompt: React.FC<FeedbackPromptProps> = ({
  feature,
  onFeedback,
  onDismiss,
  className = '',
  showCommentField = true,
}) => {
  const [selectedRating, setSelectedRating] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRating = (helpful: boolean) => {
    setSelectedRating(helpful);
    
    // If comment field is not shown, submit immediately
    if (!showCommentField) {
      submitFeedback(helpful, '');
    }
  };

  const submitFeedback = (helpful: boolean, feedbackComment: string) => {
    const feedbackData: FeedbackData = {
      feature,
      helpful,
      comment: feedbackComment.trim() || undefined,
      timestamp: Date.now(),
    };
    
    onFeedback(feedbackData);
    setIsSubmitted(true);
    
    // Auto-dismiss after 2 seconds
    setTimeout(() => {
      onDismiss?.();
    }, 2000);
  };

  const handleSubmit = () => {
    if (selectedRating !== null) {
      submitFeedback(selectedRating, comment);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        <div className="absolute inset-0 glass-card" />
        <div className="relative p-4">
          <div 
            className="flex items-center justify-center gap-2 text-teal-400"
            role="status"
            aria-live="polite"
          >
            <ThumbsUp className="w-5 h-5" aria-hidden="true" />
            <p className="text-sm font-medium">Thank you for your feedback!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden rounded-xl ${className}`}
      role="region"
      aria-label="Feedback form"
    >
      <div className="absolute inset-0 glass-card" />
      <div className="relative p-4">
        <div className="flex items-start justify-between mb-3">
          <h4 className="text-sm font-medium text-white">Was this helpful?</h4>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Dismiss feedback prompt"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => handleRating(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleRating(true);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              selectedRating === true
                ? 'bg-teal-600 text-white scale-105'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
            aria-label="Thumbs up - This was helpful"
            aria-pressed={selectedRating === true}
          >
            <ThumbsUp className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-medium">Yes</span>
          </button>

          <button
            onClick={() => handleRating(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleRating(false);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              selectedRating === false
                ? 'bg-red-600 text-white scale-105'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
            aria-label="Thumbs down - This was not helpful"
            aria-pressed={selectedRating === false}
          >
            <ThumbsDown className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-medium">No</span>
          </button>
        </div>

        {showCommentField && selectedRating !== null && (
          <div className="space-y-3">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us more (optional)"
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              rows={3}
              aria-label="Optional feedback comment"
            />

            <Button
              onClick={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              size="sm"
            >
              Submit Feedback
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
