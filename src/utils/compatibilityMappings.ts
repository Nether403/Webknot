/**
 * Compatibility Mapping Functions
 * 
 * This module provides functions to suggest compatible options based on user selections.
 * Each function returns items that work well together based on design principles and
 * common patterns.
 * 
 * @module compatibilityMappings
 */

import {
  DesignStyle,
  ColorTheme,
  BackgroundOption,
  ComponentOption,
  AnimationOption,
} from '../types';
import { colorThemes } from '../data/wizardData';
import { backgroundOptions, componentOptions, animationOptions } from '../data/reactBitsData';

/**
 * Get compatible color themes for a given design style
 * 
 * Maps design styles to color themes that complement their aesthetic.
 * Based on design principles and common successful combinations.
 * 
 * @param designStyle - The selected design style
 * @returns Array of compatible color themes
 * 
 * @example
 * ```tsx
 * const themes = getCompatibleThemes(minimalistStyle);
 * // Returns: [monochrome-modern, professional-blue, subtle-earth]
 * ```
 */
export const getCompatibleThemes = (designStyle: DesignStyle): ColorTheme[] => {
  // Mapping of design styles to compatible color theme IDs
  const compatibility: Record<string, string[]> = {
    'minimalist': ['monochrome-modern', 'minimal-beige', 'pure-contrast', 'apple-graphite', 'ocean-breeze'],
    'glassmorphism': ['frosted-blue', 'aurora-glass', 'tech-neon', 'ocean-breeze', 'sunset-warmth'],
    'material-design': ['material-blue', 'material-red', 'ocean-breeze', 'forest-green', 'royal-purple'],
    'fluent-design': ['fluent-azure', 'fluent-orchid', 'ocean-breeze', 'monochrome-modern', 'tech-neon'],
    'apple-hig': ['apple-sky', 'apple-graphite', 'monochrome-modern', 'ocean-breeze', 'minimal-beige'],
    'neumorphism': ['soft-gray', 'cream-shadow', 'monochrome-modern', 'sunset-warmth', 'minimal-beige'],
    'digital-brutalism': ['brutal-contrast', 'cyber-yellow', 'tech-neon', 'royal-purple', 'neon-nights'],
    'organic-design': ['forest-green', 'earth-tones', 'botanical-sage', 'sunset-warmth', 'ocean-breeze'],
    'retro-futurism': ['retro-sunset', 'neon-nights', 'space-age', 'tech-neon', 'royal-purple'],
  };

  const compatibleIds = compatibility[designStyle.id] || [];
  return colorThemes.filter(theme => compatibleIds.includes(theme.id));
};

/**
 * Get advanced components suitable for complex functionality
 * 
 * Returns UI components that are typically needed for advanced features
 * like dashboards, data visualization, and complex interactions.
 * 
 * @returns Array of advanced component options
 * 
 * @example
 * ```tsx
 * const components = getAdvancedComponents();
 * // Returns components like data tables, charts, advanced forms
 * ```
 */
export const getAdvancedComponents = (): ComponentOption[] => {
  // Component IDs that are suitable for advanced functionality
  const advancedComponentIds = [
    'accordion',
    'tabs',
    'carousel',
    'command-menu',
    'context-menu',
    'dialog',
    'drawer',
    'dropdown-menu',
    'popover',
    'tooltip',
  ];

  return componentOptions.filter(comp =>
    advancedComponentIds.includes(comp.id)
  );
};

/**
 * Get compatible animations for a given design style
 * 
 * Maps design styles to animation types that match their aesthetic.
 * Minimalist styles get subtle animations, while bold styles get more dramatic effects.
 * 
 * @param designStyle - The selected design style
 * @returns Array of compatible animation options
 * 
 * @example
 * ```tsx
 * const animations = getCompatibleAnimations(minimalistStyle);
 * // Returns: [fade-in, slide-up, smooth-transitions]
 * ```
 */
export const getCompatibleAnimations = (designStyle: DesignStyle): AnimationOption[] => {
  // Mapping of design styles to compatible animation IDs
  const compatibility: Record<string, string[]> = {
    'minimalist': [
      'fade-in-text',
      'text-reveal',
      'word-fade-in',
      'blur-in',
      'fade-in',
    ],
    'glassmorphism': [
      'blur-in',
      'fade-in',
      'text-shimmer',
      'sparkles',
      'wavy-text',
    ],
    'modern-corporate': [
      'fade-in-text',
      'text-reveal',
      'word-fade-in',
      'blur-in',
      'fade-in',
    ],
    'digital-brutalism': [
      'text-shimmer',
      'sparkles',
      'wavy-text',
      'flip-text',
      'typing-animation',
    ],
    'material-design': [
      'fade-in',
      'blur-in',
      'text-reveal',
      'word-fade-in',
      'fade-in-text',
    ],
    'fluent-design': [
      'blur-in',
      'fade-in',
      'text-shimmer',
      'fade-in-text',
      'text-reveal',
    ],
    'apple-hig': [
      'fade-in',
      'blur-in',
      'text-reveal',
      'fade-in-text',
      'word-fade-in',
    ],
    'neumorphism': [
      'fade-in',
      'blur-in',
      'text-reveal',
      'fade-in-text',
      'word-fade-in',
    ],
    'organic-design': [
      'wavy-text',
      'fade-in',
      'blur-in',
      'sparkles',
      'text-shimmer',
    ],
    'retro-futurism': [
      'text-shimmer',
      'sparkles',
      'typing-animation',
      'flip-text',
      'wavy-text',
    ],
  };

  const compatibleIds = compatibility[designStyle.id] || [];
  return animationOptions.filter(anim => compatibleIds.includes(anim.id));
};

/**
 * Get compatible backgrounds for a given color theme
 * 
 * Maps color themes to background effects that complement their palette.
 * Considers color harmony, contrast, and visual balance.
 * 
 * @param colorTheme - The selected color theme
 * @returns Array of compatible background options
 * 
 * @example
 * ```tsx
 * const backgrounds = getCompatibleBackgrounds(techNeonTheme);
 * // Returns: [aurora, gradient-mesh, animated-gradient]
 * ```
 */
export const getCompatibleBackgrounds = (colorTheme: ColorTheme): BackgroundOption[] => {
  // Mapping of color themes to compatible background IDs
  const compatibility: Record<string, string[]> = {
    // Material Design themes
    'material-blue': ['dot-pattern', 'grid-pattern', 'animated-grid-pattern', 'waves', 'ripple', 'particles'],
    'material-red': ['dot-pattern', 'grid-pattern', 'animated-grid-pattern', 'particles', 'sparkles', 'beams'],
    
    // Fluent Design themes
    'fluent-azure': ['aurora', 'dot-pattern', 'grid-pattern', 'waves', 'ripple', 'beams'],
    'fluent-orchid': ['aurora', 'background-gradient', 'sparkles', 'particles', 'meteors', 'shooting-stars'],
    
    // Apple HIG themes
    'apple-sky': ['dot-pattern', 'grid-pattern', 'waves', 'ripple', 'particles', 'beams'],
    'apple-graphite': ['dot-pattern', 'grid-pattern', 'animated-grid-pattern', 'retro-grid', 'spotlight', 'beams'],
    
    // Minimalist themes
    'monochrome-modern': ['dot-pattern', 'grid-pattern', 'animated-grid-pattern', 'retro-grid', 'spotlight', 'beams'],
    'minimal-beige': ['dot-pattern', 'grid-pattern', 'particles', 'waves', 'ripple', 'spotlight'],
    'pure-contrast': ['dot-pattern', 'grid-pattern', 'animated-grid-pattern', 'retro-grid', 'beams', 'spotlight'],
    
    // Neumorphism themes
    'soft-gray': ['dot-pattern', 'grid-pattern', 'particles', 'waves', 'ripple', 'spotlight'],
    'cream-shadow': ['dot-pattern', 'grid-pattern', 'particles', 'waves', 'ripple', 'background-gradient'],
    
    // Glassmorphism themes
    'frosted-blue': ['aurora', 'dot-pattern', 'grid-pattern', 'waves', 'ripple', 'particles'],
    'aurora-glass': ['aurora', 'background-gradient', 'sparkles', 'particles', 'meteors', 'shooting-stars'],
    
    // Digital Brutalism themes
    'brutal-contrast': ['retro-grid', 'animated-grid-pattern', 'grid-pattern', 'dot-pattern', 'beams', 'spotlight'],
    'cyber-yellow': ['retro-grid', 'animated-grid-pattern', 'grid-pattern', 'meteors', 'shooting-stars', 'beams'],
    'tech-neon': ['aurora', 'animated-grid-pattern', 'grid-pattern', 'retro-grid', 'meteors', 'shooting-stars'],
    
    // Organic Design themes
    'forest-green': ['dot-pattern', 'grid-pattern', 'particles', 'waves', 'ripple', 'aurora'],
    'earth-tones': ['dot-pattern', 'grid-pattern', 'particles', 'waves', 'ripple', 'background-gradient'],
    'botanical-sage': ['dot-pattern', 'grid-pattern', 'particles', 'waves', 'ripple', 'aurora'],
    'ocean-breeze': ['aurora', 'dot-pattern', 'grid-pattern', 'ripple', 'waves', 'particles'],
    
    // Retro Futurism themes
    'retro-sunset': ['aurora', 'background-gradient', 'retro-grid', 'sparkles', 'meteors', 'shooting-stars'],
    'neon-nights': ['aurora', 'retro-grid', 'animated-grid-pattern', 'meteors', 'shooting-stars', 'beams'],
    'space-age': ['retro-grid', 'animated-grid-pattern', 'grid-pattern', 'meteors', 'shooting-stars', 'aurora'],
    
    // Universal favorites
    'sunset-warmth': ['aurora', 'background-gradient', 'animated-grid-pattern', 'particles', 'sparkles', 'shooting-stars'],
    'royal-purple': ['aurora', 'background-gradient', 'animated-grid-pattern', 'sparkles', 'meteors', 'shooting-stars'],
    'coral-reef': ['aurora', 'background-gradient', 'particles', 'waves', 'ripple', 'sparkles'],
    'midnight-blue': ['aurora', 'dot-pattern', 'grid-pattern', 'waves', 'ripple', 'beams'],
  };

  const compatibleIds = compatibility[colorTheme.id] || [];
  return backgroundOptions.filter(bg => compatibleIds.includes(bg.id));
};

/**
 * Get basic components suitable for simple functionality
 * 
 * Returns UI components that are commonly used in basic websites
 * and applications with standard features.
 * 
 * @returns Array of basic component options
 * 
 * @example
 * ```tsx
 * const components = getBasicComponents();
 * // Returns components like buttons, cards, badges
 * ```
 */
export const getBasicComponents = (): ComponentOption[] => {
  // Component IDs that are suitable for basic functionality
  const basicComponentIds = [
    'animated-subscribe-button',
    'border-beam',
    'shine-border',
    'cool-mode',
    'dock',
    'marquee',
  ];

  return componentOptions.filter(comp =>
    basicComponentIds.includes(comp.id)
  );
};

/**
 * Get all available components (for when no specific tier is selected)
 * 
 * @returns Array of all component options
 */
export const getAllComponents = (): ComponentOption[] => {
  return componentOptions;
};

/**
 * Safe wrapper for getCompatibleThemes that handles errors gracefully
 * 
 * @param designStyle - The selected design style
 * @returns Array of compatible color themes or empty array on error
 */
export const safeGetCompatibleThemes = (designStyle: DesignStyle): ColorTheme[] => {
  try {
    return getCompatibleThemes(designStyle);
  } catch (error) {
    console.error('Failed to get compatible themes:', error);
    return [];
  }
};

/**
 * Safe wrapper for getCompatibleAnimations that handles errors gracefully
 * 
 * @param designStyle - The selected design style
 * @returns Array of compatible animations or empty array on error
 */
export const safeGetCompatibleAnimations = (designStyle: DesignStyle): AnimationOption[] => {
  try {
    return getCompatibleAnimations(designStyle);
  } catch (error) {
    console.error('Failed to get compatible animations:', error);
    return [];
  }
};

/**
 * Safe wrapper for getCompatibleBackgrounds that handles errors gracefully
 * 
 * @param colorTheme - The selected color theme
 * @returns Array of compatible backgrounds or empty array on error
 */
export const safeGetCompatibleBackgrounds = (colorTheme: ColorTheme): BackgroundOption[] => {
  try {
    return getCompatibleBackgrounds(colorTheme);
  } catch (error) {
    console.error('Failed to get compatible backgrounds:', error);
    return [];
  }
};

/**
 * Safe wrapper for getAdvancedComponents that handles errors gracefully
 * 
 * @returns Array of advanced components or empty array on error
 */
export const safeGetAdvancedComponents = (): ComponentOption[] => {
  try {
    return getAdvancedComponents();
  } catch (error) {
    console.error('Failed to get advanced components:', error);
    return [];
  }
};

/**
 * Safe wrapper for getBasicComponents that handles errors gracefully
 * 
 * @returns Array of basic components or empty array on error
 */
export const safeGetBasicComponents = (): ComponentOption[] => {
  try {
    return getBasicComponents();
  } catch (error) {
    console.error('Failed to get basic components:', error);
    return [];
  }
};
