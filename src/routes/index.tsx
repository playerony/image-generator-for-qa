import { component$, $, useSignal } from "@builder.io/qwik";
import { worker$ } from "@builder.io/qwik-worker";
import type { DocumentHead } from "@builder.io/qwik-city";

import { generateImageBlob } from "~/functions";
import { useSuperDuperStateManager } from "~/hooks";
import { Select } from "~/components";

const Home = component$(() => {
  const isGeneratingImage = useSignal(false);
  const {
    formState,
    onWidthChange,
    onRatioChange,
    onHeightChange,
    onOutputSizeChange
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
      window.alert("An error occurred while generating the image.");
    } finally {
      isGeneratingImage.value = false;
    }
  });

  return (
    <div class="image-generator">
      <p class="image-generator__title">
        IMAGE GENERATOR #1
      </p>
      <div class="image-generator__ratio-inputs">
        <Select
          label="aspect ratio"
          onChange={onRatioChange}
          isDisabled={isGeneratingImage.value}
          value={JSON.stringify({ width: formState.ratioWidth, height: formState.ratioHeight })}
        />
      </div>
      <div class="image-generator__dimension-inputs">
        <div class="image-generator__input-group">
          <input
            min="2"
            step="1"
            id="width"
            type="number"
            value={formState.width}
            onBlur$={onWidthChange}
            disabled={isGeneratingImage.value}
            class="image-generator__input image-generator__input--width"
          />
          <label for="width" class="image-generator__label">
            width
          </label>
        </div>
        <div class="image-generator__input-group">
          <input
            min="2"
            step="1"
            id="height"
            type="number"
            value={formState.height}
            onBlur$={onHeightChange}
            disabled={isGeneratingImage.value}
            class="image-generator__input image-generator__input--height"
          />
          <label for="height" class="image-generator__label">
            height
          </label>
        </div>
      </div>
      <div class="image-generator__input-group">
        <input
          min="0.01"
          step="0.01"
          type="number"
          id="output-size"
          value={formState.outputSize}
          onBlur$={onOutputSizeChange}
          disabled={isGeneratingImage.value}
          class="image-generator__input image-generator__input--output-size"
        />
        <label for="output-size" class="image-generator__label">
          output size in megabytes
        </label>
      </div>
      <button
        onClick$={handleGenerate}
        disabled={isGeneratingImage.value}
        class="image-generator__generate-button"
      >
        GENERATE
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
