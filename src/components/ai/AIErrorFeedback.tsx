/**
 * AI Error Feedback Component
 * 
 * Displays specific error messages with actionable recovery steps
 * Shows estimated wait time for rate limits and circuit breaker
 * Provides retry button for transient errors
 */

import React from 'react';
import { AlertCircle, RefreshCw, Clock, Wifi, Key, XCircle } from 'lucide-react';

export interface AIErrorFeedbackProps {
  error: Error;
  onRetry?: () => void;
  isRetrying?: boolean;
}

interface ErrorInfo {
  title: string;
  message: string;
  icon: React.ReactNode;
  severity: 'error' | 'warning' | 'info';
  recoverySteps: string[];
  canRetry: boolean;
  estimatedWaitTime?: string;
}

/**
 * Analyzes an error and returns structured information
 * 
 * @param error - The error to analyze
 * @returns Structured error information
 */
function analyzeError(error: Error): ErrorInfo {
  const message = error.message.toLowerCase();
  
  // Rate limit errors
  if (message.includes('rate limit') || message.includes('ai limit')) {
    // Extract wait time from message (e.g., "try again in 5 minutes")
    const timeMatch = error.message.match(/(\d+)\s+minute/i);
    const minutes = timeMatch && timeMatch[1] ? parseInt(timeMatch[1], 10) : null;
    
    return {
      title: 'AI Request Limit Reached',
      message: error.message,
      icon: <Clock className="w-5 h-5" />,
      severity: 'warning',
      recoverySteps: [
        minutes ? `Wait ${minutes} minute${minutes !== 1 ? 's' : ''} for the limit to reset` : 'Wait for the rate limit to reset',
        'Use the standard analysis (already applied)',
        'Consider upgrading to premium for unlimited AI requests',
      ],
      canRetry: false,
      estimatedWaitTime: minutes ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : undefined,
    };
  }
  
  // Circuit breaker errors
  if (message.includes('temporarily unavailable') || message.includes('retrying in')) {
    const timeMatch = error.message.match(/(\d+)\s+minute/i);
    const minutes = timeMatch && timeMatch[1] ? parseInt(timeMatch[1], 10) : null;
    
    return {
      title: 'AI Service Temporarily Unavailable',
      message: error.message,
      icon: <AlertCircle className="w-5 h-5" />,
      severity: 'warning',
      recoverySteps: [
        'The AI service is experiencing issues and will retry automatically',
        minutes ? `Service will attempt recovery in ${minutes} minute${minutes !== 1 ? 's' : ''}` : 'Service will attempt recovery soon',
        'Standard analysis is being used in the meantime',
        'No action needed - the system will recover automatically',
      ],
      canRetry: false,
      estimatedWaitTime: minutes ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : undefined,
    };
  }
  
  // Network errors
  if (
    message.includes('network') ||
    message.includes('connection') ||
    message.includes('fetch') ||
    message.includes('internet')
  ) {
    return {
      title: 'Network Connection Error',
      message: 'Unable to connect to the AI service. Please check your internet connection.',
      icon: <Wifi className="w-5 h-5" />,
      severity: 'error',
      recoverySteps: [
        'Check your internet connection',
        'Try refreshing the page',
        'Click "Retry" to attempt the request again',
        'Standard analysis is available as a fallback',
      ],
      canRetry: true,
    };
  }
  
  // Timeout errors
  if (message.includes('timeout') || message.includes('took too long')) {
    return {
      title: 'Request Timeout',
      message: 'The AI service took too long to respond.',
      icon: <Clock className="w-5 h-5" />,
      severity: 'warning',
      recoverySteps: [
        'The request timed out - this is usually temporary',
        'Click "Retry" to try again',
        'Standard analysis has been applied automatically',
        'If the issue persists, the service may be experiencing high load',
      ],
      canRetry: true,
    };
  }
  
  // API key errors
  if (message.includes('api key') || message.includes('unauthorized') || message.includes('forbidden')) {
    return {
      title: 'API Configuration Error',
      message: 'There is an issue with the AI service configuration.',
      icon: <Key className="w-5 h-5" />,
      severity: 'error',
      recoverySteps: [
        'This is a configuration issue that requires administrator attention',
        'Standard analysis is available and working normally',
        'Contact support if this issue persists',
      ],
      canRetry: false,
    };
  }
  
  // Invalid response errors
  if (message.includes('invalid response') || message.includes('parse') || message.includes('format')) {
    return {
      title: 'Invalid AI Response',
      message: 'The AI service returned an unexpected response format.',
      icon: <XCircle className="w-5 h-5" />,
      severity: 'warning',
      recoverySteps: [
        'This is usually a temporary issue with the AI service',
        'Click "Retry" to try again',
        'Standard analysis has been applied automatically',
      ],
      canRetry: true,
    };
  }
  
  // AI disabled by user
  if (message.includes('ai features disabled')) {
    return {
      title: 'AI Features Disabled',
      message: 'AI features are currently disabled in your settings.',
      icon: <AlertCircle className="w-5 h-5" />,
      severity: 'info',
      recoverySteps: [
        'AI features are disabled by your preference',
        'Standard analysis is being used instead',
        'Enable AI features in settings to use intelligent recommendations',
      ],
      canRetry: false,
    };
  }
  
  // Generic error
  return {
    title: 'AI Service Error',
    message: error.message || 'An unexpected error occurred with the AI service.',
    icon: <AlertCircle className="w-5 h-5" />,
    severity: 'error',
    recoverySteps: [
      'An unexpected error occurred',
      'Click "Retry" to try again',
      'Standard analysis is available as a fallback',
      'If the issue persists, please contact support',
    ],
    canRetry: true,
  };
}

export const AIErrorFeedback: React.FC<AIErrorFeedbackProps> = ({
  error,
  onRetry,
  isRetrying = false,
}) => {
  const errorInfo = analyzeError(error);
  
  // Determine background color based on severity
  const bgColor = {
    error: 'bg-red-500/10 border-red-500/20',
    warning: 'bg-yellow-500/10 border-yellow-500/20',
    info: 'bg-blue-500/10 border-blue-500/20',
  }[errorInfo.severity];
  
  const iconColor = {
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400',
  }[errorInfo.severity];
  
  return (
    <div className={`relative overflow-hidden rounded-lg border ${bgColor}`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`flex-shrink-0 ${iconColor}`}>
            {errorInfo.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">
              {errorInfo.title}
            </h3>
            <p className="text-sm text-gray-300">
              {errorInfo.message}
            </p>
          </div>
        </div>
        
        {/* Estimated wait time */}
        {errorInfo.estimatedWaitTime && (
          <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-gray-800/50 rounded">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">
              Estimated wait time: <span className="font-semibold text-white">{errorInfo.estimatedWaitTime}</span>
            </span>
          </div>
        )}
        
        {/* Recovery steps */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
            What you can do:
          </p>
          <ul className="space-y-1.5">
            {errorInfo.recoverySteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-gray-500 flex-shrink-0">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Retry button */}
        {errorInfo.canRetry && onRetry && (
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : 'Retry'}
          </button>
        )}
      </div>
    </div>
  );
};
