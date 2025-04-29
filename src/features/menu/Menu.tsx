import React from 'react';
import { useUnit } from 'effector-react';
import { Stack, Flex, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { TbLogin2, TbLogout2, TbHome2, TbShare2, TbSettings } from 'react-icons/tb';

import { ColorModeButton } from '@src/features/chakra/color-mode';
import { $userStore, logoutUser } from '@src/entities/user';

import { NavButton } from './NavButton';

import { ROOT_ROUTE, SHARE_ROUTE, AUTH_ROUTE, EDIT_ME_ROUTE, EDIT_CONTENT_ROUTE } from '@src/routes';

interface MenuProps {
  toggleDrawer: (value: React.SetStateAction<boolean>) => void;
}

const MENU_ITEMS = [
  { to: ROOT_ROUTE, captionId: 'app-nav-main', Icon: TbHome2 },
  { to: SHARE_ROUTE, captionId: 'app-nav-share', Icon: TbShare2 },
] as const;

const SETTINGS_ITEMS = [
  { to: EDIT_ME_ROUTE, captionId: 'app-nav-edit-me', Icon: TbSettings },
  { to: EDIT_CONTENT_ROUTE, captionId: 'app-nav-edit-content', Icon: TbSettings },
] as const;

const Menu: React.FC<MenuProps> = ({ toggleDrawer }) => {
  const { t } = useTranslation();
  const { uid } = useUnit($userStore);

  return (
    <Stack w='100' h='100%' flex='1 1 auto' justifyContent='space-between'>
      <Stack flex='1 1 auto' gap={12}>
        <Stack gap={{ base: 1, sm: 1, md: 2, lg: 3 }}>
          {MENU_ITEMS.map(({ to, captionId, Icon }) => (
            <NavButton key={`menu-item-${captionId}`} to={to} onClick={() => toggleDrawer(false)}>
              <Icon />
              {t(captionId)}
            </NavButton>
          ))}
        </Stack>

        {!!uid && (
          <Stack gap={{ base: 1, sm: 1, md: 2, lg: 3 }}>
            {SETTINGS_ITEMS.map(({ to, captionId, Icon }) => (
              <NavButton key={`menu-item-${captionId}`} to={to} onClick={() => toggleDrawer(false)}>
                <Icon />
                {t(captionId)}
              </NavButton>
            ))}
          </Stack>
        )}
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
        {uid ? (
          <Button variant='surface' w='full' flex='1 1 auto' onClick={() => logoutUser()} justifyContent='flex-start'>
            <TbLogout2 />
            {t('app-nav-logout')}
          </Button>
        ) : (
          <NavButton to={AUTH_ROUTE} color='fg.muted' onClick={() => toggleDrawer(false)} w='100%'>
            <TbLogin2 />
            {t('app-nav-auth')}
          </NavButton>
        )}

        <ColorModeButton size='md' variant='surface' flex='0 0 auto' />
      </Flex>
    </Stack>
  );
};

export { Menu };
