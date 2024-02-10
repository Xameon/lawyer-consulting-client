import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from './pages/Main/MainPage';
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { Header } from './components/Header/Header';
import { RegisterForm } from './components/RegisterForm/RegisterForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
        children: [
          {
            path: ':userType',
            element: <RegisterForm />,
          },
        ],
      },
    ],
  },
]);
