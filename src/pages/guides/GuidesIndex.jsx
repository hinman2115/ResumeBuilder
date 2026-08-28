import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const GUIDES = [
  {
    slug: 'how-to-make-a-resume',
    title: 'How to Make a Resume in 2026: Complete Step-by-Step Guide',
    description: 'Learn how to write an interview-winning resume from scratch with proper formatting, section hierarchy, and modern ATS requirements.',
    readTime: '8 min read',
    category: 'Fundamentals'
  },
  {
    slug: 'resume-with-no-experience',
    title: 'How to Write a Resume With No Work Experience',
    description: 'Practical strategies for students, freshers, and career changers to highlight projects, education, volunteer work, and transferable skills.',
    readTime: '6 min read',
    category: 'Entry-Level'
  },
  {
    slug: 'resume-vs-cv',
    title: 'Resume vs CV: Key Differences Explained',
    description: 'Understand when to use a Resume vs a Curriculum Vitae, global formatting differences across the US, UK, EU, and academic standards.',
    readTime: '5 min read',
    category: 'Global Advice'
  },
  {
    slug: 'how-to-write-resume-summary',
    title: 'How to Write a Powerful Professional Resume Summary',
    description: 'Formulas, sentence structures, and role-specific examples to hook hiring managers in the first 6 seconds of reading your resume.',
    readTime: '6 min read',
    category: 'Writing Tips'
  },
  {
    slug: 'how-to-list-work-experience',
    title: 'How to List Work Experience on a Resume (Action & Metrics)',
    description: 'Master the XYZ bullet point formula to quantify achievements, highlight leadership, and turn boring job duties into compelling impact statements.',
    readTime: '7 min read',
    category: 'Career Growth'
  }
];

export const GuidesIndex = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="Resume & Career Guides – Free Expert Resume Advice | ResumeForge"
        description="Comprehensive, actionable resume writing guides, career advice, CV tips, and ATS formatting strategies to help you land your next job."
        canonicalUrl="https://resumeforge.app/guides"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Career Guides' }]} />

        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Career & Resume Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Expert Resume & Career Guides
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Actionable, no-fluff guides written by hiring specialists to help you craft an exceptional resume, pass automated screening, and ace your interviews.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              to={`/guides/${guide.slug}`}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-brand-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200/60">
                    {guide.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug mb-2">
                  {guide.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {guide.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-600 group-hover:text-brand-700 gap-1">
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to Put These Tips Into Practice?</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            Build your professional resume on ResumeForge for free in minutes.
          </p>
          <Link to="/builder">
            <Button variant="primary" size="lg" className="bg-brand-600 hover:bg-brand-500 font-bold px-8">
              Open Resume Builder
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

