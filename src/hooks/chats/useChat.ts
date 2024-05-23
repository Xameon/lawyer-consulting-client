import { useQuery } from '@tanstack/react-query';
import { getChat } from '../../api/chats.api';

type UseChatParams = {
  id: string;
};

export const useChat = ({ id }: UseChatParams) => {
  return useQuery({
    queryKey: ['chat', id],
    queryFn: () => getChat({ id }),
  });
};
