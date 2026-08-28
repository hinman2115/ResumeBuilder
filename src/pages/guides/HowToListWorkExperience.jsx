import { Link } from 'react-router-dom';
import { Clock, ArrowRight, TrendingUp, CheckCircle2, Award } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const HowToListWorkExperience = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to List Work Experience on a Resume (The Action & Metric Formula)',
    description: 'Transform boring job descriptions into compelling accomplishment statements using the XYZ formula, active verbs, and quantified business impact.',
    author: {
      '@type': 'Organization',
      name: 'ResumeForge Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ResumeForge'
    },
    datePublished: '2026-03-22',
    dateModified: '2026-08-28'
  };

  return (
    <article className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="How to List Work Experience on a Resume: Formula & Examples | ResumeForge"
        description="Master the formula for writing high-impact resume work experience bullets. Learn how to quantify metrics, pick powerful action verbs, and highlight achievements."
        canonicalUrl="https://resumeforge.app/guides/how-to-list-work-experience"
        ogType="article"
        schemaData={articleSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Career Guides', url: '/guides' },
            { label: 'How to List Work Experience' }
          ]}
        />

        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200/60">
              Work History Masterclass
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              7 min read • Updated August 2026
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How to List Work Experience on a Resume: The Impact Formula
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            The work experience section is the core of your resume. Learn how to transform passive task lists into compelling accomplishment bullets that prove your value.
          </p>
        </header>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              The Google XYZ Accomplishment Formula
            </h2>
            <p className="mt-3">
              Laszlo Bock, former SVP of People Operations at Google, popularized the gold standard for resume bullet points:
            </p>

            <div className="p-5 rounded-xl bg-indigo-50 border border-indigo-200 my-4 text-center">
              <p className="text-base sm:text-lg font-mono font-bold text-indigo-950">
                &ldquo;Accomplished [X] as measured by [Y], by doing [Z]&rdquo;
              </p>
            </div>

            <p>
              Every bullet point on your resume should answer: What was the objective? What was the numerical result? What specific tools or actions did you take to achieve it?
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              Transforming Weak Bullets into Strong Achievements
            </h2>

            <div className="space-y-4 my-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-rose-600 mb-1">❌ Weak:</p>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">&ldquo;Responsible for managing company social media channels.&rdquo;</p>
                <p className="text-xs font-bold text-emerald-600 mb-1">✅ Strong (XYZ Formula):</p>
                <p className="text-xs sm:text-sm text-slate-900 font-medium">&ldquo;Grew organic LinkedIn audience by 140% in 9 months by producing bi-weekly technical video tutorials and executive thought-leadership articles.&rdquo;</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-rose-600 mb-1">❌ Weak:</p>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">&ldquo;Worked on front-end development using React.&rdquo;</p>
                <p className="text-xs font-bold text-emerald-600 mb-1">✅ Strong (XYZ Formula):</p>
                <p className="text-xs sm:text-sm text-slate-900 font-medium">&ldquo;Rebuilt enterprise checkout flow in React 18, cutting cart abandonment by 18% and generating \$320k in incremental quarterly revenue.&rdquo;</p>
              </div>
            </div>
          </section>

          {/* Inline CTA */}
          <div className="my-8 p-6 rounded-xl bg-slate-900 text-white text-center">
            <h3 className="text-lg font-bold mb-1">Format Your Work Experience Easily</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-4">
              ResumeForge automatically formats your bullet points, dates, and companies with ATS-compliant spacing.
            </p>
            <Link to="/builder">
              <Button variant="primary" size="md" className="bg-brand-600 hover:bg-brand-500 font-bold">
                Build My Resume Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

