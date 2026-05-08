import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BoltBuilderProvider } from './contexts/BoltBuilderContext';
import ErrorBoundary from './components/ErrorBoundary';
import WelcomePage from './components/WelcomePage';
import WizardLayout from './components/WizardLayout';
import { SkipLink } from './components/accessibility/SkipLink';
import { AnalyticsDashboardPage } from './components/AnalyticsDashboardPage';
import { NetworkStatus } from './components/NetworkStatus';

const FloatingLines = lazy(() => import('./components/ui/FloatingLines'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

function WebGLBackground() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f1640_0%,#000_55%)]" />
    );
  }

  return (
    <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
      <FloatingLines
        enabledWaves={['top', 'middle', 'bottom']}
        lineCount={[10, 15, 20]}
        lineDistance={[8, 6, 4]}
        bendRadius={5.0}
        bendStrength={-0.5}
        interactive={true}
        parallax={true}
      />
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BoltBuilderProvider>
          {/* Skip navigation links for accessibility */}
          <SkipLink href="#main-content">Skip to main content</SkipLink>
          <div className="min-h-screen bg-black overflow-hidden">
            {/* Floating Lines Background */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <WebGLBackground />
            </div>

            <div className="relative z-10">
              <Router>
                <Routes>
                  <Route path="/" element={<WelcomePage />} />
                  <Route path="/analytics" element={<AnalyticsDashboardPage />} />
                  <Route path="/wizard" element={<WizardLayout />} />
                  <Route path="/*" element={<WizardLayout />} />
                </Routes>
              </Router>
            </div>

            {/* Network status indicator for mobile optimization */}
            <NetworkStatus />
          </div>
        </BoltBuilderProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
