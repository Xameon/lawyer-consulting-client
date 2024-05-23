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

export enum Roles {
  user = 'user',
  lawyer = 'lawyer',
}

export type User = {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: Roles;
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

export type MessageLite = {
  authorId: number;
  text: string;
  my?: boolean;
};

export type ChatMetadata = {
  clientId: number;
  created_at: string;
  id: number;
  lawyerId: number;
  status: string;
  subject: string;
  updated_at: string;
};

export type Message = {
  chatId: number;
  clientId: number;
  created_at: string;
  id: number;
  lawyerId: number;
  text: string;
  updated_at: string;
};

export type Chat = {
  id: number;
  text: string;
  chatId: number;
  lawyerId: number;
  clientId: number;
  created_at: string;
  updated_at: string;
  message: Message[];
};
