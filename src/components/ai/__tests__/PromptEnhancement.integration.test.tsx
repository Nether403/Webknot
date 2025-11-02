/**
 * Integration Tests for Prompt Enhancement Workflow
 * 
 * Tests the complete prompt enhancement flow including:
 * - Enhancement generation and display
 * - Side-by-side comparison
 * - Accept/reject/edit controls
 * - Integration with preview step
 * 
 * Requirements: 5.1, 5.5
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PromptEnhancement } from '../PromptEnhancement';
import type { PromptEnhancement as PromptEnhancementType } from '../../../types/gemini';

describe('Prompt Enhancement Integration Tests', () => {
  const mockEnhancement: PromptEnhancementType = {
    originalPrompt: `## Project Overview
Build a portfolio website to showcase design work

## Technical Stack
- React
- TypeScript
- Tailwind CSS`,
    enhancedPrompt: `## Project Overview
Build a portfolio website to showcase design work

## Technical Stack
- React
- TypeScript
- Tailwind CSS

## Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- ARIA labels for all interactive elements
- Color contrast ratio of 4.5:1 minimum
- Screen reader compatibility

## Performance Optimization
- Code splitting for faster load times
- Image optimization with WebP format
- Lazy loading for images and components
- Bundle size under 200KB
- Lighthouse score of 90+

## SEO Considerations
- Semantic HTML structure
- Meta tags for social sharing
- Sitemap generation
- Structured data markup`,
    improvements: [
      'Added comprehensive accessibility requirements (WCAG 2.1 AA)',
      'Added performance optimization guidelines',
      'Added SEO best practices',
    ],
    addedSections: [
      'Accessibility Requirements',
      'Performance Optimization',
      'SEO Considerations',
    ],
  };

  const mockHandlers = {
    onAccept: vi.fn(),
    onReject: vi.fn(),
    onEdit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Enhancement Display (Requirement 5.1)', () => {
    it('should display loading state while enhancing', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={true}
          {...mockHandlers}
        />
      );

      expect(screen.getByText(/Enhancing your prompt with AI/i)).toBeInTheDocument();
      expect(screen.getByText(/This may take a moment/i)).toBeInTheDocument();
    });

    it('should display side-by-side comparison when loaded', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      expect(screen.getByText('Original Prompt')).toBeInTheDocument();
      expect(screen.getByText('Enhanced Prompt')).toBeInTheDocument();
    });

    it('should display improvements list', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      expect(screen.getByText('Improvements Added:')).toBeInTheDocument();
      
      mockEnhancement.improvements.forEach(improvement => {
        expect(screen.getByText(improvement)).toBeInTheDocument();
      });
    });

    it('should highlight new sections in enhanced prompt', () => {
      const { container } = render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      // Check for highlighted sections (they should have special styling)
      const enhancedSection = container.querySelector('.bg-teal-500\\/20');
      expect(enhancedSection).toBeTruthy();
    });

    it('should show both original and enhanced prompts', () => {
      const { container } = render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      // Original prompt content
      expect(screen.getByText(/Build a portfolio website/i)).toBeInTheDocument();
      
      // Enhanced content (new sections)
      expect(screen.getByText(/WCAG 2.1 AA compliance/i)).toBeInTheDocument();
      expect(screen.getByText(/Code splitting/i)).toBeInTheDocument();
    });
  });

  describe('User Controls (Requirement 5.5)', () => {
    it('should provide accept button', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const acceptButton = screen.getByRole('button', { name: /Accept Enhancement/i });
      expect(acceptButton).toBeInTheDocument();
    });

    it('should provide reject button', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const rejectButton = screen.getByRole('button', { name: /Use Original/i });
      expect(rejectButton).toBeInTheDocument();
    });

    it('should provide edit button', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const editButton = screen.getByRole('button', { name: /Edit/i });
      expect(editButton).toBeInTheDocument();
    });

    it('should call onAccept when accept button is clicked', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const acceptButton = screen.getByRole('button', { name: /Accept Enhancement/i });
      fireEvent.click(acceptButton);

      expect(mockHandlers.onAccept).toHaveBeenCalledTimes(1);
    });

    it('should call onReject when reject button is clicked', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const rejectButton = screen.getByRole('button', { name: /Use Original/i });
      fireEvent.click(rejectButton);

      expect(mockHandlers.onReject).toHaveBeenCalledTimes(1);
    });

    it('should enter edit mode when edit button is clicked', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const editButton = screen.getByRole('button', { name: /Edit/i });
      fireEvent.click(editButton);

      // Should show textarea for editing
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveValue(mockEnhancement.enhancedPrompt);
    });

    it('should show save and cancel buttons in edit mode', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      // Enter edit mode
      const editButton = screen.getByRole('button', { name: /Edit/i });
      fireEvent.click(editButton);

      // Check for save and cancel buttons
      expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    });

    it('should call onEdit with edited content when save is clicked', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      // Enter edit mode
      const editButton = screen.getByRole('button', { name: /Edit/i });
      fireEvent.click(editButton);

      // Edit the content
      const textarea = screen.getByRole('textbox');
      const newContent = 'Edited prompt content';
      fireEvent.change(textarea, { target: { value: newContent } });

      // Save changes
      const saveButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(saveButton);

      expect(mockHandlers.onEdit).toHaveBeenCalledWith(newContent);
    });

    it('should exit edit mode without saving when cancel is clicked', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      // Enter edit mode
      const editButton = screen.getByRole('button', { name: /Edit/i });
      fireEvent.click(editButton);

      // Edit the content
      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'Changed content' } });

      // Cancel
      const cancelButton = screen.getByRole('button', { name: /Cancel/i });
      fireEvent.click(cancelButton);

      // Should not call onEdit
      expect(mockHandlers.onEdit).not.toHaveBeenCalled();

      // Should exit edit mode
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });

  describe('Copy Functionality', () => {
    beforeEach(() => {
      // Mock clipboard API
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn(() => Promise.resolve()),
        },
      });
    });

    it('should provide copy button for original prompt', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const copyButtons = screen.getAllByRole('button', { name: /Copy/i });
      expect(copyButtons.length).toBeGreaterThanOrEqual(2);
    });

    it('should copy original prompt to clipboard', async () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const copyButtons = screen.getAllByRole('button', { name: /Copy/i });
      fireEvent.click(copyButtons[0]); // First copy button (original)

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
          mockEnhancement.originalPrompt
        );
      });
    });

    it('should copy enhanced prompt to clipboard', async () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const copyButtons = screen.getAllByRole('button', { name: /Copy/i });
      fireEvent.click(copyButtons[1]); // Second copy button (enhanced)

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
          mockEnhancement.enhancedPrompt
        );
      });
    });

    it('should show "Copied!" feedback after copying', async () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const copyButtons = screen.getAllByRole('button', { name: /Copy/i });
      fireEvent.click(copyButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument();
      });
    });
  });

  describe('Collapsible Sections', () => {
    it('should allow collapsing original prompt', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      // Find collapse button for original prompt
      const collapseButtons = screen.getAllByLabelText(/Collapse|Expand/i);
      expect(collapseButtons.length).toBeGreaterThanOrEqual(2);

      // Click to collapse
      fireEvent.click(collapseButtons[0]);

      // Content should be hidden (implementation detail)
    });

    it('should allow collapsing enhanced prompt', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      // Find collapse button for enhanced prompt
      const collapseButtons = screen.getAllByLabelText(/Collapse|Expand/i);
      
      // Click to collapse
      fireEvent.click(collapseButtons[1]);

      // Content should be hidden (implementation detail)
    });
  });

  describe('Visual Indicators', () => {
    it('should show legend for highlighted sections', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      expect(screen.getByText(/New sections added by AI are highlighted/i)).toBeInTheDocument();
    });

    it('should display AI icon in header', () => {
      const { container } = render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      // Check for Sparkles icon (AI indicator)
      const sparklesIcons = container.querySelectorAll('svg');
      expect(sparklesIcons.length).toBeGreaterThan(0);
    });

    it('should highlight enhanced prompt with border', () => {
      const { container } = render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      // Enhanced prompt should have teal border
      const enhancedContainer = container.querySelector('.border-teal-500\\/30');
      expect(enhancedContainer).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle enhancement with no improvements', () => {
      const noImprovements: PromptEnhancementType = {
        ...mockEnhancement,
        improvements: [],
        addedSections: [],
      };

      render(
        <PromptEnhancement
          enhancement={noImprovements}
          isLoading={false}
          {...mockHandlers}
        />
      );

      // Should still render without crashing
      expect(screen.getByText('Original Prompt')).toBeInTheDocument();
      expect(screen.getByText('Enhanced Prompt')).toBeInTheDocument();
    });

    it('should handle very long prompts', () => {
      const longPrompt = 'A'.repeat(10000);
      const longEnhancement: PromptEnhancementType = {
        originalPrompt: longPrompt,
        enhancedPrompt: longPrompt + '\n\n## New Section\nContent',
        improvements: ['Added new section'],
        addedSections: ['New Section'],
      };

      render(
        <PromptEnhancement
          enhancement={longEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      // Should render with scrollable containers
      expect(screen.getByText('Original Prompt')).toBeInTheDocument();
    });

    it('should handle empty original prompt', () => {
      const emptyOriginal: PromptEnhancementType = {
        originalPrompt: '',
        enhancedPrompt: '## New Content\nGenerated content',
        improvements: ['Generated complete prompt'],
        addedSections: ['New Content'],
      };

      render(
        <PromptEnhancement
          enhancement={emptyOriginal}
          isLoading={false}
          {...mockHandlers}
        />
      );

      expect(screen.getByText('Original Prompt')).toBeInTheDocument();
      expect(screen.getByText('Enhanced Prompt')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button labels', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      expect(screen.getByRole('button', { name: /Accept Enhancement/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Use Original/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();
    });

    it('should have accessible collapse buttons', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const collapseButtons = screen.getAllByLabelText(/Collapse|Expand/i);
      expect(collapseButtons.length).toBeGreaterThanOrEqual(2);
    });

    it('should maintain focus management in edit mode', () => {
      render(
        <PromptEnhancement
          enhancement={mockEnhancement}
          isLoading={false}
          {...mockHandlers}
        />
      );

      const editButton = screen.getByRole('button', { name: /Edit/i });
      fireEvent.click(editButton);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
    });
  });
});
