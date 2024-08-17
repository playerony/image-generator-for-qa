import { createAndFillPng } from './createAndFillPng';
import { vi, describe, it } from 'vitest';

vi.mock('pngjs/browser', () => ({
  PNG: vi.fn().mockImplementation(({ height, width }) => ({
    width,
    height,
    data: new Uint8Array(width * height * 4),
  })),
}));

vi.mock('~/constants', () => ({
  CHUNK_COLORS: [
    { r: 50, g: 100, b: 150, a: 255 },
    { r: 60, g: 120, b: 180, a: 255 },
    { r: 70, g: 140, b: 210, a: 255 },
  ],
}));

describe('createAndFillPng', () => {
  it('should fill the PNG data with the correct colors', ({ expect }) => {
    const params = {
      columnChunkAmount: 2,
      parsedHeight: 4,
      parsedWidth: 4,
      rowChunkAmount: 2,
      singleChunkHeight: 2,
      singleChunkWidth: 2,
    };

    const png = createAndFillPng(params);

    expect(png.data).toMatchSnapshot();
  });

  it('should create a PNG with the correct dimensions', ({ expect }) => {
    const params = {
      columnChunkAmount: 1,
      parsedHeight: 4,
      parsedWidth: 4,
      rowChunkAmount: 1,
      singleChunkHeight: 2,
      singleChunkWidth: 2,
    };

    const png = createAndFillPng(params);

    expect(png.data).toMatchSnapshot();
  });
});
