import { useDebounce } from './useDebounce';
import { useNLPParser } from './useNLPParser';
import { NLPParseResult } from '../utils/nlpParser';

/**
 * Hook to parse project descriptions with debouncing (300ms)
 * Prevents excessive parsing while user is typing
 * 
 * @param description - The project description text to parse
 * @param delay - Debounce delay in milliseconds (default: 300ms)
 * @returns Debounced NLP parse result
 * 
 * @example
 * ```tsx
 * const parseResult = useDebouncedNLPParser(description, 300);
 * ```
 */
export const useDebouncedNLPParser = (
  description: string,
  delay: number = 300
): NLPParseResult => {
  // Debounce the description input
  const debouncedDescription = useDebounce(description, delay);

  // Parse the debounced description
  return useNLPParser(debouncedDescription);
};

export default useDebouncedNLPParser;
