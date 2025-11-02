# AI Algorithms Documentation

## Overview

This document provides detailed technical documentation for the AI-powered features in LovaBolt. These algorithms enhance the user experience by providing intelligent defaults, analyzing prompt quality, checking design compatibility, and parsing natural language input.

## Core Principles

All AI features in LovaBolt follow these principles:

1. **Non-Intrusive**: AI suggestions never block the user workflow
2. **Transparent**: Always explain why suggestions are made
3. **Overridable**: Users maintain final control over all decisions
4. **Performant**: All operations complete in <200ms
5. **Graceful Degradation**: Features work even if AI components fail

## 1. Smart Defaults System

### Purpose

Automatically suggests appropriate design choices based on project type, reducing the time needed to complete the wizard.

### Algorithm

**File**: `src/utils/smartDefaults.ts`

#### Data Structure

The system uses a configuration object that maps project types to recommended settings:

```typescript
SMART_DEFAULTS = {
  'Portfolio': {
    layout: 'single-column',
    designStyle: 'minimalist',
    colorTheme: 'monochrome-modern',
    typography: { ... },
    functionality: ['basic-package'],
    background: 'aurora',
    components: ['carousel', 'bento-grid', 'animated-testimonials'],
    animations: ['fade-in', 'slide-in', 'scroll-reveal']
  },
  // ... other project types
}
```

#### Selection Logic

1. **Lookup**: Find defaults for the selected project type
2. **Confidence Calculation**: Base confidence is 0.85 for known project types
3. **Reasoning Generation**: Create human-readable explanation
4. **Application**: Only apply to fields that are not already set by the user

#### Confidence Scoring

- **Known Project Type**: 0.85 (85% confidence)
- **Unknown Project Type**: 0.0 (no defaults available)

Future enhancements could analyze the project purpose string to adjust confidence.

#### Application Rules

```typescript
// Only apply if field is not set
if (!currentState.selectedLayout && defaults.layout) {
  result.layout = defaults.layout;
}
```

This ensures user choices are never overridden.

### Mappings by Project Type

#### Portfolio
- **Layout**: Single-column (focuses attention on work)
- **Design Style**: Minimalist (clean, professional)
- **Color Theme**: Monochrome Modern (timeless, sophisticated)
- **Components**: Carousel, Bento Grid, Animated Testimonials
- **Animations**: Fade-in, Slide-in, Scroll-reveal
- **Rationale**: Portfolios should showcase work without distraction

#### E-commerce
- **Layout**: Grid layout (displays products efficiently)
- **Design Style**: Material Design (familiar, trustworthy)
- **Color Theme**: Tech Neon (vibrant, attention-grabbing)
- **Components**: Carousel, Card, Hover Card, Animated Modal, Shimmer Button
- **Animations**: Hover-lift, Scale-in, Loading-spinner
- **Rationale**: E-commerce needs clear product display and interactive elements

#### Dashboard
- **Layout**: Sidebar layout (efficient navigation)
- **Design Style**: Modern Corporate (professional, data-focused)
- **Color Theme**: Professional Blue (trustworthy, calm)
- **Components**: Sidebar, Tabs, Bento Grid, Timeline, Animated List
- **Animations**: Fade-in, Stagger-children, Skeleton-loader
- **Rationale**: Dashboards prioritize data visualization and navigation

#### Web App
- **Layout**: App layout (application-style interface)
- **Design Style**: Glassmorphism (modern, engaging)
- **Color Theme**: Tech Neon (dynamic, tech-forward)
- **Components**: Navbar Menu, Tabs, Animated Modal, Animated Tooltip, Card
- **Animations**: Fade-in, Slide-in, Page-transition, Loading-spinner
- **Rationale**: Web apps need interactive, app-like experiences

#### Mobile App
- **Layout**: Mobile-first (optimized for small screens)
- **Design Style**: Minimalist (clean, touch-friendly)
- **Color Theme**: Vibrant Modern (engaging, energetic)
- **Components**: Card Stack, Tabs, Animated List, Shimmer Button
- **Animations**: Slide-in, Bounce-in, Swipe-gestures
- **Rationale**: Mobile apps need touch-optimized, gesture-friendly interfaces

#### Website
- **Layout**: Single-column (traditional web layout)
- **Design Style**: Modern Corporate (professional, versatile)
- **Color Theme**: Professional Blue (trustworthy, universal)
- **Components**: Carousel, Accordion, Card, Animated Testimonials
- **Animations**: Fade-in, Scroll-reveal, Hover-lift
- **Rationale**: General websites need versatile, widely-applicable designs

### Performance

- **Lookup Time**: O(1) - Direct object access
- **Application Time**: O(n) - Linear with number of fields
- **Total Time**: <10ms typical

## 2. Prompt Analysis System

### Purpose

Evaluates generated prompts for completeness and quality, providing suggestions for improvement.

### Algorithm

**File**: `src/utils/promptAnalyzer.ts`

#### Analysis Rules

The system checks for the following criteria:

1. **Responsive Design** (High Severity)
   - Keywords: "responsive", "mobile"
   - Missing: -15 points, warning suggestion
   - Present: +3 points, strength

2. **Accessibility** (Medium Severity)
   - Keywords: "accessibility", "wcag", "aria"
   - Missing: -10 points, recommendation
   - Present: +3 points, strength

3. **Performance** (Medium Severity)
   - Keywords: "performance", "optimized", "fast"
   - Missing: -10 points, tip
   - Present: +3 points, strength

4. **SEO** (Medium Severity, Website only)
   - Keywords: "seo", "search engine"
   - Missing: -10 points, recommendation
   - Present: +3 points, strength

5. **Security** (High Severity, with auth)
   - Keywords: "security", "secure"
   - Context: Authentication mentioned
   - Missing: -15 points, warning
   - Present: +3 points, strength

6. **Error Handling** (Low Severity)
   - Keywords: "error", "validation"
   - Missing: -5 points, tip
   - Present: +3 points, strength

7. **Testing** (Low Severity)
   - Keywords: "test", "quality"
   - Missing: -5 points, tip
   - Present: +3 points, strength

8. **Component Count vs Style** (Low Severity)
   - Context: Minimalist style with >10 components
   - Issue: -5 points, tip
   - Suggestion: Reduce to 5-7 components

#### Scoring Algorithm

```typescript
score = 100
score -= weaknesses.length * 5
score -= high_severity_suggestions * 15
score -= medium_severity_suggestions * 10
score -= low_severity_suggestions * 5
score += min(strengths.length * 3, 20)  // Capped at +20
score = clamp(score, 0, 100)
```

#### Score Interpretation

- **90-100**: Excellent - Comprehensive, well-structured prompt
- **75-89**: Good - Solid prompt with minor improvements possible
- **60-74**: Fair - Acceptable but missing some important elements
- **0-59**: Poor - Significant improvements needed

#### Auto-Fix System

Auto-fixable suggestions can be automatically applied to the prompt:

1. **Locate Technical Section**: Find "## Technical Implementation"
2. **Insert Fixes**: Add missing requirements as bullet points
3. **Create Section**: If no technical section exists, create one
4. **Preserve Content**: Never remove or modify existing content

Example auto-fix:
```markdown
## Technical Implementation
- **Responsive Design:** Mobile-first approach with breakpoints
- **Accessibility:** WCAG 2.1 AA compliance
- **Performance:** Optimized loading and smooth interactions
```

### Performance

- **Analysis Time**: O(n) where n = prompt length
- **Typical Time**: 50-100ms for average prompts
- **Target**: <100ms

## 3. Design Compatibility Checker

### Purpose

Validates that design choices work well together, preventing conflicting selections.

### Algorithm

**File**: `src/utils/compatibilityChecker.ts`

#### Validation Rules

##### 1. Style + Color Theme Compatibility

**Minimalist + Many Colors**
- Condition: Minimalist style with >3 colors
- Severity: Medium
- Deduction: -10 points
- Suggestion: Use 2-3 colors for maximum impact

**Brutalism + Low Contrast**
- Condition: Brutalist style without high-contrast colors
- Severity: Low
- Deduction: -5 points
- Suggestion: Use high-contrast or bold colors

**Glassmorphism + Monochrome**
- Condition: Glassmorphism with monochrome theme
- Severity: Low
- Deduction: -5 points
- Suggestion: Use vibrant colors for better glass effects

##### 2. Component Count vs Design Style

**Minimalist + Many Components**
- Condition: Minimalist style with >7 components
- Severity: Medium
- Deduction: -10 points
- Suggestion: Reduce to 5-7 components

**Brutalism + Few Components**
- Condition: Brutalist style with <3 components
- Severity: Low
- Deduction: -5 points
- Suggestion: Add more visual components

##### 3. Functionality + Components Match

**Authentication without Login Components**
- Condition: Auth functionality but no login/auth components
- Severity: High
- Deduction: -20 points
- Suggestion: Add login form or authentication modal
- Auto-fixable: Yes

**E-commerce without Shopping Components**
- Condition: E-commerce functionality but no cart/product components
- Severity: High
- Deduction: -20 points
- Suggestion: Add shopping cart or product card
- Auto-fixable: Yes

##### 4. Background + Color Theme Compatibility

**Vibrant Background + Monochrome Theme**
- Condition: Neon/vibrant background with monochrome colors
- Severity: Medium
- Deduction: -10 points
- Suggestion: Use gradient or subtle background

**Subtle Background + Bold Theme**
- Condition: Subtle background with neon/vibrant colors
- Severity: Low
- Deduction: -5 points
- Suggestion: Use more dynamic background

##### 5. Animation Count

**Too Many Animations**
- Condition: >5 animations selected
- Severity: Low
- Deduction: -5 points
- Suggestion: Limit to 3-5 animations for performance

#### Scoring Algorithm

```typescript
score = 100
score -= high_severity_issues * 20
score -= medium_severity_issues * 15
score -= low_severity_issues * 10
score -= medium_severity_warnings * 10
score -= low_severity_warnings * 5
score = max(score, 0)
```

#### Harmony Levels

- **90-100**: Excellent - Perfect harmony, no conflicts
- **75-89**: Good - Minor issues, overall cohesive
- **60-74**: Fair - Some conflicts, improvements recommended
- **0-59**: Poor - Significant conflicts, changes needed

### Performance

- **Check Time**: O(1) - Fixed number of rules
- **Typical Time**: 20-50ms
- **Target**: <50ms

## 4. Natural Language Parser (NLP)

### Purpose

Parses project descriptions in plain English to automatically detect project type, design style, and color theme preferences.

### Algorithm

**File**: `src/utils/nlpParser.ts`

#### Keyword Mappings

The system uses comprehensive keyword dictionaries:

**Project Types** (6 types, 14-17 keywords each):
- Portfolio: "portfolio", "showcase", "personal site", "work samples", etc.
- E-commerce: "shop", "store", "sell", "products", "marketplace", etc.
- Dashboard: "dashboard", "admin", "analytics", "metrics", etc.
- Web App: "app", "application", "platform", "tool", "saas", etc.
- Mobile App: "mobile", "ios", "android", "phone", "tablet", etc.
- Website: "website", "site", "web", "landing page", etc.

**Design Styles** (9 styles, 8-14 keywords each):
- Material Design: "material", "google design", "elevation", etc.
- Minimalist: "minimal", "clean", "simple", "modern", etc.
- Glassmorphism: "glass", "frosted", "blur", "translucent", etc.
- Digital Brutalism: "brutalism", "bold", "raw", "edgy", etc.
- And more...

**Color Themes** (6 themes, 10-13 keywords each):
- Ocean Breeze: "blue", "ocean", "sea", "water", "calm", etc.
- Sunset Warmth: "orange", "warm", "sunset", "vibrant", etc.
- Monochrome Modern: "black", "white", "gray", "neutral", etc.
- And more...

#### Detection Algorithm

1. **Normalize Input**: Convert description to lowercase
2. **Match Keywords**: For each category, count matching keywords
3. **Score Options**: Assign score = number of matches
4. **Select Top Match**: Choose option with highest score
5. **Calculate Confidence**: Normalize score to 0-1 range
6. **Return Results**: Include detected options and confidence

#### Confidence Calculation

```typescript
// Project Type: max 3 matches = 1.0 confidence
confidence_projectType = min(matches / 3, 1.0)

// Design Style: max 2 matches = 1.0 confidence
confidence_designStyle = min(matches / 2, 1.0)

// Color Theme: max 2 matches = 1.0 confidence
confidence_colorTheme = min(matches / 2, 1.0)
```

#### Application Threshold

Only apply detections if:
- Confidence > 0.5 (50%)
- Field is not already set by user

This prevents low-confidence guesses and respects user choices.

#### Example Parsing

**Input**: "I want to build a clean portfolio site to showcase my design work with blue ocean colors"

**Detection**:
- Project Type: Portfolio (matches: "portfolio", "showcase", "design work") → confidence: 1.0
- Design Style: Minimalist (matches: "clean") → confidence: 0.5
- Color Theme: Ocean Breeze (matches: "blue", "ocean") → confidence: 1.0

**Result**: All three detected with high confidence, will be applied.

### Performance

- **Parse Time**: O(n*m) where n = description length, m = total keywords
- **Typical Time**: 100-200ms
- **Target**: <200ms

## 5. Prompt Template System

### Purpose

Formats prompts optimally for different AI tools (Bolt.new, Lovable.dev, Claude Artifacts).

### Algorithm

**File**: `src/data/promptTemplates.ts`

#### Template Structure

Each template includes:
- **ID**: Unique identifier
- **Name**: Display name
- **Description**: Why it's optimized for the tool
- **Target Tool**: Which AI tool it's for
- **Template**: String with {{variable}} placeholders
- **Variables**: List of required variables
- **Formatters**: Optional custom formatting functions

#### Rendering Engine

1. **Variable Replacement**: Replace {{variable}} with actual values
2. **Loop Handling**: Process {{#each array}} loops
3. **Nested Properties**: Support dot notation (e.g., {{user.name}})
4. **Formatting**: Apply custom formatters if defined
5. **Whitespace**: Preserve formatting and indentation

#### Tool-Specific Optimizations

**Bolt.new Template**:
- Structured sections with clear headers
- Explicit technical requirements
- Detailed component specifications
- Installation commands in code blocks

**Lovable.dev Template**:
- Conversational, natural language
- Focuses on user intent and goals
- Less technical jargon
- Emphasizes desired outcomes

**Claude Artifacts Template**:
- Concise, implementation-focused
- Minimal boilerplate
- Direct technical specifications
- Optimized for code generation

### Performance

- **Render Time**: O(n) where n = template length
- **Typical Time**: 20-50ms
- **Target**: <50ms

## Performance Summary

| Feature | Target | Typical | Algorithm Complexity |
|---------|--------|---------|---------------------|
| Smart Defaults | <50ms | 10ms | O(1) lookup + O(n) application |
| Prompt Analysis | <100ms | 50-100ms | O(n) text scanning |
| Compatibility Check | <50ms | 20-50ms | O(1) fixed rules |
| NLP Parsing | <200ms | 100-200ms | O(n*m) keyword matching |
| Template Rendering | <50ms | 20-50ms | O(n) string processing |

**Total AI Overhead**: <450ms for all features combined

## Error Handling

All AI functions include safe wrappers:

```typescript
export const safeAnalyzePrompt = (input) => {
  try {
    return analyzePrompt(input);
  } catch (error) {
    console.error('Prompt analysis failed:', error);
    return defaultNeutralResult;
  }
};
```

This ensures the wizard continues working even if AI features fail.

## Future Enhancements

### Smart Defaults
- Analyze project purpose string for better confidence
- Learn from user modifications to improve defaults
- Add more project types and specializations

### Prompt Analysis
- Machine learning-based quality scoring
- Context-aware suggestions based on project type
- Integration with actual AI tool feedback

### Compatibility Checker
- Visual preview of design combinations
- More granular compatibility rules
- User preference learning

### NLP Parser
- Support for multiple languages
- Sentiment analysis for tone detection
- Entity extraction for specific requirements
- Context understanding beyond keywords

### Template System
- User-customizable templates
- Template marketplace
- A/B testing for template effectiveness
- Dynamic template selection based on project

## Testing

All AI algorithms include comprehensive test coverage:

- **Unit Tests**: Test individual functions with various inputs
- **Integration Tests**: Test AI features in wizard flow
- **Performance Tests**: Verify response time targets
- **Edge Case Tests**: Handle malformed input gracefully

See `src/tests/` for test implementations.

## Maintenance

### Adding New Project Types

1. Add entry to `SMART_DEFAULTS` in `smartDefaults.ts`
2. Add keywords to `KEYWORD_MAPPINGS.projectTypes` in `nlpParser.ts`
3. Update compatibility rules if needed
4. Add tests for new project type

### Adding New Design Styles

1. Add to design styles data
2. Add keywords to `KEYWORD_MAPPINGS.designStyles` in `nlpParser.ts`
3. Add compatibility rules in `compatibilityChecker.ts`
4. Update smart defaults mappings
5. Add tests

### Updating Analysis Rules

1. Add new rule to `analyzePrompt` function
2. Define severity and auto-fix capability
3. Update scoring algorithm if needed
4. Add tests for new rule

## References

- **Requirements**: `.kiro/specs/ai-intelligence-features/requirements.md`
- **Design**: `.kiro/specs/ai-intelligence-features/design.md`
- **Implementation**: `src/utils/` directory
- **Tests**: `src/tests/` directory
