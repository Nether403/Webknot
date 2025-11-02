# MCP Server Usage Guide for Testing

## Quick Reference

This guide provides quick examples of how to use each MCP server for testing LovaBolt.

## Playwright MCP

### Navigation
```typescript
// Navigate to application
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173",
  browserType: "chromium",
  headless: false
})

// Navigate back
mcp_playwright_playwright_go_back()

// Navigate forward
mcp_playwright_playwright_go_forward()
```

### Interactions
```typescript
// Click element
mcp_playwright_playwright_click({
  selector: "button:has-text('Continue')"
})

// Fill input
mcp_playwright_playwright_fill({
  selector: "input[name='projectName']",
  value: "Test Project"
})

// Hover over element
mcp_playwright_playwright_hover({
  selector: "[data-option-id='aurora']"
})

// Press key
mcp_playwright_playwright_press_key({
  key: "Escape"
})
```

### Screenshots
```typescript
// Take full page screenshot
mcp_playwright_playwright_screenshot({
  name: "wizard-step-1",
  savePng: true,
  fullPage: true
})

// Take element screenshot
mcp_playwright_playwright_screenshot({
  name: "selected-card",
  selector: "[data-option-id='aurora']",
  savePng: true
})
```

### Content Inspection
```typescript
// Get visible text
mcp_playwright_playwright_get_visible_text()

// Get HTML
mcp_playwright_playwright_get_visible_html({
  cleanHtml: true,
  removeScripts: true
})

// Wait for text
mcp_playwright_playwright_wait_for({
  text: "Smart defaults applied",
  timeout: 5000
})
```

### JavaScript Execution
```typescript
// Execute JavaScript
mcp_playwright_playwright_evaluate({
  script: "() => { return localStorage.getItem('lovabolt-project'); }"
})

// Clear localStorage
mcp_playwright_playwright_evaluate({
  script: "() => { localStorage.clear(); }"
})

// Get performance timing
mcp_playwright_playwright_evaluate({
  script: "() => { return performance.now(); }"
})
```

### Console Logs
```typescript
// Get console logs
mcp_playwright_playwright_console_logs({
  type: "error",
  clear: false
})

// Get all logs
mcp_playwright_playwright_console_logs({
  type: "all"
})
```

## Chrome DevTools MCP

### Page Navigation
```typescript
// Navigate to page
mcp_chrome_devtools_navigate_page({
  url: "http://localhost:5173",
  timeout: 5000
})

// List open pages
mcp_chrome_devtools_list_pages()

// Select page
mcp_chrome_devtools_select_page({
  pageIdx: 0
})
```

### Snapshots and Screenshots
```typescript
// Take accessibility snapshot
mcp_chrome_devtools_take_snapshot({
  verbose: true
})

// Take screenshot
mcp_chrome_devtools_take_screenshot({
  fullPage: true,
  format: "png"
})
```

### Interactions
```typescript
// Click element (using uid from snapshot)
mcp_chrome_devtools_click({
  uid: "element-uid-from-snapshot"
})

// Fill input
mcp_chrome_devtools_fill({
  uid: "input-uid",
  value: "Test value"
})

// Hover element
mcp_chrome_devtools_hover({
  uid: "element-uid"
})
```

### Console and Network
```typescript
// List console messages
mcp_chrome_devtools_list_console_messages({
  types: ["error", "warn"],
  pageSize: 50
})

// Get specific console message
mcp_chrome_devtools_get_console_message({
  msgid: 1
})

// List network requests
mcp_chrome_devtools_list_network_requests({
  resourceTypes: ["script", "stylesheet", "fetch"],
  pageSize: 100
})

// Get specific network request
mcp_chrome_devtools_get_network_request({
  reqid: 1
})
```

### Performance
```typescript
// Start performance trace
mcp_chrome_devtools_performance_start_trace({
  reload: true,
  autoStop: false
})

// Stop performance trace
mcp_chrome_devtools_performance_stop_trace()

// Analyze performance insight
mcp_chrome_devtools_performance_analyze_insight({
  insightName: "LCPBreakdown"
})
```

### Emulation
```typescript
// Emulate CPU throttling
mcp_chrome_devtools_emulate_cpu({
  throttlingRate: 4  // 4x slowdown
})

// Emulate network conditions
mcp_chrome_devtools_emulate_network({
  throttlingOption: "Fast 3G"
})
```

### JavaScript Evaluation
```typescript
// Evaluate script
mcp_chrome_devtools_evaluate_script({
  function: "() => { return document.title; }"
})

// Evaluate with element argument
mcp_chrome_devtools_evaluate_script({
  function: "(el) => { return el.innerText; }",
  args: [{ uid: "element-uid" }]
})
```

## Accessibility Scanner MCP

### Navigation
```typescript
// Navigate to page
mcp_accessibility_scanner_browser_navigate({
  url: "http://localhost:5173"
})

// Navigate back
mcp_accessibility_scanner_browser_navigate_back()
```

### Snapshots and Screenshots
```typescript
// Take accessibility snapshot
mcp_accessibility_scanner_browser_snapshot()

// Take screenshot
mcp_accessibility_scanner_browser_take_screenshot({
  filename: "accessibility-test.png",
  type: "png",
  fullPage: true
})
```

### Interactions
```typescript
// Click element (using ref from snapshot)
mcp_accessibility_scanner_browser_click({
  element: "Continue button",
  ref: "element-ref-from-snapshot"
})

// Type text
mcp_accessibility_scanner_browser_type({
  element: "Project name input",
  ref: "input-ref",
  text: "Test Project",
  submit: false
})

// Fill form
mcp_accessibility_scanner_browser_fill_form({
  fields: [
    {
      name: "Project Name",
      type: "textbox",
      ref: "input-ref-1",
      value: "Test Project"
    },
    {
      name: "Accept Terms",
      type: "checkbox",
      ref: "checkbox-ref",
      value: "true"
    }
  ]
})
```

### Accessibility Scanning
```typescript
// Scan page for violations
mcp_accessibility_scanner_scan_page({
  violationsTag: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]
})

// Scan with specific tags
mcp_accessibility_scanner_scan_page({
  violationsTag: ["cat.keyboard", "cat.aria", "cat.color"]
})
```

### Browser Controls
```typescript
// Resize browser
mcp_accessibility_scanner_browser_resize({
  width: 375,
  height: 667
})

// Press key
mcp_accessibility_scanner_browser_press_key({
  key: "Tab"
})

// Handle dialog
mcp_accessibility_scanner_browser_handle_dialog({
  accept: true,
  promptText: "Optional text for prompt"
})
```

### Console and Network
```typescript
// Get console messages
mcp_accessibility_scanner_browser_console_messages()

// Get network requests
mcp_accessibility_scanner_browser_network_requests()
```

### Tabs
```typescript
// List tabs
mcp_accessibility_scanner_browser_tabs({
  action: "list"
})

// Create new tab
mcp_accessibility_scanner_browser_tabs({
  action: "new"
})

// Close tab
mcp_accessibility_scanner_browser_tabs({
  action: "close",
  index: 1
})

// Select tab
mcp_accessibility_scanner_browser_tabs({
  action: "select",
  index: 0
})
```

## Common Testing Patterns

### Pattern 1: Complete Wizard Flow
```typescript
// 1. Navigate and clear state
mcp_playwright_playwright_navigate({ url: "http://localhost:5173" })
mcp_playwright_playwright_evaluate({ script: "() => localStorage.clear()" })
mcp_playwright_playwright_navigate({ url: "http://localhost:5173" })

// 2. Fill project setup
mcp_playwright_playwright_fill({ selector: "input[name='projectName']", value: "Test" })
mcp_playwright_playwright_click({ selector: "[data-project-type='Portfolio']" })
mcp_playwright_playwright_click({ selector: "button:has-text('Continue')" })

// 3. Navigate through steps
mcp_playwright_playwright_click({ selector: "button:has-text('Continue')" })
// ... repeat for each step

// 4. Verify final prompt
mcp_playwright_playwright_screenshot({ name: "final-prompt", fullPage: true })
```

### Pattern 2: Test AI Feature Performance
```typescript
// 1. Start timing
const startTime = await mcp_playwright_playwright_evaluate({
  script: "() => performance.now()"
})

// 2. Trigger AI feature
mcp_playwright_playwright_click({ selector: "button:has-text('Use Smart Defaults')" })

// 3. Wait for completion
mcp_playwright_playwright_wait_for({ text: "Smart defaults applied" })

// 4. End timing
const endTime = await mcp_playwright_playwright_evaluate({
  script: "() => performance.now()"
})

// 5. Calculate duration
const duration = endTime - startTime
// Verify < 50ms
```

### Pattern 3: Test Accessibility
```typescript
// 1. Navigate to step
mcp_accessibility_scanner_browser_navigate({ url: "http://localhost:5173/#/background" })

// 2. Take snapshot
mcp_accessibility_scanner_browser_snapshot()

// 3. Scan for violations
const violations = await mcp_accessibility_scanner_scan_page({
  violationsTag: ["wcag2aa", "wcag21aa"]
})

// 4. Verify no critical violations
// violations should be empty or only minor issues
```

### Pattern 4: Test Modal Interaction
```typescript
// 1. Navigate to step with modals
mcp_playwright_playwright_navigate({ url: "http://localhost:5173/#/background" })

// 2. Click "View Details"
mcp_playwright_playwright_click({ selector: "button:has-text('View Details')" })

// 3. Verify modal opened
mcp_playwright_playwright_screenshot({ name: "modal-open" })

// 4. Test copy functionality
mcp_playwright_playwright_click({ selector: "button:has-text('Copy')" })

// 5. Close with Escape
mcp_playwright_playwright_press_key({ key: "Escape" })

// 6. Verify modal closed
mcp_playwright_playwright_screenshot({ name: "modal-closed" })
```

### Pattern 5: Test Responsive Design
```typescript
// 1. Test mobile
mcp_playwright_playwright_navigate({ url: "http://localhost:5173", width: 375, height: 667 })
mcp_playwright_playwright_screenshot({ name: "mobile-view", fullPage: true })

// 2. Test tablet
mcp_playwright_playwright_navigate({ url: "http://localhost:5173", width: 768, height: 1024 })
mcp_playwright_playwright_screenshot({ name: "tablet-view", fullPage: true })

// 3. Test desktop
mcp_playwright_playwright_navigate({ url: "http://localhost:5173", width: 1920, height: 1080 })
mcp_playwright_playwright_screenshot({ name: "desktop-view", fullPage: true })
```

### Pattern 6: Test Console Errors
```typescript
// 1. Navigate to application
mcp_playwright_playwright_navigate({ url: "http://localhost:5173" })

// 2. Complete wizard flow
// ... (navigate through steps)

// 3. Check console for errors
const errors = await mcp_playwright_playwright_console_logs({ type: "error" })

// 4. Verify no errors
// errors should be empty
```

## Tips and Best Practices

### Screenshots
- Always use descriptive names: `step-name-state.png`
- Save to test-results directory
- Capture both success and failure states
- Use fullPage for complete views

### Performance Testing
- Run tests multiple times for accuracy
- Clear cache between runs
- Measure from user action to visible result
- Document all measurements

### Accessibility Testing
- Test keyboard navigation manually
- Use automated scanner for WCAG
- Verify with actual screen reader when possible
- Check color contrast with DevTools

### Error Handling
- Always wrap in try-catch
- Log all errors with context
- Take screenshot on failure
- Document reproduction steps

### State Management
- Clear localStorage before tests
- Verify state after each action
- Test state persistence
- Test state restoration

## Troubleshooting

### Issue: Element not found
```typescript
// Solution: Wait for element
mcp_playwright_playwright_wait_for({ text: "Expected text", timeout: 5000 })
```

### Issue: Click not working
```typescript
// Solution: Hover first, then click
mcp_playwright_playwright_hover({ selector: "button" })
mcp_playwright_playwright_click({ selector: "button" })
```

### Issue: Modal not closing
```typescript
// Solution: Try multiple methods
mcp_playwright_playwright_press_key({ key: "Escape" })
// OR
mcp_playwright_playwright_click({ selector: "[aria-label='Close']" })
```

### Issue: Performance timing inconsistent
```typescript
// Solution: Run multiple times and average
const times = []
for (let i = 0; i < 5; i++) {
  const start = performance.now()
  // ... action
  const end = performance.now()
  times.push(end - start)
}
const average = times.reduce((a, b) => a + b) / times.length
```

## Ready to Test!

Use this guide as a reference while executing the test plan. Each MCP server has specific strengths:

- **Playwright**: Best for user interactions and E2E flows
- **Chrome DevTools**: Best for performance and network analysis
- **Accessibility Scanner**: Best for WCAG compliance

Choose the right tool for each test scenario!

