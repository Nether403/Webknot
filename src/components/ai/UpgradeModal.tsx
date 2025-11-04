/**
 * UpgradeModal Component
 * 
 * Modal wrapper for the upgrade flow
 * Handles showing comparison and processing upgrade
 */

import React, { useState, useEffect } from 'react';
import { PremiumComparison } from './PremiumComparison';
import { setPremiumStatus } from '../../utils/premiumTier';
import { toast } from '@/hooks/use-toast';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: 'rate-limit' | 'feature' | 'general';
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleUpgrade = async () => {
    setIsProcessing(true);

    try {
      // TODO: Integrate with actual payment system
      // For now, this is a placeholder that simulates the upgrade process
      
      console.log('[Upgrade] Starting upgrade process...');
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, activate premium immediately
      // In production, this would be done after successful payment
      setPremiumStatus(true);
      
      toast({
        title: 'Welcome to Premium! 🎉',
        description: 'You now have unlimited access to all AI features.',
        duration: 5000,
      });
      
      console.log('[Upgrade] Upgrade successful');
      
      // Close modal
      onClose();
      
      // Reload page to reflect premium status
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('[Upgrade] Upgrade failed:', error);
      
      toast({
        variant: 'destructive',
        title: 'Upgrade Failed',
        description: 'There was an error processing your upgrade. Please try again.',
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {isProcessing ? (
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 glass-card" />
            <div className="relative p-12 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-white font-semibold text-lg">Processing your upgrade...</p>
              <p className="text-gray-400 text-sm mt-2">This will only take a moment</p>
            </div>
          </div>
        ) : (
          <PremiumComparison
            onUpgrade={handleUpgrade}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};
