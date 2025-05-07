import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { useUnit } from 'effector-react';

import { Heading, Flex, IconButton, Image, chakra } from '@chakra-ui/react';
import { IoMenu } from 'react-icons/io5';

import { getAssetUrl } from '@src/entities/asset';
import { $userStore, getUserData, type AppUserEditFields } from '@src/entities/user';
import { useAppContext } from '@src/providers/AppBotnameProvider';
import { useTranslation } from '@src/hooks/useTranslation';

import { useColorModeValue } from '@src/features/chakra/color-mode';

import { Logo } from '@src/features/logo';
import { LangSelector } from '@src/features/langSelector';

import { COMMON_ASSET_QUERY, ME_QUERY } from '@src/configs/rtq.keys';
import { STATIC_PATHS } from '@src/configs/assets.config';
import { ROOT_ROUTE } from '@src/routes';

const ChakraLink = chakra(Link);

interface AppHeaderProps {
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const capitate = (str: string) =>
  str
    .split('')
    .map((char, idx) => (idx === 0 ? char.toUpperCase() : char))
    .join('');

const getFieldKey = (name: string, lang: string) =>
  `${name}${capitate(lang)}` as keyof Omit<AppUserEditFields, 'photoURL' | 'bullets'>;

const AppHeader: React.FC<AppHeaderProps> = ({ toggleDrawer }) => {
  const headerOpacity = useColorModeValue('0.9', '0.5');
  const { curLanguage } = useTranslation();
  const appCtx = useAppContext();
  const { uid } = useUnit($userStore);

  const { data: headerBackgroundURL } = useQuery({
    queryKey: [COMMON_ASSET_QUERY, 'header-bg'],
    queryFn: () => getAssetUrl(`${appCtx.botname}/${STATIC_PATHS.header}`),
    enabled: !!appCtx.botname,
  });

  const { data = null } = useQuery<AppUserEditFields | null>({
    queryKey: [ME_QUERY, uid],
    queryFn: getUserData.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  return (
    <Flex
      data-app-header
      p={4}
      flex='0 0 auto'
      gap={4}
      justifyContent='space-between'
      alignItems='center'
      as='header'
      position='relative'
      overflow='hidden'
      borderBottom='1px solid'
      borderColor='border'
    >
      {!!headerBackgroundURL && (
        <Image
          src={headerBackgroundURL}
          w='100%'
          objectFit='cover'
          zIndex={-1}
          opacity={headerOpacity}
          position='absolute'
          top='50%'
          transform='translateY(-50%)'
          left={0}
        />
      )}

      <Flex alignItems='center' gap={2}>
        <IconButton variant='ghost' size='md' color='white' onClick={() => toggleDrawer((o) => !o)}>
          <IoMenu />
        </IconButton>

        <ChakraLink to={ROOT_ROUTE}>
          <Logo />
        </ChakraLink>

        <Heading size={{ base: 'md', sm: 'xl', md: '2xl' }} color='white'>
          {data?.[getFieldKey('botName', curLanguage)]}
        </Heading>
      </Flex>

      <Flex gap={2}>
        <LangSelector />
      </Flex>
    </Flex>
  );
};

export { AppHeader };
