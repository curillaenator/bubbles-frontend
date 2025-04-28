import React from 'react';
import { Stack, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

// import { Dashboard } from '@src/features/dashboard';
import { Gallery } from '@src/features/gallery';
import { Banner } from '@src/features/banner';
import { Me, Bullets } from '@src/features/me';

const COMMON_PHOTOS = [...new Array(5)].map((_, i) => ({
  src: `./assets/common/p${i + 1}.webp`,
  width: 1280,
  height: 854,
}));

const SUNBAY_PHOTOS = [...new Array(4)].map((_, i) => ({
  src: `./assets/sunbay/p${i + 1}.webp`,
  width: 1280,
  height: 854,
}));

const Main: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack maxH='100%' overflow='auto' scrollbar='hidden' gap={6} py={6}>
      <Banner />
      <Me />
      <Bullets />

      <Stack py={6}>
        <Heading size='2xl'>{t('app-gallery')}</Heading>

        <Gallery title={t('gallery-common')} description={t('gallery-common-description')} photos={COMMON_PHOTOS} />

        <Gallery title={t('gallery-sunbay')} description={t('gallery-sunbay-description')} photos={SUNBAY_PHOTOS} />
      </Stack>
    </Stack>
  );
};

export { Main };
