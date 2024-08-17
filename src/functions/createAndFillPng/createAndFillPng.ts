import { PNG } from 'pngjs/browser';
import type { CreateAndFillPngParams } from './createAndFillPng.types';
import { CHUNK_COLORS } from '~/constants';

export const createAndFillPng = ({ columnChunkAmount, parsedHeight, parsedWidth, rowChunkAmount, singleChunkHeight, singleChunkWidth }: CreateAndFillPngParams) => {
  const png = new PNG({ width: parsedWidth, height: parsedHeight });

  for (let i = 0; i < singleChunkWidth * singleChunkHeight; i++) {
    for (let j = 0; j < columnChunkAmount; j++) {
      const x = j * singleChunkWidth + (i % singleChunkWidth);

      for (let k = 0; k < rowChunkAmount; k++) {
        const y = k * singleChunkHeight + Math.floor(i / singleChunkWidth);
        const index = (x + y * parsedWidth) * 4;
        const { a, b, g, r } = CHUNK_COLORS[i % CHUNK_COLORS.length];

        png.data[index] = r;
        png.data[index + 1] = g;
        png.data[index + 2] = b;
        png.data[index + 3] = a;
      }
    }
  }

  return png;
};
