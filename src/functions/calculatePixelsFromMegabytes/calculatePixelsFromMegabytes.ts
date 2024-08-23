export const calculatePixelsFromMegabytes = (
  megabytes: number,
  bitsPerChannel = 8,
  channels = 4,
): number => {
  const totalBits = megabytes * 8 * 1024 * 1024;
  const bitsPerPixel = bitsPerChannel * channels;

  return Math.floor(totalBits / bitsPerPixel);
};
