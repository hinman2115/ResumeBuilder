import { Briefcase, Plus, Trash2, Calendar, MapPin, Building2 } from 'lucide-react';
import { useResume } from '../../hooks/useResume';
import { FormSection } from './FormSection';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';

export const ExperienceForm = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;

  return (
    <FormSection
      title="Work Experience"
      subtitle="Your relevant employment history and key achievements"
      icon={<Briefcase className="w-5 h-5" />}
      count={experience.length}
      defaultOpen={true}
      actionButton={
        <Button
          type="button"
          size="sm"
          variant="secondary"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={addExperience}
        >
          Add Position
        </Button>
      }
    >
      {experience.length === 0 ? (
        <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60" />
          <p className="text-sm font-medium text-slate-600">No work experience added yet</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">Add your past jobs, internships, or relevant freelance roles.</p>
          <Button
            type="button"
            size="sm"
            variant="primary"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={addExperience}
          >
            Add First Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((item, index) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/40 relative group transition-all duration-150 hover:border-slate-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                  Role #{index + 1} {item.company ? `· ${item.company}` : ''}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  icon={<Trash2 className="w-3.5 h-3.5" />}
                  onClick={() => removeExperience(item.id)}
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Job Title"
                  placeholder="e.g. Senior Software Engineer"
                  value={item.jobTitle}
                  onChange={e => updateExperience(item.id, { jobTitle: e.target.value })}
                  required
                />

                <Input
                  label="Company Name"
                  placeholder="e.g. Acme Corp"
                  value={item.company}
                  onChange={e => updateExperience(item.id, { company: e.target.value })}
                  icon={<Building2 className="w-4 h-4" />}
                  required
                />

                <Input
                  label="Location"
                  placeholder="e.g. San Francisco, CA (or Remote)"
                  value={item.location}
                  onChange={e => updateExperience(item.id, { location: e.target.value })}
                  icon={<MapPin className="w-4 h-4" />}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Start Date"
                    type="month"
                    value={item.startDate}
                    onChange={e => updateExperience(item.id, { startDate: e.target.value })}
                    icon={<Calendar className="w-4 h-4" />}
                  />

                  <div>
                    <Input
                      label="End Date"
                      type="month"
                      value={item.endDate}
                      disabled={item.currentlyWorking}
                      onChange={e => updateExperience(item.id, { endDate: e.target.value })}
                      icon={<Calendar className="w-4 h-4" />}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={item.currentlyWorking}
                      onChange={e => updateExperience(item.id, {
                        currentlyWorking: e.target.checked,
                        endDate: e.target.checked ? '' : item.endDate
                      })}
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
                    />
                    <span>I currently work here</span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <Textarea
                    label="Responsibilities & Achievements"
                    placeholder="• Built and launched features using React and Node.js...&#10;• Improved page load time by 35% across all web pages...&#10;• Collaborated with cross-functional teams of 10+ engineers..."
                    rows={4}
                    value={item.description}
                    onChange={e => updateExperience(item.id, { description: e.target.value })}
                    helperText="Use bullet points (•) for clean formatting in the resume"
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
            onClick={addExperience}
          >
            Add Another Experience
          </Button>
        </div>
      )}
    </FormSection>
  );
};

