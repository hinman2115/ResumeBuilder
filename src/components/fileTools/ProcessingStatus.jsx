import { Loader2, ShieldCheck } from 'lucide-react';

export const ProcessingStatus = ({
  progress = 0,
  title = 'Processing files...',
  subtitle = 'Please wait while your document is being prepared directly in your browser.'
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-sm flex flex-col items-center justify-center animate-in fade-in duration-200">
      <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
        <Loader2 className="w-7 h-7 animate-spin" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
        {title}
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md">
        {subtitle}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-md mt-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-sky-500 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${Math.max(5, Math.min(progress, 100))}%` }}
          />
        </div>
      </div>

      {/* Privacy note */}
      <div className="mt-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Processed 100% inside your browser — zero files uploaded to servers</span>
      </div>
    </div>
  );
};

