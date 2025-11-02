/**
 * Prompt Template System
 * 
 * Provides optimized prompt templates for different AI development tools.
 * Each template is designed to maximize the effectiveness of the target tool
 * by using its preferred format and structure.
 */

import { BoltBuilderState } from '../types';

/**
 * Prompt template definition
 */
export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  targetTool: 'bolt-new' | 'lovable-dev' | 'claude-artifacts' | 'generic';
  template: string;
  variables: string[];
  formatters?: Record<string, (value: any) => string>;
}

/**
 * Options for rendering a template
 */
export interface TemplateRenderOptions {
  template: PromptTemplate;
  data: Partial<BoltBuilderState>;
}

/**
 * Available prompt templates optimized for different AI tools
 */
export const promptTemplates: PromptTemplate[] = [
  {
    id: 'bolt-new',
    name: 'Bolt.new Optimized',
    description: 'Structured format optimized for Bolt.new\'s AI understanding with clear sections and technical details',
    targetTool: 'bolt-new',
    template: `Build a {{projectType}} called "{{projectName}}" with these specifications:

CORE REQUIREMENTS:
- Purpose: {{purpose}}
- Target Audience: {{targetAudience}}
- Key Goals: {{goals}}

DESIGN SYSTEM:
- Style: {{designStyle}}
- Colors: {{colorTheme}}
- Typography: {{typography}}
- Layout: {{layout}}

COMPONENTS & FEATURES:
{{#each components}}
- {{this.title}}: {{this.description}}
{{/each}}

FUNCTIONALITY:
{{#each functionality}}
- {{this.title}}: {{this.description}}
{{/each}}

TECHNICAL STACK:
- React + TypeScript
- Tailwind CSS
- {{dependencies}}

IMPLEMENTATION NOTES:
{{technicalRequirements}}

Please implement with attention to responsive design, accessibility (WCAG 2.1 AA), and performance optimization.`,
    variables: [
      'projectType',
      'projectName',
      'purpose',
      'targetAudience',
      'goals',
      'designStyle',
      'colorTheme',
      'typography',
      'layout',
      'components',
      'functionality',
      'dependencies',
      'technicalRequirements',
    ],
  },
  {
    id: 'lovable-dev',
    name: 'Lovable.dev Optimized',
    description: 'Conversational style optimized for Lovable.dev with natural language and clear intent',
    targetTool: 'lovable-dev',
    template: `I want to create {{projectName}}, a {{projectType}} for {{purpose}}.

The design should be {{designStyle}} with a {{colorTheme}} color scheme. I'm thinking of a {{layout}} layout that feels modern and professional.

For the visual style, use {{typography}} typography. The site should include these key components:
{{#each components}}
- {{this.title}}
{{/each}}

{{#if background}}
Add a {{background}} background effect to enhance the visual appeal.
{{/if}}

{{#if animations}}
Include these animations for better user experience:
{{#each animations}}
- {{this.title}}
{{/each}}
{{/if}}

Make it responsive, accessible, and performant. Use React, TypeScript, and Tailwind CSS.

{{#if functionality}}
The functionality should include:
{{#each functionality}}
- {{this.title}}
{{/each}}
{{/if}}`,
    variables: [
      'projectName',
      'projectType',
      'purpose',
      'designStyle',
      'colorTheme',
      'layout',
      'typography',
      'components',
      'background',
      'animations',
      'functionality',
    ],
  },
  {
    id: 'claude-artifacts',
    name: 'Claude Artifacts',
    description: 'Concise format optimized for Claude\'s artifact generation with focused requirements',
    targetTool: 'claude-artifacts',
    template: `Create a complete {{projectType}} with the following specifications:

**Project:** {{projectName}}
**Purpose:** {{purpose}}

**Design Requirements:**
- Style: {{designStyle}}
- Colors: {{colorTheme}}
- Layout: {{layout}}
- Typography: {{typography}}

**Components to Include:**
{{#each components}}
- {{this.title}}: {{this.description}}
{{/each}}

{{#if functionality}}
**Functionality:**
{{#each functionality}}
- {{this.title}}
{{/each}}
{{/if}}

**Technical Stack:**
- React with TypeScript
- Tailwind CSS for styling
- Modern, responsive design
- WCAG 2.1 AA accessibility

Please create a fully functional implementation with clean, well-documented code.`,
    variables: [
      'projectType',
      'projectName',
      'purpose',
      'designStyle',
      'colorTheme',
      'layout',
      'typography',
      'components',
      'functionality',
    ],
  },
  {
    id: 'generic',
    name: 'Generic Template',
    description: 'Versatile template that works well with most AI development tools',
    targetTool: 'generic',
    template: `Create a {{projectType}} called "{{projectName}}" with the following specifications:

## Overview
{{description}}

## Design
- Style: {{designStyle}}
- Colors: {{colorTheme}}
- Layout: {{layout}}
- Typography: {{typography}}

## Components
{{#each components}}
- {{this.title}}
{{/each}}

## Features
{{#each functionality}}
- {{this.title}}
{{/each}}

## Technical Requirements
- React + TypeScript
- Tailwind CSS
- Responsive design
- Accessibility compliant
- Modern best practices

Build this with attention to detail and user experience.`,
    variables: [
      'projectType',
      'projectName',
      'description',
      'designStyle',
      'colorTheme',
      'layout',
      'typography',
      'components',
      'functionality',
    ],
  },
];

/**
 * Renders a template with the provided data
 * 
 * @param options - Template and data to render
 * @returns Rendered template string
 */
export const renderTemplate = (options: TemplateRenderOptions): string => {
  const { template, data } = options;
  let rendered = template.template;

  // Simple variable replacement
  template.variables.forEach((variable) => {
    const value = getNestedValue(data, variable);
    if (value !== undefined && value !== null) {
      const formatted = template.formatters?.[variable]?.(value) ?? String(value);
      rendered = rendered.replace(new RegExp(`{{${variable}}}`, 'g'), formatted);
    } else {
      // Remove placeholder if no value
      rendered = rendered.replace(new RegExp(`{{${variable}}}`, 'g'), '');
    }
  });

  // Handle conditional blocks {{#if variable}}...{{/if}}
  const ifRegex = /{{#if (\w+)}}([\s\S]*?){{\/if}}/g;
  rendered = rendered.replace(ifRegex, (_match, varName, content) => {
    const value = getNestedValue(data, varName);
    // Show content if value exists and is not empty
    if (value && (Array.isArray(value) ? value.length > 0 : true)) {
      return content;
    }
    return '';
  });

  // Handle each loops {{#each array}}...{{/each}}
  const eachRegex = /{{#each (\w+)}}([\s\S]*?){{\/each}}/g;
  rendered = rendered.replace(eachRegex, (_match, arrayName, content) => {
    const array = getNestedValue(data, arrayName);
    if (Array.isArray(array) && array.length > 0) {
      return array
        .map((item) => {
          let itemContent = content;
          // Replace {{this.property}} with item values
          Object.keys(item).forEach((key) => {
            itemContent = itemContent.replace(
              new RegExp(`{{this\\.${key}}}`, 'g'),
              String(item[key] ?? '')
            );
          });
          return itemContent;
        })
        .join('');
    }
    return '';
  });

  // Clean up extra blank lines
  rendered = rendered.replace(/\n{3,}/g, '\n\n');

  return rendered.trim();
};

/**
 * Gets a nested value from an object using dot notation
 * 
 * @param obj - Object to get value from
 * @param path - Dot-separated path (e.g., 'user.name')
 * @returns Value at path or undefined
 */
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

/**
 * Gets the template for a specific tool
 * 
 * @param tool - Target tool identifier
 * @returns Template for the tool or undefined
 */
export const getTemplateForTool = (
  tool: string
): PromptTemplate | undefined => {
  return promptTemplates.find((t) => t.targetTool === tool);
};

/**
 * Gets the default template (generic)
 * 
 * @returns Generic template
 */
export const getDefaultTemplate = (): PromptTemplate => {
  const defaultTemplate = promptTemplates.find((t) => t.id === 'generic');
  if (!defaultTemplate) {
    throw new Error('Default template not found');
  }
  return defaultTemplate;
};
