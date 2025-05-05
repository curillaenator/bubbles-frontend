import React from 'react';
import type { AppUnit } from '@src/entities/unit';
import { useNavigate } from 'react-router-dom';

import { Card, Box, Button, Flex } from '@chakra-ui/react';
import { IoRemove } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { MdDragIndicator } from 'react-icons/md';

import { useTranslation } from '@src/hooks/useTranslation';

interface ContentCardProps extends AppUnit {
  isControlsDisabled: boolean;
  removeSelectedUnit: (unit: AppUnit) => void;
}

const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>((props, ref) => {
  const { isControlsDisabled, removeSelectedUnit, ...unit } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card.Root
      ref={ref}
      flexDirection='row'
      overflow='hidden'
      size={{ base: 'sm', sm: 'md', md: 'lg' }}
      flex='none'
      cursor='move'
    >
      <Box>
        <Card.Body>
          <Flex gap={4} alignItems='center' mb='2'>
            <MdDragIndicator size={24} />
            <Card.Title>{unit['title-en']}</Card.Title>
          </Flex>

          <Card.Description>{unit['description-en']}</Card.Description>
        </Card.Body>

        <Card.Footer>
          <Button variant='surface' onClick={() => navigate(`/unit/${unit.id}`)} disabled={isControlsDisabled}>
            <TbEdit /> {t('unit-form-edit-unit')}
          </Button>

          <Button
            disabled={isControlsDisabled}
            variant='surface'
            colorPalette='red'
            onClick={() => {
              if (confirm(`Are u sure to delete "${unit['title-en']}"`)) removeSelectedUnit(unit);
            }}
          >
            <IoRemove /> {t('unit-form-remove-unit')}
          </Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
});

export { ContentCard };
