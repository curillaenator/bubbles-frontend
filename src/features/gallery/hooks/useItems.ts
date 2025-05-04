import { useEffect, useMemo, useState } from 'react';

import { GALLERY_SIZES } from '../constants';
import { GalleryItem, GalleryProps } from '../interfaces';

import { getImageUrl } from '@src/entities/asset';

const useItems = (props: GalleryProps) => {
  const { sources = [] } = props;

  const [items, setItems] = useState<GalleryItem[]>([]);

  const sizedItems: GalleryItem[] = useMemo(() => {
    const src = sources.map((source) => {
      const [width, height] = GALLERY_SIZES[Math.floor(Math.random() * GALLERY_SIZES.length)];
      return { width, height, ...source };
    });

    return src;
  }, [sources]);

  useEffect(() => {
    Promise.all(
      sizedItems.map(async (it) => {
        if (/^https:\/\/.*/.test(it.src)) return it;

        const itWithUrls = { ...it };

        const imageUrl = await getImageUrl(it.src);

        if (imageUrl) itWithUrls.src = imageUrl;

        if (it.type === 'video') {
          const videoUrl = await getImageUrl(it.videoSrc!);
          itWithUrls.videoSrc = videoUrl || '';
        }

        return itWithUrls;
      }),
    ).then((sourcedItems) => setItems(sourcedItems as GalleryItem[]));
  }, [sizedItems]);

  return { items };
};

export { useItems };
