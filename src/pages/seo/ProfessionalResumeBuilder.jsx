import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, TrendingUp, Award, Layers } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const ProfessionalResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="Resume Builder for Experienced Professionals & Executives"
        description="Craft an executive, reverse-chronological resume that showcases leadership, revenue impact, team scaling, and key career achievements."
        canonicalUrl="https://resumeforge.app/resume-builder-for-professionals"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Resume Builder for Professionals' }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experienced Professionals & Leaders</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Executive & Mid-Career Resumes That Win Leadership Roles
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            When you have 5, 10, or 15+ years of experience, formatting and message hierarchy matter most. Structure your career progression, quantifiable achievements, and strategic contributions cleanly.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder?template=professional">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right" className="w-full sm:w-auto px-8 py-3.5">
                Use Executive Template
              </Button>
            </Link>
            <Link to="/guides/how-to-list-work-experience">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 py-3.5">
                Experience Writing Formula
              </Button>
            </Link>
          </div>
        </div>

        {/* Executive Principles */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Key Strategies for Senior & Experienced Resumes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-brand-600 font-bold mb-2">
                <TrendingUp className="w-4 h-4" />
                <h3 className="text-sm font-bold text-slate-900">Lead with Metrics and ROI</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rather than listing day-to-day duties, frame accomplishments in terms of revenue generated, costs cut, efficiency improved, or team headcount managed.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-brand-600 font-bold mb-2">
                <Layers className="w-4 h-4" />
                <h3 className="text-sm font-bold text-slate-900">Reverse-Chronological Depth</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicate the most detail to your last 5–7 years of career history where your highest impact occurred. Summarize earlier roles concisely.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Elevate Your Executive Resume Today
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-6">
            Classic serif and modern corporate templates designed specifically for senior managers, directors, and executives.
          </p>
          <Link to="/builder?template=professional">
            <Button variant="primary" size="lg" className="bg-brand-600 hover:bg-brand-500 font-bold px-8">
              Open Professional Builder
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

