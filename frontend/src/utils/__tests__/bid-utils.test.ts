import { describe, it, expect } from 'vitest';
import { getMinimumBidIncrement } from '../../components/bid-form';

// Since the function is exported as part of the component file,
// we'll create a quick test focusing just on that utility function
describe('Bid utility functions', () => {
  describe('getMinimumBidIncrement', () => {
    it('returns $5 increment for bids under $100', () => {
      expect(getMinimumBidIncrement(0)).toBe(5);
      expect(getMinimumBidIncrement(50)).toBe(5);
      expect(getMinimumBidIncrement(99.99)).toBe(5);
    });

    it('returns $10 increment for bids between $100 and $499', () => {
      expect(getMinimumBidIncrement(100)).toBe(10);
      expect(getMinimumBidIncrement(250)).toBe(10);
      expect(getMinimumBidIncrement(499.99)).toBe(10);
    });

    it('returns $25 increment for bids between $500 and $999', () => {
      expect(getMinimumBidIncrement(500)).toBe(25);
      expect(getMinimumBidIncrement(750)).toBe(25);
      expect(getMinimumBidIncrement(999.99)).toBe(25);
    });

    it('returns $50 increment for bids between $1000 and $4999', () => {
      expect(getMinimumBidIncrement(1000)).toBe(50);
      expect(getMinimumBidIncrement(2500)).toBe(50);
      expect(getMinimumBidIncrement(4999.99)).toBe(50);
    });

    it('returns $100 increment for bids of $5000 or more', () => {
      expect(getMinimumBidIncrement(5000)).toBe(100);
      expect(getMinimumBidIncrement(10000)).toBe(100);
      expect(getMinimumBidIncrement(1000000)).toBe(100);
    });
  });
});