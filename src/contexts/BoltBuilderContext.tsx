import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import {
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
import { useHistory } from './HistoryContext';
import {
  startWizardSession,
  updateWizardStep,
  completeWizardSession,
} from '../utils/metricsTracking';
import { toast } from '@/hooks/use-toast';

/**
 * State that can be tracked for undo/redo
 */
interface TrackableState {
  selectedLayout: LayoutOption | null;
  selectedSpecialLayouts: LayoutOption[];
  selectedDesignStyle: DesignStyle | null;
  selectedColorTheme: ColorTheme | null;
  selectedTypography: Typography;
  selectedFunctionality: FunctionalityOption[];
  selectedVisuals: VisualElement[];
  selectedBackground: BackgroundOption | null;
  backgroundSelection: BackgroundSelection | null;
  selectedComponents: ComponentOption[];
  selectedAnimations: AnimationOption[];
}

/**
 * Project data structure for save/load operations
 */
interface ProjectData {
  projectInfo?: ProjectInfo;
  selectedLayout?: LayoutOption;
  selectedSpecialLayouts?: LayoutOption[];
  selectedDesignStyle?: DesignStyle;
  selectedColorTheme?: ColorTheme;
  selectedTypography?: Typography;
  selectedFunctionality?: FunctionalityOption[];
  selectedVisuals?: VisualElement[];
  selectedBackground?: BackgroundOption;
  backgroundSelection?: BackgroundSelection;
  selectedComponents?: ComponentOption[];
  selectedAnimations?: AnimationOption[];
  currentStep?: string;
}

interface BoltBuilderContextType {
  // Steps
  currentStep: string;
  setCurrentStep: (step: string) => void;

  // Project Info
  projectInfo: ProjectInfo;
  setProjectInfo: (info: ProjectInfo) => void;

  // Layout
  selectedLayout: LayoutOption | null;
  setSelectedLayout: (layout: LayoutOption | null) => void;
  selectedSpecialLayouts: LayoutOption[];
  setSelectedSpecialLayouts: React.Dispatch<React.SetStateAction<LayoutOption[]>>;

  // Design Style
  selectedDesignStyle: DesignStyle | null;
  setSelectedDesignStyle: (style: DesignStyle | null) => void;

  // Color Theme
  selectedColorTheme: ColorTheme | null;
  setSelectedColorTheme: (theme: ColorTheme | null) => void;

  // Typography
  selectedTypography: Typography;
  setSelectedTypography: (typography: Typography) => void;

  // Functionality
  selectedFunctionality: FunctionalityOption[];
  setSelectedFunctionality: React.Dispatch<React.SetStateAction<FunctionalityOption[]>>;

  // Visuals
  selectedVisuals: VisualElement[];
  setSelectedVisuals: React.Dispatch<React.SetStateAction<VisualElement[]>>;

  // React-Bits: Background
  selectedBackground: BackgroundOption | null;
  setSelectedBackground: (background: BackgroundOption | null) => void;

  // Background Selection (new comprehensive type)
  backgroundSelection: BackgroundSelection | null;
  setBackgroundSelection: (selection: BackgroundSelection | null) => void;

  // React-Bits: Components
  selectedComponents: ComponentOption[];
  setSelectedComponents: React.Dispatch<React.SetStateAction<ComponentOption[]>>;

  // React-Bits: Animations
  selectedAnimations: AnimationOption[];
  setSelectedAnimations: React.Dispatch<React.SetStateAction<AnimationOption[]>>;

  // Progress
  progress: number;

  // Prompt Generation
  generatePrompt: () => string;
  generateBasicPrompt: () => string;
  promptText: string;
  setPromptText: (text: string) => void;
  promptType: 'basic' | 'detailed';
  setPromptType: (type: 'basic' | 'detailed') => void;

  // Project Management
  saveProject: () => void;
  loadProject: (projectData: ProjectData) => void;
  clearProject: () => void;

  // History Management (Undo/Redo)
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
}

const BoltBuilderContext = createContext<BoltBuilderContextType | undefined>(undefined);

const defaultTypography: Typography = {
  fontFamily: "'Inter', sans-serif",
  headingWeight: 'Semibold',
  bodyWeight: 'Regular',
  textAlignment: 'Left',
  headingSize: 'Large',
  bodySize: 'Medium',
  lineHeight: 'Normal',
};

export const BoltBuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Step management
  const [currentStep, setCurrentStep] = useState('project-setup');
  
  // Track if session has been started
  const sessionStartedRef = useRef(false);

  // Form state
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    name: '',
    description: '',
    type: 'Website',
    purpose: 'Portfolio',
    targetAudience: '',
    goals: '',
  });

  const [selectedLayout, setSelectedLayout] = useState<LayoutOption | null>(null);
  const [selectedSpecialLayouts, setSelectedSpecialLayouts] = useState<LayoutOption[]>([]);
  const [selectedDesignStyle, setSelectedDesignStyle] = useState<DesignStyle | null>(null);
  const [selectedColorTheme, setSelectedColorTheme] = useState<ColorTheme | null>(null);
  const [selectedTypography, setSelectedTypography] = useState<Typography>(defaultTypography);
  const [selectedFunctionality, setSelectedFunctionality] = useState<FunctionalityOption[]>([]);
  const [selectedVisuals, setSelectedVisuals] = useState<VisualElement[]>([]);

  // React-Bits state
  const [selectedBackground, setSelectedBackground] = useState<BackgroundOption | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<ComponentOption[]>([]);
  const [selectedAnimations, setSelectedAnimations] = useState<AnimationOption[]>([]);

  // Background selection state (new comprehensive type)
  const [backgroundSelectionState, setBackgroundSelectionState] = useState<BackgroundSelection | null>(null);

  // Wrapper for setBackgroundSelection with logging
  const setBackgroundSelection = React.useCallback((selection: BackgroundSelection | null) => {
    console.log('[Background Selection] State update:', {
      type: selection?.type,
      reactBitsComponent: selection?.reactBitsComponent?.title,
      solidColor: selection?.solidColor,
      gradientColors: selection?.gradientColors,
      gradientDirection: selection?.gradientDirection,
      pattern: selection?.pattern,
      timestamp: new Date().toISOString(),
    });
    setBackgroundSelectionState(selection);
  }, []);

  // Use the state value for reading
  const backgroundSelection = backgroundSelectionState;

  // Prompt state
  const [promptText, setPromptText] = useState('');
  const [promptType, setPromptType] = useState<'basic' | 'detailed'>('detailed');

  // History management for undo/redo
  const initialHistoryState: TrackableState = {
    selectedLayout: null,
    selectedSpecialLayouts: [],
    selectedDesignStyle: null,
    selectedColorTheme: null,
    selectedTypography: defaultTypography,
    selectedFunctionality: [],
    selectedVisuals: [],
    selectedBackground: null,
    backgroundSelection: null,
    selectedComponents: [],
    selectedAnimations: [],
  };

  const {
    state: historyState,
    canUndo,
    canRedo,
    undo: historyUndo,
    redo: historyRedo,
    pushState,
  } = useHistory<TrackableState>(initialHistoryState);

  // Track if we're restoring from history to prevent pushing duplicate states
  const isRestoringRef = useRef(false);

  // Calculate progress
  const progress = (() => {
    let completed = 0;
    const totalSteps = 10;

    if (projectInfo.name && projectInfo.description && projectInfo.purpose) completed++;
    if (selectedLayout) completed++;
    if (selectedDesignStyle) completed++;
    if (selectedColorTheme) completed++;
    if (selectedTypography.fontFamily) completed++;
    if (selectedVisuals.length > 0) completed++;
    if (selectedBackground) completed++;
    if (selectedComponents.length > 0) completed++;
    if (selectedFunctionality.length > 0) completed++;
    if (selectedAnimations.length > 0) completed++;

    return Math.round((completed / totalSteps) * 100);
  })();

  /**
   * Validation result interface
   */
  interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }

  /**
   * Validates that prompt generation data matches user selections
   * Logs warnings for any mismatches
   */
  const validatePromptData = (): ValidationResult => {
    const warnings: string[] = [];
    const errors: string[] = [];
    
    // Validate background selection
    if (backgroundSelectionState?.type === 'react-bits') {
      const reactBitsComponent = backgroundSelectionState.reactBitsComponent;
      const legacyBackground = selectedBackground;
      
      if (reactBitsComponent && legacyBackground) {
        if (reactBitsComponent.id !== legacyBackground.id) {
          errors.push(
            `Background mismatch: backgroundSelection has "${reactBitsComponent.title}" ` +
            `but selectedBackground has "${legacyBackground.title}"`
          );
        }
      } else if (reactBitsComponent && !legacyBackground) {
        warnings.push(
          `backgroundSelection has "${reactBitsComponent.title}" but selectedBackground is null. ` +
          `This may indicate a sync issue.`
        );
      }
    }
    
    // Validate component selections
    if (selectedComponents.length > 0) {
      const componentNames = selectedComponents.map(c => c.title).join(', ');
      console.log('[Validation] Components selected:', componentNames);
    }
    
    // Log results
    if (errors.length > 0) {
      console.error('[Validation] Errors found:', errors);
    }
    if (warnings.length > 0) {
      console.warn('[Validation] Warnings found:', warnings);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  };

  /**
   * Generates a comprehensive, detailed prompt for AI-powered development
   *
   * Creates a structured markdown document containing all project specifications including:
   * - Project overview and metadata
   * - Layout structure and design style
   * - Color scheme and typography
   * - Visual elements and backgrounds
   * - UI components and animations
   * - Functionality requirements
   * - Technical implementation details
   * - React-Bits installation instructions
   *
   * @returns A formatted markdown string containing the complete project specification,
   *          or an error message if required fields are incomplete
   *
   * @example
   * ```tsx
   * const { generatePrompt } = useBoltBuilder();
   * const prompt = generatePrompt();
   * console.log(prompt); // "Create a website with the following specifications..."
   * ```
   *
   * @remarks
   * This function requires the following fields to be completed:
   * - projectInfo.name
   * - selectedLayout
   * - selectedDesignStyle
   * - selectedColorTheme
   *
   * The generated prompt includes installation commands for all selected React-Bits
   * components (backgrounds, UI components, and animations) with their dependencies.
   */
  const generatePrompt = (): string => {
    const timestamp = new Date().toISOString();
    console.log(`[Prompt Gen] ${timestamp} - Starting prompt generation`);
    
    // Validate before generating
    const validation = validatePromptData();
    
    if (!validation.isValid) {
      console.error(`[Prompt Gen] ${timestamp} - Validation failed:`, validation.errors);
      // Log but continue - don't block prompt generation
    }
    
    if (validation.warnings.length > 0) {
      console.warn(`[Prompt Gen] ${timestamp} - Validation warnings:`, validation.warnings);
    }
    
    if (!projectInfo.name || !selectedLayout || !selectedDesignStyle || !selectedColorTheme) {
      console.error(`[Prompt Gen] ${timestamp} - Missing required fields:`, {
        hasProjectName: !!projectInfo.name,
        hasLayout: !!selectedLayout,
        hasDesignStyle: !!selectedDesignStyle,
        hasColorTheme: !!selectedColorTheme,
      });
      return 'Please complete all required sections before generating a prompt.';
    }
    
    console.log(`[Prompt Gen] ${timestamp} - Required fields validated successfully`);

    const functionalityTier = selectedFunctionality.find((item) => item.tier);
    const technicalFeatures = selectedFunctionality.filter((item) => !item.tier);

    const visualElements = selectedVisuals.map((visual) => {
      return `${visual.type}: ${visual.style}`;
    });

    // Background section (Section 7)
    // Priority 1: Check backgroundSelection (comprehensive state)
    const backgroundSection = (() => {
      const bgTimestamp = new Date().toISOString();
      console.log(`[Prompt Gen] ${bgTimestamp} - Processing background selection:`, {
        backgroundSelectionType: backgroundSelectionState?.type || 'none',
        hasReactBitsComponent: !!(backgroundSelectionState?.type === 'react-bits' && backgroundSelectionState.reactBitsComponent),
        hasSolidColor: !!(backgroundSelectionState?.type === 'solid' && backgroundSelectionState.solidColor),
        hasGradient: !!(backgroundSelectionState?.type === 'gradient' && backgroundSelectionState.gradientColors),
        hasPattern: !!(backgroundSelectionState?.type === 'pattern' && backgroundSelectionState.pattern),
        hasLegacyBackground: !!selectedBackground,
      });
      
      if (backgroundSelectionState?.type === 'react-bits' && backgroundSelectionState.reactBitsComponent) {
        const bg = backgroundSelectionState.reactBitsComponent;
        console.log(`[Prompt Gen] ${bgTimestamp} - Using React-Bits background from backgroundSelection:`, {
          title: bg.title,
          id: bg.id,
          dependencies: bg.dependencies,
          cliCommand: bg.cliCommand,
        });
        return `## 7. Background Effect
- **Selected Background:** ${bg.title}
- **Description:** ${bg.description}
- **Dependencies:** ${bg.dependencies.join(', ')}
- **Installation:** \`${bg.cliCommand}\`
`;
      }
      
      // Priority 2: Check other background types
      if (backgroundSelectionState?.type === 'solid' && backgroundSelectionState.solidColor) {
        console.log(`[Prompt Gen] ${bgTimestamp} - Using solid color background:`, {
          color: backgroundSelectionState.solidColor,
        });
        return `## 7. Background Effect
- **Type:** Solid Color
- **Color:** ${backgroundSelectionState.solidColor}
`;
      }
      
      if (backgroundSelectionState?.type === 'gradient' && backgroundSelectionState.gradientColors) {
        console.log(`[Prompt Gen] ${bgTimestamp} - Using gradient background:`, {
          colors: backgroundSelectionState.gradientColors,
          direction: backgroundSelectionState.gradientDirection || 'to right',
        });
        return `## 7. Background Effect
- **Type:** Gradient
- **Colors:** ${backgroundSelectionState.gradientColors.join(' → ')}
- **Direction:** ${backgroundSelectionState.gradientDirection || 'to right'}
`;
      }
      
      if (backgroundSelectionState?.type === 'pattern' && backgroundSelectionState.pattern) {
        console.log(`[Prompt Gen] ${bgTimestamp} - Using pattern background:`, {
          pattern: backgroundSelectionState.pattern,
        });
        return `## 7. Background Effect
- **Type:** Pattern
- **Pattern:** ${backgroundSelectionState.pattern}
`;
      }
      
      // Fallback: Check legacy selectedBackground field
      if (selectedBackground) {
        console.warn(`[Prompt Gen] ${bgTimestamp} - Using legacy selectedBackground field (should use backgroundSelection):`, {
          title: selectedBackground.title,
          id: selectedBackground.id,
          dependencies: selectedBackground.dependencies,
        });
        return `## 7. Background Effect
- **Selected Background:** ${selectedBackground.title}
- **Description:** ${selectedBackground.description}
- **Dependencies:** ${selectedBackground.dependencies.join(', ')}
- **Installation:** \`${selectedBackground.cliCommand}\`
`;
      }
      
      // No background selected
      console.log(`[Prompt Gen] ${bgTimestamp} - No background selected`);
      return `## 7. Background Effect
- **Selected Background:** None
`;
    })();

    // UI Components section (Section 8)
    const compTimestamp = new Date().toISOString();
    console.log(`[Prompt Gen] ${compTimestamp} - Processing UI components:`, {
      count: selectedComponents.length,
      components: selectedComponents.map(c => ({
        title: c.title,
        id: c.id,
        dependencies: c.dependencies,
      })),
    });
    
    const componentsSection =
      selectedComponents.length > 0
        ? `## 8. UI Components
**Selected Components (${selectedComponents.length}):**

${selectedComponents
  .map(
    (comp) => `
### ${comp.title}
- **Description:** ${comp.description}
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
  .join('\n')}
`
        : `## 8. UI Components
- No additional UI components selected
`;

    // UI/UX Animations section (Section 9)
    const animTimestamp = new Date().toISOString();
    console.log(`[Prompt Gen] ${animTimestamp} - Processing animations:`, {
      count: selectedAnimations.length,
      animations: selectedAnimations.map(a => ({
        title: a.title,
        id: a.id,
        dependencies: a.dependencies,
      })),
    });
    
    const animationsSection =
      selectedAnimations.length > 0
        ? `## 9. UI/UX Animations
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
  .join('\n')}
`
        : `## 9. UI/UX Animations
- Standard animations and transitions
`;

    // React-Bits Installation section (Section 12)
    // Calculate dependencies based on backgroundSelection (primary) or selectedBackground (fallback)
    const depsTimestamp = new Date().toISOString();
    const backgroundDeps = backgroundSelectionState?.type === 'react-bits' && backgroundSelectionState.reactBitsComponent
      ? backgroundSelectionState.reactBitsComponent.dependencies
      : (selectedBackground?.dependencies || []);
    
    const backgroundCliCommand = backgroundSelectionState?.type === 'react-bits' && backgroundSelectionState.reactBitsComponent
      ? backgroundSelectionState.reactBitsComponent.cliCommand
      : selectedBackground?.cliCommand;
    
    console.log(`[Prompt Gen] ${depsTimestamp} - Calculating dependencies:`, {
      backgroundDeps,
      backgroundCliCommand,
      componentDeps: selectedComponents.flatMap((c) => c.dependencies),
      animationDeps: selectedAnimations.flatMap((a) => a.dependencies),
    });
    
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
    
    console.log(`[Prompt Gen] ${depsTimestamp} - Dependency calculation results:`, {
      totalDependencies: allDependencies.length,
      dependencies: allDependencies,
      totalCliCommands: allCliCommands.length,
      cliCommands: allCliCommands,
    });

    const installationSection =
      allCliCommands.length > 0
        ? `

## 12. React-Bits Installation

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
`
        : '';

    const promptResult = `Create a ${projectInfo.type.toLowerCase()} with the following specifications:

**Project Name:** "${projectInfo.name}"

## 1. Project Overview
- **Type:** ${projectInfo.type}
- **Purpose:** ${projectInfo.purpose}
- **Description:** ${projectInfo.description}
${projectInfo.targetAudience ? `- **Target Audience:** ${projectInfo.targetAudience}` : ''}
${projectInfo.goals ? `- **Goals:** ${projectInfo.goals}` : ''}

## 2. Layout Structure
- **Primary Layout:** ${selectedLayout.title}
- **Layout Description:** ${selectedLayout.description}
${
  selectedSpecialLayouts.length > 0
    ? `
- **Additional Layout Features:**
  ${selectedSpecialLayouts.map((layout) => `• ${layout.title}`).join('\n  ')}`
    : ''
}

## 3. Design Style
- **Primary Style:** ${selectedDesignStyle.title}
- **Style Description:** ${selectedDesignStyle.description}
- **Design Approach:** Modern ${selectedDesignStyle.title.toLowerCase()} with attention to user experience

## 4. Color Scheme
- **Theme:** ${selectedColorTheme.title}
- **Primary Colors:** ${selectedColorTheme.colors.join(', ')}
- **Color Distribution:** Primary (${selectedColorTheme.distribution[0]}%), Secondary (${selectedColorTheme.distribution[1]}%), Accent (${selectedColorTheme.distribution[2]}%)
- **Color Usage:** Use primary color for main elements, secondary for backgrounds, accent for highlights and CTAs

## 5. Typography
- **Font Family:** ${selectedTypography.fontFamily}
- **Heading Weight:** ${selectedTypography.headingWeight}
- **Body Text Weight:** ${selectedTypography.bodyWeight}
- **Text Alignment:** ${selectedTypography.textAlignment}
- **Heading Size:** ${selectedTypography.headingSize}
- **Body Size:** ${selectedTypography.bodySize}
- **Line Height:** ${selectedTypography.lineHeight}

## 6. Visual Elements
${visualElements.length > 0 ? visualElements.map((element) => `- ${element}`).join('\n') : '- Standard visual elements'}

${backgroundSection}
${componentsSection}
${animationsSection}

## 10. Functionality & Features
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
}

## 11. Technical Implementation
- **Framework:** React with TypeScript
- **Styling:** Tailwind CSS with modern design patterns
- **Responsive Design:** Mobile-first approach with breakpoints for tablet and desktop
- **Accessibility:** WCAG 2.1 AA compliance
- **Performance:** Optimized loading and smooth interactions
- **SEO:** Semantic HTML structure and meta tags
${installationSection}

## 13. Design Requirements
- **Modern Aesthetics:** Clean, professional design with attention to detail
- **User Experience:** Intuitive navigation and clear information hierarchy
- **Interactive Elements:** Smooth hover states, loading states, and feedback
- **Cross-browser Compatibility:** Support for modern browsers
- **Mobile Optimization:** Touch-friendly interface and responsive layouts

Please implement this design with pixel-perfect attention to detail, ensuring all elements work harmoniously together to create an exceptional user experience.`;
    
    const result = promptResult.trim();
    const endTimestamp = new Date().toISOString();
    console.log(`[Prompt Gen] ${endTimestamp} - Prompt generation completed successfully`, {
      promptLength: result.length,
      sections: {
        hasBackground: backgroundSection.includes('Selected Background'),
        hasComponents: selectedComponents.length > 0,
        hasAnimations: selectedAnimations.length > 0,
        hasInstallation: installationSection.length > 0,
      },
    });
    
    return result;
  };

  /**
   * Generates a concise, simplified prompt for AI-powered development
   *
   * Creates a brief paragraph-style prompt that summarizes the key project specifications
   * in natural language. This format is ideal for quick prototyping or when a shorter
   * prompt is preferred.
   *
   * @returns A concise string containing the essential project specifications,
   *          or an error message if required fields are incomplete
   *
   * @example
   * ```tsx
   * const { generateBasicPrompt } = useBoltBuilder();
   * const prompt = generateBasicPrompt();
   * console.log(prompt); // "Create a website called 'My Portfolio' for portfolio purposes..."
   * ```
   *
   * @remarks
   * This function requires the same minimum fields as generatePrompt():
   * - projectInfo.name
   * - selectedLayout
   * - selectedDesignStyle
   * - selectedColorTheme
   *
   * The basic prompt includes a summary of React-Bits components but omits detailed
   * installation instructions and technical specifications.
   */
  const generateBasicPrompt = (): string => {
    if (!projectInfo.name || !selectedLayout || !selectedDesignStyle || !selectedColorTheme) {
      return 'Please complete all required sections before generating a prompt.';
    }

    const functionalityTier = selectedFunctionality.find((item) => item.tier);

    // Build react-bits summary
    const reactBitsSummary = [];
    if (selectedBackground) {
      reactBitsSummary.push(`${selectedBackground.title} background`);
    }
    if (selectedComponents.length > 0) {
      reactBitsSummary.push(
        `${selectedComponents.length} UI component${selectedComponents.length > 1 ? 's' : ''} (${selectedComponents.map((c) => c.title).join(', ')})`
      );
    }
    if (selectedAnimations.length > 0) {
      reactBitsSummary.push(
        `${selectedAnimations.length} animation${selectedAnimations.length > 1 ? 's' : ''} (${selectedAnimations.map((a) => a.title).join(', ')})`
      );
    }

    return `Create a ${projectInfo.type.toLowerCase()} called "${projectInfo.name}" for ${projectInfo.purpose.toLowerCase()} purposes. ${projectInfo.description}

Use a ${selectedLayout.title.toLowerCase()} layout with a ${selectedDesignStyle.title.toLowerCase()} design style. The color scheme should follow the ${selectedColorTheme.title.toLowerCase()} theme, using ${selectedColorTheme.colors.join(', ')} as the main colors.

For typography, use ${selectedTypography.fontFamily} with ${selectedTypography.headingWeight.toLowerCase()} headings and ${selectedTypography.bodyWeight.toLowerCase()} body text. Visual elements should include ${selectedVisuals.map((visual) => `${visual.type} in ${visual.style} style`).join(', ')}.

${reactBitsSummary.length > 0 ? `Include react-bits components: ${reactBitsSummary.join(', ')}.` : ''}

Include ${functionalityTier ? functionalityTier.title.toLowerCase() : 'basic'} functionality features. Build using React, TypeScript, and Tailwind CSS with modern responsive design.`.trim();
  };

  /**
   * Saves the current project state to browser localStorage
   *
   * Persists all wizard selections and project information to localStorage under the
   * key 'webknot-project'. This enables users to resume their work after closing
   * the browser or refreshing the page.
   *
   * @remarks
   * - Automatically called with 1-second debouncing when state changes (see auto-save effect)
   * - Includes a timestamp (savedAt) for tracking when the project was last saved
   * - Handles localStorage errors gracefully (quota exceeded, unavailable, etc.)
   * - Logs detailed error information to console for debugging
   *
   * @example
   * ```tsx
   * const { saveProject } = useBoltBuilder();
   * saveProject(); // Manually trigger save
   * ```
   *
   * @throws Does not throw - errors are caught and logged to console
   */
  const saveProject = React.useCallback(() => {
    const projectData = {
      projectInfo,
      selectedLayout,
      selectedSpecialLayouts,
      selectedDesignStyle,
      selectedColorTheme,
      selectedTypography,
      selectedFunctionality,
      selectedVisuals,
      selectedBackground,
      backgroundSelection: backgroundSelectionState,
      selectedComponents,
      selectedAnimations,
      currentStep,
      savedAt: new Date().toISOString(),
    };

    try {
      const serialized = JSON.stringify(projectData);
      localStorage.setItem('webknot-project', serialized);
      console.log('[LocalStorage] Project saved successfully:', {
        size: serialized.length,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('[LocalStorage] Save failed:', error);
      
      if (error instanceof DOMException) {
        if (error.name === 'QuotaExceededError') {
          const serialized = JSON.stringify(projectData);
          console.error('[LocalStorage] Quota exceeded. Project size:', serialized.length, 'bytes');
          
          // Show user notification for quota exceeded
          toast({
            variant: 'destructive',
            title: 'Storage Full',
            description: 'Unable to save project. Your browser storage is full. Please clear some browser data or use a different browser.',
            duration: 10000,
          });
        } else {
          // Other DOMException errors
          console.error('[LocalStorage] DOMException:', {
            name: error.name,
            message: error.message,
          });
          
          toast({
            variant: 'destructive',
            title: 'Save Failed',
            description: 'Unable to save project to browser storage. Your work will be preserved in memory during this session.',
            duration: 10000,
          });
        }
      } else if (error instanceof Error) {
        console.error('[LocalStorage] Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
        
        toast({
          variant: 'destructive',
          title: 'Save Failed',
          description: 'An unexpected error occurred while saving. Your work will be preserved in memory during this session.',
          duration: 10000,
        });
      }
      
      // Check if localStorage is available
      if (typeof localStorage === 'undefined') {
        console.error('[LocalStorage] localStorage is not available in this environment');
      }
      
      // Continue with in-memory state only
      console.log('[LocalStorage] Continuing with in-memory state only');
    }
  }, [
    projectInfo,
    selectedLayout,
    selectedSpecialLayouts,
    selectedDesignStyle,
    selectedColorTheme,
    selectedTypography,
    selectedFunctionality,
    selectedVisuals,
    selectedBackground,
    backgroundSelectionState,
    selectedComponents,
    selectedAnimations,
    currentStep,
  ]);

  /**
   * Loads project data from a saved state into the application
   *
   * Restores all wizard selections and project information from a previously saved
   * project. This function is typically called on application mount to restore the
   * user's last session.
   *
   * @param projectData - Partial project data object containing any combination of:
   *   - projectInfo: Basic project information (name, description, type, etc.)
   *   - selectedLayout: Primary layout selection
   *   - selectedSpecialLayouts: Additional layout features
   *   - selectedDesignStyle: Design style selection
   *   - selectedColorTheme: Color theme selection
   *   - selectedTypography: Typography settings
   *   - selectedFunctionality: Functionality options
   *   - selectedVisuals: Visual elements
   *   - selectedBackground: React-Bits background selection
   *   - backgroundSelection: Comprehensive background selection data
   *   - selectedComponents: React-Bits UI components
   *   - selectedAnimations: React-Bits animations
   *   - currentStep: Current wizard step
   *
   * @throws Re-throws any errors encountered during state restoration for handling by caller
   *
   * @example
   * ```tsx
   * const { loadProject } = useBoltBuilder();
   * const savedData = JSON.parse(localStorage.getItem('webknot-project'));
   * loadProject(savedData);
   * ```
   *
   * @remarks
   * - Only updates state for fields that are present in projectData
   * - Validates each field before setting to prevent corrupted data
   * - Logs detailed error information before re-throwing
   * - Called automatically on mount to restore previous session
   */
  const loadProject = React.useCallback((projectData: ProjectData) => {
    try {
      // Validate data structure before loading
      console.log('[Load Project] Starting project load with validation');
      
      // Check for background mismatches in loaded data
      if (projectData.backgroundSelection && projectData.selectedBackground) {
        if (projectData.backgroundSelection.type === 'react-bits') {
          const reactBitsId = projectData.backgroundSelection.reactBitsComponent?.id;
          const legacyId = projectData.selectedBackground.id;
          
          if (reactBitsId && legacyId && reactBitsId !== legacyId) {
            console.warn('[Load Project] Background mismatch detected in saved data:', {
              backgroundSelection: reactBitsId,
              selectedBackground: legacyId,
            });
            // Prefer backgroundSelection as source of truth
            console.log('[Load Project] Using backgroundSelection as source of truth');
          }
        }
      }
      
      // Wrap state updates in try-catch for safety
      try {
        if (projectData.projectInfo) setProjectInfo(projectData.projectInfo);
        if (projectData.selectedLayout) setSelectedLayout(projectData.selectedLayout);
        if (projectData.selectedSpecialLayouts)
          setSelectedSpecialLayouts(projectData.selectedSpecialLayouts);
        if (projectData.selectedDesignStyle) setSelectedDesignStyle(projectData.selectedDesignStyle);
        if (projectData.selectedColorTheme) setSelectedColorTheme(projectData.selectedColorTheme);
        if (projectData.selectedTypography) setSelectedTypography(projectData.selectedTypography);
        if (projectData.selectedFunctionality)
          setSelectedFunctionality(projectData.selectedFunctionality);
        if (projectData.selectedVisuals) setSelectedVisuals(projectData.selectedVisuals);
        
        // Load backgroundSelection first (source of truth)
        if (projectData.backgroundSelection) {
          setBackgroundSelectionState(projectData.backgroundSelection);
          console.log('[Load Project] Loaded backgroundSelection:', {
            type: projectData.backgroundSelection.type,
            component: projectData.backgroundSelection.reactBitsComponent?.title,
          });
        }
        
        // Load selectedBackground (will be synced by useEffect if needed)
        if (projectData.selectedBackground) {
          setSelectedBackground(projectData.selectedBackground);
          console.log('[Load Project] Loaded selectedBackground:', projectData.selectedBackground.title);
        }
        
        if (projectData.selectedComponents) setSelectedComponents(projectData.selectedComponents);
        if (projectData.selectedAnimations) setSelectedAnimations(projectData.selectedAnimations);
        if (projectData.currentStep) setCurrentStep(projectData.currentStep);
        
        console.log('[Load Project] Project loaded successfully');
      } catch (stateError) {
        console.error('[Load Project] Error updating state:', stateError);
        throw stateError;
      }
    } catch (error) {
      console.error('[Load Project] Failed to load project:', error);
      if (error instanceof Error) {
        console.error('[Load Project] Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
      throw error; // Re-throw to be caught by the calling useEffect
    }
  }, []);

  /**
   * Clears all project data and resets the wizard to initial state
   *
   * Resets all selections, project information, and wizard progress to default values.
   * Also removes the saved project from localStorage, effectively starting a fresh session.
   *
   * @remarks
   * This action cannot be undone. All project data will be permanently lost.
   *
   * @example
   * ```tsx
   * const { clearProject } = useBoltBuilder();
   *
   * // Show confirmation dialog before clearing
   * if (confirm('Are you sure you want to start a new project?')) {
   *   clearProject();
   * }
   * ```
   *
   * Default values after clearing:
   * - projectInfo: Empty strings with default type 'Website' and purpose 'Portfolio'
   * - All selections: null or empty arrays
   * - currentStep: 'project-setup'
   * - promptText: Empty string
   * - localStorage: 'webknot-project' key removed
   */
  const clearProject = () => {
    setProjectInfo({
      name: '',
      description: '',
      type: 'Website',
      purpose: 'Portfolio',
      targetAudience: '',
      goals: '',
    });
    setSelectedLayout(null);
    setSelectedSpecialLayouts([]);
    setSelectedDesignStyle(null);
    setSelectedColorTheme(null);
    setSelectedTypography(defaultTypography);
    setSelectedFunctionality([]);
    setSelectedVisuals([]);
    setSelectedBackground(null);
    setBackgroundSelectionState(null);
    setSelectedComponents([]);
    setSelectedAnimations([]);
    setCurrentStep('project-setup');
    setPromptText('');
    localStorage.removeItem('webknot-project');
  };

  // Track state changes for undo/redo with debouncing (500ms)
  // This prevents excessive history entries during rapid state changes
  useEffect(() => {
    if (isRestoringRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      const currentState: TrackableState = {
        selectedLayout,
        selectedSpecialLayouts,
        selectedDesignStyle,
        selectedColorTheme,
        selectedTypography,
        selectedFunctionality,
        selectedVisuals,
        selectedBackground,
        backgroundSelection: backgroundSelectionState,
        selectedComponents,
        selectedAnimations,
      };

      pushState(currentState);
    }, 500);

    return () => clearTimeout(timer);
  }, [
    selectedLayout,
    selectedSpecialLayouts,
    selectedDesignStyle,
    selectedColorTheme,
    selectedTypography,
    selectedFunctionality,
    selectedVisuals,
    selectedBackground,
    backgroundSelectionState,
    selectedComponents,
    selectedAnimations,
    pushState,
  ]);

  // Restore state from history when undo/redo is triggered
  useEffect(() => {
    if (isRestoringRef.current) {
      setSelectedLayout(historyState.selectedLayout);
      setSelectedSpecialLayouts(historyState.selectedSpecialLayouts);
      setSelectedDesignStyle(historyState.selectedDesignStyle);
      setSelectedColorTheme(historyState.selectedColorTheme);
      setSelectedTypography(historyState.selectedTypography);
      setSelectedFunctionality(historyState.selectedFunctionality);
      setSelectedVisuals(historyState.selectedVisuals);
      setSelectedBackground(historyState.selectedBackground);
      setBackgroundSelectionState(historyState.backgroundSelection);
      setSelectedComponents(historyState.selectedComponents);
      setSelectedAnimations(historyState.selectedAnimations);

      // Reset flag after restoration
      isRestoringRef.current = false;
    }
  }, [historyState]);

  // Undo/Redo wrapper functions
  const undo = React.useCallback(() => {
    isRestoringRef.current = true;
    historyUndo();
  }, [historyUndo]);

  const redo = React.useCallback(() => {
    isRestoringRef.current = true;
    historyRedo();
  }, [historyRedo]);

  // State synchronization: Sync selectedBackground from backgroundSelection
  // This ensures both fields stay in sync when backgroundSelection changes
  React.useEffect(() => {
    // Only sync when backgroundSelection.type is 'react-bits'
    if (backgroundSelectionState?.type === 'react-bits' && backgroundSelectionState.reactBitsComponent) {
      // Check if sync is needed (avoid unnecessary updates)
      if (selectedBackground?.id !== backgroundSelectionState.reactBitsComponent.id) {
        console.log('[State Sync] Updating selectedBackground from backgroundSelection:', {
          from: selectedBackground?.title || 'null',
          to: backgroundSelectionState.reactBitsComponent.title,
          timestamp: new Date().toISOString(),
        });
        setSelectedBackground(backgroundSelectionState.reactBitsComponent);
      }
    } else if (backgroundSelectionState?.type !== 'react-bits' && selectedBackground !== null) {
      // Clear selectedBackground if not using React-Bits
      console.log('[State Sync] Clearing selectedBackground (non-React-Bits type):', {
        type: backgroundSelectionState?.type || 'null',
        timestamp: new Date().toISOString(),
      });
      setSelectedBackground(null);
    }
  }, [backgroundSelectionState, selectedBackground]);

  // Auto-save functionality with debouncing (1 second delay)
  // This prevents excessive localStorage writes during rapid state changes
  // Performance optimization: Reduces I/O operations and improves responsiveness
  React.useEffect(() => {
    const timer = setTimeout(() => {
      saveProject();
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    projectInfo,
    selectedLayout,
    selectedSpecialLayouts,
    selectedDesignStyle,
    selectedColorTheme,
    selectedTypography,
    selectedFunctionality,
    selectedVisuals,
    selectedBackground,
    backgroundSelectionState,
    selectedComponents,
    selectedAnimations,
    currentStep,
    saveProject,
  ]);

  // Load project on mount and start metrics tracking
  React.useEffect(() => {
    const timestamp = new Date().toISOString();
    console.log(`[Load Project] ${timestamp} - Initializing context and checking for saved project`);
    
    // Start wizard session tracking
    if (!sessionStartedRef.current) {
      console.log(`[Load Project] ${timestamp} - Starting new wizard session`);
      startWizardSession();
      sessionStartedRef.current = true;
    }
    
    try {
      const saved = localStorage.getItem('webknot-project');
      if (saved) {
        console.log(`[Load Project] ${timestamp} - Found saved project in localStorage`, {
          dataSize: saved.length,
          timestamp,
        });
        
        try {
          const projectData = JSON.parse(saved);
          console.log(`[Load Project] ${timestamp} - Successfully parsed project data`, {
            hasProjectInfo: !!projectData.projectInfo,
            hasLayout: !!projectData.selectedLayout,
            hasDesignStyle: !!projectData.selectedDesignStyle,
            hasColorTheme: !!projectData.selectedColorTheme,
            hasBackground: !!projectData.selectedBackground,
            hasBackgroundSelection: !!projectData.backgroundSelection,
            hasComponents: !!projectData.selectedComponents,
            hasAnimations: !!projectData.selectedAnimations,
            currentStep: projectData.currentStep,
            savedAt: projectData.savedAt,
          });
          
          loadProject(projectData);
          console.log(`[Load Project] ${timestamp} - Project loaded successfully from localStorage`);
        } catch (parseError) {
          console.error(`[Load Project] ${timestamp} - Failed to parse saved project data:`, parseError);
          if (parseError instanceof Error) {
            console.error(`[Load Project] ${timestamp} - Parse error details:`, {
              name: parseError.name,
              message: parseError.message,
              stack: parseError.stack,
            });
          }
          
          // Clear corrupted data
          try {
            localStorage.removeItem('webknot-project');
            console.log(`[Load Project] ${timestamp} - Corrupted project data cleared from localStorage`);
          } catch (clearError) {
            console.error(`[Load Project] ${timestamp} - Failed to clear corrupted project data:`, clearError);
          }
        }
      } else {
        console.log(`[Load Project] ${timestamp} - No saved project found in localStorage, starting fresh`);
      }
    } catch (error) {
      console.error(`[Load Project] ${timestamp} - Failed to access localStorage:`, error);
      if (error instanceof Error) {
        console.error(`[Load Project] ${timestamp} - localStorage access error details:`, {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
      
      // Check if localStorage is available
      if (typeof localStorage === 'undefined') {
        console.error(`[Load Project] ${timestamp} - localStorage is not available in this environment`);
      }
      
      console.log(`[Load Project] ${timestamp} - Continuing with default empty state`);
    }
  }, [loadProject]);
  
  // Track step changes
  React.useEffect(() => {
    updateWizardStep(currentStep);
  }, [currentStep]);

  // Wrapper to track prompt generation completion
  const generatePromptWithTracking = React.useCallback((): string => {
    const prompt = generatePrompt();
    
    // If prompt was successfully generated, mark wizard as complete
    if (prompt && !prompt.includes('Please complete all required sections')) {
      // Calculate prompt quality score (simplified - would use actual analyzer)
      const promptLength = prompt.length;
      const hasAllSections = prompt.includes('## 1.') && prompt.includes('## 2.') && 
                            prompt.includes('## 3.') && prompt.includes('## 4.');
      const qualityScore = hasAllSections ? Math.min(85 + (promptLength / 100), 100) : 70;
      
      completeWizardSession(qualityScore);
    }
    
    return prompt;
  }, [generatePrompt]);
  
  const contextValue: BoltBuilderContextType = {
    currentStep,
    setCurrentStep,
    projectInfo,
    setProjectInfo,
    selectedLayout,
    setSelectedLayout,
    selectedSpecialLayouts,
    setSelectedSpecialLayouts,
    selectedDesignStyle,
    setSelectedDesignStyle,
    selectedColorTheme,
    setSelectedColorTheme,
    selectedTypography,
    setSelectedTypography,
    selectedFunctionality,
    setSelectedFunctionality,
    selectedVisuals,
    setSelectedVisuals,
    selectedBackground,
    setSelectedBackground,
    backgroundSelection,
    setBackgroundSelection,
    selectedComponents,
    setSelectedComponents,
    selectedAnimations,
    setSelectedAnimations,
    progress,
    generatePrompt: generatePromptWithTracking,
    generateBasicPrompt,
    promptText,
    setPromptText,
    promptType,
    setPromptType,
    saveProject,
    loadProject,
    clearProject,
    canUndo,
    canRedo,
    undo,
    redo,
  };

  return <BoltBuilderContext.Provider value={contextValue}>{children}</BoltBuilderContext.Provider>;
};

export const useBoltBuilder = () => {
  const context = useContext(BoltBuilderContext);
  if (context === undefined) {
    throw new Error('useBoltBuilder must be used within a BoltBuilderProvider');
  }
  return context;
};

// Export metrics tracking functions for use in components
export {
  trackSmartDefaultsAcceptance,
  trackSuggestionShown,
  trackSuggestionApplication,
} from '../utils/metricsTracking';
