import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { keys, omit } from 'lodash';

import {
  Card,
  Card as Form,
  Stack as FormFileds,
  Button,
  Field,
  Textarea,
  Input,
  Text,
  Separator,
  Center,
  Heading,
} from '@chakra-ui/react';

import { IoSaveOutline, IoHomeOutline } from 'react-icons/io5';

import { useTranslation } from '@src/hooks/useTranslation';
import { useAppContext } from '@src/providers/AppBotnameProvider';
import { createUnit, getUnit, updateUnit, type AppUnitFields } from '@src/entities/unit';

import { Loader } from '@src/features/loader';

import { ROUTES, type PathParams } from '@src/routes';
import { SINGLE_UNIT_QUERY, UNITS_QUERY } from '@src/configs/rtq.keys';

import { UnitFormGallery } from './UnitFormGallery';

const I18N_KEY = 'unit-form';
const resolveI18NKey = (key: string) => `${I18N_KEY}-${key}`;

const UnitForm: React.FC = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const appCtx = useAppContext();
  const { t } = useTranslation();

  const { unitId = null } = useParams<PathParams[typeof ROUTES.unit]>();

  const { data = null, isLoading } = useQuery({
    queryKey: [SINGLE_UNIT_QUERY, unitId],
    queryFn: () => getUnit.call(appCtx, unitId!),
    enabled: !!unitId,
  });

  const {
    reset,
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<AppUnitFields>({ values: !!data ? omit(data, 'id') : undefined });

  const { mutate: createNewUnit, isPending: isCreatePending } = useMutation({
    mutationFn: async (unit: AppUnitFields) => await createUnit.call(appCtx, unit),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [UNITS_QUERY] });
      navigate(ROUTES.units);
    },
  });

  const { mutate: updateExistingUnit, isPending: isUpdatePending } = useMutation({
    mutationFn: async (unitFields: AppUnitFields) =>
      await updateUnit.call(appCtx, {
        unitId: unitId!,
        updData: unitFields,
      }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [UNITS_QUERY] });
      qc.invalidateQueries({ queryKey: [SINGLE_UNIT_QUERY, unitId] });
    },
  });

  const galleryItems = watch('gallery');
  const isPending = isCreatePending || isUpdatePending;

  if (isLoading)
    return (
      <Center w='full' h='full'>
        <Loader />
      </Center>
    );

  return (
    <>
      <Form.Root
        width='100%'
        variant='subtle'
        as='form'
        onSubmit={handleSubmit(async (formData) => {
          if (!!unitId) {
            updateExistingUnit(formData);
          } else {
            createNewUnit(formData);
          }
        })}
      >
        <Form.Body display='flex' flexDirection='column' gap={6}>
          <FormFileds gap={6}>
            <Heading>{t(!!unitId ? resolveI18NKey('update-unit') : resolveI18NKey('create-unit'))}</Heading>

            <Field.Root invalid={!!errors['title-en']}>
              <Field.Label>
                <Text color='fg.subtle'>Unit title EN</Text>
              </Field.Label>

              <Input
                disabled={isPending}
                variant='outline'
                placeholder='Title EN'
                {...register('title-en', { required: 'Required' })}
              />

              <Field.ErrorText>{errors['title-en']?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors['title-ru']}>
              <Field.Label>
                <Text color='fg.subtle'>Заголовок RU</Text>
              </Field.Label>

              <Input
                disabled={isPending}
                variant='outline'
                placeholder='Заголовок RU'
                {...register('title-ru', { required: 'Required' })}
              />

              <Field.ErrorText>{errors['title-ru']?.message}</Field.ErrorText>
            </Field.Root>

            <Separator borderColor='bg.inverted' />

            <Field.Root invalid={!!errors['description-en']}>
              <Field.Label>
                <Text color='fg.subtle'>Unit description EN</Text>
              </Field.Label>

              <Textarea
                disabled={isPending}
                variant='outline'
                placeholder='Description EN'
                rows={8}
                {...register('description-en', { required: 'Required' })}
              />

              <Field.ErrorText>{errors['description-en']?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors['description-ru']}>
              <Field.Label>
                <Text color='fg.subtle'>Описание RU</Text>
              </Field.Label>

              <Textarea
                disabled={isPending}
                variant='outline'
                placeholder='Описание RU'
                rows={8}
                {...register('description-ru', { required: 'Required' })}
              />

              <Field.ErrorText>{errors['description-ru']?.message}</Field.ErrorText>
            </Field.Root>
          </FormFileds>

          <Button
            loading={isPending}
            type='submit'
            size='md'
            w='full'
            colorPalette='blue'
            disabled={!keys(dirtyFields).length}
          >
            <IoSaveOutline />
            {t(!!unitId ? resolveI18NKey('update-unit') : resolveI18NKey('create-unit'))}
          </Button>
        </Form.Body>
      </Form.Root>

      {!!unitId && (
        <Card.Root width='100%' variant='subtle'>
          <Form.Body display='flex' flexDirection='column' gap={6}>
            <Heading>{t(resolveI18NKey('media-block'))}</Heading>

            <UnitFormGallery
              disabled={isPending}
              unitId={unitId}
              items={galleryItems}
              getUnitValues={() => omit(getValues(), 'gallery')}
              updateExistingUnit={updateExistingUnit}
            />
          </Form.Body>
        </Card.Root>
      )}

      <Button
        disabled={isPending}
        variant='surface'
        type='button'
        size='md'
        w='full'
        onClick={() => {
          reset();
          navigate(ROUTES.root);
        }}
      >
        <IoHomeOutline />
        {t('app-nav-main')}
      </Button>
    </>
  );
};

export { UnitForm };
