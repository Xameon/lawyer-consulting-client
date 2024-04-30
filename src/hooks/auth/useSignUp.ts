import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../../api/auth/auth.api';
import { useAuth } from '../useAuth';

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setRefreshToken } = useAuth();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['auth'], refetchType: 'all' });
    },
  });
};
