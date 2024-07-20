import { describe, it } from 'vitest';

import { calculateStateFromMaxArea } from './calculateStateFromMaxArea.function'

describe('calculateStateFromMaxArea', () => {
  it('should return the correct state', ({ expect }) => {
    expect(calculateStateFromMaxArea({ maxWidth: 4096, maxHeight: 4096, ratioWidth: 16, ratioHeight: 9 })).toEqual({
      width: 5891,
      height: 2301,
      ratioWidth: 16,
      ratioHeight: 9,
      outputSize: 38.78,
    });
    expect(calculateStateFromMaxArea({ maxWidth: 4096, maxHeight: 4096, ratioWidth: 9, ratioHeight: 16 })).toEqual({
      width: 2293,
      height: 5899,
      ratioWidth: 9,
      ratioHeight: 16,
      outputSize: 38.69,
    });
    expect(calculateStateFromMaxArea({ maxWidth: 16384, maxHeight: 16384, ratioWidth: 4, ratioHeight: 3 })).toEqual({
      width: 20450,
      height: 12318,
      ratioWidth: 4,
      ratioHeight: 3,
      outputSize: 720.7,
    });
    expect(calculateStateFromMaxArea({ maxWidth: 16384, maxHeight: 16384, ratioWidth: 1, ratioHeight: 1 })).toEqual({
      width: 16384,
      height: 16384,
      ratioWidth: 1,
      ratioHeight: 1,
      outputSize: 768,
    });
  });
})
