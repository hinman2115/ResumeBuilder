import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Globe, CheckCircle2, FileText } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const ResumeVsCv = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Resume vs CV: Key Differences Explained',
    description: 'Learn the differences between a Resume and a Curriculum Vitae (CV) regarding length, content focus, and international hiring customs in the US, UK, Europe, and worldwide.',
    author: {
      '@type': 'Organization',
      name: 'ResumeForge Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ResumeForge'
    },
    datePublished: '2026-03-01',
    dateModified: '2026-08-28'
  };

  return (
    <article className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="Resume vs CV: Key Differences & When to Use Which | ResumeForge"
        description="What is the difference between a Resume and a CV? Complete comparison guide covering document length, layout standards, geography (US vs UK/EU), and academic requirements."
        canonicalUrl="https://resumeforge.app/guides/resume-vs-cv"
        ogType="article"
        schemaData={articleSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Career Guides', url: '/guides' },
            { label: 'Resume vs CV' }
          ]}
        />

        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200/60">
              International & Career Advice
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              5 min read • Updated August 2026
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Resume vs CV: What's the Difference and Which Should You Use?
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            While people often use the terms &ldquo;Resume&rdquo; and &ldquo;CV&rdquo; interchangeably, they have distinct differences in purpose, length, and geographical context.
          </p>
        </header>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              Quick Comparison: Resume vs CV
            </h2>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="p-3">Attribute</th>
                    <th className="p-3 text-brand-700">Resume</th>
                    <th className="p-3 text-indigo-700">Curriculum Vitae (CV)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Length</td>
                    <td className="p-3 text-slate-600">1 to 2 pages (concise)</td>
                    <td className="p-3 text-slate-600">2 to 5+ pages (comprehensive)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Primary Purpose</td>
                    <td className="p-3 text-slate-600">Tailored to a specific job opening</td>
                    <td className="p-3 text-slate-600">Full record of career, research & academia</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">US / Canada Usage</td>
                    <td className="p-3 text-slate-600">Corporate & standard employment</td>
                    <td className="p-3 text-slate-600">Academia, medical, scientific research, fellowships</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">UK / Europe / NZ</td>
                    <td className="p-3 text-slate-600">Term rarely used (called CV)</td>
                    <td className="p-3 text-slate-600">Standard document for all corporate job applications</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              When Should You Submit a Resume vs a CV?
            </h2>
            <p className="mt-3">
              Follow these simple geographical and industry rules:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Applying in the United States or Canada for corporate jobs:</strong> Always submit a 1–2 page <strong>Resume</strong>.
              </li>
              <li>
                <strong>Applying for a university professorship, post-doc, or clinical medical fellowship in the US:</strong> Submit an academic <strong>CV</strong>.
              </li>
              <li>
                <strong>Applying in the United Kingdom, Ireland, Germany, Europe, or Australia:</strong> Submit a <strong>CV</strong> (which functions like a 2-page European resume).
              </li>
            </ul>
          </section>

          {/* Inline CTA */}
          <div className="my-8 p-6 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
            <h3 className="text-lg font-bold text-indigo-950 mb-1">Create Either a Resume or CV in Minutes</h3>
            <p className="text-xs sm:text-sm text-indigo-800 mb-4">
              ResumeForge templates adapt smoothly to both 1-page US resumes and multi-page European CVs.
            </p>
            <Link to="/builder">
              <Button variant="primary" size="md" className="bg-indigo-600 hover:bg-indigo-700 font-bold">
                Create Your Resume / CV Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

