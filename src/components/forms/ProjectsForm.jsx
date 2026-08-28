import { FolderGit2, Plus, Trash2, Globe, Cpu } from 'lucide-react';
import { useResume } from '../../hooks/useResume';
import { FormSection } from './FormSection';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';

export const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  return (
    <FormSection
      title="Key Projects"
      subtitle="Side projects, open-source work, and key accomplishments"
      icon={<FolderGit2 className="w-5 h-5" />}
      count={projects.length}
      defaultOpen={true}
      actionButton={
        <Button
          type="button"
          size="sm"
          variant="secondary"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={addProject}
        >
          Add Project
        </Button>
      }
    >
      {projects.length === 0 ? (
        <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60" />
          <p className="text-sm font-medium text-slate-600">No projects added yet</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">Showcase personal apps, open-source contributions, or portfolio projects.</p>
          <Button
            type="button"
            size="sm"
            variant="primary"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={addProject}
          >
            Add Project
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((item, index) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/40 relative group transition-all duration-150 hover:border-slate-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                  Project #{index + 1} {item.name ? `· ${item.name}` : ''}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  icon={<Trash2 className="w-3.5 h-3.5" />}
                  onClick={() => removeProject(item.id)}
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Project Name"
                  placeholder="e.g. PulseMetrics"
                  value={item.name}
                  onChange={e => updateProject(item.id, { name: e.target.value })}
                  required
                />

                <Input
                  label="Project / Repo URL"
                  placeholder="e.g. github.com/user/project"
                  value={item.url}
                  onChange={e => updateProject(item.id, { url: e.target.value })}
                  icon={<Globe className="w-4 h-4" />}
                />

                <div className="sm:col-span-2">
                  <Input
                    label="Technologies Used"
                    placeholder="e.g. React, TypeScript, Node.js, PostgreSQL, Tailwind"
                    value={item.technologies}
                    onChange={e => updateProject(item.id, { technologies: e.target.value })}
                    icon={<Cpu className="w-4 h-4" />}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Textarea
                    label="Project Description"
                    placeholder="Describe the problem, your technical solution, and measurable impact..."
                    rows={3}
                    value={item.description}
                    onChange={e => updateProject(item.id, { description: e.target.value })}
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
            onClick={addProject}
          >
            Add Another Project
          </Button>
        </div>
      )}
    </FormSection>
  );
};

