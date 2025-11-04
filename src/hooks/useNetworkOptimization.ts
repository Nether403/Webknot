/**
 * useNetworkOptimization Hook
 * 
 * Provides network optimization utilities for components
 * Adapts behavior based on network quality and connection status
 */

import { useState, useEffect } from 'react';
import {
  getNetworkQuality,
  getAdaptiveTimeout,
  getAdaptiveChunkSize,
  shouldLoadImages,
  shouldEnableAnimations,
  isSlowConnection,
  isDataSaverEnabled,
  monitorNetworkQuality,
  type NetworkQuality,
} from '../utils/networkOptimization';
import { isOnline } from '../utils/serviceWorkerRegistration';

export interface NetworkOptimizationState {
  online: boolean;
  quality: NetworkQuality;
  isSlowConnection: boolean;
  dataSaverEnabled: boolean;
  shouldLoadImages: boolean;
  shouldEnableAnimations: boolean;
  adaptiveTimeout: number;
  adaptiveChunkSize: number;
}

/**
 * Hook for network optimization
 * Provides network status and adaptive settings
 */
export function useNetworkOptimization(baseTimeout: number = 5000): NetworkOptimizationState {
  const [online, setOnline] = useState(isOnline());
  const [quality, setQuality] = useState<NetworkQuality>(getNetworkQuality());
  
  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Monitor network quality changes
    const cleanup = monitorNetworkQuality((newQuality) => {
      setQuality(newQuality);
    });
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      cleanup();
    };
  }, []);
  
  return {
    online,
    quality,
    isSlowConnection: isSlowConnection(),
    dataSaverEnabled: isDataSaverEnabled(),
    shouldLoadImages: shouldLoadImages(),
    shouldEnableAnimations: shouldEnableAnimations(),
    adaptiveTimeout: getAdaptiveTimeout(baseTimeout),
    adaptiveChunkSize: getAdaptiveChunkSize(),
  };
}
