import type { QRL } from "@builder.io/qwik";

export interface SelectProps {
  label: string;
  value: string;
  isDisabled: boolean;
  onChange: QRL<(event: Event) => void>;
}
