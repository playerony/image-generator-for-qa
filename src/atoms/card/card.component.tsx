import { clsx } from 'clsx';
import { component$, Slot } from "@builder.io/qwik";

import type { CardProps } from './card.types';

import styles from "./card.module.css";

const Card = ({ class: className }: CardProps) => (
  <div
    role="group"
    class={clsx(styles.card, className)}
  >
    <Slot />
  </div>
);

export default component$(Card);
