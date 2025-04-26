import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Container,
  Heading,
  Stack,
  Flex,
  IconButton,
  Flex as Header,
  Image,
  CloseButton,
  Drawer,
  Portal,
} from '@chakra-ui/react';

import { Outlet } from 'react-router-dom';

import { Bubbles } from '@src/features/bubbles';

// import { useAuthState } from '@src/hooks/useAuthState';
import { ColorModeButton, useColorModeValue } from '@src/features/chakra/color-mode';
import { LangSelector } from '@src/features/langSelector';
import { Loader } from '@src/features/loader';

import { MdMenu } from 'react-icons/md';

import { Logo } from './assets/Logo';
//@ts-expect-error
import headBg from './assets/head.png';

const HEADER_PD = { base: 4, sm: 4, md: 4, lg: 6 };

const tg = window.Telegram?.WebApp;

const getMaxH = (extract: string) => `calc(100vh - ${extract})`;

const Layout = () => {
  const headerOpacity = useColorModeValue('0.9', '0.5');
  const menuHeaderColor = useColorModeValue('bg.inverted', 'bg');
  const { t } = useTranslation();

  // const { appLoading } = useAuthState();
  const appLoading = false;

  const [menuoOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (tg) tg.ready();
  }, []);

  if (appLoading) return <Loader />;

  return (
    <Container as='main' position='relative' p={0} maxW='unset' minW='375px'>
      <Bubbles />

      <Stack w='100%' h='100vh' gap={0} position='relative'>
        <Header
          data-app-header
          p={HEADER_PD}
          flex='0 0 auto'
          gap={6}
          justifyContent='space-between'
          alignItems='center'
          as='header'
          position='relative'
          overflow='hidden'
          borderBottom='1px solid'
          borderColor='border'
        >
          <Image
            src={headBg}
            w='100%'
            objectFit='cover'
            position='absolute'
            top={0}
            left={0}
            transform='translateY(-38%)'
            zIndex={-1}
            opacity={headerOpacity}
          />

          <Flex alignItems='center' gap={4}>
            <IconButton variant='solid' size='md' onClick={() => setMenuOpen((o) => !o)}>
              <MdMenu />
            </IconButton>

            <Logo />

            <Heading size={{ base: 'md', sm: 'xl', md: '2xl', lg: '2xl' }} color='white'>
              {t('app-title')}
            </Heading>
          </Flex>

          <Flex gap={4}>
            <ColorModeButton size='md' variant='solid' />

            <LangSelector />
          </Flex>
        </Header>

        <Container
          as='div'
          w='100%'
          m='0 auto'
          px={6}
          flex='1 1 auto'
          maxH={{ base: getMaxH('73px'), sm: getMaxH('73px'), md: getMaxH('73px'), lg: getMaxH('97px') }}
        >
          <Outlet />
        </Container>
      </Stack>

      <Drawer.Root
        size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'md' }}
        placement='start'
        open={menuoOpen}
        onOpenChange={(e: { open: boolean }) => setMenuOpen(e.open)}
      >
        <Portal>
          <Drawer.Backdrop />

          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header p={HEADER_PD} borderBottom='1px solid' borderColor='border' bg={menuHeaderColor}>
                <Drawer.Title>
                  <Flex alignItems='center' gap={4}>
                    <Logo />

                    <Heading size={{ base: 'md', sm: 'xl', md: '2xl', lg: '2xl' }} color='white'>
                      {t('app-title')}
                    </Heading>
                  </Flex>
                </Drawer.Title>
              </Drawer.Header>

              <Drawer.Body>
                <p>{t('banner-slogan')}</p>
              </Drawer.Body>

              {/* @ts-expect-error */}
              <Drawer.CloseTrigger asChild>
                <CloseButton size='sm' color='white' />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Container>
  );
};

export { Layout };
