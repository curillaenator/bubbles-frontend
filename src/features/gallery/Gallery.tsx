import React, { useEffect, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { useTranslation } from 'react-i18next';

import { Box, Stack, Heading } from '@chakra-ui/react';

import { useColorModeValue } from '@src/features/chakra/color-mode';

import 'keen-slider/keen-slider.min.css';

const PHOTOS = [...new Array(9)].map((_, i) => `p${i + 1}.webp`);

const Gallery: React.FC = () => {
  const { t } = useTranslation();

  const overlay = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slideChanged() {
        // console.log('slide changed');
      },
    },
    [
      // add plugins here
    ],
  );

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!instanceRef.current) return;

    intervalRef.current = setInterval(() => instanceRef.current?.next(), 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [instanceRef]);

  return (
    <Stack>
      <Heading size='2xl'>{t('app-gallery')}</Heading>

      <Box ref={sliderRef} className='keen-slider' h='640px' flex='0 0 auto' borderRadius={6}>
        {PHOTOS.map((photo, i) => (
          <Box
            key={`keen-${photo}`}
            className='keen-slider__slide'
            background={`no-repeat url("./assets/gallery/${photo}")`}
            backgroundPosition='center'
            backgroundSize='cover'
          >
            <Stack p={6} bg={overlay}>
              <Heading color='white'>{t(`gallery-${i + 1}`)}</Heading>
            </Stack>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export { Gallery };
