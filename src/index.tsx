import './configs/firebase.config';
import './configs/i18n.config';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AppContextProvider, FirebaseAuthProvider, QueryClientProvider } from './providers';
// TODO: resolve chakra autogenerated features paths
import { Provider as ChakraProvider } from './features/chakra/provider';

import { appRouter } from './app';
import { FullsizeLoader } from './features/loader';
import './index.css';

const appContainer = document.querySelector('#root[data-bubbles]') as Element;
const reactRoot = createRoot(appContainer);

reactRoot.render(
  <ChakraProvider>
    <QueryClientProvider>
      <AppContextProvider>
        <FirebaseAuthProvider>
          <RouterProvider router={appRouter} fallbackElement={<FullsizeLoader />} />
        </FirebaseAuthProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </ChakraProvider>,
);
