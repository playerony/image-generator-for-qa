import { rescaleValuesForNewDimensions } from "../rescaleValuesForNewDimensions/rescaleValuesForNewDimensions.function";
import { rescaleValuesForNewOutputSize } from "../rescaleValuesForNewOutputSize/rescaleValuesForNewOutputSize.function";

import type { UpdateFormStateParams } from "./updateFormState.types";

export const updateFormState = ({
  formState,
  updatedFormState,
  maxCanvasArea,
}: UpdateFormStateParams) => {
  if (Object.keys(updatedFormState).length === 0) {
    return formState;
  }

  if (typeof updatedFormState.outputSize === "number") {
    return rescaleValuesForNewOutputSize({
      maxCanvasArea,
      currentRatioWidth: formState.ratioWidth,
      currentRatioHeight: formState.ratioHeight,
      newOutputSizeInMegabytes: updatedFormState.outputSize,
    });
  }

  if (
    typeof updatedFormState.width === "number" ||
    typeof updatedFormState.height === "number"
  ) {
    return rescaleValuesForNewDimensions({
      maxCanvasArea,
      currentWidth: formState.width,
      currentHeight: formState.height,
      currentRatioWidth: formState.ratioWidth,
      currentRatioHeight: formState.ratioHeight,
      newWidth: updatedFormState.width ?? formState.width,
      newHeight: updatedFormState.height ?? formState.height,
    });
  }

  if (
    typeof updatedFormState.ratioWidth === "number" ||
    typeof updatedFormState.ratioHeight === "number"
  ) {
    return rescaleValuesForNewOutputSize({
      maxCanvasArea,
      newOutputSizeInMegabytes: formState.outputSize,
      currentRatioWidth: updatedFormState.ratioWidth ?? formState.ratioWidth,
      currentRatioHeight: updatedFormState.ratioHeight ?? formState.ratioHeight,
    });
  }

  return formState;
};
