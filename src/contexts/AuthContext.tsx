import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from '../types/globalTypes';
import { useGetUser } from '../hooks/auth/useUserAuth';
import { useQueryClient } from '@tanstack/react-query';

// ..................................................
// #region Auth Context

// ..................................................
// Types

type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  refreshToken: string | null;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
};

// ..................................................
// Auth Context

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => null,
  refreshToken: null,
  setRefreshToken: () => null,
  currentUser: null,
  setCurrentUser: () => null,
  logout: () => null,
});

// #endregion
// ..................................................

// ..................................................
// #region Auth Provider

// ..................................................
// Types

type AuthProviderProps = {
  children: React.ReactNode;
};

// ..................................................
// Auth Provider

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // ..................................................
  // Local States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refreshToken')
  );

  // ..................................................
  // API Hooks

  const { data: userData } = useGetUser({
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
  });

  // ..................................................
  // Misc Hooks

  const queryClient = useQueryClient();

  // ..................................................
  // Functions

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
  }, []);

  // ..................................................
  // Use Effects

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
    } else {
      setCurrentUser(null);
    }
  }, [userData]);

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      queryClient.invalidateQueries({ queryKey: ['auth'] });
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }, [accessToken, refreshToken]);

  const values = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
      logout,
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// #endregion
// ..................................................
