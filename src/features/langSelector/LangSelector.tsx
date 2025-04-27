import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Portal, IconButton } from '@chakra-ui/react';

import { toPairs } from 'lodash';

import type { AppLanguage } from '@src/entities/i18n';

const LANG_ASSOC: Partial<Record<AppLanguage, { name: string; flags: string }>> = {
  en: { name: 'English', flags: '🇬🇧' }, //'🇺🇸 🇬🇧'
  ru: { name: 'Русский', flags: '🇷🇺' },
  fr: { name: 'Français', flags: '🇫🇷' },
  kz: { name: 'Қазақ', flags: '🇰🇿' },
  uz: { name: "O'zbek", flags: '🇺🇿' },
};

const LangSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState<AppLanguage>('ru');

  return (
    <Menu.Root
      positioning={{ placement: 'left-end' }}
      onSelect={(e: { value: AppLanguage }) => {
        i18n.changeLanguage(e.value);
        setSelected(e.value);
      }}
    >
      {/* @ts-expect-error */}
      <Menu.Trigger asChild>
        <IconButton variant='ghost' size='md'>
          {LANG_ASSOC[selected]?.flags}
        </IconButton>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {toPairs(LANG_ASSOC).map(([lang, { name, flags }]) => (
              // @ts-expect-error
              <Menu.Item key={`lang-selector-${lang}`} value={lang}>
                {name} <Menu.ItemCommand>{flags}</Menu.ItemCommand>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export { LangSelector };
