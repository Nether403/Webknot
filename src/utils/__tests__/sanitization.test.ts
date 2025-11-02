/**
 * Sanitization Utility Tests
 * 
 * Tests for PII removal and data sanitization
 */

import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { describe } from 'vitest';
import { sanitizeInput, isValidApiKey } from '../sanitization';

describe('sanitizeInput', () => {
  describe('Email addresses', () => {
    it('should remove email addresses', () => {
      const input = 'Contact me at john.doe@example.com for details';
      const result = sanitizeInput(input);
      expect(result).toBe('Contact me at [email] for details');
      expect(result).not.toContain('john.doe@example.com');
    });
    
    it('should remove multiple email addresses', () => {
      const input = 'Email john@test.com or jane@example.org';
      const result = sanitizeInput(input);
      expect(result).toBe('Email [email] or [email]');
    });
    
    it('should handle emails with special characters', () => {
      const input = 'Send to user+tag@domain.co.uk';
      const result = sanitizeInput(input);
      expect(result).toBe('Send to [email]');
    });
  });
  
  describe('Phone numbers', () => {
    it('should remove US phone numbers with dashes', () => {
      const input = 'Call me at 555-123-4567';
      const result = sanitizeInput(input);
      expect(result).toBe('Call me at [phone]');
      expect(result).not.toContain('555-123-4567');
    });
    
    it('should remove US phone numbers with dots', () => {
      const input = 'Phone: 555.123.4567';
      const result = sanitizeInput(input);
      expect(result).toBe('Phone: [phone]');
    });
    
    it('should remove US phone numbers with parentheses', () => {
      const input = 'Contact: (555) 123-4567';
      const result = sanitizeInput(input);
      expect(result).toBe('Contact: [phone]');
    });
    
    it('should remove phone numbers without separators', () => {
      const input = 'Text 5551234567';
      const result = sanitizeInput(input);
      expect(result).toBe('Text [phone]');
    });
    
    it('should remove international phone numbers', () => {
      const input = 'Call +1-555-123-4567 or +44 20 1234 5678';
      const result = sanitizeInput(input);
      expect(result).toContain('[phone]');
      expect(result).not.toContain('+1-555-123-4567');
    });
  });
  
  describe('Social Security Numbers', () => {
    it('should remove SSNs', () => {
      const input = 'My SSN is 123-45-6789';
      const result = sanitizeInput(input);
      expect(result).toBe('My SSN is [ssn]');
      expect(result).not.toContain('123-45-6789');
    });
    
    it('should remove multiple SSNs', () => {
      const input = 'SSNs: 123-45-6789 and 987-65-4321';
      const result = sanitizeInput(input);
      expect(result).toBe('SSNs: [ssn] and [ssn]');
    });
  });
  
  describe('Credit card numbers', () => {
    it('should remove credit card numbers with spaces', () => {
      const input = 'Card: 4532 1234 5678 9010';
      const result = sanitizeInput(input);
      expect(result).toBe('Card: [card]');
      expect(result).not.toContain('4532 1234 5678 9010');
    });
    
    it('should remove credit card numbers with dashes', () => {
      const input = 'Card: 4532-1234-5678-9010';
      const result = sanitizeInput(input);
      expect(result).toBe('Card: [card]');
    });
    
    it('should remove credit card numbers without separators', () => {
      const input = 'Card: 4532123456789010';
      const result = sanitizeInput(input);
      expect(result).toBe('Card: [card]');
    });
  });
  
  describe('IP addresses', () => {
    it('should remove IPv4 addresses', () => {
      const input = 'Server at 192.168.1.1';
      const result = sanitizeInput(input);
      expect(result).toBe('Server at [ip]');
      expect(result).not.toContain('192.168.1.1');
    });
    
    it('should remove multiple IP addresses', () => {
      const input = 'Connect to 10.0.0.1 or 192.168.1.100';
      const result = sanitizeInput(input);
      expect(result).toBe('Connect to [ip] or [ip]');
    });
  });
  
  describe('API keys and tokens', () => {
    it('should remove long alphanumeric tokens', () => {
      const input = 'Use key: sk_live_abc123xyz789def456ghi012jkl345mno678pqr901stu234';
      const result = sanitizeInput(input);
      expect(result).toContain('[token]');
      expect(result).not.toContain('sk_live_abc123xyz789def456ghi012jkl345mno678pqr901stu234');
    });
    
    it('should remove Gemini API keys', () => {
      const input = 'API key: AIzaSyC1234567890abcdefghijklmnopqrs';
      const result = sanitizeInput(input);
      expect(result).toContain('[token]');
    });
  });
  
  describe('URLs with tokens', () => {
    it('should remove URLs with token parameters', () => {
      const input = 'Visit https://api.example.com/data?token=abc123xyz';
      const result = sanitizeInput(input);
      expect(result).toBe('Visit [url-with-token]');
      expect(result).not.toContain('token=abc123xyz');
    });
    
    it('should remove URLs with API key parameters', () => {
      const input = 'API: https://api.example.com?api_key=secret123';
      const result = sanitizeInput(input);
      expect(result).toContain('[url-with-token]');
    });
  });
  
  describe('Mixed PII', () => {
    it('should remove multiple types of PII from same text', () => {
      const input = 'Contact John at john@example.com or 555-123-4567. SSN: 123-45-6789';
      const result = sanitizeInput(input);
      expect(result).toBe('Contact John at [email] or [phone]. SSN: [ssn]');
      expect(result).not.toContain('john@example.com');
      expect(result).not.toContain('555-123-4567');
      expect(result).not.toContain('123-45-6789');
    });
  });
  
  describe('Edge cases', () => {
    it('should handle empty string', () => {
      const result = sanitizeInput('');
      expect(result).toBe('');
    });
    
    it('should handle text with no PII', () => {
      const input = 'I want to build a portfolio website';
      const result = sanitizeInput(input);
      expect(result).toBe(input);
    });
    
    it('should handle null/undefined gracefully', () => {
      expect(sanitizeInput(null as any)).toBe(null);
      expect(sanitizeInput(undefined as any)).toBe(undefined);
    });
    
    it('should preserve non-PII numbers', () => {
      const input = 'I need 3 pages with 5 sections each';
      const result = sanitizeInput(input);
      expect(result).toBe(input);
    });
  });
});

describe('isValidApiKey', () => {
  it('should validate correct Gemini API key format', () => {
    // Gemini API keys are 39 characters: AIza + 35 more characters
    const validKey = 'AIzaSyC1234567890abcdefghijklmnopqrstuv';
    expect(isValidApiKey(validKey)).toBe(true);
  });
  
  it('should reject keys with wrong prefix', () => {
    const invalidKey = 'sk_live_1234567890abcdefghijklmnopqrs';
    expect(isValidApiKey(invalidKey)).toBe(false);
  });
  
  it('should reject keys with wrong length', () => {
    const tooShort = 'AIzaSyC123';
    const tooLong = 'AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz123456789';
    expect(isValidApiKey(tooShort)).toBe(false);
    expect(isValidApiKey(tooLong)).toBe(false);
  });
  
  it('should reject empty string', () => {
    expect(isValidApiKey('')).toBe(false);
  });
  
  it('should reject keys with invalid characters', () => {
    const invalidChars = 'AIzaSyC1234567890abcdefghijklmnopq!@';
    expect(isValidApiKey(invalidChars)).toBe(false);
  });
});
