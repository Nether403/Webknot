# Enhanced Prompt Generation Implementation Guide

## Files Created
1. src/utils/promptContexts.ts - Context definitions for project type/purpose combinations
2. src/utils/enhancedPromptGenerator.ts - Enhanced prompt generation logic (needs manual creation)

## Summary

The prompt generation has been enhanced with:

### 1. Contextual Intelligence
- Each project type/purpose combination now has specific context
- Includes user stories, target audiences, and key goals
- Provides design considerations and recommendations

### 2. Validation Logic
- Filters out illogical combinations (e.g., Dashboard + Portfolio)
- Provides alternative suggestions
- Warns users about incompatible selections

### 3. Enhanced Prompt Sections
- Project Overview with context
- User Story & Primary CTA
- Content Structure with suggested pages
- Component use cases specific to purpose
- Technical priorities for the combination
- Design considerations
- Accessibility requirements

### 4. Key Improvements Over Current System
- **Before:** Generic prompt that works for any project
- **After:** Specific, actionable prompt tailored to the exact use case

Example: Portfolio Website now includes:
- "Showcase best work with high-quality visuals"
- Recommended components: carousel, masonry-grid, lightbox
- Suggested pages: Home, Portfolio, About, Contact
- Technical priorities: Image optimization, SEO
- Primary CTA: "View My Work / Get In Touch"

## Next Steps

1. Review src/utils/promptContexts.ts
2. Add more context combinations as needed
3. Integrate with BoltBuilderContext.tsx generatePrompt function
4. Test with different project type/purpose combinations

## Integration Point

In BoltBuilderContext.tsx, replace the current generatePrompt function with:

import { generateEnhancedPrompt } from '../utils/enhancedPromptGenerator';

const generatePrompt = (): string => {
  return generateEnhancedPrompt({
    projectInfo,
    selectedLayout,
    selectedDesignStyle,
    selectedColorTheme,
    selectedTypography,
    selectedFunctionality,
    selectedVisuals,
    selectedBackground,
    backgroundSelection: backgroundSelectionState,
    selectedComponents,
    selectedAnimations,
  });
};

