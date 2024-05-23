import { useMemo } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import {
  Message as MessageT,
  MessageLite,
  ThemeStyle,
} from '../../../types/globalTypes';
import { Box, Typography, styled, useTheme } from '@mui/joy';

// ..................................................
// Styles

const MessageBox = styled(Box)<{ isMy: boolean }>(({ isMy }) => ({
  display: 'flex',
  justifyContent: isMy ? 'flex-end' : 'flex-start',
}));

const MessageStyled = styled(Box)<ThemeStyle & { isMy: boolean }>(
  ({ theme, isMy }) => ({
    backgroundColor: isMy ? theme.palette.primary[400] : undefined,
    borderRadius: `13px 13px ${!isMy ? '13px' : '0px'} ${
      isMy ? '13px' : '0px'
    }`,
    padding: '0.5rem',
    boxShadow: !isMy ? '2px 2px 5px 2px rgba(0, 0, 0, 0.1)' : undefined,
  })
);

const MessageText = styled(Typography)<{ isMy: boolean }>(({ isMy }) => ({
  color: isMy ? '#EEEEEE' : undefined,
}));

// ..................................................
// Types

type MessageProps = {
  lite?: boolean;
  message: MessageT | MessageLite;
};

export const Message = ({ lite, message }: MessageProps) => {
  // ..................................................
  // Context
  const { currentUser } = useAuth();

  // ..................................................
  // Misc Hooks

  const theme = useTheme();

  // ..................................................
  // Constants

  const isMyMessage = useMemo(() => {
    if (lite) {
      const msg = message as MessageLite;

      return !!msg.my;
    }
    const msg = message as MessageT;
    return msg.clientId === currentUser?.id || msg.lawyerId === currentUser?.id;
  }, [lite, message]);

  // ..................................................
  // Render

  return (
    <MessageBox isMy={isMyMessage}>
      <MessageStyled theme={theme} isMy={isMyMessage}>
        <MessageText isMy={isMyMessage}>{message.text}</MessageText>
      </MessageStyled>
    </MessageBox>
  );
};
