import { useState } from 'react';
import { Wrench, Plus, X, Sparkles } from 'lucide-react';
import { useResume } from '../../hooks/useResume';
import { FormSection } from './FormSection';
import { Button } from '../common/Button';

const SUGGESTED_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python',
  'Tailwind CSS', 'SQL', 'PostgreSQL', 'Docker', 'AWS', 'Git',
  'GraphQL', 'REST APIs', 'System Design', 'Agile / Scrum', 'CI/CD'
];

export const SkillsForm = () => {
  const { resumeData, addSkill, removeSkill } = useResume();
  const { skills } = resumeData;
  const [skillInput, setSkillInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (skillInput.trim()) {
      addSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  return (
    <FormSection
      title="Skills"
      subtitle="Technical competencies, tools, frameworks, and proficiencies"
      icon={<Wrench className="w-5 h-5" />}
      count={skills.length}
      defaultOpen={true}
    >
      <div className="space-y-4">
        {/* Input box */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a skill and press Enter (e.g. React, SQL, Swift)..."
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <Button
            type="button"
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>

        {/* Current Skills Chips */}
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/70 shadow-2xs group hover:bg-brand-100 transition-colors"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="p-0.5 rounded text-brand-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No skills added yet.</p>
        )}

        {/* Quick suggestions */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Popular Suggestions (Click to add):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_SKILLS.filter(s => !skills.includes(s)).slice(0, 10).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addSkill(suggestion)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 hover:border-brand-200 transition-colors"
              >
                <Plus className="w-3 h-3" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </FormSection>
  );
};

