# Design Document

## Overview

This design addresses the critical bug where background selections are not properly persisted and retrieved, causing mismatches between user selections and generated prompts. The root cause is a state management inconsistency between the BackgroundStep component and the prompt generation logic.

### Root Cause Analysis

**Current Implementation Issues:**

1. **Dual State Management**: The system maintains two separate state fields for backgrounds:
   - `selectedBackground: BackgroundOption | null` - Simple background option
   - `backgroundSelection: BackgroundSelection | null` - Comprehensive selection object

2. **State Synchronization Gap**: The BackgroundStep component updates `backgroundSelection` but the prompt generator reads from `selectedBackground`, creating a disconnect.

3. **Missing State Updates**: When a React-Bits background is selected, `backgroundSelection` is updated but `selectedBackground` is not, causing the prompt to show incorrect or default values.

4. **LocalStorage Persistence**: Both fields are saved to localStorage, but only `backgroundSelection` is actively maintained by the BackgroundStep component.

## Architecture

### Current State Flow (Broken)

```
User selects background
    ↓
BackgroundStep updates backgroundSelection
    ↓
Context saves to localStorage (both fields)
    ↓
Prompt Generator reads selectedBackground ← WRONG FIELD
    ↓
Mismatch in generated prompt
```

### Proposed State Flow (Fixed)

```
User selects background
    ↓
BackgroundStep updates backgroundSelection
    ↓
Context synchronizes selectedBackground from backgroundSelection
    ↓
Context saves to localStorage (both fields in sync)
    ↓
Prompt Generator reads from backgroundSelection.reactBitsComponent
    ↓
Correct background in generated prompt
```

## Components and Interfaces

### 1. BoltBuilderContext Enhancements

**Changes Required:**

```typescript
// Add synchronization effect
useEffect(() => {
  // Sync selectedBackground from backgroundSelection
  if (backgroundSelection?.type === 'react-bits' && backgroundSelection.reactBitsComponent) {
    if (selectedBackground?.id !== backgroundSelection.reactBitsComponent.id) {
      console.log('[State Sync] Updating selectedBackground from backgroundSelection:', {
        from: selectedBackground?.title || 'null',
        to: backgroundSelection.reactBitsComponent.title,
        timestamp: new Date().toISOString()
      });
      setSelectedBackground(backgroundSelection.reactBitsComponent);
    }
  } else if (backgroundSelection?.type !== 'react-bits' && selectedBackground !== null) {
    // Clear selectedBackground if not using React-Bits
    console.log('[State Sync] Clearing selectedBackground (non-React-Bits type)');
    setSelectedBackground(null);
  }
}, [backgroundSelection, selectedBackground]);
```

**Logging Strategy:**

```typescript
// Enhanced setBackgroundSelection wrapper
const setBackgroundSelectionWithLogging = (selection: BackgroundSelection | null) => {
  console.log('[Background Selection] State update:', {
    type: selection?.type,
    reactBitsComponent: selection?.reactBitsComponent?.title,
    solidColor: selection?.solidColor,
    pattern: selection?.pattern,
    timestamp: new Date().toISOString()
  });
  setBackgroundSelection(selection);
};
```

### 2. Prompt Generator Refactoring

**Current Implementation (Broken):**

```typescript
const backgroundSection = selectedBackground
  ? `## 7. Background Effect
- **Selected Background:** ${selectedBackground.title}
...`
  : `## 7. Background Effect
- **Selected Background:** None
`;
```

**Fixed Implementation:**

```typescript
const backgroundSection = (() => {
  // Priority 1: Check backgroundSelection (comprehensive state)
  if (backgroundSelection?.type === 'react-bits' && backgroundSelection.reactBitsComponent) {
    const bg = backgroundSelection.reactBitsComponent;
    console.log('[Prompt Gen] Using React-Bits background:', bg.title);
    return `## 7. Background Effect
- **Selected Background:** ${bg.title}
- **Description:** ${bg.description}
- **Dependencies:** ${bg.dependencies.join(', ')}
- **Installation:** \`${bg.cliCommand}\`
`;
  }
  
  // Priority 2: Check other background types
  if (backgroundSelection?.type === 'solid') {
    console.log('[Prompt Gen] Using solid color:', backgroundSelection.solidColor);
    return `## 7. Background Effect
- **Type:** Solid Color
- **Color:** ${backgroundSelection.solidColor}
`;
  }
  
  if (backgroundSelection?.type === 'gradient') {
    console.log('[Prompt Gen] Using gradient:', backgroundSelection.gradientColors);
    return `## 7. Background Effect
- **Type:** Gradient
- **Colors:** ${backgroundSelection.gradientColors.join(' → ')}
- **Direction:** ${backgroundSelection.gradientDirection}
`;
  }
  
  if (backgroundSelection?.type === 'pattern') {
    console.log('[Prompt Gen] Using pattern:', backgroundSelection.pattern);
    return `## 7. Background Effect
- **Type:** Pattern
- **Pattern:** ${backgroundSelection.pattern}
`;
  }
  
  // Fallback: Check legacy selectedBackground field
  if (selectedBackground) {
    console.warn('[Prompt Gen] Using legacy selectedBackground field:', selectedBackground.title);
    return `## 7. Background Effect
- **Selected Background:** ${selectedBackground.title}
- **Description:** ${selectedBackground.description}
- **Dependencies:** ${selectedBackground.dependencies.join(', ')}
- **Installation:** \`${selectedBackground.cliCommand}\`
`;
  }
  
  // No background selected
  console.log('[Prompt Gen] No background selected');
  return `## 7. Background Effect
- **Selected Background:** None
`;
})();
```

### 3. Component Selection Validation

**Issue:** Unexpected components appear in prompts (Carousel, Bento Grid, Animated Testimonials) when user never visited Components step.

**Root Cause:** Smart Defaults may auto-select components without user awareness.

**Solution:**

```typescript
// In smartDefaults.ts or wherever Smart Defaults logic lives
const applySmartDefaults = (projectType: string, selections: Partial<ProjectData>) => {
  const defaults = {
    // ... other defaults
  };
  
  // If auto-selecting components, log it clearly
  if (defaults.selectedComponents && defaults.selectedComponents.length > 0) {
    console.log('[Smart Defaults] Auto-selecting components:', {
      components: defaults.selectedComponents.map(c => c.title),
      reason: `Recommended for ${projectType} projects`,
      timestamp: new Date().toISOString()
    });
    
    // Show notification to user
    showNotification({
      type: 'info',
      title: 'Components Auto-Selected',
      message: `Smart Defaults selected ${defaults.selectedComponents.length} components for your ${projectType} project. You can review and modify these in the Components step.`,
      duration: 5000
    });
  }
  
  return defaults;
};
```

### 4. Validation Layer

**New Validation Function:**

```typescript
/**
 * Validates that prompt generation data matches user selections
 * Logs warnings for any mismatches
 */
const validatePromptData = (context: BoltBuilderContextType): ValidationResult => {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  // Validate background selection
  if (context.backgroundSelection?.type === 'react-bits') {
    const reactBitsComponent = context.backgroundSelection.reactBitsComponent;
    const legacyBackground = context.selectedBackground;
    
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
  if (context.selectedComponents.length > 0) {
    const componentNames = context.selectedComponents.map(c => c.title).join(', ');
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
```

## Data Models

### BackgroundSelection (Existing)

```typescript
interface BackgroundSelection {
  type: 'solid' | 'gradient' | 'pattern' | 'react-bits';
  solidColor?: string;
  gradientColors?: string[];
  gradientDirection?: string;
  pattern?: string;
  reactBitsComponent?: BackgroundOption;
}
```

**Usage:** Primary source of truth for background selections.

### BackgroundOption (Existing)

```typescript
interface BackgroundOption {
  id: string;
  title: string;
  description: string;
  dependencies: string[];
  cliCommand: string;
  tags?: string[];
  // ... other fields
}
```

**Usage:** Legacy field, should be synchronized from `backgroundSelection.reactBitsComponent`.

### ValidationResult (New)

```typescript
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
```

**Usage:** Return type for validation functions.

## Error Handling

### 1. LocalStorage Errors

**Current:** Basic try-catch with console.error

**Enhanced:**

```typescript
const saveProject = React.useCallback(() => {
  const projectData = {
    // ... all fields
  };

  try {
    const serialized = JSON.stringify(projectData);
    localStorage.setItem('lovabolt-project', serialized);
    console.log('[LocalStorage] Project saved successfully:', {
      size: serialized.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[LocalStorage] Save failed:', error);
    
    if (error instanceof DOMException) {
      if (error.name === 'QuotaExceededError') {
        console.error('[LocalStorage] Quota exceeded. Project size:', 
          JSON.stringify(projectData).length);
        // Show user notification
        showNotification({
          type: 'error',
          title: 'Storage Full',
          message: 'Unable to save project. Please clear some browser data.',
          duration: 10000
        });
      }
    }
    
    // Continue with in-memory state
    console.log('[LocalStorage] Continuing with in-memory state only');
  }
}, [/* dependencies */]);
```

### 2. State Mismatch Detection

```typescript
// In generatePrompt function
const generatePrompt = (): string => {
  // Validate before generating
  const validation = validatePromptData({
    backgroundSelection,
    selectedBackground,
    selectedComponents,
    // ... other fields
  });
  
  if (!validation.isValid) {
    console.error('[Prompt Gen] Validation failed:', validation.errors);
    // Log but continue - don't block prompt generation
  }
  
  if (validation.warnings.length > 0) {
    console.warn('[Prompt Gen] Validation warnings:', validation.warnings);
  }
  
  // ... rest of prompt generation
};
```

### 3. Data Restoration Errors

```typescript
const loadProject = React.useCallback((projectData: ProjectData) => {
  try {
    // Validate data structure before loading
    if (projectData.backgroundSelection && projectData.selectedBackground) {
      // Check for mismatches
      if (projectData.backgroundSelection.type === 'react-bits') {
        const reactBitsId = projectData.backgroundSelection.reactBitsComponent?.id;
        const legacyId = projectData.selectedBackground.id;
        
        if (reactBitsId && legacyId && reactBitsId !== legacyId) {
          console.warn('[Load Project] Background mismatch detected in saved data:', {
            backgroundSelection: reactBitsId,
            selectedBackground: legacyId
          });
          // Prefer backgroundSelection as source of truth
          console.log('[Load Project] Using backgroundSelection as source of truth');
        }
      }
    }
    
    // Load data
    if (projectData.projectInfo) setProjectInfo(projectData.projectInfo);
    // ... rest of loading logic
    
    console.log('[Load Project] Project loaded successfully');
  } catch (error) {
    console.error('[Load Project] Failed to load project:', error);
    throw error; // Re-throw for caller to handle
  }
}, []);
```

## Testing Strategy

### Unit Tests

```typescript
describe('Background Selection State Management', () => {
  it('should sync selectedBackground when backgroundSelection changes', () => {
    // Test synchronization logic
  });
  
  it('should clear selectedBackground when type is not react-bits', () => {
    // Test clearing logic
  });
  
  it('should log state changes for debugging', () => {
    // Test logging
  });
});

describe('Prompt Generation', () => {
  it('should use backgroundSelection.reactBitsComponent for React-Bits backgrounds', () => {
    // Test prompt generation with React-Bits
  });
  
  it('should handle solid color backgrounds', () => {
    // Test solid color prompt generation
  });
  
  it('should handle gradient backgrounds', () => {
    // Test gradient prompt generation
  });
  
  it('should handle pattern backgrounds', () => {
    // Test pattern prompt generation
  });
  
  it('should fallback to selectedBackground if backgroundSelection is null', () => {
    // Test legacy fallback
  });
  
  it('should validate data before generating prompt', () => {
    // Test validation
  });
});

describe('Validation', () => {
  it('should detect background mismatches', () => {
    // Test mismatch detection
  });
  
  it('should warn about sync issues', () => {
    // Test warning generation
  });
  
  it('should log component selections', () => {
    // Test component logging
  });
});
```

### Integration Tests

```typescript
describe('End-to-End Background Selection', () => {
  it('should persist and restore React-Bits background selection', async () => {
    // 1. Navigate to background step
    // 2. Select a React-Bits background
    // 3. Navigate to preview
    // 4. Verify prompt includes correct background
    // 5. Reload page
    // 6. Verify selection persisted
  });
  
  it('should handle Smart Defaults component auto-selection', async () => {
    // 1. Apply Smart Defaults
    // 2. Check if components were auto-selected
    // 3. Verify notification was shown
    // 4. Navigate to components step
    // 5. Verify components are visually indicated as selected
  });
  
  it('should recover from localStorage errors', async () => {
    // 1. Fill out wizard
    // 2. Simulate localStorage quota exceeded
    // 3. Verify app continues with in-memory state
    // 4. Verify user notification shown
  });
});
```

### Manual Testing Checklist

- [ ] Select React-Bits background → Navigate to preview → Verify correct background in prompt
- [ ] Select solid color → Navigate to preview → Verify color in prompt
- [ ] Select gradient → Navigate to preview → Verify gradient in prompt
- [ ] Select pattern → Navigate to preview → Verify pattern in prompt
- [ ] Apply Smart Defaults → Check console for component auto-selection logs
- [ ] Apply Smart Defaults → Verify notification about auto-selected components
- [ ] Fill wizard → Reload page → Verify all selections restored
- [ ] Fill wizard → Clear localStorage → Reload → Verify graceful handling
- [ ] Generate prompt → Check console for validation warnings/errors
- [ ] Select background → Check console for state sync logs

## Implementation Plan

### Phase 1: State Synchronization (Critical)

1. Add synchronization effect in BoltBuilderContext
2. Add logging to setBackgroundSelection
3. Test synchronization with React-Bits backgrounds
4. Test synchronization with other background types

### Phase 2: Prompt Generator Fix (Critical)

1. Refactor backgroundSection generation to use backgroundSelection
2. Add fallback logic for legacy selectedBackground
3. Add logging to prompt generation
4. Test all background types in generated prompts

### Phase 3: Validation Layer (High Priority)

1. Implement validatePromptData function
2. Add validation call before prompt generation
3. Add validation logging
4. Test validation with various state combinations

### Phase 4: Component Selection Transparency (High Priority)

1. Add logging to Smart Defaults component selection
2. Implement user notification for auto-selected components
3. Add visual indicators in Components step for auto-selections
4. Test Smart Defaults flow end-to-end

### Phase 5: Enhanced Error Handling (Medium Priority)

1. Enhance LocalStorage error handling
2. Add quota exceeded detection and notification
3. Add data restoration validation
4. Test error scenarios

### Phase 6: Testing and Documentation (Medium Priority)

1. Write unit tests for state synchronization
2. Write unit tests for prompt generation
3. Write integration tests for end-to-end flows
4. Update documentation with debugging guide

## Performance Considerations

### Debouncing

- State synchronization effect should not trigger on every render
- Use dependency array to only run when backgroundSelection or selectedBackground changes
- Existing auto-save debouncing (1 second) is sufficient

### Logging

- Console logs should be detailed but not excessive
- Use structured logging with timestamps and context
- Consider adding a debug flag to enable/disable verbose logging

### LocalStorage

- Existing debouncing (1 second) prevents excessive writes
- Validation before save prevents corrupted data
- Error handling prevents app crashes

## Migration Strategy

### Backward Compatibility

The fix maintains backward compatibility:

1. **Legacy Data**: Projects saved with old version will still load
2. **Fallback Logic**: Prompt generator checks both fields
3. **Gradual Migration**: State sync will update legacy field over time

### Data Migration

No explicit migration needed:

1. Old projects load with both fields
2. State sync updates selectedBackground on next selection
3. Auto-save persists synchronized state
4. Future loads use synchronized data

## Monitoring and Observability

### Console Logging Strategy

```typescript
// Prefix all logs with component/function name
console.log('[Background Selection] ...');
console.log('[State Sync] ...');
console.log('[Prompt Gen] ...');
console.log('[Validation] ...');
console.log('[LocalStorage] ...');
console.log('[Load Project] ...');
console.log('[Smart Defaults] ...');
```

### Key Metrics to Log

1. **State Changes**: When and what changed
2. **Synchronization**: When sync occurs and what values
3. **Validation**: Any mismatches or warnings
4. **Prompt Generation**: Which fields were used
5. **LocalStorage**: Save/load success/failure
6. **Smart Defaults**: Auto-selections made

### Debug Mode (Future Enhancement)

```typescript
// Add to context
const [debugMode, setDebugMode] = useState(false);

// Conditional verbose logging
if (debugMode) {
  console.log('[DEBUG] Full state:', {
    backgroundSelection,
    selectedBackground,
    selectedComponents,
    // ... all state
  });
}
```

## Success Criteria

### Functional Requirements

- [ ] Background selection matches generated prompt 100% of the time
- [ ] All background types (solid, gradient, pattern, React-Bits) work correctly
- [ ] State persists across page reloads
- [ ] LocalStorage errors handled gracefully
- [ ] Smart Defaults component selection is transparent to user

### Non-Functional Requirements

- [ ] No performance degradation from additional logging
- [ ] State synchronization completes within 100ms
- [ ] Validation completes within 50ms
- [ ] Console logs are clear and actionable
- [ ] No breaking changes to existing functionality

### Testing Requirements

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] Manual testing checklist completed
- [ ] No console errors in normal operation
- [ ] Validation warnings only for actual issues

## Future Enhancements

### 1. State Management Refactoring

Consider consolidating to single source of truth:

```typescript
// Remove selectedBackground entirely
// Use only backgroundSelection
// Derive BackgroundOption when needed for backward compatibility
```

### 2. Type Safety Improvements

```typescript
// Make backgroundSelection required when type is 'react-bits'
type BackgroundSelection = 
  | { type: 'solid'; solidColor: string }
  | { type: 'gradient'; gradientColors: string[]; gradientDirection: string }
  | { type: 'pattern'; pattern: string }
  | { type: 'react-bits'; reactBitsComponent: BackgroundOption };
```

### 3. Automated Validation

```typescript
// Run validation automatically on state changes
// Show inline warnings in UI
// Prevent prompt generation if critical errors exist
```

### 4. Debug Panel

```typescript
// Add developer tools panel
// Show current state
// Show validation results
// Show sync status
// Export state for debugging
```

## Conclusion

This design addresses the critical background selection bug through:

1. **State Synchronization**: Automatic sync between backgroundSelection and selectedBackground
2. **Prompt Generator Fix**: Use backgroundSelection as primary source of truth
3. **Validation Layer**: Detect and log mismatches
4. **Enhanced Logging**: Comprehensive debugging information
5. **Error Handling**: Graceful handling of storage and data errors

The implementation maintains backward compatibility while fixing the root cause of the bug. Comprehensive logging and validation ensure similar issues can be quickly diagnosed in the future.
