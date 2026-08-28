import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Sparkles, CheckCircle2, FileText } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const HowToWriteResumeSummary = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Write a Professional Resume Summary (With Examples)',
    description: 'Learn the proven 3-part formula to write a captivating professional resume summary that catches the recruiter’s eye in 6 seconds.',
    author: {
      '@type': 'Organization',
      name: 'ResumeForge Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ResumeForge'
    },
    datePublished: '2026-03-15',
    dateModified: '2026-08-28'
  };

  return (
    <article className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="How to Write a Resume Summary: 3-Part Formula & Examples | ResumeForge"
        description="Learn how to write a compelling professional resume summary statement. Includes proven writing formulas, examples for entry-level, mid-level, and senior leaders."
        canonicalUrl="https://resumeforge.app/guides/how-to-write-resume-summary"
        ogType="article"
        schemaData={articleSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Career Guides', url: '/guides' },
            { label: 'How to Write a Resume Summary' }
          ]}
        />

        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200/60">
              Writing Masterclass
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              6 min read • Updated August 2026
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How to Write a Powerful Professional Resume Summary
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Recruiters spend an average of 6 to 7 seconds scanning a resume before deciding whether to interview the candidate. Your summary statement is the headline that hooks them.
          </p>
        </header>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              The 3-Sentence Professional Summary Formula
            </h2>
            <p className="mt-3">
              A high-converting professional summary follows this straightforward 3-sentence blueprint:
            </p>

            <div className="space-y-3 my-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <span className="font-bold text-brand-700">Sentence 1: Who You Are</span>
                <p className="text-slate-600 mt-1">Professional title, years of relevant experience, and core domain expertise.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <span className="font-bold text-brand-700">Sentence 2: What You Have Accomplished</span>
                <p className="text-slate-600 mt-1">1 or 2 specific, quantifiable achievements (metrics, revenue growth, efficiency improvements).</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <span className="font-bold text-brand-700">Sentence 3: What Value You Bring to the Target Employer</span>
                <p className="text-slate-600 mt-1">Your core strengths aligned directly to the company’s mission or current challenges.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              Real Summary Examples by Role
            </h2>

            <div className="space-y-4 my-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">Software Engineer Example</h3>
                <p className="text-xs sm:text-sm text-slate-800 italic">
                  &ldquo;Accomplished Full Stack Engineer with 6+ years of experience designing and scaling distributed web applications in React, Node.js, and AWS. Spearheaded architecture overhaul reducing API latency by 38% for 1.2M active users. Passionate about clean code, mentoring engineering talent, and building reliable microservices.&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">Marketing Manager Example</h3>
                <p className="text-xs sm:text-sm text-slate-800 italic">
                  &ldquo;Data-driven Digital Marketing Manager with 5+ years driving multi-channel B2B SaaS growth campaigns. Managed \$450k annual ad budgets, resulting in a 42% decrease in customer acquisition cost (CAC) and 120% ARR increase. Expert in SEO, lifecycle marketing, and Google Analytics 4.&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* Inline CTA */}
          <div className="my-8 p-6 rounded-xl bg-brand-50 border border-brand-200 text-center">
            <h3 className="text-lg font-bold text-brand-900 mb-1">Write Your Resume Summary Now</h3>
            <p className="text-xs sm:text-sm text-brand-700 mb-4">
              ResumeForge includes built-in helper tips and sample summaries for all industries.
            </p>
            <Link to="/builder">
              <Button variant="primary" size="md" className="font-bold">
                Start Building Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

