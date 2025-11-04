# Queue Position Indicator - Visual Examples

## Overview

The Queue Position Indicator displays the user's position in the AI request queue during high load periods. It provides different experiences for premium and free users.

## Visual Examples

### Free User - Position #3 in Queue

```
┌─────────────────────────────────────────────────────────────┐
│  🕐  Request Queued                                         │
│                                                              │
│     Position #3 in queue · Est. wait: ~1 min               │
│                                                              │
│     Upgrade to Premium for priority access →                │
│                                                         ⟳    │
└─────────────────────────────────────────────────────────────┘
```

**Styling:**
- Gray background with subtle border
- Clock icon in gray
- Position number in white
- Upgrade link in teal (clickable)
- Spinning loader animation

### Premium User - Position #2 in Priority Queue

```
┌─────────────────────────────────────────────────────────────┐
│  ⚡  Priority Queue                    [PREMIUM]            │
│                                                              │
│     Position #2 in priority queue · Est. wait: ~1 min      │
│                                                         ⟳    │
└─────────────────────────────────────────────────────────────┘
```

**Styling:**
- Teal-tinted background with teal border
- Lightning bolt icon in teal
- "PREMIUM" badge in teal
- Position number in teal (highlighted)
- Spinning loader in teal

### Free User - Long Queue (Position #12)

```
┌─────────────────────────────────────────────────────────────┐
│  🕐  Request Queued                                         │
│                                                              │
│     Position #12 in queue · Est. wait: ~4 min              │
│                                                              │
│     Upgrade to Premium for priority access →                │
│                                                         ⟳    │
└─────────────────────────────────────────────────────────────┘
```

**Note:** Upgrade prompt is more prominent for positions > 5

## Component Usage

### Basic Usage

```tsx
import { useGemini } from '../hooks/useGemini';
import { QueuePositionIndicator } from '../components/ai/QueuePositionIndicator';

function ProjectSetupStep() {
  const { analyzeProject, isLoading, queuePosition } = useGemini();
  
  return (
    <div>
      {/* Show queue indicator when request is queued */}
      {queuePosition && (
        <QueuePositionIndicator position={queuePosition} />
      )}
      
      {/* Your form and other UI */}
      <button onClick={handleAnalyze} disabled={isLoading}>
        Analyze Project
      </button>
    </div>
  );
}
```

### With Custom Styling

```tsx
<QueuePositionIndicator 
  position={queuePosition} 
  className="mb-4"
/>
```

## Behavior

### When Queue Position Updates

The indicator automatically updates every 500ms to show:
- Current position in queue
- Estimated wait time (3 seconds per position)
- Premium status if applicable

### When Request Starts Processing

When the request moves from "queued" to "processing":
- Queue position becomes `undefined`
- Indicator disappears
- Normal loading state shows

### When Request Completes

- Queue position cleared
- Indicator removed
- Results displayed

## User Experience Flow

### Free User Journey

1. **User triggers AI request** (e.g., clicks "Analyze Project")
2. **System detects high load** (2+ concurrent requests)
3. **Request added to queue** with NORMAL priority
4. **Indicator appears** showing position #5
5. **Position updates** as queue progresses: #5 → #4 → #3 → #2 → #1
6. **Request starts processing** when position reaches front
7. **Indicator disappears** and normal loading state shows
8. **Results displayed** when complete

### Premium User Journey

1. **User triggers AI request**
2. **System detects high load**
3. **Request added to queue** with HIGH priority
4. **Indicator appears** with premium styling, position #2
5. **Skips ahead** of free users in queue
6. **Position updates faster** due to priority
7. **Request starts processing** sooner than free users
8. **Indicator disappears** and results show

## Integration Points

### Where to Show the Indicator

The indicator should be displayed in any component that uses AI features:

1. **ProjectSetupStep** - When analyzing project description
2. **DesignSuggestions** - When getting design suggestions
3. **PreviewStep** - When enhancing prompts
4. **ChatInterface** - When sending chat messages

### Placement Guidelines

- Show **above** the triggering button/form
- Show **below** any error messages
- Use consistent spacing (mb-4 or similar)
- Don't overlap with other loading indicators

## Accessibility

The component includes:
- Semantic HTML structure
- Clear text descriptions
- Visual loading animation
- Color contrast compliance
- Keyboard-accessible upgrade link

## Premium Upgrade Flow

When free users click "Upgrade to Premium for priority access":

1. Event dispatched: `show-upgrade-prompt` with reason `queue-priority`
2. Upgrade modal/page opens
3. Shows benefits: "Skip the queue with Premium"
4. User can upgrade or dismiss

## Technical Details

### Props

```typescript
interface QueuePositionIndicatorProps {
  position: number;      // 1-based position in queue
  className?: string;    // Optional additional CSS classes
}
```

### Estimated Wait Time Calculation

```typescript
const estimatedWaitSeconds = position * 3; // 3 seconds per request
const estimatedWaitMinutes = Math.ceil(estimatedWaitSeconds / 60);
```

This is a rough approximation. Actual wait time depends on:
- Request complexity
- API response time
- Network conditions
- Number of retries

### Premium Detection

```typescript
import { isPremiumUser } from '../../utils/premiumTier';

const premium = isPremiumUser();
```

## Testing

### Manual Testing Scenarios

1. **Low Load** - No indicator should show
2. **High Load (Free User)** - Gray indicator with position
3. **High Load (Premium User)** - Teal indicator with badge
4. **Long Queue** - Upgrade prompt appears
5. **Position Updates** - Number decreases over time
6. **Request Processing** - Indicator disappears

### Automated Tests

See `src/services/__tests__/requestQueue.test.ts` for queue logic tests.

## Future Enhancements

Potential improvements:
- Real-time position updates via WebSocket
- More accurate wait time estimates
- Queue position history/analytics
- Cancellation button for queued requests
- Queue size visualization (e.g., progress bar)

## Conclusion

The Queue Position Indicator provides transparent feedback during high load periods, enhancing user experience and promoting premium upgrades. It's a key component of the request queuing system that makes wait times visible and manageable.
