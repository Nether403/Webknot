/**
 * Unit Tests for Smart Defaults System
 * 
 * Tests the smart defaults logic including:
 * - Correct defaults returned for each project type
 * - Existing selections are not overridden
 * - Confidence score calculation
 * - Reasoning message generation
 */

import { describe, it, expect } from 'vitest';
import {
  getSmartDefaults,
  applySmartDefaults,
  SMART_DEFAULTS,
} from '../../utils/smartDefaults';

describe('Smart Defaults System', () => {
  describe('getSmartDefaults', () => {
    it('should return correct defaults for Portfolio project type', () => {
      const result = getSmartDefaults('Portfolio', 'Showcase my work');

      expect(result.applied).toBe(true);
      expect(result.defaults.designStyle).toBe('minimalist');
      expect(result.defaults.colorTheme).toBe('monochrome-modern');
      expect(result.defaults.layout).toBe('single-column');
      expect(result.confidence).toBe(0.85);
      expect(result.reasoning).toContain('Portfolio');
      expect(result.reasoning).toContain('minimalist');
    });

    it('should return correct defaults for E-commerce project type', () => {
      const result = getSmartDefaults('E-commerce', 'Sell products online');

      expect(result.applied).toBe(true);
      expect(result.defaults.designStyle).toBe('material-design');
      expect(result.defaults.colorTheme).toBe('tech-neon');
      expect(result.defaults.layout).toBe('grid-layout');
      expect(result.defaults.functionality).toContain('advanced-package');
    });

    it('should return correct defaults for Dashboard project type', () => {
      const result = getSmartDefaults('Dashboard', 'Analytics dashboard');

      expect(result.applied).toBe(true);
      expect(result.defaults.designStyle).toBe('modern-corporate');
      expect(result.defaults.colorTheme).toBe('professional-blue');
      expect(result.defaults.layout).toBe('sidebar-layout');
      expect(result.defaults.background).toBe('subtle-grid');
    });

    it('should return correct defaults for Web App project type', () => {
      const result = getSmartDefaults('Web App', 'Interactive application');

      expect(result.applied).toBe(true);
      expect(result.defaults.designStyle).toBe('glassmorphism');
      expect(result.defaults.colorTheme).toBe('tech-neon');
      expect(result.defaults.layout).toBe('app-layout');
    });

    it('should return correct defaults for Mobile App project type', () => {
      const result = getSmartDefaults('Mobile App', 'Mobile application');

      expect(result.applied).toBe(true);
      expect(result.defaults.designStyle).toBe('minimalist');
      expect(result.defaults.colorTheme).toBe('vibrant-modern');
      expect(result.defaults.layout).toBe('mobile-first');
    });

    it('should return correct defaults for Website project type', () => {
      const result = getSmartDefaults('Website', 'Company website');

      expect(result.applied).toBe(true);
      expect(result.defaults.designStyle).toBe('modern-corporate');
      expect(result.defaults.colorTheme).toBe('professional-blue');
      expect(result.defaults.layout).toBe('single-column');
    });

    it('should return not applied for unknown project type', () => {
      const result = getSmartDefaults('Unknown Type', 'Some purpose');

      expect(result.applied).toBe(false);
      expect(result.defaults).toEqual({});
      expect(result.confidence).toBe(0);
      expect(result.reasoning).toContain('No smart defaults available');
    });

    it('should have confidence score of 0.85 for known project types', () => {
      const portfolioResult = getSmartDefaults('Portfolio', 'Test');
      const ecommerceResult = getSmartDefaults('E-commerce', 'Test');
      const dashboardResult = getSmartDefaults('Dashboard', 'Test');

      expect(portfolioResult.confidence).toBe(0.85);
      expect(ecommerceResult.confidence).toBe(0.85);
      expect(dashboardResult.confidence).toBe(0.85);
    });

    it('should generate reasoning that includes project type and design style', () => {
      const result = getSmartDefaults('Portfolio', 'Test');

      expect(result.reasoning).toContain('Portfolio');
      expect(result.reasoning).toContain('minimalist');
      expect(result.reasoning).toContain('monochrome-modern');
    });

    it('should include all expected properties in defaults', () => {
      const result = getSmartDefaults('Portfolio', 'Test');

      expect(result.defaults).toHaveProperty('layout');
      expect(result.defaults).toHaveProperty('designStyle');
      expect(result.defaults).toHaveProperty('colorTheme');
      expect(result.defaults).toHaveProperty('typography');
      expect(result.defaults).toHaveProperty('functionality');
      expect(result.defaults).toHaveProperty('background');
      expect(result.defaults).toHaveProperty('components');
      expect(result.defaults).toHaveProperty('animations');
    });
  });

  describe('applySmartDefaults', () => {
    it('should apply defaults to empty state', () => {
      const currentState = {
        selectedLayout: undefined,
        selectedDesignStyle: undefined,
        selectedColorTheme: undefined,
        selectedTypography: undefined,
        selectedFunctionality: [],
        selectedBackground: undefined,
        selectedComponents: [],
        selectedAnimations: [],
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.layout).toBe('single-column');
      expect(result.designStyle).toBe('minimalist');
      expect(result.colorTheme).toBe('monochrome-modern');
      expect(result.background).toBe('aurora');
    });

    it('should not override existing layout selection', () => {
      const currentState = {
        selectedLayout: 'grid-layout',
        selectedDesignStyle: undefined,
        selectedColorTheme: undefined,
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.layout).toBeUndefined(); // Should not override
      expect(result.designStyle).toBe('minimalist'); // Should apply
    });

    it('should not override existing design style selection', () => {
      const currentState = {
        selectedLayout: undefined,
        selectedDesignStyle: { id: 'glassmorphism', title: 'Glassmorphism' },
        selectedColorTheme: undefined,
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.layout).toBe('single-column'); // Should apply
      expect(result.designStyle).toBeUndefined(); // Should not override
    });

    it('should not override existing color theme selection', () => {
      const currentState = {
        selectedLayout: undefined,
        selectedDesignStyle: undefined,
        selectedColorTheme: { id: 'tech-neon', title: 'Tech Neon' },
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.layout).toBe('single-column'); // Should apply
      expect(result.colorTheme).toBeUndefined(); // Should not override
    });

    it('should not override existing typography selection', () => {
      const currentState = {
        selectedTypography: {
          fontFamily: 'Custom Font',
          headingWeight: 'Bold',
          bodyWeight: 'Regular',
        },
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.typography).toBeUndefined(); // Should not override
    });

    it('should not override existing functionality selection', () => {
      const currentState = {
        selectedFunctionality: [{ id: 'custom', title: 'Custom' }],
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.functionality).toBeUndefined(); // Should not override
    });

    it('should not override existing background selection', () => {
      const currentState = {
        selectedBackground: { id: 'gradient-mesh', title: 'Gradient Mesh' },
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.background).toBeUndefined(); // Should not override
    });

    it('should not override existing components selection', () => {
      const currentState = {
        selectedComponents: [{ id: 'custom', title: 'Custom Component' }],
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.components).toBeUndefined(); // Should not override
    });

    it('should not override existing animations selection', () => {
      const currentState = {
        selectedAnimations: [{ id: 'custom', title: 'Custom Animation' }],
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.animations).toBeUndefined(); // Should not override
    });

    it('should apply defaults only to unset fields in mixed state', () => {
      const currentState = {
        selectedLayout: 'grid-layout', // Already set
        selectedDesignStyle: undefined, // Not set
        selectedColorTheme: { id: 'tech-neon', title: 'Tech Neon' }, // Already set
        selectedTypography: undefined, // Not set
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.layout).toBeUndefined(); // Should not override
      expect(result.designStyle).toBe('minimalist'); // Should apply
      expect(result.colorTheme).toBeUndefined(); // Should not override
      expect(result.typography).toBeDefined(); // Should apply
    });

    it('should handle empty arrays as unset for functionality', () => {
      const currentState = {
        selectedFunctionality: [],
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.functionality).toEqual(['basic-package']);
    });

    it('should handle empty arrays as unset for components', () => {
      const currentState = {
        selectedComponents: [],
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.components).toBeDefined();
      expect(Array.isArray(result.components)).toBe(true);
    });

    it('should handle empty arrays as unset for animations', () => {
      const currentState = {
        selectedAnimations: [],
      };

      const result = applySmartDefaults('Portfolio', 'Test', currentState);

      expect(result.animations).toBeDefined();
      expect(Array.isArray(result.animations)).toBe(true);
    });
  });

  describe('SMART_DEFAULTS configuration', () => {
    it('should have defaults for all common project types', () => {
      expect(SMART_DEFAULTS).toHaveProperty('Portfolio');
      expect(SMART_DEFAULTS).toHaveProperty('E-commerce');
      expect(SMART_DEFAULTS).toHaveProperty('Dashboard');
      expect(SMART_DEFAULTS).toHaveProperty('Web App');
      expect(SMART_DEFAULTS).toHaveProperty('Mobile App');
      expect(SMART_DEFAULTS).toHaveProperty('Website');
    });

    it('should have complete configuration for each project type', () => {
      Object.entries(SMART_DEFAULTS).forEach(([projectType, config]) => {
        expect(config).toHaveProperty('layout');
        expect(config).toHaveProperty('designStyle');
        expect(config).toHaveProperty('colorTheme');
        expect(config).toHaveProperty('typography');
        expect(config).toHaveProperty('functionality');
        expect(config).toHaveProperty('background');
        expect(config).toHaveProperty('components');
        expect(config).toHaveProperty('animations');
      });
    });

    it('should have valid typography configuration', () => {
      Object.entries(SMART_DEFAULTS).forEach(([projectType, config]) => {
        expect(config.typography).toHaveProperty('fontFamily');
        expect(config.typography).toHaveProperty('headingWeight');
        expect(config.typography).toHaveProperty('bodyWeight');
        expect(config.typography).toHaveProperty('textAlignment');
        expect(config.typography).toHaveProperty('headingSize');
        expect(config.typography).toHaveProperty('bodySize');
        expect(config.typography).toHaveProperty('lineHeight');
      });
    });
  });
});
