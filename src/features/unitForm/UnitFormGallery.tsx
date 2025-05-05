import React, { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMoveImmutable from 'array-move';
import { debounce } from 'lodash';
import { v4 as getId } from 'uuid';

import { Box, Flex, FileUpload, Center, chakra, Heading } from '@chakra-ui/react';
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';

import { useAppContext } from '@src/providers/AppBotnameProvider';

import { type AppUnitGalleryItem } from '@src/entities/unit';
import { uploadImage, uploadVideo } from '@src/entities/asset';
import { Loader } from '@src/features/loader';

import { UnitFormImageItem } from './components/UnitFormImageItem';
import { UnitFormItemEditor } from './components/UnitFormItemEditor';

import { STATIC_PATHS } from '@src/configs/assets.config';
import { UnitFormGalleryProps } from './interfaces';

const ChakraSortableList = chakra(SortableList);

const sortGalleryItems = (units: AppUnitGalleryItem[]) =>
  units.toSorted(({ order: oA }, { order: oB }) => (oA || 0) - (oB || 0));

const UnitFormGallery: React.FC<UnitFormGalleryProps> = (props) => {
  const appCtx = useAppContext();
  const { t } = useTranslation();

  const { disabled, unitId, items = [], getUnitValues, updateExistingUnit } = props;

  const [currentEditItem, setCurrentEditItem] = useState<AppUnitGalleryItem | null>(null);
  const toggleUnitEditor = useCallback((unit: AppUnitGalleryItem | null) => setCurrentEditItem(unit), []);

  const { mutate: uploadNewImage, isPending: isImageUploading } = useMutation({
    mutationFn: ({ imageId, image }: { imageId: string; image: File }) =>
      uploadImage.call(appCtx, { imageId, image, unitId }),
  });

  const { mutate: uploadNewVideo, isPending: isVideoUploading } = useMutation({
    mutationFn: ({ videoId, video }: { videoId: string; video: File }) =>
      uploadVideo.call(appCtx, { videoId, video, unitId }),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onImageSelect = useCallback(
    debounce(async (fileList: FileList | null, targetUnitId: string) => {
      if (!targetUnitId || !fileList?.length) return;

      const newGalleryItems: AppUnitGalleryItem[] = [];

      for (const imageFile of fileList) {
        const newImageId = getId();

        newGalleryItems.push({
          src: `${appCtx.botname}/${targetUnitId}/${newImageId}.webp`,
          type: 'img',
          order: items.length,
        });

        await uploadNewImage({ imageId: newImageId, image: imageFile });
      }

      await updateExistingUnit({ ...getUnitValues(), gallery: [...items, ...newGalleryItems] });
    }, 500),
    [appCtx, items, getUnitValues, updateExistingUnit],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onVideoSelect = useCallback(
    debounce(async (fileList: FileList | null, targetUnitId: string) => {
      if (!targetUnitId || !fileList?.length) return;

      const newGalleryItems: AppUnitGalleryItem[] = [];

      for (const videoFile of fileList) {
        const newVideoId = getId();

        newGalleryItems.push({
          src: `${appCtx.botname}/${STATIC_PATHS.videoCover}`,
          type: 'video',
          videoSrc: `${appCtx.botname}/${targetUnitId}/${newVideoId}.mp4`,
          order: items.length,
        });

        await uploadNewVideo({ videoId: newVideoId, video: videoFile });
      }

      updateExistingUnit({ ...getUnitValues(), gallery: [...items, ...newGalleryItems] });
    }, 500),
    [appCtx, items, getUnitValues, updateExistingUnit],
  );

  const onSortEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      const gallery = arrayMoveImmutable(sortGalleryItems(items), oldIndex, newIndex).map((it, order) => ({
        ...it,
        order,
      }));

      updateExistingUnit({ ...getUnitValues(), gallery });
    },
    [items, getUnitValues, updateExistingUnit],
  );

  return (
    <>
      <ChakraSortableList
        display='flex'
        flexWrap='wrap'
        gap={{ base: 2, sm: 6 }}
        onSortEnd={onSortEnd}
        allowDrag={!disabled}
      >
        {sortGalleryItems(items).map((item) => (
          <SortableItem key={item.src}>
            <UnitFormImageItem
              {...item}
              onEdit={() => {
                if (!disabled) toggleUnitEditor(item);
              }}
            />
          </SortableItem>
        ))}
      </ChakraSortableList>

      <Heading>{t('unit-form-media-block-upload')}</Heading>

      <Flex gap={{ base: 2, sm: 6 }} flexWrap='wrap'>
        <Box w={{ base: 'calc(50% - 4px)', sm: 'calc(50% - 12px)' }} cursor='pointer'>
          <FileUpload.Root accept={['image/png', 'image/jpg', 'image/jpeg', 'image/webp']}>
            <FileUpload.HiddenInput
              disabled={disabled}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onImageSelect(e.target.files, unitId)}
            />

            {/* @ts-expect-error */}
            <FileUpload.Trigger asChild>
              <Center w='full' bg='blue.solid' h='128px' borderRadius={6}>
                {isImageUploading ? <Loader /> : <IoImageOutline size={64} />}
              </Center>
            </FileUpload.Trigger>
          </FileUpload.Root>
        </Box>

        <Box w={{ base: 'calc(50% - 4px)', sm: 'calc(50% - 12px)' }} cursor='pointer'>
          <FileUpload.Root accept={['video/mp4']}>
            <FileUpload.HiddenInput
              disabled={disabled}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onVideoSelect(e.target.files, unitId)}
            />

            {/* @ts-expect-error */}
            <FileUpload.Trigger asChild>
              <Center w='full' bg='blue.solid' h='128px' borderRadius={6}>
                {isVideoUploading ? <Loader /> : <IoVideocamOutline size={64} />}
              </Center>
            </FileUpload.Trigger>
          </FileUpload.Root>
        </Box>
      </Flex>

      <UnitFormItemEditor {...props} currentEditItem={currentEditItem} toggleUnitEditor={toggleUnitEditor} />
    </>
  );
};

export { UnitFormGallery };
