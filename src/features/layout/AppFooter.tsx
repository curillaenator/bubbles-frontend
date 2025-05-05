import React from 'react';
import { useUnit } from 'effector-react';
// import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { Flex, Button, Image } from '@chakra-ui/react';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

import { getAssetUrl } from '@src/entities/asset';
import { $userStore, getUserData, type AppUserEditFields } from '@src/entities/user';
import { useAppContext } from '@src/providers/AppBotnameProvider';

import { COMMON_ASSET_QUERY, ME_QUERY } from '@src/configs/rtq.keys';
import { STATIC_PATHS } from '@src/configs/assets.config';

const AppFooter: React.FC = () => {
  const appCtx = useAppContext();
  const { uid } = useUnit($userStore);

  const { data: footerBackgroundURL } = useQuery({
    queryKey: [COMMON_ASSET_QUERY, 'footer-bg'],
    queryFn: () => getAssetUrl(`${appCtx.botname}/${STATIC_PATHS.footer}`),
    enabled: !!appCtx.botname,
  });

  const { data: footerData = null } = useQuery<AppUserEditFields | null>({
    queryKey: [ME_QUERY, uid],
    queryFn: getUserData.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  return (
    <Flex
      w='100%'
      h='72px'
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
      {!!footerBackgroundURL && (
        <Image
          src={footerBackgroundURL}
          w='100%'
          objectFit='cover'
          zIndex={-1}
          position='absolute'
          top='50%'
          transform='translateY(-50%)'
          left={0}
        />
      )}

      {footerData && (
        <Flex
          gap={6}
          h='full'
          alignItems='center'
          w='full'
          justifyContent={{ base: 'space-between', sm: 'flex-start' }}
        >
          {!!footerData.telegram && (
            <Button
              size={{ base: 'xs', sm: 'md' }}
              colorPalette='blue'
              border='1px solid'
              borderColor='white'
              onClick={() => {
                //@ts-expect-error
                window.Telegram?.WebApp?.openTelegramLink?.(`https://${footerData.telegram}`);
              }}
            >
              <FaTelegramPlane />
              Telegram
            </Button>
          )}

          {!!footerData.whatsapp && (
            <Button
              as='a'
              size={{ base: 'xs', sm: 'md' }}
              colorPalette='green'
              border='1px solid'
              borderColor='white'
              //@ts-expect-error
              href={`https://${footerData.whatsapp}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaWhatsapp />
              WhatsApp
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export { AppFooter };
