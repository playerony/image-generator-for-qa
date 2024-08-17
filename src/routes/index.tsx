import { component$, $, useSignal } from "@builder.io/qwik";
import { worker$ } from "@builder.io/qwik-worker";
import type { DocumentHead } from "@builder.io/qwik-city";

import { generateImageBlob } from "~/operations";
import { useSuperDuperStateManager } from "~/hooks";

const ASPECT_RATIOS = [
  {
    label: "Widescreen TV (16:9)",
    value: JSON.stringify({ width: 16, height: 9 }),
  },
  {
    label: "Vertical smartphones (9:16)",
    value: JSON.stringify({ width: 9, height: 16 }),
  },
  {
    label: "Square (1:1)",
    value: JSON.stringify({ width: 1, height: 1 }),
  },
  {
    label: "Smartphone notched displays (19.5:9)",
    value: JSON.stringify({ width: 19.5, height: 9 }),
  },
  {
    label: "DSLR camera / Smartphone (3:2)",
    value: JSON.stringify({ width: 3, height: 2 }),
  },
  {
    label: "Wide computer displays (16:10)",
    value: JSON.stringify({ width: 16, height: 10 }),
  },
  {
    label: "Vintage TV (4:3)",
    value: JSON.stringify({ width: 4, height: 3 }),
  },
  {
    label: "Computer displays (5:4)",
    value: JSON.stringify({ width: 5, height: 4 }),
  },
  {
    label: "Ultrawide (21:9)",
    value: JSON.stringify({ width: 21, height: 9 }),
  },
  {
    label: "Anamorphic (2.39:1)",
    value: JSON.stringify({ width: 2.39, height: 1 }),
  },
  {
    label: "Panavision (2.40:1)",
    value: JSON.stringify({ width: 2.40, height: 1 }),
  },
  {
    label: "Cinemascope (2.35:1)",
    value: JSON.stringify({ width: 2.35, height: 1 }),
  },
  {
    label: "US cinemafilm (1.85:1)",
    value: JSON.stringify({ width: 1.85, height: 1 }),
  },
  {
    label: "Ultrawide monitors (32:9)",
    value: JSON.stringify({ width: 32, height: 9 }),
  },
  {
    label: "70mm film (2.20:1)",
    value: JSON.stringify({ width: 2.20, height: 1 }),
  },
  {
    label: "European widescreen (1.66:1)",
    value: JSON.stringify({ width: 1.66, height: 1 }),
  },
  {
    label: "Super 16mm film (1.66:1)",
    value: JSON.stringify({ width: 1.66, height: 1 }),
  },
  {
    label: "IMAX (1.43:1)",
    value: JSON.stringify({ width: 1.43, height: 1 }),
  },
  {
    label: "Academy standard (1.375:1)",
    value: JSON.stringify({ width: 1.375, height: 1 }),
  },
  {
    label: "Vintage silent films (1.33:1)",
    value: JSON.stringify({ width: 1.33, height: 1 }),
  },
  {
    label: "Traditional photo print (5:7)",
    value: JSON.stringify({ width: 5, height: 7 }),
  },
];

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
        <div class="image-generator__input-group">
          <select
            id="ratio"
            onChange$={onRatioChange}
            disabled={isGeneratingImage.value}
            class="image-generator__input image-generator__input--ratio"
            value={JSON.stringify({ width: formState.ratioWidth, height: formState.ratioHeight })}
          >
            {ASPECT_RATIOS.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <label for="ratio" class="image-generator__label">
            aspect Ratio
          </label>
        </div>
      </div>
      <div class="image-generator__dimension-inputs">
        <div class="image-generator__input-group">
          <input
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
