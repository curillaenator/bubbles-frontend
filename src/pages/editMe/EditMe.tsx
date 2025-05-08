import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, Navigate } from 'react-router-dom';
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
  Stack,
} from '@chakra-ui/react';

import { IoSaveOutline, IoHomeOutline } from 'react-icons/io5';
import { TbUpload } from 'react-icons/tb';

import {
  $userStore,
  updateMeBlock,
  getUserData,
  uploadAvatar,
  getAvatarUrl,
  type AppUserEditFields,
} from '@src/entities/user';

import { useTranslation } from '@src/hooks/useTranslation';
import { useAppContext } from '@src/providers/AppBotnameProvider';

import { Loader } from '@src/features/loader';

import { ROUTES } from '@src/routes';
import { ME_QUERY, AVATAR_QUERY } from '@src/configs/rtq.keys';
import { STATIC_PATHS } from '@src/configs/assets.config';
import { FORM_MODEL } from './form.model';

import { EditBullets } from './EditBullets';
import type { MeEditFieldType } from './interfaces';

const FIELD_COMPONENTS: Record<MeEditFieldType, React.ElementType> = {
  input: Input,
  textarea: Textarea,
};

const EditMe: React.FC = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { uid } = useUnit($userStore);
  const appCtx = useAppContext();

  const { data: meFieldsData = null, isLoading } = useQuery<AppUserEditFields | null>({
    queryKey: [ME_QUERY, uid],
    queryFn: getUserData.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  const { data: avatarURL } = useQuery<string | null>({
    queryKey: [AVATAR_QUERY],
    queryFn: getAvatarUrl.bind(appCtx),
    enabled: !!appCtx.botname,
  });

  const { mutate: uploadAvatarFile, isPending: isAvatarPending } = useMutation({
    mutationFn: async (file: File) => uploadAvatar.call(appCtx, file),

    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [AVATAR_QUERY] });
    },
  });

  const { mutate: submitChanges, isPending } = useMutation({
    mutationFn: async (formData: Partial<AppUserEditFields>) => updateMeBlock(uid!, formData),

    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [ME_QUERY, uid] });
      navigate(ROUTES.root);
    },
  });

  const {
    reset,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AppUserEditFields>({ values: meFieldsData || undefined });

  useEffect(() => () => reset(), [reset]);

  const avatar = watch('photoURL');
  const bullets = watch('bullets');

  if (!appCtx.botname) return <Navigate to={ROUTES.root} replace />;

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
            await uploadAvatarFile(formData.photoURL.item(0) as File);
          }

          submitChanges({
            ...formData,
            photoURL: `${appCtx.botname}/${STATIC_PATHS.avatar}`,
          });
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
              {FORM_MODEL.map(([fieldKey, { required, label, fieldType = 'input', description }]) => {
                const InputComponent = FIELD_COMPONENTS[fieldType];

                if (fieldKey === 'separator') return <Separator key={label} borderColor='bg.inverted' />;

                return (
                  <Field.Root key={fieldKey} invalid={!!errors[fieldKey]}>
                    <Field.Label>
                      <Stack>
                        <Text color='fg.subtle'>{label}</Text>
                        {!!description && <Text color='fg.subtle'>{description}</Text>}
                      </Stack>
                    </Field.Label>

                    <InputComponent
                      disabled={isPending || isAvatarPending}
                      variant='outline'
                      placeholder={description || label}
                      {...register(fieldKey, { required })}
                      rows={8}
                      autoComplete='off'
                      bg='bg'
                    />

                    <Field.ErrorText>{errors[fieldKey]?.message}</Field.ErrorText>
                  </Field.Root>
                );
              })}
            </GridItem>

            <GridItem display='flex' flexDirection='column' gap={6}>
              {appCtx.chatId && <Text color='fg.muted'>{appCtx.chatId}</Text>}

              {/* @ts-expect-error */}
              {!avatar?.item?.(0) && !!avatarURL && (
                <Image src={avatarURL} alt='Viktor' w='100%' aspectRatio='1 / 1' objectFit='cover' borderRadius={6} />
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

              <FileUpload.Root accept={['image/png', 'image/jpg', 'image/jpeg', 'image/webp']}>
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

          <EditBullets disabled={isPending || isAvatarPending} setFormValue={setValue} bullets={bullets} />

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
                navigate(ROUTES.root);
              }}
            >
              <IoHomeOutline />
              {t('app-nav-main')}
            </Button>
          </Flex>
        </Form.Body>
      </Form.Root>
    </Box>
  );
};

export const Component = EditMe;
