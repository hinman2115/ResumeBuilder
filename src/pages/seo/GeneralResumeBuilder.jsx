import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Sparkles, Zap, Shield, Layout, Download } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const GeneralResumeBuilder = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does ResumeForge help me build an ATS-friendly resume?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ResumeForge creates clean, structured resumes using standard typography, semantic hierarchy, and clean sections that applicant tracking systems (ATS) can parse seamlessly without formatting errors.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I have to pay to download my resume?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. ResumeForge is 100% free with no paywalls, subscriptions, or watermarks on downloaded A4 PDFs.'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="Online Resume Builder – Create a Professional Resume Online"
        description="Build a standout, ATS-compliant resume with ResumeForge's online resume builder. Live preview, customizable sections, professional templates, and instant free PDF download."
        canonicalUrl="https://resumeforge.app/resume-builder"
        schemaData={faqSchema}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Online Resume Builder' }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Universal Online Resume Builder</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Build a Winning Professional Resume Online
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Create an ATS-friendly, beautifully formatted resume in minutes. Tailored for all career paths and industries — from entry-level to senior executive.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right" className="w-full sm:w-auto px-8 py-3.5">
                Create My Resume Free
              </Button>
            </Link>
            <Link to="/templates">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 py-3.5">
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>

        {/* Why a Great Resume Matters */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why Use ResumeForge to Build Your Resume?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
            Hiring managers and automated Applicant Tracking Systems (ATS) review hundreds of resumes for a single job opening. A cluttered or poorly formatted resume is often filtered out within seconds. ResumeForge ensures your resume meets modern hiring criteria with clean typography, clear section hierarchy, and instant PDF rendering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="flex gap-3">
              <div className="p-2.5 rounded-lg bg-sky-50 text-sky-600 flex-shrink-0 h-fit">
                <Layout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">ATS-Optimized Structure</h3>
                <p className="text-xs text-slate-500 mt-1">Standardized headings and clean layout ensure recruitment parsers extract your information accurately.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0 h-fit">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Live Instant Preview</h3>
                <p className="text-xs text-slate-500 mt-1">See your edits in real time on an authentic A4 canvas with zoom and print controls.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0 h-fit">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Free Vector PDF Export</h3>
                <p className="text-xs text-slate-500 mt-1">Download high-definition A4 PDF documents ready to email or upload to job boards immediately.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide Section */}
        <div className="bg-slate-100/70 rounded-2xl border border-slate-200/80 p-8 sm:p-10 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            How to Build a High-Impact Resume in 4 Easy Steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">Step 1</span>
              <h3 className="text-sm font-bold text-slate-900 mt-3 mb-1">Fill In Details</h3>
              <p className="text-xs text-slate-500">Enter your contact info, summary, work history, education, and technical competencies.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">Step 2</span>
              <h3 className="text-sm font-bold text-slate-900 mt-3 mb-1">Pick a Template</h3>
              <p className="text-xs text-slate-500">Select Modern, Professional, or Minimal layouts depending on your target industry.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">Step 3</span>
              <h3 className="text-sm font-bold text-slate-900 mt-3 mb-1">Tailor Colors</h3>
              <p className="text-xs text-slate-500">Customize accent palettes from sky blue to executive slate to fit your personal brand.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">Step 4</span>
              <h3 className="text-sm font-bold text-slate-900 mt-3 mb-1">Download PDF</h3>
              <p className="text-xs text-slate-500">Generate a pristine A4 PDF without watermarks and start applying for dream roles.</p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-brand-700 to-indigo-800 text-white rounded-2xl p-8 sm:p-10 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="text-sm sm:text-base text-brand-100 max-w-xl mx-auto mb-6">
            Join thousands of job seekers who have created standout resumes with ResumeForge.
          </p>
          <Link to="/builder">
            <Button variant="primary" size="lg" className="bg-white text-brand-900 hover:bg-slate-100 font-bold px-8">
              Create My Resume Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

