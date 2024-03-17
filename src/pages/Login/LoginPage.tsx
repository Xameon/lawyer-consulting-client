import { Box, Button, Typography } from '@mui/joy';
import { LoginForm } from '../../components/LoginForm';
import { useLinkClickHandler } from 'react-router-dom';

export const LoginPage = () => {
  const handleNavigateToRegisterPage = useLinkClickHandler('/register/client');

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
        <Button variant="outlined" onClick={handleNavigateToRegisterPage}>
          Зареєструватися
        </Button>
      </Box>
    </Box>
  );
};
