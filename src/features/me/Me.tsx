import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, Stack, Image, Center, SimpleGrid, GridItem, Heading, Text, Button } from '@chakra-ui/react';

import { FaTelegramPlane } from 'react-icons/fa';

//@ts-expect-error
import me from './vik.jpg';

const Me = () => {
  const { t } = useTranslation();

  return (
    <Card.Root width='100%' variant='subtle'>
      <Card.Body gap='2'>
        <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 3 }} gap={6}>
          <GridItem colSpan={{ base: 1, sm: 1, md: 2, lg: 2 }}>
            <Stack gap={6}>
              <Heading size='2xl'>{t('me-greatings')}</Heading>

              <Text whiteSpace='pre-line' color='fg.info'>
                {t('me-slogan')}
              </Text>

              <Heading>{t('me-pricing')}</Heading>

              <Text whiteSpace='pre-line' color='fg.info'>
                {t('me-skills')}
              </Text>

              <Text fontWeight='bold' whiteSpace='pre-line'>
                {t('me-subskills')}
              </Text>

              <Button
                size='md'
                colorPalette='blue'
                onClick={() => {
                  //@ts-expect-error
                  window.Telegram?.WebApp?.openTelegramLink?.('https://t.me/Viktorrrkarp');
                }}
              >
                <FaTelegramPlane />
                {t('app-footer-button')}
              </Button>
            </Stack>
          </GridItem>

          <Center>
            <Image src={me} alt='Viktor' w='100%' h='100%' objectFit='cover' borderRadius={6} />
          </Center>
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
};

export { Me };
