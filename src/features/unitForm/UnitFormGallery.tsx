import React, { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMoveImmutable from 'array-move';
import { debounce } from 'lodash';
import { v4 as getId } from 'uuid';

import { Box, Flex, FileUpload, Center, chakra, Heading } from '@chakra-ui/react';
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';

import { uploadImage, uploadVideo, type AppUnitGalleryItem } from '@src/entities/unit';
import { Loader } from '@src/features/loader';

import { UnitFormImageItem } from './components/UnitFormImageItem';
import { UnitFormItemEditor } from './components/UnitFormItemEditor';

import { UnitFormGalleryProps } from './interfaces';

const ChakraSortableList = chakra(SortableList);

const sortGalleryItems = (units: AppUnitGalleryItem[]) =>
  units.toSorted(({ order: oA }, { order: oB }) => (oA || 0) - (oB || 0));

const UnitFormGallery: React.FC<UnitFormGalleryProps> = (props) => {
  const { unitId, items = [], getUnitValues, updateExistingUnit } = props;

  const [currentEditItem, setCurrentEditItem] = useState<AppUnitGalleryItem | null>(null);
  const toggleUnitEditor = useCallback((unit: AppUnitGalleryItem | null) => setCurrentEditItem(unit), []);

  const { mutate: uploadNewImage, isPending: isImageUploading } = useMutation({
    mutationFn: ({ imageId, image }: { imageId: string; image: File }) => uploadImage(imageId, image, unitId!),
  });

  const { mutate: uploadNewVideo, isPending: isVideoUploading } = useMutation({
    mutationFn: ({ imageId, video }: { imageId: string; video: File }) => uploadVideo(imageId, video, unitId!),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onImageSelect = useCallback(
    debounce(async (fileList: FileList | null, targetUnitId: string) => {
      if (!targetUnitId || !fileList?.length) return;

      const newGalleryItems: AppUnitGalleryItem[] = [];

      for (const imageFile of fileList) {
        const newImageId = getId();

        newGalleryItems.push({
          src: `divebot/${targetUnitId}/${newImageId}.webp`,
          type: 'img',
          order: items.length,
        });

        await uploadNewImage({ imageId: newImageId, image: imageFile });
      }

      await updateExistingUnit({ ...getUnitValues(), gallery: [...items, ...newGalleryItems] });
    }, 500),
    [items, getUnitValues, updateExistingUnit],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onVideoSelect = useCallback(
    debounce(async (fileList: FileList | null, targetUnitId: string) => {
      if (!targetUnitId || !fileList?.length) return;

      const newGalleryItems: AppUnitGalleryItem[] = [];

      for (const videoFile of fileList) {
        const newVideoId = getId();
        const newVideoExt = videoFile.name.match(/\.mp4$/)?.[0];

        newGalleryItems.push({
          src: 'divebot/common/video_default.avif',
          type: 'video',
          videoSrc: `divebot/${targetUnitId}/${newVideoId}${newVideoExt}`,
          order: items.length,
        });

        await uploadNewVideo({ imageId: newVideoId, video: videoFile });
      }

      updateExistingUnit({ ...getUnitValues(), gallery: [...items, ...newGalleryItems] });
    }, 500),
    [items, getUnitValues, updateExistingUnit],
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
      <ChakraSortableList display='flex' flexWrap='wrap' gap={{ base: 2, sm: 6 }} onSortEnd={onSortEnd}>
        {sortGalleryItems(items).map((item) => (
          <SortableItem key={item.src}>
            <UnitFormImageItem {...item} onEdit={() => toggleUnitEditor(item)} />
          </SortableItem>
        ))}
      </ChakraSortableList>

      <Heading>Upload</Heading>

      <Flex gap={6} flexWrap='wrap'>
        <Box w='220px' cursor='pointer'>
          <FileUpload.Root
            key={Date.now()}
            maxFiles={8}
            accept={['image/png', 'image/jpg', 'image/jpeg', 'image/webp']}
          >
            <FileUpload.HiddenInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onImageSelect(e.target.files, unitId)}
            />

            {/* @ts-expect-error */}
            <FileUpload.Trigger asChild>
              <Center w='full' aspectRatio='1 / 1' border='1px solid' borderColor='border' borderRadius={6}>
                {isImageUploading ? <Loader /> : <IoImageOutline size={64} />}
              </Center>
            </FileUpload.Trigger>
          </FileUpload.Root>
        </Box>

        <Box w='220px' cursor='pointer'>
          <FileUpload.Root accept={['video/mp4']}>
            <FileUpload.HiddenInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onVideoSelect(e.target.files, unitId)}
            />

            {/* @ts-expect-error */}
            <FileUpload.Trigger asChild>
              <Center w='full' aspectRatio='1 / 1' border='1px solid' borderColor='border' borderRadius={6}>
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
