import type { TranslationsMap } from './interfaces';

const APP_NAVIGATION: TranslationsMap = {
  'app-nav-auth': {
    en: 'Login',
    ru: 'Войти',
  },
  'app-nav-main': {
    en: 'Main page',
    ru: 'Главная',
  },
  'app-nav-share': {
    en: 'Share app',
    ru: 'Поделиться приложением',
  },
  'app-nav-gallery': {
    en: 'Photo gallery',
    ru: 'Фотогаллерея',
  },
};

const APP_BANNER: TranslationsMap = {
  'banner-title': {
    en: 'Become a dive professional',
    ru: 'Become a dive professional',
  },

  'banner-slogan': {
    en: 'Learn how to lead dives, assist with classes and be the diver everyone looks up to. Start your scuba career with Divemaster eLearning.',
    ru: 'Научитесь проводить погружения, помогать с занятиями и быть тем дайвером, на которого все равняются. Начните свою карьеру дайвера с помощью электронного обучения Divemaster.',
  },
};

const translations: TranslationsMap = {
  'app-title': {
    en: 'NhaTrang Diving',
    ru: 'NhaTrang Diving',
  },

  'app-banner-button': {
    en: 'Ready to dive',
    ru: 'Я хочу погрузиться',
  },

  'app-footer-button': {
    en: 'Dive in',
    ru: 'Записаться',
  },

  ...APP_NAVIGATION,

  ...APP_BANNER,
};

export { translations };
