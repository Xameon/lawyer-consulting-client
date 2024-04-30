import { useMutation } from '@tanstack/react-query';
import { refresh } from '../../api/auth/auth.api';

export const useRefreshAuthTokens = () => {
  return useMutation({
    mutationFn: refresh,
  });
};
