import type { Photo } from 'react-photo-album';
import type { AppUnitGalleryItem } from '@src/entities/unit';

interface AppUIUnitProps {
  title: string;
  description?: string;
  sources?: AppUnitGalleryItem[];
  photos?: Photo[];
}

interface GalleryItem extends Photo, AppUnitGalleryItem {}

export type { AppUIUnitProps, GalleryItem };
