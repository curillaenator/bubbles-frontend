import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { GridItem, Image, Center } from '@chakra-ui/react';

import { getImageUrl, type AppUnitGalleryItem } from '@src/entities/unit';

import { GALLERY_IMAGE_QUERY } from '@src/configs/rtq.keys';

const FORM_GALLERY_ITEM_PROPS = {
  alt: 'Viktor',
  w: '100%',
  aspectRatio: '1 / 1',
  objectFit: 'cover',
  borderRadius: 6,
};

const UnitFormImageItem: React.FC<AppUnitGalleryItem> = (props) => {
  const { src: imagePath } = props;

  const { data: imageSrc } = useQuery({
    queryKey: [GALLERY_IMAGE_QUERY, imagePath],
    queryFn: () => getImageUrl(imagePath),
    enabled: !!imagePath,
  });

  return (
    <GridItem>
      <Center w='full' aspectRatio='1 / 1' border='1px solid' borderColor='border' borderRadius={6}>
        {imageSrc && <Image {...FORM_GALLERY_ITEM_PROPS} src={imageSrc} />}
      </Center>
    </GridItem>
  );
};

export { UnitFormImageItem };
