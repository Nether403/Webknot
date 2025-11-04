# Rollback Plan - Gemini AI Integration

## Overview

This document provides detailed procedures for rolling back the Gemini AI integration in case of critical issues. Follow these procedures to quickly restore service while minimizing user impact.

**Target Audience:** DevOps engineers, on-call engineers, incident responders

## When to Rollback

### Critical Issues (Immediate Rollback)

Execute rollback immediately if:

- ✅ **Error rate >10%** for more than 5 minutes
- ✅ **Complete service outage** (AI features completely broken)
- ✅ **Data loss or corruption** detected
- ✅ **Security vulnerability** discovered
- ✅ **Cost spike** (>$1000/day)
- ✅ **Legal/compliance issue** identified

### Serious Issues (Rollback within 1 hour)

Evaluate and rollback if:

- ⚠️ **Error rate 5-10%** for more than 15 minutes
- ⚠️ **Response time >5s** (p95) for more than 15 minutes
- ⚠️ **Cache failure** (hit rate <20%)
- ⚠️ **Fallback system not working**
- ⚠️ **Multiple user complaints** about AI features

### Minor Issues (Monitor and Fix)

Monitor and fix without rollback:

- ℹ️ **Error rate 1-5%** (within acceptable range)
- ℹ️ **Response time 2-5s** (slower but functional)
- ℹ️ **Individual user issues** (not widespread)
- ℹ️ **Non-critical bugs** (workarounds available)

## Rollback Options

### Option 1: Disable AI Features (Fastest)

**Time:** 2-5 minutes  
**Impact:** AI features disabled, fallback system active  
**User Impact:** Minimal (fallback provides functionality)

**When to use:**
- AI service completely broken
- Need immediate mitigation
- Fallback system working correctly

**Procedure:**

```bash
# 1. Set feature flag to disable AI
export VITE_AI_ENABLED=false

# 2. Redeploy (Vercel example)
vercel --prod

# 3. Verify deployment
curl https://lovabolt.com/health

# 4. Monitor fallback system
# Check that rule-based system is working
```

**Verification:**
- [ ] AI features disabled in UI
- [ ] Fallback system active
- [ ] No console errors
- [ ] Users can complete wizard
- [ ] Error rate drops to <1%

### Option 2: Reduce Rollout Percentage

**Time:** 5-10 minutes  
**Impact:** AI features disabled for most users  
**User Impact:** Moderate (some users lose AI features)

**When to use:**
- Issues affecting subset of users
- Want to keep AI for some users
- Investigating root cause

**Procedure:**

```bash
# 1. Reduce rollout to 10% or 0%
export VITE_AI_ROLLOUT_PERCENTAGE=10

# 2. Redeploy
vercel --prod

# 3. Monitor affected users
# Check error rate for remaining 10%

# 4. If issues persist, reduce to 0%
export VITE_AI_ROLLOUT_PERCENTAGE=0
vercel --prod
```

**Verification:**
- [ ] Only 10% (or 0%) of users have AI
- [ ] Error rate drops significantly
- [ ] Remaining users functioning normally
- [ ] Fallback working for others

### Option 3: Revert to Previous Deployment

**Time:** 10-15 minutes  
**Impact:** Complete rollback to previous version  
**User Impact:** Moderate (lose any new features)

**When to use:**
- New deployment has critical bugs
- Multiple systems affected
- Need to restore known-good state

**Procedure:**

```bash
# Vercel
vercel rollback

# Netlify
netlify rollback

# AWS Amplify
aws amplify start-deployment \
  --app-id YOUR_APP_ID \
  --branch-name main \
  --job-id PREVIOUS_JOB_ID

# Custom deployment
git revert HEAD
git push origin main
```

**Verification:**
- [ ] Previous version deployed
- [ ] All features working
- [ ] Error rate normal
- [ ] No regressions

### Option 4: Emergency API Key Rotation

**Time:** 15-20 minutes  
**Impact:** Temporary AI outage during rotation  
**User Impact:** High (brief AI outage)

**When to use:**
- API key compromised
- Unauthorized usage detected
- Security incident

**Procedure:**

```bash
# 1. Create new API key in Google Cloud Console
# 2. Restrict new key immediately
# 3. Update environment variable
export VITE_GEMINI_API_KEY=new_key_here

# 4. Redeploy
vercel --prod

# 5. Verify new key works
# Test AI features

# 6. Delete old key
# In Google Cloud Console
```

**Verification:**
- [ ] New API key working
- [ ] Old key deleted
- [ ] No unauthorized usage
- [ ] Error rate normal

## Rollback Procedures by Platform

### Vercel

```bash
# List recent deployments
vercel ls

# Rollback to previous
vercel rollback

# Or rollback to specific deployment
vercel rollback DEPLOYMENT_URL

# Verify
curl https://lovabolt.com/health
```

### Netlify

```bash
# List deployments
netlify deploy:list

# Rollback to previous
netlify rollback

# Or rollback to specific deployment
netlify rollback --site-id SITE_ID --deploy-id DEPLOY_ID

# Verify
curl https://lovabolt.com/health
```

### AWS Amplify

```bash
# List deployments
aws amplify list-jobs --app-id YOUR_APP_ID --branch-name main

# Rollback to previous
aws amplify start-deployment \
  --app-id YOUR_APP_ID \
  --branch-name main \
  --job-id PREVIOUS_JOB_ID

# Verify
curl https://lovabolt.com/health
```

### Custom Server

```bash
# Git revert
git revert HEAD
git push origin main

# Or checkout previous commit
git checkout PREVIOUS_COMMIT_HASH
git push -f origin main

# Rebuild and deploy
npm run build
rsync -avz dist/ user@server:/var/www/lovabolt/
ssh user@server 'sudo systemctl restart nginx'

# Verify
curl https://lovabolt.com/health
```

## Post-Rollback Procedures

### Immediate Actions (Within 15 minutes)

1. **Verify Rollback Success**
   - [ ] Check error rate (<1%)
   - [ ] Check response times (<2s)
   - [ ] Test critical paths
   - [ ] Monitor user reports

2. **Notify Stakeholders**
   - [ ] Engineering team
   - [ ] Product team
   - [ ] Support team
   - [ ] Management (if critical)

3. **Update Status Page**
   - [ ] Post incident notice
   - [ ] Explain what happened
   - [ ] Provide timeline
   - [ ] Set expectations

4. **Begin Investigation**
   - [ ] Collect error logs
   - [ ] Review metrics
   - [ ] Identify root cause
   - [ ] Document findings

### Short-Term Actions (Within 1 hour)

1. **Root Cause Analysis**
   - Analyze error logs
   - Review code changes
   - Check configuration
   - Identify trigger

2. **Create Fix Plan**
   - Document root cause
   - Propose solution
   - Estimate fix time
   - Assign owner

3. **Communication**
   - Update status page
   - Email affected users (if applicable)
   - Post in team channels
   - Schedule post-mortem

### Long-Term Actions (Within 24 hours)

1. **Implement Fix**
   - Develop solution
   - Test thoroughly
   - Code review
   - Prepare for redeployment

2. **Post-Mortem**
   - Schedule meeting
   - Document incident
   - Identify improvements
   - Create action items

3. **Prevention**
   - Update monitoring
   - Add new alerts
   - Improve testing
   - Update documentation

## Communication Templates

### Internal Notification (Slack/Email)

```
🚨 INCIDENT: Gemini AI Integration Rollback

Status: ROLLED BACK
Time: [TIMESTAMP]
Severity: [CRITICAL/HIGH/MEDIUM]

Issue:
[Brief description of the problem]

Action Taken:
[Rollback option used]

Current Status:
- Error rate: [X%]
- AI features: [ENABLED/DISABLED]
- Fallback: [ACTIVE/INACTIVE]

Next Steps:
1. [Action 1]
2. [Action 2]
3. [Action 3]

Incident Commander: [NAME]
War Room: [LINK]
```

### User-Facing Status Update

```
We're experiencing issues with our AI features and have temporarily 
disabled them while we investigate. The application continues to work 
normally using our standard analysis system.

We apologize for any inconvenience and are working to restore AI 
features as quickly as possible.

Status: https://status.lovabolt.com
Updates: We'll post updates every 30 minutes
```

### Post-Incident Summary

```
Incident Summary: Gemini AI Integration Rollback

Date: [DATE]
Duration: [X hours]
Impact: [Description]

What Happened:
[Detailed explanation]

Root Cause:
[Technical explanation]

Resolution:
[How it was fixed]

Prevention:
[Steps to prevent recurrence]

Timeline:
- [TIME]: Issue detected
- [TIME]: Rollback initiated
- [TIME]: Rollback complete
- [TIME]: Investigation started
- [TIME]: Fix deployed
- [TIME]: Incident closed
```

## Rollback Decision Matrix

| Metric | Normal | Warning | Critical | Action |
|--------|--------|---------|----------|--------|
| Error Rate | <1% | 1-5% | >5% | Rollback if >10% |
| Response Time | <2s | 2-5s | >5s | Rollback if >5s for 15min |
| Cost | <$50/day | $50-100/day | >$100/day | Rollback if >$1000/day |
| Cache Hit Rate | >80% | 50-80% | <50% | Rollback if <20% |
| User Complaints | 0-2/hour | 3-10/hour | >10/hour | Rollback if >20/hour |

## Testing Rollback Procedures

### Quarterly Rollback Drill

Practice rollback procedures every quarter:

1. **Schedule drill** (announce to team)
2. **Execute rollback** (in staging)
3. **Time the process** (should be <15 minutes)
4. **Document issues** (update procedures)
5. **Review with team** (lessons learned)

### Staging Environment Testing

Before production deployment:

1. **Deploy to staging**
2. **Simulate failure**
3. **Execute rollback**
4. **Verify success**
5. **Document any issues**

## Rollback Checklist

### Pre-Rollback

- [ ] Confirm rollback is necessary
- [ ] Identify rollback option
- [ ] Notify team
- [ ] Prepare communication
- [ ] Have monitoring ready

### During Rollback

- [ ] Execute rollback procedure
- [ ] Monitor error rates
- [ ] Check critical paths
- [ ] Update status page
- [ ] Communicate with team

### Post-Rollback

- [ ] Verify rollback success
- [ ] Notify stakeholders
- [ ] Begin investigation
- [ ] Document incident
- [ ] Schedule post-mortem

## Contact Information

### On-Call Engineers

- **Primary:** [NAME] - [PHONE] - [EMAIL]
- **Secondary:** [NAME] - [PHONE] - [EMAIL]
- **Escalation:** [NAME] - [PHONE] - [EMAIL]

### Key Stakeholders

- **Engineering Lead:** [EMAIL]
- **Product Manager:** [EMAIL]
- **CTO:** [EMAIL]
- **Support Lead:** [EMAIL]

### External Support

- **Google Cloud Support:** https://cloud.google.com/support
- **Vercel Support:** https://vercel.com/support
- **Sentry Support:** https://sentry.io/support

## Related Documentation

- **Production Deployment Guide:** `PRODUCTION_DEPLOYMENT_GUIDE.md`
- **Monitoring Configuration:** `MONITORING_CONFIGURATION.md`
- **Incident Response:** `INCIDENT_RESPONSE.md`
- **Post-Mortem Template:** `POST_MORTEM_TEMPLATE.md`

---

**Last Updated:** November 4, 2025  
**Version:** 1.0.0  
**Maintainer:** DevOps Team

---

**Remember: When in doubt, rollback. It's better to be safe than sorry.**
