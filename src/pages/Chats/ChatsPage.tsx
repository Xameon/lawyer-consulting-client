import { Box, Typography } from '@mui/joy';
import { useChatsAll } from '../../hooks/chats/useChatsAll';
import { ChatCard } from './components/ChatCard';

export const ChatsPage = () => {
  // ..................................................
  // API Hooks

  const { data: chatsList, isLoading: chatsLoading } = useChatsAll();

  console.log({ chatsList });

  return chatsLoading ? (
    <Typography>Loading</Typography>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {chatsList ? (
        chatsList.map((chat) => <ChatCard key={chat.id} chat={chat} />)
      ) : (
        <Typography>Error</Typography>
      )}
    </Box>
  );
};
