import { useMutation } from '@tanstack/react-query';
import { signIn } from '../../api/auth/auth.api';

type UseSignInProps = {
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const useSignIn = ({
  setAccessToken,
  setRefreshToken,
}: UseSignInProps) => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    },
  });
};
