import { useMemo } from 'react';
import { GALLERY_SIZES } from '../constants';
import { GalleryItem, GalleryProps } from '../interfaces';

const useItems = (props: GalleryProps) => {
  const { photos, sources = [] } = props;

  const items: GalleryItem[] = useMemo(() => {
    if (!!photos?.length) return photos;

    const src = sources.map((source) => {
      const [width, height] = GALLERY_SIZES[Math.floor(Math.random() * GALLERY_SIZES.length)];
      return { width, height, ...source };
    });

    return src;
  }, [sources, photos]);

  return { items };
};

export { useItems };
