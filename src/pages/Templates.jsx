import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, LayoutTemplate } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useResume } from '../hooks/useResume';
import { defaultResumeData } from '../data/defaultResume';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ProfessionalTemplate } from '../templates/ProfessionalTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';

const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Tech',
    badge: 'Popular',
    tagline: 'Dynamic, badge-accented layout for contemporary roles',
    description: 'A crisp modern layout featuring styled contact badges, timeline-based experience items, and colorful skill chips.',
    features: [
      'Visual timeline for work experience',
      'Accent color personalization',
      'Pill badges for technical skills',
      'Clean typography and contact icons'
    ],
    recommendedFor: 'Software Engineers, Product Managers, UI/UX Designers, Data Scientists'
  },
  {
    id: 'professional',
    name: 'Executive Professional',
    badge: 'Corporate Standard',
    tagline: 'Formal, centered serif layout for business & leadership',
    description: 'An authoritative, traditional design with a centered header, classic horizontal rules, and balanced structure.',
    features: [
      'Classic serif typography styling',
      'Prominent executive header hierarchy',
      'Traditional chronological organization',
      'Maximum ATS readability'
    ],
    recommendedFor: 'Executives, Project Managers, Finance, Consulting, Legal, Healthcare'
  },
  {
    id: 'minimal',
    name: 'Clean Minimalist',
    badge: 'Swiss Design',
    tagline: 'Ultra-clean, uncluttered whitespace with sleek sans-serif',
    description: 'A minimalist masterpiece prioritizing whitespace, clean dividers, and pure legibility for maximum focus.',
    features: [
      'Uncluttered Scandinavian / Swiss grid layout',
      'Generous whitespace and subtle accents',
      'Compact high-density readable sections',
      'Elegant and distraction-free'
    ],
    recommendedFor: 'Creative Directors, Architects, Researchers, Writers, Tech Startups'
  }
];

export const Templates = () => {
  const navigate = useNavigate();
  const { setTemplate, showToast } = useResume();
  const sampleData = defaultResumeData;

  const handleSelectTemplate = (templateId) => {
    setTemplate(templateId);
    showToast(`Selected ${templateId.toUpperCase()} template`, 'info');
    navigate(`/builder?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Curated Resume Templates</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Choose the Perfect Resume Template
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            All templates are 100% free, ATS-compliant, and share your data seamlessly. Switch anytime inside the editor without losing your progress.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Visual Preview */}
              <div className="bg-slate-100 p-4 border-b border-slate-200 relative group overflow-hidden h-[360px] flex justify-center items-start">
                <div className="transform scale-[0.40] origin-top w-[794px] pointer-events-none shadow-md rounded bg-white">
                  {tmpl.id === 'modern' && <ModernTemplate data={sampleData} />}
                  {tmpl.id === 'professional' && <ProfessionalTemplate data={sampleData} />}
                  {tmpl.id === 'minimal' && <MinimalTemplate data={sampleData} />}
                </div>

                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleSelectTemplate(tmpl.id)}
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                    className="shadow-lg"
                  >
                    Use This Template
                  </Button>
                </div>
              </div>

              {/* Template Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{tmpl.name}</h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200/60">
                      {tmpl.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mb-4">
                    {tmpl.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {tmpl.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Features</p>
                    {tmpl.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recommended For */}
                  <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-bold text-slate-700">Best for: </span>
                    <span className="text-slate-600">{tmpl.recommendedFor}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                    onClick={() => handleSelectTemplate(tmpl.id)}
                  >
                    Use {tmpl.name}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

