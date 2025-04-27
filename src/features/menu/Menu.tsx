import React from 'react';
import { Stack, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  TbLogin2,
  TbHome2,
  TbShare2,
  // TbPhoto
} from 'react-icons/tb';

import { ColorModeButton } from '@src/features/chakra/color-mode';

import { NavButton } from './NavButton';

import {
  ROOT_ROUTE,
  SHARE_ROUTE,
  AUTH_ROUTE,
  // GALLERY_ROUTE
} from '@src/routes';

interface MenuProps {
  toggleDrawer: (value: React.SetStateAction<boolean>) => void;
}

const MENU_ITEMS = [
  { to: ROOT_ROUTE, captionId: 'app-nav-main', Icon: TbHome2 },
  // { to: GALLERY_ROUTE, captionId: 'app-nav-gallery', Icon: TbPhoto },
  { to: SHARE_ROUTE, captionId: 'app-nav-share', Icon: TbShare2 },
] as const;

const Menu: React.FC<MenuProps> = ({ toggleDrawer }) => {
  const { t } = useTranslation();

  return (
    <Stack w='100' h='100%' flex='1 1 auto' justifyContent='space-between'>
      <Stack flex='1 1 auto' gap={{ base: 1, sm: 1, md: 2, lg: 3 }}>
        {MENU_ITEMS.map(({ to, captionId, Icon }) => (
          <NavButton key={`menu-item-${captionId}`} to={to} onClick={() => toggleDrawer(false)}>
            <Icon />
            {t(captionId)}
          </NavButton>
        ))}
      </Stack>

      <Flex
        w='100%'
        gap={4}
        css={{
          '& > a': {
            width: '100%',
          },
        }}
      >
        <NavButton
          to={AUTH_ROUTE}
          color='fg.muted'
          onClick={() => toggleDrawer(false)}
          w='100%'
          justifyContent='flex-start'
          disabled
        >
          <TbLogin2 />
          {t('app-nav-auth')}
        </NavButton>

        <ColorModeButton size='md' variant='surface' flex='0 0 auto' />
      </Flex>
    </Stack>
  );
};

export { Menu };
