import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMoveImmutable from 'array-move';

import { Heading, Stack, HStack, Button, chakra } from '@chakra-ui/react';
import { IoCreate, IoHomeOutline } from 'react-icons/io5';

import { useAppContext } from '@src/providers/AppBotnameProvider';
import { getUnits, removeUnit, reorderUnits, type AppUnit } from '@src/entities/unit';
import { UNITS_QUERY } from '@src/configs/rtq.keys';
import { ROOT_ROUTE } from '@src/routes';

import { ContentCard } from './ContentCard';

const ChakraSortableList = chakra(SortableList);

const sortUnits = (units: AppUnit[]) => units.toSorted(({ order: oA }, { order: oB }) => (oA || 0) - (oB || 0));

const ManageContent: React.FC = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const appCtx = useAppContext();

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

  return (
    <Stack py={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden' gap={6}>
      <Heading>Manage</Heading>

      <ChakraSortableList display='flex' flexDirection='column' gap={6} onSortEnd={onSortEnd}>
        {sortUnits(units).map((unit) => (
          <SortableItem key={unit.id}>
            <ContentCard {...unit} removeSelectedUnit={removeSelectedUnit} isControlsDisabled={isControlsDisabled} />
          </SortableItem>
        ))}
      </ChakraSortableList>

      <HStack>
        <Button colorPalette='blue' w='100%' flex='auto' onClick={() => navigate('/unit')} loading={isControlsDisabled}>
          <IoCreate />
          Crate new
        </Button>

        <Button
          variant='surface'
          w='100%'
          flex='auto'
          onClick={() => navigate(ROOT_ROUTE)}
          disabled={isControlsDisabled}
        >
          <IoHomeOutline />
          Main page
        </Button>
      </HStack>
    </Stack>
  );
};

export { ManageContent };
