# Production Deployment Guide - Gemini AI Integration

## Overview

This guide provides step-by-step instructions for deploying LovaBolt's Gemini AI integration to production. Follow these steps carefully to ensure a smooth, secure deployment.

**Target Audience:** DevOps engineers, system administrators, deployment managers

## Pre-Deployment Checklist

### ✅ Code Readiness

- [ ] All Phase 1 tasks completed and tested
- [ ] All unit tests passing (100% pass rate)
- [ ] All integration tests passing
- [ ] E2E tests passing
- [ ] No console errors in production build
- [ ] Code reviewed and approved
- [ ] Documentation complete

### ✅ API Configuration

- [ ] Production Gemini API key obtained
- [ ] API key validated and tested
- [ ] Rate limits configured appropriately
- [ ] Cost tracking enabled
- [ ] Monitoring alerts configured

### ✅ Security

- [ ] API keys stored securely (not in code)
- [ ] Environment variables configured
- [ ] Input sanitization tested
- [ ] HTTPS/TLS enabled
- [ ] CORS configured correctly
- [ ] Security headers configured

### ✅ Performance

- [ ] Caching tested and working (>80% hit rate)
- [ ] Response times meet targets (<2s)
- [ ] Fallback system tested
- [ ] Load testing completed
- [ ] CDN configured (if applicable)

### ✅ Monitoring

- [ ] Error tracking configured (Sentry, etc.)
- [ ] Analytics configured
- [ ] Cost tracking enabled
- [ ] Alert thresholds set
- [ ] Dashboard created

## Step 1: Obtain Production API Key

### 1.1 Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Name: `lovabolt-production`
4. Note the Project ID

### 1.2 Enable Gemini API

1. Navigate to APIs & Services
2. Click "Enable APIs and Services"
3. Search for "Generative Language API"
4. Click "Enable"

### 1.3 Create API Key

1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > "API Key"
3. Copy the API key immediately
4. Click "Restrict Key"

### 1.4 Restrict API Key

**Application Restrictions:**
- Select "HTTP referrers (web sites)"
- Add your production domain(s):
  - `https://lovabolt.com/*`
  - `https://www.lovabolt.com/*`

**API Restrictions:**
- Select "Restrict key"
- Choose "Generative Language API"

**Save the restrictions**

### 1.5 Store API Key Securely

**DO NOT:**
- ❌ Commit API key to Git
- ❌ Store in client-side code
- ❌ Share publicly
- ❌ Use same key for dev/staging/prod

**DO:**
- ✅ Store in environment variables
- ✅ Use secrets management (AWS Secrets Manager, etc.)
- ✅ Rotate keys periodically
- ✅ Use different keys per environment

## Step 2: Configure Environment Variables

### 2.1 Production Environment Variables

Create `.env.production` file (DO NOT commit):

```bash
# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_production_api_key_here
VITE_GEMINI_MODEL=gemini-2.5-flash-exp
VITE_GEMINI_TEMPERATURE=0.7
VITE_GEMINI_MAX_TOKENS=1000
VITE_GEMINI_TIMEOUT=2000

# Feature Flags
VITE_AI_ENABLED=true
VITE_AI_PROJECT_ANALYSIS=true
VITE_AI_SUGGESTIONS=false  # Phase 2
VITE_AI_ENHANCEMENT=false  # Phase 2
VITE_AI_CHAT=false         # Phase 3

# Rate Limiting
VITE_RATE_LIMIT_REQUESTS=20
VITE_RATE_LIMIT_WINDOW=3600000  # 1 hour in ms

# Monitoring
VITE_SENTRY_DSN=your_sentry_dsn_here
VITE_ANALYTICS_ID=your_analytics_id_here

# Cost Tracking
VITE_COST_ALERT_THRESHOLD=500  # Alert at $500/month
```

### 2.2 Deployment Platform Configuration

#### Vercel

```bash
# Add environment variables in Vercel dashboard
vercel env add VITE_GEMINI_API_KEY production
# Enter API key when prompted
```

#### Netlify

```bash
# Add environment variables in Netlify dashboard
# Settings > Build & deploy > Environment > Environment variables
```

#### AWS Amplify

```bash
# Add environment variables in Amplify console
# App settings > Environment variables
```

#### Custom Server

```bash
# Use systemd environment file or docker-compose
# /etc/systemd/system/lovabolt.service.d/override.conf
[Service]
Environment="VITE_GEMINI_API_KEY=your_key_here"
```

## Step 3: Configure Feature Flags

### 3.1 Feature Flag System

Update `src/lib/featureFlags.ts`:

```typescript
export const featureFlags = {
  // Phase 1: MVP (Enable in production)
  aiProjectAnalysis: true,
  
  // Phase 2: Enhancement (Disable until ready)
  aiSuggestions: false,
  aiPromptEnhancement: false,
  
  // Phase 3: Advanced (Disable until ready)
  aiChat: false,
  premiumTier: false,
  
  // Monitoring
  enableErrorTracking: true,
  enableAnalytics: true,
  enableCostTracking: true
};
```

### 3.2 Gradual Rollout Configuration

For gradual rollout (10% → 50% → 100%):

```typescript
export function shouldEnableAI(userId: string): boolean {
  // Get rollout percentage from environment
  const rolloutPercentage = parseInt(
    import.meta.env.VITE_AI_ROLLOUT_PERCENTAGE || '100'
  );
  
  // Hash user ID to get consistent assignment
  const hash = hashString(userId);
  const userPercentage = hash % 100;
  
  return userPercentage < rolloutPercentage;
}
```

Set rollout percentage:
```bash
VITE_AI_ROLLOUT_PERCENTAGE=10  # Start with 10%
```

## Step 4: Set Up Monitoring

### 4.1 Error Tracking (Sentry)

Install Sentry:
```bash
npm install @sentry/react @sentry/vite-plugin
```

Configure Sentry in `src/main.tsx`:

```typescript
import * as Sentry from '@sentry/react';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: 'production',
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay()
    ],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Filter out expected errors
    beforeSend(event, hint) {
      const error = hint.originalException;
      
      // Don't send rate limit errors
      if (error instanceof GeminiError && 
          error.type === GeminiErrorType.RATE_LIMIT) {
        return null;
      }
      
      return event;
    }
  });
}
```

### 4.2 Analytics

Configure analytics in `src/services/analyticsService.ts`:

```typescript
export function trackAIEvent(
  event: string,
  properties: Record<string, any>
): void {
  if (!import.meta.env.PROD) return;
  
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', event, properties);
  }
  
  // Custom analytics
  if (window.analytics) {
    window.analytics.track(event, properties);
  }
}

// Track AI usage
trackAIEvent('ai_analysis', {
  projectType: analysis.projectType,
  confidence: analysis.confidence,
  latency: responseTime,
  cacheHit: false
});
```

### 4.3 Cost Tracking

Enable cost tracking in `src/services/costTracker.ts`:

```typescript
export class CostTracker {
  private static instance: CostTracker;
  
  trackRequest(data: {
    model: string;
    tokensUsed: number;
    latency: number;
    success: boolean;
  }): void {
    const cost = this.calculateCost(data.model, data.tokensUsed);
    
    // Store in localStorage
    this.addToHistory({
      timestamp: Date.now(),
      cost,
      ...data
    });
    
    // Check alert threshold
    const monthlyCost = this.getMonthlyCost();
    const threshold = parseInt(
      import.meta.env.VITE_COST_ALERT_THRESHOLD || '500'
    );
    
    if (monthlyCost > threshold) {
      this.sendCostAlert(monthlyCost, threshold);
    }
  }
  
  private sendCostAlert(current: number, threshold: number): void {
    // Send alert to monitoring service
    fetch('/api/alerts/cost', {
      method: 'POST',
      body: JSON.stringify({ current, threshold })
    });
  }
}
```

### 4.4 Dashboard Setup

Create monitoring dashboard with:
- **Request count** by operation type
- **Error rate** by error type
- **Response time** (p50, p95, p99)
- **Cache hit rate**
- **Cost tracking** (daily, monthly)
- **Rate limit hits**

Recommended tools:
- Grafana
- Datadog
- New Relic
- Custom dashboard

## Step 5: Configure Alerts

### 5.1 Alert Thresholds

Set up alerts for:

**Error Rate:**
```typescript
if (errorRate > 5%) {
  sendAlert('High error rate detected', {
    current: errorRate,
    threshold: 5
  });
}
```

**Response Time:**
```typescript
if (p95Latency > 3000) {
  sendAlert('Slow AI responses', {
    current: p95Latency,
    threshold: 3000
  });
}
```

**Cost:**
```typescript
if (monthlyCost > 500) {
  sendAlert('Cost threshold exceeded', {
    current: monthlyCost,
    threshold: 500
  });
}
```

**Cache Hit Rate:**
```typescript
if (cacheHitRate < 70%) {
  sendAlert('Low cache hit rate', {
    current: cacheHitRate,
    threshold: 70
  });
}
```

### 5.2 Alert Channels

Configure alert destinations:
- Email: devops@lovabolt.com
- Slack: #alerts channel
- PagerDuty: For critical alerts
- SMS: For urgent issues

## Step 6: Build and Deploy

### 6.1 Production Build

```bash
# Install dependencies
npm ci

# Run tests
npm test

# Build for production
npm run build

# Verify build
ls -lh dist/
```

### 6.2 Pre-Deployment Tests

```bash
# Serve production build locally
npm run preview

# Test in browser
# - Verify AI features work
# - Check console for errors
# - Test fallback system
# - Verify caching works
```

### 6.3 Deploy to Platform

#### Vercel

```bash
vercel --prod
```

#### Netlify

```bash
netlify deploy --prod
```

#### AWS S3 + CloudFront

```bash
aws s3 sync dist/ s3://lovabolt-production/
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

#### Custom Server

```bash
# Copy build to server
scp -r dist/* user@server:/var/www/lovabolt/

# Restart web server
ssh user@server 'sudo systemctl restart nginx'
```

## Step 7: Post-Deployment Verification

### 7.1 Smoke Tests

Test critical paths:

1. **Home page loads**
   - Visit https://lovabolt.com
   - Check for console errors
   - Verify assets load

2. **AI analysis works**
   - Enter project description
   - Verify AI analyzes correctly
   - Check response time (<2s)

3. **Fallback works**
   - Temporarily disable API key
   - Verify fallback activates
   - Check notification displays

4. **Caching works**
   - Analyze same description twice
   - Second request should be instant (<50ms)

5. **Rate limiting works**
   - Make 21 requests quickly
   - Verify rate limit message appears

### 7.2 Monitoring Verification

Check monitoring systems:

- [ ] Sentry receiving events
- [ ] Analytics tracking events
- [ ] Cost tracker recording requests
- [ ] Alerts configured and working
- [ ] Dashboard displaying data

### 7.3 Performance Verification

Measure performance:

```bash
# Lighthouse audit
npx lighthouse https://lovabolt.com --view

# WebPageTest
# Visit https://www.webpagetest.org/
# Test from multiple locations
```

**Targets:**
- Performance score: >90
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s

## Step 8: Gradual Rollout

### 8.1 Phase 1: 10% of Users

```bash
# Set rollout percentage
VITE_AI_ROLLOUT_PERCENTAGE=10
```

**Monitor for 24-48 hours:**
- Error rate
- Response times
- User feedback
- Cost

**Success Criteria:**
- Error rate <1%
- Response time <2s (p95)
- No critical bugs
- Cost within budget

### 8.2 Phase 2: 50% of Users

If Phase 1 successful:

```bash
VITE_AI_ROLLOUT_PERCENTAGE=50
```

**Monitor for 48-72 hours:**
- Same metrics as Phase 1
- Increased load handling
- Cost scaling

### 8.3 Phase 3: 100% of Users

If Phase 2 successful:

```bash
VITE_AI_ROLLOUT_PERCENTAGE=100
```

**Monitor for 1 week:**
- Full production metrics
- User satisfaction
- Cost analysis
- Performance under full load

## Step 9: Rollback Plan

### 9.1 Rollback Triggers

Rollback if:
- Error rate >5%
- Response time >5s (p95)
- Cost >$1000/month
- Critical security issue
- Data loss or corruption

### 9.2 Rollback Procedure

**Option 1: Disable AI Features**

```bash
# Set feature flag to false
VITE_AI_ENABLED=false

# Redeploy
vercel --prod
```

**Option 2: Reduce Rollout**

```bash
# Reduce to 10% or 0%
VITE_AI_ROLLOUT_PERCENTAGE=10

# Redeploy
vercel --prod
```

**Option 3: Full Rollback**

```bash
# Revert to previous deployment
vercel rollback

# Or deploy previous commit
git revert HEAD
git push
```

### 9.3 Post-Rollback

After rollback:
1. Investigate root cause
2. Fix issues in development
3. Test thoroughly
4. Attempt deployment again

## Step 10: Documentation

### 10.1 Deployment Documentation

Document:
- Deployment date and time
- Version deployed
- Configuration used
- Rollout percentage
- Issues encountered
- Resolutions applied

### 10.2 Runbook

Create runbook for:
- Common issues and solutions
- Emergency contacts
- Rollback procedures
- Monitoring dashboards
- Alert response procedures

### 10.3 Team Communication

Notify team:
- Deployment complete
- Monitoring dashboards
- On-call schedule
- Escalation procedures

## Maintenance

### Regular Tasks

**Daily:**
- Check error rates
- Review cost tracking
- Monitor response times
- Check alert status

**Weekly:**
- Review analytics
- Analyze user feedback
- Check cache hit rate
- Review cost trends

**Monthly:**
- Rotate API keys
- Review and update alerts
- Analyze performance trends
- Plan optimizations

### API Key Rotation

Rotate API keys every 90 days:

1. Create new API key
2. Update environment variables
3. Deploy with new key
4. Monitor for issues
5. Delete old key after 24 hours

## Troubleshooting

### High Error Rate

**Symptoms:** Error rate >5%

**Diagnosis:**
1. Check Sentry for error details
2. Review API status
3. Check network connectivity
4. Verify API key validity

**Solutions:**
- Enable fallback system
- Reduce rollout percentage
- Contact Google support
- Rollback if critical

### Slow Response Times

**Symptoms:** Response time >3s (p95)

**Diagnosis:**
1. Check API latency
2. Review cache hit rate
3. Check network latency
4. Analyze request patterns

**Solutions:**
- Increase cache TTL
- Optimize prompts
- Use CDN
- Enable compression

### High Costs

**Symptoms:** Monthly cost >$500

**Diagnosis:**
1. Review request patterns
2. Check cache hit rate
3. Analyze token usage
4. Identify expensive operations

**Solutions:**
- Increase cache hit rate
- Optimize prompts (reduce tokens)
- Implement request batching
- Adjust rate limits

### Low Cache Hit Rate

**Symptoms:** Cache hit rate <70%

**Diagnosis:**
1. Review cache configuration
2. Check TTL settings
3. Analyze request patterns
4. Verify cache persistence

**Solutions:**
- Increase cache size
- Increase TTL
- Implement cache warming
- Fix cache key generation

## Support

### Internal Support

- **DevOps Team:** devops@lovabolt.com
- **Development Team:** dev@lovabolt.com
- **On-Call:** See PagerDuty schedule

### External Support

- **Google Cloud Support:** https://cloud.google.com/support
- **Gemini API Issues:** https://ai.google.dev/support
- **Vercel Support:** https://vercel.com/support

## Appendix

### A. Environment Variables Reference

See `.env.example` for complete list of environment variables.

### B. API Key Restrictions

See Step 1.4 for detailed API key restriction configuration.

### C. Monitoring Queries

Example queries for monitoring dashboards:

```sql
-- Error rate
SELECT 
  COUNT(*) FILTER (WHERE success = false) * 100.0 / COUNT(*) as error_rate
FROM ai_requests
WHERE timestamp > NOW() - INTERVAL '1 hour';

-- Response time (p95)
SELECT 
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency) as p95_latency
FROM ai_requests
WHERE timestamp > NOW() - INTERVAL '1 hour';

-- Cost
SELECT 
  SUM(cost) as total_cost
FROM ai_requests
WHERE timestamp > DATE_TRUNC('month', NOW());
```

### D. Checklist Summary

- [ ] Production API key obtained and configured
- [ ] Environment variables set
- [ ] Feature flags configured
- [ ] Monitoring enabled (Sentry, Analytics)
- [ ] Alerts configured
- [ ] Production build tested
- [ ] Deployed to production
- [ ] Smoke tests passed
- [ ] Gradual rollout started
- [ ] Team notified
- [ ] Documentation updated

---

**Last Updated:** November 4, 2025  
**Version:** 1.0.0  
**Maintainer:** DevOps Team

---

**Questions?** devops@lovabolt.com
