import { Box, Button, Modal, Typography, useTheme } from '@mui/joy';
import { useLinkClickHandler, useParams } from 'react-router-dom';
import { useLawyerById } from '../../hooks/user/useLawyerById';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Roles } from '../../types/globalTypes';
import { DataEditorModal } from './components/DataEditorModal';

export const LawyerPage = () => {
  const [dataEditorOpened, setDataEditorOpened] = useState<boolean>(false);

  const { id } = useParams();

  const { currentUser } = useAuth();

  const { data } = useLawyerById({ id });

  const navigateToChatPage = useLinkClickHandler(`/chat/${id}`);

  const theme = useTheme();

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
        gap: '1rem',
        padding: '1rem',
        width: '100%',
        maxWidth: '720px',
        mx: 'auto',
        borderRadius: '9px',
        boxShadow: '2px 2px 5px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      {currentUser.id === +id && (
        <Typography level="h2">Мій профіль</Typography>
      )}
      <Typography level="h3">{`${data?.firstName} ${data?.lastName} ${
        data?.middleName ?? ''
      }`}</Typography>
      <Typography level="h3">{data?.email}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {!data?.lawyer ? (
          currentUser.id === +id ? (
            <>
              <Typography color="danger">
                Ваш профіль порожній, будь ласка заповніть його
              </Typography>
              <DataEditorModal />
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '1rem',
                borderRadius: '9px',
                border: `2px dashed ${theme.palette.danger[400]}`,
              }}
            >
              <Typography color="danger" level="h4" textAlign="center">
                Профіль даного юриста ще не заповнений
              </Typography>
              <Typography color="danger" level="body-lg" textAlign="center">
                Можливо, краще пошукати іншого
              </Typography>
            </Box>
          )
        ) : (
          <>
            <Typography>{data?.lawyer.description}</Typography>
            <Typography level="h4">
              Заклад освіти: {data?.lawyer.education}
            </Typography>
            <Typography level="h4">
              Досвід роботи у роках: {data?.lawyer.experience}
            </Typography>
            <Typography level="h4">
              Ціна консультації: {data?.lawyer.hourly_rate}₴
            </Typography>
          </>
        )}
      </Box>
      {currentUser.id !== +id && currentUser.role === Roles.user && (
        <Button onClick={navigateToChatPage}>Написати</Button>
      )}
    </Box>
  );
};
