import { SINGLE_CHUNK_SIZE } from '~/constants';

import { createAndFillPng } from '../createAndFillPng/createAndFillPng';

const roundNumberToEven = (num: number) => Math.ceil(num / 2) * 2;
const getAmountOfChunks = (num: number) => Math.ceil(num / SINGLE_CHUNK_SIZE);

export const generateImageBlob = (height: number, width: number): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const parsedWidth = roundNumberToEven(width);
    const parsedHeight = roundNumberToEven(height);

    const columnChunkAmount = getAmountOfChunks(parsedWidth);
    const rowChunkAmount = getAmountOfChunks(parsedHeight);

    const singleChunkWidth = Math.ceil(parsedWidth / columnChunkAmount);
    const singleChunkHeight = Math.ceil(parsedHeight / rowChunkAmount);

    const png = createAndFillPng({
      columnChunkAmount,
      parsedHeight,
      parsedWidth,
      rowChunkAmount,
      singleChunkHeight,
      singleChunkWidth,
    });

    const blobParts: BlobPart[] = [];
    const stream = png.pack();

    stream.on('data', (chunk) => {
      blobParts.push(chunk);
    });
    stream.on('end', () => {
      resolve(new Blob(blobParts, { type: 'image/png' }));
    });
    stream.on('error', (error) => {
      reject(error);
    });
  });
