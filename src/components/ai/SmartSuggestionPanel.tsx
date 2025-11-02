/**
 * SmartSuggestionPanel Component
 * 
 * Displays AI-powered suggestions based on user selections in a collapsible panel.
 * Shows confidence scores, reasoning, and allows one-click application of suggestions.
 * 
 * @module SmartSuggestionPanel
 */

import React, { useState, useCallback } from 'react';
import { Sparkles, ChevronUp, ChevronDown, CheckCircle, HelpCircle } from 'lucide-react';
import { Suggestion } from '../../hooks/useSmartSuggestions';
import { FeedbackPrompt, FeedbackData } from './FeedbackPrompt';
import { saveFeedback } from '../../utils/feedbackStorage';
import { trackAIEvent } from '../../utils/analyticsTracking';
import { Tooltip } from '../ui/tooltip';

export interface SmartSuggestionPanelProps {
  suggestions: Suggestion[];
  onApplySuggestion: (suggestion: Suggestion, item: any) => void;
  onDismiss?: () => void;
  className?: string;
}

/**
 * SmartSuggestionPanel displays context-aware suggestions with confidence scores
 * 
 * Features:
 * - Collapsible panel to save screen space
 * - Confidence percentage for each suggestion
 * - Clear reasoning for why suggestions are made
 * - One-click apply buttons for individual items
 * - Visual feedback on hover
 * - Badge showing number of suggestions
 * 
 * @param suggestions - Array of suggestions to display
 * @param onApplySuggestion - Callback when user applies a suggestion
 * @param onDismiss - Optional callback when panel is dismissed
 * @param className - Optional additional CSS classes
 * 
 * @example
 * ```tsx
 * <SmartSuggestionPanel
 *   suggestions={suggestions}
 *   onApplySuggestion={(suggestion, item) => {
 *     setSelectedColorTheme(item);
 *   }}
 * />
 * ```
 */
const SmartSuggestionPanelComponent: React.FC<SmartSuggestionPanelProps> = ({
  suggestions,
  onApplySuggestion,
  onDismiss,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [appliedItems, setAppliedItems] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState(false);
  const [appliedCount, setAppliedCount] = useState(0);

  // Handle Escape key to collapse panel
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  if (suggestions.length === 0) return null;

  // Memoize event handlers to prevent unnecessary re-renders
  const handleApply = useCallback((suggestion: Suggestion, item: any) => {
    onApplySuggestion(suggestion, item);
    setAppliedItems(prev => new Set(prev).add(item.id));
    setAppliedCount(prev => prev + 1);
    
    // Track analytics event
    trackAIEvent('suggestion_applied', {
      category: suggestion.category,
      confidence: suggestion.confidence,
      itemId: item.id,
      itemTitle: item.title,
    });
    
    // Show feedback after 2 suggestions applied
    if (appliedCount + 1 >= 2 && !showFeedback) {
      setTimeout(() => {
        setShowFeedback(true);
      }, 1000);
    }
    
    // Remove from applied after 2 seconds to allow re-application
    setTimeout(() => {
      setAppliedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  }, [onApplySuggestion, appliedCount, showFeedback]);

  const handleFeedback = useCallback((feedback: FeedbackData) => {
    saveFeedback(feedback);
    setShowFeedback(false);
    setAppliedCount(0); // Reset counter
  }, []);

  const handleToggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <div 
      className={`relative overflow-hidden rounded-xl ${className}`} 
      data-tour="ai-suggestions"
      role="region"
      aria-label="AI suggestions panel"
    >
      <div className="absolute inset-0 glass-card" />
      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-500" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-white">
              AI Suggestions
            </h3>
            <span 
              className="px-2 py-0.5 text-xs font-medium bg-teal-500/20 text-teal-400 rounded-full"
              role="status"
              aria-label={`${suggestions.length} suggestions available`}
            >
              {suggestions.length}
            </span>
            <Tooltip content="AI analyzes your selections and suggests compatible options based on design patterns and best practices.">
              <a
                href="/docs/AI_FEATURES_GUIDE.md#context-aware-suggestions"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Learn more about AI suggestions"
              >
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-teal-400" />
              </a>
            </Tooltip>
          </div>
          <button
            onClick={handleToggleExpand}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isExpanded ? 'Collapse suggestions panel' : 'Expand suggestions panel'}
            aria-expanded={isExpanded}
            aria-controls="suggestions-content"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Suggestions List */}
        {isExpanded && (
          <div className="space-y-4" id="suggestions-content">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="border-l-2 border-teal-500 pl-4"
                role="group"
                aria-labelledby={`suggestion-title-${index}`}
              >
                {/* Suggestion Header */}
                <div className="mb-2">
                  <h4 
                    id={`suggestion-title-${index}`}
                    className="font-medium text-white mb-1"
                  >
                    {suggestion.title}
                  </h4>
                  <p className="text-sm text-gray-400">{suggestion.reason}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span 
                      className="text-xs text-gray-500"
                      aria-label={`Confidence level: ${Math.round(suggestion.confidence * 100)} percent`}
                    >
                      Confidence: {Math.round(suggestion.confidence * 100)}%
                    </span>
                    <div 
                      className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={Math.round(suggestion.confidence * 100)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Confidence level"
                    >
                      <div
                        className="h-full bg-teal-500 rounded-full transition-all"
                        style={{ width: `${suggestion.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Suggestion Items Grid */}
                <div 
                  className="grid grid-cols-2 gap-2 mt-2"
                  role="list"
                  aria-label={`${suggestion.title} options`}
                >
                  {suggestion.items.slice(0, 6).map((item, itemIndex) => {
                    const isApplied = appliedItems.has(item.id);
                    
                    return (
                      <button
                        key={itemIndex}
                        onClick={() => handleApply(suggestion, item)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            if (!isApplied) {
                              handleApply(suggestion, item);
                            }
                          }
                        }}
                        disabled={isApplied}
                        className={`
                          text-left p-3 rounded-lg transition-all
                          ${isApplied
                            ? 'bg-teal-500/20 border border-teal-500/50'
                            : 'bg-gray-800/50 hover:bg-gray-700/50 border border-transparent'
                          }
                          disabled:cursor-not-allowed
                          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900
                        `}
                        role="listitem"
                        aria-label={`Apply ${item.title}${isApplied ? ' - Already applied' : ''}`}
                        aria-pressed={isApplied}
                        tabIndex={0}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm text-white font-medium flex-1">
                            {item.title}
                          </span>
                          {isApplied && (
                            <CheckCircle 
                              className="w-4 h-4 text-teal-400 flex-shrink-0" 
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Show more indicator */}
                {suggestion.items.length > 6 && (
                  <p className="text-xs text-gray-500 mt-2">
                    +{suggestion.items.length - 6} more options available
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Collapsed State Info */}
        {!isExpanded && (
          <p className="text-sm text-gray-400">
            {suggestions.length} suggestion{suggestions.length > 1 ? 's' : ''} available
          </p>
        )}

        {/* Feedback Prompt */}
        {showFeedback && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <FeedbackPrompt
              feature="suggestion_applied"
              onFeedback={handleFeedback}
              onDismiss={() => setShowFeedback(false)}
              showCommentField={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Wrap component in React.memo to prevent unnecessary re-renders
export const SmartSuggestionPanel = React.memo(SmartSuggestionPanelComponent);
