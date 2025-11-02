# Prompt Optimization Quick Reference Guide

## Overview

This guide provides quick reference for optimizing prompts to reduce token usage while maintaining quality.

## Optimization Checklist

### Before Writing a Prompt

- [ ] Define the exact output structure needed
- [ ] Identify essential vs. optional information
- [ ] Consider using `responseMimeType: 'application/json'`
- [ ] Plan to use abbreviations where clear
- [ ] Remove any redundant instructions

### While Writing a Prompt

- [ ] Use imperative mood (commands, not requests)
- [ ] Keep instructions to one line when possible
- [ ] Let JSON structure imply constraints
- [ ] Use abbreviations for common terms
- [ ] Avoid filler words and phrases

### After Writing a Prompt

- [ ] Remove role descriptions if not essential
- [ ] Eliminate redundant guidelines
- [ ] Shorten field labels
- [ ] Combine related instructions
- [ ] Test with actual API to verify quality

## Quick Optimization Rules

### ❌ AVOID

1. **Verbose Role Descriptions**
   ```
   ❌ "You are a senior software architect with 15 years of experience..."
   ✅ Direct instruction or omit entirely
   ```

2. **Redundant Guidelines**
   ```
   ❌ "The confidence field should be a number between 0 and 1"
   ✅ Show in JSON: "confidence": 0.85
   ```

3. **Filler Words**
   ```
   ❌ "Clear, actionable, and comprehensive suggestion"
   ✅ "actionable suggestion"
   ```

4. **Over-Explanation**
   ```
   ❌ "improvement means an enhancement opportunity that could make the design better"
   ✅ "type": "improvement|warning|tip"
   ```

5. **Repetitive Instructions**
   ```
   ❌ Multiple bullets saying the same thing differently
   ✅ One concise instruction
   ```

### ✅ USE

1. **Imperative Mood**
   ```
   ✅ "Analyze project and recommend"
   ✅ "Provide 3-5 suggestions"
   ✅ "Return complete prompt"
   ```

2. **Abbreviations**
   ```
   ✅ "WCAG 2.1 AA" instead of "Web Content Accessibility Guidelines 2.1 Level AA"
   ✅ "E2E" instead of "end-to-end"
   ✅ "CSP" instead of "Content Security Policy"
   ```

3. **Short Labels**
   ```
   ✅ "Project:" instead of "**Project Type**:"
   ✅ "Style:" instead of "**Design Style**:"
   ```

4. **Structured Output**
   ```
   ✅ Use responseMimeType: 'application/json'
   ✅ Define structure once clearly
   ✅ Let structure imply constraints
   ```

5. **Essential Context Only**
   ```
   ✅ Include only fields used in analysis
   ✅ Remove redundant data
   ✅ Trust model's training
   ```

## Token Reduction Techniques

### Technique 1: Remove Role Descriptions

**Before (15 tokens):**
```
You are a web design expert with extensive experience in modern UI/UX.
```

**After (0 tokens):**
```
[Omit entirely - model knows its role]
```

**Savings: 15 tokens**

---

### Technique 2: Shorten Instructions

**Before (25 tokens):**
```
Please analyze the following project description and provide detailed recommendations for the design.
```

**After (6 tokens):**
```
Analyze project and recommend design.
```

**Savings: 19 tokens**

---

### Technique 3: Use Abbreviations

**Before (20 tokens):**
```
Accessibility Requirements (Web Content Accessibility Guidelines 2.1 Level AA compliance)
```

**After (8 tokens):**
```
Accessibility (WCAG 2.1 AA)
```

**Savings: 12 tokens**

---

### Technique 4: Shorten Field Labels

**Before (12 tokens):**
```
**Project Type**: Portfolio
**Design Style**: Minimalist
```

**After (6 tokens):**
```
Project: Portfolio
Style: Minimalist
```

**Savings: 6 tokens**

---

### Technique 5: Remove Redundant Guidelines

**Before (30 tokens):**
```
Guidelines:
- projectType must be one of the exact values listed above
- confidence should be a number between 0.0 and 1.0
- reasoning should be 1-2 sentences
```

**After (0 tokens):**
```
[Let JSON structure imply these constraints]
```

**Savings: 30 tokens**

---

### Technique 6: Combine Instructions

**Before (40 tokens):**
```
Be specific in your messages.
Be actionable in your recommendations.
Explain your reasoning clearly.
Consider modern web design principles.
Focus on best practices.
```

**After (8 tokens):**
```
Provide specific, actionable suggestions with clear reasoning.
```

**Savings: 32 tokens**

## Common Patterns

### Pattern 1: Analysis Request

**Optimized Template:**
```
Analyze [subject] and [action].

[Input data]

JSON format:
{
  [structure]
}
```

**Example:**
```
Analyze project and recommend design.

"Build a portfolio website"

JSON format:
{
  "projectType": "Portfolio|E-commerce|...",
  "designStyle": "minimalist|modern|...",
  "confidence": 0.85
}
```

---

### Pattern 2: Suggestions Request

**Optimized Template:**
```
[Action] [subject]. Provide [quantity] [type].

[Context data]

JSON format:
{
  [structure]
}
```

**Example:**
```
Analyze design compatibility. Provide 3-5 suggestions.

Project: Portfolio
Style: Minimalist

JSON format:
{
  "suggestions": [{
    "type": "improvement|warning|tip",
    "message": "text",
    "severity": "low|medium|high"
  }]
}
```

---

### Pattern 3: Enhancement Request

**Optimized Template:**
```
[Action] with [additions]. Add sections for:
1. [Topic] ([key points])
2. [Topic] ([key points])

Original:
[content]

Return [format].
```

**Example:**
```
Enhance prompt with professional details. Add sections for:
1. Accessibility (WCAG 2.1 AA, keyboard nav)
2. Performance (code splitting, <200KB bundle)

Original:
Build a portfolio website

Return complete prompt with ## headers.
```

## Measurement

### Token Counting

Use this formula to estimate tokens:
- **English text:** ~1 token per 4 characters
- **Code/JSON:** ~1 token per 3 characters
- **Whitespace:** Usually ignored

**Example:**
```
"Analyze project and recommend design" = ~7 tokens
"You are a web design expert. Please analyze..." = ~12 tokens
```

### Cost Calculation

**Gemini 2.0 Flash Pricing:**
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens

**Example:**
- 100 tokens input = $0.0000075
- 200 tokens output = $0.00006
- Total per request = $0.0000675

**Monthly cost (10,000 requests):**
- 10,000 × $0.0000675 = $0.675

## Quality Assurance

### Testing Optimized Prompts

1. **Compare Outputs:**
   - Run both versions with same input
   - Verify JSON structure matches
   - Check confidence scores
   - Validate reasoning quality

2. **Measure Performance:**
   - Track response times
   - Monitor error rates
   - Check cache hit rates
   - Measure user acceptance

3. **Monitor Metrics:**
   - Average confidence: >0.7
   - Error rate: <2%
   - User acceptance: >70%
   - Fallback rate: <5%

### Red Flags

Stop and review if you see:
- ❌ Confidence scores dropping
- ❌ Error rate increasing
- ❌ User acceptance declining
- ❌ Fallback activation rising
- ❌ Response quality degrading

## Best Practices Summary

### DO:
✅ Use imperative mood
✅ Keep instructions concise
✅ Use abbreviations
✅ Let structure imply constraints
✅ Trust model training
✅ Test thoroughly
✅ Monitor quality metrics

### DON'T:
❌ Add verbose role descriptions
❌ Repeat obvious guidelines
❌ Use filler words
❌ Over-explain concepts
❌ Include redundant context
❌ Sacrifice quality for tokens
❌ Skip testing

## Examples by Use Case

### Use Case 1: Classification

**Optimized:**
```
Classify text into categories.

"[text]"

JSON: {"category": "A|B|C", "confidence": 0.85}
```

---

### Use Case 2: Extraction

**Optimized:**
```
Extract key information.

"[text]"

JSON: {"name": "...", "email": "...", "phone": "..."}
```

---

### Use Case 3: Generation

**Optimized:**
```
Generate [type] based on [input].

Input: [data]

Return [format].
```

---

### Use Case 4: Transformation

**Optimized:**
```
Transform [input] to [output].

Input: [data]

JSON: {[structure]}
```

## Conclusion

Effective prompt optimization:
- Reduces costs by 60-75%
- Maintains output quality
- Improves response times
- Enhances cache efficiency

Key principle: **Modern LLMs are well-trained. Be concise, be clear, be structured.**

## Quick Reference Card

```
┌─────────────────────────────────────────┐
│   PROMPT OPTIMIZATION QUICK TIPS        │
├─────────────────────────────────────────┤
│ 1. Remove role descriptions             │
│ 2. Use imperative mood                  │
│ 3. Abbreviate common terms              │
│ 4. Shorten field labels                 │
│ 5. Let JSON imply constraints           │
│ 6. Remove filler words                  │
│ 7. Combine related instructions         │
│ 8. Trust model training                 │
│ 9. Test thoroughly                      │
│ 10. Monitor quality metrics             │
└─────────────────────────────────────────┘

Target: 60-75% token reduction
Quality: No degradation
Performance: Faster responses
Cost: 60-75% savings
```
