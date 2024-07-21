import type { MaxCanvasArea } from '~/interfaces';

export interface Input {
  newWidth: number,
  newHeight: number,
  currentWidth: number,
  currentHeight: number,
  currentRatioWidth: number,
  currentRatioHeight: number,
  maxCanvasArea: MaxCanvasArea,
}
