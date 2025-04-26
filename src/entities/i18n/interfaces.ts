interface Translation {
  en: string;
  ru: string;
  kz?: string;
  fr?: string;
  uz?: string;
}

type AppLanguage = keyof Translation;

interface TranslationsMap {
  [k: string]: Translation;
}

type DictionaryI18N = Partial<Record<AppLanguage, { translation: Record<string, string> }>>;

export type { Translation, TranslationsMap, AppLanguage, DictionaryI18N };
