import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { MainPage } from './pages/Main';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { LawyersPage } from './pages/Lawyers';
import { LawyerPage } from './pages/Lawyer';

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
    ],
  },
]);
