import { Box, Button, Typography } from '@mui/joy';
import { useEffect } from 'react';
import { useLinkClickHandler, useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { useAuth } from '../../hooks/useAuth';

export const RegisterPage = () => {
  // ..................................................
  // Contexts

  const { currentUser } = useAuth();

  // ..................................................
  // Misc Hooks

  const navigate = useNavigate();

  // ..................................................
  // Functions
  const navigateToLoginPage = useLinkClickHandler('/login');

  // ..................................................
  // Use Effects

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser]);

  useEffect(() => {
    document.title = 'Lawcons | Реєстрація';
  });

  // ..................................................
  // Render

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RegisterForm />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Typography>Вже маєте акаунт?</Typography>
        <Button variant="outlined" onClick={navigateToLoginPage}>
          Увійти
        </Button>
      </Box>
    </Box>
  );
};
