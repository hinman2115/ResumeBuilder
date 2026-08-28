import { Link } from 'react-router-dom';
import { Clock, ArrowRight, CheckCircle2, Lightbulb, GraduationCap } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const ResumeWithNoExperience = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Write a Resume With No Work Experience',
    description: 'Expert strategies for high schoolers, college students, freshers, and career changers to create a professional resume with zero formal job history.',
    author: {
      '@type': 'Organization',
      name: 'ResumeForge Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ResumeForge'
    },
    datePublished: '2026-02-10',
    dateModified: '2026-08-28'
  };

  return (
    <article className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="How to Write a Resume with No Work Experience | ResumeForge"
        description="Learn how to write a competitive resume when you have no formal job experience. How to frame education, academic projects, volunteer work, clubs, and certifications."
        canonicalUrl="https://resumeforge.app/guides/resume-with-no-experience"
        ogType="article"
        schemaData={articleSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Career Guides', url: '/guides' },
            { label: 'Resume with No Experience' }
          ]}
        />

        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200/60">
              Entry-Level Guide
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              6 min read • Updated August 2026
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How to Write a Resume with No Work Experience
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Applying for your very first job or transitioning into a brand-new field? Here is how to fill a one-page resume with high-value proof of your skills and dedication.
          </p>
        </header>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              What to Include When You Have No Formal Job History
            </h2>
            <p className="mt-3">
              Employers hiring for entry-level positions don't expect 5 years of corporate experience. They look for <strong>dependability, willingness to learn, communication skills, and practical problem solving</strong>. You can demonstrate all of these using:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <h3 className="font-bold text-slate-900 mb-1">1. Academic & Side Projects</h3>
                <p className="text-slate-600">Research papers, laboratory experiments, software apps, design portfolios, or marketing campaigns executed in school.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <h3 className="font-bold text-slate-900 mb-1">2. Leadership & Campus Clubs</h3>
                <p className="text-slate-600">Holding an executive post in a student club, sports team captaincy, or organizing campus events.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <h3 className="font-bold text-slate-900 mb-1">3. Volunteer & Community Work</h3>
                <p className="text-slate-600">Fundraising, tutoring younger students, food bank coordination, or non-profit volunteer shifts.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <h3 className="font-bold text-slate-900 mb-1">4. Industry Certifications</h3>
                <p className="text-slate-600">Courses from Google, Coursera, Meta, HubSpot, or AWS demonstrating specialized initiative.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 border-slate-100">
              Lead With Your Education Section
            </h2>
            <p className="mt-3">
              When you lack formal job titles, place your <strong>Education</strong> section directly below your Summary. Expand your education block with:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Expected graduation date / degree conferral</li>
              <li>Cumulative GPA (if 3.5 or above)</li>
              <li>Academic honors, Dean's list, or merit scholarships</li>
              <li>Relevant Coursework (4–6 core classes directly related to the target role)</li>
            </ul>
          </section>

          {/* Inline CTA */}
          <div className="my-8 p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <h3 className="text-lg font-bold text-emerald-950 mb-1">Build Your First Resume Now</h3>
            <p className="text-xs sm:text-sm text-emerald-800 mb-4">
              Our intuitive forms make it effortless to highlight coursework, skills, and projects.
            </p>
            <Link to="/builder">
              <Button variant="primary" size="md" className="bg-emerald-600 hover:bg-emerald-700 font-bold">
                Create Your Resume Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

