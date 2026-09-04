import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  Lock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SEO } from '../common/SEO';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FILE_TOOLS } from '../../data/fileTools';
import { FileToolCard } from './FileToolCard';

export const ToolLayout = ({
  tool,
  children
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Pick 3 related tools (excluding current tool)
  const relatedTools = FILE_TOOLS
    .filter(t => t.id !== tool.id)
    .slice(0, 3);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'File Tools', path: '/file-tools' },
    { label: tool.title, path: tool.route }
  ];

  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    description: tool.metaDescription || tool.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA]">
      <SEO
        title={tool.metaTitle || `${tool.title} Online Free | ResumeForge`}
        description={tool.metaDescription || tool.description}
        canonicalUrl={`https://resumeforge.app${tool.route}`}
        schemaData={toolSchema}
      />

      {/* Hero / Header Section */}
      <section className="bg-[#F7F7FA] pt-8 pb-10 border-b border-[#E1E2E7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200/60 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>{tool.categoryLabel}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#2F3038] tracking-tight">
              {tool.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#6F707A] leading-relaxed font-normal">
              {tool.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free & Private
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Processed In-Browser
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-500" /> Instant Download
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Tool Area */}
      <section className="py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[16px] border border-[#E1E2E7] shadow-[var(--ui-shadow)] p-4 sm:p-8">
            {children}
          </div>
        </div>
      </section>

      {/* Security & Features Section */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[16px] bg-[#F7F7FA] border border-[#E1E2E7] shadow-[var(--ui-shadow)]">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Zero File Uploads</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your documents are never uploaded to any remote server or third-party cloud. Everything executes locally inside your web browser.
              </p>
            </div>

            <div className="p-6 rounded-[16px] bg-[#F7F7FA] border border-[#E1E2E7] shadow-[var(--ui-shadow)]">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Fast & Client-Side</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Powered by modern WebAssembly and JavaScript for near-instant conversions without queue times, file waiting lines, or watermarks.
              </p>
            </div>

            <div className="p-6 rounded-[16px] bg-[#F7F7FA] border border-[#E1E2E7] shadow-[var(--ui-shadow)]">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Free & Open Access</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No account registration, no credit card, and no hidden subscriptions. Free client-side document processing with zero paywalls.
              </p>
            </div>
          </div>

          {/* Tool specific features if configured */}
          {tool.features && tool.features.length > 0 && (
            <div className="mt-12 p-6 sm:p-8 rounded-[16px] bg-[#F7F7FA] border border-[#E1E2E7]">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Key Features of {tool.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                {tool.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      {tool.faq && tool.faq.length > 0 && (
        <section className="py-12 sm:py-16 bg-[#F7F7FA] border-t border-[#E1E2E7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center tracking-tight mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {tool.faq.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200/80 bg-white overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {item.question}
                      </span>
                      <span className="text-slate-400 p-1 flex-shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Tools Section */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#E1E2E7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Explore More File Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Free tools to convert, compress, and organize your documents.
              </p>
            </div>
            <Link
              to="/file-tools"
              className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map(relTool => (
              <FileToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Promo Banner for Resume Builder */}
      <section className="py-10 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-bold">
              Need to create an interview-winning resume?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Use our 100% free resume builder with ATS-friendly templates and instant PDF export.
            </p>
          </div>
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-md transition-colors flex-shrink-0"
          >
            <span>Create My Resume</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

