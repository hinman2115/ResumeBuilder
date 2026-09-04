import { Link } from 'react-router-dom';
import {
  Layers,
  Scissors,
  Minimize2,
  Image,
  FileImage,
  FileText,
  FileCode2,
  ImagePlus,
  FileCheck,
  RotateCw,
  ArrowUpDown,
  Archive,
  FolderArchive,
  FileEdit,
  Package,
  ArrowRight,
  Clock
} from 'lucide-react';

const ICON_MAP = {
  Layers,
  Scissors,
  Minimize2,
  Image,
  FileImage,
  FileText,
  FileCode2,
  ImagePlus,
  FileCheck,
  RotateCw,
  ArrowUpDown,
  Archive,
  FolderArchive,
  FileEdit,
  Package
};

export const FileToolCard = ({ tool }) => {
  const IconComponent = ICON_MAP[tool.icon] || FileText;
  const isAvailable = tool.status === 'available';

  return (
    <Link
      to={tool.route}
      className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200/80 transition-all duration-200 ${
        isAvailable
          ? 'hover:border-brand-300 hover:shadow-lg hover:-translate-y-0.5'
          : 'hover:border-slate-300 hover:shadow-sm opacity-90'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${tool.iconBg || 'bg-brand-50 text-brand-600'}`}>
            <IconComponent className="w-6 h-6" />
          </div>
          {isAvailable ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/70">
              Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
              <Clock className="w-3 h-3" />
              Coming Soon
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
          {tool.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span className="capitalize">{tool.categoryLabel}</span>
        <span className={`inline-flex items-center gap-1 transition-transform duration-200 ${isAvailable ? 'text-brand-600 group-hover:translate-x-1' : 'text-slate-400'}`}>
          {isAvailable ? 'Use Tool' : 'Preview'}
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};

