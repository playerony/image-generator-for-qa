import { $, useStore, useVisibleTask$ } from "@builder.io/qwik";

import { updateFormState, roundNumberDecimalPlaces, rescaleValuesForNewOutputSize } from '~/operations';

import type { ImageGeneratorState, MaxCanvasArea } from '~/interfaces';

// const MAX_RATIO_VALUE = 50;
const SMALLEST_CANVAS_SIZE = 4096;

export const useImageGeneratorStore = () => {
  const maxCanvasArea = useStore<MaxCanvasArea>({ width: SMALLEST_CANVAS_SIZE, height: SMALLEST_CANVAS_SIZE });
  const formState = useStore<ImageGeneratorState>(rescaleValuesForNewOutputSize({ currentRatioWidth: 16,  currentRatioHeight: 9, maxCanvasArea, newOutputSizeInMegabytes: 100 }));

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    try {
      const maxArea = await window.canvasSize.maxArea({ usePromise: true });
      Object.assign(maxCanvasArea, maxArea);
    } catch (error) {
      console.error("Error calculating image dimensions:", error);
    }
  });

  const handleDimensionsChange = $((event: FocusEvent, dimensionType: 'width' | 'height') => {
    if (!(event.target instanceof HTMLInputElement)) return;

    const inputValue = Number(event.target.value);
    if (isNaN(inputValue) || inputValue < 1) {
      event.target.value = String(formState[dimensionType]);
      return;
    }

    const roundedValue = roundNumberDecimalPlaces(inputValue);
    Object.assign(formState, updateFormState({
      formState,
      maxCanvasArea,
      updatedFormState: {
        width: dimensionType === 'width' ? roundedValue : formState.width,
        height: dimensionType === 'height' ? roundedValue : formState.height
      }
    }));
  });

  const onWidthChange = $((event: FocusEvent) => handleDimensionsChange(event, 'width'));
  const onHeightChange = $((event: FocusEvent) => handleDimensionsChange(event, 'height'));

  const onOutputSizeChange = $((event: FocusEvent) => {
    if (!(event.target instanceof HTMLInputElement)) return;

    const inputValue = Number(event.target.value);
    if (isNaN(inputValue) || inputValue <= 0.1) {
      event.target.value = String(formState.outputSize);
      return;
    }

    const roundedValue = roundNumberDecimalPlaces(inputValue);
    Object.assign(formState, updateFormState({ formState, updatedFormState: { outputSize: roundedValue }, maxCanvasArea }));
  });

  return { formState, onOutputSizeChange, onWidthChange, onHeightChange };
};
