import React from 'react';
import type { AppUnitProps } from '@src/entities/unit';
import { useNavigate } from 'react-router-dom';

import { Card, Box, Button, Flex } from '@chakra-ui/react';
import { IoRemove } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { MdDragIndicator } from 'react-icons/md';

import { useTranslation } from '@src/hooks/useTranslation';
import type { AppUnitFields } from '@src/entities/unit';

type UnitKey = keyof Omit<AppUnitFields, 'gallery'>;

interface ContentCardProps extends AppUnitProps {
  isControlsDisabled: boolean;
  removeSelectedUnit: (unit: AppUnitProps) => void;
}

const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>((props, ref) => {
  const { isControlsDisabled, removeSelectedUnit, ...unit } = props;
  const navigate = useNavigate();
  const { t, curLanguage } = useTranslation();

  const title = unit[`title-${curLanguage}` as UnitKey];
  const description = unit[`description-${curLanguage}` as UnitKey];

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
            <Card.Title>{title}</Card.Title>
          </Flex>

          <Card.Description>{description}</Card.Description>
        </Card.Body>

        <Card.Footer>
          <Flex flexWrap='wrap' gap={2}>
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
          </Flex>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
});

export { ContentCard };
