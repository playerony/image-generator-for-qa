import { calculateAspectRatioScalar } from '../calculateAspectRatioScalar/calculateAspectRatioScalar.function';

import type { Input } from './calculateStateFromMaxArea.types';
import type { ImageGeneratorState } from '../../useImageGeneratorStore.types';

export const calculateStateFromMaxArea = ({
  maxWidth,
  maxHeight,
  ratioWidth,
  ratioHeight
}: Input): ImageGeneratorState => {
  const aspectRatioScalar = calculateAspectRatioScalar(ratioWidth, ratioHeight);

  let width = maxWidth;
  let height = Math.floor(width / aspectRatioScalar);
  width += (width - height);

  if (height > maxHeight) {
    height = maxHeight;
    width = Math.floor(height * aspectRatioScalar);
    height += (height - width);
  }

  const allPixels = width * height;
  const outputSize = Math.floor((allPixels * 3) / 1024 / 1024 * 100) / 100;

  return {
    width,
    height,
    outputSize,
    ratioWidth,
    ratioHeight,
  };
};
