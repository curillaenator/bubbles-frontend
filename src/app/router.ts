import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './Layout';
import { ROUTES } from '../routes';

const appRouter = createBrowserRouter([
  {
    path: ROUTES.root,
    Component: Layout,
    children: [
      {
        index: true,
        lazy: {
          Component: async () => (await import('../pages/main/Main')).Component,
        },
      },
      {
        path: ROUTES.auth,
        lazy: {
          Component: async () => (await import('../pages/auth/Auth')).Component,
        },
      },
      {
        path: ROUTES.share,
        lazy: {
          Component: async () => (await import('../pages/share/Share')).Component,
        },
      },
      {
        path: ROUTES.editme,
        lazy: {
          Component: async () => (await import('../pages/editMe/EditMe')).Component,
        },
      },
      {
        path: ROUTES.unit,
        lazy: {
          Component: async () => (await import('../pages/editContent/EditContent')).Component,
        },
      },
      {
        path: ROUTES.units,
        lazy: {
          Component: async () => (await import('../pages/manageContent/ManageContent')).Component,
        },
      },
      {
        path: ROUTES.chats,
        lazy: {
          Component: async () => (await import('../pages/chats/Chats')).Component,
        },
      },
    ],
  },
]);

export { appRouter };
