import type { Photo } from 'react-photo-album';

interface GallerySource {
  src: string;
  caption?: string;
  body?: string;
  type?: 'img' | 'video';
  videoSrc?: string;
}

interface GalleryProps {
  title: string;
  description?: string;
  sources?: GallerySource[];
  photos?: Photo[];
}

interface GalleryItem extends Photo, GallerySource {}

export type { GalleryProps, GallerySource, GalleryItem };
