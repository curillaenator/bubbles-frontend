import React from 'react';

import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { Flex, Button, Image } from '@chakra-ui/react';
import { FaTelegramPlane } from 'react-icons/fa';

import { getImageUrl } from '@src/entities/asset';
import { useAppContext } from '@src/providers/AppBotnameProvider';

import { COMMON_ASSET_QUERY } from '@src/configs/rtq.keys';
import { STATIC_PATHS } from '@src/configs/assets.config';

const AppFooter: React.FC = () => {
  const { t } = useTranslation();
  const appCtx = useAppContext();

  const { data: footerBackgroundURL } = useQuery({
    queryKey: [COMMON_ASSET_QUERY, 'footer-bg'],
    queryFn: () => getImageUrl(`${appCtx.botname}/${STATIC_PATHS.footer}`),
    enabled: !!appCtx.botname,
  });

  return (
    <Flex
      w='100%'
      h={{ base: '72px', sm: '96px' }}
      data-app-footer
      p={4}
      flex='0 0 auto'
      alignItems='flex-end'
      as='footer'
      position='relative'
      overflow='hidden'
      borderTop='1px solid'
      borderColor='border'
    >
      <Image
        src={footerBackgroundURL}
        w='100%'
        objectFit='cover'
        transform='translateY(-42%)'
        zIndex={-1}
        position='absolute'
        top={0}
        left={0}
      />

      <Button
        size='md'
        colorPalette='blue'
        border='1px solid'
        borderColor='white'
        onClick={() => {
          //@ts-expect-error
          window.Telegram?.WebApp?.openTelegramLink?.('https://t.me/Viktorrrkarp');
        }}
      >
        <FaTelegramPlane />
        {t('app-footer-button')}
      </Button>
    </Flex>
  );
};

export { AppFooter };
