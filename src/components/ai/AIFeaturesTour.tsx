/**
 * AIFeaturesTour Component
 * 
 * Provides an interactive tour of AI features for first-time users.
 * Shows step-by-step guidance on how to use smart defaults, suggestions,
 * prompt analysis, and compatibility checking.
 */

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface TourStep {
  title: string;
  description: string;
  target?: string;
  image?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Welcome to AI-Powered Features',
    description: 'LovaBolt now includes intelligent features to help you create better prompts faster. Let\'s take a quick tour!',
  },
  {
    title: 'Smart Defaults',
    description: 'When you select a project type, we automatically suggest the best options based on common patterns. You can always override these suggestions.',
    target: 'smart-defaults',
  },
  {
    title: 'AI Suggestions',
    description: 'As you make selections, we provide context-aware suggestions that work well together. Each suggestion includes a confidence score and reasoning.',
    target: 'ai-suggestions',
  },
  {
    title: 'Prompt Quality Score',
    description: 'Before generating your prompt, we analyze it for completeness and best practices. Apply our recommendations to improve quality.',
    target: 'prompt-quality',
  },
  {
    title: 'Design Harmony',
    description: 'We check if your selections work well together and alert you to potential conflicts. Auto-fix buttons help resolve issues quickly.',
    target: 'design-harmony',
  },
  {
    title: 'You\'re All Set!',
    description: 'These AI features enhance your workflow without getting in the way. You can always access help by clicking the ? icon on any AI component.',
  },
];

export interface AIFeaturesTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const AIFeaturesTour: React.FC<AIFeaturesTourProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const currentStepData = TOUR_STEPS[currentStep] || TOUR_STEPS[0];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  useEffect(() => {
    // Highlight target element if specified
    if (currentStepData?.target) {
      const element = document.querySelector(`[data-tour="${currentStepData.target}"]`);
      if (element) {
        element.classList.add('tour-highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Cleanup previous highlights
    return () => {
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
      });
    };
  }, [currentStep, currentStepData?.target]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    onSkip();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />

      {/* Tour Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
        <div className="relative overflow-hidden rounded-xl mx-4">
          <div className="absolute inset-0 glass-card" />
          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-teal-500" />
                <h2 className="text-xl font-bold text-white">
                  {currentStepData?.title || 'AI Features Tour'}
                </h2>
              </div>
              <button
                onClick={handleSkip}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close tour"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-gray-300 leading-relaxed">
                {currentStepData?.description || ''}
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {TOUR_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-8 bg-teal-500'
                      : index < currentStep
                      ? 'w-2 bg-teal-500/50'
                      : 'w-2 bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handlePrevious}
                disabled={isFirstStep}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <span className="text-sm text-gray-400">
                {currentStep + 1} of {TOUR_STEPS.length}
              </span>

              <Button
                onClick={handleNext}
                className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
              >
                {isLastStep ? 'Get Started' : 'Next'}
                {!isLastStep && <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>

            {/* Skip Link */}
            {!isLastStep && (
              <div className="text-center mt-4">
                <button
                  onClick={handleSkip}
                  className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Skip tour
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tour Highlight Styles */}
      <style>{`
        .tour-highlight {
          position: relative;
          z-index: 51;
          box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.5), 0 0 0 8px rgba(20, 184, 166, 0.2);
          border-radius: 12px;
          animation: pulse-highlight 2s ease-in-out infinite;
        }

        @keyframes pulse-highlight {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.5), 0 0 0 8px rgba(20, 184, 166, 0.2);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(20, 184, 166, 0.6), 0 0 0 12px rgba(20, 184, 166, 0.3);
          }
        }
      `}</style>
    </>
  );
};

export default AIFeaturesTour;
