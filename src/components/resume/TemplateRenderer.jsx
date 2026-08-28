import { ModernTemplate } from '../../templates/ModernTemplate';
import { ProfessionalTemplate } from '../../templates/ProfessionalTemplate';
import { MinimalTemplate } from '../../templates/MinimalTemplate';

export const TemplateRenderer = ({ data }) => {
  switch (data?.template) {
    case 'professional':
      return <ProfessionalTemplate data={data} />;
    case 'minimal':
      return <MinimalTemplate data={data} />;
    case 'modern':
    default:
      return <ModernTemplate data={data} />;
  }
};

