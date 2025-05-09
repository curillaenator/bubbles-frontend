import React, { useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMoveImmutable from 'array-move';

import { Heading, Stack, HStack, Button, chakra } from '@chakra-ui/react';
import { IoCreateOutline, IoHomeOutline } from 'react-icons/io5';

import { useTranslation } from '@src/hooks/useTranslation';
import { useAppContext } from '@src/providers/AppContextProvider';
import { getUnits, removeUnit, reorderUnits, type AppUnitProps } from '@src/entities/unit';
import { UNITS_QUERY } from '@src/configs/rtq.keys';
import { ROUTES } from '@src/routes';

import { ContentCard } from './ContentCard';

const ChakraSortableList = chakra(SortableList);

const sortUnits = (units: AppUnitProps[]) => units.toSorted(({ order: oA }, { order: oB }) => (oA || 0) - (oB || 0));

const ManageContent: React.FC = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const appCtx = useAppContext();
  const { t } = useTranslation();

  const { data: units = [] } = useQuery({
    queryKey: [UNITS_QUERY],
    queryFn: getUnits.bind(appCtx),
  });

  const { mutate: removeSelectedUnit, isPending: isRemovingUnit } = useMutation({
    mutationFn: removeUnit.bind(appCtx),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [UNITS_QUERY] });
    },
  });

  const { mutate: reorderUnitList, isPending: isReorderingUnits } = useMutation({
    mutationFn: reorderUnits.bind(appCtx),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [UNITS_QUERY] });
    },
  });

  const onSortEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      const reorderedUnits = arrayMoveImmutable(sortUnits(units), oldIndex, newIndex).map((u, order) => ({
        ...u,
        order,
      }));

      reorderUnitList(reorderedUnits);
    },
    [units, reorderUnitList],
  );

  const isControlsDisabled = isRemovingUnit || isReorderingUnits;

  if (!appCtx.botname) return <Navigate to={ROUTES.root} replace />;

  return (
    <Stack py={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden' gap={6}>
      <Heading>{t('app-nav-manage-units')}</Heading>

      <HStack>
        <Button colorPalette='blue' w='100%' flex='auto' onClick={() => navigate('/unit')} loading={isControlsDisabled}>
          <IoCreateOutline />
          {t('unit-form-create-unit')}
        </Button>

        <Button
          variant='surface'
          w='100%'
          flex='auto'
          onClick={() => navigate(ROUTES.root)}
          disabled={isControlsDisabled}
        >
          <IoHomeOutline />
          {t('app-nav-main')}
        </Button>
      </HStack>

      <ChakraSortableList display='flex' flexDirection='column' gap={6} onSortEnd={onSortEnd}>
        {sortUnits(units).map((unit) => (
          <SortableItem key={unit.id}>
            <ContentCard {...unit} removeSelectedUnit={removeSelectedUnit} isControlsDisabled={isControlsDisabled} />
          </SortableItem>
        ))}
      </ChakraSortableList>
    </Stack>
  );
};

export const Component = ManageContent;
