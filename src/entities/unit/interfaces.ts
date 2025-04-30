interface AppUnitGalleryItem {
  src: string;
  caption?: string;
  body?: string;
  type?: 'img' | 'video';
  videoSrc?: string;
}

interface AppUnitFields {
  'title-en': string;
  'title-ru': string;
  'description-en': string;
  'description-ru': string;
  gallery: AppUnitGalleryItem[];
}

export type { AppUnitFields, AppUnitGalleryItem };
