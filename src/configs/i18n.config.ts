import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    detection: {
      order: ['localStorage', 'navigator'], // в каком порядке искать язык
      caches: ['localStorage'], // где сохранять выбранный язык
    },
    supportedLngs: ['en', 'ru'],
    nonExplicitSupportedLngs: true,
  });

export default i18n;
