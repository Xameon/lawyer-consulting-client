import { Box, Button, styled, useTheme } from '@mui/joy';
import { useLinkClickHandler } from 'react-router-dom';
import { ThemeStyle } from '../../types/globalTypes';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SideMenuBox = styled(Box)<ThemeStyle>(({ theme }) => ({
  height: '100%',
  width: '15rem',
  padding: '1rem',
  borderRadius: '0 3px 3px 0',
  backgroundColor: theme.palette.primary[700],
  color: theme.palette.neutral[100],
}));

export const SideMenu = () => {
  const theme = useTheme();

  const handleNavigateToLoginPage = useLinkClickHandler('login');

  return (
    <SideMenuBox theme={theme}>
      <Button
        variant="soft"
        sx={{ display: 'flex', justifyContent: 'flex-start' }}
        fullWidth
        startDecorator={<AccountCircleIcon />}
        onClick={handleNavigateToLoginPage}
      >
        Увійти в акаунт
      </Button>
    </SideMenuBox>
  );
};
