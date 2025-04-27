import React from 'react';
import { Stack } from '@chakra-ui/react';

import { Dashboard } from '@src/features/dashboard';
import { Banner } from '@src/features/banner';
import { Me } from '@src/features/me';

const Main = () => {
  return (
    <Stack maxH='100%' overflow='auto' scrollbar='hidden' gap={6} py={6}>
      <Banner />

      <Me />

      <Dashboard />
    </Stack>
  );
};

export { Main };
