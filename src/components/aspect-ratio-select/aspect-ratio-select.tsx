import { component$ } from "@builder.io/qwik"

import type { SelectProps } from "./aspect-ratio-select.types";

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
    label: "Smartphone notch (19.5:9)",
    value: JSON.stringify({ width: 19.5, height: 9 }),
  },
  {
    label: "DSLR camera/Smartphone (3:2)",
    value: JSON.stringify({ width: 3, height: 2 }),
  },
  {
    label: "Wide computer (16:10)",
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

export const Select = component$<SelectProps>(({ label, value, isDisabled, onChange }) => (
  <div class="image-generator__select-wrapper">
    <div class="image-generator__select">
      <button
        class="image-generator__input"
        value={ASPECT_RATIOS.find(option => option.value === value)?.label}
      >
        {ASPECT_RATIOS.find(option => option.value === value)?.label}
      </button>
      <select
        value={value}
        hidden={isDisabled}
        onChange$={onChange}
        disabled={isDisabled}
      >
        {ASPECT_RATIOS.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
    <label class="image-generator__label">
      {label}
    </label>
  </div>
));
