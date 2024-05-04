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
