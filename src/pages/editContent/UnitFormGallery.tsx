import React, { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { v4 as getId } from 'uuid';

import { SimpleGrid, GridItem, FileUpload, Center } from '@chakra-ui/react';
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';

import { uploadImage, uploadVideo, type AppUnitGalleryItem } from '@src/entities/unit';
import { Loader } from '@src/features/loader';

import { UnitFormImageItem } from './UnitFormImageItem';
import { UnitFormItemEditor } from './UnitFormItemEditor';

import { UnitFormGalleryProps } from './interfaces';

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
        newGalleryItems.push({ src: `${targetUnitId}/${newImageId}.webp`, type: 'img' });
        await uploadNewImage({ imageId: newImageId, image: imageFile });
      }

      updateExistingUnit({ ...getUnitValues(), gallery: [...items, ...newGalleryItems] });
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
          src: 'common/video_default.avif',
          type: 'video',
          videoSrc: `${targetUnitId}/${newVideoId}${newVideoExt}`,
        });

        await uploadNewVideo({ imageId: newVideoId, video: videoFile });
      }

      updateExistingUnit({ ...getUnitValues(), gallery: [...items, ...newGalleryItems] });
    }, 500),
    [items, getUnitValues, updateExistingUnit],
  );

  return (
    <>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap={6}>
        {items.map((item) => (
          <UnitFormImageItem {...item} key={item.src} onEdit={() => toggleUnitEditor(item)} />
        ))}

        <GridItem cursor='pointer' role='button'>
          <FileUpload.Root accept={['image/png', 'image/jpg', 'image/jpeg', 'image/webp']} maxFiles={5}>
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
        </GridItem>

        <GridItem cursor='pointer' role='button'>
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
        </GridItem>
      </SimpleGrid>

      <UnitFormItemEditor {...props} currentEditItem={currentEditItem} toggleUnitEditor={toggleUnitEditor} />
    </>
  );
};

export { UnitFormGallery };
