import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Container, Container as AppBody, Heading, Stack, Flex, CloseButton, Drawer, Portal } from '@chakra-ui/react';

import { Logo } from '@src/features/logo';
import { AppHeader, AppFooter } from '@src/features/layout';
import { Bubbles } from '@src/features/bubbles';

import { useAppContext } from '@src/providers/AppBotnameProvider';
import { useTranslation } from '@src/hooks/useTranslation';
import { useColorModeValue } from '@src/features/chakra/color-mode';

import { Menu } from '@src/features/menu';

const getMaxH = (head: string, foot: string) => `calc(100vh - ${head} - ${foot})`;

const Layout: React.FC = () => {
  const menuHeaderColor = useColorModeValue('bg.inverted', 'bg');
  const { t } = useTranslation();
  const appCtx = useAppContext();

  const [drawerOpen, toggleDrawer] = useState<boolean>(false);

  useEffect(() => {
    window.Telegram?.WebApp?.ready();
  }, []);

  return (
    <Container as='main' position='relative' p={0} maxW='unset' minW='375px'>
      {appCtx.botname === 'divebot' && <Bubbles />}

      <Stack w='100%' h='100vh' gap={0} position='relative'>
        <AppHeader toggleDrawer={toggleDrawer} />

        <AppBody as='div' w='100%' m='0 auto' px={6} flex='1 1 auto' maxH={getMaxH('73px', '72px')}>
          <Outlet />
        </AppBody>

        <AppFooter />
      </Stack>

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
              <Drawer.Header
                flex='none'
                p={4}
                h='72px'
                borderBottom='1px solid'
                borderColor='border'
                bg={menuHeaderColor}
              >
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
