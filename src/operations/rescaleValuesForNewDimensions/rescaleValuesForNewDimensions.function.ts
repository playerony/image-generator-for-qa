import { roundNumberDecimalPlaces } from "../roundNumberDecimalPlaces/roundNumberDecimalPlaces.function";
import { calculateAspectRatioScalar } from "../calculateAspectRatioScalar/calculateAspectRatioScalar.function";
import { calculateMegabytesFromPixels } from "../calculateMegabytesFromPixels/calculateMegabytesFromPixels.function";

import type { ImageGeneratorState } from "~/interfaces";
import type { Input } from "./rescaleValuesForNewDimensions.types";

export const rescaleValuesForNewDimensions = ({
  newWidth,
  newHeight,
  currentWidth,
  currentHeight,
  maxCanvasArea,
  currentRatioWidth,
  currentRatioHeight,
}: Input): ImageGeneratorState => {
  let newWidthOutput = Math.min(newWidth, maxCanvasArea.width);
  let newHeightOutput = Math.min(newHeight, maxCanvasArea.height);
  const aspectRatioScalar = calculateAspectRatioScalar(
    currentRatioWidth,
    currentRatioHeight,
  );

  if (currentHeight !== newHeight) {
    newWidthOutput = newHeightOutput * aspectRatioScalar;

    if (newWidthOutput >= maxCanvasArea.width) {
      newWidthOutput = maxCanvasArea.width;
      newHeightOutput = newWidthOutput / aspectRatioScalar;
    }
  }

  if (currentWidth !== newWidth) {
    newHeightOutput = newWidthOutput / aspectRatioScalar;

    if (newHeightOutput >= maxCanvasArea.height) {
      newHeightOutput = maxCanvasArea.height;
      newWidthOutput = newHeightOutput * aspectRatioScalar;
    }
  }

  newWidthOutput = roundNumberDecimalPlaces(newWidthOutput, 0);
  newHeightOutput = roundNumberDecimalPlaces(newHeightOutput, 0);

  return {
    width: newWidthOutput,
    height: newHeightOutput,
    ratioWidth: currentRatioWidth,
    ratioHeight: currentRatioHeight,
    outputSize: calculateMegabytesFromPixels(newWidthOutput * newHeightOutput),
  };
};
