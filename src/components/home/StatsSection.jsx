import { useState, useEffect } from 'react';
import { Users, FileText, Download, TrendingUp, Loader2, AlertCircle } from 'lucide-react';
import { getStatistics } from '../../services/statistics';

export const StatsSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        setLoading(true);
        setError(false);
        const data = await getStatistics();
        if (isMounted) {
          setStats(data);
        }
      } catch {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatNumber = (num) => {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    return new Intl.NumberFormat('en-US').format(num);
  };

  const statItems = [
    {
      id: 'visitors',
      label: 'Website Visitors',
      value: stats ? formatNumber(stats.visitors) : '0',
      description: 'Anonymous unique visitors across all browsers',
      icon: <Users className="w-6 h-6 text-sky-600" />,
      bg: 'bg-sky-50',
      border: 'border-sky-100'
    },
    {
      id: 'created',
      label: 'Resumes Created',
      value: stats ? formatNumber(stats.resumesCreated) : '0',
      description: 'Unique resumes created & customized',
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      bg: 'bg-indigo-50',
      border: 'border-indigo-100'
    },
    {
      id: 'downloaded',
      label: 'Resumes Downloaded',
      value: stats ? formatNumber(stats.resumesDownloaded) : '0',
      description: 'High-resolution A4 PDFs generated',
      icon: <Download className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mb-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-brand-600" />
            <span>Platform Activity & Usage</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-500 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
            <p className="text-xs font-medium">Loading statistics...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-6 text-slate-400 gap-2 text-xs bg-slate-50 rounded-xl border border-slate-200/60 max-w-md mx-auto">
            <AlertCircle className="w-4 h-4 text-slate-400" />
            <span>Real-time statistics temporarily unavailable</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {statItems.map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-2xl bg-white border ${item.border} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-mono">
                    {item.value}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{item.label}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
