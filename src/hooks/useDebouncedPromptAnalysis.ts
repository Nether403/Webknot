import { useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { usePromptAnalysis } from './usePromptAnalysis';
import { PromptAnalysisResult } from '../utils/promptAnalyzer';
import { BoltBuilderState } from '../types';

/**
 * Hook to analyze prompt quality with debouncing (500ms)
 * Prevents excessive analysis while prompt is being generated or edited
 * 
 * @param prompt - The generated prompt text to analyze
 * @param selections - Current wizard selections
 * @param delay - Debounce delay in milliseconds (default: 500ms)
 * @returns Debounced prompt analysis result
 * 
 * @example
 * ```tsx
 * const analysis = useDebouncedPromptAnalysis(prompt, selections, 500);
 * ```
 */
export const useDebouncedPromptAnalysis = (
  prompt: string,
  selections: Partial<BoltBuilderState>,
  delay: number = 500
): PromptAnalysisResult => {
  // Debounce the prompt input
  const debouncedPrompt = useDebounce(prompt, delay);

  // Create a stable selections key for memoization
  const selectionsKey = useMemo(() => {
    return JSON.stringify({
      projectType: selections.projectInfo?.type,
      designStyle: selections.selectedDesignStyle?.id,
      colorTheme: selections.selectedColorTheme?.id,
      componentsCount: selections.selectedComponents?.length,
      animationsCount: selections.selectedAnimations?.length,
    });
  }, [selections]);

  // Debounce the selections key
  const debouncedSelectionsKey = useDebounce(selectionsKey, delay);

  // Parse the debounced selections
  const debouncedSelections = useMemo(() => {
    return selections;
  }, [debouncedSelectionsKey, selections]);

  // Analyze the debounced prompt
  return usePromptAnalysis(debouncedPrompt, debouncedSelections);
};

export default useDebouncedPromptAnalysis;
