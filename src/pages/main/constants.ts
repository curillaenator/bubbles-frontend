import type { AppUnitGalleryItem } from '@src/entities/unit';

const getCommonSources = (): AppUnitGalleryItem[] =>
  [...new Array(7)].map((_, i) => ({ src: `./assets/common/p${i + 1}.webp`, caption: '', body: '' }));

const getHontamGallerySources = (t: Function): AppUnitGalleryItem[] => [
  {
    src: './assets/hontam/hontam-arrival.jpeg',
    caption: t('gallery-hontam-arrival'),

    body: '',
    type: 'img',
  },
  {
    src: './assets/hontam/hontam.webp',
    caption: t('gallery-hontam'),
    body: '',
    type: 'img',
  },
  {
    src: './assets/hontam/video-cover-girl-deploy.jpg',
    caption: '',
    body: '',
    type: 'video',
    videoSrc: './assets/hontam/video-girl-deploy.mp4',
  },

  {
    src: './assets/hontam/hontam-dive-girl.webp',
    caption: t('gallery-hontam-beginer'),
    body: '',
    type: 'img',
  },

  {
    src: './assets/hontam/hontam-dive-man.webp',
    caption: t('gallery-hontam-experienced'),
    body: '',
    type: 'img',
  },

  {
    src: './assets/hontam/video-cover-girl-underwater.webp',
    caption: '',
    body: '',
    type: 'video',
    videoSrc: './assets/hontam/video-girl-underwater.mp4',
  },

  ...getCommonSources(),
];

export { getHontamGallerySources };
