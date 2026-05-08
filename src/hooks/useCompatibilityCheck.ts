import { useMemo } from 'react';
import { useBoltBuilder } from '../contexts/BoltBuilderContext';
import { CompatibilityResult, safeCheckCompatibility } from '../utils/compatibilityChecker';

/**
 * Hook to check design compatibility in real-time
 * Automatically recalculates when selections change
 */
export const useCompatibilityCheck = (): CompatibilityResult => {
  const {
    selectedDesignStyle,
    selectedColorTheme,
    selectedComponents,
    selectedFunctionality,
    backgroundSelection,
    selectedAnimations,
  } = useBoltBuilder();

  // Memoize compatibility check to avoid unnecessary recalculations
  const compatibility = useMemo(() => {
    return safeCheckCompatibility({
      selectedDesignStyle,
      selectedColorTheme,
      selectedComponents,
      selectedFunctionality,
      backgroundSelection,
      selectedAnimations,
    });
  }, [
    selectedDesignStyle,
    selectedColorTheme,
    selectedComponents,
    selectedFunctionality,
    backgroundSelection,
    selectedAnimations,
  ]);

  return compatibility;
};

export default useCompatibilityCheck;
