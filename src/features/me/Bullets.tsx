import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, Stack, SimpleGrid, GridItem, Heading, Text } from '@chakra-ui/react';

// import { FaTelegramPlane } from 'react-icons/fa';

const EMOJIES = ['😇', '🤿', '🎓', '😎', '🤙'];

const Bullets: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Card.Root width='100%' variant='subtle' bg='bg'>
      <Card.Body gap='2'>
        <Stack gap={6}>
          <Heading size='2xl'>{t('description-head')}</Heading>

          <SimpleGrid columns={{ base: 1, sm: 3, md: 3, lg: 3 }} gap={{ base: 2, sm: 2, md: 2, lg: 4, xl: 6 }}>
            {t('description-body')
              .split('\n')
              .map((string, emojiIdx) => (
                <GridItem key={EMOJIES[emojiIdx]} p={4} borderRadius={6} bg='bg.muted' display='flex' gap={6}>
                  <Text fontSize={64} h='64px' lineHeight='64px'>
                    {EMOJIES[emojiIdx]}
                  </Text>

                  <Stack>
                    {string.split(':').map((substring, substrIdx) =>
                      substrIdx === 0 ? (
                        <Heading size='md' key={substring.trim()}>
                          {substring.trim()}
                        </Heading>
                      ) : (
                        <Text fontSize={14} key={substring.trim()} color='fg.muted'>
                          {substring.trim()}
                        </Text>
                      ),
                    )}
                  </Stack>
                </GridItem>
              ))}
          </SimpleGrid>

          {/* <Heading whiteSpace='pre-line'>{t('description-slogan')}</Heading> */}

          {/* <Button
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
          </Button> */}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export { Bullets };
