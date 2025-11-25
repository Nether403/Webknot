/**
 * Enhanced Prompt Generator
 *
 * Generates context-aware, comprehensive prompts for AI-powered development
 * by combining user selections with intelligent project context.
 */

import type {
  ProjectInfo,
  LayoutOption,
  DesignStyle,
  ColorTheme,
  Typography,
  VisualElement,
  FunctionalityOption,
  BackgroundOption,
  ComponentOption,
  AnimationOption,
  BackgroundSelection,
} from '../types';
import type { ProjectContext } from './promptContexts';
import { getProjectContext, validateCombination } from './promptContexts';

export interface EnhancedPromptParams {
  projectInfo: ProjectInfo;
  selectedLayout: LayoutOption | null;
  selectedSpecialLayouts: LayoutOption[];
  selectedDesignStyle: DesignStyle | null;
  selectedColorTheme: ColorTheme | null;
  selectedTypography: Typography;
  selectedVisuals: VisualElement[];
  selectedBackground: BackgroundOption | null;
  backgroundSelection: BackgroundSelection | null;
  selectedComponents: ComponentOption[];
  selectedAnimations: AnimationOption[];
  selectedFunctionality: FunctionalityOption[];
}

/**
 * Generates an enhanced, context-aware prompt with specific guidance
 */
export function generateEnhancedPrompt(params: EnhancedPromptParams): string {
  const {
    projectInfo,
    selectedLayout,
    selectedSpecialLayouts,
    selectedDesignStyle,
    selectedColorTheme,
    selectedTypography,
    selectedVisuals,
    selectedBackground,
    backgroundSelection,
    selectedComponents,
    selectedAnimations,
    selectedFunctionality,
  } = params;

  // Validate required fields
  if (!projectInfo.name || !selectedLayout || !selectedDesignStyle || !selectedColorTheme) {
    return 'Please complete all required sections before generating a prompt.';
  }

  // Get project context
  const context = getProjectContext(projectInfo.type, projectInfo.purpose);

  // Validate combination
  const validation = validateCombination(projectInfo.type, projectInfo.purpose);
  if (!validation.isValid) {
    console.warn('[Enhanced Prompt] Invalid combination:', validation.reason);
  }

  // Build sections
  const projectOverviewSection = buildProjectOverviewSection(projectInfo, context);
  const userStorySection = buildUserStorySection(context);
  const layoutSection = buildLayoutSection(selectedLayout, selectedSpecialLayouts);
  const designSection = buildDesignSection(selectedDesignStyle, context);
  const colorSection = buildColorSection(selectedColorTheme);
  const typographySection = buildTypographySection(selectedTypography);
  const visualsSection = buildVisualsSection(selectedVisuals);
  const backgroundSection = buildBackgroundSection(selectedBackground, backgroundSelection);
  const componentsSection = buildComponentsSection(selectedComponents, context);
  const animationsSection = buildAnimationsSection(selectedAnimations);
  const functionalitySection = buildFunctionalitySection(selectedFunctionality);
  const contentStructureSection = buildContentStructureSection(context);
  const technicalSection = buildTechnicalSection(context);
  const installationSection = buildInstallationSection(
    selectedBackground,
    backgroundSelection,
    selectedComponents,
    selectedAnimations
  );
  const designRequirementsSection = buildDesignRequirementsSection(context);

  // Combine all sections
  return `Create a ${projectInfo.type.toLowerCase()} with the following specifications:

**Project Name:** "${projectInfo.name}"

${projectOverviewSection}
${userStorySection}
${layoutSection}
${designSection}
${colorSection}
${typographySection}
${visualsSection}
${backgroundSection}
${componentsSection}
${animationsSection}
${functionalitySection}
${contentStructureSection}
${technicalSection}
${installationSection}
${designRequirementsSection}

Please implement this design with pixel-perfect attention to detail, ensuring all elements work harmoniously together to create an exceptional user experience.`.trim();
}

function buildProjectOverviewSection(projectInfo: ProjectInfo, context: ProjectContext): string {
  return `## 1. Project Overview

**Context:** ${context.description}

- **Type:** ${projectInfo.type}
- **Purpose:** ${projectInfo.purpose}
- **Description:** ${projectInfo.description}
${projectInfo.targetAudience ? `- **Target Audience:** ${projectInfo.targetAudience}` : `- **Target Audience:** ${context.targetAudience}`}
${projectInfo.goals ? `- **Goals:** ${projectInfo.goals}` : ''}

**Key Objectives:**
${context.keyGoals.map((goal: string) => `- ${goal}`).join('\n')}`;
}

function buildUserStorySection(context: ProjectContext): string {
  return `## 2. User Story & Context

${context.userStory}

**Primary Call-to-Action:** ${context.primaryCTA}`;
}

function buildLayoutSection(
  selectedLayout: LayoutOption,
  selectedSpecialLayouts: LayoutOption[]
): string {
  return `## 3. Layout Structure
- **Primary Layout:** ${selectedLayout.title}
- **Layout Description:** ${selectedLayout.description}
${
  selectedSpecialLayouts.length > 0
    ? `
- **Additional Layout Features:**
  ${selectedSpecialLayouts.map((layout) => `• ${layout.title}`).join('\n  ')}`
    : ''
}`;
}

function buildDesignSection(selectedDesignStyle: DesignStyle, context: ProjectContext): string {
  return `## 4. Design Style
- **Primary Style:** ${selectedDesignStyle.title}
- **Style Description:** ${selectedDesignStyle.description}
- **Design Approach:** Modern ${selectedDesignStyle.title.toLowerCase()} with attention to user experience

**Design Considerations:**
${context.designConsiderations.map((consideration: string) => `- ${consideration}`).join('\n')}`;
}

function buildColorSection(selectedColorTheme: ColorTheme): string {
  return `## 5. Color Scheme
- **Theme:** ${selectedColorTheme.title}
- **Primary Colors:** ${selectedColorTheme.colors.join(', ')}
- **Color Distribution:** Primary (${selectedColorTheme.distribution[0]}%), Secondary (${selectedColorTheme.distribution[1]}%), Accent (${selectedColorTheme.distribution[2]}%)
- **Color Usage:** Use primary color for main elements, secondary for backgrounds, accent for highlights and CTAs`;
}

function buildTypographySection(selectedTypography: Typography): string {
  return `## 6. Typography
- **Font Family:** ${selectedTypography.fontFamily}
- **Heading Weight:** ${selectedTypography.headingWeight}
- **Body Text Weight:** ${selectedTypography.bodyWeight}
- **Text Alignment:** ${selectedTypography.textAlignment}
- **Heading Size:** ${selectedTypography.headingSize}
- **Body Size:** ${selectedTypography.bodySize}
- **Line Height:** ${selectedTypography.lineHeight}`;
}

function buildVisualsSection(selectedVisuals: VisualElement[]): string {
  const visualElements = selectedVisuals.map((visual) => `${visual.type}: ${visual.style}`);
  return `## 7. Visual Elements
${visualElements.length > 0 ? visualElements.map((element) => `- ${element}`).join('\n') : '- Standard visual elements'}`;
}

function buildBackgroundSection(
  selectedBackground: BackgroundOption | null,
  backgroundSelection: BackgroundSelection | null
): string {
  // Priority 1: Check backgroundSelection (comprehensive state)
  if (backgroundSelection?.type === 'react-bits' && backgroundSelection.reactBitsComponent) {
    const bg = backgroundSelection.reactBitsComponent;
    return `## 8. Background Effect
- **Selected Background:** ${bg.title}
- **Description:** ${bg.description}
- **Dependencies:** ${bg.dependencies.join(', ')}
- **Installation:** \`${bg.cliCommand}\`
`;
  }

  // Priority 2: Check other background types
  if (backgroundSelection?.type === 'solid' && backgroundSelection.solidColor) {
    return `## 8. Background Effect
- **Type:** Solid Color
- **Color:** ${backgroundSelection.solidColor}
`;
  }

  if (backgroundSelection?.type === 'gradient' && backgroundSelection.gradientColors) {
    return `## 8. Background Effect
- **Type:** Gradient
- **Colors:** ${backgroundSelection.gradientColors.join(' → ')}
- **Direction:** ${backgroundSelection.gradientDirection || 'to right'}
`;
  }

  if (backgroundSelection?.type === 'pattern' && backgroundSelection.pattern) {
    return `## 8. Background Effect
- **Type:** Pattern
- **Pattern:** ${backgroundSelection.pattern}
`;
  }

  // Fallback: Check legacy selectedBackground field
  if (selectedBackground) {
    return `## 8. Background Effect
- **Selected Background:** ${selectedBackground.title}
- **Description:** ${selectedBackground.description}
- **Dependencies:** ${selectedBackground.dependencies.join(', ')}
- **Installation:** \`${selectedBackground.cliCommand}\`
`;
  }

  // No background selected
  return `## 8. Background Effect
- **Selected Background:** None
`;
}

function buildComponentsSection(
  selectedComponents: ComponentOption[],
  context: ProjectContext
): string {
  if (selectedComponents.length === 0) {
    return `## 9. UI Components
- No additional UI components selected

**Recommended Components for ${context.description}:**
${context.recommendedComponents.map((comp: string) => `- ${comp}`).join('\n')}`;
  }

  return `## 9. UI Components
**Selected Components (${selectedComponents.length}):**

${selectedComponents
  .map(
    (comp) => `
### ${comp.title}
- **Description:** ${comp.description}
- **Use Case:** ${getComponentUseCase(comp.title, context)}
- **Dependencies:** ${comp.dependencies.join(', ')}
- **Installation:** \`${comp.cliCommand}\`
${
  comp.codeSnippet
    ? `- **Usage:**
\`\`\`tsx
${comp.codeSnippet}
\`\`\`
`
    : ''
}`
  )
  .join('\n')}`;
}

function getComponentUseCase(componentTitle: string, context: ProjectContext): string {
  const useCases: Record<string, string> = {
    Carousel: 'Display featured content, testimonials, or product showcases',
    Accordion: 'Organize FAQ sections or collapsible content areas',
    Tabs: 'Organize related content into switchable views',
    Modal: 'Display detailed information or forms without page navigation',
    'Data Table': 'Present structured data with sorting and filtering',
    'Form Builder': 'Create dynamic forms with validation',
  };

  return useCases[componentTitle] || `Enhance user experience for ${context.description}`;
}

function buildAnimationsSection(selectedAnimations: AnimationOption[]): string {
  if (selectedAnimations.length === 0) {
    return `## 10. UI/UX Animations
- Standard animations and transitions
`;
  }

  return `## 10. UI/UX Animations
**Selected Animations (${selectedAnimations.length}):**

${selectedAnimations
  .map(
    (anim) => `
### ${anim.title}
- **Description:** ${anim.description}
- **Dependencies:** ${anim.dependencies.join(', ')}
- **Installation:** \`${anim.cliCommand}\`
`
  )
  .join('\n')}`;
}

function buildFunctionalitySection(selectedFunctionality: FunctionalityOption[]): string {
  const functionalityTier = selectedFunctionality.find((item) => item.tier);
  const technicalFeatures = selectedFunctionality.filter((item) => !item.tier);

  return `## 11. Functionality & Features
${
  functionalityTier
    ? `
**Tier:** ${functionalityTier.title}
**Core Features:**
${functionalityTier.features.map((feature) => `   - ${feature}`).join('\n')}`
    : ''
}

${
  technicalFeatures.length > 0
    ? `
**Technical Requirements:**
${technicalFeatures.map((feature) => `   - ${feature.title}: ${feature.description}`).join('\n')}`
    : ''
}`;
}

function buildContentStructureSection(context: ProjectContext): string {
  return `## 12. Content Structure & Pages

**Suggested Page Structure:**
${context.suggestedPages.map((page: string, index: number) => `${index + 1}. ${page}`).join('\n')}

**Content Priorities:**
- Focus on ${context.primaryCTA}
- Emphasize ${context.keyGoals[0]}
- Ensure clear navigation between sections`;
}

function buildTechnicalSection(context: ProjectContext): string {
  return `## 13. Technical Implementation
- **Framework:** React with TypeScript
- **Styling:** Tailwind CSS with modern design patterns
- **Responsive Design:** Mobile-first approach with breakpoints for tablet and desktop
- **Accessibility:** WCAG 2.1 AA compliance
- **Performance:** Optimized loading and smooth interactions
- **SEO:** Semantic HTML structure and meta tags

**Technical Priorities:**
${context.technicalPriorities.map((priority: string) => `- ${priority}`).join('\n')}

**Accessibility Requirements:**
${context.accessibilityNotes.map((note: string) => `- ${note}`).join('\n')}`;
}

function buildInstallationSection(
  selectedBackground: BackgroundOption | null,
  backgroundSelection: BackgroundSelection | null,
  selectedComponents: ComponentOption[],
  selectedAnimations: AnimationOption[]
): string {
  // Calculate dependencies
  const backgroundDeps =
    backgroundSelection?.type === 'react-bits' && backgroundSelection.reactBitsComponent
      ? backgroundSelection.reactBitsComponent.dependencies
      : selectedBackground?.dependencies || [];

  const backgroundCliCommand =
    backgroundSelection?.type === 'react-bits' && backgroundSelection.reactBitsComponent
      ? backgroundSelection.reactBitsComponent.cliCommand
      : selectedBackground?.cliCommand;

  const allDependencies = [
    ...new Set([
      ...backgroundDeps,
      ...selectedComponents.flatMap((c) => c.dependencies),
      ...selectedAnimations.flatMap((a) => a.dependencies),
    ]),
  ];

  const allCliCommands = [
    backgroundCliCommand,
    ...selectedComponents.map((c) => c.cliCommand),
    ...selectedAnimations.map((a) => a.cliCommand),
  ].filter(Boolean);

  if (allCliCommands.length === 0) {
    return '';
  }

  return `

## 14. React-Bits Installation

**Step 1: Install Dependencies**
\`\`\`bash
npm install ${allDependencies.join(' ')}
\`\`\`

**Step 2: Install React-Bits Components**
\`\`\`bash
${allCliCommands.join('\n')}
\`\`\`

**Step 3: Import and Use**
Refer to the component-specific usage examples above for implementation details.
`;
}

function buildDesignRequirementsSection(context: ProjectContext): string {
  return `## 15. Design Requirements
- **Modern Aesthetics:** Clean, professional design with attention to detail
- **User Experience:** Intuitive navigation and clear information hierarchy
- **Interactive Elements:** Smooth hover states, loading states, and feedback
- **Cross-browser Compatibility:** Support for modern browsers
- **Mobile Optimization:** Touch-friendly interface and responsive layouts

**Project-Specific Design Guidance:**
${context.designConsiderations.map((consideration: string) => `- ${consideration}`).join('\n')}`;
}
