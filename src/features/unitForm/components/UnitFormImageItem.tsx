import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Box, Image, Center, Stack, Text } from '@chakra-ui/react';
import { IoPlayOutline } from 'react-icons/io5';

import { useColorModeValue } from '@src/features/chakra/color-mode';
import { getImageUrl } from '@src/entities/asset';

import type { AppUnitGalleryItem } from '@src/entities/unit';
import { GALLERY_IMAGE_QUERY } from '@src/configs/rtq.keys';

interface UnitFormImageItem extends AppUnitGalleryItem {
  onEdit: () => void;
}

const decideLanguage = (language: string, locales: Record<string, string>) => locales[language];

const UnitFormImageItem = React.forwardRef<HTMLDivElement, UnitFormImageItem>((props, ref) => {
  const { type, src: imagePath, onEdit, en, ru } = props;

  const { i18n } = useTranslation();
  const imageItemCaptionOverlayBg = useColorModeValue('whiteAlpha.600', 'blackAlpha.600');

  const { data: imageSrc = null } = useQuery({
    queryKey: [GALLERY_IMAGE_QUERY, imagePath],
    queryFn: () => getImageUrl(imagePath),
    enabled: !!imagePath,
  });

  return (
    <Box
      ref={ref}
      onClick={() => onEdit()}
      position='relative'
      cursor='pointer'
      role='button'
      maxW={{ base: 'calc(100% / 2 - 8px / 2)', sm: 'calc(100% / 3 - 64px / 3 + 4px)' }}
      aspectRatio='1 / 1'
    >
      <Center w='full' border='1px solid' borderColor='border' borderRadius={6}>
        {imageSrc && (
          <Image
            alt='Beast diving ever'
            w='100%'
            aspectRatio='1 / 1'
            objectFit='cover'
            borderRadius={6}
            src={imageSrc}
            draggable={false}
          />
        )}
      </Center>

      {type === 'video' && (
        <Center w='full' h='full' position='absolute' top={0} left={0}>
          <IoPlayOutline size={64} />
        </Center>
      )}

      {!!en && !!ru && (
        <Stack
          w='full'
          p={{ base: 2, sm: 4 }}
          position='absolute'
          top={0}
          left={0}
          bg={imageItemCaptionOverlayBg}
          borderRadius={6}
        >
          <Text fontSize={{ base: 12, sm: 14 }} lineHeight={{ base: '16px', sm: '20px' }}>
            {decideLanguage(i18n.language, { en, ru })}
          </Text>
        </Stack>
      )}
    </Box>
  );
});

export { UnitFormImageItem };
