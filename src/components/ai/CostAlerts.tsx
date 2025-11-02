/**
 * Cost Alerts Component
 * 
 * Displays cost alerts when AI spending approaches or exceeds budget thresholds
 */

import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, DollarSign } from 'lucide-react';
import { getCostTracker } from '../../services/costTracker';

interface CostAlert {
  timestamp: number;
  message: string;
  severity: 'warning' | 'critical';
  currentCost: number;
  threshold: number;
}

export const CostAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<CostAlert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<number>>(new Set());
  
  useEffect(() => {
    const costTracker = getCostTracker();
    
    // Load existing alerts
    const existingAlerts = costTracker.getAlerts(86400000); // Last 24 hours
    setAlerts(existingAlerts);
    
    // Listen for new alerts
    const handleCostAlert = (event: CustomEvent) => {
      const newAlerts = event.detail.alerts as CostAlert[];
      setAlerts(prev => [...prev, ...newAlerts]);
    };
    
    window.addEventListener('cost-alert', handleCostAlert as EventListener);
    
    return () => {
      window.removeEventListener('cost-alert', handleCostAlert as EventListener);
    };
  }, []);
  
  const handleDismiss = (timestamp: number) => {
    setDismissedAlerts(prev => new Set(prev).add(timestamp));
  };
  
  // Filter out dismissed alerts
  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.timestamp));
  
  if (visibleAlerts.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {visibleAlerts.map((alert) => (
        <div
          key={alert.timestamp}
          className={`relative overflow-hidden rounded-xl shadow-lg ${
            alert.severity === 'critical'
              ? 'bg-red-900/90 border border-red-500'
              : 'bg-yellow-900/90 border border-yellow-500'
          }`}
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className={`${
                alert.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {alert.severity === 'critical' ? (
                  <DollarSign className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white mb-1">
                  {alert.severity === 'critical' ? 'Budget Exceeded' : 'Budget Warning'}
                </h4>
                <p className="text-sm text-gray-200">{alert.message}</p>
                
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        alert.severity === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                      style={{
                        width: `${Math.min(100, (alert.currentCost / alert.threshold) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-300">
                    {((alert.currentCost / alert.threshold) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => handleDismiss(alert.timestamp)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
