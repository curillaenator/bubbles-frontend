import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import {
  Text,
  Flex,
  Stack,
  Field,
  Input,
  Dialog,
  Button,
  Portal,
  // FileUpload,
  Heading,
} from '@chakra-ui/react';

// import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';
import { TbCancel } from 'react-icons/tb';

import {
  // uploadImage,
  type AppUnitGalleryItem,
  //   type AppUnitFields,
} from '@src/entities/unit';
// import { Loader } from '@src/features/loader';

import { UnitFormItemEditorProps } from './interfaces';

const ItemContentForm: React.FC<UnitFormItemEditorProps> = (props) => {
  const { currentEditItem, toggleUnitEditor, items, updateExistingUnit, getUnitValues } = props;

  const values = (currentEditItem || {}) as { en: string; ru: string };
  const currentIdx = items.findIndex((el) => {
    if (currentEditItem?.type === 'video') return el.videoSrc === currentEditItem.videoSrc;
    return el.src === currentEditItem?.src;
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ en: string; ru: string }>({ values });

  const submit = useCallback(
    async (newUnitGallery: AppUnitGalleryItem[]) => {
      await updateExistingUnit({ ...getUnitValues(), gallery: newUnitGallery });
      toggleUnitEditor(null);
    },
    [getUnitValues, updateExistingUnit, toggleUnitEditor],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const onImageSelect = useCallback(
  //   debounce(async (fileList: FileList | null, targetUnitId: string) => {
  //     if (!targetUnitId || !fileList?.length) return;

  //     const newGalleryItems: AppUnitGalleryItem[] = [];

  //     for (const imageFile of fileList) {
  //       const newImageId = getId();
  //       newGalleryItems.push({ src: `${targetUnitId}/${newImageId}.webp`, type: 'img' });
  //       await uploadNewImage({ imageId: newImageId, image: imageFile });
  //     }

  //     updateExistingUnit({ ...getUnitValues(), gallery: [...items, ...newGalleryItems] });
  //   }, 500),
  //   [items, getUnitValues, updateExistingUnit],
  // );

  return (
    <Stack
      gap={6}
      as='form'
      onSubmit={handleSubmit((itemData) => {
        const newGallery = [...items];
        newGallery.splice(currentIdx, 1, { ...items[currentIdx], ...itemData });
        submit(newGallery);
      })}
    >
      <Heading>Photo or Video description</Heading>

      <Field.Root invalid={!!errors.en}>
        <Field.Label>
          <Text color='white'>EN</Text>
        </Field.Label>

        <Input
          variant='outline'
          placeholder='EN'
          {...register('en', { required: true })}
          // autoComplete='off'
        />

        <Field.ErrorText>{errors.en?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.ru}>
        <Field.Label>
          <Text color='white'>RU</Text>
        </Field.Label>

        <Input variant='outline' placeholder='RU' {...register('ru', { required: true })} />

        <Field.ErrorText>{errors.ru?.message}</Field.ErrorText>
      </Field.Root>

      <Flex w='full' gap={6}>
        <Button w='full' type='submit' size='md' colorPalette='blue' flex='1 1 auto'>
          Save
        </Button>

        <Button
          w='full'
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
    <Dialog.Root size='lg' lazyMount open={!!currentEditItem} onOpenChange={() => toggleUnitEditor(null)}>
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
