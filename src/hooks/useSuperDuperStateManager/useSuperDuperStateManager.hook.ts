import { $, useStore } from "@builder.io/qwik";

import {
  updateFormState,
  roundNumberDecimalPlaces,
  rescaleValuesForNewOutputSize,
} from "~/operations";

import type { ImageGeneratorState, MaxCanvasArea } from "~/interfaces";

const MAX_CANVAS_AREA: MaxCanvasArea = {
  width: 4096 * 5,
  height: 4096 * 5,
};

export const useSuperDuperStateManager = () => {
  const formState = useStore<ImageGeneratorState>(
    rescaleValuesForNewOutputSize({
      currentRatioWidth: 16,
      currentRatioHeight: 9,
      maxCanvasArea: MAX_CANVAS_AREA,
      newOutputSizeInMegabytes: 10,
    }),
  );

  const handleDimensionsChange = $(
    (event: FocusEvent, dimensionType: "width" | "height") => {
      if (!(event.target instanceof HTMLInputElement)) return;

      const inputValue = Number(event.target.value);
      if (isNaN(inputValue) || inputValue < 1) {
        event.target.value = String(formState[dimensionType]);
        return;
      }

      const roundedValue = roundNumberDecimalPlaces(inputValue);
      Object.assign(
        formState,
        updateFormState({
          formState,
          maxCanvasArea: MAX_CANVAS_AREA,
          updatedFormState: {
            width: dimensionType === "width" ? roundedValue : formState.width,
            height:
              dimensionType === "height" ? roundedValue : formState.height,
          },
        }),
      );
    },
  );

  const onWidthChange = $((event: FocusEvent) =>
    handleDimensionsChange(event, "width"),
  );
  const onHeightChange = $((event: FocusEvent) =>
    handleDimensionsChange(event, "height"),
  );

  const onOutputSizeChange = $((event: FocusEvent) => {
    if (!(event.target instanceof HTMLInputElement)) return;

    const inputValue = Number(event.target.value);
    if (isNaN(inputValue) || inputValue <= 0.1) {
      event.target.value = String(formState.outputSize);
      return;
    }

    const roundedValue = roundNumberDecimalPlaces(inputValue);
    Object.assign(
      formState,
      updateFormState({
        formState,
        updatedFormState: { outputSize: roundedValue },
        maxCanvasArea: MAX_CANVAS_AREA,
      }),
    );
  });

  const handleRatioChange = $(
    (event: FocusEvent, dimensionType: "width" | "height") => {
      if (!(event.target instanceof HTMLInputElement)) return;

      const inputValue = Number(event.target.value);
      if (isNaN(inputValue) || inputValue < 1) {
        event.target.value = String(formState[dimensionType]);
        return;
      }

      const roundedValue = roundNumberDecimalPlaces(inputValue);
      Object.assign(
        formState,
        updateFormState({
          formState,
          maxCanvasArea: MAX_CANVAS_AREA,
          updatedFormState: {
            ratioWidth:
              dimensionType === "width" ? roundedValue : formState.ratioWidth,
            ratioHeight:
              dimensionType === "height" ? roundedValue : formState.ratioHeight,
          },
        }),
      );
    },
  );

  const onRatioWidthChange = $((event: FocusEvent) =>
    handleRatioChange(event, "width"),
  );
  const onRatioHeightChange = $((event: FocusEvent) =>
    handleRatioChange(event, "height"),
  );

  return {
    formState,
    onOutputSizeChange,
    onWidthChange,
    onHeightChange,
    onRatioWidthChange,
    onRatioHeightChange,
  };
};
