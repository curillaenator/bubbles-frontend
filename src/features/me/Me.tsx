import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

import { Card, Stack, Image, SimpleGrid, GridItem, Heading, Text, Button, Center, Flex } from '@chakra-ui/react';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

import { useTranslation } from '@src/hooks/useTranslation';
import { useAppContext } from '@src/providers/AppBotnameProvider';

import type { AppBotname } from '@src/app';
import { getUserData, getAvatarUrl, updateMyChatId, type AppUserEditFields } from '@src/entities/user';
import { Loader } from '@src/features/loader';

import { ME_QUERY, AVATAR_QUERY } from '@src/configs/rtq.keys';

const displayContactButton = (botname: AppBotname | null) => !!botname && !['flea'].includes(botname);

const cap = (str: string) =>
  str
    .split('')
    .map((char, idx) => (idx === 0 ? char.toUpperCase() : char))
    .join('');

const getFieldKey = (name: string, lang: string) =>
  `${name}${cap(lang)}` as keyof Omit<AppUserEditFields, 'photoURL' | 'bullets'>;

const Me: React.FC = () => {
  const { curLanguage } = useTranslation();
  const appCtx = useAppContext();

  const { data: meData = null, isLoading } = useQuery({
    queryKey: [ME_QUERY],
    queryFn: getUserData.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  const { data: avatarSrc, isLoading: isAvatarLoading } = useQuery({
    queryKey: [AVATAR_QUERY],
    queryFn: getAvatarUrl.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  const { mutate: setMyChatId } = useMutation({ mutationFn: updateMyChatId.bind(appCtx) });
  useEffect(setMyChatId, [setMyChatId]);

  if (isLoading || isAvatarLoading) {
    return (
      <Card.Root w='full'>
        <Card.Body gap='2' p={0}>
          <Center w='full' h='480px'>
            <Loader />
          </Center>
        </Card.Body>
      </Card.Root>
    );
  }

  if (!meData) return null;

  const displayContacts = displayContactButton(appCtx.botname);

  return (
    <Card.Root width='100%' variant='subtle'>
      <Card.Body gap='2' position='relative'>
        <SimpleGrid columns={{ base: 1, sm: 3, md: 3, lg: 3 }} gap={6} zIndex={1}>
          <GridItem
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            gap={6}
            colSpan={{ base: 1, sm: 2, md: 2, lg: 2 }}
          >
            <Stack gap={6}>
              <Heading>{meData[getFieldKey('head', curLanguage)]}</Heading>

              <Heading>{meData?.[getFieldKey('pricing', curLanguage)]}</Heading>

              <Text whiteSpace='pre-line' color='fg.muted' fontSize={{ base: 14, sm: 16 }}>
                {meData[getFieldKey('body', curLanguage)]}
              </Text>
            </Stack>

            {!!displayContacts && (
              <Flex gap={6} flexWrap='wrap'>
                {!!meData.telegram && (
                  <Button
                    size='xl'
                    colorPalette='blue'
                    border='1px solid'
                    borderColor='white'
                    onClick={() => {
                      //@ts-expect-error
                      window.Telegram?.WebApp?.openTelegramLink?.(`https://${meData.telegram}`);
                    }}
                  >
                    <FaTelegramPlane />
                    Telegram
                  </Button>
                )}

                {!!meData.whatsapp && (
                  <Button
                    as='a'
                    size='xl'
                    colorPalette='green'
                    border='1px solid'
                    borderColor='white'
                    //@ts-expect-error
                    href={`https://${meData.whatsapp}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </Button>
                )}
              </Flex>
            )}
          </GridItem>

          <GridItem>
            {!!avatarSrc && <Image src={avatarSrc} alt='Avatar' w='100%' h='100%' objectFit='cover' borderRadius={6} />}
          </GridItem>
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
};

export { Me };
