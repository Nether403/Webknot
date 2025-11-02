/**
 * Cache Warming Utilities
 * 
 * Pre-caches common project descriptions and suggestions to reduce cold start latency
 * Improves user experience by having frequently requested data ready immediately
 */

import type { ProjectAnalysis } from '../types/gemini';

/**
 * Common project descriptions with pre-computed analysis results
 * These are the most frequently used project types and descriptions
 */
export const COMMON_PROJECT_ANALYSES: Array<{
  key: string;
  data: ProjectAnalysis;
}> = [
  // Portfolio projects
  {
    key: 'analysis:portfolio website to showcase my work',
    data: {
      projectType: 'Portfolio',
      designStyle: 'minimalist',
      colorTheme: 'monochrome-modern',
      reasoning: 'Portfolio sites benefit from clean, minimalist design that puts focus on the work itself',
      confidence: 0.9,
      suggestedComponents: ['carousel', 'accordion'],
      suggestedAnimations: ['fade-in'],
    },
  },
  {
    key: 'analysis:personal portfolio for design work',
    data: {
      projectType: 'Portfolio',
      designStyle: 'modern',
      colorTheme: 'ocean-breeze',
      reasoning: 'Design portfolios work well with modern aesthetics and calming color schemes',
      confidence: 0.88,
      suggestedComponents: ['carousel', 'tabs'],
      suggestedAnimations: ['slide-in'],
    },
  },
  {
    key: 'analysis:developer portfolio with projects',
    data: {
      projectType: 'Portfolio',
      designStyle: 'glassmorphism',
      colorTheme: 'tech-neon',
      reasoning: 'Developer portfolios can showcase technical skills with modern glassmorphism and tech-inspired colors',
      confidence: 0.87,
      suggestedComponents: ['tabs', 'accordion'],
      suggestedAnimations: ['blob-cursor'],
    },
  },
  
  // E-commerce projects
  {
    key: 'analysis:online store for selling products',
    data: {
      projectType: 'E-commerce',
      designStyle: 'modern',
      colorTheme: 'sunset-warmth',
      reasoning: 'E-commerce sites need modern, trustworthy design with warm, inviting colors',
      confidence: 0.92,
      suggestedComponents: ['carousel', 'tabs'],
      suggestedAnimations: ['fade-in'],
    },
  },
  {
    key: 'analysis:e-commerce website for fashion',
    data: {
      projectType: 'E-commerce',
      designStyle: 'minimalist',
      colorTheme: 'monochrome-modern',
      reasoning: 'Fashion e-commerce benefits from minimalist design that highlights products',
      confidence: 0.89,
      suggestedComponents: ['carousel'],
      suggestedAnimations: ['slide-in'],
    },
  },
  
  // Dashboard projects
  {
    key: 'analysis:admin dashboard for data visualization',
    data: {
      projectType: 'Dashboard',
      designStyle: 'material-design',
      colorTheme: 'tech-neon',
      reasoning: 'Dashboards need clear, organized layouts with Material Design principles',
      confidence: 0.91,
      suggestedComponents: ['tabs', 'accordion'],
      suggestedAnimations: [],
    },
  },
  {
    key: 'analysis:analytics dashboard',
    data: {
      projectType: 'Dashboard',
      designStyle: 'modern',
      colorTheme: 'ocean-breeze',
      reasoning: 'Analytics dashboards work well with modern design and calming colors for extended viewing',
      confidence: 0.88,
      suggestedComponents: ['tabs'],
      suggestedAnimations: [],
    },
  },
  
  // Web App projects
  {
    key: 'analysis:web application for productivity',
    data: {
      projectType: 'Web App',
      designStyle: 'modern',
      colorTheme: 'ocean-breeze',
      reasoning: 'Productivity apps need clean, distraction-free interfaces with calming colors',
      confidence: 0.9,
      suggestedComponents: ['tabs', 'accordion'],
      suggestedAnimations: ['fade-in'],
    },
  },
  {
    key: 'analysis:saas platform',
    data: {
      projectType: 'Web App',
      designStyle: 'glassmorphism',
      colorTheme: 'tech-neon',
      reasoning: 'SaaS platforms benefit from modern glassmorphism design that conveys innovation',
      confidence: 0.87,
      suggestedComponents: ['tabs'],
      suggestedAnimations: [],
    },
  },
  
  // Mobile App projects
  {
    key: 'analysis:mobile app for social networking',
    data: {
      projectType: 'Mobile App',
      designStyle: 'modern',
      colorTheme: 'purple-haze',
      reasoning: 'Social apps need engaging, modern design with vibrant colors',
      confidence: 0.89,
      suggestedComponents: ['carousel'],
      suggestedAnimations: ['slide-in'],
    },
  },
  
  // Website projects
  {
    key: 'analysis:company website',
    data: {
      projectType: 'Website',
      designStyle: 'modern',
      colorTheme: 'ocean-breeze',
      reasoning: 'Corporate websites need professional, modern design with trustworthy colors',
      confidence: 0.88,
      suggestedComponents: ['carousel', 'accordion'],
      suggestedAnimations: ['fade-in'],
    },
  },
  {
    key: 'analysis:landing page',
    data: {
      projectType: 'Website',
      designStyle: 'minimalist',
      colorTheme: 'sunset-warmth',
      reasoning: 'Landing pages work best with minimalist design and warm, inviting colors',
      confidence: 0.9,
      suggestedComponents: ['carousel'],
      suggestedAnimations: ['fade-in'],
    },
  },
  {
    key: 'analysis:blog website',
    data: {
      projectType: 'Website',
      designStyle: 'minimalist',
      colorTheme: 'monochrome-modern',
      reasoning: 'Blogs benefit from clean, readable minimalist design',
      confidence: 0.91,
      suggestedComponents: ['accordion'],
      suggestedAnimations: [],
    },
  },
];

/**
 * Returns the cache warming data for project analyses
 * This data is loaded on app initialization to reduce cold start latency
 * 
 * @returns Array of cache entries to pre-warm
 */
export function getProjectAnalysisWarmingData(): Array<{
  key: string;
  data: ProjectAnalysis;
}> {
  return COMMON_PROJECT_ANALYSES;
}

/**
 * Estimates the number of cache entries that should be warmed
 * Based on available cache space and priority
 * 
 * @param maxCacheSize - Maximum cache size
 * @param currentCacheSize - Current number of cached entries
 * @returns Number of entries to warm
 */
export function estimateWarmingSize(
  maxCacheSize: number,
  currentCacheSize: number
): number {
  // Reserve 70% of cache for runtime entries, use 30% for warming
  const warmingBudget = Math.floor(maxCacheSize * 0.3);
  const availableSpace = maxCacheSize - currentCacheSize;
  
  return Math.min(warmingBudget, availableSpace);
}
