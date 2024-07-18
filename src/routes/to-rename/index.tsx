import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Card from '../../atoms/card/card.component'
import Input from '../../atoms/input/input.component'
import Button from '../../atoms/button/button.component'

import styles from './home.module.css'

const Home = () => (
  <Card class={styles.container}>
    <h1 class={styles.heading}>IMAGE</h1>
    <h2 class={styles.subheading}>GENERATOR</h2>
    <Input />
    <Button>Generate</Button>
  </Card>
);

export default component$(Home);

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
