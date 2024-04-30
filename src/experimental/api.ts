import axios, { AxiosInstance } from 'axios';

const universitiesApiUrl = 'https://registry.edbo.gov.ua/api';

console.log({ universitiesApiUrl });

export const universitiesApi: AxiosInstance = axios.create({
  baseURL: universitiesApiUrl,
});
