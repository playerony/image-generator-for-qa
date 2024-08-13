import { PNG } from "pngjs/browser";

const SINGLE_CHUNK_SIZE = 256;

const CHUNK_COLORS = new Array(SINGLE_CHUNK_SIZE * SINGLE_CHUNK_SIZE)
  .fill(0)
  .map(() => ({
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
    a: Math.floor(Math.random() * 256),
  }));

const roundNumberToEven = (num: number) => Math.ceil(num / 2) * 2;
const getAmountOfChunks = (num: number) => Math.ceil(num / SINGLE_CHUNK_SIZE);

export const generateImageBlob = (
  height: number,
  width: number,
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const parsedWidth = roundNumberToEven(width);
    const parsedHeight = roundNumberToEven(height);

    const columnChunkAmount = getAmountOfChunks(parsedWidth);
    const rowChunkAmount = getAmountOfChunks(parsedHeight);

    const singleChunkWidth = Math.ceil(parsedWidth / columnChunkAmount);
    const singleChunkHeight = Math.ceil(parsedHeight / rowChunkAmount);

    const png = new PNG({ width: parsedWidth, height: parsedHeight });
    for (let i = 0; i < singleChunkWidth * singleChunkHeight; i++) {
      for (let j = 0; j < columnChunkAmount; j++) {
        const x = j * singleChunkWidth + (i % singleChunkWidth);

        for (let k = 0; k < rowChunkAmount; k++) {
          const y = k * singleChunkHeight + Math.floor(i / singleChunkWidth);
          const index = (x + y * parsedWidth) * 4;
          const { r, g, b, a } = CHUNK_COLORS[i % CHUNK_COLORS.length];

          png.data[index] = r;
          png.data[index + 1] = g;
          png.data[index + 2] = b;
          png.data[index + 3] = a;
        }
      }
    }

    const chunks: BlobPart[] = [];
    const stream = png.pack();
    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    stream.on("end", () => {
      resolve(new Blob(chunks, { type: "image/png" }));
    });
    stream.on("error", (error) => {
      reject(error);
    });
  });
};
