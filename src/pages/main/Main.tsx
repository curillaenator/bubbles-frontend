import React from 'react';
import { Stack } from '@chakra-ui/react';

// import { Dashboard } from '@src/features/dashboard';
import { Gallery } from '@src/features/gallery';
import { Banner } from '@src/features/banner';
import { Me } from '@src/features/me';

const Main: React.FC = () => {
  return (
    <Stack maxH='100%' overflow='auto' scrollbar='hidden' gap={6} py={6}>
      <Banner />
      <Me />
      <Gallery />
    </Stack>
  );
};

export { Main };
