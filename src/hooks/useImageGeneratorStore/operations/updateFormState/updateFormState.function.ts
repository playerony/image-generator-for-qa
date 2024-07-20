import { rescaleValuesForNewOutputSize } from '../rescaleValuesForNewOutputSize/rescaleValuesForNewOutputSize.function'

import type { Input } from './updateFormState.types';

export const updateFormState = ({ formState, updatedFormState, maxCanvasArea }: Input) => {
  if (Object.keys(updatedFormState).length === 0) {
    return null;
  }

  if (typeof updatedFormState.outputSize === 'number') {
    return rescaleValuesForNewOutputSize(formState.ratioWidth, formState.ratioHeight, maxCanvasArea, updatedFormState.outputSize);
  }

  return formState;
}
