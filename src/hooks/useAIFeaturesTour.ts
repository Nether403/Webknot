/**
 * useAIFeaturesTour Hook
 * 
 * Manages the state of the AI features tour for first-time users.
 * Tracks whether the tour has been completed and provides functions to control it.
 */

import { useState, useEffect } from 'react';

const TOUR_STORAGE_KEY = 'lovabolt-ai-tour-completed';

export const useAIFeaturesTour = () => {
  const [showTour, setShowTour] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);

  useEffect(() => {
    // Check if tour has been completed before
    const completed = localStorage.getItem(TOUR_STORAGE_KEY) === 'true';
    setTourCompleted(completed);

    // Show tour for first-time users after a short delay
    if (!completed) {
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 2000); // 2 second delay to let the app load

      return () => clearTimeout(timer);
    }
  }, []);

  const completeTour = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    setTourCompleted(true);
    setShowTour(false);
  };

  const skipTour = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    setTourCompleted(true);
    setShowTour(false);
  };

  const restartTour = () => {
    setShowTour(true);
  };

  return {
    showTour,
    tourCompleted,
    completeTour,
    skipTour,
    restartTour,
  };
};

export default useAIFeaturesTour;
