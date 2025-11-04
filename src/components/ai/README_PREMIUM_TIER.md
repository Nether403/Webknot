# Premium Tier System

## Overview

The premium tier system provides a monetization path for LovaBolt by offering unlimited AI features and advanced capabilities to paying users. This implementation follows the requirements in Task 17 of the Gemini AI Integration spec.

## Architecture

### Components

#### 1. Premium Tier Management (`src/utils/premiumTier.ts`)

Core utilities for managing premium status:

- `isPremiumUser()` - Check if user has premium tier
- `setPremiumStatus(isPremium, expiresAt?)` - Set premium status
- `getPremiumConfig()` - Get full premium configuration
- `clearPremiumStatus()` - Clear premium status
- `shouldShowUpgradePrompt()` - Check if upgrade prompts should be shown

**Storage**: `localStorage['lovabolt-premium-tier']`

```typescript
interface PremiumTierConfig {
  isPremium: boolean;
  activatedAt?: number;
  expiresAt?: number;
  tier?: 'free' | 'premium' | 'enterprise';
}
```

#### 2. Premium Features (`src/utils/premiumFeatures.ts`)

Premium-specific feature enhancements:

- `enhanceSuggestionsForPremium()` - Enhance AI suggestions for premium users
- `getApiPriority()` - Get API priority level (1 = highest for premium)
- `hasPremiumFeature(feature)` - Check access to specific premium features
- `getMaxSuggestions()` - Get suggestion limit (10 for premium, 5 for free)
- `exportConversationHistory()` - Export conversations (premium only)
- `getApiTimeout(baseTimeout)` - Get adjusted timeout (50% longer for premium)

#### 3. Rate Limiter Integration (`src/services/rateLimiter.ts`)

Updated to support premium bypass:

```typescript
interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  storageKey: string;
  bypassForPremium?: boolean; // Default: true
}
```

**Behavior**:
- Free users: 20 requests/hour
- Premium users: Unlimited (bypasses rate limit)

#### 4. UI Components

**UpgradePrompt** (`src/components/ai/UpgradePrompt.tsx`)
- Compact and full-size upgrade prompts
- Shows benefits of premium tier
- Triggered on rate limit or feature access

**PremiumComparison** (`src/components/ai/PremiumComparison.tsx`)
- Side-by-side comparison of free vs premium
- Feature matrix with icons
- Trust indicators and FAQ
- Pricing information

**UpgradeModal** (`src/components/ai/UpgradeModal.tsx`)
- Modal wrapper for upgrade flow
- Handles payment processing (placeholder)
- Shows loading state during upgrade

**UpgradeManager** (`src/components/ai/UpgradeManager.tsx`)
- Global component that listens for upgrade events
- Manages upgrade prompts and modals
- Responds to premium status changes

**ConversationExport** (`src/components/ai/ConversationExport.tsx`)
- Premium-only feature for exporting chat history
- Exports conversations as JSON
- Shows upgrade prompt for free users

**AISettings** (updated)
- Shows premium status badge for premium users
- Shows upgrade button for free users
- Integrated with upgrade flow

## Features

### Free Tier

- ✅ 20 AI requests per hour
- ✅ Standard response time
- ✅ Basic AI suggestions
- ✅ All core features

### Premium Tier ($9.99/month)

- ✅ **Unlimited AI requests** - No hourly limits
- ✅ **Priority API access** - 50% longer timeout for complex requests
- ✅ **Advanced suggestions** - Enhanced AI analysis with premium insights
- ✅ **Conversation history export** - Export chat conversations as JSON
- ✅ **Priority support** - Faster response times
- ✅ **No rate limiting** - Use AI as much as needed

## Integration

### 1. Add UpgradeManager to App

```tsx
import { UpgradeManager } from './components/ai';

function App() {
  return (
    <>
      <YourAppContent />
      <UpgradeManager />
    </>
  );
}
```

### 2. Check Premium Status

```typescript
import { isPremiumUser } from './utils/premiumTier';

if (isPremiumUser()) {
  // Show premium features
}
```

### 3. Show Upgrade Prompt

```typescript
// Dispatch event to show upgrade prompt
window.dispatchEvent(new CustomEvent('show-upgrade-prompt', {
  detail: { 
    reason: 'rate-limit' | 'feature' | 'general',
    type: 'modal' | 'banner'
  }
}));
```

### 4. Use Premium Features

```typescript
import { hasPremiumFeature, exportConversationHistory } from './utils/premiumFeatures';

// Check feature access
if (hasPremiumFeature('conversation-export')) {
  exportConversationHistory(conversations);
}
```

## Events

### `show-upgrade-prompt`

Triggers upgrade prompt display.

```typescript
window.dispatchEvent(new CustomEvent('show-upgrade-prompt', {
  detail: {
    reason: 'rate-limit' | 'feature' | 'general',
    type: 'modal' | 'banner'
  }
}));
```

### `premium-status-changed`

Fired when premium status changes.

```typescript
window.addEventListener('premium-status-changed', (event: CustomEvent) => {
  const { isPremium, expiresAt } = event.detail;
  // Handle premium status change
});
```

## Payment Integration

The current implementation includes a **placeholder** for payment processing. To integrate with a real payment system:

1. Update `UpgradeModal.tsx` `handleUpgrade()` method
2. Replace the simulated payment with actual payment gateway (Stripe, PayPal, etc.)
3. Call `setPremiumStatus(true, expiresAt)` after successful payment
4. Handle subscription management (renewals, cancellations)

### Example Stripe Integration

```typescript
const handleUpgrade = async () => {
  setIsProcessing(true);
  
  try {
    // Create Stripe checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'premium' })
    });
    
    const { sessionId } = await response.json();
    
    // Redirect to Stripe checkout
    const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
    await stripe.redirectToCheckout({ sessionId });
    
  } catch (error) {
    console.error('Payment failed:', error);
    toast({
      variant: 'destructive',
      title: 'Payment Failed',
      description: 'Please try again or contact support.'
    });
  } finally {
    setIsProcessing(false);
  }
};
```

## Testing

### Activate Premium (Development)

```typescript
import { setPremiumStatus } from './utils/premiumTier';

// Activate premium for testing
setPremiumStatus(true);

// Activate with expiration (7-day trial)
const sevenDaysFromNow = Date.now() + (7 * 24 * 60 * 60 * 1000);
setPremiumStatus(true, sevenDaysFromNow);
```

### Deactivate Premium

```typescript
import { clearPremiumStatus } from './utils/premiumTier';

clearPremiumStatus();
```

### Test Rate Limit Bypass

```typescript
import { isPremiumUser } from './utils/premiumTier';
import { RateLimiter } from './services/rateLimiter';

const rateLimiter = new RateLimiter({
  maxRequests: 20,
  windowMs: 3600000,
  bypassForPremium: true
});

// Premium users should always pass
console.log(rateLimiter.checkLimit()); // { remaining: 999, isLimited: false }
```

## Feature Flags

Enable/disable premium tier system:

```typescript
import { featureFlags } from './lib/featureFlags';

// Check if premium tier is enabled
if (featureFlags.isEnabled('premiumTier')) {
  // Show premium features
}

// Enable premium tier
featureFlags.enable('premiumTier');

// Disable premium tier
featureFlags.disable('premiumTier');
```

## Requirements Satisfied

- ✅ **7.5**: Premium tier option that removes rate limits for paid users
- ✅ **17.1**: isPremium flag in user state, rate limit bypass, upgrade prompts
- ✅ **17.2**: Premium comparison page, upgrade button, benefits display, payment placeholder
- ✅ **17.3**: Unlimited requests, priority access, advanced suggestions, conversation export

## Future Enhancements

1. **Subscription Management**
   - Billing portal
   - Subscription status tracking
   - Automatic renewal handling
   - Cancellation flow

2. **Enterprise Tier**
   - Custom rate limits
   - Team management
   - Advanced analytics
   - Dedicated support

3. **Trial Period**
   - 7-day free trial for new users
   - Trial expiration notifications
   - Conversion tracking

4. **Usage Analytics**
   - Track premium feature usage
   - Measure conversion rates
   - A/B test pricing
   - ROI analysis

## Support

For questions or issues with the premium tier system:

1. Check the implementation in `src/components/ai/` and `src/utils/`
2. Review the spec at `.kiro/specs/gemini-ai-integration/tasks.md` (Task 17)
3. See requirements at `.kiro/specs/gemini-ai-integration/requirements.md` (Requirement 7.5)
4. Check design at `.kiro/specs/gemini-ai-integration/design.md` (Phase 3)
