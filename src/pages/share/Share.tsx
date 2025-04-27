import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Flex, Center, Box, Heading } from '@chakra-ui/react';

const SharePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack gap={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden' py={6} alignItems='center'>
      <Heading size='3xl'>{t('app-share-title')}</Heading>

      <Flex
        w='100%'
        bg='white'
        borderRadius='xl'
        border='1px solid'
        borderColor='border'
        justifyContent='center'
        zIndex={20}
      >
        <Center
          w='100%'
          maxW='512px'
          aspectRatio='1 / 1'
          background='no-repeat url("./assets/tme.png")'
          backgroundPosition='center'
          backgroundSize='cover'
        />
      </Flex>

      <Box
        w='100%'
        flex='1 1 auto'
        background='no-repeat url("./assets/common1.webp")'
        backgroundPosition='center'
        backgroundSize='cover'
        borderRadius='xl'
      />
    </Stack>
  );
};

export { SharePage };
