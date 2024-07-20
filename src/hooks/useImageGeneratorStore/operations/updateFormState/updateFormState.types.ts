import type { ImageGeneratorState, MaxCanvasArea } from '../../useImageGeneratorStore.types';

export interface Input {
  maxCanvasArea: MaxCanvasArea
  formState: ImageGeneratorState
  updatedFormState: Partial<ImageGeneratorState>
}
