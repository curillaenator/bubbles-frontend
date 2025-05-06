import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

import { debounce } from 'lodash';
import { MasonryPhotoAlbum } from 'react-photo-album';

import { Stack, Box, Dialog, CloseButton, Heading, Text, Image, Center, Button } from '@chakra-ui/react';
import { IoPlayOutline } from 'react-icons/io5';

import { sendApplication } from '@src/entities/tgchat';
import { useAppContext } from '@src/providers/AppBotnameProvider';
import { useTranslation } from '@src/hooks/useTranslation';
import { useColorModeValue } from '@src/features/chakra/color-mode';

import { useItems } from './hooks/useItems';
import { Carousel } from './Carousel';

import { MOBILE_VIEW_MAX_WIDTH } from './constants';
import type { GalleryProps, GalleryItem } from './interfaces';

import 'react-photo-album/masonry.css';

const decideLanguage = (language: string, locales: Record<string, string>) => locales[language];

const sortGalleryItems = (units: GalleryItem[]) =>
  units.toSorted(({ order: oA }, { order: oB }) => (oA || 0) - (oB || 0));

const Gallery: React.FC<GalleryProps> = (props) => {
  const { title, description } = props;
  const { curLanguage } = useTranslation();
  const appCtx = useAppContext();

  const imageItemCaptionOverlayBg = useColorModeValue('whiteAlpha.600', 'blackAlpha.600');

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [initial, setInitial] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLightbox, setIsLightbox] = useState<boolean>(false);

  const { items: photoItems } = useItems(props);

  const { mutate: sendNewApplication, isPending: isNewApplicationPending } = useMutation({
    mutationFn: sendApplication.bind(appCtx),
    onSuccess: () => window.Telegram?.WebApp?.close?.(),
    onError: () => alert('Somethign went wrong, please restart bot'),
  });

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
      <Heading py={4}>{title}</Heading>

      {!!description && (
        <Text whiteSpace='pre-line' fontSize={{ base: 14, sm: 16 }} color='fg.muted' mb={6}>
          {description}
        </Text>
      )}

      {!!appCtx.botname && !!appCtx.chatId && (
        <Button colorPalette='blue' onClick={() => sendNewApplication(title)} loading={isNewApplicationPending}>
          Application
        </Button>
      )}

      <MasonryPhotoAlbum
        photos={sortGalleryItems(photoItems)}
        spacing={isMobile ? 8 : 24}
        columns={(parentWidth) => {
          if (parentWidth >= MOBILE_VIEW_MAX_WIDTH) return 4;
          if (parentWidth >= 640) return 3;
          return 2;
        }}
        onClick={({ index }) => {
          setIsLightbox(true);
          setInitial(index);
        }}
        render={{
          image: (imageProps, { photo }) => (
            <Box {...imageProps} borderRadius={6} position='relative'>
              <Image {...imageProps} borderRadius={6} />

              {photo.type === 'video' && (
                <Center w='full' h='full' position='absolute' top={0} left={0}>
                  <IoPlayOutline size={64} />
                </Center>
              )}

              {!!photo.en && !!photo.ru && (
                <Stack
                  w='full'
                  p={{ base: 2, sm: 4 }}
                  position='absolute'
                  top={0}
                  left={0}
                  bg={imageItemCaptionOverlayBg}
                  borderRadius={6}
                >
                  <Text
                    whiteSpace='pre-line'
                    textAlign='left'
                    fontSize={{ base: 12, sm: 14 }}
                    lineHeight={{ base: '16px', sm: '20px' }}
                  >
                    {decideLanguage(curLanguage, { en: photo.en, ru: photo.ru })}
                  </Text>
                </Stack>
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
        <Dialog.Positioner px={{ base: 2, lg: 6 }} px={{ base: 2, sm: 6 }}>
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
