import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Stack, Heading, Center } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { getUnits, AppUnitFields } from '@src/entities/unit';

import { Loader } from '@src/features/loader';
import { Gallery } from '@src/features/gallery';
import { Banner } from '@src/features/banner';
import { Me, Bullets } from '@src/features/me';

import { UNITS_QUERY } from '@src/configs/rtq.keys';
// import { getHontamGallerySources } from './constants';

const decideUnitLanguage = (field: string, lang: string, unit: Omit<AppUnitFields, 'gallery'>) =>
  unit[`${field}-${lang}` as keyof Omit<AppUnitFields, 'gallery'>];

const Main: React.FC = () => {
  const { t, i18n } = useTranslation();

  const { data: units, isLoading } = useQuery({
    queryKey: [UNITS_QUERY],
    queryFn: () => getUnits(),
  });

  return (
    <Stack maxH='100%' overflow='auto' scrollbar='hidden' gap={{ base: 6, lg: 12 }} py={{ base: 6, lg: 12 }}>
      <Banner />

      <Me />

      <Stack gap={{ base: 6 }}>
        <Heading size='2xl'>{t('app-gallery')}</Heading>

        {isLoading ? (
          <Center w='full' h='480px'>
            <Loader />
          </Center>
        ) : (
          <>
            {units?.map((u) => (
              <Gallery
                key={u.id}
                title={decideUnitLanguage('title', i18n.language, u)}
                description={decideUnitLanguage('description', i18n.language, u)}
                sources={u.gallery || []}
              />
            ))}

            {/* <Gallery
              title={t('gallery-hontam')}
              description={t('gallery-hontam-description')}
              sources={getHontamGallerySources(t)}
            /> */}
          </>
        )}
      </Stack>

      <Bullets />
    </Stack>
  );
};

export { Main };
