import './configs/i18n.config';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Provider as ChakraProvider } from './features/chakra/provider';
import { AppBotnameProvider } from './providers/AppBotnameProvider';

import { Layout } from './app';
import { Main, AuthPage, SharePage, EditMe, EditContent, ManageContent } from './pages';

import { ROOT_ROUTE, SHARE_ROUTE, AUTH_ROUTE, EDIT_ME_ROUTE, EDIT_UNIT_ROUTE, MANAGE_UNITS } from './routes';

import './index.css';

const appContainer = document.querySelector('#root[data-bubbles]') as Element;
const reactRoot = createRoot(appContainer);

const client = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROOT_ROUTE} element={<Layout />}>
      <Route index element={<Main />} />
      <Route path={AUTH_ROUTE} element={<AuthPage />} />
      <Route path={SHARE_ROUTE} element={<SharePage />} />
      <Route path={EDIT_ME_ROUTE} element={<EditMe />} />
      <Route path={EDIT_UNIT_ROUTE} element={<EditContent />} />
      <Route path={MANAGE_UNITS} element={<ManageContent />} />
    </Route>,
  ),
);

reactRoot.render(
  <QueryClientProvider client={client}>
    <ChakraProvider>
      <AppBotnameProvider>
        <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
      </AppBotnameProvider>
    </ChakraProvider>
  </QueryClientProvider>,
);
