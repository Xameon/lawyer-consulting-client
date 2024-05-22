// ..................................................
// #region Get Lawyers List

import { Lawyer, User } from '../types/globalTypes';
import { api } from './api';

export type LawyersParams = {
  order?: 'ASC' | 'DESC';
  search?: string;
};

export const lawyers = async (params: LawyersParams) => {
  const res = await api.get<User[]>('/user/lawyers', { params });

  return res.data;
};

// #endregion
// ..................................................

// ..................................................
// #region Get Lawyer by ID

export type LawyerByIdParams = {
  id?: string;
};

export const lawyerById = async ({ id }: LawyerByIdParams) => {
  if (!id) {
    throw new Error('Invalid URL');
  }

  const res = await api.get<Lawyer>(`/user/lawyer/${id}`);

  return res.data;
};

// #endregion
// ..................................................
