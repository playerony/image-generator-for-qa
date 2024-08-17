export const SINGLE_CHUNK_SIZE = 256;

const generateRandomColor = () => ({
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256),
  a: Math.floor(Math.random() * 256),
});

export const CHUNK_COLORS = Array.from({ length: SINGLE_CHUNK_SIZE * SINGLE_CHUNK_SIZE }, generateRandomColor);
