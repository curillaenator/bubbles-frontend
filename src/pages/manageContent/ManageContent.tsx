import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Heading, Stack, Card, Box, HStack, Button } from '@chakra-ui/react';
import { IoCreate, IoRemove } from 'react-icons/io5';
import { TbCancel, TbEdit } from 'react-icons/tb';

import { getUnits } from '@src/entities/unit';
import { UNITS_QUERY } from '@src/configs/rtq.keys';
import { ROOT_ROUTE } from '@src/routes';

const ManageContent: React.FC = () => {
  const navigate = useNavigate();

  const { data: units = [] } = useQuery({
    queryKey: [UNITS_QUERY],
    queryFn: () => getUnits(),
  });

  return (
    <Stack py={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden' gap={6}>
      <Heading>Manage</Heading>

      {units.map((unit) => (
        <Card.Root key={unit.id} flexDirection='row' overflow='hidden' size={{ base: 'sm', sm: 'md', md: 'lg' }}>
          <Box>
            <Card.Body>
              <Card.Title mb='2'>{unit['title-en']}</Card.Title>

              <Card.Description>{unit['description-en']}</Card.Description>
            </Card.Body>

            <Card.Footer>
              <Button variant='surface' onClick={() => navigate(`/unit/${unit.id}`)}>
                <TbEdit /> Edit
              </Button>

              <Button variant='surface' colorPalette='red'>
                <IoRemove /> Delete
              </Button>
            </Card.Footer>
          </Box>
        </Card.Root>
      ))}

      <HStack>
        <Button colorPalette='blue' w='100%' flex='auto' onClick={() => navigate('/unit')}>
          <IoCreate />
          Crate new
        </Button>

        <Button variant='surface' w='100%' flex='auto' onClick={() => navigate(ROOT_ROUTE)}>
          <TbCancel />
          Cancel
        </Button>
      </HStack>
    </Stack>
  );
};

export { ManageContent };
