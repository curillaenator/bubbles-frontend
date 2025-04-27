import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, Stack, Image, Center, SimpleGrid, GridItem, Heading } from '@chakra-ui/react';

//@ts-expect-error
import me from './vik.jpg';

const Me = () => {
  const { t } = useTranslation();

  return (
    <Card.Root width='100%' variant='subtle'>
      <Card.Body gap='2'>
        <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 3 }} gap={4}>
          <GridItem colSpan={{ base: 1, sm: 1, md: 2, lg: 2 }}>
            <Stack py={{ base: 0, sm: 0, md: 6, lg: 6 }}>
              <Heading size='2xl'>{t('me-greatings')}</Heading>

              <Card.Description whiteSpace='pre-line'>{t('me-slogan')}</Card.Description>

              <Heading>{t('me-pricing')}</Heading>

              <Card.Description whiteSpace='pre-line'>{t('me-skills')}</Card.Description>

              <Heading size='md' whiteSpace='pre-line'>
                {t('me-subskills')}
              </Heading>
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
