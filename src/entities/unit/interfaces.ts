interface AppUnitGalleryItem {
  src: string;
  en?: string;
  ru?: string;
  type?: 'img' | 'video';
  videoSrc?: string;
  order?: number;
}

interface AppUnitFields {
  'title-en': string;
  'title-ru': string;
  'description-en': string;
  'description-ru': string;
  gallery: AppUnitGalleryItem[];
}

interface AppUnit extends AppUnitFields {
  id: string;
  order?: number;
}

export type { AppUnitFields, AppUnitGalleryItem, AppUnit };
