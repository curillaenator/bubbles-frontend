import React, { useEffect } from 'react';
import { Container, Heading, Stack, Flex, IconButton, Flex as Header, Image } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Bubbles } from '@src/features/bubbles';

import { ColorModeButton, useColorModeValue } from '@src/features/chakra/color-mode';
import { useAuthState } from '@src/hooks/useAuthState';
import { Loader } from '@src/features/loader';

import { MdClose } from 'react-icons/md';

import { Logo } from './Logo';
//@ts-expect-error
import headBg from './assets/head.png';

const tg = window.Telegram?.WebApp;

const getMaxH = (extract: string) => `calc(100vh - ${extract})`;

const Layout = () => {
  useEffect(() => {
    if (tg) tg.ready();
  }, []);

  const { appLoading } = useAuthState();

  const headerOpacity = useColorModeValue('0.9', '0.5');

  if (appLoading) return <Loader />;

  return (
    <Container as='main' position='relative' p={0} maxW='unset'>
      <Bubbles />

      <Stack w='100%' h='100vh' gap={0} zIndex={1} position='relative'>
        <Header
          data-app-header
          p={{ base: 4, sm: 4, md: 4, lg: 6 }}
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
            <Logo />
            <Heading size={{ base: 'md', sm: 'xl', md: '2xl', lg: '2xl' }} color='white'>
              NhaTrang Diving
            </Heading>
          </Flex>

          <Flex gap={4}>
            <ColorModeButton size='md' variant='ghost' color='white' />

            <IconButton variant='ghost' size='md' onClick={() => tg.close()} color='white'>
              <MdClose />
            </IconButton>
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
    </Container>
  );
};

export { Layout };
