import React from 'react';

import { Menu, Portal, IconButton } from '@chakra-ui/react';
import { useTranslation } from '@src/hooks/useTranslation';

import { toPairs } from 'lodash';

type AppLanguage = 'en' | 'ru'; // | 'fr' | 'kz' | 'uz';

const LANG_ASSOC: Record<AppLanguage, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' }, //'🇺🇸 🇬🇧'
  ru: { name: 'Русский', flag: '🇷🇺' },
  // fr: { name: 'Français', flag: '🇫🇷' },
  // kz: { name: 'Қазақ', flag: '🇰🇿' },
  // uz: { name: "O'zbek", flag: '🇺🇿' },
};

const LangSelector: React.FC = () => {
  const { curLanguage, i18n } = useTranslation();

  return (
    <Menu.Root
      positioning={{ placement: 'left-end' }}
      onSelect={(e: { value: AppLanguage }) => {
        i18n.changeLanguage(e.value);
      }}
    >
      {/* @ts-expect-error */}
      <Menu.Trigger asChild>
        <IconButton variant='ghost' size='md'>
          {LANG_ASSOC[curLanguage as AppLanguage]?.flag || '🇬🇧'}
        </IconButton>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {toPairs(LANG_ASSOC).map(([lang, { name, flag }]) => (
              // @ts-expect-error
              <Menu.Item key={`lang-selector-${lang}`} value={lang}>
                {name} <Menu.ItemCommand>{flag}</Menu.ItemCommand>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export { LangSelector };
