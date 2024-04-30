import { useMutation } from '@tanstack/react-query';
import { auth } from '../../api/auth/auth.api';
import { useRefreshAuthTokens } from './useRefreshAuthTokens';

export const useGetUser = () => {
  const { mutate: refresh } = useRefreshAuthTokens();

  return useMutation({
    mutationFn: auth,
    onSuccess: () => null,
    onError: (_, authTokens) => {
      refresh(authTokens);
    },
  });
};
