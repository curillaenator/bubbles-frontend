import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Card as Form, Field, Input, Text, Flex, Button } from '@chakra-ui/react';
import { TbLogin2, TbCancel } from 'react-icons/tb';

import { AppUserCreds, loginUser } from '@src/entities/user';

const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // const [isRegister, setIsRegister] = useState<boolean>(false);

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AppUserCreds>();

  return (
    <Box py={6} h='100%' maxH='100%' overflow='auto' scrollbar='hidden'>
      <Form.Root
        width='100%'
        variant='subtle'
        as='form'
        onSubmit={handleSubmit((creds) => {
          loginUser(creds).then(() => navigate('/'));

          // if (isRegister) {
          //   registerUser(creds).then(() => navigate('/'));
          // } else {
          //   loginUser(creds).then(() => navigate('/'));
          // }
        })}
      >
        <Form.Body display='flex' flexDirection='column' gap={6}>
          {/* <Switch.Root
            colorPalette='blue'
            checked={isRegister}
            onCheckedChange={(e: { checked: boolean }) => setIsRegister(e.checked)}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>

            <Switch.Label>First register</Switch.Label>
          </Switch.Root> */}

          <Field.Root invalid={!!errors.email}>
            <Field.Label>
              <Text color='white'>Email</Text>
            </Field.Label>

            <Input
              variant='outline'
              placeholder='Email'
              {...register('email', { required: true })}
              // autoComplete='off'
            />

            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>
              <Text color='white'>Password</Text>
            </Field.Label>

            <Input
              type='password'
              variant='outline'
              placeholder='Password'
              {...register('password', { required: true })}
            />

            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Flex w='full' gap={6}>
            <Button w='full' type='submit' size='md' colorPalette='blue' flex='1 1 auto'>
              <TbLogin2 />
              {t('app-nav-auth')}
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

export { AuthPage };
