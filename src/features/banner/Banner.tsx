import React from 'react';

import { Flex, Button, Stack, Heading, Text } from '@chakra-ui/react';

const Banner = () => {
  return (
    <Stack
      bg='whiteAlpha.700'
      my={6}
      background='no-repeat url("./assets/divers2.jpg")'
      backgroundPosition='center'
      backgroundSize='cover'
      borderRadius={6}
      px={6}
      py={{ base: 12, sm: 12, md: 24, lg: 32 }}
      gap={6}
      border='1px solid'
      borderColor='border'
    >
      <Heading size='2xl' color='white'>
        Become a dive professional
      </Heading>

      <Text color='white'>
        Learn how to lead dives, assist with classes and be the diver everyone looks up to. Start your scuba career with
        Divemaster eLearning.
      </Text>

      <Flex pt={12}>
        <Button
          size='xl'
          variant='solid'
          //   colorPalette='blue'
          //   color='white'
          border='1px solid'
          borderColor='white'
        >
          Ready to dive
        </Button>
      </Flex>
    </Stack>
  );
};

export { Banner };
