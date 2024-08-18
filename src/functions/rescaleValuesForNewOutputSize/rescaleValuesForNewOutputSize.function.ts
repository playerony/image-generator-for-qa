import { roundNumberDecimalPlaces } from "../roundNumberDecimalPlaces/roundNumberDecimalPlaces.function";
import { calculateAspectRatioScalar } from "../calculateAspectRatioScalar/calculateAspectRatioScalar.function";
import { calculatePixelsFromMegabytes } from "../calculatePixelsFromMegabytes/calculatePixelsFromMegabytes.function";
import { calculateMegabytesFromPixels } from "../calculateMegabytesFromPixels/calculateMegabytesFromPixels.function";

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

  newWidthOutput = roundNumberDecimalPlaces(newWidthOutput, 0) || 1;
  newHeightOutput = roundNumberDecimalPlaces(newHeightOutput, 0) || 1;

  return {
    width: newWidthOutput,
    height: newHeightOutput,
    ratioWidth: currentRatioWidth,
    ratioHeight: currentRatioHeight,
    outputSize: calculateMegabytesFromPixels(newWidthOutput * newHeightOutput),
  };
};
