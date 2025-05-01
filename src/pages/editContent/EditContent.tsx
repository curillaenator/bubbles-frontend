import React from 'react';
import { Stack } from '@chakra-ui/react';

import { UnitForm } from '@src/features/unitForm';

const EditContent: React.FC = () => (
  <Stack py={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden' gap={6}>
    <UnitForm />
  </Stack>
);

export { EditContent };
