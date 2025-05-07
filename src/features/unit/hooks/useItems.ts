import { useEffect, useMemo, useState } from 'react';

import { getAssetUrl } from '@src/entities/asset';
import { AppUnitProps } from '@src/entities/unit';

import { GALLERY_SIZES } from '../constants';
import { AppUIUnitGallryItemProps } from '../interfaces';

const useItems = (props: AppUnitProps) => {
  const { gallery = [] } = props;

  const [items, setItems] = useState<AppUIUnitGallryItemProps[]>([]);

  const sizedItems: AppUIUnitGallryItemProps[] = useMemo(() => {
    const src = gallery.map((source) => {
      const [width, height] = GALLERY_SIZES[Math.floor(Math.random() * GALLERY_SIZES.length)];
      return { width, height, ...source };
    });

    return src;
  }, [gallery]);

  useEffect(() => {
    Promise.all(
      sizedItems.map(async (item) => {
        if (/^https:\/\/.*/.test(item.src)) return item;

        const itemWithUrls = { ...item };

        const imageUrl = await getAssetUrl(item.src);

        if (imageUrl) itemWithUrls.src = imageUrl;

        if (item.type === 'video') {
          const videoUrl = await getAssetUrl(item.videoSrc!);
          itemWithUrls.videoSrc = videoUrl || '';
        }

        return itemWithUrls;
      }),
    ).then((sourcedItems) => setItems(sourcedItems as AppUIUnitGallryItemProps[]));
  }, [sizedItems]);

  return { items };
};

export { useItems };
