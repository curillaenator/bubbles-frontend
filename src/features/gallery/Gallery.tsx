import React, { useMemo } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { MasonryPhotoAlbum, type Photo } from 'react-photo-album';

import { Stack, Box, Dialog, CloseButton, Heading, Text, Image } from '@chakra-ui/react';

import { GalleryProps, GallerySource } from './interfaces';

import 'keen-slider/keen-slider.min.css';
import 'react-photo-album/masonry.css';

interface GalleryItem extends Photo, GallerySource {}

const GALLERY_SIZES: [number, number][] = [
  [16, 9],
  [9, 16],
  [3, 2],
  [5, 4],
  [2, 3],
  [1, 1],
  [4, 5],
];

const Gallery: React.FC<GalleryProps> = (props) => {
  const { title, description, sources = [], photos } = props;

  const [isLightbox, setIsLightbox] = React.useState<boolean>(false);
  const [sliderRef, instanceRef] = useKeenSlider({ loop: true });

  const items: GalleryItem[] = useMemo(() => {
    if (!!photos?.length) return photos;

    return sources.map(({ src, caption, body }) => {
      const [width, height] = GALLERY_SIZES[Math.floor(Math.random() * GALLERY_SIZES.length)];
      return { src, width, height, caption, body };
    });
  }, [sources, photos]);

  return (
    <Stack my={4}>
      <Heading>{title}</Heading>

      {!!description && (
        <Text fontSize={14} color='fg.muted' mb={6}>
          {description}
        </Text>
      )}

      <MasonryPhotoAlbum
        photos={items}
        spacing={8}
        columns={(parentWidth) => {
          if (parentWidth >= 1280) return 4;
          if (parentWidth >= 640) return 3;
          return 2;
        }}
        onClick={({ index }) => {
          setIsLightbox(true);
          setTimeout(() => instanceRef.current?.moveToIdx(index), 0);
        }}
        render={{
          image: (iamgeProps) => <Image {...iamgeProps} borderRadius={6} />,
        }}
      />

      <Dialog.Root open={isLightbox} onOpenChange={() => setIsLightbox(false)} size='cover' placement='center'>
        <Dialog.Backdrop />

        {/* @ts-expect-error */}
        <Dialog.Positioner px={4}>
          {/* @ts-expect-error */}
          <Dialog.Content maxH='70vh' maxW={{ lg: '70vw' }} mx='auto'>
            <Dialog.Body p={4} maxH='70vh'>
              <Box ref={sliderRef} className='keen-slider' h='100%'>
                {items.map(({ src }) => (
                  <Image
                    key={`keen-${src}`}
                    className='keen-slider__slide'
                    src={src}
                    w='100%'
                    h='100%'
                    objectFit='cover'
                  />
                ))}
              </Box>
            </Dialog.Body>

            {/* @ts-expect-error */}
            <Dialog.CloseTrigger asChild top={4} right={4}>
              <CloseButton colorPalette='bg' color='white' />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Stack>
  );
};

export { Gallery };
