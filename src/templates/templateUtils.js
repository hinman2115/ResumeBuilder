export function formatDate(dateStr, isPresent) {
  if (isPresent) return 'Present';
  if (!dateStr) return '';
  
  const parts = dateStr.split('-');
  if (parts.length === 2) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${months[monthIndex]} ${year}`;
    }
  }
  return dateStr;
}

export function formatUrl(url) {
  if (!url) return '';
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export const ACCENT_COLOR_MAP = {
  blue: {
    primary: 'bg-sky-700',
    primaryLight: 'bg-sky-50',
    primaryText: 'text-sky-700',
    badgeBg: 'bg-sky-100/80',
    badgeText: 'text-sky-800',
    border: 'border-sky-600',
    dot: 'bg-sky-600',
    tag: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  indigo: {
    primary: 'bg-indigo-700',
    primaryLight: 'bg-indigo-50',
    primaryText: 'text-indigo-700',
    badgeBg: 'bg-indigo-100/80',
    badgeText: 'text-indigo-800',
    border: 'border-indigo-600',
    dot: 'bg-indigo-600',
    tag: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  emerald: {
    primary: 'bg-emerald-700',
    primaryLight: 'bg-emerald-50',
    primaryText: 'text-emerald-700',
    badgeBg: 'bg-emerald-100/80',
    badgeText: 'text-emerald-800',
    border: 'border-emerald-600',
    dot: 'bg-emerald-600',
    tag: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  rose: {
    primary: 'bg-rose-700',
    primaryLight: 'bg-rose-50',
    primaryText: 'text-rose-700',
    badgeBg: 'bg-rose-100/80',
    badgeText: 'text-rose-800',
    border: 'border-rose-600',
    dot: 'bg-rose-600',
    tag: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  slate: {
    primary: 'bg-slate-800',
    primaryLight: 'bg-slate-100',
    primaryText: 'text-slate-800',
    badgeBg: 'bg-slate-200/80',
    badgeText: 'text-slate-800',
    border: 'border-slate-700',
    dot: 'bg-slate-700',
    tag: 'bg-slate-100 text-slate-700 border-slate-300'
  },
  violet: {
    primary: 'bg-violet-700',
    primaryLight: 'bg-violet-50',
    primaryText: 'text-violet-700',
    badgeBg: 'bg-violet-100/80',
    badgeText: 'text-violet-800',
    border: 'border-violet-600',
    dot: 'bg-violet-600',
    tag: 'bg-violet-50 text-violet-700 border-violet-200'
  }
};

