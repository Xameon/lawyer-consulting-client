import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Typography,
  CircularProgress,
  useTheme,
  styled,
  Textarea,
  IconButton,
} from '@mui/joy';
import { useAuth } from '../../hooks/useAuth';
import { Chat, MessageLite, ThemeStyle } from '../../types/globalTypes';
import { useParams, useSearchParams } from 'react-router-dom';
import { useChat } from '../../hooks/chats/useChat';
import { Message } from './components/Message';

// ..................................................
// Styles

const ChatContainer = styled(Box)<ThemeStyle>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflowY: 'scroll',
  gap: '0.5rem',
  padding: '1rem',
  border: `2px solid ${theme.palette.primary[400]}`,
  borderRadius: '9px',

  '::-webkit-scrollbar': {
    width: '12px',
  },

  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.neutral[400],
    borderRadius: '6px',
    border: '3px solid #fff',
  },

  '::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '6px',
  },

  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.primary[700],
  },
}));

export const ChatPage = () => {
  // ..................................................
  // Local States
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messageQueue, setMessageQueue] = useState<MessageLite[]>([]);
  const [messages, setMessages] = useState<MessageLite[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Chat | null>(null);

  const chatBoxRef = useRef<HTMLDivElement>(null);

  // ..................................................
  // Misc Hooks

  const params = useParams();
  const id = params.id as string;

  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId');

  const { accessToken, currentUser } = useAuth();

  const theme = useTheme();

  if (!id || !currentUser) {
    return <Typography>Error</Typography>;
  }

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:3001?token=${accessToken}`);

    socket.onopen = () => {
      console.log('Connected to the WebSocket server');
      setIsConnected(true);
      while (messageQueue.length > 0) {
        const message = messageQueue.shift();

        socket.send(JSON.stringify(message));
      }
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data) as MessageLite;

      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onclose = () => {
      console.log('Disconnected from the WebSocket server');
      setIsConnected(false);
    };

    socket.onerror = (e) => {
      console.error(`WebSocket error: ${e}`);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [messageQueue]);

  // ..................................................
  // API Hooks

  const { mutateAsync: getChatHistory, isPending: chatLoading } = useChat();

  useEffect(() => {
    if (chatId) {
      getChatHistory({ id: chatId }).then((data) => {
        setChatHistory(data);
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, chatHistory]);

  if (chatLoading) {
    return <CircularProgress />;
  }

  const sendMessage = (message: MessageLite) => {
    if (isConnected) {
      ws?.send(JSON.stringify(message));
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, my: true },
      ]);
    } else {
      setMessageQueue((prevQueue) => [...prevQueue, { ...message, my: true }]);
    }
  };

  const handleSendMessage = () => {
    const message = { text: inputMessage, authorId: +id };
    sendMessage(message);
    setInputMessage('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
        width: '100%',
        maxWidth: '720px',
        mx: 'auto',
        height: '100%',
      }}
    >
      <Typography level="h2" textAlign="center">
        Чат
      </Typography>
      <ChatContainer theme={theme} ref={chatBoxRef}>
        {chatHistory?.message.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {messages.map((msg, idx) => (
          <Message key={idx} message={msg} lite />
        ))}
      </ChatContainer>
      <form
        style={{
          display: 'flex',
          alignItems: 'end',
          maxWidth: '720px',
          gap: '1rem',
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Textarea
          placeholder="Повідомлення"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          sx={{ flexGrow: 1 }}
          size="md"
          maxRows={5}
        />
        <IconButton
          color="primary"
          size="md"
          onClick={handleSendMessage}
          type="submit"
        >
          <SendIcon />
        </IconButton>
      </form>
    </Box>
  );
};
