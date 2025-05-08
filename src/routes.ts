type PathParams = {
  [ROUTES.unit]: {
    unitId?: string;
  };
};

const ROUTES = {
  root: '/',
  auth: '/auth',
  share: '/share',
  editme: '/editme',
  chats: '/chats',

  units: '/units',
  unit: '/unit/:unitId?', // /unit - create new unit , /unit/unitId - edit existing unit
} as const;

export { ROUTES, type PathParams };
