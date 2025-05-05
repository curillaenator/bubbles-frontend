import React from 'react';
import { useTranslation } from 'react-i18next';

import { useQuery } from '@tanstack/react-query';

import { Card, Stack, Image, SimpleGrid, GridItem, Heading, Text, Button, Center, Flex } from '@chakra-ui/react';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

import { useAppContext } from '@src/providers/AppBotnameProvider';

import { getUserData, getAvatarUrl, type AppUserEditFields } from '@src/entities/user';
import { Loader } from '@src/features/loader';

import { ME_QUERY, AVATAR_QUERY } from '@src/configs/rtq.keys';

const cap = (str: string) =>
  str
    .split('')
    .map((char, idx) => (idx === 0 ? char.toUpperCase() : char))
    .join('');

const appIntl = (name: string, lang: string) => `${name}${cap(lang)}` as keyof Omit<AppUserEditFields, 'photoURL'>;

const Me: React.FC = () => {
  const { i18n } = useTranslation();
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

  return (
    <Card.Root width='100%' variant='subtle'>
      <Card.Body gap='2'>
        <SimpleGrid columns={{ base: 1, sm: 3, md: 3, lg: 3 }} gap={6}>
          <GridItem
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            gap={6}
            colSpan={{ base: 1, sm: 2, md: 2, lg: 2 }}
          >
            <Stack gap={6}>
              <Stack>
                <Heading>{meData[appIntl('head', i18n.language)]}</Heading>

                <Text whiteSpace='pre-line' color='fg.info' fontSize={{ base: 14, sm: 16 }}>
                  {meData[appIntl('slogan', i18n.language)]}
                </Text>
              </Stack>

              <Stack>
                <Heading>{meData?.[appIntl('pricing', i18n.language)]}</Heading>

                <Text whiteSpace='pre-line' color='fg.muted' fontSize={{ base: 14, sm: 16 }}>
                  {meData[appIntl('body', i18n.language)]}
                </Text>
              </Stack>

              <Text whiteSpace='pre-line' fontSize={{ base: 14, sm: 16 }}>
                <b>{meData[appIntl('skills', i18n.language)]}</b>
              </Text>
            </Stack>

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
                  {meData.telegram}
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
                  {meData.whatsapp}
                </Button>
              )}
            </Flex>
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
