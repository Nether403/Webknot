import { describe, expect, it } from 'vitest';
import { parseProjectDescription, safeParseProjectDescription } from '../../utils/nlpParser';

describe('NLP Parser', () => {
  it('detects portfolio project descriptions', () => {
    const result = parseProjectDescription(
      'Create a portfolio website to showcase my design work and projects'
    );

    expect(result.projectType).toBe('Portfolio');
    expect(result.confidence.projectType).toBeGreaterThan(0);
    expect(result.detectedKeywords).toContain('portfolio');
  });

  it('detects e-commerce intent', () => {
    const result = parseProjectDescription(
      'Build an online store with products, cart, checkout, and payment'
    );

    expect(result.projectType).toBe('E-commerce');
    expect(result.confidence.projectType).toBeGreaterThan(0.5);
  });

  it('returns an empty result when no keywords match', () => {
    const result = parseProjectDescription('Something intentionally vague');

    expect(result.projectType).toBeUndefined();
    expect(result.designStyle).toBeUndefined();
    expect(result.colorTheme).toBeUndefined();
    expect(result.detectedKeywords).toEqual([]);
  });

  it('safe parser handles invalid input gracefully', () => {
    const result = safeParseProjectDescription(null as unknown as string);

    expect(result.confidence).toEqual({});
    expect(result.detectedKeywords).toEqual([]);
  });
});
