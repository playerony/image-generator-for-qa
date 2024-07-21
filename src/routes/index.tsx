import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { useImageGeneratorStore } from "~/hooks";

const Home = component$(() => {
  const {
    formState,
    onWidthChange,
    onHeightChange,
    onOutputSizeChange,
  } = useImageGeneratorStore();

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
            // onBlur$={onRatioWidthChange}
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
            // onBlur$={onRatioHeightChange}
            value={formState.ratioHeight}
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
          class="image-generator__input image-generator__input--output-size"
        />
      </div>
      <button class="image-generator__generate-button">Generate</button>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

export default Home;
