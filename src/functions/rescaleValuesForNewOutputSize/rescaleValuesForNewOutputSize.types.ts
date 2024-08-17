import type { MaxCanvasArea } from "~/interfaces";

export interface RescaleValuesForNewOutputSizeParams {
  currentRatioWidth: number;
  currentRatioHeight: number;
  maxCanvasArea: MaxCanvasArea;
  newOutputSizeInMegabytes: number;
}
