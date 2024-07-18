import type { ButtonHTMLAttributes, Signal } from "@builder.io/qwik";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  forwardRef?: Signal<HTMLButtonElement>;
}
