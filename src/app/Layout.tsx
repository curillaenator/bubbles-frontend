import React, { useEffect } from 'react';
import { Container, Heading, Stack, Flex, IconButton } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Bubbles } from '@src/features/bubbles';

import { ColorModeButton, useColorModeValue } from '@src/features/chakra/color-mode';

import { useAuthState } from '@src/hooks/useAuthState';
import { Loader } from '@src/features/loader';

import { MdClose } from 'react-icons/md';

const tg = window.Telegram?.WebApp;

const Layout = () => {
  const appModedLowBg = useColorModeValue(
    'var(--chakra-colors-white-alpha-600)',
    'var(--chakra-colors-black-alpha-600)',
  );

  const appModedHighBg = useColorModeValue(
    'var(--chakra-colors-white-alpha-800)',
    'var(--chakra-colors-black-alpha-800)',
  );

  useEffect(() => {
    if (tg) tg.ready();
  }, []);

  const { appLoading } = useAuthState();

  if (appLoading) return <Loader />;

  return (
    <Container
      as='main'
      m='0 auto'
      position='relative'
      p={0}
      background={`linear-gradient(${appModedLowBg}, ${appModedHighBg}), no-repeat url("./assets/bg.jpeg")`}
      backgroundPosition='center'
      backgroundSize='cover'
      maxW='unset'
    >
      {/* <Image position='absolute' top={0} left={0} /> */}

      <Bubbles />

      <Stack w='100%' h='100vh' gap={0} zIndex={1}>
        <Flex
          p={6}
          flex='0 0 auto'
          gap={6}
          justifyContent='space-between'
          alignItems='center'
          as='header'
          bg={appModedLowBg}
          borderBottom='1px solid'
          borderColor='border.inverted'
        >
          <Heading size='2xl'>Supa diving</Heading>

          <Flex gap={4}>
            <ColorModeButton size='md' colorPalette='blue' variant='surface' />

            <IconButton variant='surface' colorPalette='blue' size='md' onClick={() => tg.close()}>
              <MdClose />
            </IconButton>
          </Flex>
        </Flex>

        <Stack w='100%' px={6} flex='1 1 auto' maxH='calc(100vh - 88px)'>
          <Outlet />
        </Stack>
      </Stack>
    </Container>
  );
};

export { Layout };
