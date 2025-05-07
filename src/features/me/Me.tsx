import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

import { Card, Stack, Image, SimpleGrid, GridItem, Heading, Text, Button, Center, Flex, Box } from '@chakra-ui/react';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

import { useTranslation } from '@src/hooks/useTranslation';
import { useAppContext } from '@src/providers/AppBotnameProvider';

import { getUserData, getAvatarUrl, updateMyChatId, type AppUserEditFields } from '@src/entities/user';
import { getAssetUrl } from '@src/entities/asset';
import { Loader } from '@src/features/loader';

import { ME_QUERY, AVATAR_QUERY, COMMON_ASSET_QUERY } from '@src/configs/rtq.keys';
import { STATIC_PATHS } from '@src/configs/assets.config';

// const TEXT_SHADOW =
//   'drop-shadow(0 0 4px var(--chakra-colors-black-alpha-950)) drop-shadow(0 0 12px var(--chakra-colors-black-alpha-950))';

const cap = (str: string) =>
  str
    .split('')
    .map((char, idx) => (idx === 0 ? char.toUpperCase() : char))
    .join('');

const getFieldKey = (name: string, lang: string) =>
  `${name}${cap(lang)}` as keyof Omit<AppUserEditFields, 'photoURL' | 'bullets'>;

const Me: React.FC = () => {
  const { curLanguage } = useTranslation();
  const appCtx = useAppContext();

  const { data: meData = null, isLoading } = useQuery({
    queryKey: [ME_QUERY],
    queryFn: getUserData.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  const { data: avatarSrc, isLoading: isAvatarLoading } = useQuery({
    queryKey: [AVATAR_QUERY],
    queryFn: getAvatarUrl.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  const { data: bannerBackgroundURL, isLoading: isBannerBackgroundLoading } = useQuery({
    queryKey: [COMMON_ASSET_QUERY, 'banner-bg'],
    queryFn: () => getAssetUrl(`${appCtx.botname}/${STATIC_PATHS.banner}`),
    enabled: !!appCtx.botname,
  });

  const { mutate: setMyChatId } = useMutation({ mutationFn: updateMyChatId.bind(appCtx) });
  useEffect(setMyChatId, [setMyChatId]);

  if (isLoading || isAvatarLoading || isBannerBackgroundLoading) {
    return (
      <Card.Root w='full'>
        <Card.Body gap='2' p={0}>
          <Center w='full' h='480px'>
            <Loader />
          </Center>
        </Card.Body>
      </Card.Root>
    );
  }

  if (!meData) return null;

  return (
    <Card.Root width='100%' variant='subtle'>
      <Card.Body gap='2' position='relative'>
        {!!(bannerBackgroundURL && false) && (
          <>
            <Image
              src={bannerBackgroundURL || undefined}
              borderRadius={6}
              border='1px solid'
              borderColor='border'
              w='full'
              h='full'
              objectFit='cover'
              position='absolute'
              top={0}
              left={0}
              opacity={0.2}
            />

            <Box
              position='absolute'
              top={0}
              left={0}
              w='full'
              h='full'
              bg='blue.solid'
              opacity={0.05}
              borderRadius={6}
            />
          </>
        )}

        <SimpleGrid columns={{ base: 1, sm: 3, md: 3, lg: 3 }} gap={6} zIndex={1}>
          <GridItem
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            gap={6}
            colSpan={{ base: 1, sm: 2, md: 2, lg: 2 }}
          >
            <Stack gap={6}>
              <Heading>{meData[getFieldKey('head', curLanguage)]}</Heading>

              <Heading>{meData?.[getFieldKey('pricing', curLanguage)]}</Heading>

              <Text whiteSpace='pre-line' color='fg.muted' fontSize={{ base: 14, sm: 16 }}>
                {meData[getFieldKey('body', curLanguage)]}
              </Text>
            </Stack>

            <Flex gap={6} flexWrap='wrap'>
              {!!meData.telegram && (
                <Button
                  size='xl'
                  colorPalette='blue'
                  border='1px solid'
                  borderColor='white'
                  onClick={() => {
                    //@ts-expect-error
                    window.Telegram?.WebApp?.openTelegramLink?.(`https://${meData.telegram}`);
                  }}
                >
                  <FaTelegramPlane />
                  Telegram
                </Button>
              )}

              {!!meData.whatsapp && (
                <Button
                  as='a'
                  size='xl'
                  colorPalette='green'
                  border='1px solid'
                  borderColor='white'
                  //@ts-expect-error
                  href={`https://${meData.whatsapp}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaWhatsapp />
                  WhatsApp
                </Button>
              )}
            </Flex>
          </GridItem>

          <GridItem>
            {!!avatarSrc && <Image src={avatarSrc} alt='Avatar' w='100%' h='100%' objectFit='cover' borderRadius={6} />}
          </GridItem>
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
};

export { Me };
