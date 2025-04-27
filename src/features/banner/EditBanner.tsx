import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { Button, Field, Textarea, Input, Stack, Flex, Text } from '@chakra-ui/react';

interface BannerFields {
  title: string;
  description: string;
}

interface BannerFormProps {
  close?: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ close }) => {
  const { t } = useTranslation();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BannerFields>({ defaultValues: { title: t('banner-title'), description: t('banner-slogan') } });

  return (
    <Stack
      as='form'
      gap={6}
      onSubmit={handleSubmit((formData) => {
        console.log('FormData', formData);
        reset();
        close?.();
      })}
    >
      <Field.Root invalid={!!errors.title}>
        <Field.Label>
          <Text color='white'>Banner title</Text>
        </Field.Label>

        <Input variant='subtle' {...register('title')} placeholder='Banner title' />

        <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.title}>
        <Field.Label>
          <Text color='white'>Banner description</Text>
        </Field.Label>

        <Textarea variant='subtle' {...register('description')} placeholder='Banner description' rows={12} />

        <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
      </Field.Root>

      <Flex gap={4}>
        <Button type='submit' variant='solid' colorPalette='blue'>
          Save
        </Button>

        <Button
          type='button'
          variant='surface'
          onClick={() => {
            reset();
            close?.();
          }}
        >
          Cancel
        </Button>
      </Flex>
    </Stack>
  );
};

export { BannerForm };
