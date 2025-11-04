import React, { useCallback, useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, HelpCircle } from 'lucide-react';
import { CompatibilityResult, CompatibilityIssue } from '../../utils/compatibilityChecker';
import { Button } from '../ui/Button';
import { trackAIEvent } from '../../utils/analyticsTracking';
import { Tooltip } from '../ui/tooltip';

export interface CompatibilityIndicatorProps {
  compatibility: CompatibilityResult;
  onAutoFix?: (issue: CompatibilityIssue) => void;
  onViewAISuggestions?: () => void;
  aiSuggestionsCount?: number;
  className?: string;
}

/**
 * CompatibilityIndicator displays the Design Harmony score and compatibility issues
 * Shows color-coded score, issues with severity indicators, and auto-fix options
 */
const CompatibilityIndicatorComponent: React.FC<CompatibilityIndicatorProps> = ({
  compatibility,
  onAutoFix,
  onViewAISuggestions,
  aiSuggestionsCount = 0,
  className = '',
}) => {
  // Track compatibility check when component mounts or compatibility changes
  useEffect(() => {
    trackAIEvent('compatibility_checked', {
      score: compatibility.score,
      harmony: compatibility.harmony,
      issuesCount: compatibility.issues.length,
      warningsCount: compatibility.warnings.length,
    });
  }, [compatibility.score, compatibility.harmony, compatibility.issues.length, compatibility.warnings.length]);

  // Memoize event handler to prevent unnecessary re-renders
  const handleAutoFix = useCallback((issue: CompatibilityIssue) => {
    if (onAutoFix) {
      onAutoFix(issue);
      
      // Track analytics event
      trackAIEvent('compatibility_fix_applied', {
        severity: issue.severity,
        affected: issue.affected,
      });
    }
  }, [onAutoFix]);

  const getHarmonyColor = (harmony: string): string => {
    switch (harmony) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-teal-500';
      case 'fair':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
      case 'pending':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getHarmonyIcon = (harmony: string): JSX.Element => {
    switch (harmony) {
      case 'excellent':
        return <CheckCircle className="w-6 h-6" />;
      case 'good':
        return <CheckCircle className="w-6 h-6" />;
      case 'fair':
        return <AlertCircle className="w-6 h-6" />;
      case 'poor':
        return <XCircle className="w-6 h-6" />;
      case 'pending':
        return <HelpCircle className="w-6 h-6" />;
      default:
        return <AlertCircle className="w-6 h-6" />;
    }
  };

  const getHarmonyLabel = (harmony: string): string => {
    if (harmony === 'pending') {
      return 'Calculating...';
    }
    return harmony.charAt(0).toUpperCase() + harmony.slice(1);
  };

  // Don't render if in pending state
  if (compatibility.harmony === 'pending') {
    return (
      <div 
        className={`glass-card p-4 rounded-xl ${className}`} 
        data-tour="design-harmony"
        role="region"
        aria-label="Design compatibility indicator"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-400">Design Harmony</h3>
            <Tooltip content="We check if your design choices work well together and alert you to potential conflicts or issues.">
              <a
                href="/docs/AI_FEATURES_GUIDE.md#design-compatibility-checking"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Learn more about design harmony"
              >
                <HelpCircle className="w-3 h-3 text-gray-400 hover:text-teal-400" />
              </a>
            </Tooltip>
          </div>
        </div>
        <div className="text-center py-6">
          <HelpCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-400 font-medium">Awaiting selections</p>
          <p className="text-xs text-gray-500 mt-1">Make at least 2 design choices to see your harmony score</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`glass-card p-4 rounded-xl ${className}`} 
      data-tour="design-harmony"
      role="region"
      aria-label="Design compatibility indicator"
    >
      {/* Header with Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-400">Design Harmony</h3>
          <Tooltip content="We check if your design choices work well together and alert you to potential conflicts or issues.">
            <a
              href="/docs/AI_FEATURES_GUIDE.md#design-compatibility-checking"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Learn more about design harmony"
            >
              <HelpCircle className="w-3 h-3 text-gray-400 hover:text-teal-400" />
            </a>
          </Tooltip>
        </div>
        <div 
          className="flex items-center gap-2"
          role="status"
          aria-live="polite"
          aria-describedby="harmony-description"
          aria-label={`Design harmony score: ${compatibility.score} out of 100. ${getHarmonyLabel(compatibility.harmony)} harmony level`}
        >
          <span className={`text-2xl font-bold ${getHarmonyColor(compatibility.harmony)}`}>
            {compatibility.score}
          </span>
          <span className={getHarmonyColor(compatibility.harmony)}>
            {getHarmonyIcon(compatibility.harmony)}
          </span>
        </div>
      </div>

      {/* Harmony Level Label */}
      <div className="mb-4">
        <span 
          id="harmony-description"
          className={`text-sm font-medium ${getHarmonyColor(compatibility.harmony)}`}
        >
          {getHarmonyLabel(compatibility.harmony)}
        </span>
      </div>

      {/* Issues Section */}
      {compatibility.issues.length > 0 && (
        <div className="space-y-2 mb-3" role="alert" aria-label="Compatibility issues">
          <h4 className="text-xs font-medium text-red-400 uppercase tracking-wide">Issues</h4>
          {compatibility.issues.map((issue, index) => (
            <div 
              key={index} 
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              role="article"
              aria-labelledby={`issue-message-${index}`}
            >
              <div className="flex items-start gap-2 mb-1">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <p id={`issue-message-${index}`} className="text-sm text-red-300 flex-1">{issue.message}</p>
              </div>
              <p className="text-xs text-gray-400 ml-6 mb-2">{issue.suggestion}</p>
              {issue.autoFixable && onAutoFix && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAutoFix(issue)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleAutoFix(issue);
                    }
                  }}
                  className="ml-6 text-xs h-7 border-red-500/30 hover:bg-red-500/10 text-red-300 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label={`Auto-fix: ${issue.message}`}
                >
                  Auto-Fix
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Warnings Section */}
      {compatibility.warnings.length > 0 && (
        <div className="space-y-2" role="status" aria-label="Compatibility warnings">
          <h4 className="text-xs font-medium text-yellow-400 uppercase tracking-wide">Warnings</h4>
          {compatibility.warnings.map((warning, index) => (
            <div
              key={index}
              className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3"
              role="article"
              aria-labelledby={`warning-message-${index}`}
            >
              <div className="flex items-start gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <p id={`warning-message-${index}`} className="text-sm text-yellow-300 flex-1">{warning.message}</p>
              </div>
              <p className="text-xs text-gray-400 ml-6">{warning.suggestion}</p>
            </div>
          ))}
        </div>
      )}

      {/* Perfect Harmony State */}
      {compatibility.issues.length === 0 && compatibility.warnings.length === 0 && (
        <div className="text-center py-4">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-green-400 font-medium">Perfect harmony!</p>
          <p className="text-xs text-gray-400 mt-1">Your selections work great together</p>
        </div>
      )}
      
      {/* AI Suggestions Button */}
      {onViewAISuggestions && aiSuggestionsCount > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <Button
            size="sm"
            variant="outline"
            onClick={onViewAISuggestions}
            className="w-full text-xs border-teal-500/30 hover:bg-teal-500/10 text-teal-300 focus:ring-2 focus:ring-teal-500"
            aria-label={`View ${aiSuggestionsCount} AI suggestion${aiSuggestionsCount !== 1 ? 's' : ''}`}
          >
            View {aiSuggestionsCount} AI Suggestion{aiSuggestionsCount !== 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  );
};

// Wrap component in React.memo to prevent unnecessary re-renders
export const CompatibilityIndicator = React.memo(CompatibilityIndicatorComponent);

export default CompatibilityIndicator;
