import { clsx } from "clsx";
import { component$, Slot } from "@builder.io/qwik";

import type { ButtonProps } from "./button.types";

import styles from "./button.module.css";

const Button = ({
  class: className,
  disabled,
  forwardRef,
  id,
  ...restProps
}: ButtonProps) => (
  <button
    id={id}
    ref={forwardRef}
    disabled={disabled}
    class={clsx(styles.button, className)}
    aria-disabled={disabled ? "true" : undefined}
    {...restProps}
  >
    <Slot />
  </button>
);

export default component$(Button);
