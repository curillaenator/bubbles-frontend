import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { RowsPhotoAlbum, type Photo } from 'react-photo-album';

import { Stack, Box, Dialog, CloseButton, Heading, Text } from '@chakra-ui/react';

import 'keen-slider/keen-slider.min.css';
import 'react-photo-album/rows.css';

interface GalleryProps {
  title: string;
  description?: string;
  photos?: Photo[];
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const { title, description, photos = [] } = props;

  const [isLightbox, setIsLightbox] = React.useState<boolean>(false);
  const [sliderRef, instanceRef] = useKeenSlider({ loop: true });

  return (
    <Stack my={4}>
      <Heading>{title}</Heading>

      {!!description && (
        <Text fontSize={14} color='fg.muted'>
          {description}
        </Text>
      )}

      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={172}
        onClick={({ index }) => {
          setIsLightbox(true);
          setTimeout(() => instanceRef.current?.moveToIdx(index), 0);
        }}
      />

      <Dialog.Root size='lg' open={isLightbox} placement='center' onOpenChange={() => setIsLightbox(false)}>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body p={4}>
              <Box ref={sliderRef} className='keen-slider' minH='78vh'>
                {photos.map(({ src }) => (
                  <Box
                    borderRadius={6}
                    key={`keen-${src}`}
                    className='keen-slider__slide'
                    background={`no-repeat url(${src})`}
                    backgroundPosition='center'
                    backgroundSize='cover'
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
