/**
 * GeminiService Tests
 * 
 * Tests for the Gemini AI service initialization and core functionality
 */

import { describe, it, expect } from 'vitest';
import { GeminiService } from '../geminiService';
import type { GeminiConfig } from '../../types/gemini';

describe('GeminiService', () => {
  describe('Initialization', () => {
    it('should initialize with valid API key', () => {
      const config: GeminiConfig = {
        apiKey: 'AIzaSyC12345678901234567890123456789012', // 39 chars: AIza(4) + 35 chars
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      expect(() => new GeminiService(config)).not.toThrow();
    });
    
    it('should throw error with invalid API key format', () => {
      const config: GeminiConfig = {
        apiKey: 'invalid-key',
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      expect(() => new GeminiService(config)).toThrow('Invalid API key format');
    });
    
    it('should throw error with empty API key', () => {
      const config: GeminiConfig = {
        apiKey: '',
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      expect(() => new GeminiService(config)).toThrow('Invalid API key format');
    });
  });
  
  describe('Error Handling', () => {
    it('should create service instance for error handling tests', () => {
      const config: GeminiConfig = {
        apiKey: 'AIzaSyC12345678901234567890123456789012', // 39 chars: AIza(4) + 35 chars
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      const service = new GeminiService(config);
      expect(service).toBeDefined();
    });
  });
  
  describe('Phase 2: Design Suggestions', () => {
    it('should validate suggestions response structure', () => {
      const config: GeminiConfig = {
        apiKey: 'AIzaSyC12345678901234567890123456789012',
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      const service = new GeminiService(config);
      
      // Test that service can validate a proper suggestions response
      const validResponse = {
        suggestions: [
          {
            type: 'improvement',
            message: 'Consider using a lighter color scheme',
            reasoning: 'Dark themes can reduce readability',
            autoFixable: true,
            severity: 'medium',
          },
          {
            type: 'warning',
            message: 'Glassmorphism may not work well with dark backgrounds',
            reasoning: 'Transparency effects need contrast',
            autoFixable: false,
            severity: 'high',
          },
        ],
      };
      
      // Access private method through type assertion for testing
      const validateMethod = (service as any).validateSuggestionsResponse.bind(service);
      expect(() => validateMethod(validResponse)).not.toThrow();
    });
    
    it('should reject invalid suggestion types', () => {
      const config: GeminiConfig = {
        apiKey: 'AIzaSyC12345678901234567890123456789012',
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      const service = new GeminiService(config);
      
      const invalidResponse = {
        suggestions: [
          {
            type: 'invalid-type', // Invalid type
            message: 'Test message',
            reasoning: 'Test reasoning',
            autoFixable: true,
            severity: 'medium',
          },
        ],
      };
      
      const validateMethod = (service as any).validateSuggestionsResponse.bind(service);
      expect(() => validateMethod(invalidResponse)).toThrow('Invalid suggestion type');
    });
    
    it('should reject invalid severity levels', () => {
      const config: GeminiConfig = {
        apiKey: 'AIzaSyC12345678901234567890123456789012',
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      const service = new GeminiService(config);
      
      const invalidResponse = {
        suggestions: [
          {
            type: 'improvement',
            message: 'Test message',
            reasoning: 'Test reasoning',
            autoFixable: true,
            severity: 'critical', // Invalid severity
          },
        ],
      };
      
      const validateMethod = (service as any).validateSuggestionsResponse.bind(service);
      expect(() => validateMethod(invalidResponse)).toThrow('Invalid severity');
    });
    
    it('should reject missing required fields', () => {
      const config: GeminiConfig = {
        apiKey: 'AIzaSyC12345678901234567890123456789012',
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      const service = new GeminiService(config);
      
      const invalidResponse = {
        suggestions: [
          {
            type: 'improvement',
            // Missing message field
            reasoning: 'Test reasoning',
            autoFixable: true,
            severity: 'medium',
          },
        ],
      };
      
      const validateMethod = (service as any).validateSuggestionsResponse.bind(service);
      expect(() => validateMethod(invalidResponse)).toThrow('Missing or invalid message');
    });
    
    it('should build suggestions prompt with all state fields', () => {
      const config: GeminiConfig = {
        apiKey: 'AIzaSyC12345678901234567890123456789012',
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      const service = new GeminiService(config);
      
      const mockState = {
        projectInfo: { type: 'Portfolio' as const, name: 'Test', description: 'Test' },
        selectedDesignStyle: { id: 'minimalist', title: 'Minimalist', description: '' },
        selectedColorTheme: { id: 'ocean', title: 'Ocean Breeze', description: '' },
        selectedComponents: [{ id: 'carousel', title: 'Carousel', description: '' }],
        selectedBackground: { id: 'aurora', title: 'Aurora', description: '' },
        selectedAnimations: [{ id: 'fade', title: 'Fade In', description: '' }],
      } as any;
      
      const buildMethod = (service as any).buildSuggestionsPrompt.bind(service);
      const prompt = buildMethod(mockState);
      
      expect(prompt).toContain('Portfolio');
      expect(prompt).toContain('Minimalist');
      expect(prompt).toContain('Ocean Breeze');
      expect(prompt).toContain('Carousel');
      expect(prompt).toContain('Aurora');
      expect(prompt).toContain('Fade In');
    });
  });
  
  describe('Phase 2: Prompt Enhancement', () => {
    it('should parse enhancement response and extract sections', () => {
      const config: GeminiConfig = {
        apiKey: 'AIzaSyC12345678901234567890123456789012',
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      const service = new GeminiService(config);
      
      const originalPrompt = '## Project Overview\nBuild a portfolio site';
      const enhancedResponse = `## Project Overview
Build a portfolio site

## Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- ARIA labels for all interactive elements
- Color contrast ratio of 4.5:1 minimum

## Performance Optimization
- Code splitting for faster load times
- Image optimization with WebP format
- Bundle size under 200KB
- Lighthouse score of 90+`;
      
      const parseMethod = (service as any).parseEnhancementResponse.bind(service);
      const result = parseMethod(enhancedResponse, originalPrompt);
      
      expect(result.originalPrompt).toBe(originalPrompt);
      expect(result.enhancedPrompt).toBe(enhancedResponse);
      expect(result.addedSections).toContain('Accessibility Requirements');
      expect(result.addedSections).toContain('Performance Optimization');
      expect(result.improvements).toContain('Added comprehensive accessibility requirements (WCAG 2.1 AA)');
      expect(result.improvements).toContain('Added performance optimization guidelines');
    });
    
    it('should extract section headers correctly', () => {
      const config: GeminiConfig = {
        apiKey: 'AIzaSyC12345678901234567890123456789012',
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      const service = new GeminiService(config);
      
      const prompt = `## Section One
Content here

## Section Two
More content

## Section Three
Final content`;
      
      const extractMethod = (service as any).extractSections.bind(service);
      const sections = extractMethod(prompt);
      
      expect(sections).toHaveLength(3);
      expect(sections).toContain('Section One');
      expect(sections).toContain('Section Two');
      expect(sections).toContain('Section Three');
    });
    
    it('should build enhancement prompt with all required sections', () => {
      const config: GeminiConfig = {
        apiKey: 'AIzaSyC12345678901234567890123456789012',
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      const service = new GeminiService(config);
      
      const basicPrompt = 'Build a portfolio website';
      
      const buildMethod = (service as any).buildEnhancementPrompt.bind(service);
      const prompt = buildMethod(basicPrompt);
      
      expect(prompt).toContain('Accessibility');
      expect(prompt).toContain('Performance');
      expect(prompt).toContain('SEO');
      expect(prompt).toContain('Security');
      expect(prompt).toContain('Testing');
      expect(prompt).toContain('Code Quality');
      expect(prompt).toContain(basicPrompt);
    });
    
    it('should identify all improvement categories', () => {
      const config: GeminiConfig = {
        apiKey: 'AIzaSyC12345678901234567890123456789012',
        model: 'gemini-2.5-flash-exp',
        temperature: 0.7,
        maxOutputTokens: 1000,
        timeout: 2000,
      };
      
      const service = new GeminiService(config);
      
      const originalPrompt = '## Overview\nBasic prompt';
      const enhancedResponse = `## Overview
Basic prompt

## Accessibility
WCAG compliance

## Performance
Optimization

## SEO
Meta tags

## Security
Validation

## Testing
Unit tests

## Code Quality
TypeScript`;
      
      const parseMethod = (service as any).parseEnhancementResponse.bind(service);
      const result = parseMethod(enhancedResponse, originalPrompt);
      
      expect(result.improvements).toHaveLength(6);
      expect(result.improvements.some(i => i.includes('accessibility'))).toBe(true);
      expect(result.improvements.some(i => i.includes('performance'))).toBe(true);
      expect(result.improvements.some(i => i.includes('SEO'))).toBe(true);
      expect(result.improvements.some(i => i.includes('security'))).toBe(true);
      expect(result.improvements.some(i => i.includes('testing'))).toBe(true);
      expect(result.improvements.some(i => i.includes('code quality'))).toBe(true);
    });
  });
});
