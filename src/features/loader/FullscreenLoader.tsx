import React from 'react';
import { Center } from '@chakra-ui/react';
import { Loader } from './Loader';

const FullsizeLoader: React.FC<{ fs?: boolean }> = ({ fs }) => (
  <Center w={fs ? '100vw' : 'full'} h={fs ? '100vh' : 'full'}>
    <Loader />
  </Center>
);

export { FullsizeLoader };
