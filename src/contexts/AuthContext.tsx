import { createContext, useEffect, useMemo, useState } from 'react';
import { User } from '../types/globalTypes';
import { useGetUser } from '../hooks/auth/useGetUser';
import { useRefreshAuthTokens } from '../hooks/auth/useRefreshAuthTokens';

// ..................................................
// Types

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  refreshToken: string | null;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

// ..................................................
// Default Values

const authContextDefaultFields = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

// ..................................................
// Auth Context

export const AuthContext = createContext<AuthContextType>({
  accessToken: authContextDefaultFields.accessToken,
  setAccessToken: () => null,
  refreshToken: authContextDefaultFields.refreshToken,
  setRefreshToken: () => null,
  currentUser: authContextDefaultFields.user,
  setCurrentUser: () => null,
});

// ..................................................
// Auth Provider

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refreshToken')
  );
  const [currentUser, setCurrentUser] = useState<User | null>(
    authContextDefaultFields.user
  );

  const { mutate: auth } = useGetUser();

  useEffect(() => {
    auth({ accessToken, refreshToken });
  }, []);

  const values = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
      currentUser,
      setCurrentUser,
    }),
    [accessToken, currentUser, refreshToken]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
