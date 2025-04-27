import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Flex, Center, Box, Heading, QrCode } from '@chakra-ui/react';

const BOT_LINK = 'https://t.me/best_diving_bot';

const SharePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack gap={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden' py={6} alignItems='center'>
      <Heading size='3xl'>{t('app-share-title')}</Heading>

      <Flex
        w='100%'
        borderRadius='xl'
        border='1px solid'
        borderColor='border'
        bg='bg'
        justifyContent='center'
        zIndex={20}
      >
        <Center w='100%' maxW='512px' aspectRatio='1 / 1'>
          <QrCode.Root value={BOT_LINK} size='2xl'>
            <QrCode.Frame>
              <QrCode.Pattern />
            </QrCode.Frame>
          </QrCode.Root>
        </Center>
      </Flex>

      <Box
        w='100%'
        flex='1 1 auto'
        background='no-repeat url("./assets/common1.webp")'
        backgroundPosition='center'
        backgroundSize='cover'
        borderRadius='xl'
      />
    </Stack>
  );
};

export { SharePage };
