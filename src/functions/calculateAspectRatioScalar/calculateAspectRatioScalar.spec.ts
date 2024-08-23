import { it, describe } from 'vitest';

import { calculateAspectRatioScalar } from './calculateAspectRatioScalar'

describe('calculateAspectRatioScalar', () => {
  it('should return the correct aspect ratio scalar', ({ expect }) => {
    expect(calculateAspectRatioScalar(16, 9)).toBe(1.78);
    expect(calculateAspectRatioScalar(4, 3)).toBe(1.33);
    expect(calculateAspectRatioScalar(1, 1)).toBe(1);
  });
})
