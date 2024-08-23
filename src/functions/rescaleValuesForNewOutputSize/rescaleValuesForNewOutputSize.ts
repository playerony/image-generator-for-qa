import { roundNumberDecimalPlaces } from "../roundNumberDecimalPlaces/roundNumberDecimalPlaces";
import { calculateAspectRatioScalar } from "../calculateAspectRatioScalar/calculateAspectRatioScalar";
import { calculatePixelsFromMegabytes } from "../calculatePixelsFromMegabytes/calculatePixelsFromMegabytes";
import { calculateMegabytesFromPixels } from "../calculateMegabytesFromPixels/calculateMegabytesFromPixels";

import type { ImageGeneratorState } from "~/interfaces";
import type { RescaleValuesForNewOutputSizeParams } from "./rescaleValuesForNewOutputSize.types";

export const rescaleValuesForNewOutputSize = ({
  maxCanvasArea,
  currentRatioWidth,
  currentRatioHeight,
  newOutputSizeInMegabytes,
}: RescaleValuesForNewOutputSizeParams): ImageGeneratorState => {
  const targetPixels = calculatePixelsFromMegabytes(newOutputSizeInMegabytes);
  const aspectRatioScalar = calculateAspectRatioScalar(
    currentRatioWidth,
    currentRatioHeight,
  );

  let newWidthOutput = Math.sqrt(targetPixels * aspectRatioScalar);
  let newHeightOutput = newWidthOutput / aspectRatioScalar;

  if (newWidthOutput > maxCanvasArea.width) {
    newWidthOutput = maxCanvasArea.width;
    newHeightOutput = newWidthOutput / aspectRatioScalar;
  }
  if (newHeightOutput > maxCanvasArea.height) {
    newHeightOutput = maxCanvasArea.height;
    newWidthOutput = newHeightOutput * aspectRatioScalar;
  }

  newWidthOutput = roundNumberDecimalPlaces(newWidthOutput, 0) || 2;
  newHeightOutput = roundNumberDecimalPlaces(newHeightOutput, 0) || 2;

  return {
    width: newWidthOutput,
    height: newHeightOutput,
    ratioWidth: currentRatioWidth,
    ratioHeight: currentRatioHeight,
    outputSize: calculateMegabytesFromPixels(newWidthOutput * newHeightOutput),
  };
};
