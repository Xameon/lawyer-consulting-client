import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
} from '@mui/joy';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../hooks/useAuth';
import { useSignIn } from '../hooks/auth/useSignIn';

type LoginFormType = {
  email: string;
  password: string;
};

const defaultValues: LoginFormType = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  // ..................................................
  // Local States
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // ..................................................
  // Contexts

  const { setAccessToken, setRefreshToken } = useAuth();

  // ..................................................
  // API Hooks

  const { mutate: signIn } = useSignIn({ setAccessToken, setRefreshToken });

  // ..................................................
  // Misc Hooks

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    signIn(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '20rem',
      }}
    >
      <FormControl>
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
      <Button type="submit" size="md" sx={{ marginBottom: '26px' }}>
        Увійти
      </Button>
    </form>
  );
};
