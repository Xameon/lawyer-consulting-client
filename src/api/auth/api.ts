import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({ baseURL });

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorStatus = error.response?.status;

    if (errorStatus === 401) {
      try {
      } catch (error) {}
    }
  }
);
