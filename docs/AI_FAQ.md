# AI Features - Frequently Asked Questions

## General Questions

### What is AI in LovaBolt?

LovaBolt uses Google's Gemini 2.5 AI to provide intelligent assistance with project planning. It analyzes your project description, suggests compatible design options, enhances prompts, and answers questions about design and development.

### Do I need to use AI features?

No! AI features are completely optional. LovaBolt works perfectly without AI using rule-based algorithms. You can disable AI features in settings at any time.

### How is this different from the rule-based system?

**AI-Powered:**
- Understands meaning and context (semantic understanding)
- Provides creative suggestions
- Learns from your project description
- 90%+ accuracy

**Rule-Based:**
- Uses keyword matching and lookup tables
- Provides predefined templates
- Fast and reliable (<50ms)
- 60-70% accuracy

Both systems work together - AI enhances the experience, rule-based ensures reliability.

## Privacy & Security

### Is my data safe?

Yes! We take privacy seriously:
- All personal information is automatically removed before sending to AI
- We only send technical project data (descriptions, selections)
- You can disable AI features anytime
- Data is encrypted in transit (HTTPS/TLS)

See our [Privacy and Data Usage](PRIVACY_AND_DATA_USAGE.md) document for details.

### What data is sent to Google's AI?

We send:
- ✅ Project descriptions (sanitized)
- ✅ Design selections (no personal data)
- ✅ Generated prompts (technical content)

We NEVER send:
- ❌ Your name or email
- ❌ IP addresses
- ❌ Payment information
- ❌ Any personally identifiable information

### Can I see what data is being sent?

Yes! The data sent to AI is:
1. Your project description (with personal info removed)
2. Your design selections (colors, styles, components)
3. Generated prompts (for enhancement feature)

All of this is visible in the application interface.

### How do I disable AI features?

1. Click the Settings icon (gear)
2. Find "AI Features" section
3. Toggle "Enable AI Features" to OFF
4. All AI features are immediately disabled

## Performance & Reliability

### How fast are AI responses?

- **Smart Analysis:** 0.5-2 seconds
- **Design Suggestions:** 0.5-2 seconds
- **Prompt Enhancement:** 1-3 seconds
- **Chat Responses:** 1-3 seconds
- **Cache Hits:** <0.05 seconds (instant)

### What if AI is slow or unavailable?

LovaBolt automatically falls back to the rule-based system:
- Seamless transition (you may not notice)
- Notification shown: "Using standard analysis"
- All features continue to work
- No data loss

### Why do I sometimes see "Using standard analysis"?

This means the AI service was unavailable or timed out, so LovaBolt used the rule-based fallback system. This is normal and ensures the app always works.

### Does caching make it faster?

Yes! LovaBolt caches AI responses for 1 hour:
- Identical requests return instantly (<50ms)
- Cache survives page reloads
- Automatically cleared when you reset project
- Cache hits don't count toward rate limit

## Rate Limits & Costs

### What are the rate limits?

**Free Users:**
- 20 AI requests per hour
- Resets every hour
- Cache hits don't count
- Clear notification when limit reached

**Premium Users (Phase 3):**
- Unlimited AI requests
- Priority API access
- Advanced features

### What counts as a request?

Each of these counts as one request:
- Analyzing a project description
- Getting design suggestions
- Enhancing a prompt
- Sending a chat message

Cache hits (repeated requests) don't count.

### What happens when I hit the rate limit?

- AI features are temporarily disabled
- You see a message: "Rate limit reached. Try again in X minutes"
- Rule-based system continues to work
- Cached responses still available
- Limit resets after 1 hour

### Does AI cost money?

**For users:** No! AI features are free (with rate limits). Premium tier (Phase 3) will offer unlimited access for a fee.

**For the project:** Yes, but minimal ($1-50/month depending on usage).

## Features & Usage

### How do I use Smart Project Analysis?

1. Go to Project Setup step
2. Enter your project description (20+ characters)
3. AI automatically analyzes it
4. Review suggestions and confidence score
5. Click "Apply AI Suggestions" if confidence >80%

### What makes a good project description?

**Good descriptions:**
- Specific about project type
- Mention target audience
- Include design preferences
- Describe key features

**Example:**
```
"I'm building an e-commerce site for handmade jewelry. 
I want an elegant, luxurious feel with warm colors. 
Key features include product galleries and shopping cart."
```

**Avoid:**
- Too short: "website"
- Too vague: "something cool"
- Personal info: "Contact me at john@email.com"

### What is the confidence score?

The confidence score (0-100%) indicates how certain the AI is about its suggestions:

- **90-100%:** Very confident - Highly recommended
- **80-89%:** Confident - Good suggestions
- **70-79%:** Moderate - Review carefully
- **Below 70%:** Low - May not be accurate

Lower confidence doesn't mean wrong, just less certain.

### Can AI write my entire project?

No. AI helps with:
- Project planning and configuration
- Design suggestions and compatibility
- Prompt generation and enhancement
- Answering questions

You still need to implement the actual project using the generated prompt.

### What is prompt enhancement?

Prompt enhancement adds professional details to your generated prompt:
- Accessibility requirements (WCAG 2.1 AA)
- Performance optimization suggestions
- SEO considerations
- Security best practices
- Testing recommendations

This makes your prompt more comprehensive and production-ready.

### How does the chat assistant work? (Phase 3)

The chat assistant:
- Answers questions about design and development
- Provides context-aware responses based on your project
- Maintains conversation continuity
- Offers code examples and documentation links

**Example questions:**
- "What colors work well with glassmorphism?"
- "How do I implement the carousel component?"
- "What's the best layout for a portfolio?"

## Accuracy & Quality

### How accurate is the AI?

Typically 90%+ accuracy for project analysis. The confidence score helps you gauge reliability for each specific analysis.

### What if AI makes a mistake?

AI suggestions are just that - suggestions. Always review before applying:
- Check the confidence score
- Review the reasoning provided
- Verify suggestions match your vision
- You can always undo or modify

The fallback system ensures the app works even if AI fails.

### Can I trust AI suggestions?

AI suggestions are generally reliable, especially with high confidence scores (>80%). However:
- Always review suggestions
- Use your judgment
- Consider your specific needs
- AI is a tool to assist, not replace your creativity

### Why did AI suggest something unexpected?

AI tries to understand your intent, but may interpret differently than you expected:
- Try rephrasing your description
- Be more specific about requirements
- Check the reasoning provided
- Adjust suggestions manually if needed

## Technical Questions

### What AI model does LovaBolt use?

Google's Gemini 2.5:
- **gemini-2.5-flash-exp:** Fast, cost-effective (analysis, suggestions)
- **gemini-2.5-pro-exp:** High quality (prompt enhancement, complex reasoning)

### Does AI work offline?

No. AI features require an internet connection. However:
- Rule-based fallback works offline
- Cached responses work offline (for 1 hour)
- All core features work offline

### Can I use my own API key?

Not currently. LovaBolt uses a shared API key for all users. Custom API keys may be supported in future versions.

### How is AI integrated technically?

LovaBolt uses:
- **GeminiService:** Core API integration
- **CacheService:** Response caching with LRU eviction
- **useGemini hook:** React hook for components
- **Fallback system:** Rule-based algorithms
- **Error handling:** Comprehensive error management

See [Developer Documentation](developer/) for technical details.

## Troubleshooting

### AI features aren't working

**Check:**
1. Internet connection is active
2. AI features are enabled in settings
3. You haven't hit rate limit (20/hour)
4. Browser allows localStorage

**If still not working:**
- Clear browser cache
- Reload the page
- Check browser console for errors
- Report issue on GitHub

### "AI analysis timed out" message

This means AI took too long (>2 seconds). LovaBolt automatically:
- Uses fallback system
- Provides results anyway
- Shows notification

**What to do:** Nothing! Continue normally.

### Slow AI responses

**Possible causes:**
- High API load
- Network issues
- Complex analysis

**Solutions:**
- Wait a moment and try again
- Check internet connection
- Simplify project description
- Use cached results if available

### Cache not working

**Check:**
1. Cache is enabled (default: yes)
2. Browser allows localStorage
3. You haven't cleared browser data
4. Requests are identical (same description)

**To clear cache:**
- Reset project
- Clear browser data
- Use "Clear Cache" in settings

### Rate limit reached too quickly

**Possible causes:**
- Multiple analyses in short time
- Testing/experimenting frequently
- Cache not working

**Solutions:**
- Wait for reset (shown in message)
- Use cached results
- Be more deliberate with requests
- Consider premium tier (Phase 3)

## Comparison Questions

### AI vs Rule-Based: Which is better?

Both have advantages:

**AI-Powered:**
- ✅ Better accuracy (90%+)
- ✅ Semantic understanding
- ✅ Creative suggestions
- ❌ Slower (0.5-2s)
- ❌ Requires internet
- ❌ Rate limited

**Rule-Based:**
- ✅ Very fast (<50ms)
- ✅ Always available
- ✅ Works offline
- ✅ Unlimited use
- ❌ Lower accuracy (60-70%)
- ❌ Keyword matching only

**Best approach:** Use both! AI for intelligence, rule-based for reliability.

### LovaBolt AI vs ChatGPT

**LovaBolt AI:**
- Specialized for project planning
- Integrated into wizard workflow
- Context-aware suggestions
- Automatic fallback system
- Optimized for LovaBolt use cases

**ChatGPT:**
- General-purpose AI
- Separate interface
- Broader knowledge
- No LovaBolt integration
- Manual prompt engineering needed

### Free vs Premium (Phase 3)

**Free:**
- 20 AI requests/hour
- All core features
- Standard response times
- Basic suggestions

**Premium:**
- Unlimited AI requests
- Priority API access (faster)
- Advanced suggestions
- Conversation history export
- Custom AI training

## Future Features

### What's coming in Phase 2?

- Design compatibility checking
- Prompt enhancement
- Auto-fix suggestions
- Better error messages

### What's coming in Phase 3?

- Conversational AI assistant
- Premium tier (unlimited AI)
- Advanced suggestions
- Conversation history
- Custom AI training

### Can I request features?

Yes! We welcome feature requests:
- GitHub Issues: https://github.com/yourusername/lovabolt/issues
- Email: hello@lovabolt.com
- Discussions: GitHub Discussions

## Getting Help

### Where can I learn more?

- **AI Features Guide:** `docs/AI_FEATURES_GUIDE.md`
- **Privacy Policy:** `docs/PRIVACY_AND_DATA_USAGE.md`
- **Developer Docs:** `docs/developer/`
- **User Guide:** `docs/guides/USER_GUIDE.md`

### How do I report issues?

1. **GitHub Issues:** https://github.com/yourusername/lovabolt/issues
2. **Email:** hello@lovabolt.com
3. **Include:**
   - Description of issue
   - Steps to reproduce
   - Browser and OS
   - Screenshots if applicable

### How do I provide feedback?

We love feedback!
- **GitHub Discussions:** Share ideas and suggestions
- **Email:** hello@lovabolt.com
- **Surveys:** Occasional user surveys
- **Feature Requests:** GitHub Issues

### Response time for support

- **GitHub Issues:** 1-3 business days
- **Email:** 1-3 business days
- **Critical bugs:** Within 24 hours

---

## Still Have Questions?

If your question isn't answered here:

1. **Check the documentation:**
   - AI Features Guide
   - Privacy Policy
   - User Guide

2. **Search GitHub Issues:**
   - Someone may have asked already
   - Check closed issues too

3. **Ask the community:**
   - GitHub Discussions
   - Share your question

4. **Contact us:**
   - Email: hello@lovabolt.com
   - Subject: "AI Question"

---

**Last Updated:** November 4, 2025  
**Version:** 1.0.0  
**Questions?** hello@lovabolt.com
