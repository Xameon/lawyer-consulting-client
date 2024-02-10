import { Box, Tab, TabList, Tabs, Typography } from '@mui/joy';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const RegisterPage = () => {
  const { userType } = useParams();
  const navigate = useNavigate();

  console.log({ userType });

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
    </Box>
  );
};
