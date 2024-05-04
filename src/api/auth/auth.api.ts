import { AuthTokens, User } from '../../types/globalTypes';
import { api } from './api';

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
// #region Sign In

// ..................................................
// Types

type SignInParams = {
  email: string;
  password: string;
};

// ..................................................
// Sign In API Method

export const signIn = async (params: SignInParams) => {
  const res = await api.post<AuthTokens>('/auth/sign-in', { ...params });

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
