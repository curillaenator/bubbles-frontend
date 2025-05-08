import type { AppBotname } from '@src/app';

interface ShareLinks {
  bot: string;
  web: string;
}
type ShareData = Record<AppBotname, ShareLinks>;

export type { ShareLinks, ShareData };
