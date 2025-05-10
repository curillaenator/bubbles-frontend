type AppBotname = 'divebot' | 'lashes' | 'flea';

interface AppGlobalCTX {
  botname: AppBotname | null;
  chatId: string | null;
}

export type { AppBotname, AppGlobalCTX };
