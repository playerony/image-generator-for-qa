import { component$, $, useSignal } from "@builder.io/qwik";
import { worker$ } from "@builder.io/qwik-worker";
import type { DocumentHead } from "@builder.io/qwik-city";

import { generateImageBlob } from "~/operations";
import { useSuperDuperStateManager } from "~/hooks";

const Home = component$(() => {
  const isGeneratingImage = useSignal(false);
  const {
    formState,
    onWidthChange,
    onHeightChange,
    onOutputSizeChange,
    onRatioHeightChange,
    onRatioWidthChange,
  } = useSuperDuperStateManager();

  const generateImageBlobWorker = worker$(generateImageBlob);

  const handleGenerate = $(async () => {
    try {
      isGeneratingImage.value = true;
      const blob = await generateImageBlobWorker(
        formState.height,
        formState.width,
      );

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${formState.width}x${formState.height}-${formState.outputSize}mb-${Date.now()}.png`;
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      isGeneratingImage.value = false;
    }
  });

  return (
    <div class="image-generator">
      <h2 class="image-generator__title">
        IMAGE
        <span class="image-generator__title-span">GENERATOR</span>
      </h2>
      <div class="image-generator__ratio-inputs">
        <div class="image-generator__input-group">
          <label for="ratio-width" class="image-generator__label">
            Ratio Width
          </label>
          <input
            min={1}
            max={50}
            step={0.01}
            type="number"
            id="ratio-width"
            value={formState.ratioWidth}
            onBlur$={onRatioWidthChange}
            disabled={isGeneratingImage.value}
            class="image-generator__input image-generator__input--ratio-width"
          />
        </div>
        <div class="image-generator__input-group">
          <label for="ratio-height" class="image-generator__label">
            Ratio Height
          </label>
          <input
            min={1}
            max={50}
            step={0.01}
            type="number"
            id="ratio-height"
            onBlur$={onRatioHeightChange}
            value={formState.ratioHeight}
            disabled={isGeneratingImage.value}
            class="image-generator__input image-generator__input--ratio-height"
          />
        </div>
      </div>
      <div class="image-generator__dimension-inputs">
        <div class="image-generator__input-group">
          <label for="width" class="image-generator__label">
            Width
          </label>
          <input
            id="width"
            type="number"
            value={formState.width}
            onBlur$={onWidthChange}
            disabled={isGeneratingImage.value}
            class="image-generator__input image-generator__input--width"
          />
        </div>
        <div class="image-generator__input-group">
          <label for="height" class="image-generator__label">
            Height
          </label>
          <input
            id="height"
            type="number"
            value={formState.height}
            onBlur$={onHeightChange}
            disabled={isGeneratingImage.value}
            class="image-generator__input image-generator__input--height"
          />
        </div>
      </div>
      <div class="image-generator__input-group">
        <label for="output-size" class="image-generator__label">
          Estimated output size in megabytes
        </label>
        <input
          type="number"
          id="output-size"
          value={formState.outputSize}
          onBlur$={onOutputSizeChange}
          disabled={isGeneratingImage.value}
          class="image-generator__input image-generator__input--output-size"
        />
      </div>
      <button
        onClick$={handleGenerate}
        disabled={isGeneratingImage.value}
        class="image-generator__generate-button"
      >
        Generate
        {isGeneratingImage.value ? <div class="image-generator__spinner" /> : null}
      </button>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Image Generator",
  meta: [
    {
      name: "description",
      content: "Generate images with custom dimensions and output size.",
    },
    {
      name: "keywords",
      content: "image, generator",
    },

  ],
};

export default Home;
