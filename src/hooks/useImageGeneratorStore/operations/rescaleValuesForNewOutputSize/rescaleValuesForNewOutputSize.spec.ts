import { describe, it } from 'vitest';

import { rescaleValuesForNewOutputSize } from './rescaleValuesForNewOutputSize.function'

describe('rescaleValuesForNewOutputSize', () => {
  it('should return the correct state', ({ expect }) => {
    expect(rescaleValuesForNewOutputSize(1, 1, { width: 4096, height: 4096 }, 10)).toEqual({
      width: 1619,
      height: 1619,
      ratioWidth: 1,
      ratioHeight: 1,
      outputSize: 10,
    });
    expect(rescaleValuesForNewOutputSize(16, 9, { width: 4096, height: 4096 }, 5)).toEqual({
      width: 1527,
      height: 858,
      ratioWidth: 16,
      ratioHeight: 9,
      outputSize: 5,
    });
    expect(rescaleValuesForNewOutputSize(9, 16, { width: 8192, height: 8192 }, 500)).toEqual({
      width: 4588,
      height: 8192,
      ratioWidth: 9,
      ratioHeight: 16,
      outputSize: 143.38,
    });
    expect(rescaleValuesForNewOutputSize(4, 3, { width: 4096, height: 4096 }, 10)).toEqual({
      width: 1867,
      height: 1404,
      ratioWidth: 4,
      ratioHeight: 3,
      outputSize: 10,
    });
  });
})
