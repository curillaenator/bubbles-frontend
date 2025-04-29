import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
} from '@chakra-ui/react';

import { MdSave } from 'react-icons/md';
import { TbUpload, TbCancel } from 'react-icons/tb';

import { FORM_MODEL } from './form.model';
import type { MeEditFields, MeEditFieldType } from './interfaces';

const FIELD_COMPONENTS: Record<MeEditFieldType, React.ElementType> = {
  input: Input,
  textarea: Textarea,
};

const EditMe: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<MeEditFields>({
    // defaultValues: {}
  });

  const avatar = watch('photoURL');

  useEffect(() => () => reset(), [reset]);

  return (
    <Box py={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden'>
      <Form.Root
        width='100%'
        variant='subtle'
        as='form'
        onSubmit={handleSubmit((formData) => {
          console.log('formData', formData);
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
              {avatar?.item?.(0) && (
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
                <FileUpload.HiddenInput {...register('photoURL', { required: 'required' })} />

                {/* @ts-expect-error */}
                <FileUpload.Trigger asChild>
                  <Button variant='solid' size='sm' colorPalette={errors.photoURL ? 'red' : 'blue'}>
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
            <Button w='full' type='submit' size='md' colorPalette='blue' flex='1 1 auto'>
              <MdSave />
              {t('app-save-button')}
            </Button>

            <Button
              w='full'
              variant='surface'
              type='button'
              size='md'
              flex='1 1 auto'
              onClick={() => {
                reset();
                navigate('/');
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
