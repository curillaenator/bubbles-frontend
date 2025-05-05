import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// import { useQueryClient } from '@tanstack/react-query';

import { Card, Heading, Stack, HStack, Button, Flex } from '@chakra-ui/react';
import { IoCreate, IoHomeOutline } from 'react-icons/io5';
import { FaTelegramPlane } from 'react-icons/fa';

import { useTranslation } from '@src/hooks/useTranslation';
import { useAppContext } from '@src/providers/AppBotnameProvider';
import { getChats, type TgChatMeta } from '@src/entities/tgchat';
import { CHATS_QUERY } from '@src/configs/rtq.keys';
import { ROOT_ROUTE } from '@src/routes';

const sortChats = (chats: TgChatMeta[]) => chats.toSorted(({ date: dA }, { date: dB }) => (dA || 0) - (dB || 0));

const ManageChats: React.FC = () => {
  const navigate = useNavigate();
  // const qc = useQueryClient();
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
    }).format,
    [curLanguage],
  );

  // const { mutate: removeSelectedUnit, isPending: isRemovingUnit } = useMutation({
  //   mutationFn: removeUnit.bind(appCtx),

  //   onSuccess: () => {
  //     qc.invalidateQueries({ queryKey: [UNITS_QUERY] });
  //   },
  // });

  return (
    <Stack py={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden' gap={6}>
      <Heading>{t('app-nav-chats')}</Heading>

      <HStack gap={{ base: 2, sm: 6 }}>
        <Button
          colorPalette='blue'
          w='100%'
          flex='auto'
          // onClick={() => navigate('/unit')}
          // loading={isControlsDisabled}
        >
          <IoCreate />
          {t('chats-send-all-chats')}
        </Button>

        <Button
          variant='surface'
          w='100%'
          flex='auto'
          onClick={() => navigate(ROOT_ROUTE)}
          // disabled={isControlsDisabled}
        >
          <IoHomeOutline />
          {t('app-nav-main')}
        </Button>
      </HStack>

      <Flex gap={{ base: 2, sm: 6 }} flexWrap='wrap'>
        {sortChats(chats).map((ch) => (
          <Card.Root key={ch.id} w={{ base: 'full', sm: 'calc(100% / 2 - 12px)', md: 'calc(100% / 3 - 48px / 3)' }}>
            <Card.Header>
              <Card.Title mt='2'>{ch.username}</Card.Title>
            </Card.Header>

            <Card.Body gap='2'>
              <Card.Description>{t('chats-user-started-bot-at')}</Card.Description>
              <Card.Description>{formatDate(new Date(ch.date * 1000))}</Card.Description>
            </Card.Body>

            <Card.Footer justifyContent='flex-start'>
              <Button
                colorPalette='blue'
                onClick={() => {
                  //@ts-expect-error
                  window.Telegram?.WebApp?.openTelegramLink?.(`https://t.me/${ch.username}`);
                }}
              >
                <FaTelegramPlane /> Telegram
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </Flex>
    </Stack>
  );
};

export { ManageChats };
