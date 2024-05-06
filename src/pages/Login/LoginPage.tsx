import { Box, Button, Typography } from '@mui/joy';
import { LoginForm } from '../../components/auth/LoginForm';
import { useLinkClickHandler, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const LoginPage = () => {
  // ..................................................
  // Functions
  const navigateToRegisterPage = useLinkClickHandler('/register');

  // ..................................................
  // Contexts

  const { currentUser } = useAuth();

  // ..................................................
  // Misc Hooks

  const navigate = useNavigate();

  // ..................................................
  // Use Effects

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
      location.reload();
    }
  }, [currentUser]);

  useEffect(() => {
    document.title = 'Lawcons | Вхід';
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Typography>Немає акаунта?</Typography>
        <Button variant="outlined" onClick={navigateToRegisterPage}>
          Зареєструватися
        </Button>
      </Box>
    </Box>
  );
};
