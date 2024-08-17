import { describe, it } from 'vitest';

import { calculatePixelsFromMegabytes } from './calculatePixelsFromMegabytes.function'

describe('calculatePixelsFromMegabytes', () => {
  it('should round a number to the correct number of decimal places', ({ expect }) => {
    expect(calculatePixelsFromMegabytes(200)).toBe(52428800);
    expect(calculatePixelsFromMegabytes(1)).toBe(262144);
    expect(calculatePixelsFromMegabytes(0.3)).toBe(78643);
  });
})
