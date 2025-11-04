/**
 * DesignSuggestions Component
 * 
 * Displays AI-powered design suggestions grouped by severity
 * Shows reasoning for each suggestion and allows applying auto-fixable items
 */

import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Lightbulb, Sparkles, X } from 'lucide-react';
import type { DesignSuggestion } from '../../types/gemini';
import { FeedbackButtons } from './FeedbackButtons';
import { getFeedbackService } from '../../services/feedbackService';

export interface DesignSuggestionsProps {
  suggestions: DesignSuggestion[];
  isLoading?: boolean;
  onApplyFixes?: (suggestions: DesignSuggestion[]) => void;
  onDismiss?: () => void;
}

/**
 * DesignSuggestions displays AI-powered design recommendations
 * Suggestions are grouped by severity and show clear reasoning
 */
export const DesignSuggestions: React.FC<DesignSuggestionsProps> = ({
  suggestions,
  isLoading = false,
  onApplyFixes,
  onDismiss,
}) => {
  const [dismissedIds, setDismissedIds] = useState<Set<number>>(new Set());
  
  // Filter out dismissed suggestions
  const visibleSuggestions = suggestions.filter((_, index) => !dismissedIds.has(index));
  
  // Group suggestions by severity
  const groupedSuggestions = {
    high: visibleSuggestions.filter(s => s.severity === 'high'),
    medium: visibleSuggestions.filter(s => s.severity === 'medium'),
    low: visibleSuggestions.filter(s => s.severity === 'low'),
  };
  
  // Get auto-fixable suggestions
  const autoFixableSuggestions = visibleSuggestions.filter(s => s.autoFixable);
  
  // Handle dismissing a single suggestion
  const handleDismissSuggestion = (index: number) => {
    setDismissedIds(prev => new Set([...prev, index]));
  };
  
  // Handle applying all auto-fixes
  const handleApplyFixes = () => {
    if (onApplyFixes && autoFixableSuggestions.length > 0) {
      onApplyFixes(autoFixableSuggestions);
      
      // Record acceptance feedback for all auto-fixed suggestions
      const feedbackService = getFeedbackService();
      autoFixableSuggestions.forEach((suggestion, index) => {
        feedbackService.recordSuggestionAction(
          `suggestion_${Date.now()}_${index}`,
          true,
          suggestion.type,
          suggestion.severity
        );
      });
    }
  };
  
  // Get icon and color for suggestion type
  const getSuggestionIcon = (type: DesignSuggestion['type']) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'improvement':
        return <Sparkles className="w-5 h-5 text-teal-500" />;
      case 'tip':
        return <Lightbulb className="w-5 h-5 text-blue-500" />;
    }
  };
  
  // Get severity badge color
  const getSeverityColor = (severity: DesignSuggestion['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };
  
  // Don't render if no visible suggestions
  if (visibleSuggestions.length === 0 && !isLoading) {
    return null;
  }
  
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 glass-card" />
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-500" />
            <h3 className="text-lg font-semibold text-white">
              Design Suggestions
            </h3>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close suggestions"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center gap-3 p-4 glass-card rounded-lg">
            <div className="relative">
              <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white font-medium">
                Analyzing your design...
              </span>
              <span className="text-xs text-gray-400">
                This may take a moment
              </span>
            </div>
          </div>
        )}
        
        {/* Suggestions List */}
        {!isLoading && visibleSuggestions.length > 0 && (
          <div className="space-y-4">
            {/* Auto-fix Button */}
            {autoFixableSuggestions.length > 0 && onApplyFixes && (
              <div className="flex items-center justify-between p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-500" />
                  <span className="text-sm text-gray-300">
                    {autoFixableSuggestions.length} suggestion{autoFixableSuggestions.length !== 1 ? 's' : ''} can be applied automatically
                  </span>
                </div>
                <button
                  onClick={handleApplyFixes}
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Apply Fixes
                </button>
              </div>
            )}
            
            {/* High Severity Suggestions */}
            {groupedSuggestions.high.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-red-300 uppercase tracking-wide">
                  Critical
                </h4>
                {groupedSuggestions.high.map((suggestion, index) => (
                  <SuggestionCard
                    key={`high-${index}`}
                    suggestion={suggestion}
                    index={suggestions.indexOf(suggestion)}
                    onDismiss={handleDismissSuggestion}
                    getSuggestionIcon={getSuggestionIcon}
                    getSeverityColor={getSeverityColor}
                  />
                ))}
              </div>
            )}
            
            {/* Medium Severity Suggestions */}
            {groupedSuggestions.medium.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-yellow-300 uppercase tracking-wide">
                  Recommended
                </h4>
                {groupedSuggestions.medium.map((suggestion, index) => (
                  <SuggestionCard
                    key={`medium-${index}`}
                    suggestion={suggestion}
                    index={suggestions.indexOf(suggestion)}
                    onDismiss={handleDismissSuggestion}
                    getSuggestionIcon={getSuggestionIcon}
                    getSeverityColor={getSeverityColor}
                  />
                ))}
              </div>
            )}
            
            {/* Low Severity Suggestions */}
            {groupedSuggestions.low.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wide">
                  Tips
                </h4>
                {groupedSuggestions.low.map((suggestion, index) => (
                  <SuggestionCard
                    key={`low-${index}`}
                    suggestion={suggestion}
                    index={suggestions.indexOf(suggestion)}
                    onDismiss={handleDismissSuggestion}
                    getSuggestionIcon={getSuggestionIcon}
                    getSeverityColor={getSeverityColor}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && visibleSuggestions.length === 0 && suggestions.length > 0 && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-teal-500 mx-auto mb-3" />
            <p className="text-gray-300">All suggestions addressed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Individual suggestion card component
 */
interface SuggestionCardProps {
  suggestion: DesignSuggestion;
  index: number;
  onDismiss: (index: number) => void;
  getSuggestionIcon: (type: DesignSuggestion['type']) => React.ReactNode;
  getSeverityColor: (severity: DesignSuggestion['severity']) => string;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
  index,
  onDismiss,
  getSuggestionIcon,
  getSeverityColor,
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 glass-card" />
      <div className="relative p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {getSuggestionIcon(suggestion.type)}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-sm font-medium text-white">
                {suggestion.message}
              </p>
              <button
                onClick={() => onDismiss(index)}
                className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
                aria-label="Dismiss suggestion"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-xs text-gray-400 mb-3">
              {suggestion.reasoning}
            </p>
            
            {/* Badges and Feedback */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getSeverityColor(suggestion.severity)}`}>
                  {suggestion.severity}
                </span>
                {suggestion.autoFixable && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded border bg-teal-500/20 text-teal-300 border-teal-500/30">
                    Auto-fixable
                  </span>
                )}
              </div>
              
              {/* Feedback Buttons */}
              <FeedbackButtons
                target="suggestion"
                targetId={`suggestion_${index}`}
                metadata={{
                  suggestionType: suggestion.type,
                  suggestionSeverity: suggestion.severity,
                  autoFixable: suggestion.autoFixable,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
