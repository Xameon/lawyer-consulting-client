import { createContext, useEffect, useMemo, useState } from 'react';
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refreshToken')
  );

  const queryClient = useQueryClient();

  const { data: userData } = useGetUser({
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
  });

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
    } else {
      setCurrentUser(null);
    }
  }, [userData]);

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken ?? '');
    localStorage.setItem('refreshToken', refreshToken ?? '');

    queryClient.invalidateQueries({ queryKey: ['auth'] });
  }, [accessToken, refreshToken]);

  const values = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// #endregion
// ..................................................
