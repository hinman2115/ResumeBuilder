import { useEffect } from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useResume } from '../../hooks/useResume';

export const Toast = () => {
  const { toastMessage, clearToast } = useResume();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
  };

  const bgStyles = {
    success: 'bg-white border-emerald-200 text-slate-800 shadow-emerald-500/10',
    info: 'bg-white border-brand-200 text-slate-800 shadow-brand-500/10',
    error: 'bg-white border-rose-200 text-slate-800 shadow-rose-500/10'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-5">
      <div className={`flex items-center gap-3 ${bgStyles[toastMessage.type] || bgStyles.info}`}>
        {icons[toastMessage.type] || icons.info}
        <p className="text-sm font-medium pr-2">{toastMessage.text}</p>
        <button
          onClick={clearToast}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

