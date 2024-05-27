import { api } from './api';

type LawyerCreateOrUpdateParams = {
  education: string;
  experience: string;
  description: string;
  hourly_rate: string;
};

export const lawyerCreateOrUpdate = async (
  params: LawyerCreateOrUpdateParams
) => {
  const res = await api.post('/lawyer', { ...params });

  return res.data;
};
