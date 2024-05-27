import { useMutation } from '@tanstack/react-query';
import { getChat } from '../../api/chats.api';

export const useChat = () => {
  return useMutation({
    mutationFn: getChat,
  });
};
