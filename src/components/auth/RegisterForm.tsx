import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Input,
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
import { Form } from './styles';

// ..................................................
// Types

type RegisterClientFormType = {
  email: string;
  name: string;
  surname1: string;
  surname2: string;
  password: string;
  role: 'user' | 'lawyer';
};

// ..................................................
// Default Values

const defaultValues: RegisterClientFormType = {
  email: '',
  name: '',
  surname1: '',
  surname2: '',
  password: '',
  role: 'user',
};

/**
 * Form for register user
 */

export const RegisterForm = () => {
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
    setValue,
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
      role,
    } = data;

    signUp({
      email,
      firstName,
      lastName,
      middleName,
      password,
      role,
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
          {...register('email', { required: true })}
          id="client-email"
          type="email"
          startDecorator={<EmailIcon />}
        />
      </FormControl>
      <FormControl sx={{ gridColumn: '1 / -1' }}>
        <FormLabel>Ім'я</FormLabel>
        <Input
          color={errors.name ? 'danger' : 'neutral'}
          {...register('name', { required: true })}
          id="client-name"
          type="text"
          startDecorator={<PersonIcon />}
        />
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
      </FormControl>
      <FormControl>
        <Checkbox
          label="Юрист"
          size="sm"
          onChange={(e) => {
            const { checked } = e.target;
            setValue('role', checked ? 'lawyer' : 'user');
          }}
        />
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
