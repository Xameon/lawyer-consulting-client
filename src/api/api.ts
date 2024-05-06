import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const [accessToken, refreshToken] = [
  localStorage.getItem('accessToken'),
  localStorage.getItem('refreshToken'),
];

export const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken} ${refreshToken}`,
    'Content-Type': 'application/json',
  },
});
