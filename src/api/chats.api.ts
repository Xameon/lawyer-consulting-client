import { Chat, ChatMetadata } from '../types/globalTypes';
import { api } from './api';

export const getChats = async () => {
  const res = await api.get<ChatMetadata[]>('/chat');

  return res.data;
};

type GetChatParams = {
  id: string;
};

export const getChat = async ({ id }: GetChatParams) => {
  const res = await api.get<Chat>(`/chat/${id}`);

  return res.data;
};
