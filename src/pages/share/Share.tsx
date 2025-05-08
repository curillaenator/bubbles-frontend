import React, { useEffect, useState } from 'react';

import { Stack, Flex, Center, Heading, QrCode, Text } from '@chakra-ui/react';

import { useAppContext } from '@src/providers/AppBotnameProvider';
import { useTranslation } from '@src/hooks/useTranslation';

import { SHARE_DATA } from './constants';
import type { ShareLinks } from './interfaces';

const SharePage: React.FC = () => {
  const { t } = useTranslation();
  const { botname } = useAppContext();

  const [shareLinks, setShareLinks] = useState<ShareLinks | null>(null);

  useEffect(() => {
    if (!!botname) setShareLinks(SHARE_DATA[botname]);
  }, [botname]);

  // const {} = SHARE_DATA[botname]

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

      {shareLinks?.web && (
        <>
          <Heading size='3xl'>{t('app-share-app')}</Heading>

          <Text color='fg.muted'>{shareLinks.web}</Text>

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
              <QrCode.Root value={shareLinks.web} size='2xl'>
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
