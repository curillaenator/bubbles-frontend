import React from 'react';
import { Navigate } from 'react-router-dom';
import { Stack } from '@chakra-ui/react';

import { useAppContext } from '@src/providers/AppContextProvider';
import { UnitForm } from '@src/features/unitForm';

import { ROUTES } from '@src/routes';

const EditContent: React.FC = () => {
  const appCtx = useAppContext();

  if (!appCtx.botname) return <Navigate to={ROUTES.root} replace />;

  return (
    <Stack py={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden' gap={6}>
      <UnitForm />
    </Stack>
  );
};

export const Component = EditContent;
