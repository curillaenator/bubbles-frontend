import React from 'react';
import { Stack, Heading, Separator } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

// import { Dashboard } from '@src/features/dashboard';
import { Gallery } from '@src/features/gallery';
import { Banner } from '@src/features/banner';
import { Me, Bullets } from '@src/features/me';

import { getHontamGallerySources, EQUPMENT_PHOTOS } from './constants';

const Main: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack maxH='100%' overflow='auto' scrollbar='hidden' gap={{ base: 6, lg: 12 }} py={{ base: 6, lg: 12 }}>
      <Banner />
      <Me />
      <Bullets />

      <Stack gap={{ base: 6 }}>
        <Heading size='2xl'>{t('app-gallery')}</Heading>

        <Gallery
          title={t('gallery-hontam')}
          description={t('gallery-hontam-description')}
          sources={getHontamGallerySources(t)}
        />

        <Separator />

        {/* <Gallery
          title={t('gallery-sunbay')}
          description={t('gallery-sunbay-description')}
          sources={getCommonSources(t)}
        /> */}

        <Gallery title={t('gallery-common')} description={t('gallery-common-description')} photos={EQUPMENT_PHOTOS} />
      </Stack>
    </Stack>
  );
};

export { Main };
