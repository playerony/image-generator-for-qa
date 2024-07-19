import { useStore, useVisibleTask$ } from "@builder.io/qwik";

const DEFAULT_RATIO_WIDTH = 16;
const DEFAULT_RATIO_HEIGHT = 9;
const SMALLEST_CANVAS_SIZE = 4096;
const SMALLEST_CANVAS_PIXELS = SMALLEST_CANVAS_SIZE * SMALLEST_CANVAS_SIZE;

interface ImageGeneratorState {
  width: number;
  height: number;
  outputSize: number;
  ratioWidth: number;
  ratioHeight: number;
}

const calculateStoreValuesBasedOnPixels = (pixels: number): ImageGeneratorState => {
  const scalar = DEFAULT_RATIO_WIDTH / DEFAULT_RATIO_HEIGHT;
  const width = Math.floor(Math.sqrt(pixels / scalar));
  const height = Math.floor(width * scalar);
  const outputSize = Math.floor((pixels * 3) / 1024 / 1024 * 100) / 100;

  return {
    width,
    height,
    outputSize,
    ratioWidth: DEFAULT_RATIO_WIDTH,
    ratioHeight: DEFAULT_RATIO_HEIGHT,
  };
}

const useImageGeneratorStore = () => {
  const state = useStore<ImageGeneratorState>({
    width: 1280,
    height: 720,
    outputSize: 1,
    ratioWidth: 16,
    ratioHeight: 9,
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    try {
      if (typeof window === "undefined" || !window.canvasSize) {
        const { width, height } = calculateStoreValuesBasedOnPixels(SMALLEST_CANVAS_PIXELS);
        Object.assign(state, calculateStoreValuesBasedOnPixels(width * height));
        return;
      }

      const { width, height } = await window.canvasSize.maxArea({ usePromise: true });
      Object.assign(state, calculateStoreValuesBasedOnPixels(width * height));
    } catch (error) {
      console.error("Error calculating image dimensions:", error);
      Object.assign(state, calculateStoreValuesBasedOnPixels(SMALLEST_CANVAS_PIXELS));
    }
  });

  return state;
}

export default useImageGeneratorStore;