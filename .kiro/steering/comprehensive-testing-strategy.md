# Comprehensive Testing Strategy - Steering Guide

## ⚡ Quick Start

**PRIMARY TOOL**: Use **Chrome DevTools MCP** for all testing tasks.

**Standard Testing Flow**:
1. Navigate: `mcp_chrome_devtools_navigate_page({ url: "..." })`
2. Snapshot: `mcp_chrome_devtools_take_snapshot()` (to get element UIDs)
3. Interact: `mcp_chrome_devtools_click({ uid: "..." })`
4. Validate: `mcp_chrome_devtools_wait_for({ text: "..." })`
5. Capture: `mcp_chrome_devtools_take_screenshot({ fullPage: true, filePath: "..." })`

**Why Chrome DevTools?** 100% success rate, no timeouts, handles React apps perfectly.

---

## Overview

This guide provides specific instructions for executing comprehensive testing and validation of the LovaBolt application using MCP servers. It complements the testing spec at `.kiro/specs/comprehensive-testing-validation/` and provides practical guidance for test execution.

**IMPORTANT UPDATE (2025-11-01)**: Based on testing experience with tasks 5-8, Chrome DevTools MCP has been designated as the PRIMARY testing tool due to superior reliability and performance with the LovaBolt React application. Playwright MCP is now a backup tool only.

## When to Use This Guide

Use this steering guide when:
- Executing the comprehensive testing plan
- Validating AI intelligence features
- Testing React-Bits integration
- Performing accessibility audits
- Measuring performance
- Generating test reports

## Testing Philosophy

### Core Principles

1. **Automate Everything Possible** - Use MCP servers for repeatable tests
2. **Document Everything** - Capture screenshots, logs, and measurements
3. **Test Like a User** - Follow real user workflows
4. **Fail Fast, Fix Fast** - Stop on critical failures, document, and fix
5. **Measure Objectively** - Use concrete metrics, not subjective assessments

### Test Execution Order

Always follow this order:
1. **Setup** - Clear state, verify environment
2. **Execute** - Run test scenario
3. **Validate** - Check expected outcomes
4. **Capture** - Take screenshots and logs
5. **Document** - Record results immediately

## MCP Server Selection Guide

### ⭐ PRIMARY TOOL: Chrome DevTools MCP (RECOMMENDED)

**Status**: **PRIMARY TOOL** - Use this for all testing tasks unless specifically noted otherwise.

**Why Chrome DevTools is Primary:**
- ✅ **Proven reliability** - 100% success rate on tasks 5-8
- ✅ **No selector issues** - Uses accessibility tree UIDs instead of CSS selectors
- ✅ **Fast execution** - No 30-second timeouts
- ✅ **Better for React apps** - Handles dynamic content perfectly
- ✅ **Comprehensive features** - Covers all testing needs

**Best for:**
- ✅ User interaction simulation (clicks, typing, navigation)
- ✅ E2E workflow testing
- ✅ Screenshot capture for visual validation
- ✅ Element inspection via accessibility tree
- ✅ Console log monitoring
- ✅ Performance profiling and analysis
- ✅ Network request monitoring
- ✅ Detailed accessibility tree inspection
- ✅ CPU and network throttling
- ✅ Deep debugging

**Use for:**
- Testing wizard flow navigation
- Validating form inputs
- Testing modal interactions
- Capturing visual states
- Checking for console errors
- Measuring AI feature performance
- Analyzing page load times
- Inspecting network requests
- Profiling rendering performance
- Testing under throttled conditions

**Standard Workflow:**
```typescript
// 1. Navigate to page
mcp_chrome_devtools_navigate_page({ url: "http://localhost:5173" })

// 2. Take snapshot to get element UIDs
mcp_chrome_devtools_take_snapshot()

// 3. Click elements using UIDs from snapshot
mcp_chrome_devtools_click({ uid: "element_uid" })

// 4. Wait for content to load
mcp_chrome_devtools_wait_for({ text: "Expected text" })

// 5. Take screenshot
mcp_chrome_devtools_take_screenshot({ 
  fullPage: true, 
  filePath: "test-results/screenshot.png" 
})
```

**Example - Complete Test Flow:**
```typescript
// Navigate and wait for page load
mcp_chrome_devtools_navigate_page({ url: "http://localhost:5173" })
mcp_chrome_devtools_wait_for({ text: "Get Started" })

// Take snapshot to see page structure
const snapshot = mcp_chrome_devtools_take_snapshot()
// Review snapshot output to find element UIDs

// Click button using UID from snapshot
mcp_chrome_devtools_click({ uid: "1_15" }) // "Get Started" button

// Wait for next page
mcp_chrome_devtools_wait_for({ text: "Project Setup" })

// Take screenshot
mcp_chrome_devtools_take_screenshot({ 
  fullPage: true,
  filePath: "test-results/project-setup.png"
})
```

### When to Use Playwright MCP (BACKUP TOOL)

**Status**: **BACKUP TOOL** - Only use if Chrome DevTools cannot accomplish the task.

**Known Issues:**
- ⚠️ Selector timeouts on complex React components
- ⚠️ Difficulty finding form inputs with dynamic attributes
- ⚠️ 30-second timeout delays on failures

**May be useful for:**
- Cross-browser testing (Firefox, WebKit) - if needed later
- Specific Playwright-only features
- Simple static pages (not applicable to LovaBolt)

**If you must use Playwright:**
```typescript
// Use simple, reliable selectors
mcp_playwright_playwright_navigate({ url: "http://localhost:5173" })
mcp_playwright_playwright_click({ selector: "button:has-text('Continue')" })
mcp_playwright_playwright_screenshot({ name: "step-2", fullPage: true })
```

**Note**: If Playwright is required for a specific task and encounters issues, document the problem and switch to Chrome DevTools or consult with the user.

### When to Use Accessibility Scanner MCP

**Best for:**
- WCAG compliance scanning
- Accessibility tree inspection
- Keyboard navigation testing
- Screen reader compatibility

**Use when:**
- Running accessibility audits
- Validating ARIA labels
- Testing keyboard navigation
- Checking color contrast

**Example:**
```typescript
// WCAG compliance scan
mcp_accessibility_scanner_browser_navigate({ url: "http://localhost:5173" })
mcp_accessibility_scanner_scan_page({ violationsTag: ["wcag2aa", "wcag21aa"] })
```

## Testing Patterns by Feature Type

### Pattern 1: Testing AI Features (Using Chrome DevTools)

**Approach:**
1. Clear any cached AI results
2. Trigger AI feature
3. Measure execution time
4. Validate output quality
5. Verify performance target met

**Example: Smart Defaults**
```typescript
// 1. Setup - Navigate and clear state
mcp_chrome_devtools_navigate_page({ url: "http://localhost:5173" })
mcp_chrome_devtools_evaluate_script({ 
  function: "() => { localStorage.clear(); }" 
})
mcp_chrome_devtools_navigate_page({ url: "http://localhost:5173" })

// 2. Wait for page load
mcp_chrome_devtools_wait_for({ text: "Get Started" })

// 3. Take snapshot to get element UIDs
mcp_chrome_devtools_take_snapshot()
// Review output to find "Get Started" button UID

// 4. Click Get Started
mcp_chrome_devtools_click({ uid: "1_15" }) // Example UID

// 5. Wait for Project Setup page
mcp_chrome_devtools_wait_for({ text: "Project Setup" })

// 6. Take snapshot to find form elements
mcp_chrome_devtools_take_snapshot()
// Find project name input, project type, and smart defaults button UIDs

// 7. Measure performance start
const start = await mcp_chrome_devtools_evaluate_script({ 
  function: "() => { return performance.now(); }" 
})

// 8. Fill form and trigger AI feature
mcp_chrome_devtools_fill({ 
  uid: "3_37", // Project name input UID
  value: "Test Portfolio" 
})
mcp_chrome_devtools_click({ uid: "3_42" }) // Portfolio project type
mcp_chrome_devtools_click({ uid: "3_50" }) // Smart Defaults button

// 9. Wait for completion
mcp_chrome_devtools_wait_for({ text: "Smart defaults applied" })

// 10. Measure performance end
const end = await mcp_chrome_devtools_evaluate_script({ 
  function: "() => { return performance.now(); }" 
})
const duration = end - start

// 11. Validate and document
mcp_chrome_devtools_take_screenshot({ 
  fullPage: true,
  filePath: "test-results/smart-defaults-applied.png"
})

// 12. Check console for errors
mcp_chrome_devtools_list_console_messages({ types: ["error"] })
```

**Validation Checklist:**
- ✅ Feature executes without errors
- ✅ Performance target met (<50ms for smart defaults)
- ✅ Output is correct and complete
- ✅ UI updates appropriately
- ✅ No console errors
- ✅ Screenshot captured

### Pattern 2: Testing React-Bits Components (Using Chrome DevTools)

**Approach:**
1. Navigate to component step
2. Verify all options displayed
3. Test selection behavior
4. Verify CLI commands
5. Test modal interactions

**Example: Background Step**
```typescript
// 1. Navigate to app
mcp_chrome_devtools_navigate_page({ url: "http://localhost:5173" })
mcp_chrome_devtools_wait_for({ text: "Get Started" })

// 2. Navigate through wizard to background step
mcp_chrome_devtools_take_snapshot()
mcp_chrome_devtools_click({ uid: "get_started_uid" })
// ... continue through steps to reach background step

// 3. Wait for background step to load
mcp_chrome_devtools_wait_for({ text: "Background Effects" })

// 4. Take snapshot to see all options
const snapshot = mcp_chrome_devtools_take_snapshot()
// Count background cards in snapshot output

// 5. Take initial screenshot
mcp_chrome_devtools_take_screenshot({ 
  fullPage: true,
  filePath: "test-results/background-step-initial.png"
})

// 6. Select an option (find UID from snapshot)
mcp_chrome_devtools_click({ uid: "aurora_card_uid" })

// 4. Verify selection indicator
mcp_playwright_playwright_screenshot({ 
  name: "background-selected" 
})

// 5. Verify CLI command displayed
const text = await mcp_playwright_playwright_get_visible_text()
// Should contain: "npx shadcn@latest add"

// 6. Test modal
mcp_playwright_playwright_click({ 
  selector: "button:has-text('View Details')" 
})
mcp_playwright_playwright_screenshot({ 
  name: "background-modal" 
})

// 7. Test copy functionality
mcp_playwright_playwright_click({ 
  selector: "button:has-text('Copy')" 
})
// Verify success feedback

// 8. Close modal
mcp_playwright_playwright_press_key({ key: "Escape" })
```

**Validation Checklist:**
- ✅ Correct number of options displayed
- ✅ Selection indicator appears
- ✅ CLI command is correct
- ✅ Modal opens and displays correct info
- ✅ Copy functionality works
- ✅ Modal closes properly
- ✅ Screenshots captured

### Pattern 3: Testing Complete Wizard Flow

**Approach:**
1. Start fresh (clear state)
2. Navigate through all 11 steps
3. Make selections at each step
4. Verify state persists
5. Validate final prompt

**Example: Complete Flow**
```typescript
// 1. Clear state
mcp_playwright_playwright_navigate({ url: "http://localhost:5173" })
mcp_playwright_playwright_evaluate({ script: "() => localStorage.clear()" })
mcp_playwright_playwright_navigate({ url: "http://localhost:5173" })

// 2. Step 1: Project Setup
mcp_playwright_playwright_fill({ 
  selector: "input[name='projectName']", 
  value: "Complete Test" 
})
mcp_playwright_playwright_click({ 
  selector: "[data-project-type='Web App']" 
})
mcp_playwright_playwright_click({ 
  selector: "button:has-text('Use Smart Defaults')" 
})
mcp_playwright_playwright_screenshot({ name: "step-1-complete" })
mcp_playwright_playwright_click({ 
  selector: "button:has-text('Continue')" 
})

// 3. Step 2-10: Continue through each step
// ... (repeat for each step with appropriate selections)

// 4. Step 11: Preview
mcp_playwright_playwright_screenshot({ 
  name: "step-11-preview", 
  fullPage: true 
})

// 5. Verify localStorage
const savedData = await mcp_playwright_playwright_evaluate({ 
  script: "() => localStorage.getItem('lovabolt-project')" 
})
// Verify all selections are saved

// 6. Test state persistence
mcp_playwright_playwright_navigate({ url: "http://localhost:5173" })
// Verify wizard restores to last step
```

**Validation Checklist:**
- ✅ All 11 steps completed
- ✅ Selections made at each step
- ✅ Progress bar updates correctly
- ✅ State persists in localStorage
- ✅ State restores on reload
- ✅ Final prompt includes all selections
- ✅ Screenshots of each step captured

### Pattern 4: Testing Accessibility

**Approach:**
1. Navigate to page/step
2. Run automated WCAG scan
3. Test keyboard navigation
4. Verify ARIA labels
5. Check color contrast

**Example: Accessibility Audit**
```typescript
// 1. Navigate
mcp_accessibility_scanner_browser_navigate({ 
  url: "http://localhost:5173/#/background" 
})

// 2. Take accessibility snapshot
mcp_accessibility_scanner_browser_snapshot()

// 3. Run WCAG scan
const violations = await mcp_accessibility_scanner_scan_page({
  violationsTag: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]
})

// 4. Document violations
// violations should be empty or only minor issues

// 5. Test keyboard navigation
mcp_accessibility_scanner_browser_press_key({ key: "Tab" })
mcp_accessibility_scanner_browser_screenshot({ 
  name: "focus-state-1" 
})
mcp_accessibility_scanner_browser_press_key({ key: "Tab" })
mcp_accessibility_scanner_browser_screenshot({ 
  name: "focus-state-2" 
})

// 6. Test keyboard activation
mcp_accessibility_scanner_browser_press_key({ key: "Enter" })
// Verify selection works

// 7. Use Chrome DevTools for contrast check
mcp_chrome_devtools_navigate_page({ 
  url: "http://localhost:5173/#/background" 
})
mcp_chrome_devtools_take_screenshot({ fullPage: true })
// Manually verify contrast ratios in screenshot
```

**Validation Checklist:**
- ✅ Zero critical WCAG violations
- ✅ All interactive elements keyboard accessible
- ✅ Focus indicators visible
- ✅ ARIA labels present and correct
- ✅ Color contrast meets 4.5:1 minimum
- ✅ Screen reader compatible

### Pattern 5: Testing Performance

**Approach:**
1. Clear cache and state
2. Start performance trace
3. Execute action
4. Stop trace and analyze
5. Verify target met

**Example: AI Feature Performance**
```typescript
// 1. Setup
mcp_chrome_devtools_navigate_page({ 
  url: "http://localhost:5173" 
})
mcp_chrome_devtools_evaluate_script({ 
  function: "() => { localStorage.clear(); }" 
})

// 2. Start trace
mcp_chrome_devtools_performance_start_trace({ 
  reload: true, 
  autoStop: false 
})

// 3. Navigate to step
mcp_chrome_devtools_click({ uid: "continue-button-uid" })

// 4. Trigger AI feature
mcp_chrome_devtools_click({ uid: "smart-defaults-button-uid" })

// 5. Stop trace
mcp_chrome_devtools_performance_stop_trace()

// 6. Analyze insights
mcp_chrome_devtools_performance_analyze_insight({ 
  insightName: "LCPBreakdown" 
})

// 7. Measure specific operation
const start = await mcp_playwright_playwright_evaluate({ 
  script: "() => performance.now()" 
})
// ... trigger operation
const end = await mcp_playwright_playwright_evaluate({ 
  script: "() => performance.now()" 
})
const duration = end - start

// 8. Document
// duration should be < target (50ms, 100ms, 200ms depending on feature)
```

**Validation Checklist:**
- ✅ Smart Defaults < 50ms
- ✅ Prompt Analysis < 100ms
- ✅ Compatibility Check < 50ms
- ✅ NLP Parsing < 200ms
- ✅ Suggestions < 100ms
- ✅ Page Load < 2s
- ✅ No blocking operations

## Common Testing Scenarios

### Scenario: Test Modal Interactions

```typescript
// 1. Open modal
mcp_playwright_playwright_click({ 
  selector: "button:has-text('View Details')" 
})

// 2. Verify modal content
const text = await mcp_playwright_playwright_get_visible_text()
// Should contain: title, description, dependencies, CLI command

// 3. Test copy button
mcp_playwright_playwright_click({ 
  selector: "button:has-text('Copy')" 
})
// Verify success feedback appears

// 4. Test Escape key
mcp_playwright_playwright_press_key({ key: "Escape" })
// Verify modal closes

// 5. Test click outside
mcp_playwright_playwright_click({ 
  selector: "button:has-text('View Details')" 
})
mcp_playwright_playwright_click({ 
  selector: ".modal-backdrop" 
})
// Verify modal closes

// 6. Test X button
mcp_playwright_playwright_click({ 
  selector: "button:has-text('View Details')" 
})
mcp_playwright_playwright_click({ 
  selector: "[aria-label='Close']" 
})
// Verify modal closes
```

### Scenario: Test Responsive Design

```typescript
// 1. Mobile (375x667)
mcp_playwright_playwright_navigate({ 
  url: "http://localhost:5173", 
  width: 375, 
  height: 667 
})
mcp_playwright_playwright_screenshot({ 
  name: "mobile-home", 
  fullPage: true 
})

// 2. Tablet (768x1024)
mcp_playwright_playwright_navigate({ 
  url: "http://localhost:5173", 
  width: 768, 
  height: 1024 
})
mcp_playwright_playwright_screenshot({ 
  name: "tablet-home", 
  fullPage: true 
})

// 3. Desktop (1920x1080)
mcp_playwright_playwright_navigate({ 
  url: "http://localhost:5173", 
  width: 1920, 
  height: 1080 
})
mcp_playwright_playwright_screenshot({ 
  name: "desktop-home", 
  fullPage: true 
})

// 4. Verify grid layouts
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3-4 columns
```

### Scenario: Test Error Handling

```typescript
// 1. Test corrupted localStorage
mcp_playwright_playwright_evaluate({ 
  script: "() => { localStorage.setItem('lovabolt-project', 'invalid json'); }" 
})
mcp_playwright_playwright_navigate({ url: "http://localhost:5173" })

// 2. Verify graceful handling
const errors = await mcp_playwright_playwright_console_logs({ type: "error" })
// Should not crash, should clear corrupted data

// 3. Test invalid input
mcp_playwright_playwright_fill({ 
  selector: "input[name='projectName']", 
  value: "" 
})
mcp_playwright_playwright_click({ 
  selector: "button:has-text('Continue')" 
})
// Verify validation message appears

// 4. Test AI feature error
// Inject error in AI component
// Verify error boundary catches it
// Verify fallback UI displays
```

## Test Documentation Standards

### Screenshot Naming Convention

Use this format: `{phase}-{feature}-{state}.png`

Examples:
- `01-smart-defaults-portfolio-applied.png`
- `02-background-step-aurora-selected.png`
- `03-wizard-flow-step-05-complete.png`
- `04-responsive-mobile-home.png`
- `05-accessibility-focus-state.png`

### Test Result Documentation

For each test, document:
1. **Test ID**: Phase and task number
2. **Feature**: What's being tested
3. **Expected**: What should happen
4. **Actual**: What actually happened
5. **Status**: Pass/Fail
6. **Evidence**: Screenshot filename(s)
7. **Notes**: Any observations

Example:
```markdown
## Test 1.2: Portfolio Smart Defaults

- **Test ID**: Phase 1, Task 1.2
- **Feature**: Smart Defaults for Portfolio project type
- **Expected**: Minimalist design, Monochrome colors, Aurora background pre-selected
- **Actual**: All defaults applied correctly
- **Status**: ✅ PASS
- **Evidence**: 
  - 01-smart-defaults-portfolio-applied.png
  - 01-smart-defaults-design-selected.png
  - 01-smart-defaults-color-selected.png
- **Performance**: 42ms (target: <50ms)
- **Notes**: Notification displayed with clear reasoning
```

### Performance Measurement Documentation

For each performance test, document:
```markdown
## Performance Test: Smart Defaults

- **Feature**: Smart Defaults application
- **Target**: < 50ms
- **Measurements**:
  - Run 1: 45ms
  - Run 2: 48ms
  - Run 3: 42ms
  - Run 4: 46ms
  - Run 5: 44ms
- **Average**: 45ms
- **Status**: ✅ PASS (45ms < 50ms)
- **Notes**: Consistent performance across runs
```

## Troubleshooting Guide

### Chrome DevTools MCP Issues (Primary Tool)

#### Issue: Element UID Not Found

**Symptoms**: Click fails because UID doesn't exist

**Solutions**:
1. Take a fresh snapshot - UIDs change on page updates
```typescript
mcp_chrome_devtools_take_snapshot()
// Review output to find current UIDs
mcp_chrome_devtools_click({ uid: "new_uid_from_snapshot" })
```

2. Wait for content to load before taking snapshot
```typescript
mcp_chrome_devtools_wait_for({ text: "Expected content" })
mcp_chrome_devtools_take_snapshot()
```

#### Issue: Page Not Responding

**Symptoms**: Commands execute but page doesn't update

**Solutions**:
1. Check if page is still loading
```typescript
mcp_chrome_devtools_wait_for({ text: "Page loaded indicator" })
```

2. Verify you're on the correct page
```typescript
mcp_chrome_devtools_list_pages()
mcp_chrome_devtools_select_page({ pageIdx: 0 })
```

#### Issue: Screenshot Shows Wrong State

**Symptoms**: Screenshot captured before action completes

**Solutions**:
1. Wait for expected text before screenshot
```typescript
mcp_chrome_devtools_click({ uid: "button_uid" })
mcp_chrome_devtools_wait_for({ text: "Action completed" })
mcp_chrome_devtools_take_screenshot({ fullPage: true })
```

### Playwright MCP Issues (Backup Tool)

#### Issue: Element Not Found

**Symptoms**: Playwright can't find selector (30-second timeout)

**Solutions**:
1. **RECOMMENDED**: Switch to Chrome DevTools MCP
```typescript
// Instead of Playwright with selectors
mcp_playwright_playwright_click({ selector: "button:has-text('Continue')" })

// Use Chrome DevTools with UIDs
mcp_chrome_devtools_take_snapshot()
mcp_chrome_devtools_click({ uid: "button_uid_from_snapshot" })
```

2. If you must use Playwright, wait for element
```typescript
mcp_playwright_playwright_wait_for({ text: "Expected text", timeout: 5000 })
```

3. Check if element is in iframe
```typescript
mcp_playwright_playwright_iframe_click({ 
  iframeSelector: "iframe", 
  selector: "button" 
})
```

### Issue: Performance Measurements Inconsistent

**Symptoms**: Timing varies wildly between runs

**Solutions**:
1. Run multiple times and average
```typescript
const times = []
for (let i = 0; i < 5; i++) {
  const start = performance.now()
  // ... action
  const end = performance.now()
  times.push(end - start)
}
const average = times.reduce((a, b) => a + b) / times.length
```

2. Clear cache between runs
```typescript
mcp_playwright_playwright_evaluate({ 
  script: "() => { localStorage.clear(); sessionStorage.clear(); }" 
})
```

3. Use Chrome DevTools for more accurate profiling
```typescript
mcp_chrome_devtools_performance_start_trace({ reload: true })
// ... actions
mcp_chrome_devtools_performance_stop_trace()
```

### Issue: Modal Not Closing

**Symptoms**: Modal stays open after close attempt

**Solutions**:
1. Try multiple close methods
```typescript
// Method 1: Escape key
mcp_playwright_playwright_press_key({ key: "Escape" })

// Method 2: X button
mcp_playwright_playwright_click({ selector: "[aria-label='Close']" })

// Method 3: Click outside
mcp_playwright_playwright_click({ selector: ".modal-backdrop" })
```

2. Wait for animation to complete
```typescript
mcp_playwright_playwright_press_key({ key: "Escape" })
await new Promise(resolve => setTimeout(resolve, 500)) // Wait for animation
```

### Issue: Accessibility Scan Shows False Positives

**Symptoms**: Violations reported that aren't actually issues

**Solutions**:
1. Verify manually with actual screen reader
2. Check if violation is contextual (e.g., decorative images don't need alt text)
3. Document why violation is acceptable if it is
4. Focus on critical violations first

### Issue: Console Errors During Testing

**Symptoms**: Errors appear in console during test execution

**Solutions**:
1. Capture and analyze errors
```typescript
const errors = await mcp_playwright_playwright_console_logs({ type: "error" })
```

2. Determine if errors are test-related or application-related
3. Fix application errors immediately
4. Document test-related errors and adjust test approach

## Best Practices

### Chrome DevTools MCP Best Practices

**DO:**
✅ **Always take a snapshot before clicking** - UIDs are your source of truth
✅ **Wait for content before taking snapshots** - Ensures elements are loaded
✅ **Use fullPage: true for screenshots** - Captures complete page state
✅ **Save screenshots to test-results/ directory** - Organized evidence
✅ **Check console logs after major actions** - Catch errors early
✅ **Use wait_for to verify state changes** - Ensures actions completed
✅ **Review snapshot output carefully** - Find correct UIDs before clicking
✅ **Take screenshots at every validation point** - Visual evidence
✅ **Clear state before each test** - Consistent starting point

**DON'T:**
❌ **Don't reuse old UIDs** - They change when page updates
❌ **Don't skip snapshots** - You need UIDs to interact with elements
❌ **Don't click without verifying UID exists** - Will cause failures
❌ **Don't assume page is ready** - Always wait for expected content
❌ **Don't ignore console errors** - They indicate real problems
❌ **Don't take screenshots before actions complete** - Wait for state changes

### General Testing Best Practices

**DO:**
✅ Clear state before each test
✅ Measure performance multiple times
✅ Document failures immediately with reproduction steps
✅ Use descriptive names for screenshots
✅ Verify expected outcomes explicitly
✅ Run accessibility scans on every page
✅ Monitor console for errors
✅ Save all test artifacts

### DON'T:
❌ Skip prerequisite steps
❌ Assume previous state
❌ Ignore console warnings
❌ Skip screenshot capture
❌ Test only happy paths
❌ Ignore performance targets
❌ Skip accessibility testing
❌ Test without clearing cache
❌ Proceed after critical failures
❌ Forget to document results

## Integration with Spec Files

This steering guide implements the testing plan defined in:

- **Requirements**: `.kiro/specs/comprehensive-testing-validation/requirements.md`
- **Design**: `.kiro/specs/comprehensive-testing-validation/design.md`
- **Tasks**: `.kiro/specs/comprehensive-testing-validation/tasks.md`

Always reference the spec files for:
- What to test (requirements)
- How to organize tests (design)
- When to test (tasks)

Use this steering guide for:
- How to execute tests (patterns)
- Which MCP server to use (selection guide)
- How to document results (standards)
- How to troubleshoot issues (troubleshooting)

## Success Checklist

Before marking testing complete, verify:

- [ ] All 250+ test scenarios executed
- [ ] 200+ screenshots captured and organized
- [ ] All performance measurements documented
- [ ] All accessibility scans completed
- [ ] All console errors documented
- [ ] Test report generated
- [ ] Issues prioritized and documented
- [ ] Recommendations provided
- [ ] Coverage calculated (target: 95%+)
- [ ] All critical paths passing (target: 100%)

## Questions?

For questions about:
- **What to test**: See requirements.md in spec
- **Test organization**: See design.md in spec
- **Test execution order**: See tasks.md in spec
- **How to execute**: Use this steering guide
- **MCP commands**: See MCP_USAGE_GUIDE.md in spec

Ready to test? Start with Phase 1, Task 1 and follow the patterns in this guide!

