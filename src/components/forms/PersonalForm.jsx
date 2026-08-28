import { User, Mail, Phone, MapPin, Globe, Briefcase } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '../common/Icons';
import { useResume } from '../../hooks/useResume';
import { FormSection } from './FormSection';
import { Input } from '../common/Input';
import { validatePersonal } from '../../utils/validation';

export const PersonalForm = () => {
  const { resumeData, updatePersonal } = useResume();
  const { personal } = resumeData;

  const errors = validatePersonal(personal);

  return (
    <FormSection
      title="Personal Information"
      subtitle="Your contact details and online presence"
      icon={<User className="w-5 h-5" />}
      defaultOpen={true}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          required
          placeholder="e.g. Alex Morgan"
          value={personal.fullName}
          onChange={e => updatePersonal({ fullName: e.target.value })}
          error={errors.fullName}
          icon={<User className="w-4 h-4" />}
        />

        <Input
          label="Professional Title"
          placeholder="e.g. Senior Full Stack Engineer"
          value={personal.title}
          onChange={e => updatePersonal({ title: e.target.value })}
          icon={<Briefcase className="w-4 h-4" />}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. alex.morgan@example.com"
          value={personal.email}
          onChange={e => updatePersonal({ email: e.target.value })}
          error={errors.email}
          icon={<Mail className="w-4 h-4" />}
        />

        <Input
          label="Phone Number"
          placeholder="e.g. +1 (555) 234-5678"
          value={personal.phone}
          onChange={e => updatePersonal({ phone: e.target.value })}
          icon={<Phone className="w-4 h-4" />}
        />

        <div className="sm:col-span-2">
          <Input
            label="Location"
            placeholder="e.g. San Francisco, CA"
            value={personal.location}
            onChange={e => updatePersonal({ location: e.target.value })}
            icon={<MapPin className="w-4 h-4" />}
          />
        </div>

        <Input
          label="LinkedIn Profile"
          placeholder="e.g. linkedin.com/in/alexmorgan"
          value={personal.linkedin}
          onChange={e => updatePersonal({ linkedin: e.target.value })}
          error={errors.linkedin}
          icon={<LinkedInIcon className="w-4 h-4 text-slate-400" />}
        />

        <Input
          label="GitHub Profile"
          placeholder="e.g. github.com/alexmorgan"
          value={personal.github}
          onChange={e => updatePersonal({ github: e.target.value })}
          error={errors.github}
          icon={<GitHubIcon className="w-4 h-4 text-slate-400" />}
        />

        <div className="sm:col-span-2">
          <Input
            label="Portfolio / Website URL"
            placeholder="e.g. alexmorgan.tech"
            value={personal.portfolio}
            onChange={e => updatePersonal({ portfolio: e.target.value })}
            error={errors.portfolio}
            icon={<Globe className="w-4 h-4" />}
          />
        </div>
      </div>
    </FormSection>
  );
};

