import React, { useEffect } from 'react';
import { Container, Heading, Stack, Flex, IconButton } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Bubbles } from '@src/features/bubbles';

import { ColorModeButton, useColorModeValue } from '@src/features/chakra/color-mode';
import { useAuthState } from '@src/hooks/useAuthState';
import { Loader } from '@src/features/loader';

import { MdClose } from 'react-icons/md';

import { Logo } from './Logo';

const tg = window.Telegram?.WebApp;

const Layout = () => {
  useEffect(() => {
    if (tg) tg.ready();
  }, []);

  const { appLoading } = useAuthState();

  const headerBg = useColorModeValue('whiteAlpha.700', 'blackAlpha.700');

  if (appLoading) return <Loader />;

  return (
    <Container as='main' position='relative' p={0} maxW='unset'>
      <Bubbles />

      <Stack w='100%' h='100vh' gap={0} zIndex={1} position='relative'>
        <Flex
          p={6}
          flex='0 0 auto'
          gap={6}
          justifyContent='space-between'
          alignItems='center'
          as='header'
          bg={headerBg}
          borderBottom='1px solid'
          borderColor='border'
        >
          <Flex alignItems='center' gap={4}>
            <Logo />

            <Heading size={{ base: 'md', sm: 'md', md: 'xl', lg: '2xl' }}>NhaTrand Diving</Heading>
          </Flex>

          <Flex gap={4}>
            <ColorModeButton size='md' variant='ghost' />

            <IconButton variant='ghost' size='md' onClick={() => tg.close()}>
              <MdClose />
            </IconButton>
          </Flex>
        </Flex>

        <Container as='div' w='100%' m='0 auto' px={6} flex='1 1 auto' maxH='calc(100vh - 96px)'>
          <Outlet />
        </Container>
      </Stack>
    </Container>
  );
};

export { Layout };
