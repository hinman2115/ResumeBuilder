import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Layers,
  FileText,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Scissors,
  Image as ImageIcon,
  Archive,
  FileCode2
} from 'lucide-react';
import { ProductBrand } from '../branding/ProductBrand';

export const FileForgeNavbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCategories = [
    { label: 'All Tools', path: '/file-tools', icon: Layers },
    { label: 'PDF Tools', path: '/file-tools?cat=pdf', icon: Scissors },
    { label: 'Image Tools', path: '/file-tools?cat=image', icon: ImageIcon },
    { label: 'Documents', path: '/file-tools?cat=document', icon: FileCode2 },
    { label: 'Utilities', path: '/file-tools?cat=utility', icon: Archive }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E1E2E7] shadow-[0_1px_3px_rgba(47,48,56,0.03)] transition-colors">
      {/* Top Reassurance / Micro Utility Bar */}
      <div className="bg-[#262730] text-slate-300 text-[11px] py-1 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% In-Browser Privacy
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">
              Files never upload to remote servers
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
            <span className="text-slate-400 hidden sm:inline">Crafting a CV?</span>
            <Link
              to="/builder"
              className="inline-flex items-center gap-1 text-brand-300 hover:text-brand-200 font-semibold underline underline-offset-2"
            >
              <span>Switch to ResumeForge</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main FileForge Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* FileForge Brand */}
          <ProductBrand product="file" size="md" link={true} />

          {/* Desktop Categories Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navCategories.map((item) => {
              const Icon = item.icon;
              const isCurrent = location.pathname === '/file-tools' && (!location.search || location.search.includes(item.path.split('?')[1]));
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'text-indigo-700 bg-indigo-50/70 border border-indigo-200/60 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Cross-Product Switcher CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="h-5 w-px bg-slate-200" />
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all group"
              title="Open ResumeForge Resume Builder"
            >
              <div className="w-5 h-5 rounded-md bg-brand-600/30 text-brand-400 flex items-center justify-center">
                <FileText className="w-3 h-3" />
              </div>
              <span>Resume Builder</span>
              <span className="text-slate-400 text-[10px] group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/builder"
              className="inline-flex sm:hidden items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold"
            >
              <FileText className="w-3 h-3 text-brand-400" />
              <span>Resume</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle FileForge navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-1">
            FileForge Tool Categories
          </div>

          {navCategories.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-indigo-50/60 hover:text-indigo-700 transition-colors"
              >
                <Icon className="w-4 h-4 text-indigo-600" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2">
              Cross-Product Navigation
            </div>
            <Link
              to="/builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 hover:bg-slate-100"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                <span>ResumeForge — Resume Builder</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
