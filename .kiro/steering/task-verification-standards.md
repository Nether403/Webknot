# Task Verification Standards

## Overview

This steering guide establishes strict standards for task completion and verification across all projects. These principles ensure that tasks are completed thoroughly with concrete evidence, not assumptions or partial validation.

## Core Principles

### 1. Explicit Verification Requirements

**Rule**: Verification means seeing the actual output, not inferring it from intermediate state.

**What This Means:**
- ✅ **DO**: Capture screenshots of the actual feature/output being tested
- ✅ **DO**: Read and display the actual generated content
- ✅ **DO**: Show the end result that users will see
- ❌ **DON'T**: Assume something works based on intermediate state
- ❌ **DON'T**: Verify by checking data structures instead of actual output
- ❌ **DON'T**: Mark complete based on "it should work" reasoning

**Examples:**

**❌ WRONG - Verifying Intermediate State:**
```typescript
// Task: Verify prompt generation includes React-Bits sections
const data = localStorage.getItem('lovabolt-project')
const parsed = JSON.parse(data)
console.log(parsed.selectedBackground) // Shows: "aurora"
// ❌ Marking task complete because data exists in localStorage
```

**✅ CORRECT - Verifying Actual Output:**
```typescript
// Task: Verify prompt generation includes React-Bits sections
mcp_chrome_devtools_navigate_page({ url: "http://localhost:5173/#/preview" })
mcp_chrome_devtools_wait_for({ text: "Generated Prompt" })
mcp_chrome_devtools_take_screenshot({ 
  fullPage: true,
  filePath: "test-results/prompt-with-react-bits.png"
})
// ✅ Screenshot shows the actual prompt text with React-Bits sections
// ✅ Can see "## 7. Background Effect" and "npx shadcn@latest add" commands
```

**❌ WRONG - Inferring from Code:**
```typescript
// Task: Verify CLI commands are displayed
// Reading the component code and seeing it renders CLI commands
// ❌ Marking complete because "the code looks right"
```

**✅ CORRECT - Seeing Actual Output:**
```typescript
// Task: Verify CLI commands are displayed
mcp_chrome_devtools_navigate_page({ url: "http://localhost:5173/#/components" })
mcp_chrome_devtools_click({ uid: "carousel_card_uid" })
mcp_chrome_devtools_wait_for({ text: "npx shadcn@latest add" })
mcp_chrome_devtools_take_screenshot({ 
  filePath: "test-results/cli-commands-displayed.png"
})
// ✅ Screenshot shows the actual CLI command text on screen
```

### 2. No Assumption-Based Completion

**Rule**: Never mark a task complete based on assumptions or partial evidence. If you encounter a blocker, solve the blocker first, even if it means doing extra steps not explicitly in the task.

**What This Means:**
- ✅ **DO**: Complete all prerequisite steps needed to verify the task
- ✅ **DO**: Solve blockers immediately, even if not in task description
- ✅ **DO**: Take extra steps to reach the verification point
- ❌ **DON'T**: Mark complete with "this should work" reasoning
- ❌ **DON'T**: Skip verification because it requires extra steps
- ❌ **DON'T**: Assume success without concrete evidence

**Examples:**

**❌ WRONG - Assumption-Based:**
```markdown
Task: Verify background selection updates the prompt

I've implemented the BackgroundStep component and it updates the context state.
The prompt generation function reads from context state.
Therefore, the prompt should include the background selection.
✅ Task complete.
```

**✅ CORRECT - Evidence-Based:**
```markdown
Task: Verify background selection updates the prompt

1. Navigate to app and clear state
2. Fill in project setup (extra step, but needed)
3. Navigate through steps to background (extra steps, but needed)
4. Select Aurora background
5. Navigate to preview step
6. Take screenshot showing prompt includes:
   - "## 7. Background Effect"
   - "Aurora" mentioned
   - "npx shadcn@latest add https://21st.dev/r/aurora"
✅ Task complete with screenshot evidence: prompt-includes-background.png
```

**❌ WRONG - Blocked by Prerequisites:**
```markdown
Task: Test modal interactions

I tried to click "View Details" but the button doesn't exist yet.
The BackgroundStep component needs to be implemented first.
I'll mark this task as blocked and move on.
```

**✅ CORRECT - Solve Blockers First:**
```markdown
Task: Test modal interactions

Blocker encountered: BackgroundStep component not implemented.
Solving blocker:
1. Implemented BackgroundStep component (extra work, but necessary)
2. Added "View Details" button
3. Implemented modal component
Now testing:
1. Click "View Details" - modal opens ✓
2. Click "Copy" - command copied ✓
3. Press Escape - modal closes ✓
✅ Task complete with screenshots: modal-open.png, modal-closed.png
```

### 3. Friction Is Not a Blocker

**Rule**: If a task requires filling in additional fields or taking extra steps to reach the verification point, do those steps. Don't treat them as blockers.

**What This Means:**
- ✅ **DO**: Fill in forms, navigate through steps, set up state as needed
- ✅ **DO**: Treat setup steps as part of the task
- ✅ **DO**: Complete the full user journey to reach verification point
- ❌ **DON'T**: Stop because "I need to fill in other fields first"
- ❌ **DON'T**: Treat normal user interactions as blockers
- ❌ **DON'T**: Skip verification because it requires multiple steps

**Examples:**

**❌ WRONG - Treating Friction as Blocker:**
```markdown
Task: Verify smart defaults apply to all relevant steps

I can test smart defaults on the project setup page, but to verify they apply
to other steps, I would need to:
- Fill in the project name
- Click continue
- Navigate through multiple steps
- Check each step's state

This is too much friction. I'll just verify the context state updates and
assume it works for all steps.
```

**✅ CORRECT - Completing Full Journey:**
```markdown
Task: Verify smart defaults apply to all relevant steps

Setup (necessary friction):
1. Navigate to app
2. Fill in project name: "Test Project"
3. Select project type: "Portfolio"
4. Click "Use Smart Defaults"

Verification journey:
1. Step 2 (Layout): Screenshot shows "Minimalist" selected ✓
2. Step 3 (Design): Screenshot shows "Minimalist" selected ✓
3. Step 4 (Color): Screenshot shows "Monochrome" selected ✓
4. Step 7 (Background): Screenshot shows "Aurora" selected ✓

✅ Task complete with 4 screenshots showing defaults applied across steps
```

**❌ WRONG - Avoiding Multi-Step Verification:**
```markdown
Task: Test complete wizard flow with React-Bits selections

This would require going through all 11 steps and making selections at each one.
That's a lot of steps. I'll just test the individual components and assume
the flow works.
```

**✅ CORRECT - Embracing Multi-Step Verification:**
```markdown
Task: Test complete wizard flow with React-Bits selections

Complete flow execution:
1. Project Setup: Filled name, selected type, clicked continue
2. Layout: Selected "Single Page", clicked continue
3. Design: Selected "Modern", clicked continue
4. Color: Selected "Vibrant", clicked continue
5. Typography: Selected "Sans-serif", clicked continue
6. Visuals: Selected "Illustrations", clicked continue
7. Background: Selected "Aurora", clicked continue
8. Components: Selected "Carousel" + "Accordion", clicked continue
9. Functionality: Selected "Authentication", clicked continue
10. Animations: Selected "Blob Cursor", clicked continue
11. Preview: Verified all selections in prompt

✅ Task complete with 11 screenshots documenting complete flow
```

### 4. Test Evidence Requirements

**Rule**: For testing tasks, evidence must include the actual thing being tested, not the data structures or intermediate state that feed into it.

**What This Means:**
- ✅ **DO**: Capture the actual UI, text, or output users will see
- ✅ **DO**: Show the end result of the feature
- ✅ **DO**: Verify the user-facing behavior
- ❌ **DON'T**: Show localStorage/state as evidence of UI working
- ❌ **DON'T**: Show component props as evidence of rendering
- ❌ **DON'T**: Show function return values as evidence of UI display

**Examples:**

**❌ WRONG - Data Structure Evidence:**
```markdown
Task: Verify prompt includes React-Bits installation commands

Evidence:
```json
{
  "selectedBackground": "aurora",
  "selectedComponents": ["carousel", "accordion"],
  "selectedAnimations": ["blob-cursor"]
}
```

The data is in localStorage, so the prompt generation will include it.
✅ Task complete.
```

**✅ CORRECT - Actual Output Evidence:**
```markdown
Task: Verify prompt includes React-Bits installation commands

Evidence: Screenshot "prompt-react-bits-commands.png" shows:

## 12. React-Bits Installation

Install the selected react-bits components:

```bash
npx shadcn@latest add https://21st.dev/r/aurora
npx shadcn@latest add https://21st.dev/r/carousel
npx shadcn@latest add https://21st.dev/r/accordion
npx shadcn@latest add https://21st.dev/r/blob-cursor
```

✅ Task complete - actual prompt text visible in screenshot
```

**❌ WRONG - Component Props Evidence:**
```markdown
Task: Verify CLI command displays when component is selected

I logged the props passed to CLICommandDisplay component:
```typescript
{ command: "npx shadcn@latest add https://21st.dev/r/carousel" }
```

The component receives the correct command, so it must be displaying.
✅ Task complete.
```

**✅ CORRECT - Rendered UI Evidence:**
```markdown
Task: Verify CLI command displays when component is selected

Steps:
1. Navigate to Components step
2. Click on Carousel card
3. Take screenshot showing CLI command box

Evidence: Screenshot "cli-command-displayed.png" shows:
- Gray box with terminal icon
- Text: "npx shadcn@latest add https://21st.dev/r/carousel"
- Copy button next to command

✅ Task complete - actual rendered command visible in screenshot
```

## Application Guidelines

### For Implementation Tasks

When implementing a feature:

1. **Implement the feature** (write the code)
2. **Start the dev server** (if not running)
3. **Navigate to the feature** (in browser via MCP)
4. **Interact with the feature** (click, type, select)
5. **Capture the actual output** (screenshot of rendered UI)
6. **Verify expected behavior** (check screenshot shows correct result)
7. **Document evidence** (save screenshot with descriptive name)

**Only then** mark the task complete.

### For Testing Tasks

When testing a feature:

1. **Identify what needs verification** (the actual user-facing output)
2. **Determine the path to reach it** (all prerequisite steps)
3. **Execute the full path** (don't skip friction steps)
4. **Capture the actual thing being tested** (not intermediate state)
5. **Verify against requirements** (does output match expected?)
6. **Document with evidence** (screenshots of actual output)

**Only then** mark the test complete.

### For Debugging Tasks

When debugging an issue:

1. **Reproduce the issue** (see the actual problem)
2. **Identify the root cause** (not just symptoms)
3. **Implement the fix** (change the code)
4. **Verify the fix works** (see the actual corrected behavior)
5. **Capture evidence** (screenshot showing issue resolved)
6. **Test related functionality** (ensure no regressions)

**Only then** mark the debug task complete.

## Common Pitfalls to Avoid

### Pitfall 1: "The Code Looks Right"

**Wrong Approach:**
```markdown
I've reviewed the code and the logic is correct. The component should render
the CLI commands properly. ✅ Task complete.
```

**Correct Approach:**
```markdown
I've implemented the code. Now verifying:
1. Started dev server
2. Navigated to component
3. Triggered the behavior
4. Screenshot shows CLI commands rendering correctly
✅ Task complete with evidence
```

### Pitfall 2: "It's in the State"

**Wrong Approach:**
```markdown
I checked localStorage and the selection is saved. The UI will reflect this.
✅ Task complete.
```

**Correct Approach:**
```markdown
I verified the selection is saved. Now checking UI:
1. Reloaded the page
2. Screenshot shows the selection is visually indicated
3. Screenshot shows the selection persisted after reload
✅ Task complete with evidence
```

### Pitfall 3: "Too Many Steps Required"

**Wrong Approach:**
```markdown
To verify this, I'd need to go through 8 steps. That's too much friction.
I'll just verify the component in isolation.
```

**Correct Approach:**
```markdown
This requires going through 8 steps. Executing full flow:
[Documents all 8 steps with screenshots]
✅ Task complete with full flow verification
```

### Pitfall 4: "Blocked by Missing Feature"

**Wrong Approach:**
```markdown
I can't test this because Feature X isn't implemented yet.
Marking as blocked.
```

**Correct Approach:**
```markdown
Blocker: Feature X not implemented.
Solving blocker: Implementing Feature X first.
[Implements Feature X]
Now testing original task:
[Completes verification]
✅ Task complete
```

## Verification Checklist

Before marking any task complete, verify:

- [ ] I have seen the actual output/UI/behavior (not just state/props/data)
- [ ] I have captured screenshot evidence of the actual thing being tested
- [ ] I have completed all prerequisite steps needed to reach verification
- [ ] I have solved any blockers encountered (not just documented them)
- [ ] I have not made assumptions about functionality working
- [ ] I have not treated normal user interactions as blockers
- [ ] I have evidence that would convince a skeptical reviewer
- [ ] I have documented the evidence with clear filenames and descriptions

## Evidence Standards

### Good Evidence Examples

✅ **Screenshot of rendered UI** showing the feature working
✅ **Screenshot of generated text** showing correct content
✅ **Screenshot of user interaction** showing correct response
✅ **Screenshot of error handling** showing graceful failure
✅ **Screenshot of responsive layout** at different viewport sizes
✅ **Console output** showing no errors during operation
✅ **Performance measurements** from actual execution
✅ **Accessibility scan results** from actual page

### Bad Evidence Examples

❌ **Code snippet** showing implementation (doesn't prove it works)
❌ **Console.log of state** (doesn't prove UI renders correctly)
❌ **localStorage contents** (doesn't prove UI displays it)
❌ **Component props** (doesn't prove component renders)
❌ **Function return value** (doesn't prove end-to-end flow)
❌ **"It should work because..."** reasoning (not evidence)
❌ **Partial verification** (only checked one of three required outputs)

## When to Ask for Help

Ask the user for guidance when:

1. **Genuine technical blocker**: Something is broken in the codebase that prevents verification
2. **Unclear requirements**: The task description is ambiguous about what to verify
3. **Missing dependencies**: External services or APIs are required but not available
4. **Environment issues**: Dev server won't start, build fails, etc.

**Do NOT ask for help when:**

1. Verification requires multiple steps (just do them)
2. You need to fill in forms or navigate through UI (just do it)
3. You need to implement a prerequisite feature (implement it)
4. You need to take screenshots (just take them)
5. The task requires extra effort (put in the effort)

## Success Criteria

A task is successfully complete when:

1. ✅ The feature/fix is implemented
2. ✅ The actual output has been verified (not inferred)
3. ✅ Screenshot evidence has been captured
4. ✅ All prerequisite steps were completed
5. ✅ All blockers were solved
6. ✅ No assumptions were made
7. ✅ Evidence shows the actual thing being tested
8. ✅ Documentation clearly describes what was verified

## Summary

**Remember:**
- **Verification = Seeing actual output**, not inferring from state
- **Blockers = Solve them**, don't document and skip
- **Friction = Normal**, complete the full journey
- **Evidence = Actual output**, not intermediate data structures

**The Golden Rule:**
If you wouldn't be convinced by your own evidence, it's not sufficient evidence.

**The Test:**
Could someone else look at your evidence and immediately see that the feature works correctly, without needing to trust your interpretation or assumptions?

If yes → Task complete ✅
If no → More verification needed ❌
