import { describe, it } from 'vitest';

import { calculateMegabytesFromPixels } from './calculateMegabytesFromPixels.function'

describe('calculateMegabytesFromPixels', () => {
  it('should round a number to the correct number of decimal places', ({ expect }) => {
    expect(calculateMegabytesFromPixels(52428800)).toBe(200);
    expect(calculateMegabytesFromPixels(262144)).toBe(1);
    expect(calculateMegabytesFromPixels(78643)).toBe(0.3);
  });
})
