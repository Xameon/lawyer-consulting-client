import { useQuery } from '@tanstack/react-query';
import { LawyersParams, lawyers } from '../../api/user.api';

export const useLawyers = (params: LawyersParams) => {
  return useQuery({
    queryKey: ['lawyers', params],
    queryFn: () => lawyers(params),
  });
};
