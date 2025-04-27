import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Flex, Button, Stack, Heading, Text } from '@chakra-ui/react';

import { Logo } from '../logo';

const Banner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack
      bg='whiteAlpha.700'
      my={6}
      background='no-repeat url("./assets/banner.jpg")'
      backgroundPosition='center'
      backgroundSize='cover'
      borderRadius={6}
      px={{ base: 6, sm: 6, md: 8, lg: 12 }}
      py={{ base: 12, sm: 12, md: 24, lg: 32 }}
      gap={6}
      border='1px solid'
      borderColor='border'
    >
      <Heading size={{ base: '2xl', sm: '2xl', md: '3xl', lg: '5xl' }} color='white'>
        {t('banner-title')}
      </Heading>

      <Text color='white'>{t('banner-slogan')}</Text>

      <Flex pt={12}>
        <Button
          as={Link}
          //@ts-expect-error
          to='https://t.me/Viktorrrkarp'
          onClick={() => window.Telegram?.WebApp.close()}
          size='xl'
          variant='solid'
          colorPalette='blue'
          border='1px solid'
          borderColor='white'
          fontWeight='extrabold'
        >
          <Logo size={24} />
          {t('banner-button')}
        </Button>
      </Flex>
    </Stack>
  );
};

export { Banner };
