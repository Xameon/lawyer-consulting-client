import { useCallback, useEffect, useState } from 'react';
import { Search } from '../../components/Search';
import { useLawyers } from '../../hooks/user/useLawyers';
import { Box, LinearProgress, Typography, useTheme } from '@mui/joy';
import { LawyersList } from './components/LawyersList';

export const LawyersPage = () => {
  // ..................................................
  // Local States
  const [searchText, setSearchText] = useState<string>('');

  // ..................................................
  // API Hooks

  const { data, isPending } = useLawyers({ search: searchText });

  console.log({ data });

  // ..................................................
  // Misc Hooks

  const theme = useTheme();

  // ..................................................
  // Functions

  const handleChangeSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  useEffect(() => {
    document.title = 'Lawcons | Юристи';
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        height: '100%',
      }}
    >
      <Search onSubmit={handleChangeSearchText} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          padding: '1rem',
          borderRadius: '5px',
          width: '100%',
          height: '100%',
          maxWidth: '1280px',
          boxShadow: theme.shadow.lg,
        }}
      >
        {isPending ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '15rem',
              flexDirection: 'column',
              gap: '1rem',
              width: '50%',
            }}
          >
            <Typography level="h4" color="primary">
              Шукаємо...
            </Typography>
            <LinearProgress sx={{ width: '100%' }} />
          </Box>
        ) : (
          <LawyersList lawyers={data} />
        )}
      </Box>
    </Box>
  );
};
