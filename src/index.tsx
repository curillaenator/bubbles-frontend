import './configs/i18n.config';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { Provider as ChakraProvider } from './features/chakra/provider';

import { Layout } from './app';
import { Main, AuthPage, SharePage, GalleryPage } from './pages';

import { ROOT_ROUTE, SHARE_ROUTE, AUTH_ROUTE, GALLERY_ROUTE } from './routes';

import './index.css';

const appContainer = document.querySelector('#root[data-bubbles]') as Element;
const reactRoot = createRoot(appContainer);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROOT_ROUTE} element={<Layout />}>
      <Route index element={<Main />} />
      <Route path={AUTH_ROUTE} element={<AuthPage />} />
      <Route path={SHARE_ROUTE} element={<SharePage />} />
      <Route path={GALLERY_ROUTE} element={<GalleryPage />} />
    </Route>,
  ),
);

reactRoot.render(
  <ChakraProvider>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </ChakraProvider>,
);
