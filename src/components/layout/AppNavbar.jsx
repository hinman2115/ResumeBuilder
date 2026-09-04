import { useLocation } from 'react-router-dom';
import { Navbar as ResumeNavbar } from './Navbar';
import { FileForgeNavbar } from './FileForgeNavbar';

/**
 * AppNavbar dynamically switches between the ResumeForge and FileForge navigation bars
 * based on the active URL route.
 */
export const AppNavbar = () => {
  const location = useLocation();
  const isFileProduct = location.pathname.startsWith('/file-tools');

  if (isFileProduct) {
    return <FileForgeNavbar />;
  }

  return <ResumeNavbar />;
};
