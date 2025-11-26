import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BoltBuilderProvider } from './contexts/BoltBuilderContext';
import ErrorBoundary from './components/ErrorBoundary';
import WelcomePage from './components/WelcomePage';
import WizardLayout from './components/WizardLayout';
import { SkipLink } from './components/accessibility/SkipLink';
import { AnalyticsDashboardPage } from './components/AnalyticsDashboardPage';
import FloatingLines from './components/ui/FloatingLines';
import { NetworkStatus } from './components/NetworkStatus';

function App() {
  return (
    <ErrorBoundary>
      <BoltBuilderProvider>
        {/* Skip navigation links for accessibility */}
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <div className="min-h-screen bg-black overflow-hidden">
          {/* Floating Lines Background */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <FloatingLines
              enabledWaves={['top', 'middle', 'bottom']}
              lineCount={[10, 15, 20]}
              lineDistance={[8, 6, 4]}
              bendRadius={5.0}
              bendStrength={-0.5}
              interactive={true}
              parallax={true}
            />
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
    </ErrorBoundary>
  );
}

export default App;
