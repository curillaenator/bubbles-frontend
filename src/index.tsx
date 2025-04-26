import './configs/i18n.config';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { Provider as ChakraProvider } from './features/chakra/provider';

import { Layout } from './app';
import { Main } from './pages';

import { ROOT_ROUTE } from './routes';

import './index.css';

const appContainer = document.querySelector('#root[data-bubbles]') as Element;
const reactRoot = createRoot(appContainer);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROOT_ROUTE} element={<Layout />}>
      <Route index element={<Main />} />
    </Route>,
  ),
);

reactRoot.render(
  <ChakraProvider>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </ChakraProvider>,
);
