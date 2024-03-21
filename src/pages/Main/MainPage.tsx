import { Typography } from '@mui/joy';
import { useEffect } from 'react';

export const MainPage = () => {
  useEffect(() => {
    document.title = 'Lawcons | Сервіс юридичних консультацій онлайн';
  }, []);

  return <Typography level="h1">Main</Typography>;
};
