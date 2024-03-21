import { Box, Button, Tab, TabList, Tabs, Typography } from '@mui/joy';
import { useEffect } from 'react';
import {
  Outlet,
  useLinkClickHandler,
  useNavigate,
  useParams,
} from 'react-router-dom';

export const RegisterPage = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  const handleNavigateToLoginPage = useLinkClickHandler('/login');

  useEffect(() => {
    document.title = 'Lawcons | Реєстрація';
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tabs value={userType}>
        <TabList>
          <Tab value="client">
            <Typography onClick={() => navigate('client')}>Клієнт</Typography>
          </Tab>
          <Tab value="lawyer">
            <Typography onClick={() => navigate('lawyer')}>Юрист</Typography>
          </Tab>
        </TabList>
      </Tabs>
      <Outlet />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Typography>Вже маєте акаунт?</Typography>
        <Button variant="outlined" onClick={handleNavigateToLoginPage}>
          Увійти
        </Button>
      </Box>
    </Box>
  );
};
