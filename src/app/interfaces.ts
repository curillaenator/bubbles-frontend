type AppBotname = 'divebot' | 'lashes';

interface AppGlobalCTX {
  botname: AppBotname | null;
  chatId: string | null;
}

export type { AppBotname, AppGlobalCTX };
