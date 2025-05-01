import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { GridItem, Image, Center, Stack, Text } from '@chakra-ui/react';
import { IoPlayOutline } from 'react-icons/io5';

import { useColorModeValue } from '@src/features/chakra/color-mode';

import { getImageUrl, type AppUnitGalleryItem } from '@src/entities/unit';
import { GALLERY_IMAGE_QUERY } from '@src/configs/rtq.keys';

interface UnitFormImageItem extends AppUnitGalleryItem {
  onEdit: () => void;
}

const decideLanguage = (language: string, locales: Record<string, string>) => locales[language];

const UnitFormImageItem: React.FC<UnitFormImageItem> = (props) => {
  const { type, src: imagePath, onEdit, en, ru } = props;

  const { i18n } = useTranslation();
  const imageItemCaptionOverlayBg = useColorModeValue('whiteAlpha.600', 'blackAlpha.600');

  const { data: imageSrc } = useQuery({
    queryKey: [GALLERY_IMAGE_QUERY, imagePath],
    queryFn: () => getImageUrl(imagePath),
    enabled: !!imagePath,
  });

  return (
    <GridItem onClick={() => onEdit()} position='relative' cursor='pointer' role='button'>
      <Center w='full' aspectRatio='1 / 1' border='1px solid' borderColor='border' borderRadius={6}>
        {imageSrc && (
          <Image
            alt='Beast diving ever'
            w='100%'
            aspectRatio='1 / 1'
            objectFit='cover'
            borderRadius={6}
            src={imageSrc}
          />
        )}
      </Center>

      {type === 'video' && (
        <Center w='full' h='full' position='absolute' top={0} left={0}>
          <IoPlayOutline size={64} />
        </Center>
      )}

      {!!en && !!ru && (
        <Stack w='full' p={4} position='absolute' top={0} left={0} bg={imageItemCaptionOverlayBg} borderRadius={6}>
          <Text fontSize={{ base: 14, sm: 16 }} lineHeight='24px' maxW='calc(100% - 2rem)'>
            {decideLanguage(i18n.language, { en, ru })}
          </Text>
        </Stack>
      )}
    </GridItem>
  );
};

export { UnitFormImageItem };
