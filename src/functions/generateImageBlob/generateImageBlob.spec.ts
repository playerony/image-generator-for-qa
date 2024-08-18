import { Mock, beforeEach, describe, it, vi } from 'vitest';
import { SINGLE_CHUNK_SIZE } from '~/constants';

import { createAndFillPng } from '../createAndFillPng/createAndFillPng';
import { generateImageBlob } from './generateImageBlob.function';

vi.mock('../createAndFillPng/createAndFillPng');

describe('generateImageBlob', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should round width and height to even numbers', async ({ expect }) => {
    const mockPng = {
      pack: vi.fn().mockReturnValue({
        on: vi.fn((event, callback) => {
          if (event === 'end') {
            callback();
          }
        }),
      }),
    };
    (createAndFillPng as Mock).mockReturnValue(mockPng);

    await generateImageBlob(101, 201);

    expect(createAndFillPng).toHaveBeenCalledWith(
      expect.objectContaining({
        parsedHeight: 102,
        parsedWidth: 202,
      }),
    );
  });

  it('should calculate correct chunk amounts', async ({ expect }) => {
    const mockPng = {
      pack: vi.fn().mockReturnValue({
        on: vi.fn((event, callback) => {
          if (event === 'end') {
            callback();
          }
        }),
      }),
    };
    (createAndFillPng as Mock).mockReturnValue(mockPng);

    await generateImageBlob(200, 300);

    expect(createAndFillPng).toHaveBeenCalledWith(
      expect.objectContaining({
        columnChunkAmount: Math.ceil(300 / SINGLE_CHUNK_SIZE),
        rowChunkAmount: Math.ceil(200 / SINGLE_CHUNK_SIZE),
      }),
    );
  });

  it('should calculate correct single chunk dimensions', async ({ expect }) => {
    const mockPng = {
      pack: vi.fn().mockReturnValue({
        on: vi.fn((event, callback) => {
          if (event === 'end') {
            callback();
          }
        }),
      }),
    };
    (createAndFillPng as Mock).mockReturnValue(mockPng);

    await generateImageBlob(200, 300);

    const columnChunkAmount = Math.ceil(300 / SINGLE_CHUNK_SIZE);
    const rowChunkAmount = Math.ceil(200 / SINGLE_CHUNK_SIZE);

    expect(createAndFillPng).toHaveBeenCalledWith(
      expect.objectContaining({
        singleChunkWidth: Math.ceil(300 / columnChunkAmount),
        singleChunkHeight: Math.ceil(200 / rowChunkAmount),
      }),
    );
  });

  it('should resolve with a Blob when stream ends', async ({ expect }) => {
    const mockPng = {
      pack: vi.fn().mockReturnValue({
        on: vi.fn((event, callback) => {
          if (event === 'data') {
            callback(Buffer.from('test data'));
          }
          if (event === 'end') {
            callback();
          }
        }),
      }),
    };
    (createAndFillPng as Mock).mockReturnValue(mockPng);

    const result = await generateImageBlob(100, 100);

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe('image/png');
  });

  it('should reject with an error when stream emits an error', async ({ expect }) => {
    const mockError = new Error('Stream error');
    const mockPng = {
      pack: vi.fn().mockReturnValue({
        on: vi.fn((event, callback) => {
          if (event === 'error') {
            callback(mockError);
          }
        }),
      }),
    };
    (createAndFillPng as Mock).mockReturnValue(mockPng);

    await expect(generateImageBlob(100, 100)).rejects.toThrow('Stream error');
  });
});
