import { useMemo } from 'react';
import { PromptAnalysisResult, safeAnalyzePrompt, PromptAnalysisInput } from '../utils/promptAnalyzer';
import { BoltBuilderState } from '../types';

/**
 * Hook to analyze prompt quality with memoization
 * Automatically recalculates when prompt or selections change
 * 
 * @param prompt - The generated prompt text to analyze
 * @param selections - Current wizard selections
 * @returns Memoized prompt analysis result
 */
export const usePromptAnalysis = (
  prompt: string,
  selections: Partial<BoltBuilderState>
): PromptAnalysisResult => {
  // Memoize prompt analysis to avoid unnecessary recalculations
  const analysis = useMemo(() => {
    if (!prompt || prompt.trim().length === 0) {
      return {
        score: 0,
        suggestions: [],
        strengths: [],
        weaknesses: ['No prompt generated yet'],
      };
    }

    const input: PromptAnalysisInput = {
      prompt,
      projectInfo: selections.projectInfo,
      selectedDesignStyle: selections.selectedDesignStyle || undefined,
      selectedColorTheme: selections.selectedColorTheme || undefined,
      selectedComponents: selections.selectedComponents,
      selectedAnimations: selections.selectedAnimations,
    };

    return safeAnalyzePrompt(input);
  }, [prompt, selections]);

  return analysis;
};

export default usePromptAnalysis;
