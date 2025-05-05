import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { debounce, keys } from 'lodash';
import { v4 as getId } from 'uuid';

import {
  Image,
  Text,
  Flex,
  Stack,
  Stack as Form,
  Field,
  Input,
  Dialog,
  Button,
  Portal,
  FileUpload,
  Heading,
  VStack,
  Separator,
  CloseButton,
} from '@chakra-ui/react';

import { TbUpload } from 'react-icons/tb';
import { IoSave, IoRemove, IoClose } from 'react-icons/io5';

import { useAppContext } from '@src/providers/AppBotnameProvider';

import { removeGalleryItem, type AppUnitGalleryItem } from '@src/entities/unit';
import { getAssetUrl, uploadImage } from '@src/entities/asset';
import { GALLERY_IMAGE_QUERY, SINGLE_UNIT_QUERY, UNITS_QUERY } from '@src/configs/rtq.keys';

import { UnitFormItemEditorProps } from '../interfaces';

const I18N_KEY = 'item-content-form';
const resolveI18NKey = (key: string) => `${I18N_KEY}-${key}`;

const resolveUploadVideoButtonTitle = (videoSrc?: string) => (videoSrc ? 'change-video-cover' : 'upload-video-cover');

const ItemContentForm: React.FC<UnitFormItemEditorProps> = (props) => {
  const { currentEditItem, toggleUnitEditor, items = [], updateExistingUnit, getUnitValues, unitId } = props;

  const { t } = useTranslation();
  const qc = useQueryClient();
  const appCtx = useAppContext();

  const { type = 'img', en = '', ru = '', src: imagePath, videoSrc } = (currentEditItem || {}) as AppUnitGalleryItem;
  const currentItemIdx = items.findIndex((el) => (type === 'video' ? el.videoSrc === videoSrc : el.src === imagePath));

  const { data: imageSrc = null } = useQuery({
    queryKey: [GALLERY_IMAGE_QUERY, imagePath],
    queryFn: () => getAssetUrl(imagePath),
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
    <Stack gap={{ base: 4, sm: 6 }}>
      <Heading>{t(resolveI18NKey(`${type}-descr`))}</Heading>

      <Form
        gap={{ base: 4, sm: 6 }}
        as='form'
        onSubmit={handleSubmit((itemData) => {
          if (currentItemIdx < 0) return alert('Something wrong');

          const newGallery = [...items];
          newGallery.splice(currentItemIdx, 1, { ...items[currentItemIdx], ...itemData });
          submit(newGallery);
        })}
      >
        <Field.Root invalid={!!errors.en}>
          <Field.Label>
            <Text color='white'>{t(resolveI18NKey('en'))}</Text>
          </Field.Label>

          <Input variant='outline' placeholder='EN' autoComplete='off' {...register('en', { required: true })} />

          <Field.ErrorText>{errors.en?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.ru}>
          <Field.Label>
            <Text color='white'>{t(resolveI18NKey('ru'))}</Text>
          </Field.Label>

          <Input variant='outline' placeholder='RU' autoComplete='off' {...register('ru', { required: true })} />

          <Field.ErrorText>{errors.ru?.message}</Field.ErrorText>
        </Field.Root>

        <Button
          disabled={!keys(dirtyFields).length || isImageUploading}
          w='full'
          type='submit'
          size='md'
          colorPalette='blue'
          flex='1 1 auto'
        >
          <IoSave />

          {t(resolveI18NKey(`controls-${type}-save`))}
        </Button>
      </Form>

      <Separator borderColor='fg' my={{ base: 2, sm: 4 }} />

      <Heading>{t(resolveI18NKey(`${type}-source`))}</Heading>

      <VStack gap={{ base: 4, sm: 6 }}>
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
              <Button
                colorPalette='blue'
                disabled={isGalleryItemRemoving || isImageUploading}
                loading={isImageUploading}
              >
                <TbUpload />{' '}
                {t(resolveI18NKey(type === 'video' ? resolveUploadVideoButtonTitle(videoSrc) : 'change-photo'))}
              </Button>
            </FileUpload.Trigger>
          </FileUpload.Root>
        </Flex>
      </VStack>

      <Separator borderColor='fg' my={{ base: 2, sm: 4 }} />

      <Heading>{t(resolveI18NKey('controls'))}</Heading>

      <Flex w='full' gap={{ base: 4, sm: 6 }}>
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
          <IoRemove />
          {t(resolveI18NKey(`controls-${type}-remove`))}
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
          <IoClose />
          {t('app-close-button')}
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
            {/* @ts-expect-error */}
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>

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
