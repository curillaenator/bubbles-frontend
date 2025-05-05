import { createStore, createEvent } from 'effector';

import type { TgChatMeta } from './interfaces';

const setgChatMeta = createEvent<TgChatMeta | null>();
const $tgChatStore = createStore<TgChatMeta | null>(null);

$tgChatStore.on(setgChatMeta, (_, chatmeta) => chatmeta);

export { $tgChatStore, setgChatMeta };
