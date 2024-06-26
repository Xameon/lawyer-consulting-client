import { Outlet } from 'react-router-dom';
import { SideMenu } from './components/SideMenu';
import { Box } from '@mui/joy';

export const App = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '15rem auto',
        height: '100vh',
        width: '100%',
      }}
    >
      <SideMenu />
      <Box sx={{ padding: '1rem', maxHeight: '100vh' }}>
        <Outlet />
      </Box>
    </Box>
  );
};
