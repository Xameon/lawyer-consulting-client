import { Theme } from '@mui/joy';

export type ThemeStyle = {
  theme: Theme;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthTokensNullable = {
  accessToken: string | null;
  refreshToken: string | null;
};

export type User = {
  id: number;
  email: string;
  avatar: string;
};

export type Lawyer = {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: 'lawyer';
  avatar: string;
};
