import { Box, Button, Link, Typography, styled, useTheme } from '@mui/joy';
import { useLinkClickHandler } from 'react-router-dom';
import { ThemeStyle } from '../../types/globalTypes';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../hooks/useAuth';

// ..................................................
// Styles

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
  // ..................................................
  // Global States

  const { currentUser, logout } = useAuth();

  // ..................................................
  // Misc Hooks

  const theme = useTheme();

  // ..................................................
  // Functions

  const handleNavigateToLoginPage = useLinkClickHandler('/login');
  const handleNavigateToMainPage = useLinkClickHandler('/');

  // ..................................................
  // Render

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: '1rem',
        }}
      >
        <Typography level="h4" color={currentUser ? 'success' : 'danger'}>
          {currentUser?.email ?? 'Unauthorized'}
        </Typography>
        <Button
          variant="soft"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignSelf: 'end',
          }}
          fullWidth
          startDecorator={<AccountCircleIcon />}
          onClick={currentUser ? logout : handleNavigateToLoginPage}
        >
          {currentUser ? 'Вийти з акаунту' : 'Увійти в акаунт'}
        </Button>
      </Box>
    </SideMenuBox>
  );
};
