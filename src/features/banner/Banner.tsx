import React from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Button, Stack, Heading, Text } from '@chakra-ui/react';

const Banner = () => {
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
          size='xl'
          variant='solid'
          //   colorPalette='blue'
          //   color='white'
          border='1px solid'
          borderColor='white'
        >
          Ready to dive
        </Button>
      </Flex>
    </Stack>
  );
};

export { Banner };
