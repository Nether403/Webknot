/**
 * Input Sanitization Utilities
 * 
 * Removes personally identifiable information (PII) from text
 * before sending to external AI services
 */

/**
 * Sanitizes input text by removing PII patterns
 * 
 * Removes:
 * - Email addresses
 * - Phone numbers (US and international formats)
 * - Social Security Numbers (SSN)
 * - Credit card numbers
 * - IP addresses
 * - URLs with personal tokens/keys
 * 
 * @param text - The text to sanitize
 * @returns Sanitized text with PII replaced by placeholders
 */
export function sanitizeInput(text: string): string {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  let sanitized = text;
  
  // Remove email addresses
  sanitized = sanitized.replace(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi,
    '[email]'
  );
  
  // Remove URLs with query parameters that might contain tokens (do this early)
  sanitized = sanitized.replace(
    /https?:\/\/[^\s]+[?&](token|key|api_key|apikey|auth|secret)=[^\s&]+/gi,
    '[url-with-token]'
  );
  
  // Remove potential API keys or tokens (long alphanumeric strings) - before phone numbers
  // This catches patterns like: sk_live_abc123xyz, AIzaSyC...
  sanitized = sanitized.replace(
    /\b[a-zA-Z0-9_-]{32,}\b/g,
    '[token]'
  );
  
  // Remove credit card numbers (various formats) - before phone numbers
  sanitized = sanitized.replace(
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    '[card]'
  );
  
  // Remove SSNs (XXX-XX-XXXX format)
  sanitized = sanitized.replace(
    /\b\d{3}-\d{2}-\d{4}\b/g,
    '[ssn]'
  );
  
  // Remove phone numbers (various formats)
  // US formats: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
  sanitized = sanitized.replace(
    /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    '[phone]'
  );
  
  // International phone numbers with country code
  sanitized = sanitized.replace(
    /\b\+[0-9]{1,3}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}\b/g,
    '[phone]'
  );
  
  // Remove IP addresses (IPv4)
  sanitized = sanitized.replace(
    /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g,
    '[ip]'
  );
  
  return sanitized;
}

/**
 * Validates if a string is a valid Gemini API key format
 * 
 * @param key - The API key to validate
 * @returns True if the key format is valid
 */
export function isValidApiKey(key: string): boolean {
  return /^AIza[0-9A-Za-z-_]{35}$/.test(key);
}
