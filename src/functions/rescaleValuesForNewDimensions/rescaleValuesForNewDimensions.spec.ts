import { describe, it } from 'vitest';

import { rescaleValuesForNewDimensions } from './rescaleValuesForNewDimensions'

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

  it('should return correct values when new dimensions are within maxCanvasArea', ({ expect }) => {
    const input = {
      newWidth: 800,
      newHeight: 600,
      currentWidth: 1000,
      currentHeight: 750,
      maxCanvasArea: { width: 1920, height: 1080 },
      currentRatioWidth: 4,
      currentRatioHeight: 3,
    };

    const result = rescaleValuesForNewDimensions(input);

    expect(result).toEqual({
      width: 798,
      height: 600,
      ratioWidth: 4,
      ratioHeight: 3,
      outputSize: 1.83,
    });
  });

  it('should adjust dimensions when new width exceeds maxCanvasArea.width', ({ expect }) => {
    const input = {
      newWidth: 2000,
      newHeight: 1000,
      currentWidth: 1000,
      currentHeight: 500,
      maxCanvasArea: { width: 1920, height: 1080 },
      currentRatioWidth: 2,
      currentRatioHeight: 1,
    };

    const result = rescaleValuesForNewDimensions(input);

    expect(result).toEqual({
      width: 1920,
      height: 960,
      ratioWidth: 2,
      ratioHeight: 1,
      outputSize: 7.03,
    });
  });

  it('should adjust dimensions when new height exceeds maxCanvasArea.height', ({ expect }) => {
    const input = {
      newWidth: 1000,
      newHeight: 1200,
      currentWidth: 800,
      currentHeight: 600,
      maxCanvasArea: { width: 1920, height: 1080 },
      currentRatioWidth: 4,
      currentRatioHeight: 3,
    };

    const result = rescaleValuesForNewDimensions(input);

    expect(result).toEqual({
      width: 1436,
      height: 1080,
      ratioWidth: 4,
      ratioHeight: 3,
      outputSize: 5.92,
    });
  });

  it('should maintain aspect ratio when only width is changed', ({ expect }) => {
    const input = {
      newWidth: 1600,
      newHeight: 900,
      currentWidth: 1280,
      currentHeight: 720,
      maxCanvasArea: { width: 1920, height: 1080 },
      currentRatioWidth: 16,
      currentRatioHeight: 9,
    };

    const result = rescaleValuesForNewDimensions(input);

    expect(result).toEqual({
      width: 1602,
      height: 900,
      ratioWidth: 16,
      ratioHeight: 9,
      outputSize: 5.5,
    });
  });

  it('should maintain aspect ratio when only height is changed', ({ expect }) => {
    const input = {
      newWidth: 1280,
      newHeight: 1080,
      currentWidth: 1280,
      currentHeight: 720,
      maxCanvasArea: { width: 1920, height: 1080 },
      currentRatioWidth: 16,
      currentRatioHeight: 9,
    };

    const result = rescaleValuesForNewDimensions(input);

    expect(result).toEqual({
      width: 1920,
      height: 1079,
      ratioWidth: 16,
      ratioHeight: 9,
      outputSize: 7.9
    });
  });
})
