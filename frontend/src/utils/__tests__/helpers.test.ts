import { describe, it, expect } from 'vitest';
import { formatPrice, formatTimeLeft } from '@/utils/helpers';

describe('Helper utilities', () => {
  describe('formatPrice', () => {
    it('formats prices with dollar sign without decimal places', () => {
      expect(formatPrice(100)).toBe('$100');
      expect(formatPrice(99.99)).toBe('$100');
      expect(formatPrice(1000)).toBe('$1,000');
      expect(formatPrice(1234567.89)).toBe('$1,234,568');
    });

    it('handles zero correctly', () => {
      expect(formatPrice(0)).toBe('$0');
    });

    it('rounds numbers correctly', () => {
      expect(formatPrice(99.999)).toBe('$100');
      expect(formatPrice(99.1)).toBe('$99');
    });
  });

  describe('formatTimeLeft', () => {
    it('formats days left correctly', () => {
      // Create a date 3 days in the future
      const future = new Date();
      future.setDate(future.getDate() + 3);
      expect(formatTimeLeft(future)).toBe('3 days left');
    });

    it('handles single day correctly', () => {
      // Create a date 1 day in the future
      const future = new Date();
      future.setDate(future.getDate() + 1);
      expect(formatTimeLeft(future)).toBe('1 day left');
    });
  });
});