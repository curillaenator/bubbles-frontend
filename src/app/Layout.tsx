import React, { useEffect } from 'react';
import { Container, Box, Heading, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

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
    <Container as='main' maxW='786px' m='0 auto'>
      <Stack w='100%' h='100vh'>
        <Box p={4} flex='0 0 auto'>
          <Heading size='4xl'>Header</Heading>
        </Box>

        <Stack w='100%' p={4} flex='1 1 auto'>
          <Outlet />
        </Stack>
      </Stack>
    </Container>
  );
};

export { Layout };
