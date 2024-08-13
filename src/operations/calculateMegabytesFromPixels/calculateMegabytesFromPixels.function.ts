import { roundNumberDecimalPlaces } from "../roundNumberDecimalPlaces/roundNumberDecimalPlaces.function";

export const calculateMegabytesFromPixels = (
  pixels: number,
  bitsPerChannel: number = 8,
  channels: number = 4,
): number => {
  const bitsPerPixel = bitsPerChannel * channels;
  const totalBits = pixels * bitsPerPixel;
  const megabytes = totalBits / (8 * 1024 * 1024);

  return roundNumberDecimalPlaces(megabytes);
};
