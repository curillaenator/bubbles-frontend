import { collection, getDocs } from 'firebase/firestore';

import { fsdb } from '@src/configs/firebase.config';

import type { AppGlobalCTX } from '@src/app';
import type { TgChatMeta } from './interfaces';

async function getChats(this: AppGlobalCTX) {
  if (!this.botname) return [];

  const loadedChats: TgChatMeta[] = [];
  const snapshot = await getDocs(collection(fsdb, `${this.botname}chats`));

  snapshot.forEach((snap) => {
    if (snap.exists()) loadedChats.push({ ...(snap.data() as TgChatMeta), id: +snap.id });
  });

  return loadedChats;
}

export { getChats };
