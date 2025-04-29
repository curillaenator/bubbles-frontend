import React from 'react';
// import { Link } from 'react-router-dom';
// import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { Flex, Button, Stack, Heading, Text } from '@chakra-ui/react';
// import { MdEdit } from 'react-icons/md';

// import { $userStore } from '@src/entities/user';

// import { BannerForm } from './EditBanner';
import { Logo } from '../logo';

const TEXT_SHADOW =
  'drop-shadow(0 0 4px var(--chakra-colors-black-alpha-950)) drop-shadow(0 0 12px var(--chakra-colors-black-alpha-950))';

const Banner: React.FC = () => {
  // const { uid } = useUnit($userStore);
  const { t } = useTranslation();

  // const [isEdit, seIsEdit] = useState<boolean>(false);

  return (
    <Stack
      bg='whiteAlpha.700'
      background='no-repeat url("./assets/banner.jpg")'
      backgroundPosition='center'
      backgroundSize='cover'
      borderRadius={6}
      px={{ base: 6, sm: 6, md: 8, lg: 12 }}
      py={{ base: 6, sm: 6, md: 16, lg: 32 }}
      gap={6}
      border='1px solid'
      borderColor='border'
      position='relative'
    >
      {false ? (
        // <BannerForm close={() => seIsEdit(false)} />
        <></>
      ) : (
        <>
          <Heading size={{ base: '2xl', sm: '2xl', md: '3xl', lg: '5xl' }} color='white' filter={TEXT_SHADOW}>
            {t('banner-title')}
          </Heading>

          <Text color='white' fontWeight='bold' fontSize={{ base: 14, sm: 16 }} filter={TEXT_SHADOW}>
            {t('banner-slogan')}
          </Text>

          <Flex pt={6}>
            <Button
              size='xl'
              variant='solid'
              colorPalette='blue'
              border='1px solid'
              borderColor='white'
              fontWeight='extrabold'
              onClick={() => {
                //@ts-expect-error
                window.Telegram?.WebApp?.openTelegramLink?.('https://t.me/Viktorrrkarp');
              }}
            >
              <Logo size={24} />
              {t('banner-button')}
            </Button>
          </Flex>

          {/* {!!true && (
            <IconButton
              variant='surface'
              position='absolute'
              colorPalette='white'
              top='4'
              right='4'
              onClick={() => seIsEdit((prev) => !prev)}
            >
              <MdEdit />
            </IconButton>
          )} */}
        </>
      )}
    </Stack>
  );
};

export { Banner };
