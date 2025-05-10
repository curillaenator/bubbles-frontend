import React, { useEffect, useState } from 'react';

import { Stack, Flex, Center, Heading, QrCode, Text } from '@chakra-ui/react';

import { useAppContext } from '@src/providers/AppContextProvider';
import { useTranslation } from '@src/hooks/useTranslation';

import { AVAILBALE_BOTS } from '@src/bots';

const SharePage: React.FC = () => {
  const { t } = useTranslation();
  const { botname } = useAppContext();

  const [shareLinks, setShareLinks] = useState<AvailableBotItem | null>(null);

  useEffect(() => {
    if (!!botname) setShareLinks(AVAILBALE_BOTS[botname]);
  }, [botname]);

  return (
    <Stack gap={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden' py={6} alignItems='center'>
      {shareLinks?.bot && (
        <>
          <Heading size='3xl'>{t('app-share-bot')}</Heading>

          <Text color='fg.muted'>{shareLinks.bot}</Text>

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
              <QrCode.Root value={shareLinks.bot} size='2xl'>
                <QrCode.Frame style={{ fill: 'black', background: 'white' }}>
                  <QrCode.Pattern />
                </QrCode.Frame>
              </QrCode.Root>
            </Center>
          </Flex>
        </>
      )}

      {shareLinks?.app && (
        <>
          <Heading size='3xl'>{t('app-share-app')}</Heading>

          <Text color='fg.muted'>{shareLinks.app}</Text>

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
              <QrCode.Root value={shareLinks.app} size='2xl'>
                <QrCode.Frame style={{ fill: 'black', background: 'white' }}>
                  <QrCode.Pattern />
                </QrCode.Frame>
              </QrCode.Root>
            </Center>
          </Flex>
        </>
      )}
    </Stack>
  );
};

export const Component = SharePage;
