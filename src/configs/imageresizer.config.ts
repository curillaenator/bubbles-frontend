import type { typeOptions as ResizeImageOptions } from 'image-resize';
/**
 * @description resizeImage https://github.com/kode-team/image-resize
 */
const IMAGE_RESIZE_SETUP: ResizeImageOptions = {
  format: 'webp',
  height: 720,
  quality: 0.8,
  sharpen: 0.9,
  reSample: 3,
  outputType: 'blob',
};

export { IMAGE_RESIZE_SETUP };
