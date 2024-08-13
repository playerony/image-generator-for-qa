import type {
  ImageGeneratorState,
  MaxCanvasArea,
} from "../../useImageGeneratorStore.types";

export interface UpdateFormStateParams {
  maxCanvasArea: MaxCanvasArea;
  formState: ImageGeneratorState;
  updatedFormState: Partial<ImageGeneratorState>;
}
