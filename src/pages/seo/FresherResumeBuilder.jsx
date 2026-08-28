import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Zap, CheckCircle2 } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const FresherResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="Resume Builder for Freshers – Entry Level & Recent Graduate Resumes"
        description="Craft a standout fresher resume that bridges your college education with industry requirements. Clean entry-level resume templates with instant free PDF export."
        canonicalUrl="https://resumeforge.app/resume-builder-for-freshers"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Resume Builder for Freshers' }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Entry-Level & Fresh Graduates</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Launch Your Career with a High-Converting Fresher Resume
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Transitioning from campus to your first full-time role? ResumeForge helps freshers showcase academic excellence, capstone projects, internships, and core skills to land entry-level interviews.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right" className="w-full sm:w-auto px-8 py-3.5">
                Create My Fresher Resume
              </Button>
            </Link>
            <Link to="/guides/how-to-write-resume-summary">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 py-3.5">
                Summary Writing Guide
              </Button>
            </Link>
          </div>
        </div>

        {/* Fresher Strategy */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Key Focus Areas for Recent Graduates & Freshers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs mb-3">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Targeted Summary</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Write a 2-3 sentence statement expressing your degree, primary technical or business proficiencies, and desire to contribute to company goals.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Project Showcases</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Detail your final year project, internships, or practical assignments. List the tools used and the end problem you solved.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-3">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Relevant Certifications</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Online certifications (Google, AWS, Microsoft, Coursera, Meta) prove proactive continuous learning and distinguish you from other graduates.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-700 to-slate-900 text-white rounded-2xl p-8 sm:p-10 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Start Your First Job Search with Confidence
          </h2>
          <p className="text-sm text-indigo-200 max-w-xl mx-auto mb-6">
            Pick a modern template, enter your background, and download your resume for free.
          </p>
          <Link to="/builder">
            <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8">
              Build Entry-Level Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

