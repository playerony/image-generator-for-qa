import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const Home = component$(() => {
  const state = useStore({
    width: 1280,
    height: 720,
    outputSize: 1,
    ratioWidth: 16,
    ratioHeight: 9,
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
            type="number"
            id="ratio-width"
            value={state.ratioWidth}
            class="image-generator__input image-generator__input--ratio-width"
          />
        </div>
        <div class="image-generator__input-group">
          <label for="ratio-height" class="image-generator__label">
            Ratio Height
          </label>
          <input
            type="number"
            id="ratio-height"
            value={state.ratioHeight}
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
            value={state.width}
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
            value={state.height}
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
          value={state.outputSize}
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
