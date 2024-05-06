import { useQuery } from '@tanstack/react-query';
import { auth, refresh } from '../../api/auth.api';
import { AuthTokensNullable } from '../../types/globalTypes';

type UseGetUserProps = AuthTokensNullable & {
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const useGetUser = ({
  accessToken,
  refreshToken,
  setAccessToken,
  setRefreshToken,
}: UseGetUserProps) => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      if (!accessToken || !refreshToken) {
        console.log('No auth');
        return null;
      }
      return auth({ accessToken, refreshToken })
        .then((u) => u)
        .catch(() => {
          refresh({ accessToken, refreshToken })
            .then((freshTokens) => {
              setAccessToken(freshTokens.accessToken);
              setRefreshToken(freshTokens.refreshToken);
            })
            .catch(() => console.log('AUTH FAILED'));
          return null;
        });
    },
  });
};
