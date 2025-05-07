import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Card, Stack, SimpleGrid, GridItem, Heading, Text, Center } from '@chakra-ui/react';

import { useAppContext } from '@src/providers/AppBotnameProvider';
import { useTranslation } from '@src/hooks/useTranslation';
import { getUserData } from '@src/entities/user';

import { Loader } from '@src/features/loader';

import { ME_QUERY } from '@src/configs/rtq.keys';

// import { FaTelegramPlane } from 'react-icons/fa';

const Bullets: React.FC = () => {
  const { t, curLanguage } = useTranslation();

  const appCtx = useAppContext();

  const { data = null, isLoading } = useQuery({
    queryKey: [ME_QUERY],
    queryFn: getUserData.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  if (isLoading)
    return (
      <Card.Root w='full' my={6}>
        <Card.Body gap='2' p={0}>
          <Center w='full' h='220px'>
            <Loader />
          </Center>
        </Card.Body>
      </Card.Root>
    );

  if (!data?.bullets.length) return null;

  const bullets = data.bullets;

  return (
    <Card.Root width='100%' variant='subtle' bg='bg' my={6}>
      <Card.Header>
        <Heading>{t('bullets-title')}</Heading>
      </Card.Header>

      <Card.Body>
        <SimpleGrid columns={{ base: 1, sm: 3 }} gap={{ base: 2, sm: 2, md: 6 }}>
          {bullets.map(({ id, ru, en, emoji }) => (
            <GridItem
              key={id}
              p={{ base: 4, sm: 4, md: 6 }}
              borderRadius={6}
              bg='bg.muted'
              display='flex'
              gap={{ base: 2, sm: 2, md: 6 }}
            >
              {!!emoji && (
                <Text fontSize={64} h='64px' lineHeight='64px'>
                  {emoji}
                </Text>
              )}

              <Stack>
                {{ ru, en }[curLanguage as 'ru' | 'en'].split(':').map((substring, substrIdx) =>
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
      </Card.Body>
    </Card.Root>
  );
};

export { Bullets };
