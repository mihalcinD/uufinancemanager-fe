import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';
import AuthorizedContextsContainer from '../context/AuthorizedContextsContainer.tsx';

const Layout = () => {
  return (
    <AuthorizedContextsContainer>
      <Header />
      <Sidebar />
      <Outlet />
    </AuthorizedContextsContainer>
  );
};

export default Layout;
