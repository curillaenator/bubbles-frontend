import React from 'react';
import { Box } from '@chakra-ui/react';

import { Dashboard } from '@src/features/dashboard';
import { Banner } from '@src/features/banner';

const getMaxH = (extract: string) => `calc(100% - ${extract})`;

const Main = () => {
  return (
    <Box
      maxH={{ base: getMaxH('96px'), sm: getMaxH('144px'), md: getMaxH('220px') }}
      overflow='auto'
      scrollbar='hidden'
    >
      <Banner />

      <Dashboard />
    </Box>
  );
};

export { Main };
