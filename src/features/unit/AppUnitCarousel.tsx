import React, { useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';

import { Stack, Box, Text, Image, Center } from '@chakra-ui/react';

import { useTranslation } from '@src/hooks/useTranslation';
import { useColorModeValue } from '@src/features/chakra/color-mode';

import type { CarouselProps } from './interfaces';
import 'keen-slider/keen-slider.min.css';

const AppUnitCarousel: React.FC<CarouselProps> = (props) => {
  const { photoItems, isMobile, initial, onCarouselInstanceChange } = props;

  const { curLanguage } = useTranslation();

  const imageBg = useColorModeValue('blackAlpha.300', 'whiteAlpha.200');
  const imageItemCaptionOverlayBg = useColorModeValue('whiteAlpha.600', 'blackAlpha.600');

  const [sliderRef, instanceRef] = useKeenSlider({ loop: true, initial });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onCarouselInstanceChange?.(instanceRef.current), [instanceRef]);

  return (
    <Box ref={sliderRef} className='keen-slider' h='100%' bg={imageBg} borderRadius={6}>
      {photoItems.map(({ src, videoSrc, type = 'img', en, ru }) => {
        return type === 'img' ? (
          <Box key={`keen-${src}`} className='keen-slider__slide' position='relative'>
            <Image src={src} w='100%' h='100%' objectFit={isMobile ? 'contain' : 'cover'} />

            {!!en && !!ru && (
              <Stack
                w='full'
                p={4}
                position='absolute'
                top={0}
                left={0}
                bg={imageItemCaptionOverlayBg}
                borderRadius={6}
              >
                <Text fontSize={{ base: 14, sm: 16 }} lineHeight='24px' maxW='calc(100% - 2rem)'>
                  {{ en, ru }[curLanguage]}
                </Text>
              </Stack>
            )}
          </Box>
        ) : (
          <Center key={`keen-${src}`} className='keen-slider__slide'>
            <video
              controls
              width='100%'
              style={{ maxHeight: '100%' }}
              controlsList='nofullscreen nodownload noplaybackrate'
              poster={src}
              disablePictureInPicture
            >
              <source src={videoSrc} type='video/mp4' />
              <p>Your browser does not support the video tag</p>
            </video>
          </Center>
        );
      })}
    </Box>
  );
};

export { AppUnitCarousel };
