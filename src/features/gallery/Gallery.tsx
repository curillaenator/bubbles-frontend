import React, { useEffect, useState, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import { MasonryPhotoAlbum } from 'react-photo-album';

import { Stack, Box, Dialog, CloseButton, Heading, Text, Image, Center } from '@chakra-ui/react';
import { GoPlay } from 'react-icons/go';

import { Carousel } from './Carousel';

import { useItems } from './hooks/useItems';

import { MOBILE_VIEW_MAX_WIDTH } from './constants';
import { GalleryProps } from './interfaces';

import 'keen-slider/keen-slider.min.css';
import 'react-photo-album/masonry.css';

const Gallery: React.FC<GalleryProps> = (props) => {
  const { title, description } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [initial, setInitial] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLightbox, setIsLightbox] = useState<boolean>(false);

  const { items: photoItems } = useItems(props);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkMobile = useCallback(
    debounce((w: number) => setIsMobile(w <= MOBILE_VIEW_MAX_WIDTH), 200),
    [],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const obs = new ResizeObserver(([entry]) => checkMobile(entry.contentRect.width));
    obs.observe(containerRef.current);

    return () => obs.disconnect();
  }, [checkMobile]);

  return (
    <Stack ref={containerRef} my={4}>
      <Heading>{title}</Heading>

      {!!description && (
        <Text fontSize={{ base: 14, sm: 16 }} color='fg.muted' mb={6}>
          {description}
        </Text>
      )}

      <MasonryPhotoAlbum
        photos={photoItems}
        spacing={isMobile ? 8 : 24}
        columns={(parentWidth) => {
          if (parentWidth >= MOBILE_VIEW_MAX_WIDTH) return 4;
          if (parentWidth >= 640) return 3;
          return 2;
        }}
        onClick={({ index }) => {
          setIsLightbox(true);
          setInitial(index);
          // setTimeout(() => carouselRef.current?.moveToIdx(index), 0);
        }}
        render={{
          image: (imageProps) => (
            <Box {...imageProps} borderRadius={6} position='relative'>
              <Image {...imageProps} borderRadius={6} />

              {imageProps.src.includes('video-cover') && (
                <Center w='100%' h='100%' position='absolute' top={0} left={0}>
                  <GoPlay size={64} color='white' />
                </Center>
              )}
            </Box>
          ),
        }}
      />

      <Dialog.Root
        open={isLightbox}
        size='cover'
        placement='center'
        onOpenChange={() => {
          setIsLightbox(false);
          setInitial(-1);
        }}
      >
        <Dialog.Backdrop />

        {/* @ts-expect-error */}
        <Dialog.Positioner px={{ base: 2, lg: 6 }}>
          {/* @ts-expect-error */}
          <Dialog.Content maxH='90vh' maxW={{ lg: '70vw' }} mx='auto'>
            <Dialog.Body p={4} h='100%'>
              <Carousel initial={initial} isMobile={isMobile} photoItems={photoItems} />
            </Dialog.Body>

            {/* @ts-expect-error */}
            <Dialog.CloseTrigger asChild top={6} right={6}>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Stack>
  );
};

export { Gallery };
