/**
 * Circuit Breaker Service
 * 
 * Implements the circuit breaker pattern to prevent cascading failures
 * Tracks consecutive failures and opens circuit after threshold
 * Auto-fallback for duration (5 minutes) then gradually tests recovery
 */

export enum CircuitState {
  CLOSED = 'CLOSED',     // Normal operation
  OPEN = 'OPEN',         // Circuit is open, failing fast
  HALF_OPEN = 'HALF_OPEN' // Testing if service has recovered
}

export interface CircuitBreakerConfig {
  failureThreshold: number;  // Number of consecutive failures before opening
  openDuration: number;      // How long to keep circuit open (ms)
  halfOpenAttempts: number;  // Number of test attempts in half-open state
  storageKey: string;        // LocalStorage key for persistence
}

export interface CircuitBreakerState {
  state: CircuitState;
  consecutiveFailures: number;
  lastFailureTime: number;
  openedAt: number;
  halfOpenAttempts: number;
}

export class CircuitBreaker {
  private config: CircuitBreakerConfig;
  private state: CircuitState = CircuitState.CLOSED;
  private consecutiveFailures = 0;
  private lastFailureTime = 0;
  private openedAt = 0;
  private halfOpenAttempts = 0;
  
  constructor(config: CircuitBreakerConfig) {
    this.config = config;
    this.loadFromStorage();
  }
  
  /**
   * Checks if the circuit allows requests
   * 
   * @returns True if requests are allowed
   */
  canAttempt(): boolean {
    // Update state based on time
    this.updateState();
    
    switch (this.state) {
      case CircuitState.CLOSED:
        // Normal operation, allow all requests
        return true;
        
      case CircuitState.OPEN:
        // Circuit is open, fail fast
        return false;
        
      case CircuitState.HALF_OPEN:
        // Allow limited test attempts
        return this.halfOpenAttempts < this.config.halfOpenAttempts;
    }
  }
  
  /**
   * Records a successful operation
   * Resets failure count and closes circuit if in half-open state
   */
  recordSuccess(): void {
    console.log('[CircuitBreaker] Success recorded');
    
    if (this.state === CircuitState.HALF_OPEN) {
      // Success in half-open state, close the circuit
      console.log('[CircuitBreaker] Service recovered, closing circuit');
      this.state = CircuitState.CLOSED;
      this.consecutiveFailures = 0;
      this.halfOpenAttempts = 0;
      this.openedAt = 0;
    } else if (this.state === CircuitState.CLOSED) {
      // Reset failure count on success
      this.consecutiveFailures = 0;
    }
    
    this.saveToStorage();
  }
  
  /**
   * Records a failed operation
   * Increments failure count and opens circuit if threshold is reached
   */
  recordFailure(): void {
    this.consecutiveFailures++;
    this.lastFailureTime = Date.now();
    
    console.log(
      `[CircuitBreaker] Failure recorded (${this.consecutiveFailures}/${this.config.failureThreshold})`
    );
    
    if (this.state === CircuitState.HALF_OPEN) {
      // Failure in half-open state, reopen the circuit
      console.log('[CircuitBreaker] Service still failing, reopening circuit');
      this.state = CircuitState.OPEN;
      this.openedAt = Date.now();
      this.halfOpenAttempts = 0;
    } else if (
      this.state === CircuitState.CLOSED &&
      this.consecutiveFailures >= this.config.failureThreshold
    ) {
      // Threshold reached, open the circuit
      console.warn(
        `[CircuitBreaker] Failure threshold reached (${this.config.failureThreshold}), opening circuit`
      );
      this.state = CircuitState.OPEN;
      this.openedAt = Date.now();
    }
    
    this.saveToStorage();
  }
  
  /**
   * Gets the current circuit state
   * 
   * @returns Current state
   */
  getState(): CircuitState {
    this.updateState();
    return this.state;
  }
  
  /**
   * Gets time until circuit will attempt recovery (in ms)
   * Returns 0 if circuit is not open
   * 
   * @returns Time in milliseconds
   */
  getTimeUntilRecovery(): number {
    if (this.state !== CircuitState.OPEN) {
      return 0;
    }
    
    const elapsed = Date.now() - this.openedAt;
    const remaining = this.config.openDuration - elapsed;
    
    return Math.max(0, remaining);
  }
  
  /**
   * Gets a human-readable status message
   * 
   * @returns Status message
   */
  getStatusMessage(): string {
    this.updateState();
    
    switch (this.state) {
      case CircuitState.CLOSED:
        return 'AI service is operational';
        
      case CircuitState.OPEN: {
        const timeRemaining = this.getTimeUntilRecovery();
        const minutesRemaining = Math.ceil(timeRemaining / 60000);
        return `AI service temporarily unavailable. Retrying in ${minutesRemaining} minute${minutesRemaining !== 1 ? 's' : ''}`;
      }
        
      case CircuitState.HALF_OPEN:
        return 'AI service is recovering, testing connection...';
    }
  }
  
  /**
   * Manually resets the circuit breaker
   * Useful for testing or manual recovery
   */
  reset(): void {
    console.log('[CircuitBreaker] Manual reset');
    this.state = CircuitState.CLOSED;
    this.consecutiveFailures = 0;
    this.lastFailureTime = 0;
    this.openedAt = 0;
    this.halfOpenAttempts = 0;
    this.saveToStorage();
  }
  
  /**
   * Updates the circuit state based on time
   * Transitions from OPEN to HALF_OPEN after duration
   */
  private updateState(): void {
    if (this.state === CircuitState.OPEN) {
      const elapsed = Date.now() - this.openedAt;
      
      if (elapsed >= this.config.openDuration) {
        // Duration has passed, transition to half-open
        console.log('[CircuitBreaker] Open duration elapsed, transitioning to half-open');
        this.state = CircuitState.HALF_OPEN;
        this.halfOpenAttempts = 0;
        this.saveToStorage();
      }
    }
  }
  
  /**
   * Loads circuit breaker state from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.config.storageKey);
      
      if (stored) {
        const data: CircuitBreakerState = JSON.parse(stored);
        
        this.state = data.state;
        this.consecutiveFailures = data.consecutiveFailures;
        this.lastFailureTime = data.lastFailureTime;
        this.openedAt = data.openedAt;
        this.halfOpenAttempts = data.halfOpenAttempts;
        
        console.log('[CircuitBreaker] Loaded state from storage:', this.state);
        
        // Update state in case time has passed
        this.updateState();
      }
    } catch (error) {
      console.error('[CircuitBreaker] Failed to load from storage:', error);
    }
  }
  
  /**
   * Saves circuit breaker state to localStorage
   */
  private saveToStorage(): void {
    try {
      const data: CircuitBreakerState = {
        state: this.state,
        consecutiveFailures: this.consecutiveFailures,
        lastFailureTime: this.lastFailureTime,
        openedAt: this.openedAt,
        halfOpenAttempts: this.halfOpenAttempts,
      };
      
      localStorage.setItem(this.config.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('[CircuitBreaker] Failed to save to storage:', error);
    }
  }
}

// Singleton instance
let circuitBreakerInstance: CircuitBreaker | null = null;

/**
 * Gets the singleton CircuitBreaker instance
 */
export function getCircuitBreaker(): CircuitBreaker {
  if (!circuitBreakerInstance) {
    circuitBreakerInstance = new CircuitBreaker({
      failureThreshold: 5,        // Open after 5 consecutive failures
      openDuration: 300000,       // Keep open for 5 minutes
      halfOpenAttempts: 3,        // Allow 3 test attempts in half-open state
      storageKey: 'webknot-circuit-breaker',
    });
  }
  return circuitBreakerInstance;
}
