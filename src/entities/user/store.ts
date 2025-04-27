import { createStore, createEvent } from 'effector';

import type { AppUser } from './interfaces';

const setUid = createEvent<AppUser>();

const $userStore = createStore<AppUser>({
  uid: null,
});

$userStore.on(setUid, (_, u) => u);

export { $userStore, setUid };
