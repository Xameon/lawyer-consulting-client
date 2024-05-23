import { useQuery } from '@tanstack/react-query';
import { getChats } from '../../api/chats.api';

export const useChatsAll = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: getChats,
  });
};
