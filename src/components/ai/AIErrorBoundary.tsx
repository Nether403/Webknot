/**
 * AIErrorBoundary Component
 * 
 * Error boundary specifically for AI features that provides graceful degradation.
 * When AI features fail, the wizard continues to work normally without them.
 * 
 * Features:
 * - Catches errors in AI components
 * - Shows user-friendly error messages
 * - Allows wizard to continue functioning
 * - Logs errors for debugging
 * - Provides retry functionality
 * 
 * @module AIErrorBoundary
 */

import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface AIErrorBoundaryProps {
  children: ReactNode;
  fallbackMessage?: string;
  showRetry?: boolean;
}

interface AIErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Error boundary component for AI features
 * 
 * Wraps AI components to catch errors and provide graceful fallback UI.
 * The wizard continues to work even if AI features fail.
 * 
 * @example
 * ```tsx
 * <AIErrorBoundary fallbackMessage="Smart suggestions temporarily unavailable">
 *   <SmartSuggestionPanel />
 * </AIErrorBoundary>
 * ```
 */
export class AIErrorBoundary extends Component<AIErrorBoundaryProps, AIErrorBoundaryState> {
  constructor(props: AIErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<AIErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error details for debugging
    console.error('AI Feature Error:', error);
    console.error('Error Info:', errorInfo);

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });

    // You could also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleRetry = (): void => {
    // Reset error state to retry rendering the component
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  override render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallbackMessage, showRetry = true } = this.props;

    if (hasError) {
      return (
        <div className="glass-card p-4 rounded-xl border border-yellow-500/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-yellow-400 font-medium mb-1">
                {fallbackMessage || 'AI features temporarily unavailable'}
              </p>
              <p className="text-xs text-gray-400">
                You can continue using the wizard normally. Your selections are still saved.
              </p>
              {process.env['NODE_ENV'] === 'development' && error && (
                <details className="mt-2">
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                    Error details (dev only)
                  </summary>
                  <pre className="mt-2 text-xs text-red-400 bg-black/20 p-2 rounded overflow-auto max-h-32">
                    {error.toString()}
                  </pre>
                </details>
              )}
              {showRetry && (
                <button
                  onClick={this.handleRetry}
                  className="mt-3 flex items-center gap-2 text-xs text-teal-400 hover:text-teal-300 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  Try again
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

/**
 * Functional wrapper for AIErrorBoundary with default props
 * 
 * @param props - Component props
 * @returns AIErrorBoundary component
 */
export const AIFeatureWrapper: React.FC<{
  children: ReactNode;
  featureName?: string;
}> = ({ children, featureName = 'AI feature' }) => {
  return (
    <AIErrorBoundary
      fallbackMessage={`${featureName} temporarily unavailable`}
      showRetry={true}
    >
      {children}
    </AIErrorBoundary>
  );
};

export default AIErrorBoundary;
