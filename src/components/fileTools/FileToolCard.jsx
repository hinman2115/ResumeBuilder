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
  Clock,
  Copy,
  Trash2,
  Sliders,
  Lock,
  Unlock,
  Stamp,
  Hash,
  RefreshCw,
  Maximize2,
  Sparkles,
  Code2,
  Download
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
  Package,
  Copy,
  Trash2,
  Sliders,
  Lock,
  Unlock,
  Stamp,
  Hash,
  RefreshCw,
  Maximize2,
  Sparkles,
  Code2,
  Download
};

export const FileToolCard = ({ tool }) => {
  const IconComponent = ICON_MAP[tool.icon] || FileText;
  const isAvailable = tool.status === 'available';

  return (
    <Link
      to={tool.route}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-[16px] bg-white border border-[#E1E2E7] hover:border-[#026fc7]/40 hover:shadow-[0_6px_18px_rgba(47,48,56,0.07)] hover:-translate-y-0.5 transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${tool.pastel || 'bg-slate-100 text-slate-700'}`}>
            <IconComponent className="w-5 h-5" />
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

        <h3 className="text-[17px] font-semibold text-[#2F3038] group-hover:text-[#026fc7] transition-colors leading-snug">
          {tool.title}
        </h3>
        <p className="mt-1.5 text-[13px] text-[#6F707A] leading-relaxed line-clamp-2">
          {tool.description}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-[#F0F1F5] flex items-center justify-between text-[12px] font-medium text-[#6F707A]">
        <span className="truncate max-w-[180px]">{tool.acceptSummary || tool.categoryLabel}</span>
        <span className="inline-flex items-center gap-1 text-[#026fc7] font-semibold group-hover:translate-x-0.5 transition-transform duration-150">
          {isAvailable ? 'Open' : 'Preview'}
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};


