import { useStore, useVisibleTask$ } from "@builder.io/qwik";

import { calculateStateFromMaxArea } from './operations'

import type { ImageGeneratorState } from './useImageGeneratorStore.types'

const DEFAULT_RATIO_WIDTH = 16;
const DEFAULT_RATIO_HEIGHT = 9;
const SMALLEST_CANVAS_SIZE = 4096;

export const useImageGeneratorStore = () => {
  const maxAreaState = useStore({ width: SMALLEST_CANVAS_SIZE, height: SMALLEST_CANVAS_SIZE });
  const formState = useStore<ImageGeneratorState>({ width: SMALLEST_CANVAS_SIZE, height: SMALLEST_CANVAS_SIZE, outputSize: 1, ratioWidth: 1, ratioHeight: 1 });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    try {
      const maxArea = await window.canvasSize.maxArea({ usePromise: true });
      Object.assign(maxAreaState, maxArea);
      Object.assign(
        formState,
        calculateStateFromMaxArea({
          maxWidth: maxArea.width,
          maxHeight: maxArea.height,
          ratioWidth: DEFAULT_RATIO_WIDTH,
          ratioHeight: DEFAULT_RATIO_HEIGHT
        })
      );
    } catch (error) {
      console.error("Error calculating image dimensions:", error);
      Object.assign(
        formState,
        calculateStateFromMaxArea({
          maxWidth: maxAreaState.width,
          maxHeight: maxAreaState.height,
          ratioWidth: DEFAULT_RATIO_WIDTH,
          ratioHeight: DEFAULT_RATIO_HEIGHT
        })
      );
    }
  });

  return formState;
}
