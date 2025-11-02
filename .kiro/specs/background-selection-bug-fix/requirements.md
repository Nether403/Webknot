# Requirements Document

## Introduction

This specification addresses a critical bug discovered during comprehensive testing where the background selection state is not properly persisted or retrieved, causing the wrong background to appear in the generated prompt. Additionally, unexpected components appear in the prompt that were never selected by the user.

## Glossary

- **LovaBolt Application**: The wizard-based web application for generating project specifications
- **Background Step**: Step 7 in the wizard where users select a React-Bits background effect
- **Components Step**: Step 8 in the wizard where users select React-Bits UI components
- **Prompt Generator**: The system component that creates the final prompt text from user selections
- **State Manager**: The BoltBuilderContext that manages wizard state across steps
- **LocalStorage**: Browser storage mechanism for persisting wizard state
- **Smart Defaults**: AI feature that auto-selects recommended options based on project type

## Requirements

### Requirement 1: Background Selection Persistence

**User Story:** As a user, I want my background selection to be saved correctly, so that the generated prompt includes the background I actually chose.

#### Acceptance Criteria

1. WHEN THE user selects a background option in the Background Step, THE State Manager SHALL update the selectedBackground field in the application state
2. WHEN THE State Manager updates the selectedBackground field, THE State Manager SHALL persist the selection to LocalStorage within 1 second
3. WHEN THE user navigates away from the Background Step, THE State Manager SHALL retain the selectedBackground value in memory
4. WHEN THE user navigates to the Preview Step, THE Prompt Generator SHALL retrieve the selectedBackground value from the State Manager
5. WHEN THE Prompt Generator creates the prompt text, THE Prompt Generator SHALL include the background name that matches the selectedBackground value

### Requirement 2: Background Selection Validation

**User Story:** As a developer, I want to validate that background selections are correctly stored and retrieved, so that mismatches are caught before prompt generation.

#### Acceptance Criteria

1. WHEN THE user selects a background, THE State Manager SHALL log the selection to the browser console for debugging
2. WHEN THE Prompt Generator retrieves the background selection, THE Prompt Generator SHALL verify the value is not null or undefined
3. IF THE selectedBackground value is null or undefined, THEN THE Prompt Generator SHALL use "None" as the background value
4. WHEN THE Prompt Generator includes a background in the prompt, THE Prompt Generator SHALL verify the background name matches an entry in the backgrounds data array
5. IF THE background name does not match any entry, THEN THE Prompt Generator SHALL log an error to the console

### Requirement 3: Component Selection Transparency

**User Story:** As a user, I want to know which components are selected (including auto-selected ones), so that I understand what will be included in my project.

#### Acceptance Criteria

1. WHEN THE Smart Defaults feature auto-selects components, THE State Manager SHALL store these selections in the selectedComponents array
2. WHEN THE user navigates to the Components Step, THE Components Step SHALL display visual indicators for all selected components
3. WHEN THE user has not visited the Components Step, THE Components Step SHALL show which components were auto-selected by Smart Defaults
4. WHEN THE user navigates to the Preview Step, THE Prompt Generator SHALL only include components that exist in the selectedComponents array
5. WHEN THE Prompt Generator includes components in the prompt, THE Prompt Generator SHALL list each component name that matches the selectedComponents array

### Requirement 4: State Synchronization

**User Story:** As a user, I want my selections to be synchronized across all wizard steps, so that I see consistent information throughout the application.

#### Acceptance Criteria

1. WHEN THE user makes a selection in any step, THE State Manager SHALL update the global state within 100 milliseconds
2. WHEN THE global state updates, THE State Manager SHALL trigger a re-render of all components consuming the state
3. WHEN THE user navigates between steps, THE State Manager SHALL preserve all previous selections in memory
4. WHEN THE application loads from LocalStorage, THE State Manager SHALL restore all selections to their saved values
5. WHEN THE State Manager restores selections, THE State Manager SHALL validate that all restored values match the expected data structure

### Requirement 5: LocalStorage Error Handling

**User Story:** As a user, I want the application to handle storage errors gracefully, so that a storage failure doesn't break my entire workflow.

#### Acceptance Criteria

1. WHEN THE State Manager attempts to save to LocalStorage, THE State Manager SHALL wrap the operation in a try-catch block
2. IF THE LocalStorage save operation fails, THEN THE State Manager SHALL log the error to the console
3. IF THE LocalStorage save operation fails, THEN THE State Manager SHALL continue operating with in-memory state only
4. WHEN THE State Manager attempts to load from LocalStorage, THE State Manager SHALL wrap the operation in a try-catch block
5. IF THE LocalStorage load operation fails or returns invalid data, THEN THE State Manager SHALL initialize with default empty state

### Requirement 6: Debugging and Observability

**User Story:** As a developer, I want comprehensive logging of state changes, so that I can diagnose issues quickly.

#### Acceptance Criteria

1. WHEN THE user selects a background, THE State Manager SHALL log the selection with timestamp to the console
2. WHEN THE State Manager saves to LocalStorage, THE State Manager SHALL log the saved data structure to the console
3. WHEN THE Prompt Generator retrieves selections, THE Prompt Generator SHALL log the retrieved values to the console
4. WHEN THE Prompt Generator generates the prompt, THE Prompt Generator SHALL log which selections were included to the console
5. WHEN ANY state mismatch is detected, THE system SHALL log a warning with details of the expected vs actual values

### Requirement 7: Prompt Generation Accuracy

**User Story:** As a user, I want the generated prompt to accurately reflect all my selections, so that the built product matches my vision.

#### Acceptance Criteria

1. WHEN THE Prompt Generator creates the background section, THE Prompt Generator SHALL use the exact name from the selectedBackground field
2. WHEN THE Prompt Generator creates the components section, THE Prompt Generator SHALL only include components from the selectedComponents array
3. WHEN THE Prompt Generator creates the dependencies section, THE Prompt Generator SHALL calculate dependencies based on actual selected items
4. WHEN THE Prompt Generator completes, THE Prompt Generator SHALL verify that all user selections are represented in the prompt text
5. IF ANY user selection is missing from the prompt, THEN THE Prompt Generator SHALL log an error with details of the missing selection
