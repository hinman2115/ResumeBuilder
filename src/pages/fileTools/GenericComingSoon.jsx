import { useParams, Navigate } from 'react-router-dom';
import { getToolBySlug } from '../../data/fileTools';
import { ComingSoonTool } from '../../components/fileTools/ComingSoonTool';

export const GenericComingSoon = ({ toolSlug }) => {
  const params = useParams();
  const slug = toolSlug || params.toolSlug;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return <Navigate to="/file-tools" replace />;
  }

  return <ComingSoonTool tool={tool} />;
};

