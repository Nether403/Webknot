/**
 * Network Status Component
 * 
 * Displays network connection status and quality
 * Shows offline indicator and slow connection warnings
 */

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Signal } from 'lucide-react';
import {
  getNetworkQuality,
  monitorNetworkQuality,
  type NetworkQuality,
} from '../utils/networkOptimization';
import { isOnline } from '../utils/serviceWorkerRegistration';

export const NetworkStatus: React.FC = () => {
  const [online, setOnline] = useState(isOnline());
  const [quality, setQuality] = useState<NetworkQuality>(getNetworkQuality());
  const [showIndicator, setShowIndicator] = useState(false);
  
  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => {
      setOnline(true);
      setShowIndicator(true);
      
      // Hide indicator after 3 seconds
      setTimeout(() => setShowIndicator(false), 3000);
    };
    
    const handleOffline = () => {
      setOnline(false);
      setShowIndicator(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Monitor network quality changes
    const cleanup = monitorNetworkQuality((newQuality) => {
      setQuality(newQuality);
      
      // Show indicator for poor/moderate connections
      if (newQuality === 'poor' || newQuality === 'moderate') {
        setShowIndicator(true);
      }
    });
    
    // Show indicator initially if offline or poor connection
    if (!online || quality === 'poor' || quality === 'moderate') {
      setShowIndicator(true);
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      cleanup();
    };
  }, []);
  
  // Don't show indicator if online with good connection
  if (!showIndicator) {
    return null;
  }
  
  // Offline indicator
  if (!online) {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg">
          <WifiOff className="w-4 h-4" />
          <span className="text-sm font-medium">You're offline</span>
        </div>
      </div>
    );
  }
  
  // Slow connection warning
  if (quality === 'poor' || quality === 'moderate') {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg">
          <Signal className="w-4 h-4" />
          <span className="text-sm font-medium">
            {quality === 'poor' ? 'Slow connection detected' : 'Moderate connection'}
          </span>
          <button
            onClick={() => setShowIndicator(false)}
            className="ml-2 text-white/80 hover:text-white"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    );
  }
  
  // Back online indicator
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="flex items-center gap-2 px-4 py-2 bg-green-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg">
        <Wifi className="w-4 h-4" />
        <span className="text-sm font-medium">Back online</span>
      </div>
    </div>
  );
};
