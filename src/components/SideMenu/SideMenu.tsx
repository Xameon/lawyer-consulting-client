import { Box, Button, Link, styled, useTheme } from '@mui/joy';
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
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
}));

export const SideMenu = () => {
  const theme = useTheme();

  const handleNavigateToLoginPage = useLinkClickHandler('/login');
  const handleNavigateToMainPage = useLinkClickHandler('/');

  return (
    <SideMenuBox theme={theme}>
      <Link
        href="/"
        underline="none"
        onClick={handleNavigateToMainPage}
        level="h2"
        sx={{
          justifySelf: 'center',
          alignSelf: 'start',
          color: theme.palette.neutral[200],
          transition: '0.2s linear',
          ':hover': {
            color: theme.palette.neutral[100],
          },
        }}
      >
        Lawcons
      </Link>
      <Button
        variant="soft"
        sx={{ display: 'flex', justifyContent: 'flex-start', alignSelf: 'end' }}
        fullWidth
        startDecorator={<AccountCircleIcon />}
        onClick={handleNavigateToLoginPage}
      >
        Увійти в акаунт
      </Button>
    </SideMenuBox>
  );
};
