import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const HomePage = component$(() => {
  return (
    <div>
      Home
    </div>
  );
});

export default HomePage;

export const head: DocumentHead = {
  title: "To rename",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
