// ..................................................
// #region Get Lawyers List

import { Lawyer } from '../types/globalTypes';
import { api } from './api';

export type LawyersParams = {
  order?: 'ASC' | 'DESC';
  search?: string;
};

export const lawyers = async (params: LawyersParams) => {
  const res = await api.get<Lawyer[]>('/user/lawyers', { params });

  return res.data;
};

// #endregion
// ..................................................

// ..................................................
// #region Get Lawyer by ID

export const  = () => {
  
}

// #endregion
// ..................................................