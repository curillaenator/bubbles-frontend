import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { v4 as getId } from 'uuid';
import { debounce, keys, omit } from 'lodash';

import {
  Card as Form,
  Stack,
  SimpleGrid,
  GridItem,
  Button,
  Field,
  Textarea,
  Input,
  Text,
  Separator,
  FileUpload,
  Flex,
  Box,
  Center,
  Heading,
} from '@chakra-ui/react';

import { IoSaveOutline, IoImage } from 'react-icons/io5';
import { TbCancel } from 'react-icons/tb';

import {
  createUnit,
  getUnit,
  updateUnit,
  uploadImage,
  type AppUnitFields,
  type AppUnitGalleryItem,
} from '@src/entities/unit';

import { Loader } from '@src/features/loader';

import { ROOT_ROUTE } from '@src/routes';
import { SINGLE_UNIT_QUERY, UNITS_QUERY } from '@src/configs/rtq.keys';

import { UnitFormImageItem } from './UnitFormImageItem';

const UnitForm: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const { t } = useTranslation();
  // const { uid } = useUnit($userStore);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data = null, isLoading } = useQuery({
    queryKey: [SINGLE_UNIT_QUERY, unitId],
    queryFn: () => getUnit(unitId!),
    enabled: !!unitId,
  });

  const {
    reset,
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<AppUnitFields>({ values: !isLoading && !!data ? data : undefined });

  const { mutate: createNewUnit, isPending: isCreatePending } = useMutation({
    mutationFn: async (unit: AppUnitFields) => await createUnit(unit),
    onSuccess: ({ unitId: createdUnitId }) => {
      qc.invalidateQueries({ queryKey: [UNITS_QUERY] });
      navigate(`/unit/${createdUnitId}`);
    },
  });

  const { mutate: updateExistingUnit, isPending: isUpdatePending } = useMutation({
    mutationFn: async (unit: AppUnitFields) => await updateUnit(unitId!, unit),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [UNITS_QUERY] });
      qc.invalidateQueries({ queryKey: [SINGLE_UNIT_QUERY, unitId] });
    },
  });

  const { mutate: uploadNewImage, isPending: isImageUploading } = useMutation({
    mutationFn: ({ imageId, image }: { imageId: string; image: File }) => uploadImage(imageId, image, unitId!),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onImageSelect = useCallback(
    debounce(async (fileList: FileList | null, targetUnitId: string) => {
      if (!targetUnitId || !fileList?.length) return;

      const newGalleryItems: AppUnitGalleryItem[] = [];

      for (const imageFile of fileList) {
        const newImageId = getId();

        newGalleryItems.push({
          src: `${targetUnitId}/${newImageId}.webp`,
          type: 'img',
        });

        await uploadNewImage({ imageId: newImageId, image: imageFile });
      }

      updateExistingUnit({ ...omit(getValues(), 'gallery'), gallery: newGalleryItems });
    }, 200),
    [qc, getValues, updateExistingUnit],
  );

  const galleryItems = watch('gallery');

  const isComposedLoading = isCreatePending || isImageUploading || isUpdatePending;

  if (isLoading)
    return (
      <Box py={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden'>
        <Center w='full' h='full'>
          <Loader />
        </Center>
      </Box>
    );

  return (
    <Box py={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden'>
      <Form.Root
        width='100%'
        variant='subtle'
        as='form'
        onSubmit={handleSubmit(async (formData) => {
          if (!!unitId) {
            console.log('update unit', formData);
          } else {
            createNewUnit(formData);
          }
        })}
      >
        <Form.Body display='flex' flexDirection='column' gap={6}>
          <Stack gap={6}>
            <Heading>{!!unitId ? 'Edit Unit' : 'New Unit'}</Heading>

            <Field.Root invalid={!!errors['title-en']}>
              <Field.Label>
                <Text color='white'>Unit title EN</Text>
              </Field.Label>

              <Input
                disabled={isComposedLoading}
                variant='outline'
                placeholder='Title EN'
                {...register('title-en', { required: 'Required' })}
              />

              <Field.ErrorText>{errors['title-en']?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors['title-ru']}>
              <Field.Label>
                <Text color='white'>Заголовок RU</Text>
              </Field.Label>

              <Input
                disabled={isComposedLoading}
                variant='outline'
                placeholder='Заголовок RU'
                {...register('title-ru', { required: 'Required' })}
              />

              <Field.ErrorText>{errors['title-ru']?.message}</Field.ErrorText>
            </Field.Root>

            <Separator borderColor='bg.inverted' />

            <Field.Root invalid={!!errors['description-en']}>
              <Field.Label>
                <Text color='white'>Unit description EN</Text>
              </Field.Label>

              <Textarea
                disabled={isComposedLoading}
                variant='outline'
                placeholder='Description EN'
                rows={8}
                {...register('description-en', { required: 'Required' })}
              />

              <Field.ErrorText>{errors['description-en']?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors['description-ru']}>
              <Field.Label>
                <Text color='white'>Описание RU</Text>
              </Field.Label>

              <Textarea
                disabled={isComposedLoading}
                variant='outline'
                placeholder='Описание RU'
                rows={8}
                {...register('description-ru', { required: 'Required' })}
              />

              <Field.ErrorText>{errors['description-ru']?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>

          <Separator borderColor='bg.inverted' />

          {!!unitId && (
            <SimpleGrid columns={{ base: 2, sm: 3, md: 3, lg: 6 }} gap={6}>
              {[...(galleryItems || [])].map((galleryDbItem) => (
                <UnitFormImageItem key={galleryDbItem.src} {...galleryDbItem} />
              ))}

              <GridItem>
                <FileUpload.Root accept={['image/png', 'image/jpg', 'image/jpeg']} maxFiles={5}>
                  <FileUpload.HiddenInput
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onImageSelect(e.target.files, unitId)}
                  />

                  {/* @ts-expect-error */}
                  <FileUpload.Trigger asChild>
                    <Center
                      role='button'
                      w='full'
                      aspectRatio='1 / 1'
                      border='1px solid'
                      borderColor='border'
                      borderRadius={6}
                    >
                      <IoImage size={64} />
                    </Center>
                  </FileUpload.Trigger>
                </FileUpload.Root>
              </GridItem>
            </SimpleGrid>
          )}

          <Flex w='full' gap={6}>
            <Button
              loading={isComposedLoading}
              w='full'
              type='submit'
              size='md'
              colorPalette='blue'
              flex='1 1 auto'
              disabled={!keys(dirtyFields).length}
            >
              <IoSaveOutline />
              {!!unitId ? 'Update' : 'Create'}
            </Button>

            <Button
              disabled={isComposedLoading}
              w='full'
              variant='surface'
              type='button'
              size='md'
              flex='1 1 auto'
              onClick={() => {
                reset();
                navigate(ROOT_ROUTE);
              }}
            >
              <TbCancel />
              {t('app-cancel-button')}
            </Button>
          </Flex>
        </Form.Body>
      </Form.Root>
    </Box>
  );
};

export { UnitForm };
