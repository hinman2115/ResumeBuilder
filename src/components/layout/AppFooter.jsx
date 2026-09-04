import { useLocation } from 'react-router-dom';
import { Footer as ResumeFooter } from './Footer';
import { FileForgeFooter } from './FileForgeFooter';

/**
 * AppFooter dynamically switches between the ResumeForge and FileForge footers
 * based on the active URL route.
 */
export const AppFooter = () => {
  const location = useLocation();
  const isFileProduct = location.pathname.startsWith('/file-tools');

  if (isFileProduct) {
    return <FileForgeFooter />;
  }

  return <ResumeFooter />;
};
