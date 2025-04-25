import React from 'react';

import { Stack } from '@chakra-ui/react';

import { Dashboard } from '@src/features/dashboard';

const Main = () => {
  return (
    <Stack h='100%'>
      <Dashboard />
    </Stack>
  );
};

export { Main };
