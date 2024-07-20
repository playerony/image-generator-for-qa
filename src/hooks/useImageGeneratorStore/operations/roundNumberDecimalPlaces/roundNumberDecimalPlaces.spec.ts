import { describe, it } from 'vitest';

import { roundNumberDecimalPlaces } from './roundNumberDecimalPlaces.function'

describe('roundNumberDecimalPlaces', () => {
  it('should round a number to the correct number of decimal places', ({ expect }) => {
    expect(roundNumberDecimalPlaces(1.2345)).toBe(1.23);
    expect(roundNumberDecimalPlaces(1.2345, 1)).toBe(1.2);
    expect(roundNumberDecimalPlaces(1.2345, 3)).toBe(1.235);
  });
})
