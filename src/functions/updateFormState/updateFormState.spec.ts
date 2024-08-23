import { Mock, beforeEach, describe, it, vi } from 'vitest';

import { rescaleValuesForNewDimensions } from '../rescaleValuesForNewDimensions/rescaleValuesForNewDimensions';
import { rescaleValuesForNewOutputSize } from '../rescaleValuesForNewOutputSize/rescaleValuesForNewOutputSize';
import { updateFormState } from './updateFormState';

vi.mock('../rescaleValuesForNewDimensions/rescaleValuesForNewDimensions');
vi.mock('../rescaleValuesForNewOutputSize/rescaleValuesForNewOutputSize');

describe('updateFormState', () => {
  const defaultFormState = {
    width: 100,
    height: 100,
    ratioWidth: 1,
    ratioHeight: 1,
    outputSize: 1,
  };
  const maxCanvasArea = { width: 1000, height: 1000 };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return original form state if updatedFormState is empty', ({ expect }) => {
    const result = updateFormState({
      formState: defaultFormState,
      updatedFormState: {},
      maxCanvasArea,
    });

    expect(result).toEqual(defaultFormState);
  });

  it('should call rescaleValuesForNewOutputSize when outputSize is updated', ({ expect }) => {
    const mockResult = { ...defaultFormState, outputSize: 2 };

    (rescaleValuesForNewOutputSize as Mock).mockReturnValue(mockResult);

    const result = updateFormState({
      formState: defaultFormState,
      updatedFormState: { outputSize: 2 },
      maxCanvasArea,
    });

    expect(rescaleValuesForNewOutputSize).toHaveBeenCalledWith({
      maxCanvasArea,
      currentRatioWidth: defaultFormState.ratioWidth,
      currentRatioHeight: defaultFormState.ratioHeight,
      newOutputSizeInMegabytes: 2,
    });
    expect(result).toEqual(mockResult);
  });

  it('should call rescaleValuesForNewDimensions when width is updated', ({ expect }) => {
    const mockResult = { ...defaultFormState, width: 200 };

    (rescaleValuesForNewDimensions as Mock).mockReturnValue(mockResult);

    const result = updateFormState({
      formState: defaultFormState,
      updatedFormState: { width: 200 },
      maxCanvasArea,
    });

    expect(rescaleValuesForNewDimensions).toHaveBeenCalledWith({
      maxCanvasArea,
      currentWidth: defaultFormState.width,
      currentHeight: defaultFormState.height,
      currentRatioWidth: defaultFormState.ratioWidth,
      currentRatioHeight: defaultFormState.ratioHeight,
      newWidth: 200,
      newHeight: defaultFormState.height,
    });
    expect(result).toEqual(mockResult);
  });

  it('should call rescaleValuesForNewDimensions when height is updated', ({ expect }) => {
    const mockResult = { ...defaultFormState, height: 200 };

    (rescaleValuesForNewDimensions as Mock).mockReturnValue(mockResult);

    const result = updateFormState({
      formState: defaultFormState,
      updatedFormState: { height: 200 },
      maxCanvasArea,
    });

    expect(rescaleValuesForNewDimensions).toHaveBeenCalledWith({
      maxCanvasArea,
      currentWidth: defaultFormState.width,
      currentHeight: defaultFormState.height,
      currentRatioWidth: defaultFormState.ratioWidth,
      currentRatioHeight: defaultFormState.ratioHeight,
      newWidth: defaultFormState.width,
      newHeight: 200,
    });
    expect(result).toEqual(mockResult);
  });

  it('should call rescaleValuesForNewOutputSize when ratioWidth is updated', ({ expect }) => {
    const mockResult = { ...defaultFormState, ratioWidth: 2 };

    (rescaleValuesForNewOutputSize as Mock).mockReturnValue(mockResult);

    const result = updateFormState({
      formState: defaultFormState,
      updatedFormState: { ratioWidth: 2 },
      maxCanvasArea,
    });

    expect(rescaleValuesForNewOutputSize).toHaveBeenCalledWith({
      maxCanvasArea,
      newOutputSizeInMegabytes: defaultFormState.outputSize,
      currentRatioWidth: 2,
      currentRatioHeight: defaultFormState.ratioHeight,
    });
    expect(result).toEqual(mockResult);
  });

  it('should call rescaleValuesForNewOutputSize when ratioHeight is updated', ({ expect }) => {
    const mockResult = { ...defaultFormState, ratioHeight: 2 };

    (rescaleValuesForNewOutputSize as Mock).mockReturnValue(mockResult);

    const result = updateFormState({
      formState: defaultFormState,
      updatedFormState: { ratioHeight: 2 },
      maxCanvasArea,
    });

    expect(rescaleValuesForNewOutputSize).toHaveBeenCalledWith({
      maxCanvasArea,
      newOutputSizeInMegabytes: defaultFormState.outputSize,
      currentRatioWidth: defaultFormState.ratioWidth,
      currentRatioHeight: 2,
    });
    expect(result).toEqual(mockResult);
  });

  it('should return original form state if no relevant properties are updated', ({ expect }) => {
    const result = updateFormState({
      formState: defaultFormState,
      // @ts-expect-error
      updatedFormState: { someOtherProperty: 'value' },
      maxCanvasArea,
    });

    expect(result).toEqual(defaultFormState);
  });
});
