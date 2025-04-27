import React, { useEffect, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { useTranslation } from 'react-i18next';

import { Box, Stack, Heading } from '@chakra-ui/react';

import 'keen-slider/keen-slider.min.css';

const PHOTOS = [...new Array(9)].map((_, i) => `p${i + 1}.webp`);

const Gallery: React.FC = () => {
  const { t } = useTranslation();

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

      <Box ref={sliderRef} className='keen-slider' h='712px' flex='0 0 auto' borderRadius={6}>
        {PHOTOS.map((photo) => (
          <Box
            key={`keen-${photo}`}
            className='keen-slider__slide'
            background={`no-repeat url("./assets/gallery/${photo}")`}
            backgroundPosition='center'
            backgroundSize='cover'
          />
        ))}
      </Box>
    </Stack>
  );
};

export { Gallery };
