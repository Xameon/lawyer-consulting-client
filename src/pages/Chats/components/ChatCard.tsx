import { Box, Button, Typography } from '@mui/joy';
import { ChatMetadata, Roles } from '../../../types/globalTypes';
import { useLinkClickHandler } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

type ChatCardProps = {
  chat: ChatMetadata;
};

export const ChatCard = ({ chat }: ChatCardProps) => {
  const { currentUser } = useAuth();
  const navigateToChat = useLinkClickHandler(
    `/chat/${
      currentUser?.role === Roles.lawyer ? chat.clientId : chat.lawyerId
    }?chatId=${chat.id}`
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderRadius: '5px',
        boxShadow: '2px 2px 5px 2px rgba(0, 0, 0, 0.2)',
      }}
      key={chat.id}
    >
      <Typography>
        {currentUser?.role === Roles.user ? chat.lawyerId : chat.clientId}
      </Typography>
      <Button size="sm" onClick={navigateToChat}>
        Open
      </Button>
    </Box>
  );
};
