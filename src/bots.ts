import type { AppBotname } from './app';

const BOTNAME_TO_OWNER_UID: Record<AppBotname, string> = {
  divebot: 'zRjxS4A4egRmzoHvSxM2C3jEE6W2',
  lashes: 'cZUDsOd2y9Naxaov87Z9IMZFvJP2',
  flea: 'cZUDsOd2y9Naxaov87Z9IMZFvJP2',
};

const AVAILBALE_BOTS: Record<AppBotname, AvailableBotItem> = {
  flea: {
    app: 'https://art-app-2020.web.app?botname=flea',
    bot: 'https://t.me/best_flea_market',
    appRoute: '/?botname=flea',
    colorPalette: 'pink',
  },
  divebot: {
    app: 'https://art-app-2020.web.app?botname=divebot',
    bot: 'https://t.me/best_diving_bot',
    appRoute: '/?botname=divebot',
    colorPalette: 'blue',
  },
  lashes: {
    app: 'https://art-app-2020.web.app?botname=lashes',
    bot: '',
    appRoute: '/?botname=lashes',
    colorPalette: 'pink',
  },
};

export { AVAILBALE_BOTS, BOTNAME_TO_OWNER_UID };
