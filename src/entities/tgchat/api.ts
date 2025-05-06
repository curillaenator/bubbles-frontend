import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { fsdb, auth } from '@src/configs/firebase.config';

import { BOTNAME_TO_OWNER_UID } from '@src/entities/user';
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

async function removeChat(this: AppGlobalCTX, chat: TgChatMeta) {
  if (!this.botname) return;

  return await deleteDoc(doc(fsdb, `${this.botname}chats`, `${chat.id}`))
    .then(() => ({ deletedChat: chat.id || null }))
    .catch(() => ({ deletedChat: null }));
}

interface SendAllChatsPayload {
  chats: TgChatMeta[];
  message: string;
}

async function sendToAllChats(this: AppGlobalCTX, payload: SendAllChatsPayload) {
  if (!this.botname) return;
  if (auth.currentUser?.uid !== BOTNAME_TO_OWNER_UID[this.botname]) return;

  return fetch(`${process.env.BOT_ENDPOINT}/bot-data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ actionType: 'send-to-all', payload }),
  })
    .then(() => ({ status: 'ok' }))
    .catch(() => ({ status: 'failed' }));
}

export { getChats, removeChat, sendToAllChats };
