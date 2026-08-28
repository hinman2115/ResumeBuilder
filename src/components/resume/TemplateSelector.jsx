import { LayoutTemplate, Palette } from 'lucide-react';
import { useResume } from '../../hooks/useResume';

const TEMPLATES = [
  { id: 'modern', name: 'Modern', desc: 'Sleek, tech-focused with badge tags' },
  { id: 'professional', name: 'Professional', desc: 'Classic executive serif style' },
  { id: 'minimal', name: 'Minimal', desc: 'Ultra-clean Swiss typography' },
];

const ACCENT_COLORS = [
  { id: 'blue', name: 'Sky Blue', bg: 'bg-sky-600' },
  { id: 'indigo', name: 'Indigo', bg: 'bg-indigo-600' },
  { id: 'emerald', name: 'Emerald', bg: 'bg-emerald-600' },
  { id: 'rose', name: 'Rose', bg: 'bg-rose-600' },
  { id: 'violet', name: 'Violet', bg: 'bg-violet-600' },
  { id: 'slate', name: 'Slate Gray', bg: 'bg-slate-700' },
];

export const TemplateSelector = () => {
  const { resumeData, setTemplate, setAccentColor } = useResume();

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm space-y-4">
      {/* Template Chooser */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
          <LayoutTemplate className="w-4 h-4 text-brand-600" />
          <span>Choose Resume Template</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map((tmpl) => {
            const isSelected = resumeData.template === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setTemplate(tmpl.id)}
                className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all duration-150 ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-bold ${isSelected ? 'text-brand-700' : 'text-slate-800'}`}>
                    {tmpl.name}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-brand-600" />
                  )}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 line-clamp-1 leading-tight">
                  {tmpl.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Chooser */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Palette className="w-4 h-4 text-brand-600" />
            <span>Accent Theme</span>
          </div>
          <span className="text-xs font-medium text-slate-500 capitalize">
            {resumeData.accentColor}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {ACCENT_COLORS.map((col) => {
            const isSelected = resumeData.accentColor === col.id;
            return (
              <button
                key={col.id}
                type="button"
                title={col.name}
                onClick={() => setAccentColor(col.id)}
                className={`w-7 h-7 rounded-full ${col.bg} transition-all duration-150 relative flex items-center justify-center ${
                  isSelected
                    ? 'ring-2 ring-offset-2 ring-slate-800 scale-110'
                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                }`}
              >
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

