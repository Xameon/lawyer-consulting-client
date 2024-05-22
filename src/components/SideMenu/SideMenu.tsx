import { Box, Button, Link, styled, useTheme } from '@mui/joy';
import { useLinkClickHandler } from 'react-router-dom';
import { Roles, ThemeStyle } from '../../types/globalTypes';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useAuth } from '../../hooks/useAuth';

// ..................................................
// Styles

const SideMenuBox = styled(Box)<ThemeStyle>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  width: '15rem',
  padding: '1rem',
  borderRadius: '0 3px 3px 0',
  backgroundColor: theme.palette.primary[700],
  color: theme.palette.neutral[100],
}));

const SideMenuUpper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
});

const SideMenuLower = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: '1rem',
});

const LawconsLink = styled(Link)<ThemeStyle>(({ theme }) => ({
  color: theme.palette.neutral[200],
  transition: '0.1s linear',
  ':hover': {
    color: theme.palette.neutral[100],
  },
}));

const LinksListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '100%',
});

export const SideMenu = () => {
  // ..................................................
  // Global States

  const { currentUser, logout } = useAuth();

  console.log({ currentUser });

  // ..................................................
  // Misc Hooks

  const theme = useTheme();

  // ..................................................
  // Functions

  const navigateToMainPage = useLinkClickHandler('/');
  const navigateToLoginPage = useLinkClickHandler('/login');
  const navigateToLawyersPage = useLinkClickHandler('/lawyers');
  const navigateToProfilePage = useLinkClickHandler(
    `/lawyer/${currentUser?.id}`
  );

  // ..................................................
  // Render

  return (
    <SideMenuBox theme={theme}>
      <SideMenuUpper>
        <LawconsLink
          theme={theme}
          href="/"
          underline="none"
          onClick={navigateToMainPage}
          level="h2"
        >
          Lawcons
        </LawconsLink>
        <LinksListContainer>
          {currentUser?.role === Roles.lawyer && (
            <Button
              variant="soft"
              fullWidth
              size="sm"
              startDecorator={<AccountBoxIcon />}
              onClick={navigateToProfilePage}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              Профіль
            </Button>
          )}
          <Button
            variant="soft"
            fullWidth
            size="sm"
            startDecorator={<SchoolIcon />}
            onClick={navigateToLawyersPage}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            Юристи
          </Button>
          <Button
            variant="soft"
            fullWidth
            size="sm"
            startDecorator={<ChatIcon />}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            Чати
          </Button>
        </LinksListContainer>
      </SideMenuUpper>

      <SideMenuLower>
        <Button
          fullWidth
          startDecorator={currentUser ? <LogoutIcon /> : <LoginIcon />}
          onClick={currentUser ? logout : navigateToLoginPage}
        >
          {currentUser ? 'Вийти з акаунту' : 'Увійти в акаунт'}
        </Button>
      </SideMenuLower>
    </SideMenuBox>
  );
};
