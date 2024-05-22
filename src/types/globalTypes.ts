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
  phone: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: 'lawyer';
  avatar: string;
};

export type Lawyer = User & {
  lawyer: {
    education: string;
    experience: string;
    description: string;
    hourly_rate: number;
    created_at: string;
    updated_at: string;
  } | null;
};

export enum Roles {
  user = 'user',
  lawyer = 'lawyer',
}
