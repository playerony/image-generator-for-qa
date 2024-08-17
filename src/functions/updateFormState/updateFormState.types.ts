import type { ImageGeneratorState, MaxCanvasArea } from "~/interfaces";

export interface UpdateFormStateParams {
  maxCanvasArea: MaxCanvasArea;
  formState: ImageGeneratorState;
  updatedFormState: Partial<ImageGeneratorState>;
}
