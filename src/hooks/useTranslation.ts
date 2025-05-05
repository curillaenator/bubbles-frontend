import { useTranslation as useI18 } from 'react-i18next';

const useTranslation = () => {
  const i18n = useI18();
  return { ...i18n, curLanguage: i18n.i18n.language.split('-')[0] };
};

export { useTranslation };
