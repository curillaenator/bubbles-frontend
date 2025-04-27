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
          <Center>
            <Image src={me} alt='Viktor' w='100%' borderRadius={6} />
          </Center>

          <GridItem colSpan={{ base: 1, sm: 1, md: 2, lg: 2 }}>
            <Stack py={6}>
              <Heading mb='2'>{t('me-greatings')}</Heading>

              <Card.Description>{t('me-skills')}</Card.Description>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
};

export { Me };
