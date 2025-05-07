import type { Photo } from 'react-photo-album';
import type { AppUnitGalleryItem } from '@src/entities/unit';
import type { KeenSliderInstance, KeenSliderHooks } from 'keen-slider/react';

interface AppUIUnitGallryItemProps extends Photo, AppUnitGalleryItem {}

interface CarouselProps {
  photoItems: AppUIUnitGallryItemProps[];
  isMobile: boolean;
  initial: number;
  onCarouselInstanceChange?: (inst: KeenSliderInstance<{}, {}, KeenSliderHooks> | null) => void;
}

export type { CarouselProps, AppUIUnitGallryItemProps };
