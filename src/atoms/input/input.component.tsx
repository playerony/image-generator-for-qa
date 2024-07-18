import { component$ } from "@builder.io/qwik";
import { clsx } from "clsx";

import type { InputProps } from "./input.types";

import styles from "./input.module.css";

const Input = ({
  "aria-describedby": ariaDescribedby,
  class: className,
  disabled,
  error,
  forwardRef,
  id,
  ...restProps
}: InputProps) => {
  const describedBy =
    [id ? `${id}-hint` : null, ariaDescribedby, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <input
      id={id}
      ref={forwardRef}
      disabled={disabled}
      aria-describedby={describedBy}
      aria-invalid={error ? "true" : undefined}
      aria-disabled={disabled ? "true" : undefined}
      class={clsx(className, styles.input, { [styles.error]: error })}
      {...restProps}
    />
  );
};

export default component$(Input);
