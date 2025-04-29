import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, Stack, Image, SimpleGrid, GridItem, Heading, Text, Button } from '@chakra-ui/react';

import { FaTelegramPlane } from 'react-icons/fa';

//@ts-expect-error
import me from './vik.jpg';

const Me: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Card.Root width='100%' variant='subtle'>
      <Card.Body gap='2'>
        <SimpleGrid columns={{ base: 1, sm: 3, md: 3, lg: 3 }} gap={6}>
          <GridItem
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            gap={6}
            colSpan={{ base: 1, sm: 2, md: 2, lg: 2 }}
          >
            <Stack gap={6}>
              <Stack>
                <Heading>{t('me-head')}</Heading>

                <Text whiteSpace='pre-line' color='fg.info' fontSize={{ base: 14, sm: 16 }}>
                  {t('me-slogan')}
                </Text>
              </Stack>

              <Stack>
                <Heading>{t('me-pricing')}</Heading>

                <Text whiteSpace='pre-line' color='fg.muted' fontSize={{ base: 14, sm: 16 }}>
                  {t('me-body')}
                </Text>
              </Stack>

              <Text whiteSpace='pre-line' fontSize={{ base: 14, sm: 16 }}>
                <b>{t('me-skills')}</b>
              </Text>
            </Stack>

            <Button
              size='xl'
              colorPalette='blue'
              border='1px solid'
              borderColor='white'
              onClick={() => {
                //@ts-expect-error
                window.Telegram?.WebApp?.openTelegramLink?.('https://t.me/Viktorrrkarp');
              }}
            >
              <FaTelegramPlane />
              {t('app-footer-button')}
            </Button>
          </GridItem>

          <GridItem>
            <Image src={me} alt='Viktor' w='100%' h='100%' objectFit='cover' borderRadius={6} />
          </GridItem>
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
};

export { Me };
