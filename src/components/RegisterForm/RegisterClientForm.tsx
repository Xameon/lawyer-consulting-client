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
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';

type RegisterClientFormType = {
  phone: string | null;
  email: string | null;
  name: string | null;
  surname1: string | null;
  surname2: string | null;
  password: string | null;
};

const defaultValues: RegisterClientFormType = {
  phone: null,
  email: null,
  name: null,
  surname1: null,
  surname2: null,
  password: null,
};

export const RegisterClientForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterClientFormType>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<RegisterClientFormType> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'end',
        columnGap: '12px',
        rowGap: '8px',
      }}
    >
      <FormControl>
        <FormLabel>Телефон</FormLabel>
        <Input
          color={errors.phone ? 'danger' : 'neutral'}
          {...register('phone', {
            required: "Номер телефону обов'язковий",
          })}
          id="client-phone"
          type="tel"
          startDecorator={<PhoneIcon />}
        />
        <FormHelperText sx={{ color: 'red', height: '20px' }}>
          {errors.phone?.message && errors.phone.message}
        </FormHelperText>
      </FormControl>
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
      <Button type="submit" size="md" sx={{ marginBottom: '26px' }}>
        Реєстрація
      </Button>
    </form>
  );
};
