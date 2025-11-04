/**
 * Question Router
 * 
 * Intelligently routes user questions to appropriate response strategies
 * Detects question type and provides context-specific responses
 * 
 * Phase 3: Context-Aware Responses
 * Requirements: 6.3
 */

import type { BoltBuilderState } from '../types';

/**
 * Question types for routing
 */
export enum QuestionType {
  DESIGN = 'design',           // Design choices, aesthetics, visual questions
  TECHNICAL = 'technical',     // Implementation, code, technical details
  GENERAL = 'general',         // General web development questions
  PROJECT_SPECIFIC = 'project', // Questions about user's specific project
  COMPARISON = 'comparison',   // Comparing options or alternatives
  RECOMMENDATION = 'recommendation', // Asking for suggestions
}

/**
 * Response strategy for each question type
 */
export interface ResponseStrategy {
  type: QuestionType;
  includeContext: boolean;
  includeCodeExamples: boolean;
  includeDocLinks: boolean;
  maxResponseLength: 'short' | 'medium' | 'long';
  tone: 'concise' | 'detailed' | 'friendly';
}

/**
 * Detects the type of question being asked
 * 
 * @param message - The user's message
 * @param state - Current wizard state (for context)
 * @returns Detected question type
 */
export function detectQuestionType(
  message: string,
  _state: BoltBuilderState
): QuestionType {
  const lowerMessage = message.toLowerCase();
  
  // Design questions
  const designKeywords = [
    'color', 'colors', 'theme', 'style', 'design', 'look', 'aesthetic',
    'visual', 'layout', 'typography', 'font', 'background', 'animation',
    'component', 'ui', 'ux', 'interface', 'appearance', 'beautiful',
    'modern', 'minimalist', 'glassmorphism',
  ];
  
  if (designKeywords.some(keyword => lowerMessage.includes(keyword))) {
    // Check if it's project-specific
    if (
      lowerMessage.includes('my') ||
      lowerMessage.includes('this') ||
      lowerMessage.includes('current') ||
      lowerMessage.includes('chosen') ||
      lowerMessage.includes('selected')
    ) {
      return QuestionType.PROJECT_SPECIFIC;
    }
    return QuestionType.DESIGN;
  }
  
  // Technical questions
  const technicalKeywords = [
    'code', 'implement', 'build', 'create', 'develop', 'install',
    'setup', 'configure', 'integrate', 'api', 'library', 'framework',
    'react', 'typescript', 'javascript', 'css', 'html', 'npm', 'package',
    'component', 'function', 'class', 'hook', 'state', 'props',
  ];
  
  if (technicalKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return QuestionType.TECHNICAL;
  }
  
  // Comparison questions
  const comparisonKeywords = [
    'vs', 'versus', 'or', 'better', 'difference', 'compare',
    'which', 'should i choose', 'what\'s the difference',
  ];
  
  if (comparisonKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return QuestionType.COMPARISON;
  }
  
  // Recommendation questions
  const recommendationKeywords = [
    'recommend', 'suggest', 'should i', 'what do you think',
    'advice', 'best', 'good choice', 'right choice', 'help me choose',
  ];
  
  if (recommendationKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return QuestionType.RECOMMENDATION;
  }
  
  // Project-specific questions
  const projectKeywords = [
    'my project', 'my design', 'my selection', 'this project',
    'what i chose', 'what i selected', 'my choices',
  ];
  
  if (projectKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return QuestionType.PROJECT_SPECIFIC;
  }
  
  // Default to general
  return QuestionType.GENERAL;
}

/**
 * Gets the response strategy for a question type
 * 
 * @param questionType - The detected question type
 * @returns Response strategy configuration
 */
export function getResponseStrategy(questionType: QuestionType): ResponseStrategy {
  const strategies: Record<QuestionType, ResponseStrategy> = {
    [QuestionType.DESIGN]: {
      type: QuestionType.DESIGN,
      includeContext: false,
      includeCodeExamples: false,
      includeDocLinks: true,
      maxResponseLength: 'medium',
      tone: 'friendly',
    },
    [QuestionType.TECHNICAL]: {
      type: QuestionType.TECHNICAL,
      includeContext: false,
      includeCodeExamples: true,
      includeDocLinks: true,
      maxResponseLength: 'long',
      tone: 'detailed',
    },
    [QuestionType.GENERAL]: {
      type: QuestionType.GENERAL,
      includeContext: false,
      includeCodeExamples: false,
      includeDocLinks: true,
      maxResponseLength: 'short',
      tone: 'concise',
    },
    [QuestionType.PROJECT_SPECIFIC]: {
      type: QuestionType.PROJECT_SPECIFIC,
      includeContext: true,
      includeCodeExamples: false,
      includeDocLinks: false,
      maxResponseLength: 'medium',
      tone: 'friendly',
    },
    [QuestionType.COMPARISON]: {
      type: QuestionType.COMPARISON,
      includeContext: true,
      includeCodeExamples: false,
      includeDocLinks: true,
      maxResponseLength: 'medium',
      tone: 'detailed',
    },
    [QuestionType.RECOMMENDATION]: {
      type: QuestionType.RECOMMENDATION,
      includeContext: true,
      includeCodeExamples: false,
      includeDocLinks: false,
      maxResponseLength: 'medium',
      tone: 'friendly',
    },
  };
  
  return strategies[questionType];
}

/**
 * Builds a prompt based on question type and strategy
 * 
 * @param message - The user's message
 * @param questionType - The detected question type
 * @param strategy - The response strategy
 * @param contextSummary - Optional context summary (if strategy includes context)
 * @returns Formatted prompt for AI
 */
export function buildRoutedPrompt(
  message: string,
  questionType: QuestionType,
  strategy: ResponseStrategy,
  contextSummary?: string
): string {
  const parts: string[] = [];
  
  // System instruction based on question type
  switch (questionType) {
    case QuestionType.DESIGN:
      parts.push('You are a web design expert. Answer design and aesthetic questions.');
      break;
    case QuestionType.TECHNICAL:
      parts.push('You are a web development expert. Provide technical guidance with code examples.');
      break;
    case QuestionType.GENERAL:
      parts.push('You are a helpful web development assistant. Provide concise, accurate answers.');
      break;
    case QuestionType.PROJECT_SPECIFIC:
      parts.push('You are a design consultant. Provide advice specific to the user\'s project.');
      break;
    case QuestionType.COMPARISON:
      parts.push('You are a design advisor. Compare options objectively with pros and cons.');
      break;
    case QuestionType.RECOMMENDATION:
      parts.push('You are a design consultant. Provide personalized recommendations.');
      break;
  }
  
  // Add context if strategy requires it
  if (strategy.includeContext && contextSummary) {
    parts.push(`\nUser's Project Context:\n${contextSummary}`);
  }
  
  // Add response guidelines
  const guidelines: string[] = [];
  
  if (strategy.includeCodeExamples) {
    guidelines.push('Include code examples when relevant');
  }
  
  if (strategy.includeDocLinks) {
    guidelines.push('Reference documentation when helpful');
  }
  
  switch (strategy.maxResponseLength) {
    case 'short':
      guidelines.push('Keep response to 1-2 sentences');
      break;
    case 'medium':
      guidelines.push('Keep response to 2-3 sentences');
      break;
    case 'long':
      guidelines.push('Provide detailed explanation (3-5 sentences)');
      break;
  }
  
  switch (strategy.tone) {
    case 'concise':
      guidelines.push('Be direct and to the point');
      break;
    case 'detailed':
      guidelines.push('Be thorough and explanatory');
      break;
    case 'friendly':
      guidelines.push('Be conversational and supportive');
      break;
  }
  
  if (guidelines.length > 0) {
    parts.push(`\nGuidelines:\n- ${guidelines.join('\n- ')}`);
  }
  
  // Add user question
  parts.push(`\nUser Question: ${message}`);
  
  // Add closing instruction
  parts.push('\nProvide a helpful response following the guidelines above.');
  
  return parts.join('\n');
}

/**
 * Gets relevant documentation links based on question content
 * 
 * @param message - The user's message
 * @param questionType - The detected question type
 * @returns Array of relevant documentation links
 */
export function getRelevantDocLinks(
  message: string,
  _questionType: QuestionType
): Array<{ title: string; url: string }> {
  const lowerMessage = message.toLowerCase();
  const links: Array<{ title: string; url: string }> = [];
  
  // React-Bits documentation
  if (
    lowerMessage.includes('react-bits') ||
    lowerMessage.includes('component') ||
    lowerMessage.includes('animation') ||
    lowerMessage.includes('background')
  ) {
    links.push({
      title: 'React-Bits Components',
      url: 'https://21st.dev',
    });
  }
  
  // Tailwind CSS documentation
  if (
    lowerMessage.includes('tailwind') ||
    lowerMessage.includes('css') ||
    lowerMessage.includes('styling') ||
    lowerMessage.includes('class')
  ) {
    links.push({
      title: 'Tailwind CSS Documentation',
      url: 'https://tailwindcss.com/docs',
    });
  }
  
  // React documentation
  if (
    lowerMessage.includes('react') ||
    lowerMessage.includes('hook') ||
    lowerMessage.includes('component') ||
    lowerMessage.includes('state')
  ) {
    links.push({
      title: 'React Documentation',
      url: 'https://react.dev',
    });
  }
  
  // TypeScript documentation
  if (
    lowerMessage.includes('typescript') ||
    lowerMessage.includes('type') ||
    lowerMessage.includes('interface')
  ) {
    links.push({
      title: 'TypeScript Documentation',
      url: 'https://www.typescriptlang.org/docs',
    });
  }
  
  // Accessibility documentation
  if (
    lowerMessage.includes('accessibility') ||
    lowerMessage.includes('a11y') ||
    lowerMessage.includes('wcag') ||
    lowerMessage.includes('aria')
  ) {
    links.push({
      title: 'WCAG Guidelines',
      url: 'https://www.w3.org/WAI/WCAG21/quickref',
    });
  }
  
  return links;
}

/**
 * Generates code examples based on question content
 * 
 * @param message - The user's message
 * @returns Code example string (if relevant)
 */
export function generateCodeExample(message: string): string | null {
  const lowerMessage = message.toLowerCase();
  
  // React component example
  if (
    lowerMessage.includes('component') &&
    (lowerMessage.includes('create') || lowerMessage.includes('build'))
  ) {
    return `\`\`\`tsx
import React from 'react';

export const MyComponent: React.FC = () => {
  return (
    <div className="p-6 glass-card rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Component Title</h2>
      <p className="text-gray-300">Component content</p>
    </div>
  );
};
\`\`\``;
  }
  
  // React-Bits installation
  if (
    lowerMessage.includes('install') &&
    (lowerMessage.includes('react-bits') || lowerMessage.includes('component'))
  ) {
    return `\`\`\`bash
npx shadcn@latest add https://21st.dev/r/component-name
\`\`\``;
  }
  
  // Tailwind styling example
  if (
    lowerMessage.includes('tailwind') &&
    (lowerMessage.includes('style') || lowerMessage.includes('class'))
  ) {
    return `\`\`\`tsx
<div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg">
  <h2 className="text-white text-xl font-bold">Styled Element</h2>
</div>
\`\`\``;
  }
  
  // useState hook example
  if (
    lowerMessage.includes('state') &&
    (lowerMessage.includes('hook') || lowerMessage.includes('usestate'))
  ) {
    return `\`\`\`tsx
import { useState } from 'react';

const [value, setValue] = useState<string>('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
\`\`\``;
  }
  
  return null;
}

/**
 * Formats the final response with code examples and doc links
 * 
 * @param response - The AI's response
 * @param strategy - The response strategy
 * @param message - The original user message
 * @returns Formatted response with enhancements
 */
export function formatResponse(
  response: string,
  strategy: ResponseStrategy,
  message: string
): string {
  const parts: string[] = [response];
  
  // Add code example if strategy includes it
  if (strategy.includeCodeExamples) {
    const codeExample = generateCodeExample(message);
    if (codeExample) {
      parts.push(`\n\n${codeExample}`);
    }
  }
  
  // Add documentation links if strategy includes them
  if (strategy.includeDocLinks) {
    const docLinks = getRelevantDocLinks(message, strategy.type);
    if (docLinks.length > 0) {
      parts.push('\n\n**Helpful Resources:**');
      docLinks.forEach(link => {
        parts.push(`- [${link.title}](${link.url})`);
      });
    }
  }
  
  return parts.join('\n');
}

/**
 * Routes a question and returns the complete prompt
 * Main entry point for question routing
 * 
 * @param message - The user's message
 * @param state - Current wizard state
 * @param contextSummary - Optional context summary
 * @returns Object with question type, strategy, and prompt
 */
export function routeQuestion(
  message: string,
  state: BoltBuilderState,
  contextSummary?: string
): {
  questionType: QuestionType;
  strategy: ResponseStrategy;
  prompt: string;
} {
  // Detect question type
  const questionType = detectQuestionType(message, state);
  
  // Get response strategy
  const strategy = getResponseStrategy(questionType);
  
  // Build routed prompt
  const prompt = buildRoutedPrompt(
    message,
    questionType,
    strategy,
    strategy.includeContext ? contextSummary : undefined
  );
  
  console.log('[QuestionRouter] Routed question:', {
    questionType,
    includeContext: strategy.includeContext,
    includeCodeExamples: strategy.includeCodeExamples,
    includeDocLinks: strategy.includeDocLinks,
    maxResponseLength: strategy.maxResponseLength,
    tone: strategy.tone,
  });
  
  return {
    questionType,
    strategy,
    prompt,
  };
}
