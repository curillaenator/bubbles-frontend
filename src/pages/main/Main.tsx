import React from 'react';
import { useUnit } from 'effector-react';
import { useQuery } from '@tanstack/react-query';
import { Stack, Center, VStack, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { toPairs } from 'lodash';

import { getUnits, AppUnitFields } from '@src/entities/unit';
import { $userStore, getUserData, type AppUserEditFields } from '@src/entities/user';
import { useAppContext } from '@src/providers/AppBotnameProvider';

import { Loader } from '@src/features/loader';
import { Gallery } from '@src/features/gallery';
import { Banner } from '@src/features/banner';
import { Me } from '@src/features/me';

import { UNITS_QUERY, ME_QUERY } from '@src/configs/rtq.keys';
import { AVAILBALE_BOTS } from '@src/configs/assets.config';

const decideUnitLanguage = (field: string, lang: string, unit: Omit<AppUnitFields, 'gallery'>) =>
  unit[`${field}-${lang}` as keyof Omit<AppUnitFields, 'gallery'>];

const Main: React.FC = () => {
  const { i18n } = useTranslation();
  const { uid } = useUnit($userStore);
  const appCtx = useAppContext();

  const { data: units = [], isLoading: isUnitsLoading } = useQuery({
    queryKey: [UNITS_QUERY],
    queryFn: getUnits.bind(appCtx),
  });

  // load user data on main page init -> internal data queries get cached data
  const { isLoading: isUserDataLoading } = useQuery<AppUserEditFields | null>({
    queryKey: [ME_QUERY, uid],
    queryFn: getUserData.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  const isLoading = isUnitsLoading || isUserDataLoading;

  if (isLoading)
    return (
      <Stack
        data-mainpage-loader
        maxH='100%'
        overflow='auto'
        scrollbar='hidden'
        gap={{ base: 6, lg: 12 }}
        py={{ base: 6, lg: 12 }}
      >
        <Center w='full' h='480px'>
          <Loader />
        </Center>
      </Stack>
    );

  return (
    <Stack
      data-mainpage
      maxH='100%'
      overflow='auto'
      scrollbar='hidden'
      gap={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
    >
      <Banner />

      <Me />

      {!!appCtx.botname && (
        <Stack gap={6}>
          {units
            .toSorted(({ order: oA }, { order: oB }) => (oA || 0) - (oB || 0))
            .map((u) => (
              <Gallery
                key={u.id}
                title={decideUnitLanguage('title', i18n.language, u)}
                description={decideUnitLanguage('description', i18n.language, u)}
                sources={u.gallery || []}
              />
            ))}
        </Stack>
      )}

      {!appCtx.botname && (
        <VStack>
          {toPairs(AVAILBALE_BOTS).map(([botN, { appRoute, colorPalette }]) => (
            <Button
              key={botN}
              as='a'
              colorPalette={colorPalette}
              //@ts-expect-error
              href={appRoute}
            >
              {botN}
            </Button>
          ))}
        </VStack>
      )}

      {/* <Bullets /> */}
    </Stack>
  );
};

export { Main };
