import { Award, Plus, Trash2, Calendar, Globe, Building2 } from 'lucide-react';
import { useResume } from '../../hooks/useResume';
import { FormSection } from './FormSection';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export const CertificationsForm = () => {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResume();
  const { certifications } = resumeData;

  return (
    <FormSection
      title="Certifications & Licenses"
      subtitle="Industry credentials, professional certificates, and accreditations"
      icon={<Award className="w-5 h-5" />}
      count={certifications.length}
      defaultOpen={true}
      actionButton={
        <Button
          type="button"
          size="sm"
          variant="secondary"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={addCertification}
        >
          Add Certificate
        </Button>
      }
    >
      {certifications.length === 0 ? (
        <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Award className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60" />
          <p className="text-sm font-medium text-slate-600">No certifications added yet</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">Add your AWS, Meta, Scrum Master, or cloud credentials.</p>
          <Button
            type="button"
            size="sm"
            variant="primary"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={addCertification}
          >
            Add Certificate
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {certifications.map((item, index) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/40 relative group transition-all duration-150 hover:border-slate-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                  Certificate #{index + 1} {item.name ? `· ${item.name}` : ''}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  icon={<Trash2 className="w-3.5 h-3.5" />}
                  onClick={() => removeCertification(item.id)}
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Certification Name"
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={item.name}
                  onChange={e => updateCertification(item.id, { name: e.target.value })}
                  required
                />

                <Input
                  label="Issuing Organization"
                  placeholder="e.g. Amazon Web Services"
                  value={item.issuer}
                  onChange={e => updateCertification(item.id, { issuer: e.target.value })}
                  icon={<Building2 className="w-4 h-4" />}
                  required
                />

                <Input
                  label="Issue Date"
                  type="month"
                  value={item.date}
                  onChange={e => updateCertification(item.id, { date: e.target.value })}
                  icon={<Calendar className="w-4 h-4" />}
                />

                <Input
                  label="Credential URL"
                  placeholder="e.g. aws.amazon.com/verification"
                  value={item.url}
                  onChange={e => updateCertification(item.id, { url: e.target.value })}
                  icon={<Globe className="w-4 h-4" />}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="md"
            className="w-full border-dashed"
            icon={<Plus className="w-4 h-4" />}
            onClick={addCertification}
          >
            Add Another Certificate
          </Button>
        </div>
      )}
    </FormSection>
  );
};

