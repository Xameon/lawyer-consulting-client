import { Box, Button, Typography } from '@mui/joy';
import { useLinkClickHandler, useParams } from 'react-router-dom';
import { useLawyerById } from '../../hooks/user/useLawyerById';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { Roles } from '../../types/globalTypes';

export const LawyerPage = () => {
  const { id } = useParams();

  const { currentUser } = useAuth();

  const { data } = useLawyerById({ id });

  const navigateToChatPage = useLinkClickHandler(`/chat/${id}`);

  useEffect(() => {
    document.title = 'Lawcons | Профіль';
  }, []);

  if (!currentUser) {
    return <Typography>Unauthorized</Typography>;
  }

  if (!id) {
    return <Typography>Params Error</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {currentUser.id === +id && (
        <Typography level="h4">Мій профіль</Typography>
      )}
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
      {currentUser.id !== +id && currentUser.role === Roles.user && (
        <Button onClick={navigateToChatPage}>Написати</Button>
      )}
    </Box>
  );
};
