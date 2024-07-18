import type { InputHTMLAttributes, Signal } from "@builder.io/qwik";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  forwardRef?: Signal<HTMLInputElement>;
}
