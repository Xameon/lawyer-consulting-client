import { Box, Button, IconButton, Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useCallback, useEffect, useState } from 'react';

type SearchProps = {
  onSubmit: (searchText: string) => void;
};

export const Search = ({ onSubmit }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleChangeSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onSubmit(searchText);
    },
    [searchText]
  );

  useEffect(() => {
    if (!searchText) onSubmit(searchText);
  }, [searchText]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          width: '50%',
          minWidth: '30rem',
          maxWidth: '40rem',
        }}
      >
        <Input
          placeholder="Пошук"
          onChange={handleChangeSearchText}
          fullWidth
          endDecorator={
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          }
        />
        <Button endDecorator={<FilterListIcon />}>Фільтр</Button>
      </Box>
    </form>
  );
};
