import { useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { useSmartSuggestions, UseSmartSuggestionsOptions, Suggestion } from './useSmartSuggestions';

/**
 * Hook for generating context-aware suggestions with debouncing
 * Debounces selection changes to prevent excessive recalculations
 * 
 * @param options - Configuration object containing current step, selections, and enabled flag
 * @param delay - Debounce delay in milliseconds (default: 300ms)
 * @returns Array of suggestions with confidence scores and reasoning
 * 
 * @example
 * ```tsx
 * const suggestions = useDebouncedSuggestions({
 *   currentStep: 'color-theme',
 *   selections: { selectedDesignStyle },
 *   enabled: true
 * }, 300);
 * ```
 */
export const useDebouncedSuggestions = (
  options: UseSmartSuggestionsOptions,
  delay: number = 300
): Suggestion[] => {
  // Create a stable key for debouncing based on selections
  const selectionsKey = useMemo(() => {
    return JSON.stringify({
      designStyle: options.selections.selectedDesignStyle?.id,
      colorTheme: options.selections.selectedColorTheme?.id,
      functionality: options.selections.selectedFunctionality?.map(f => f.id).join(','),
    });
  }, [options.selections]);

  // Debounce the selections key
  const debouncedKey = useDebounce(selectionsKey, delay);

  // Parse the debounced key back to selections
  const debouncedSelections = useMemo(() => {
    try {
      const parsed = JSON.parse(debouncedKey);
      return {
        selectedDesignStyle: parsed.designStyle 
          ? options.selections.selectedDesignStyle 
          : null,
        selectedColorTheme: parsed.colorTheme 
          ? options.selections.selectedColorTheme 
          : null,
        selectedFunctionality: parsed.functionality 
          ? options.selections.selectedFunctionality 
          : [],
      };
    } catch {
      return options.selections;
    }
  }, [debouncedKey, options.selections]);

  // Use the smart suggestions hook with debounced selections
  return useSmartSuggestions({
    ...options,
    selections: debouncedSelections,
  });
};

export default useDebouncedSuggestions;
