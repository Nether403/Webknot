/**
 * BoltBuilderContext — thin compatibility shim
 *
 * All state, actions, history, and persistence now live in the Zustand store
 * (`src/stores/boltBuilderStore.ts`).  This file exists solely so that the
 * many components currently importing `useBoltBuilder` continue to work
 * without a mass refactor.  Migrate call-sites to `useBoltBuilderStore`
 * directly as part of Task 3 cleanup.
 */

import React, { createContext, useContext, type ReactNode, useEffect, useRef } from 'react';
import type {
  ProjectInfo,
  LayoutOption,
  DesignStyle,
  ColorTheme,
  Typography,
  VisualElement,
  FunctionalityOption,
  ComponentOption,
  AnimationOption,
  BackgroundSelection,
} from '../types';
import { toast } from '@/hooks/use-toast';
import {
  useBoltBuilderStore,
  selectCanUndo,
  selectCanRedo,
  selectProgress,
  type ProjectData,
  type StateUpdater,
} from '../stores/boltBuilderStore';
import {
  startWizardSession,
  updateWizardStep,
  trackSmartDefaultsAcceptance,
  trackSuggestionShown,
  trackSuggestionApplication,
} from '../utils/metricsTracking';

// ─── Context type (unchanged public surface) ──────────────────────────────────
interface BoltBuilderContextType {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  projectInfo: ProjectInfo;
  setProjectInfo: (info: ProjectInfo) => void;
  selectedLayout: LayoutOption | null;
  setSelectedLayout: (layout: LayoutOption | null) => void;
  selectedSpecialLayouts: LayoutOption[];
  setSelectedSpecialLayouts: React.Dispatch<React.SetStateAction<LayoutOption[]>>;
  selectedDesignStyle: DesignStyle | null;
  setSelectedDesignStyle: (style: DesignStyle | null) => void;
  selectedColorTheme: ColorTheme | null;
  setSelectedColorTheme: (theme: ColorTheme | null) => void;
  selectedTypography: Typography;
  setSelectedTypography: (typography: Typography) => void;
  selectedFunctionality: FunctionalityOption[];
  setSelectedFunctionality: React.Dispatch<React.SetStateAction<FunctionalityOption[]>>;
  selectedVisuals: VisualElement[];
  setSelectedVisuals: React.Dispatch<React.SetStateAction<VisualElement[]>>;
  backgroundSelection: BackgroundSelection | null;
  setBackgroundSelection: (selection: BackgroundSelection | null) => void;
  selectedComponents: ComponentOption[];
  setSelectedComponents: React.Dispatch<React.SetStateAction<ComponentOption[]>>;
  selectedAnimations: AnimationOption[];
  setSelectedAnimations: React.Dispatch<React.SetStateAction<AnimationOption[]>>;
  progress: number;
  generatePrompt: () => string;
  generateBasicPrompt: () => string;
  promptText: string;
  setPromptText: (text: string) => void;
  promptType: 'basic' | 'detailed';
  setPromptType: (type: 'basic' | 'detailed') => void;
  saveProject: () => void;
  loadProject: (projectData: ProjectData) => void;
  clearProject: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
}

import React from 'react';

const BoltBuilderContext = createContext<BoltBuilderContextType | undefined>(undefined);

export const BoltBuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useBoltBuilderStore();
  const sessionStartedRef = useRef(false);

  // Start session tracking once on mount
  useEffect(() => {
    if (!sessionStartedRef.current) {
      startWizardSession();
      sessionStartedRef.current = true;
    }
  }, []);

  // Sync step tracking when step changes (store's setCurrentStep already calls this,
  // but we keep it here for safety during the migration period)
  useEffect(() => {
    updateWizardStep(store.currentStep);
  }, [store.currentStep]);

  // ── saveProject — delegates to persist middleware; this is a no-op shim ──
  const saveProject = React.useCallback(() => {
    // persist middleware writes to localStorage automatically on every state change.
    // Manual saves are no longer needed; this stub exists for backward compatibility.
    try {
      // Trigger a toast confirmation only when explicitly called (e.g. Save button)
      // We can't easily distinguish auto-save from manual save here, so we do nothing.
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: 'An unexpected error occurred while saving.',
        duration: 5000,
      });
      if (import.meta.env.DEV) console.error('[saveProject] error:', error);
    }
  }, []);

  // ── loadProject — delegates to store ──────────────────────────────────────
  const loadProject = React.useCallback(
    (projectData: ProjectData) => {
      try {
        store.loadProjectData(projectData);
      } catch (error) {
        if (import.meta.env.DEV) console.error('[loadProject] Failed:', error);
        throw error;
      }
    },
    [store.loadProjectData]
  );

  // ── clearProject — delegates to store ─────────────────────────────────────
  const clearProject = React.useCallback(() => {
    store.clearProjectState();
  }, [store.clearProjectState]);

  // Adapter: React.Dispatch<SetStateAction<T>> ↔ store's (StateUpdater<T>) setter
  const setSelectedSpecialLayouts = React.useCallback(
    (v: React.SetStateAction<LayoutOption[]>) =>
      store.setSelectedSpecialLayouts(v as StateUpdater<LayoutOption[]>),
    [store.setSelectedSpecialLayouts]
  );
  const setSelectedFunctionality = React.useCallback(
    (v: React.SetStateAction<FunctionalityOption[]>) =>
      store.setSelectedFunctionality(v as StateUpdater<FunctionalityOption[]>),
    [store.setSelectedFunctionality]
  );
  const setSelectedVisuals = React.useCallback(
    (v: React.SetStateAction<VisualElement[]>) =>
      store.setSelectedVisuals(v as StateUpdater<VisualElement[]>),
    [store.setSelectedVisuals]
  );
  const setSelectedComponents = React.useCallback(
    (v: React.SetStateAction<ComponentOption[]>) =>
      store.setSelectedComponents(v as StateUpdater<ComponentOption[]>),
    [store.setSelectedComponents]
  );
  const setSelectedAnimations = React.useCallback(
    (v: React.SetStateAction<AnimationOption[]>) =>
      store.setSelectedAnimations(v as StateUpdater<AnimationOption[]>),
    [store.setSelectedAnimations]
  );

  const contextValue: BoltBuilderContextType = {
    currentStep: store.currentStep,
    setCurrentStep: store.setCurrentStep,
    projectInfo: store.projectInfo,
    setProjectInfo: store.setProjectInfo,
    selectedLayout: store.selectedLayout,
    setSelectedLayout: store.setSelectedLayout,
    selectedSpecialLayouts: store.selectedSpecialLayouts,
    setSelectedSpecialLayouts,
    selectedDesignStyle: store.selectedDesignStyle,
    setSelectedDesignStyle: store.setSelectedDesignStyle,
    selectedColorTheme: store.selectedColorTheme,
    setSelectedColorTheme: store.setSelectedColorTheme,
    selectedTypography: store.selectedTypography,
    setSelectedTypography: store.setSelectedTypography,
    selectedFunctionality: store.selectedFunctionality,
    setSelectedFunctionality,
    selectedVisuals: store.selectedVisuals,
    setSelectedVisuals,
    backgroundSelection: store.backgroundSelection,
    setBackgroundSelection: store.setBackgroundSelection,
    selectedComponents: store.selectedComponents,
    setSelectedComponents,
    selectedAnimations: store.selectedAnimations,
    setSelectedAnimations,
    progress: selectProgress(store as Parameters<typeof selectProgress>[0]),
    generatePrompt: store.generatePrompt,
    generateBasicPrompt: store.generateBasicPrompt,
    promptText: store.promptText,
    setPromptText: store.setPromptText,
    promptType: store.promptType,
    setPromptType: store.setPromptType,
    saveProject,
    loadProject,
    clearProject,
    canUndo: selectCanUndo(store as Parameters<typeof selectCanUndo>[0]),
    canRedo: selectCanRedo(store as Parameters<typeof selectCanRedo>[0]),
    undo: store.undo,
    redo: store.redo,
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

// Re-export metrics tracking functions used by components
export {
  trackSmartDefaultsAcceptance,
  trackSuggestionShown,
  trackSuggestionApplication,
} from '../utils/metricsTracking';
