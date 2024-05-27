import { useMutation } from '@tanstack/react-query';
import { lawyerCreateOrUpdate } from '../../api/lawyer.api';

export const useLawyerCreateOrUpdate = () => {
  return useMutation({
    mutationFn: lawyerCreateOrUpdate,
  });
};
