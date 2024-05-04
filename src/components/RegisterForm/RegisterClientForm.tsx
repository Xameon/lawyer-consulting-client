import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  styled,
} from '@mui/joy';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import { useSignUp } from '../../hooks/auth/useSignUp';
import { useAuth } from '../../hooks/useAuth';

// ..................................................
// Styles

const Form = styled('form')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'end',
  columnGap: '12px',
  rowGap: '8px',
});

// ..................................................
// Types

type RegisterClientFormType = {
  email: string;
  name: string;
  surname1: string;
  surname2: string;
  password: string;
};

// ..................................................
// Default Values

const defaultValues: RegisterClientFormType = {
  email: '',
  name: '',
  surname1: '',
  surname2: '',
  password: '',
};

/**
 * Form for register user
 */

export const RegisterClientForm = () => {
  // ..................................................
  // Local States

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // ..................................................
  // Contexts

  const { setAccessToken, setRefreshToken } = useAuth();

  // ..................................................
  // API Hooks

  const { mutate: signUp, isPending } = useSignUp({
    setAccessToken,
    setRefreshToken,
  });

  // ..................................................
  // Misc Hooks

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterClientFormType>({
    defaultValues,
  });

  // ..................................................
  // Functions

  const onSubmit: SubmitHandler<RegisterClientFormType> = (data) => {
    const {
      email,
      name: firstName,
      surname1: lastName,
      surname2: middleName,
      password,
    } = data;

    signUp({
      email,
      firstName,
      lastName,
      middleName,
      password,
      role: 'user',
    });
  };

  // ..................................................
  // Render

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={{ gridColumn: '1 / -1' }}>
        <FormLabel>Email</FormLabel>
        <Input
          color={errors.email ? 'danger' : 'neutral'}
          {...register('email', { required: "Електронна пошта обов'язкова" })}
          id="client-email"
          type="email"
          startDecorator={<EmailIcon />}
        />
        <FormHelperText sx={{ color: 'red', height: '20px' }}>
          {errors.email?.message && errors.email.message}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ gridColumn: '1 / -1' }}>
        <FormLabel>Ім'я</FormLabel>
        <Input
          color={errors.name ? 'danger' : 'neutral'}
          {...register('name', { required: "Ім'я обов'язкове" })}
          id="client-name"
          type="text"
          startDecorator={<PersonIcon />}
        />
        <FormHelperText sx={{ color: 'red', height: '20px' }}>
          {errors.name?.message && errors.name.message}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ gridColumn: '1 / -1' }}>
        <FormLabel>Прізвище</FormLabel>
        <Input
          color={errors.surname1 ? 'danger' : 'neutral'}
          {...register('surname1', { required: "Прізвище обов'язкове" })}
          id="client-surname-1"
          type="text"
          startDecorator={<BadgeIcon />}
        />
        <FormHelperText sx={{ color: 'red', height: '20px' }}>
          {errors.surname1?.message && errors.surname1.message}
        </FormHelperText>
      </FormControl>

      <FormControl sx={{ gridColumn: '1 / -1' }}>
        <FormLabel>По батькові</FormLabel>
        <Input
          color={errors.surname2 ? 'danger' : 'neutral'}
          {...register('surname2')}
          id="client-surname-2"
          type="text"
          startDecorator={<PeopleIcon />}
        />
        <FormHelperText sx={{ color: 'red', height: '20px' }}>
          {errors.surname2?.message && errors.surname2.message}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Пароль</FormLabel>
        <Input
          color={errors.password ? 'danger' : 'neutral'}
          {...register('password', { required: "Пароль обов'язковий" })}
          id="client-password"
          type={!showPassword ? 'password' : 'text'}
          startDecorator={<LockIcon />}
          endDecorator={
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          }
        />
        <FormHelperText sx={{ color: 'red', height: '20px' }}>
          {errors.password?.message && errors.password.message}
        </FormHelperText>
      </FormControl>
      <Button
        type="submit"
        size="md"
        sx={{ marginBottom: '26px' }}
        loading={isPending}
      >
        Реєстрація
      </Button>
    </Form>
  );
};
