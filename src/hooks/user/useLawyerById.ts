import { useQuery } from '@tanstack/react-query';
import { LawyerByIdParams, lawyerById } from '../../api/user.api';

type UseLawyerByIdParams = Partial<LawyerByIdParams>;

export const useLawyerById = (params: UseLawyerByIdParams) => {
  return useQuery({
    queryKey: ['lawyer', 'by', 'id', params],
    queryFn: () => lawyerById(params),
  });
};
