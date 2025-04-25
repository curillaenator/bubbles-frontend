import React from 'react';

import { Stack, Heading } from '@chakra-ui/react';

// 1 рад × 180/π = 57,296°

const Main = () => {
  console.log(Math.sin(Math.PI / 2));

  return (
    <Stack h='100%'>
      <Heading>This is app for Vitya diving</Heading>
    </Stack>
  );
};

export { Main };
