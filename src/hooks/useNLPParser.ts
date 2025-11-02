import { useMemo } from 'react';
import { NLPParseResult, parseProjectDescription } from '../utils/nlpParser';

/**
 * Hook to parse project descriptions with memoization
 * Automatically recalculates when description changes
 * 
 * @param description - The project description text to parse
 * @returns Memoized NLP parse result
 */
export const useNLPParser = (description: string): NLPParseResult => {
  // Memoize NLP parsing to avoid unnecessary recalculations
  const parseResult = useMemo(() => {
    if (!description || description.trim().length === 0) {
      return {
        confidence: {},
        detectedKeywords: [],
      };
    }

    return parseProjectDescription(description);
  }, [description]);

  return parseResult;
};

export default useNLPParser;
