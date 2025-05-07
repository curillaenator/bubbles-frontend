import React, { useCallback } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { AppUserEditFields, AppUserBullet } from '@src/entities/user';
import { useTranslation } from '@src/hooks/useTranslation';
import { v4 as getId } from 'uuid';

import { Card, Heading, Select, Button, Stack, Field, Textarea, Portal, Flex } from '@chakra-ui/react';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';

import { EMOJI_LIST } from './emojies';

interface EditBulletsProps {
  bullets: AppUserEditFields['bullets'];
  disabled?: boolean;
  setFormValue: UseFormSetValue<AppUserEditFields>;
}

const EditBullets: React.FC<EditBulletsProps> = (props) => {
  const { disabled, setFormValue, bullets = [] } = props;
  const { t } = useTranslation();

  const updateBullets = useCallback(
    (bulletIdx: number, payload: Partial<AppUserBullet>) => {
      const updatedBullets = [...bullets];
      updatedBullets.splice(bulletIdx, 1, { ...bullets[bulletIdx], ...payload });
      setFormValue('bullets', updatedBullets);
    },
    [bullets, setFormValue],
  );

  const addBullet = useCallback(
    (newBullet: AppUserBullet) => {
      setFormValue('bullets', [...bullets, newBullet]);
    },
    [bullets, setFormValue],
  );

  const removeBullet = useCallback(
    (bulletIdx: number) => {
      const updatedBullets = [...bullets];
      updatedBullets.splice(bulletIdx, 1);
      setFormValue('bullets', updatedBullets);
    },
    [bullets, setFormValue],
  );

  return (
    <Stack gap={{ base: 2, sm: 6 }} p={{ base: 2, sm: 6 }} borderRadius={6} bg='bg'>
      <Heading>{t('bullets-title')}</Heading>

      {bullets.map(({ id, en, ru, emoji }, bulletIdx) => (
        <Card.Root variant='subtle' key={id} size='sm'>
          <Card.Body gap={2} p={{ base: 2, sm: 6 }}>
            <Flex gap={2}>
              <Select.Root
                flex='none'
                collection={EMOJI_LIST}
                width='40px'
                value={[emoji]}
                onValueChange={(e: { value: string[] }) => updateBullets(bulletIdx, { emoji: e.value[0] })}
                positioning={{ placement: 'bottom-start', flip: true }}
              >
                <Select.HiddenSelect />

                <Select.Control>
                  {/* @ts-expect-error */}
                  <Select.Trigger
                    px={2}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    cursor='pointer'
                    bg='bg'
                  >
                    <Select.ValueText>{emoji}</Select.ValueText>
                  </Select.Trigger>
                </Select.Control>

                <Portal>
                  <Select.Positioner>
                    {/* @ts-expect-error */}
                    <Select.Content flexDir='row' maxW='220px' flexWrap='wrap'>
                      {/* @ts-expect-error */}
                      {EMOJI_LIST.items.map((item) => (
                        // @ts-expect-error
                        <Select.Item maxW='40px' key={item.value} item={item}>
                          {item.value}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>

              <Stack gap={2} flex='auto' w='full'>
                <Field.Root invalid={false}>
                  <Textarea
                    disabled={disabled}
                    value={en}
                    onChange={(e) => updateBullets(bulletIdx, { en: e.target.value })}
                    variant='outline'
                    placeholder='en'
                    rows={3}
                    autoComplete='off'
                    bg='bg'
                  />
                </Field.Root>

                <Field.Root invalid={false}>
                  <Textarea
                    disabled={disabled}
                    value={ru}
                    onChange={(e) => updateBullets(bulletIdx, { ru: e.target.value })}
                    variant='outline'
                    placeholder='ru'
                    rows={3}
                    autoComplete='off'
                    bg='bg'
                  />
                </Field.Root>
              </Stack>
            </Flex>

            <Button size='sm' variant='surface' colorPalette='red' onClick={() => removeBullet(bulletIdx)}>
              <IoRemoveOutline /> {t('bullets-remove')}
            </Button>
          </Card.Body>
        </Card.Root>
      ))}

      <Button variant='surface' onClick={() => addBullet({ id: getId(), en: '', ru: '', emoji: '😇' })}>
        <IoAddOutline /> {t('bullets-add')}
      </Button>
    </Stack>
  );
};

export { EditBullets };
