import { describe, it } from 'vitest';

import { rescaleValuesForNewOutputSize } from './rescaleValuesForNewOutputSize'

describe('rescaleValuesForNewOutputSize', () => {
  it('should return the correct state', ({ expect }) => {
    expect(rescaleValuesForNewOutputSize({
      currentRatioWidth: 1,
      currentRatioHeight: 1,
      newOutputSizeInMegabytes: 10,
      maxCanvasArea: { width: 4096, height: 4096 },
    })).toEqual({
      width: 1619,
      height: 1619,
      ratioWidth: 1,
      ratioHeight: 1,
      outputSize: 10,
    });
    expect(rescaleValuesForNewOutputSize({
      currentRatioWidth: 16,
      currentRatioHeight: 9,
      newOutputSizeInMegabytes: 5,
      maxCanvasArea: { width: 4096, height: 4096 },
    })).toEqual({
      width: 1527,
      height: 858,
      ratioWidth: 16,
      ratioHeight: 9,
      outputSize: 5,
    });
    expect(rescaleValuesForNewOutputSize({
      currentRatioWidth: 9,
      currentRatioHeight: 16,
      newOutputSizeInMegabytes: 500,
      maxCanvasArea: { width: 8192, height: 8192 },
    })).toEqual({
      width: 4588,
      height: 8192,
      ratioWidth: 9,
      ratioHeight: 16,
      outputSize: 143.38,
    });
    expect(rescaleValuesForNewOutputSize({
      currentRatioWidth: 4,
      currentRatioHeight: 3,
      newOutputSizeInMegabytes: 10,
      maxCanvasArea: { width: 4096, height: 4096 },
    })).toEqual({
      width: 1867,
      height: 1404,
      ratioWidth: 4,
      ratioHeight: 3,
      outputSize: 10,
    });
  });
})
