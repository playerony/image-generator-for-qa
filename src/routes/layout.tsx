import { routeLoader$ } from "@builder.io/qwik-city";
import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);

  return (
    <main class="root">
      <Slot />
    </main>
  );
});
