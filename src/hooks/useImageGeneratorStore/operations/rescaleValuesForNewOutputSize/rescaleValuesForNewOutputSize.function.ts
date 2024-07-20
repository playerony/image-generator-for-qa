import { roundNumberDecimalPlaces } from '../roundNumberDecimalPlaces/roundNumberDecimalPlaces.function';
import { calculateAspectRatioScalar } from '../calculateAspectRatioScalar/calculateAspectRatioScalar.function'
import { calculatePixelsFromMegabytes } from '../calculatePixelsFromMegabytes/calculatePixelsFromMegabytes.function'
import { calculateMegabytesFromPixels } from '../calculateMegabytesFromPixels/calculateMegabytesFromPixels.function'

import type { ImageGeneratorState, MaxCanvasArea } from './../../useImageGeneratorStore.types';

export const rescaleValuesForNewOutputSize = (
  ratioWidth: number,
  ratioHeight: number,
  maxCanvasArea: MaxCanvasArea,
  newOutputSizeInMegabytes: number
): ImageGeneratorState => {
  const aspectRatio = calculateAspectRatioScalar(ratioWidth, ratioHeight);
  const targetPixels = calculatePixelsFromMegabytes(newOutputSizeInMegabytes);

  let newWidth = Math.sqrt(targetPixels * aspectRatio);
  let newHeight = newWidth / aspectRatio;

  if (newWidth > maxCanvasArea.width) {
    newWidth = maxCanvasArea.width;
    newHeight = newWidth / aspectRatio;
  }
  if (newHeight > maxCanvasArea.height) {
    newHeight = maxCanvasArea.height;
    newWidth = newHeight * aspectRatio;
  }

  newWidth = roundNumberDecimalPlaces(newWidth, 0);
  newHeight = roundNumberDecimalPlaces(newHeight, 0);

  return {
    ratioWidth,
    ratioHeight,
    width: newWidth,
    height: newHeight,
    outputSize: calculateMegabytesFromPixels(newWidth * newHeight),
  };
};