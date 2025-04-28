import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Container,
  Container as AppBody,
  Heading,
  Stack as AppInteractiveUI,
  Flex,
  IconButton,
  Button,
  Flex as AppHeader,
  Flex as AppFooter,
  Image,
  CloseButton,
  Drawer,
  Portal,
  chakra,
} from '@chakra-ui/react';

import { Outlet } from 'react-router-dom';

import { Bubbles } from '@src/features/bubbles';
import { Logo } from '@src/features/logo';

// import { useAuthState } from '@src/hooks/useAuthState';
import { useColorModeValue } from '@src/features/chakra/color-mode';
import { Menu } from '@src/features/menu';
import { LangSelector } from '@src/features/langSelector';
// import { Loader } from '@src/features/loader';

import { MdMenu } from 'react-icons/md';
import { FaTelegramPlane } from 'react-icons/fa';

//@ts-expect-error
import headBg from './assets/head.png';

const HEADER_PD = { base: 4, sm: 4, md: 4, lg: 6 };

const getMaxH = (head: string, foot: string) => `calc(100vh - ${head} - ${foot})`;

const ChakraLink = chakra(Link);

const Layout: React.FC = () => {
  const headerOpacity = useColorModeValue('0.9', '0.5');
  const menuHeaderColor = useColorModeValue('bg.inverted', 'bg');
  const { t } = useTranslation();

  // const { appLoading } = useAuthState();

  const [drawerOpen, toggleDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram?.WebApp.ready();
    }
  }, []);

  // if (appLoading) return <Loader />;

  return (
    <Container as='main' position='relative' p={0} maxW='unset' minW='375px'>
      <Bubbles />

      <AppInteractiveUI w='100%' h='100vh' gap={0} position='relative'>
        <AppHeader
          data-app-header
          p={HEADER_PD}
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
            src={headBg}
            w='100%'
            objectFit='cover'
            transform='translateY(-38%)'
            zIndex={-1}
            opacity={headerOpacity}
            position='absolute'
            top={0}
            left={0}
          />

          <Flex alignItems='center' gap={2}>
            <IconButton variant='ghost' size='md' color='white' onClick={() => toggleDrawer((o) => !o)}>
              <MdMenu />
            </IconButton>

            <ChakraLink to='/'>
              <Logo />
            </ChakraLink>

            <Heading size={{ base: 'md', sm: 'xl', md: '2xl', lg: '2xl' }} color='white'>
              {t('app-title')}
            </Heading>
          </Flex>

          <Flex gap={2}>
            {/* <ColorModeButton size='md' variant='ghost' color='white' /> */}

            <LangSelector />
          </Flex>
        </AppHeader>

        <AppBody
          as='div'
          w='100%'
          m='0 auto'
          px={6}
          flex='1 1 auto'
          maxH={{
            base: getMaxH('73px', '72px'),
            sm: getMaxH('73px', '96px'),
            md: getMaxH('73px', '96px'),
            lg: getMaxH('97px', '144px'),
            xl: getMaxH('97px', '200px'),
            '2xl': getMaxH('97px', '200px'),
          }}
        >
          <Outlet />
        </AppBody>

        <AppFooter
          w='100%'
          h={{
            base: '72px',
            sm: '96px',
            md: '96px',
            lg: '144px',
            xl: '200px',
            '2xl': '200px',
          }}
          data-app-footer
          p={HEADER_PD}
          flex='0 0 auto'
          alignItems='flex-end'
          as='footer'
          position='relative'
          overflow='hidden'
          borderTop='1px solid'
          borderColor='border'
          background='no-repeat url("./assets/footer.jpg")'
          backgroundPosition='center'
          backgroundSize='cover'
        >
          <Button
            size='md'
            colorPalette='blue'
            border='1px solid'
            borderColor='white'
            onClick={() => {
              //@ts-expect-error
              window.Telegram?.WebApp?.openTelegramLink?.('https://t.me/Viktorrrkarp');
            }}
          >
            <FaTelegramPlane />
            {t('app-footer-button')}
          </Button>
        </AppFooter>
      </AppInteractiveUI>

      <Drawer.Root
        size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'md' }}
        placement='start'
        open={drawerOpen}
        onOpenChange={(e: { open: boolean }) => toggleDrawer(e.open)}
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

              <Drawer.Body p={6}>
                <Menu toggleDrawer={toggleDrawer} />
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
