import { Outlet } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <h1>Header</h1>
      <Outlet />
    </>
  );
};
