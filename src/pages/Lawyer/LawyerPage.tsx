import { Box, Typography } from '@mui/joy';
import { useParams } from 'react-router-dom';
import { useLawyerById } from '../../hooks/user/useLawyerById';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

export const LawyerPage = () => {
  const { id } = useParams();

  const { currentUser } = useAuth();

  const { data } = useLawyerById({ id });

  useEffect(() => {
    document.title = 'Lawcons | Профіль';
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {currentUser?.id == id && <Typography level="h4">Мій профіль</Typography>}
      <Typography>{`${data?.firstName} ${data?.lastName}`}</Typography>
      <Typography>{data?.email}</Typography>
      <Box>
        {!data?.lawyer ? (
          <Typography color="danger">Empty Profile</Typography>
        ) : (
          <>
            <Typography>{data?.lawyer.description}</Typography>
            <Typography>{data?.lawyer.education}</Typography>
            <Typography>{data?.lawyer.experience}</Typography>
            <Typography>{data?.lawyer.hourly_rate}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
};
