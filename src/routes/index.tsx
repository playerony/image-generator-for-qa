import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const Home = () => (
  <div class="image-generator">
    <h2 class="image-generator__title">
      <span class="image-generator__title-span">IMAGE</span>
      GENERATOR
    </h2>
    <div class="image-generator__ratio-inputs">
      <input type="number" id="ratio-width" value="16" class="image-generator__input image-generator__input--ratio-width" />
      <input type="number" id="ratio-height" value="9" class="image-generator__input image-generator__input--ratio-height" />
    </div>
    <div class="image-generator__dimension-inputs">
      <div class="image-generator__input-group">
        <label for="width" class="image-generator__label">Width:</label>
        <input type="number" id="width" value="1280" class="image-generator__input image-generator__input--width" />
      </div>
      <div class="image-generator__input-group">
        <label for="height" class="image-generator__label">Height:</label>
        <input type="number" id="height" value="720" class="image-generator__input image-generator__input--height" />
      </div>
    </div>
    <div class="image-generator__output-size">
      <label for="output-size" class="image-generator__label">Output size in megabytes:</label>
      <input type="number" id="output-size" value="1" class="image-generator__input image-generator__input--output-size" />
    </div>
    <button class="image-generator__generate-button">Generate</button>
  </div>
);

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

export default component$(Home);
