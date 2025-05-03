import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { Heading, Flex, IconButton, Image, chakra } from '@chakra-ui/react';
import { IoMenu } from 'react-icons/io5';

import { getImageUrl } from '@src/entities/asset';
import { useAppContext } from '@src/providers/AppBotnameProvider';

import { useColorModeValue } from '@src/features/chakra/color-mode';

import { Logo } from '@src/features/logo';
import { LangSelector } from '@src/features/langSelector';

import { COMMON_ASSET_QUERY } from '@src/configs/rtq.keys';
import { STATIC_PATHS } from '@src/configs/assets.config';

const ChakraLink = chakra(Link);

interface AppHeaderProps {
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppHeader: React.FC<AppHeaderProps> = ({ toggleDrawer }) => {
  const headerOpacity = useColorModeValue('0.9', '0.5');
  const { t } = useTranslation();
  const appCtx = useAppContext();

  const { data: headerBackgroundURL } = useQuery({
    queryKey: [COMMON_ASSET_QUERY, 'header-bg'],
    queryFn: () => getImageUrl(`${appCtx.botname}/${STATIC_PATHS.header}`),
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
      <Image
        src={headerBackgroundURL}
        w='100%'
        objectFit='cover'
        zIndex={-1}
        opacity={headerOpacity}
        position='absolute'
        top={0}
        left={0}
      />

      <Flex alignItems='center' gap={2}>
        <IconButton variant='ghost' size='md' color='white' onClick={() => toggleDrawer((o) => !o)}>
          <IoMenu />
        </IconButton>

        <ChakraLink to='/'>
          <Logo />
        </ChakraLink>

        <Heading size={{ base: 'md', sm: 'xl', md: '2xl' }} color='white'>
          {t('app-title')}
        </Heading>
      </Flex>

      <Flex gap={2}>
        <LangSelector />
      </Flex>
    </Flex>
  );
};

export { AppHeader };
