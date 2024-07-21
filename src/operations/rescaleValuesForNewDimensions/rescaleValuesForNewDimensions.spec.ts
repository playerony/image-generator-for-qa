import { describe, it } from 'vitest';

import { rescaleValuesForNewDimensions } from './rescaleValuesForNewDimensions.function'

describe('rescaleValuesForNewDimensions', () => {
  it('should return the correct state', ({ expect }) => {
    expect(rescaleValuesForNewDimensions({
      newWidth: 1800,
      newHeight: 720,
      currentHeight: 720,
      currentWidth: 1280,
      currentRatioWidth: 16,
      currentRatioHeight: 9,
      maxCanvasArea: { width: 4096, height: 4096 },
    })).toEqual({
      width: 1800,
      height: 1011,
      ratioHeight: 9,
      ratioWidth: 16,
      outputSize: 6.94,
    });
    expect(rescaleValuesForNewDimensions({
      newWidth: 2000,
      newHeight: 1000,
      currentHeight: 1000,
      currentWidth: 1000,
      currentRatioWidth: 1,
      currentRatioHeight: 1,
      maxCanvasArea: { width: 4096, height: 4096 },
    })).toEqual({
      width: 2000,
      height: 2000,
      ratioWidth: 1,
      ratioHeight: 1,
      outputSize: 15.26,
    });
    expect(rescaleValuesForNewDimensions({
      newWidth: 20000,
      newHeight: 1000,
      currentWidth: 2000,
      currentHeight: 1000,
      currentRatioWidth: 2,
      currentRatioHeight: 1,
      maxCanvasArea: { width: 16384, height: 16384 },
    })).toEqual({
      width: 16384,
      height: 8192,
      ratioWidth: 2,
      ratioHeight: 1,
      outputSize: 512,
    });
    expect(rescaleValuesForNewDimensions({
      newWidth: 2646,
      newHeight: 20000,
      currentWidth: 2646,
      currentHeight: 1486,
      currentRatioWidth: 2,
      currentRatioHeight: 1,
      maxCanvasArea: { width: 16384, height: 16384 },
    })).toEqual({
      width: 16384,
      height: 8192,
      ratioWidth: 2,
      ratioHeight: 1,
      outputSize: 512,
    });
    expect(rescaleValuesForNewDimensions({
      newWidth: 16384,
      newHeight: 20000,
      currentWidth: 16384,
      currentHeight: 9204,
      currentRatioWidth: 16,
      currentRatioHeight: 9,
      maxCanvasArea: { width: 16384, height: 16384 },
    })).toEqual({
      width: 16384,
      height: 9204,
      ratioWidth: 16,
      ratioHeight: 9,
      outputSize: 575.25,
    });
  });
})
