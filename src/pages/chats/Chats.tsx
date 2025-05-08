import React, { useCallback, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { Card, Heading, Stack, Button, Flex, SimpleGrid, GridItem, Field, Textarea, Separator } from '@chakra-ui/react';
import { IoHomeOutline, IoRemoveOutline } from 'react-icons/io5';
import { FaTelegramPlane } from 'react-icons/fa';

import { useTranslation } from '@src/hooks/useTranslation';
import { useAppContext } from '@src/providers/AppBotnameProvider';

import { getChats, removeChat, sendToAllChats, type TgChatMeta } from '@src/entities/tgchat';

import { CHATS_QUERY } from '@src/configs/rtq.keys';
import { ROUTES } from '@src/routes';

const sortChats = (chats: TgChatMeta[]) => chats.toSorted(({ date: dA }, { date: dB }) => (dB || 0) - (dA || 0));

const ManageChats: React.FC = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const appCtx = useAppContext();
  const { t, curLanguage } = useTranslation();

  const { data: chats = [] } = useQuery({
    queryKey: [CHATS_QUERY],
    queryFn: getChats.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formatDate = useCallback(
    new Intl.DateTimeFormat(curLanguage === 'en' ? 'en-GB' : 'ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      minute: '2-digit',
      hour: '2-digit',
    }).format,
    [curLanguage],
  );

  const { mutate: removeSelectedChat, isPending: isRemovingUnit } = useMutation({
    mutationFn: removeChat.bind(appCtx),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [CHATS_QUERY] });
    },
  });

  const [message, setMessage] = useState<string>('');

  const { mutate: sendMessageToAllChats, isPending: isSendingMessageToAllChats } = useMutation({
    mutationFn: () => sendToAllChats.call(appCtx, { chats, message }),
    onSuccess: () => setMessage(''),
  });

  const isControlsDisabled = isRemovingUnit;

  if (!appCtx.botname) return <Navigate to={ROUTES.root} replace />;

  return (
    <Stack py={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden' gap={6}>
      <Heading>{t('app-nav-chats')}</Heading>

      <Stack>
        <Button
          variant='surface'
          w='100%'
          flex='auto'
          onClick={() => navigate(ROUTES.root)}
          disabled={isControlsDisabled}
        >
          <IoHomeOutline />
          {t('app-nav-main')}
        </Button>
      </Stack>

      <Separator />

      <Card.Root w='full' size={{ base: 'sm', sm: 'md' }}>
        <Card.Body gap='2' as='form'>
          <Field.Root invalid={false}>
            <Field.Label>
              <Heading>{t('chats-send-all-chats-title')}</Heading>
            </Field.Label>

            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant='outline'
              placeholder={t('chats-send-all-chats-title')}
              rows={8}
            />

            <Field.ErrorText></Field.ErrorText>
          </Field.Root>

          <Button
            disabled={!message.length || isControlsDisabled}
            loading={isSendingMessageToAllChats}
            colorPalette='blue'
            w='100%'
            flex='auto'
            onClick={() => sendMessageToAllChats()}
          >
            <FaTelegramPlane />
            {t('chats-send-all-chats')}
          </Button>
        </Card.Body>
      </Card.Root>

      <Separator />

      <Heading>{t('chats-list')}</Heading>

      <Flex gap={{ base: 2, sm: 6 }} flexWrap='wrap'>
        {sortChats(chats).map((ch) => (
          <Card.Root
            key={ch.id}
            size={{ base: 'sm', sm: 'md' }}
            w={{ base: 'full', sm: 'calc(100% / 2 - 12px)', md: 'calc(100% / 3 - 48px / 3)' }}
          >
            <Card.Body gap='2'>
              <SimpleGrid columns={5}>
                <GridItem colSpan={4}>
                  <Stack gap={2}>
                    <Card.Title>{`@${ch.username}`}</Card.Title>

                    <Card.Description>{t('chats-user-started-bot-at')}</Card.Description>
                    <Card.Description>{formatDate(new Date(ch.date * 1000))}</Card.Description>
                  </Stack>
                </GridItem>

                <GridItem
                  display='flex'
                  alignItems='center'
                  flexDir='column'
                  justifyContent='center'
                  gap={{ base: 2, sm: 6 }}
                >
                  <Button
                    disabled={isControlsDisabled}
                    w='full'
                    colorPalette='blue'
                    onClick={() => {
                      //@ts-expect-error
                      window.Telegram?.WebApp?.openTelegramLink?.(`https://t.me/${ch.username}`);
                    }}
                  >
                    <FaTelegramPlane />
                  </Button>

                  <Button
                    disabled={isControlsDisabled}
                    loading={isRemovingUnit}
                    w='full'
                    variant='surface'
                    colorPalette='red'
                    onClick={() => {
                      if (confirm('Are you sure to delete chat from history?')) {
                        removeSelectedChat(ch);
                      }
                    }}
                  >
                    <IoRemoveOutline />
                  </Button>
                </GridItem>
              </SimpleGrid>
            </Card.Body>
          </Card.Root>
        ))}
      </Flex>
    </Stack>
  );
};

export const Component = ManageChats;
