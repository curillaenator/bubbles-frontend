import React, { useEffect, useState, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import { useKeenSlider } from 'keen-slider/react';
import { MasonryPhotoAlbum } from 'react-photo-album';

import { Stack, Box, Dialog, CloseButton, Heading, Text, Image, Center, chakra } from '@chakra-ui/react';
import { GoPlay } from 'react-icons/go';

import { useColorModeValue } from '@src/features/chakra/color-mode';
import { useItems } from './hooks/useItems';

import { MOBILE_MAX_ALBUM_ITEMS, MOBILE_VIEW_MAX_WIDTH } from './constants';
import { GalleryProps } from './interfaces';

import 'keen-slider/keen-slider.min.css';
import 'react-photo-album/masonry.css';

const Video = chakra('video');

const Gallery: React.FC<GalleryProps> = (props) => {
  const { title, description } = props;

  const imageItemCaptionOverlayBg = useColorModeValue('whiteAlpha.600', 'blackAlpha.600');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sliderRef, instanceRef] = useKeenSlider({ loop: true });

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLightbox, setIsLightbox] = useState<boolean>(false);

  const { items } = useItems(props);

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
        photos={isMobile ? items.slice(0, MOBILE_MAX_ALBUM_ITEMS) : items}
        spacing={isMobile ? 8 : 24}
        columns={(parentWidth) => {
          if (parentWidth >= MOBILE_VIEW_MAX_WIDTH) return 4;
          if (parentWidth >= 640) return 3;
          return 2;
        }}
        onClick={({ index }) => {
          setIsLightbox(true);
          setTimeout(() => instanceRef.current?.moveToIdx(index), 0);
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

      <Dialog.Root open={isLightbox} onOpenChange={() => setIsLightbox(false)} size='cover' placement='center'>
        <Dialog.Backdrop />

        {/* @ts-expect-error */}
        <Dialog.Positioner px={{ base: 2, lg: 6 }}>
          {/* @ts-expect-error */}
          <Dialog.Content maxH='90vh' maxW={{ lg: '70vw' }} mx='auto'>
            <Dialog.Body p={4} h='100%'>
              <Box ref={sliderRef} className='keen-slider' h='100%'>
                {items.map(({ src, videoSrc, type = 'img', caption }) => {
                  return type === 'img' ? (
                    <Box key={`keen-${src}`} className='keen-slider__slide' position='relative'>
                      <Image src={src} w='100%' h='100%' objectFit='cover' />

                      {caption && (
                        <Stack w='full' p={4} position='absolute' top={0} left={0} bg={imageItemCaptionOverlayBg}>
                          <Text fontSize={{ base: 14, sm: 16 }} lineHeight='24px'>
                            {caption}
                          </Text>
                        </Stack>
                      )}
                    </Box>
                  ) : (
                    <Center key={`keen-${src}`} className='keen-slider__slide'>
                      <Video controls w='100%'>
                        <source src={videoSrc} type='video/mp4' />
                        Your browser does not support the video tag.
                      </Video>
                    </Center>
                  );
                })}
              </Box>
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
