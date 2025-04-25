import React, { useEffect } from 'react';
import { Container, Heading, Stack, Button, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Bubbles } from '@src/features/bubbles';

import { ColorModeButton } from '@src/features/chakra/color-mode';

import { useAuthState } from '@src/hooks/useAuthState';
import { Loader } from '@src/features/loader';

const tg = window.Telegram?.WebApp;

const Layout = () => {
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
      background='no-repeat url("./assets/bg.jpeg")'
      backgroundPosition='center'
      backgroundSize='cover'
    >
      {/* <Image position='absolute' top={0} left={0} /> */}

      <Bubbles />

      <Stack w='100%' h='100vh' gap={0}>
        <Flex
          p={8}
          flex='0 0 auto'
          gap={8}
          justifyContent='space-between'
          alignItems='center'
          // bg='blackAlpha.500'
          // borderBottom='1px solid'
          // borderColor='border.emphasized'
        >
          <Heading size='4xl'>Supa diving</Heading>

          <Flex gap={4}>
            <ColorModeButton size='xl' colorPalette='blue' />

            <Button variant='solid' colorPalette='blue' size='xl' onClick={() => tg.close()}>
              Close diving
            </Button>
          </Flex>
        </Flex>

        <Stack w='100%' p={8} flex='1 1 auto' zIndex={1}>
          <Outlet />
        </Stack>
      </Stack>
    </Container>
  );
};

export { Layout };
