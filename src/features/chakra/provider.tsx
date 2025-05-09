'use client';

import React from 'react';
import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: '960px',
      md: '1440px',
      lg: '1920px',
      xl: '2560px',
      '2xl': '2560px',
    },

    tokens: {
      fonts: {
        heading: { value: '"Tektur", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }, // -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
        body: {
          value:
            '-apple-system, BlinkMacSystemFont, Nunito Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
        mono: {
          value:
            '-apple-system, BlinkMacSystemFont, Nunito Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}

export { Provider };
