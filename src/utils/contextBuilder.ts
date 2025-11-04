/**
 * Context Builder
 * 
 * Builds context-aware prompts for AI chat by including:
 * - Current wizard step
 * - User's selections
 * - Previous AI suggestions
 * - Optimized for token usage
 * 
 * Phase 3: Context-Aware Responses
 * Requirements: 6.2, 6.5
 */

import type { BoltBuilderState } from '../types';
import type { ConversationMessage } from '../types/gemini';

/**
 * Context information for AI chat
 */
export interface ChatContext {
  currentStep: string;
  projectInfo: string;
  selections: string;
  previousSuggestions: string;
  tokenCount: number;
}

/**
 * Builds a context summary for AI chat
 * Includes current wizard step and user selections
 * Optimized for token usage
 * 
 * @param state - Current wizard state
 * @param currentStep - Current wizard step name
 * @returns Context summary string
 */
export function buildContextSummary(
  state: BoltBuilderState,
  currentStep: string
): string {
  const parts: string[] = [];
  
  // Current step
  parts.push(`Step: ${currentStep}`);
  
  // Project info (if available)
  if (state.projectInfo.name) {
    parts.push(`Project: ${state.projectInfo.name} (${state.projectInfo.type})`);
  }
  
  if (state.projectInfo.description) {
    // Truncate long descriptions to save tokens
    const desc = state.projectInfo.description.length > 100
      ? state.projectInfo.description.substring(0, 100) + '...'
      : state.projectInfo.description;
    parts.push(`Description: ${desc}`);
  }
  
  // Design selections (compact format)
  const selections: string[] = [];
  
  if (state.selectedLayout) {
    selections.push(`Layout: ${state.selectedLayout.title}`);
  }
  
  if (state.selectedDesignStyle) {
    selections.push(`Style: ${state.selectedDesignStyle.title}`);
  }
  
  if (state.selectedColorTheme) {
    selections.push(`Colors: ${state.selectedColorTheme.title}`);
  }
  
  if (state.selectedTypography) {
    selections.push(`Font: ${state.selectedTypography.fontFamily}`);
  }
  
  // React-Bits selections
  if (state.selectedBackground) {
    selections.push(`Background: ${state.selectedBackground.title}`);
  }
  
  if (state.selectedComponents.length > 0) {
    const componentNames = state.selectedComponents.map(c => c.title).join(', ');
    selections.push(`Components: ${componentNames}`);
  }
  
  if (state.selectedAnimations.length > 0) {
    const animationNames = state.selectedAnimations.map(a => a.title).join(', ');
    selections.push(`Animations: ${animationNames}`);
  }
  
  if (selections.length > 0) {
    parts.push(selections.join(' | '));
  }
  
  return parts.join('\n');
}

/**
 * Builds a detailed context object for AI chat
 * Includes all relevant information with token counting
 * 
 * @param state - Current wizard state
 * @param currentStep - Current wizard step name
 * @param previousSuggestions - Previous AI suggestions (optional)
 * @returns Detailed context object
 */
export function buildDetailedContext(
  state: BoltBuilderState,
  currentStep: string,
  previousSuggestions?: string[]
): ChatContext {
  // Build project info section
  const projectInfoParts: string[] = [];
  
  if (state.projectInfo.name) {
    projectInfoParts.push(`Name: ${state.projectInfo.name}`);
  }
  
  if (state.projectInfo.type) {
    projectInfoParts.push(`Type: ${state.projectInfo.type}`);
  }
  
  if (state.projectInfo.purpose) {
    projectInfoParts.push(`Purpose: ${state.projectInfo.purpose}`);
  }
  
  if (state.projectInfo.description) {
    // Truncate to 150 characters to save tokens
    const desc = state.projectInfo.description.length > 150
      ? state.projectInfo.description.substring(0, 150) + '...'
      : state.projectInfo.description;
    projectInfoParts.push(`Description: ${desc}`);
  }
  
  const projectInfo = projectInfoParts.join('\n');
  
  // Build selections section
  const selectionsParts: string[] = [];
  
  if (state.selectedLayout) {
    selectionsParts.push(`Layout: ${state.selectedLayout.title}`);
  }
  
  if (state.selectedSpecialLayouts.length > 0) {
    const specialLayouts = state.selectedSpecialLayouts.map(l => l.title).join(', ');
    selectionsParts.push(`Special Layouts: ${specialLayouts}`);
  }
  
  if (state.selectedDesignStyle) {
    selectionsParts.push(`Design Style: ${state.selectedDesignStyle.title}`);
  }
  
  if (state.selectedColorTheme) {
    selectionsParts.push(`Color Theme: ${state.selectedColorTheme.title}`);
  }
  
  if (state.selectedTypography) {
    selectionsParts.push(
      `Typography: ${state.selectedTypography.fontFamily} ` +
      `(Heading: ${state.selectedTypography.headingWeight}, ` +
      `Body: ${state.selectedTypography.bodyWeight})`
    );
  }
  
  if (state.selectedFunctionality.length > 0) {
    const functionality = state.selectedFunctionality.map(f => f.title).join(', ');
    selectionsParts.push(`Functionality: ${functionality}`);
  }
  
  if (state.selectedVisuals.length > 0) {
    const visuals = state.selectedVisuals.map(v => v.type || v.id).join(', ');
    selectionsParts.push(`Visuals: ${visuals}`);
  }
  
  if (state.selectedBackground) {
    selectionsParts.push(`Background: ${state.selectedBackground.title}`);
  }
  
  if (state.selectedComponents.length > 0) {
    const components = state.selectedComponents.map(c => c.title).join(', ');
    selectionsParts.push(`Components: ${components}`);
  }
  
  if (state.selectedAnimations.length > 0) {
    const animations = state.selectedAnimations.map(a => a.title).join(', ');
    selectionsParts.push(`Animations: ${animations}`);
  }
  
  const selections = selectionsParts.join('\n');
  
  // Build previous suggestions section
  const suggestionsText = previousSuggestions && previousSuggestions.length > 0
    ? previousSuggestions.slice(-3).join('\n') // Last 3 suggestions only
    : 'None';
  
  // Estimate token count (rough: 1 token ≈ 4 characters)
  const totalText = `${currentStep}\n${projectInfo}\n${selections}\n${suggestionsText}`;
  const tokenCount = Math.ceil(totalText.length / 4);
  
  return {
    currentStep,
    projectInfo,
    selections,
    previousSuggestions: suggestionsText,
    tokenCount,
  };
}

/**
 * Formats context for inclusion in AI prompt
 * Optimized for token usage while maintaining clarity
 * 
 * @param context - The context object
 * @returns Formatted context string
 */
export function formatContextForPrompt(context: ChatContext): string {
  const parts: string[] = [];
  
  // Current step
  parts.push(`Current Step: ${context.currentStep}`);
  
  // Project info (if available)
  if (context.projectInfo && context.projectInfo !== '') {
    parts.push(`\nProject:\n${context.projectInfo}`);
  }
  
  // Selections (if available)
  if (context.selections && context.selections !== '') {
    parts.push(`\nSelections:\n${context.selections}`);
  }
  
  // Previous suggestions (if available)
  if (context.previousSuggestions && context.previousSuggestions !== 'None') {
    parts.push(`\nPrevious AI Suggestions:\n${context.previousSuggestions}`);
  }
  
  return parts.join('\n');
}

/**
 * Extracts previous AI suggestions from conversation history
 * Returns the last N suggestions to include in context
 * 
 * @param history - Conversation history
 * @param maxSuggestions - Maximum number of suggestions to extract (default: 3)
 * @returns Array of suggestion texts
 */
export function extractPreviousSuggestions(
  history: ConversationMessage[],
  maxSuggestions: number = 3
): string[] {
  const suggestions: string[] = [];
  
  // Look for assistant messages that contain suggestions
  const assistantMessages = history.filter(m => m.role === 'assistant');
  
  for (const message of assistantMessages.reverse()) {
    // Check if message contains suggestion keywords
    const content = message.content.toLowerCase();
    if (
      content.includes('suggest') ||
      content.includes('recommend') ||
      content.includes('consider') ||
      content.includes('try')
    ) {
      // Extract first sentence as suggestion
      const firstSentence = message.content.split('.')[0] + '.';
      suggestions.push(firstSentence);
      
      if (suggestions.length >= maxSuggestions) {
        break;
      }
    }
  }
  
  return suggestions.reverse(); // Return in chronological order
}

/**
 * Gets the current wizard step name from step identifier
 * Maps step IDs to human-readable names
 * 
 * @param stepId - The step identifier (e.g., "project-setup", "layout")
 * @returns Human-readable step name
 */
export function getStepName(stepId: string): string {
  const stepNames: Record<string, string> = {
    'project-setup': 'Project Setup',
    'layout': 'Layout Selection',
    'design-style': 'Design Style',
    'color-theme': 'Color Theme',
    'typography': 'Typography',
    'visuals': 'Visual Elements',
    'background': 'Background Effects',
    'components': 'UI Components',
    'functionality': 'Functionality',
    'animations': 'Animations',
    'preview': 'Preview & Generate',
  };
  
  return stepNames[stepId] || stepId;
}

/**
 * Optimizes context by removing redundant information
 * Reduces token usage while maintaining essential context
 * 
 * @param context - The context object
 * @param maxTokens - Maximum allowed tokens (default: 500)
 * @returns Optimized context object
 */
export function optimizeContext(
  context: ChatContext,
  maxTokens: number = 500
): ChatContext {
  if (context.tokenCount <= maxTokens) {
    return context;
  }
  
  // Start with essential information
  let optimized: ChatContext = {
    currentStep: context.currentStep,
    projectInfo: '',
    selections: '',
    previousSuggestions: '',
    tokenCount: 0,
  };
  
  // Add project info (truncated if needed)
  if (context.projectInfo) {
    const projectLines = context.projectInfo.split('\n');
    // Keep first 2 lines (name and type)
    optimized.projectInfo = projectLines.slice(0, 2).join('\n');
  }
  
  // Add most important selections
  if (context.selections) {
    const selectionLines = context.selections.split('\n');
    // Keep first 5 selections
    optimized.selections = selectionLines.slice(0, 5).join('\n');
  }
  
  // Skip previous suggestions if we're over budget
  // They're least critical for context
  
  // Recalculate token count
  const totalText = `${optimized.currentStep}\n${optimized.projectInfo}\n${optimized.selections}`;
  optimized.tokenCount = Math.ceil(totalText.length / 4);
  
  console.log('[ContextBuilder] Optimized context:', {
    originalTokens: context.tokenCount,
    optimizedTokens: optimized.tokenCount,
    reduction: context.tokenCount - optimized.tokenCount,
  });
  
  return optimized;
}

/**
 * Checks if context should be included based on message type
 * Some questions don't need full context (e.g., general questions)
 * 
 * @param message - The user's message
 * @returns True if context should be included
 */
export function shouldIncludeContext(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  // General questions that don't need project context
  const generalKeywords = [
    'what is',
    'how do i',
    'can you explain',
    'tell me about',
    'what are',
  ];
  
  // Check if message starts with general question
  for (const keyword of generalKeywords) {
    if (lowerMessage.startsWith(keyword)) {
      return false;
    }
  }
  
  // Project-specific keywords that need context
  const projectKeywords = [
    'my project',
    'my design',
    'my selection',
    'this project',
    'current',
    'chosen',
    'selected',
  ];
  
  // Check if message mentions project-specific terms
  for (const keyword of projectKeywords) {
    if (lowerMessage.includes(keyword)) {
      return true;
    }
  }
  
  // Default: include context for safety
  return true;
}
