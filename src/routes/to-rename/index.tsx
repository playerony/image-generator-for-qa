import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Input from '../../atoms/input/input.component'
import Button from '../../atoms/button/button.component'

const HomePage = component$(() => {
  return (
    <div>
      <Input placeholder="xd" />
      <Input type="number" />
      <Input disabled />
      <Input error />
      <Input error disabled value="test" />
      <Button>Click me</Button>
      <Button disabled>Click me</Button>
    </div>
  );
});

export default HomePage;

// function limitSize(size, maximumPixels) {
//   const { width, height } = size;

//   const requiredPixels = width * height;
//   if (requiredPixels <= maximumPixels) return { width, height };

//   const scalar = Math.sqrt(maximumPixels) / Math.sqrt(requiredPixels);
//   return {
//       width: Math.floor(width * scalar),
//       height: Math.floor(height * scalar),
//   };
// }
export const head: DocumentHead = {
  title: "To rename",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
