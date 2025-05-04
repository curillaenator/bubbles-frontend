import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { debounce, keys } from 'lodash';
import { v4 as getId } from 'uuid';

import {
  Image,
  Text,
  Flex,
  Stack,
  Field,
  Input,
  Dialog,
  Button,
  Portal,
  FileUpload,
  Heading,
  VStack,
} from '@chakra-ui/react';

import { TbCancel, TbUpload } from 'react-icons/tb';

import { useAppContext } from '@src/providers/AppBotnameProvider';

import { removeGalleryItem, type AppUnitGalleryItem } from '@src/entities/unit';
import { getImageUrl, uploadImage } from '@src/entities/asset';
import { GALLERY_IMAGE_QUERY, SINGLE_UNIT_QUERY, UNITS_QUERY } from '@src/configs/rtq.keys';

import { UnitFormItemEditorProps } from '../interfaces';

const ItemContentForm: React.FC<UnitFormItemEditorProps> = (props) => {
  const { currentEditItem, toggleUnitEditor, items = [], updateExistingUnit, getUnitValues, unitId } = props;

  const qc = useQueryClient();
  const appCtx = useAppContext();

  const { type = 'img', en = '', ru = '', src: imagePath, videoSrc } = (currentEditItem || {}) as AppUnitGalleryItem;
  const currentItemIdx = items.findIndex((el) => (type === 'video' ? el.videoSrc === videoSrc : el.src === imagePath));

  const { data: imageSrc = null } = useQuery({
    queryKey: [GALLERY_IMAGE_QUERY, imagePath],
    queryFn: () => getImageUrl(imagePath),
    enabled: !!imagePath,
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
  } = useForm<{ en: string; ru: string }>({ values: { en, ru } });

  const submit = useCallback(
    async (newUnitGallery: AppUnitGalleryItem[]) => {
      await updateExistingUnit({ ...getUnitValues(), gallery: newUnitGallery });
      toggleUnitEditor(null);
    },
    [getUnitValues, updateExistingUnit, toggleUnitEditor],
  );

  const { mutate: removeSelectedGalleryItem, isPending: isGalleryItemRemoving } = useMutation({
    mutationFn: (item: AppUnitGalleryItem) =>
      removeGalleryItem.call(appCtx, { item, unit: { ...getUnitValues(), id: unitId, gallery: items } }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [SINGLE_UNIT_QUERY, unitId] });
      qc.invalidateQueries({ queryKey: [UNITS_QUERY] });
      toggleUnitEditor(null);
    },
  });

  const { mutate: uploadNewImage, isPending: isImageUploading } = useMutation({
    mutationFn: ({ imageId, image }: { imageId: string; image: File }) =>
      uploadImage.call(appCtx, { imageId, image, unitId }),
    onSuccess: () => {
      if (imagePath.includes('video_default')) {
        qc.invalidateQueries({ queryKey: [SINGLE_UNIT_QUERY, unitId] });
      } else {
        qc.invalidateQueries({ queryKey: [GALLERY_IMAGE_QUERY, imagePath] });
      }
      toggleUnitEditor(null);
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onImageSelect = useCallback(
    debounce(async (fileList: FileList | null, targetUnitId: string) => {
      if (!targetUnitId || !fileList?.length) return;

      const gallery: AppUnitGalleryItem[] = [...items];

      for (const imageFile of fileList) {
        // botname/unitId/imageId.ext - parsed
        let imageId = imagePath?.split('/')[2].split('.')[0];

        if (imageId === 'video_default') {
          imageId = getId();

          gallery.splice(currentItemIdx, 1, {
            ...currentEditItem,
            src: `${appCtx.botname}/${targetUnitId}/${imageId}.webp`,
          });
        }

        await uploadNewImage({ imageId: imageId, image: imageFile });
      }

      updateExistingUnit({ ...getUnitValues(), gallery });
    }, 500),
    [appCtx, items, getUnitValues, updateExistingUnit, imagePath],
  );

  return (
    <Stack
      gap={6}
      as='form'
      onSubmit={handleSubmit((itemData) => {
        if (currentItemIdx < 0) return alert('Something wrong');

        const newGallery = [...items];
        newGallery.splice(currentItemIdx, 1, { ...items[currentItemIdx], ...itemData });
        submit(newGallery);
      })}
    >
      <Heading>Photo or Video description</Heading>

      <Field.Root invalid={!!errors.en}>
        <Field.Label>
          <Text color='white'>EN</Text>
        </Field.Label>

        <Input variant='outline' placeholder='EN' autoComplete='off' {...register('en', { required: true })} />

        <Field.ErrorText>{errors.en?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.ru}>
        <Field.Label>
          <Text color='white'>RU</Text>
        </Field.Label>

        <Input variant='outline' placeholder='RU' autoComplete='off' {...register('ru', { required: true })} />

        <Field.ErrorText>{errors.ru?.message}</Field.ErrorText>
      </Field.Root>

      <VStack gap={{ base: 2, sm: 2, md: 6 }}>
        {imageSrc && (
          <Image
            w='full'
            maxW={{ base: '220px', sm: '320px', md: '420px' }}
            maxH={{ base: '220px', sm: '320px', md: '420px' }}
            src={imageSrc}
            alt={en}
            borderRadius={{ base: 2, sm: 2, md: 6 }}
          />
        )}

        <Flex w='fit-content' gap={{ base: 2, sm: 2, md: 6 }}>
          <FileUpload.Root accept={['image/png', 'image/jpg', 'image/jpeg', 'image/webp']}>
            <FileUpload.HiddenInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onImageSelect(e.target.files, unitId)}
            />

            {/* @ts-expect-error */}
            <FileUpload.Trigger asChild>
              <Button variant='surface' disabled={isGalleryItemRemoving || isImageUploading} loading={isImageUploading}>
                <TbUpload /> Upload photo
              </Button>
            </FileUpload.Trigger>
          </FileUpload.Root>
        </Flex>
      </VStack>

      <Flex w='full' gap={{ base: 2, sm: 2, md: 6 }}>
        <Button
          disabled={!keys(dirtyFields).length || isImageUploading}
          w='full'
          type='submit'
          size='md'
          colorPalette='blue'
          flex='1 1 auto'
        >
          Save
        </Button>

        <Button
          disabled={isGalleryItemRemoving || isImageUploading}
          loading={isGalleryItemRemoving}
          w='full'
          type='button'
          size='md'
          colorPalette='red'
          variant='surface'
          flex='1 1 auto'
          onClick={() => {
            if (confirm('Are you sure to remove item?')) {
              removeSelectedGalleryItem(currentEditItem as AppUnitGalleryItem);
            }
          }}
        >
          Remove
        </Button>

        <Button
          w='full'
          disabled={isGalleryItemRemoving || isImageUploading}
          variant='surface'
          type='button'
          size='md'
          flex='1 1 auto'
          onClick={() => {
            reset();
            toggleUnitEditor(null);
          }}
        >
          <TbCancel />
          Cancel
        </Button>
      </Flex>
    </Stack>
  );
};

const UnitFormItemEditor: React.FC<UnitFormItemEditorProps> = (props) => {
  const { currentEditItem, toggleUnitEditor } = props;

  return (
    <Dialog.Root
      placement='center'
      size='lg'
      lazyMount
      open={!!currentEditItem}
      onOpenChange={() => toggleUnitEditor(null)}
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body>
              <ItemContentForm {...props} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export { UnitFormItemEditor };
