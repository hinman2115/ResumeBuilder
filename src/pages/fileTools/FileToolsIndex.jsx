import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  Layers,
  FileText,
  Archive,
  CheckCircle2
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FILE_TOOLS, TOOL_CATEGORIES } from '../../data/fileTools';
import { FileToolCard } from '../../components/fileTools/FileToolCard';
import { Button } from '../../components/common/Button';

export const FileToolsIndex = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'available' | 'coming-soon'

  const breadcrumbs = [
    { label: 'FileForge Home', path: '/file-tools' }
  ];

  const filteredTools = useMemo(() => {
    return FILE_TOOLS.filter(tool => {
      // Category check
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }
      // Status check
      if (statusFilter !== 'all' && tool.status !== statusFilter) {
        return false;
      }
      // Search check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          tool.title.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.categoryLabel.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedCategory, statusFilter, searchQuery]);

  const availableCount = FILE_TOOLS.filter(t => t.status === 'available').length;
  const comingSoonCount = FILE_TOOLS.filter(t => t.status === 'coming-soon').length;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FileForge Free PDF & File Tools',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    description: 'Free online tools to merge, split, compress, convert, and manage PDF and common files directly in your web browser.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FA] flex flex-col">
      <SEO
        title="FileForge — Free PDF & File Tools"
        description="FileForge provides free online PDF and file tools for converting, merging, splitting, compressing, and managing files directly in your browser."
        canonicalUrl="https://resumeforge.app/file-tools"
        product="file"
        schemaData={schemaData}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#F7F7FA] pt-8 pb-10 border-b border-[#E1E2E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-200/70 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>FileForge • 100% In-Browser Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2F3038] tracking-tight">
              File<span className="text-indigo-600">Forge</span>
            </h1>

            <p className="mt-3 text-lg sm:text-xl font-semibold text-slate-800 tracking-tight">
              Free online PDF and file tools.
            </p>

            <p className="mt-2 text-sm sm:text-base text-[#6F707A] leading-relaxed font-normal max-w-2xl mx-auto">
              Convert, compress, merge, split, and manage your documents directly in your web browser. 100% private with zero server uploads.
            </p>

            {/* Quick Guarantees */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs sm:text-sm font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Client-Side Privacy
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-500" /> Zero Files Uploaded
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-500" /> Instant Processing
              </span>
            </div>

            {/* Search Input */}
            <div className="mt-8 max-w-xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g. merge, compress, zip, jpg)..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#E1E2E7] focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 shadow-sm text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Dashboard & Filter Grid */}
      <section className="py-12 sm:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E1E2E7] mb-7">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Tool categories">
              {TOOL_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#30313A] text-white shadow-sm'
                      : 'bg-white text-[#6F707A] hover:bg-slate-50 border border-[#E1E2E7]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#E1E2E7] self-start md:self-auto text-xs font-semibold text-[#6F707A]">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'all' ? 'bg-brand-50 text-brand-700 font-bold' : 'hover:text-slate-900'
                }`}
              >
                All ({FILE_TOOLS.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('available')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'available' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:text-slate-900'
                }`}
              >
                Available ({availableCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('coming-soon')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'coming-soon' ? 'bg-slate-100 text-slate-800 font-bold' : 'hover:text-slate-900'
                }`}
              >
                Coming Soon ({comingSoonCount})
              </button>
            </div>

            {/* Search Result Counter */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6F707A]">
              <span className="px-3 py-1.5 bg-white rounded-xl border border-[#E1E2E7]">
                Showing {filteredTools.length} of {FILE_TOOLS.length} Tools
              </span>
            </div>
          </div>

          {/* Tools Grid */}
          {filteredTools.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
              <p className="text-base font-bold text-slate-800">No tools found matching your search.</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "merge", "compress", or "zip".</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setStatusFilter('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-brand-50 text-brand-700 text-xs font-bold hover:bg-brand-100 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredTools.map(tool => (
                <FileToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-14 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Use FileForge?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Engineered for job seekers and professionals who value privacy, speed, and simplicity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">100% In-Browser Privacy</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your private resumes, sensitive portfolios, and documents never leave your computer. Processing runs entirely in your browser using modern WebAssembly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Lightning Fast & Local</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No server queues, no waiting for slow uploads, and no download waiting times. Everything converts at the speed of your device.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Completely Free & Watermark-Free</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No sign-up required, no email collection, no subscriptions, and zero watermarks added to your documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Link to Resume Builder */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-400 mb-1">
              <span>Sister Product</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Looking to craft an interview-ready resume?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
              Switch over to our sister product <strong>ResumeForge</strong> for modern, ATS-ready templates and instant client-side PDF export.
            </p>
          </div>
          <Link to="/builder">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="shadow-md shadow-brand-500/20 flex-shrink-0"
            >
              Open ResumeForge
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
