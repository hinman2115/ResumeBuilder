import { Link } from 'react-router-dom';
import { Clock, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const HowToMakeAResume = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Make a Resume in 2026: Complete Step-by-Step Guide',
    description: 'A comprehensive step-by-step masterclass on creating an ATS-friendly, professional resume that lands job interviews.',
    author: {
      '@type': 'Organization',
      name: 'ResumeForge Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ResumeForge',
      logo: {
        '@type': 'ImageObject',
        url: 'https://resumeforge.app/logo.png'
      }
    },
    datePublished: '2026-01-15',
    dateModified: '2026-08-28'
  };

  return (
    <article className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="How to Make a Resume in 2026: Step-by-Step Guide | ResumeForge"
        description="Learn how to write a professional resume from scratch. Covers layout rules, contact information, summary statements, work experience bullets, skills, and ATS formatting."
        canonicalUrl="https://resumeforge.app/guides/how-to-make-a-resume"
        ogType="article"
        schemaData={articleSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Career Guides', url: '/guides' },
            { label: 'How to Make a Resume' }
          ]}
        />

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200/60">
              Resume Fundamentals
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              8 min read • Updated August 2026
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How to Make a Resume: The Complete Step-by-Step Guide
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Your resume is the single most critical document in your job search. Learn how to craft a professional, ATS-compliant resume that captures recruiter attention and earns you interviews.
          </p>
        </header>

        {/* Article Content */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm prose prose-slate max-w-none space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              1. Choose the Right Resume Format
            </h2>
            <p className="mt-3">
              There are three primary resume formats used globally:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Reverse-Chronological (Recommended for 95% of applicants):</strong> Lists your work history starting with your most recent position. Loved by hiring managers and ATS algorithms.
              </li>
              <li>
                <strong>Functional / Skills-Based:</strong> Emphasizes skill groups rather than chronological employment. Useful primarily for drastic career pivots.
              </li>
              <li>
                <strong>Hybrid / Combination:</strong> Combines a prominent skills section with detailed chronological work history.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              2. Add Contact Information Clearly
            </h2>
            <p className="mt-3">
              Keep your contact header uncluttered and professional:
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 my-4 text-xs sm:text-sm space-y-1">
              <p><strong>Full Name:</strong> Alex Morgan</p>
              <p><strong>Professional Title:</strong> Senior Full Stack Engineer</p>
              <p><strong>Email:</strong> alex.morgan@email.com (Avoid unprofessional nicknames)</p>
              <p><strong>Phone:</strong> +1 (555) 234-5678</p>
              <p><strong>Location:</strong> San Francisco, CA (Street addresses are no longer required)</p>
              <p><strong>Links:</strong> LinkedIn profile, GitHub/Portfolio URL</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              3. Write a Compelling Professional Summary
            </h2>
            <p className="mt-3">
              A professional summary sits at the top of your resume and acts as an elevator pitch. Keep it to 2–4 concise sentences covering:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Your total years of relevant experience</li>
              <li>Your core area of specialization or technical domain</li>
              <li>1 or 2 high-impact, quantified career accomplishments</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              4. Structure Your Work Experience with Action & Numbers
            </h2>
            <p className="mt-3">
              Instead of pasting a list of daily chores, write impactful bullet points using Google's formula: <em>Accomplished [X] as measured by [Y] by doing [Z]</em>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm">
                <p className="font-bold text-rose-800 mb-1">❌ Weak & Passive</p>
                <p className="text-rose-900">&ldquo;Responsible for answering customer emails and fixing technical issues.&rdquo;</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm">
                <p className="font-bold text-emerald-800 mb-1">✅ Strong & Quantified</p>
                <p className="text-emerald-900">&ldquo;Resolved 45+ tier-2 technical support tickets daily, improving customer satisfaction CSAT score from 84% to 96%.&rdquo;</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              5. List Relevant Skills & Education
            </h2>
            <p className="mt-3">
              Tailor your skills section specifically to the keywords listed in the job description you are targeting. Include both hard skills (e.g., Python, SQL, Financial Modeling, CAD) and recognized credentials.
            </p>
          </section>

          {/* Inline CTA */}
          <div className="my-8 p-6 rounded-xl bg-brand-50 border border-brand-200 text-center">
            <h3 className="text-lg font-bold text-brand-900 mb-1">Create Your Resume in Minutes</h3>
            <p className="text-xs sm:text-sm text-brand-700 mb-4">
              Apply these proven principles directly in our free universal resume builder.
            </p>
            <Link to="/builder">
              <Button variant="primary" size="md" className="font-bold">
                Create Your Resume Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

