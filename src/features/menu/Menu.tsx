import React from 'react';
import { useUnit } from 'effector-react';
import { Stack, Flex, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  IoLogInOutline,
  IoLogOutOutline,
  IoHomeOutline,
  IoSettingsOutline,
  IoGlobeOutline,
  IoPersonOutline,
} from 'react-icons/io5';

import { ColorModeButton } from '@src/features/chakra/color-mode';
import { $userStore, logoutUser, BOTNAME_TO_OWNER_UID } from '@src/entities/user';

import { NavButton } from './NavButton';

import { ROOT_ROUTE, SHARE_ROUTE, AUTH_ROUTE, EDIT_ME_ROUTE } from '@src/routes';
import { useAppContext } from '@src/providers/AppBotnameProvider';

interface MenuProps {
  toggleDrawer: (value: React.SetStateAction<boolean>) => void;
}

const MENU_ITEMS = [{ to: ROOT_ROUTE, captionId: 'app-nav-main', Icon: IoHomeOutline }] as const;

const SETTINGS_ITEMS = [
  { to: SHARE_ROUTE, captionId: 'app-nav-share', Icon: IoGlobeOutline },
  { to: EDIT_ME_ROUTE, captionId: 'app-nav-edit-me', Icon: IoPersonOutline },
  // { to: '/unit', captionId: 'app-nav-add-unit', Icon: IoAddCircleOutline },
  { to: '/units', captionId: 'app-nav-manage-units', Icon: IoSettingsOutline },
] as const;

const Menu: React.FC<MenuProps> = ({ toggleDrawer }) => {
  const { t } = useTranslation();
  const { uid } = useUnit($userStore);
  const { botname } = useAppContext();

  return (
    <Stack w='100' h='100%' flex='1 1 auto' justifyContent='space-between' gap={12}>
      <Stack flex='1 1 auto' gap={12} justifyContent='space-between'>
        <Stack gap={{ base: 1, sm: 1, md: 2, lg: 3 }}>
          {MENU_ITEMS.map(({ to, captionId, Icon }) => (
            <NavButton key={`menu-item-${captionId}`} to={to} onClick={() => toggleDrawer(false)}>
              <Icon />
              {t(captionId)}
            </NavButton>
          ))}
        </Stack>

        {!!uid && !!botname && BOTNAME_TO_OWNER_UID[botname] === uid && (
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
            <IoLogOutOutline />
            {t('app-nav-logout')}
          </Button>
        ) : (
          <NavButton to={AUTH_ROUTE} color='fg.muted' onClick={() => toggleDrawer(false)} w='100%'>
            <IoLogInOutline />
            {t('app-nav-auth')}
          </NavButton>
        )}

        <ColorModeButton size='md' variant='surface' flex='0 0 auto' />
      </Flex>
    </Stack>
  );
};

export { Menu };
