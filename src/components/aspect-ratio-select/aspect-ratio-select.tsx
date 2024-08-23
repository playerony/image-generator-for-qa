import { component$ } from "@builder.io/qwik"

import { ASPECT_RATIOS } from "~/constants";
import type { SelectProps } from "./aspect-ratio-select.types";

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
