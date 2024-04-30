import { User } from '../../types/globalTypes';
import { api } from './api';

// ..................................................
// #region Types

type AuthTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

// #endregion
// ..................................................

// ..................................................
// #region Sign Up

// ..................................................
// Types

type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: 'user' | 'lawyer';
};

// ..................................................
// Sign Up API Method

export const signUp = async (params: SignUpParams) => {
  const res = await api.post<AuthTokens>('/auth/sign-up', { ...params });

  return res.data;
};

// #endregion
// ..................................................

// ..................................................
// #region Auth

export const auth = async ({ accessToken, refreshToken }: AuthTokens) => {
  if (!accessToken || !refreshToken) {
    throw new Error('Null credentials');
  }

  const res = await api.get<User>('/auth', {
    headers: { Authorization: `Bearer ${accessToken} ${refreshToken}` },
  });

  return res.data;
};

// #endregion
// ..................................................

// ..................................................
// #region Refresh Auth Tokens

export const refresh = async ({ accessToken, refreshToken }: AuthTokens) => {
  if (!accessToken || !refreshToken) {
    throw new Error('Null credentials');
  }

  const res = await api.get<AuthTokens>('/auth/refresh', {
    headers: { Authorization: `Bearer ${accessToken} ${refreshToken}` },
  });

  return res.data;
};

// #endregion
// ..................................................
