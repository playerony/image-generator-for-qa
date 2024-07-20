import { $, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { updateFormState, roundNumberDecimalPlaces } from './operations';

import type { ImageGeneratorState, MaxCanvasArea } from './useImageGeneratorStore.types';

// const MAX_RATIO_VALUE = 50;
const DETAULT_OUTPUT_SIZE = 50;
const DEFAULT_RATIO_WIDTH = 16;
const DEFAULT_RATIO_HEIGHT = 9;
const SMALLEST_CANVAS_SIZE = 4096;

export const useImageGeneratorStore = () => {
  const maxCanvasArea = useStore<MaxCanvasArea>({
    width: SMALLEST_CANVAS_SIZE,
    height: SMALLEST_CANVAS_SIZE
  });
  const formState = useStore<ImageGeneratorState>({
    width: SMALLEST_CANVAS_SIZE,
    height: SMALLEST_CANVAS_SIZE,
    outputSize: DETAULT_OUTPUT_SIZE,
    ratioWidth: DEFAULT_RATIO_WIDTH,
    ratioHeight: DEFAULT_RATIO_HEIGHT
  });

  useVisibleTask$(async () => {
    try {
      const maxArea = await window.canvasSize.maxArea({ usePromise: true });
      Object.assign(maxCanvasArea, maxArea);
      // updateFormState(DEFAULT_RATIO_WIDTH, DEFAULT_RATIO_HEIGHT, DETAULT_OUTPUT_SIZE);
    } catch (error) {
      console.error("Error calculating image dimensions:", error);
      // updateFormState(DEFAULT_RATIO_WIDTH, DEFAULT_RATIO_HEIGHT, DETAULT_OUTPUT_SIZE);
    }
  });

  // const handleRatioChange = $((event: FocusEvent, ratioType: 'width' | 'height') => {
  //   if (!(event.target instanceof HTMLInputElement)) return;

  //   const inputValue = Number(event.target.value);
  //   if (isNaN(inputValue) || inputValue < 0 || inputValue > MAX_RATIO_VALUE) {
  //     event.target.value = String(formState[`ratio${ratioType.charAt(0).toUpperCase() + ratioType.slice(1)}` as keyof ImageGeneratorState]);
  //     return;
  //   }

  //   const roundedValue = roundNumberDecimalPlaces(inputValue);
  //   updateFormState(
  //     ratioType === 'width' ? roundedValue : formState.ratioWidth,
  //     ratioType === 'height' ? roundedValue : formState.ratioHeight
  //   );
  // });

  // const onRatioWidthChange = $((event: FocusEvent) => handleRatioChange(event, 'width'));
  // const onRatioHeightChange = $((event: FocusEvent) => handleRatioChange(event, 'height'));

  const onOutputSizeChange = $((event: FocusEvent) => {
    if (!(event.target instanceof HTMLInputElement)) return;

    const inputValue = Number(event.target.value);
    if (isNaN(inputValue) || inputValue < 0) {
      event.target.value = String(formState.outputSize);
      return;
    }

    const roundedValue = roundNumberDecimalPlaces(inputValue);
    Object.assign(
      formState,
      updateFormState({ formState, updatedFormState: { outputSize: roundedValue }, maxCanvasArea })
    );
  });

  return { formState, onOutputSizeChange };
};
