import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FormSection = ({
  title,
  subtitle,
  icon,
  count,
  defaultOpen = true,
  actionButton,
  children
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-200 mb-5">
      <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-gradient-to-r from-white to-slate-50/50 border-b border-slate-100">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 text-left flex-1 focus:outline-none group"
        >
          <div className="p-2.5 rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors flex-shrink-0">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                {title}
              </h3>
              {count !== undefined && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">
                  {count}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </button>

        <div className="flex items-center gap-2">
          {actionButton}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            aria-label={isOpen ? "Collapse section" : "Expand section"}
          >
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 sm:p-5 space-y-4 animate-in fade-in duration-150">
          {children}
        </div>
      )}
    </div>
  );
};

