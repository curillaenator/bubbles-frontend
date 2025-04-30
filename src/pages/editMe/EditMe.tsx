import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useUnit } from 'effector-react';

import {
  Card as Form,
  Image,
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
} from '@chakra-ui/react';

import { IoSaveOutline } from 'react-icons/io5';
import { TbUpload, TbCancel } from 'react-icons/tb';

import {
  $userStore,
  updateMeBlock,
  getUserData,
  uploadAvatar,
  getAvatarUrl,
  AVATAR_IMAGE_PATH,
  type AppUserEditFields,
} from '@src/entities/user';

import { Loader } from '@src/features/loader';

import { ROOT_ROUTE } from '@src/routes';
import { ME_QUERY, AVATAR_QUERY } from '@src/configs/rtq.keys';
import { FORM_MODEL } from './form.model';

import type { MeEditFieldType } from './interfaces';

const FIELD_COMPONENTS: Record<MeEditFieldType, React.ElementType> = {
  input: Input,
  textarea: Textarea,
};

const EditMe: React.FC = () => {
  const { t } = useTranslation();
  const { uid } = useUnit($userStore);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: meFieldsData = null, isLoading } = useQuery<AppUserEditFields | null>({
    queryKey: [ME_QUERY, uid],
    queryFn: () => getUserData(uid),
    enabled: !!uid,
  });

  const { data: avatarSrc } = useQuery<string>({ queryKey: [AVATAR_QUERY], queryFn: () => getAvatarUrl() });

  const { mutate: setAvatarImage, isPending: isAvatarPending } = useMutation({
    mutationFn: async (file: File) => uploadAvatar(file),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [AVATAR_QUERY] });
    },
  });

  const { mutate: submitChanges, isPending } = useMutation({
    mutationFn: async (formData: Partial<AppUserEditFields>) => {
      updateMeBlock(uid!, formData);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [ME_QUERY, uid] });
      navigate(ROOT_ROUTE);
    },
  });

  const {
    reset,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<AppUserEditFields>({ values: meFieldsData || undefined });

  const avatar = watch('photoURL');

  useEffect(() => () => reset(), [reset]);

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
          if (typeof formData.photoURL !== 'string' && !!formData.photoURL.length) {
            await setAvatarImage(formData.photoURL.item(0) as File);
          }

          submitChanges({ ...formData, photoURL: AVATAR_IMAGE_PATH });
        })}
      >
        <Form.Body display='flex' flexDirection='column' gap={6}>
          <SimpleGrid columns={{ base: 1, sm: 3, md: 3, lg: 3 }} gap={6}>
            <GridItem
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
              gap={6}
              colSpan={{ base: 1, sm: 2, md: 2, lg: 2 }}
            >
              {FORM_MODEL.map(([fieldKey, { required, label, fieldType = 'input' }]) => {
                const InputComponent = FIELD_COMPONENTS[fieldType];

                if (fieldKey === 'separator') return <Separator key={label} borderColor='bg.inverted' />;

                return (
                  <Field.Root key={fieldKey} invalid={!!errors[fieldKey]}>
                    <Field.Label>
                      <Text color='white'>{label}</Text>
                    </Field.Label>

                    <InputComponent
                      disabled={isPending || isAvatarPending}
                      variant='outline'
                      placeholder={label}
                      {...register(fieldKey, { required })}
                      rows={8}
                    />

                    <Field.ErrorText>{errors[fieldKey]?.message}</Field.ErrorText>
                  </Field.Root>
                );
              })}
            </GridItem>

            <GridItem display='flex' flexDirection='column' gap={6}>
              {/* @ts-expect-error */}
              {!avatar?.item?.(0) && !!avatarSrc && (
                <Image src={avatarSrc} alt='Viktor' w='100%' aspectRatio='1 / 1' objectFit='cover' borderRadius={6} />
              )}

              {typeof avatar !== 'string' && avatar?.item?.(0) && (
                <Image
                  src={URL.createObjectURL(avatar?.item?.(0) as File)}
                  alt='Viktor'
                  w='100%'
                  aspectRatio='1 / 1'
                  objectFit='cover'
                  borderRadius={6}
                />
              )}

              <FileUpload.Root accept={['image/png', 'image/jpg', 'image/jpeg']}>
                <FileUpload.HiddenInput {...register('photoURL')} />

                {/* @ts-expect-error */}
                <FileUpload.Trigger asChild>
                  <Button
                    disabled={isPending || isAvatarPending}
                    variant='solid'
                    size='sm'
                    colorPalette={errors.photoURL ? 'red' : 'blue'}
                  >
                    <TbUpload /> Upload avatar
                  </Button>
                </FileUpload.Trigger>

                {errors.photoURL?.message && (
                  <Text fontSize={12} color='fg.error'>
                    {errors.photoURL?.message}
                  </Text>
                )}

                <FileUpload.List />
              </FileUpload.Root>
            </GridItem>
          </SimpleGrid>

          <Flex w='full' gap={6}>
            <Button
              loading={isPending || isAvatarPending}
              w='full'
              type='submit'
              size='md'
              colorPalette='blue'
              flex='1 1 auto'
            >
              <IoSaveOutline />
              {t('app-save-button')}
            </Button>

            <Button
              disabled={isPending || isAvatarPending}
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

export { EditMe };
