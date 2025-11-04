/**
 * UpgradeManager Component
 * 
 * Global component that manages upgrade prompts and modals
 * Listens for events and shows appropriate UI
 */

import React, { useState, useEffect } from 'react';
import { UpgradeModal } from './UpgradeModal';
import { UpgradePrompt } from './UpgradePrompt';
import { shouldShowUpgradePrompt } from '../../utils/premiumTier';

export const UpgradeManager: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [reason, setReason] = useState<'rate-limit' | 'feature' | 'general'>('general');

  useEffect(() => {
    // Listen for upgrade prompt events
    const handleShowUpgradePrompt = (event: CustomEvent) => {
      if (!shouldShowUpgradePrompt()) {
        return; // User is already premium
      }

      const { reason: eventReason, type } = event.detail;
      setReason(eventReason || 'general');

      if (type === 'modal') {
        setShowModal(true);
      } else {
        setShowBanner(true);
      }
    };

    window.addEventListener('show-upgrade-prompt', handleShowUpgradePrompt as EventListener);

    return () => {
      window.removeEventListener('show-upgrade-prompt', handleShowUpgradePrompt as EventListener);
    };
  }, []);

  // Listen for premium status changes to hide prompts
  useEffect(() => {
    const handlePremiumStatusChanged = (event: CustomEvent) => {
      const { isPremium } = event.detail;
      if (isPremium) {
        setShowModal(false);
        setShowBanner(false);
      }
    };

    window.addEventListener('premium-status-changed', handlePremiumStatusChanged as EventListener);

    return () => {
      window.removeEventListener('premium-status-changed', handlePremiumStatusChanged as EventListener);
    };
  }, []);

  const handleOpenModal = () => {
    setShowBanner(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDismissBanner = () => {
    setShowBanner(false);
  };

  return (
    <>
      {/* Floating Banner (bottom of screen) */}
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto">
          <UpgradePrompt
            reason={reason}
            onUpgrade={handleOpenModal}
            onDismiss={handleDismissBanner}
            compact
          />
        </div>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showModal}
        onClose={handleCloseModal}
        reason={reason}
      />
    </>
  );
};
