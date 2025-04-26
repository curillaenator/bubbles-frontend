import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { v4 as getId } from 'uuid';

import { Box, Grid, Button, Card, Image, HStack, Badge } from '@chakra-ui/react';

import { useColorModeValue } from '@src/features/chakra/color-mode';

const CARD_WIDTH = 512;
const MOCK_CARDS = [...new Array(23)].map(() => getId());

const getMaxH = (extract: string) => `calc(100% - 1px - ${extract})`;

const Dashboard = () => {
  const cardModedBg = useColorModeValue('var(--chakra-colors-white-alpha-600)', 'var(--chakra-colors-black-alpha-600)');

  const [cols, setCols] = useState<number>(3);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defferedSetCols = useCallback(
    debounce((curWidth: number) => setCols(Math.floor(curWidth / CARD_WIDTH))),
    [],
  );

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const obs = new ResizeObserver(([entry]) => defferedSetCols(entry.contentRect.width));
    obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, [defferedSetCols]);

  return (
    <Box
      maxH={{ base: getMaxH('96px'), sm: getMaxH('144px'), md: getMaxH('220px'), lg: getMaxH('300px') }}
      overflow='auto'
      scrollbar='hidden'
    >
      <Grid ref={gridRef} templateColumns={`repeat(${cols}, 1fr)`} gap={4} my={4}>
        {MOCK_CARDS.map((id) => (
          <Card.Root
            flexDirection='row'
            overflow='hidden'
            maxW='1024px'
            key={id}
            bg={cardModedBg}
            size='sm'
            // borderColor='border.inverted'
          >
            <Image
              objectFit='cover'
              maxW='200px'
              src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
              alt='Caffe Latte'
            />

            <Box>
              <Card.Body>
                <Card.Title mb='2'>The perfect latte</Card.Title>

                <Card.Description>
                  Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.
                </Card.Description>

                <HStack mt='4'>
                  <Badge>Hot</Badge>
                  <Badge>Caffeine</Badge>
                </HStack>
              </Card.Body>

              <Card.Footer>
                <Button>Buy Latte</Button>
              </Card.Footer>
            </Box>
          </Card.Root>
          // <Card.Root maxW='xl' overflow='hidden' key={id} bg={cardModedBg} size='lg' borderColor='border.inverted'>
          //   <Image
          //     src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          //     alt='Green double couch with wooden legs'
          //   />

          //   <Card.Body gap='2'>
          //     <Card.Title>Living room Sofa</Card.Title>

          //     <Card.Description>
          //       This sofa is perfect for modern tropical spaces, baroque inspired spaces.
          //     </Card.Description>

          //     <Text textStyle='2xl' fontWeight='medium' letterSpacing='tight' mt='2'>
          //       $450
          //     </Text>
          //   </Card.Body>

          //   <Card.Footer gap='2'>
          //     <Button variant='solid'>Buy now</Button>

          //     <Button variant='ghost'>Add to cart</Button>
          //   </Card.Footer>
          // </Card.Root>
        ))}
      </Grid>
    </Box>
  );
};

export { Dashboard };
