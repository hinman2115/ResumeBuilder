import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Globe, FileText, Sparkles, BookOpen } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const CvBuilder = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="Online CV Maker – Free Curriculum Vitae Builder"
        description="Create a professional Curriculum Vitae (CV) online for European, UK, Middle East, and global job markets. Clean academic, corporate, and research CV templates with free PDF export."
        canonicalUrl="https://resumeforge.app/cv-builder"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Online CV Maker' }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>Global CV & Resume Creator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Create an International-Standard CV Online
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether applying for jobs in the UK, Europe, Australia, Canada, or worldwide, create a polished Curriculum Vitae with structured sections and instant A4 PDF export.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right" className="w-full sm:w-auto px-8 py-3.5">
                Create My CV Now
              </Button>
            </Link>
            <Link to="/guides/resume-vs-cv">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 py-3.5">
                Resume vs CV Guide
              </Button>
            </Link>
          </div>
        </div>

        {/* CV Sections Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Essential Sections for a Global CV
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                Personal Profile & Contact
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full name, location, email, phone number, and links to professional profiles (LinkedIn, portfolio).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                Employment History
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chronological listing of your past professional roles with company names, dates, key responsibilities, and quantified accomplishments.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                Academic Qualifications
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                University degrees, academic institutions, dates of completion, GPA/honors, and major specializations.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                Skills & Credentials
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Core competencies, industry certifications, technical toolsets, and language proficiencies.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Build Your CV with ResumeForge Today
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-6">
            Universal formatting trusted by job candidates across 50+ countries.
          </p>
          <Link to="/builder">
            <Button variant="primary" size="lg" className="bg-brand-600 hover:bg-brand-500 font-bold px-8">
              Start Your CV Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

