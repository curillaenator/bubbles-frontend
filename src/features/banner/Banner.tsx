import React from 'react';
import { useUnit } from 'effector-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { Center, Stack, Heading, Text, Image } from '@chakra-ui/react';

import { useAppContext } from '@src/providers/AppBotnameProvider';
import { $userStore, getUserData, type AppUserEditFields } from '@src/entities/user';
import { getAssetUrl } from '@src/entities/asset';

import { Loader } from '@src/features/loader';

import { ME_QUERY, COMMON_ASSET_QUERY } from '@src/configs/rtq.keys';
import { STATIC_PATHS } from '@src/configs/assets.config';

const cap = (str: string) =>
  str
    .split('')
    .map((char, idx) => (idx === 0 ? char.toUpperCase() : char))
    .join('');

const appIntl = (name: string, lang: string) => `${name}${cap(lang)}` as keyof Omit<AppUserEditFields, 'photoURL'>;

const TEXT_SHADOW =
  'drop-shadow(0 0 4px var(--chakra-colors-black-alpha-950)) drop-shadow(0 0 12px var(--chakra-colors-black-alpha-950))';

const Banner: React.FC = () => {
  const { i18n } = useTranslation();
  const { uid } = useUnit($userStore);
  const appCtx = useAppContext();

  const { data: bannerBackgroundURL, isLoading: isBgLoading } = useQuery({
    queryKey: [COMMON_ASSET_QUERY, 'banner-bg'],
    queryFn: () => getAssetUrl(`${appCtx.botname}/${STATIC_PATHS.banner}`),
    enabled: !!appCtx.botname,
  });

  const { data: bannerData = null, isLoading: isDataLoading } = useQuery<AppUserEditFields | null>({
    queryKey: [ME_QUERY, uid],
    queryFn: getUserData.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  const isLoading = isBgLoading || isDataLoading;

  if (isLoading) {
    return (
      <Stack
        borderRadius={6}
        px={{ base: 6, sm: 6, md: 8, lg: 12 }}
        py={{ base: 6, sm: 6, md: 16, lg: 32 }}
        gap={6}
        border='1px solid'
        borderColor='border'
        position='relative'
        h={{ base: '146px' }}
        flex='none'
      >
        <Center w='full' h='full'>
          <Loader />
        </Center>
      </Stack>
    );
  }

  if (!bannerData) return null;

  return (
    <Stack
      px={{ base: 6, sm: 6, md: 8, lg: 12 }}
      py={{ base: 6, sm: 6, md: 16, lg: 32 }}
      gap={{ base: 6, sm: 6, md: 16 }}
      position='relative'
      flex='none'
    >
      {!!bannerBackgroundURL && (
        <Image
          src={bannerBackgroundURL}
          borderRadius={6}
          border='1px solid'
          borderColor='border'
          w='full'
          h='full'
          objectFit='cover'
          zIndex={-1}
          position='absolute'
          top={0}
          left={0}
        />
      )}

      <Heading size={{ base: '2xl', sm: '2xl', md: '3xl', lg: '5xl' }} color='white' filter={TEXT_SHADOW}>
        {bannerData?.[appIntl('bannerTitle', i18n.language)]}
      </Heading>

      <Text color='white' fontWeight='bold' fontSize={{ base: 14, sm: 16 }} filter={TEXT_SHADOW}>
        {bannerData?.[appIntl('bannerSlogan', i18n.language)]}
      </Text>
    </Stack>
  );
};

export { Banner };
