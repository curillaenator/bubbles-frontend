import type { AppBotname } from '@src/app';

const STATIC_PATHS = {
  avatar: 'profile/avatar.webp',
  header: 'common/header.webp',
  footer: 'common/footer.webp',
  banner: 'common/banner.webp',
  videoCover: 'common/video_default.avif',
} as const;

interface AvailableBotItem {
  app: string;
  bot: string;
  appRoute: string;
  colorPalette: string;
}

const AVAILBALE_BOTS: Record<AppBotname, AvailableBotItem> = {
  divebot: {
    app: 'https://art-app-2020.web.app?botname=divebot',
    bot: 'https://t.me/best_diving_bot',
    appRoute: '/?botname=divebot',
    colorPalette: 'blue',
  },
  lashes: {
    app: 'https://art-app-2020.web.app?botname=lashes',
    bot: 'https://t.me/best_lashes_bot',
    appRoute: '/?botname=lashes',
    colorPalette: 'pink',
  },
};

export { STATIC_PATHS, AVAILBALE_BOTS };
