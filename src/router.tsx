import { Navigate, createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { MainPage } from './pages/Main';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { LawyersPage } from './pages/Lawyers';
import { LawyerPage } from './pages/Lawyer';
import { ChatsPage } from './pages/Chats';
import { ChatPage } from './pages/Chat';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'lawyers',
        element: <LawyersPage />,
      },
      {
        path: 'lawyer/:id',
        element: <LawyerPage />,
      },
      {
        path: 'chats',
        element: <ChatsPage />,
      },
      {
        path: 'chat',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'chat/:id',
        element: <ChatPage />,
      },
    ],
  },
]);
