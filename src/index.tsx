import './configs/i18n.config';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Provider as ChakraProvider } from './features/chakra/provider';
import { AppBotnameProvider } from './providers/AppBotnameProvider';

import { Layout } from './app';

import { ROUTES } from './routes';

import './index.css';

const appContainer = document.querySelector('#root[data-bubbles]') as Element;
const reactRoot = createRoot(appContainer);

const client = new QueryClient();

const appRouter = createBrowserRouter([
  {
    path: ROUTES.root,
    Component: Layout,
    children: [
      {
        index: true,
        lazy: {
          Component: async () => (await import('./pages/main/Main')).Component,
        },
      },
      {
        path: ROUTES.auth,
        lazy: {
          Component: async () => (await import('./pages/auth/Auth')).Component,
        },
      },
      {
        path: ROUTES.share,
        lazy: {
          Component: async () => (await import('./pages/share/Share')).Component,
        },
      },
      {
        path: ROUTES.editme,
        lazy: {
          Component: async () => (await import('./pages/editMe/EditMe')).Component,
        },
      },
      {
        path: ROUTES.unit,
        lazy: {
          Component: async () => (await import('./pages/editContent/EditContent')).Component,
        },
      },
      {
        path: ROUTES.units,
        lazy: {
          Component: async () => (await import('./pages/manageContent/ManageContent')).Component,
        },
      },
      {
        path: ROUTES.chats,
        lazy: {
          Component: async () => (await import('./pages/chats/Chats')).Component,
        },
      },
    ],
  },
]);

reactRoot.render(
  <QueryClientProvider client={client}>
    <ChakraProvider>
      <AppBotnameProvider>
        <RouterProvider router={appRouter} fallbackElement={<div>Loading...</div>} />
      </AppBotnameProvider>
    </ChakraProvider>
  </QueryClientProvider>,
);
