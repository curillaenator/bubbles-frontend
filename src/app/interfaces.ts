type AppBotname = 'divebot' | 'lashes';

interface AppGlobalCTX {
  botname: AppBotname | null;
}

export type { AppBotname, AppGlobalCTX };
