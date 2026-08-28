import { FileText, Sparkles } from 'lucide-react';
import { useResume } from '../../hooks/useResume';
import { FormSection } from './FormSection';
import { Textarea } from '../common/Textarea';

export const SummaryForm = () => {
  const { resumeData, updateSummary } = useResume();

  return (
    <FormSection
      title="Professional Summary"
      subtitle="A 2-4 sentence overview of your background, strengths, and career highlights"
      icon={<FileText className="w-5 h-5" />}
      defaultOpen={true}
    >
      <div className="space-y-2">
        <Textarea
          placeholder="e.g. Accomplished Full Stack Software Engineer with 6+ years of experience designing, scaling, and maintaining high-traffic web applications..."
          rows={5}
          value={resumeData.summary}
          onChange={e => updateSummary(e.target.value)}
        />
        <div className="flex items-start gap-2 p-3 bg-brand-50/60 rounded-lg text-xs text-brand-900 border border-brand-100">
          <Sparkles className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Pro Tip:</strong> Highlight your total years of experience, primary technical stack, and 1 or 2 measurable achievements (e.g. &ldquo;boosted API speed by 40%&rdquo;).
          </p>
        </div>
      </div>
    </FormSection>
  );
};

