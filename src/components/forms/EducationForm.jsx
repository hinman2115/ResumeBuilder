import { GraduationCap, Plus, Trash2, Calendar, MapPin, Building } from 'lucide-react';
import { useResume } from '../../hooks/useResume';
import { FormSection } from './FormSection';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';

export const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  return (
    <FormSection
      title="Education"
      subtitle="Degrees, diplomas, and academic background"
      icon={<GraduationCap className="w-5 h-5" />}
      count={education.length}
      defaultOpen={true}
      actionButton={
        <Button
          type="button"
          size="sm"
          variant="secondary"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={addEducation}
        >
          Add Degree
        </Button>
      }
    >
      {education.length === 0 ? (
        <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60" />
          <p className="text-sm font-medium text-slate-600">No education entries added yet</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">Add your university, college, or bootcamp qualification.</p>
          <Button
            type="button"
            size="sm"
            variant="primary"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={addEducation}
          >
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((item, index) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/40 relative group transition-all duration-150 hover:border-slate-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                  Degree #{index + 1} {item.institution ? `· ${item.institution}` : ''}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  icon={<Trash2 className="w-3.5 h-3.5" />}
                  onClick={() => removeEducation(item.id)}
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Degree / Major"
                  placeholder="e.g. B.S. in Computer Science"
                  value={item.degree}
                  onChange={e => updateEducation(item.id, { degree: e.target.value })}
                  required
                />

                <Input
                  label="School / Institution"
                  placeholder="e.g. Stanford University"
                  value={item.institution}
                  onChange={e => updateEducation(item.id, { institution: e.target.value })}
                  icon={<Building className="w-4 h-4" />}
                  required
                />

                <Input
                  label="Location"
                  placeholder="e.g. Stanford, CA"
                  value={item.location}
                  onChange={e => updateEducation(item.id, { location: e.target.value })}
                  icon={<MapPin className="w-4 h-4" />}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Start Date"
                    type="month"
                    value={item.startDate}
                    onChange={e => updateEducation(item.id, { startDate: e.target.value })}
                    icon={<Calendar className="w-4 h-4" />}
                  />

                  <Input
                    label="End Date (or Grad)"
                    type="month"
                    value={item.endDate}
                    onChange={e => updateEducation(item.id, { endDate: e.target.value })}
                    icon={<Calendar className="w-4 h-4" />}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Textarea
                    label="Additional Details (GPA, Honors, Activities)"
                    placeholder="e.g. Magna Cum Laude, GPA 3.8/4.0. Relevant coursework: Data Structures, Distributed Computing..."
                    rows={2}
                    value={item.description}
                    onChange={e => updateEducation(item.id, { description: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="md"
            className="w-full border-dashed"
            icon={<Plus className="w-4 h-4" />}
            onClick={addEducation}
          >
            Add Another Degree
          </Button>
        </div>
      )}
    </FormSection>
  );
};

