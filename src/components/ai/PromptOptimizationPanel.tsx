/**
 * PromptOptimizationPanel Component
 * 
 * UI for managing prompt variations and A/B tests
 * Displays test results and allows rolling out winning variations
 */

import React, { useState, useEffect } from 'react';
import { Beaker, TrendingUp, CheckCircle, Play, Trophy } from 'lucide-react';
import { Button } from '../ui/Button';
import { getPromptOptimizationService } from '../../services/promptOptimization';
import type { PromptTest, PromptVariation } from '../../services/promptOptimization';
import type { FeedbackTarget } from '../../types/gemini';

export interface PromptOptimizationPanelProps {
  target: FeedbackTarget;
  className?: string;
}

/**
 * PromptOptimizationPanel displays prompt optimization tools and test results
 */
export const PromptOptimizationPanel: React.FC<PromptOptimizationPanelProps> = ({
  target,
  className = '',
}) => {
  const [, setVariations] = useState<PromptVariation[]>([]);
  const [activeTests, setActiveTests] = useState<PromptTest[]>([]);
  const [completedTests, setCompletedTests] = useState<PromptTest[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  useEffect(() => {
    const optimizationService = getPromptOptimizationService();
    
    // Load data
    setVariations(optimizationService.getVariations(target));
    setActiveTests(optimizationService.getActiveTests().filter(t => t.target === target));
    setCompletedTests(optimizationService.getCompletedTests().filter(t => t.target === target));
    setSuggestions(optimizationService.generateOptimizationSuggestions(target));
  }, [target]);
  
  const handleAnalyzeTest = (testId: string) => {
    const optimizationService = getPromptOptimizationService();
    const result = optimizationService.analyzeTest(testId);
    
    if (result) {
      // Refresh data
      setActiveTests(optimizationService.getActiveTests().filter(t => t.target === target));
      setCompletedTests(optimizationService.getCompletedTests().filter(t => t.target === target));
    }
  };
  
  const handleRolloutWinner = (testId: string) => {
    const optimizationService = getPromptOptimizationService();
    optimizationService.rolloutWinner(testId);
    
    // Refresh data
    setVariations(optimizationService.getVariations(target));
    setCompletedTests(optimizationService.getCompletedTests().filter(t => t.target === target));
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Beaker className="w-6 h-6 text-teal-500" />
        <h2 className="text-xl font-bold text-white">Prompt Optimization</h2>
      </div>
      
      {/* Optimization Suggestions */}
      {suggestions.length > 0 && (
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg font-semibold text-white">Optimization Suggestions</h3>
          </div>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-teal-400 mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Active Tests */}
      {activeTests.length > 0 && (
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Play className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Active A/B Tests</h3>
          </div>
          <div className="space-y-4">
            {activeTests.map((test) => (
              <div key={test.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm font-medium text-white">
                      {test.variationA.name} vs {test.variationB.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      Started {new Date(test.startedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAnalyzeTest(test.id)}
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Analyze Results
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-2 bg-white/5 rounded">
                    <div className="text-gray-400 mb-1">Variation A</div>
                    <div className="text-white font-medium">{test.variationA.name}</div>
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <div className="text-gray-400 mb-1">Variation B</div>
                    <div className="text-white font-medium">{test.variationB.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Completed Tests */}
      {completedTests.length > 0 && (
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Completed Tests</h3>
          </div>
          <div className="space-y-4">
            {completedTests.map((test) => (
              <div key={test.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm font-medium text-white">
                      {test.variationA.name} vs {test.variationB.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      Completed {test.endedAt ? new Date(test.endedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  {test.results && !test.variationA.isActive && !test.variationB.isActive && (
                    <Button
                      onClick={() => handleRolloutWinner(test.id)}
                      size="sm"
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Rollout Winner
                    </Button>
                  )}
                </div>
                
                {test.results && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-3 rounded ${test.results.winner === 'A' ? 'bg-teal-500/20 border border-teal-500/30' : 'bg-white/5'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">Variation A</span>
                          {test.results.winner === 'A' && (
                            <CheckCircle className="w-4 h-4 text-teal-400" />
                          )}
                        </div>
                        <div className="text-lg font-bold text-white">
                          {(test.results.variationA.acceptanceRate * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-400">
                          {test.results.variationA.totalFeedback} feedback
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded ${test.results.winner === 'B' ? 'bg-teal-500/20 border border-teal-500/30' : 'bg-white/5'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">Variation B</span>
                          {test.results.winner === 'B' && (
                            <CheckCircle className="w-4 h-4 text-teal-400" />
                          )}
                        </div>
                        <div className="text-lg font-bold text-white">
                          {(test.results.variationB.acceptanceRate * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-400">
                          {test.results.variationB.totalFeedback} feedback
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-teal-500/10 border border-teal-500/30 rounded text-center">
                      <span className="text-sm text-teal-300">
                        Variation {test.results.winner} won by {test.results.improvement.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {activeTests.length === 0 && completedTests.length === 0 && (
        <div className="glass-card rounded-lg p-12 text-center">
          <Beaker className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No A/B Tests Yet
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Create prompt variations and start A/B tests to optimize AI suggestion quality.
            Tests help identify which prompts perform better with users.
          </p>
        </div>
      )}
    </div>
  );
};
