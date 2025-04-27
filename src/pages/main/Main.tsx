import React from 'react';
import { Box } from '@chakra-ui/react';

import { Dashboard } from '@src/features/dashboard';
import { Banner } from '@src/features/banner';

const Main = () => {
  return (
    <Box maxH='100%' overflow='auto' scrollbar='hidden'>
      <Banner />

      <Dashboard />
    </Box>
  );
};

export { Main };
