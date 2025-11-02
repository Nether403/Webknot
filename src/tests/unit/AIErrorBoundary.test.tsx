/**
 * AIErrorBoundary Component Tests
 * 
 * Tests for the error boundary component that wraps AI features.
 * Ensures graceful degradation and user-friendly error messages.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AIErrorBoundary, AIFeatureWrapper } from '../../components/ai/AIErrorBoundary';

// Component that throws an error
const ThrowError: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Working component</div>;
};

// Component that works normally
const WorkingComponent: React.FC = () => {
  return <div>AI feature working</div>;
};

describe('AIErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should render children when no error occurs', () => {
    render(
      <AIErrorBoundary>
        <WorkingComponent />
      </AIErrorBoundary>
    );

    expect(screen.getByText('AI feature working')).toBeInTheDocument();
  });

  it('should catch errors and display fallback UI', () => {
    render(
      <AIErrorBoundary>
        <ThrowError />
      </AIErrorBoundary>
    );

    expect(screen.getByText(/AI features temporarily unavailable/i)).toBeInTheDocument();
    expect(screen.getByText(/You can continue using the wizard normally/i)).toBeInTheDocument();
  });

  it('should display custom fallback message', () => {
    const customMessage = 'Smart suggestions are not available right now';

    render(
      <AIErrorBoundary fallbackMessage={customMessage}>
        <ThrowError />
      </AIErrorBoundary>
    );

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('should show retry button by default', () => {
    render(
      <AIErrorBoundary>
        <ThrowError />
      </AIErrorBoundary>
    );

    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('should hide retry button when showRetry is false', () => {
    render(
      <AIErrorBoundary showRetry={false}>
        <ThrowError />
      </AIErrorBoundary>
    );

    expect(screen.queryByText('Try again')).not.toBeInTheDocument();
  });

  it('should reset error state when retry button is clicked', () => {
    let shouldThrow = true;
    const TestComponent = () => {
      if (shouldThrow) {
        throw new Error('Test error');
      }
      return <div>Working component</div>;
    };

    const { rerender } = render(
      <AIErrorBoundary>
        <TestComponent />
      </AIErrorBoundary>
    );

    // Error should be displayed
    expect(screen.getByText(/AI features temporarily unavailable/i)).toBeInTheDocument();

    // Fix the component so it won't throw on retry
    shouldThrow = false;

    // Click retry button
    const retryButton = screen.getByText('Try again');
    fireEvent.click(retryButton);

    // After retry, the error boundary resets and re-renders children
    // The component should now work
    expect(screen.getByText('Working component')).toBeInTheDocument();
  });

  it('should display error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <AIErrorBoundary>
        <ThrowError />
      </AIErrorBoundary>
    );

    // Should have details element
    const details = screen.getByText(/Error details/i);
    expect(details).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('should not display error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(
      <AIErrorBoundary>
        <ThrowError />
      </AIErrorBoundary>
    );

    // Should not have details element
    expect(screen.queryByText(/Error details/i)).not.toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('should log error to console', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AIErrorBoundary>
        <ThrowError />
      </AIErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});

describe('AIFeatureWrapper', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should render children when no error occurs', () => {
    render(
      <AIFeatureWrapper featureName="Test Feature">
        <WorkingComponent />
      </AIFeatureWrapper>
    );

    expect(screen.getByText('AI feature working')).toBeInTheDocument();
  });

  it('should display feature name in error message', () => {
    render(
      <AIFeatureWrapper featureName="Smart Suggestions">
        <ThrowError />
      </AIFeatureWrapper>
    );

    expect(screen.getByText('Smart Suggestions temporarily unavailable')).toBeInTheDocument();
  });

  it('should use default feature name if not provided', () => {
    render(
      <AIFeatureWrapper>
        <ThrowError />
      </AIFeatureWrapper>
    );

    expect(screen.getByText('AI feature temporarily unavailable')).toBeInTheDocument();
  });

  it('should always show retry button', () => {
    render(
      <AIFeatureWrapper featureName="Test Feature">
        <ThrowError />
      </AIFeatureWrapper>
    );

    expect(screen.getByText('Try again')).toBeInTheDocument();
  });
});

describe('AIErrorBoundary - Multiple Children', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should catch error from any child', () => {
    render(
      <AIErrorBoundary>
        <WorkingComponent />
        <ThrowError />
        <WorkingComponent />
      </AIErrorBoundary>
    );

    // Should show error UI instead of any children
    expect(screen.getByText(/AI features temporarily unavailable/i)).toBeInTheDocument();
    expect(screen.queryByText('AI feature working')).not.toBeInTheDocument();
  });

  it('should render all children when none throw errors', () => {
    render(
      <AIErrorBoundary>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </AIErrorBoundary>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });
});

describe('AIErrorBoundary - Nested Error Boundaries', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should isolate errors to nearest boundary', () => {
    render(
      <AIErrorBoundary fallbackMessage="Outer boundary">
        <WorkingComponent />
        <AIErrorBoundary fallbackMessage="Inner boundary">
          <ThrowError />
        </AIErrorBoundary>
        <WorkingComponent />
      </AIErrorBoundary>
    );

    // Inner boundary should catch the error
    expect(screen.getByText('Inner boundary')).toBeInTheDocument();
    // Outer boundary should still render working components
    expect(screen.getAllByText('AI feature working')).toHaveLength(2);
  });
});

describe('AIErrorBoundary - Accessibility', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should have proper ARIA attributes', () => {
    render(
      <AIErrorBoundary>
        <ThrowError />
      </AIErrorBoundary>
    );

    // Error message should be visible
    const errorMessage = screen.getByText(/AI features temporarily unavailable/i);
    expect(errorMessage).toBeVisible();
  });

  it('should have keyboard accessible retry button', () => {
    render(
      <AIErrorBoundary>
        <ThrowError />
      </AIErrorBoundary>
    );

    const retryButton = screen.getByText('Try again');
    expect(retryButton).toBeInTheDocument();
    
    // Button should be focusable
    retryButton.focus();
    expect(document.activeElement).toBe(retryButton);
  });
});
