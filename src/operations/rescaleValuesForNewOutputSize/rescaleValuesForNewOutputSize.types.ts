import type { MaxCanvasArea } from '~/interfaces';

export interface Input {
  currentRatioWidth: number,
  currentRatioHeight: number,
  maxCanvasArea: MaxCanvasArea,
  newOutputSizeInMegabytes: number
}
