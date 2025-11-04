import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { registerServiceWorker } from './utils/serviceWorkerRegistration';
import './index.css';

// Register service worker for offline support and caching
registerServiceWorker({
  onSuccess: () => {
    console.log('[App] Content cached for offline use');
  },
  onUpdate: () => {
    console.log('[App] New content available, please refresh');
    // Optionally show a notification to the user
  },
  onOffline: () => {
    console.log('[App] App is offline');
    // Optionally show offline indicator
  },
  onOnline: () => {
    console.log('[App] App is back online');
    // Optionally hide offline indicator
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
