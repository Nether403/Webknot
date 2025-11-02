# MCP Testing and Validation Guide

## Overview

This guide provides instructions for using Model Context Protocol (MCP) tools during implementation and testing of web applications. MCP tools enable automated browser testing, visual validation, and debugging without manual intervention.

MCP tools are particularly valuable for:
- Verifying actual rendered output (not just intermediate state)
- Capturing visual evidence of features working
- Testing user interactions end-to-end
- Debugging issues with real browser context
- Ensuring accessibility and performance standards

## Available MCP Tools

### Chrome DevTools MCP (PRIMARY TOOL - RECOMMENDED)

**Status**: Primary tool for most testing scenarios.

**Best for:**
- User interaction simulation (clicks, typing, navigation)
- Taking page snapshots to get element UIDs
- Screenshot capture for visual validation
- Console log monitoring
- Performance profiling and analysis
- Network request monitoring
- Accessibility tree inspection
- Debugging with real browser context

**Why Chrome DevTools is Primary:**
- Uses accessibility tree UIDs instead of fragile CSS selectors
- Handles dynamic content and React apps reliably
- No timeout issues with complex applications
- Comprehensive debugging capabilities

**Standard Workflow:**
```typescript
// 1. Navigate to page
mcp_chrome_devtools_navigate_page({ url: "http://localhost:3000" })

// 2. Take snapshot to get element UIDs
mcp_chrome_devtools_take_snapshot()

// 3. Interact using UIDs from snapshot
mcp_chrome_devtools_click({ uid: "element_uid_from_snapshot" })

// 4. Wait for expected content
mcp_chrome_devtools_wait_for({ text: "Expected text" })

// 5. Capture evidence
mcp_chrome_devtools_take_screenshot({ 
  fullPage: true, 
  filePath: "test-results/feature-working.png" 
})
```

### Playwright MCP (BACKUP TOOL)

**Status**: Backup tool for specific scenarios.

**Use when:**
- Cross-browser testing is required (Firefox, WebKit)
- Chrome DevTools cannot accomplish the task
- Testing simple static pages

**Note**: Playwright may encounter selector timeout issues with complex React applications. If you experience issues, switch to Chrome DevTools MCP.

## Common Testing Patterns

### Pattern 1: Testing a New Component

**After implementing a component, validate with Chrome DevTools:**

```typescript
// 1. Navigate to the application
mcp_chrome_devtools_navigate_page({
  url: "http://localhost:3000/your-component-route"
})

// 2. Wait for component to load
mcp_chrome_devtools_wait_for({ text: "Component Title or Key Text" })

// 3. Take snapshot to see page structure and get element UIDs
mcp_chrome_devtools_take_snapshot()

// 4. Take screenshot of initial state
mcp_chrome_devtools_take_screenshot({
  fullPage: true,
  filePath: "test-results/component-initial.png"
})

// 5. Interact with component (using UID from snapshot)
mcp_chrome_devtools_click({ uid: "button_uid_from_snapshot" })

// 6. Wait for expected result
mcp_chrome_devtools_wait_for({ text: "Expected result text" })

// 7. Take screenshot of result state
mcp_chrome_devtools_take_screenshot({
  fullPage: true,
  filePath: "test-results/component-after-interaction.png"
})

// 8. Check for console errors
mcp_chrome_devtools_list_console_messages({ types: ["error"] })
```

### Pattern 2: Testing Form Submission

```typescript
// 1. Navigate to form page
mcp_chrome_devtools_navigate_page({ url: "http://localhost:3000/form" })

// 2. Take snapshot to get form field UIDs
mcp_chrome_devtools_take_snapshot()

// 3. Fill form fields (using UIDs from snapshot)
mcp_chrome_devtools_fill({ uid: "name_input_uid", value: "Test User" })
mcp_chrome_devtools_fill({ uid: "email_input_uid", value: "test@example.com" })

// 4. Take screenshot of filled form
mcp_chrome_devtools_take_screenshot({
  filePath: "test-results/form-filled.png"
})

// 5. Submit form
mcp_chrome_devtools_click({ uid: "submit_button_uid" })

// 6. Wait for success message
mcp_chrome_devtools_wait_for({ text: "Success" })

// 7. Capture success state
mcp_chrome_devtools_take_screenshot({
  filePath: "test-results/form-submitted.png"
})
```

### Pattern 3: Testing Modal/Dialog Interactions

```typescript
// 1. Navigate to page with modal trigger
mcp_chrome_devtools_navigate_page({ url: "http://localhost:3000" })

// 2. Take snapshot to find trigger button
mcp_chrome_devtools_take_snapshot()

// 3. Open modal
mcp_chrome_devtools_click({ uid: "open_modal_button_uid" })

// 4. Wait for modal to appear
mcp_chrome_devtools_wait_for({ text: "Modal Title" })

// 5. Screenshot modal open state
mcp_chrome_devtools_take_screenshot({
  filePath: "test-results/modal-open.png"
})

// 6. Test modal interactions (copy, submit, etc.)
mcp_chrome_devtools_take_snapshot() // Get modal element UIDs
mcp_chrome_devtools_click({ uid: "modal_action_button_uid" })

// 7. Close modal (Escape key or close button)
mcp_chrome_devtools_evaluate_script({
  function: "() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); }"
})

// 8. Verify modal closed
mcp_chrome_devtools_take_screenshot({
  filePath: "test-results/modal-closed.png"
})
```

### Pattern 4: Testing Multi-Step Flows

```typescript
// 1. Start fresh - clear state
mcp_chrome_devtools_navigate_page({ url: "http://localhost:3000" })
mcp_chrome_devtools_evaluate_script({
  function: "() => { localStorage.clear(); sessionStorage.clear(); }"
})
mcp_chrome_devtools_navigate_page({ url: "http://localhost:3000" })

// 2. Step 1: Initial form/page
mcp_chrome_devtools_wait_for({ text: "Step 1" })
mcp_chrome_devtools_take_snapshot()
mcp_chrome_devtools_fill({ uid: "step1_input_uid", value: "Test Data" })
mcp_chrome_devtools_take_screenshot({
  filePath: "test-results/flow-step-1.png"
})
mcp_chrome_devtools_click({ uid: "continue_button_uid" })

// 3. Step 2: Next page
mcp_chrome_devtools_wait_for({ text: "Step 2" })
mcp_chrome_devtools_take_snapshot()
mcp_chrome_devtools_click({ uid: "option_uid" })
mcp_chrome_devtools_take_screenshot({
  filePath: "test-results/flow-step-2.png"
})
mcp_chrome_devtools_click({ uid: "continue_button_uid" })

// 4. Step 3: Final page/confirmation
mcp_chrome_devtools_wait_for({ text: "Complete" })
mcp_chrome_devtools_take_screenshot({
  fullPage: true,
  filePath: "test-results/flow-complete.png"
})

// 5. Verify state persistence
mcp_chrome_devtools_evaluate_script({
  function: "() => { return localStorage.getItem('your-app-state-key'); }"
})
```

### Pattern 5: Testing Generated/Dynamic Content

```typescript
// 1. Navigate to page that generates content
mcp_chrome_devtools_navigate_page({ url: "http://localhost:3000/generator" })

// 2. Trigger content generation
mcp_chrome_devtools_take_snapshot()
mcp_chrome_devtools_click({ uid: "generate_button_uid" })

// 3. Wait for generation to complete
mcp_chrome_devtools_wait_for({ text: "Generated content indicator" })

// 4. Take snapshot to see generated content structure
mcp_chrome_devtools_take_snapshot()

// 5. Screenshot the ACTUAL generated content (not just state)
mcp_chrome_devtools_take_screenshot({
  fullPage: true,
  filePath: "test-results/generated-content.png"
})

// 6. Verify specific content exists in the rendered output
// Review screenshot to confirm expected text/elements are visible

// ❌ DON'T just check localStorage or component state
// ✅ DO verify the actual rendered output users will see
```

## Advanced Chrome DevTools Features

### Accessibility Testing

```typescript
// 1. Navigate to page
mcp_chrome_devtools_navigate_page({
  url: "http://localhost:3000/your-page"
})

// 2. Take accessibility snapshot (verbose mode shows full a11y tree)
mcp_chrome_devtools_take_snapshot({
  verbose: true
})

// Review snapshot output to verify:
// - All interactive elements have proper roles
// - Form inputs have labels
// - Buttons have accessible names
// - Selection/state changes are announced
// - Focus indicators are present

// 3. Check console for accessibility warnings
mcp_chrome_devtools_list_console_messages({
  types: ["error", "warn"]
})
```

### Performance Testing

```typescript
// 1. Start performance trace
mcp_chrome_devtools_performance_start_trace({
  reload: true,
  autoStop: false
})

// 2. Interact with page (perform actions you want to measure)
mcp_chrome_devtools_click({ uid: "action_button_uid" })
mcp_chrome_devtools_wait_for({ text: "Result" })

// 3. Stop trace
mcp_chrome_devtools_performance_stop_trace()

// Review insights for performance issues:
// - Long tasks (>50ms)
// - Layout shifts (CLS)
// - Render blocking resources
// - Largest Contentful Paint (LCP)

// 4. Analyze specific insights
mcp_chrome_devtools_performance_analyze_insight({
  insightName: "LCPBreakdown"
})
```

### Network Request Monitoring

```typescript
// 1. Navigate and monitor
mcp_chrome_devtools_navigate_page({
  url: "http://localhost:3000"
})

// 2. List network requests
mcp_chrome_devtools_list_network_requests({
  resourceTypes: ["script", "stylesheet", "fetch", "xhr"]
})

// Verify:
// - No unnecessary requests
// - Assets load efficiently
// - No 404 errors
// - API calls return expected status codes

// 3. Inspect specific request
mcp_chrome_devtools_get_network_request({
  reqid: 123 // from list_network_requests output
})
```

### Console Monitoring

```typescript
// 1. Navigate to page
mcp_chrome_devtools_navigate_page({
  url: "http://localhost:3000"
})

// 2. Perform actions that might log messages
mcp_chrome_devtools_click({ uid: "action_uid" })

// 3. Check for errors
mcp_chrome_devtools_list_console_messages({
  types: ["error"]
})

// 4. Check for warnings
mcp_chrome_devtools_list_console_messages({
  types: ["warn"]
})

// 5. Get specific console message details
mcp_chrome_devtools_get_console_message({
  msgid: 456 // from list_console_messages output
})
```

## Best Practices

### Chrome DevTools Best Practices

**DO:**
- ✅ Always take a snapshot before clicking to get current UIDs
- ✅ Wait for content to load before taking snapshots
- ✅ Use `fullPage: true` for screenshots to capture complete state
- ✅ Save screenshots to `test-results/` directory with descriptive names
- ✅ Check console logs after major actions
- ✅ Use `wait_for` to verify state changes completed
- ✅ Review snapshot output carefully to find correct UIDs
- ✅ Take screenshots at every validation point

**DON'T:**
- ❌ Don't reuse old UIDs - they change when page updates
- ❌ Don't skip snapshots - you need UIDs to interact with elements
- ❌ Don't click without verifying UID exists in latest snapshot
- ❌ Don't assume page is ready - always wait for expected content
- ❌ Don't ignore console errors - they indicate real problems
- ❌ Don't take screenshots before actions complete

### Screenshot Strategy

Capture screenshots at these key moments:

1. **Initial State**: Before any interaction
2. **After User Action**: After clicks, form fills, selections
3. **Success State**: When operation completes successfully
4. **Error State**: When errors occur (for error handling tests)
5. **Modal/Dialog State**: When overlays are open
6. **Responsive States**: At different viewport sizes (mobile, tablet, desktop)
7. **Final State**: End result of multi-step flows

**Naming Convention**: `{feature}-{state}.png`
- Examples: `login-form-filled.png`, `modal-open.png`, `checkout-complete.png`

### State Management Between Tests

```typescript
// Clear all state before starting a test
mcp_chrome_devtools_evaluate_script({
  function: "() => { localStorage.clear(); sessionStorage.clear(); }"
})

// Reload to ensure clean state
mcp_chrome_devtools_navigate_page({ url: "http://localhost:3000" })
```

### Error Detection

```typescript
// Check console for errors after each major action
mcp_chrome_devtools_list_console_messages({
  types: ["error"]
})

// Check for warnings that might indicate issues
mcp_chrome_devtools_list_console_messages({
  types: ["warn"]
})

// Verify no error messages in UI
// Take screenshot and review for error text, error boundaries, etc.
```

## Troubleshooting Common Issues

### Issue: Element UID Not Found

**Symptoms**: Click fails because UID doesn't exist

**Solutions**:
```typescript
// 1. Take a fresh snapshot - UIDs change on page updates
mcp_chrome_devtools_take_snapshot()
// Review output to find current UIDs
mcp_chrome_devtools_click({ uid: "new_uid_from_snapshot" })

// 2. Wait for content to load before taking snapshot
mcp_chrome_devtools_wait_for({ text: "Expected content" })
mcp_chrome_devtools_take_snapshot()
```

### Issue: Page Not Responding

**Symptoms**: Commands execute but page doesn't update

**Solutions**:
```typescript
// 1. Check if page is still loading
mcp_chrome_devtools_wait_for({ text: "Page loaded indicator" })

// 2. Verify you're on the correct page
mcp_chrome_devtools_list_pages()
mcp_chrome_devtools_select_page({ pageIdx: 0 })

// 3. Check console for JavaScript errors
mcp_chrome_devtools_list_console_messages({ types: ["error"] })
```

### Issue: Screenshot Shows Wrong State

**Symptoms**: Screenshot captured before action completes

**Solutions**:
```typescript
// Wait for expected text/element before screenshot
mcp_chrome_devtools_click({ uid: "button_uid" })
mcp_chrome_devtools_wait_for({ text: "Action completed" })
mcp_chrome_devtools_take_screenshot({ fullPage: true })
```

### Issue: Modal/Dialog Not Closing

**Symptoms**: Modal stays open after close attempt

**Solutions**:
```typescript
// Method 1: Escape key via script
mcp_chrome_devtools_evaluate_script({
  function: "() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); }"
})

// Method 2: Click close button (get UID from snapshot)
mcp_chrome_devtools_take_snapshot()
mcp_chrome_devtools_click({ uid: "close_button_uid" })

// Method 3: Click backdrop/overlay
mcp_chrome_devtools_click({ uid: "backdrop_uid" })
```

### Issue: Form Input Not Accepting Value

**Symptoms**: Fill command doesn't update input field

**Solutions**:
```typescript
// 1. Ensure you have the correct input UID from snapshot
mcp_chrome_devtools_take_snapshot()
// Find the input element UID

// 2. Use fill with correct UID
mcp_chrome_devtools_fill({ uid: "input_uid", value: "Test Value" })

// 3. Verify value was set
mcp_chrome_devtools_take_screenshot({ filePath: "test-results/input-filled.png" })
```

## Test Execution Workflow

### For Each Feature Implementation:

1. **Implement the feature** (write the code)
2. **Start dev server** (if not running: `npm run dev`, `yarn dev`, etc.)
3. **Navigate to feature** using Chrome DevTools MCP
4. **Take snapshot** to understand page structure
5. **Interact with feature** using UIDs from snapshot
6. **Capture screenshots** at each validation point
7. **Check console logs** for errors
8. **Verify actual output** (not just state/props)
9. **Document evidence** with descriptive screenshot names

### Complete Feature Test Checklist:

- [ ] Feature implemented and dev server running
- [ ] Navigated to feature page
- [ ] Initial state screenshot captured
- [ ] User interactions tested (clicks, form fills, etc.)
- [ ] Expected results verified with screenshots
- [ ] Console checked for errors
- [ ] No assumptions made - actual output verified
- [ ] Evidence documented in test-results/ directory

### Multi-Step Flow Testing:

1. **Clear state** (localStorage, sessionStorage)
2. **Navigate to start** of flow
3. **Document each step** with screenshots
4. **Verify state persistence** (if applicable)
5. **Test final output** (the actual thing users see)
6. **Check for errors** throughout flow
7. **Verify no regressions** in related features

## MCP Tool Configuration

### Chrome DevTools MCP Configuration

Add to your `.kiro/settings/mcp.json` (workspace) or `~/.kiro/settings/mcp.json` (user):

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-chrome-devtools"],
      "disabled": false,
      "autoApprove": [
        "navigate_page",
        "take_snapshot",
        "take_screenshot",
        "click",
        "fill",
        "wait_for",
        "list_console_messages",
        "evaluate_script"
      ]
    }
  }
}
```

### Playwright MCP Configuration (Optional)

Only add if you need cross-browser testing:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "disabled": false,
      "autoApprove": [
        "playwright_navigate",
        "playwright_screenshot",
        "playwright_click",
        "playwright_fill"
      ]
    }
  }
}
```

### Accessibility Scanner MCP Configuration (Optional)

For dedicated accessibility testing:

```json
{
  "mcpServers": {
    "accessibility-scanner": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-accessibility"],
      "disabled": false,
      "autoApprove": [
        "browser_navigate",
        "scan_page",
        "browser_snapshot"
      ]
    }
  }
}
```

## Validation Checklist

After implementing each feature, use MCP tools to verify:

### Functional Verification
- [ ] Feature renders without errors
- [ ] User interactions work as expected (clicks, form submissions, etc.)
- [ ] State updates correctly after interactions
- [ ] Navigation works (if applicable)
- [ ] Modals/dialogs open and close properly
- [ ] Form validation works correctly
- [ ] Error handling displays appropriate messages

### Visual Verification
- [ ] Initial state screenshot captured
- [ ] Post-interaction state screenshot captured
- [ ] Visual styling matches design requirements
- [ ] Responsive layout works on different viewports
- [ ] No visual regressions from previous state

### Technical Verification
- [ ] No console errors
- [ ] No console warnings (or warnings are expected/documented)
- [ ] Network requests succeed (no 404s, 500s)
- [ ] Performance is acceptable (no long tasks, layout shifts)
- [ ] Accessibility tree is correct (proper roles, labels)

### Evidence Verification
- [ ] Actual output verified (not just intermediate state)
- [ ] Screenshots show the thing being tested
- [ ] All prerequisite steps completed
- [ ] No assumptions made about functionality

## Documentation Standards

### Screenshot Organization

Save all screenshots to `test-results/` directory with descriptive names:

**Format**: `{feature}-{state}.png`

**Examples**:
- `login-form-initial.png`
- `login-form-filled.png`
- `login-success.png`
- `dashboard-loaded.png`
- `modal-open.png`
- `error-message-displayed.png`

### Test Result Documentation

For each test, document:
- **Feature**: What was tested
- **Steps**: Actions taken to test
- **Expected**: What should happen
- **Actual**: What actually happened
- **Evidence**: Screenshot filenames
- **Status**: Pass/Fail
- **Notes**: Any observations or issues

**Example**:
```markdown
## Test: User Login Flow

- **Feature**: User authentication
- **Steps**:
  1. Navigate to login page
  2. Fill email and password
  3. Click submit button
  4. Verify redirect to dashboard
- **Expected**: User logged in and redirected to dashboard
- **Actual**: User successfully logged in, dashboard displayed
- **Evidence**: 
  - login-form-filled.png
  - login-success.png
  - dashboard-loaded.png
- **Status**: ✅ PASS
- **Notes**: No console errors, smooth transition
```

This creates a visual record of implementation progress and helps identify regressions.

## Quick Reference

### Standard Testing Flow (Chrome DevTools)

```typescript
// 1. Navigate
mcp_chrome_devtools_navigate_page({ url: "http://localhost:3000/feature" })

// 2. Wait for load
mcp_chrome_devtools_wait_for({ text: "Key content" })

// 3. Snapshot (get UIDs)
mcp_chrome_devtools_take_snapshot()

// 4. Screenshot initial
mcp_chrome_devtools_take_screenshot({ 
  fullPage: true, 
  filePath: "test-results/feature-initial.png" 
})

// 5. Interact
mcp_chrome_devtools_click({ uid: "element_uid" })

// 6. Wait for result
mcp_chrome_devtools_wait_for({ text: "Expected result" })

// 7. Screenshot result
mcp_chrome_devtools_take_screenshot({ 
  fullPage: true, 
  filePath: "test-results/feature-result.png" 
})

// 8. Check errors
mcp_chrome_devtools_list_console_messages({ types: ["error"] })
```

### Key Principles

1. **Always verify actual output** - Take screenshots of what users see
2. **Use snapshots to get UIDs** - Don't guess element identifiers
3. **Wait for content** - Ensure page is ready before interacting
4. **Document with evidence** - Save screenshots with descriptive names
5. **Check for errors** - Monitor console after major actions
6. **Test the real thing** - Not just state/props/data structures

### When to Use Each Tool

- **Chrome DevTools MCP**: 95% of testing scenarios (PRIMARY)
- **Playwright MCP**: Cross-browser testing only (BACKUP)
- **Accessibility Scanner**: Dedicated WCAG compliance audits (OPTIONAL)

### Remember

- Verification = Seeing actual output, not inferring from state
- Friction = Normal (fill forms, navigate steps, etc.)
- Blockers = Solve them, don't skip verification
- Evidence = Screenshots of actual rendered output

For more details on verification standards, see `task-verification-standards.md`.
