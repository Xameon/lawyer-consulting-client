import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../api/auth.api';

type UseSignUpProps = {
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const useSignUp = ({
  setAccessToken,
  setRefreshToken,
}: UseSignUpProps) => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    },
  });
};
