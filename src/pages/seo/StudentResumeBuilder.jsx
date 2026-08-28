import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, CheckCircle2, BookOpen, Award, Lightbulb } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const StudentResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="Resume Builder for Students – Create an Internship & College Resume"
        description="Build a standout student resume for internships, part-time jobs, campus leadership, and post-graduation roles. Highlight coursework, projects, volunteer experience, and GPA."
        canonicalUrl="https://resumeforge.app/resume-builder-for-students"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Resume Builder for Students' }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>High School & College Students</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Build an Impressive Student Resume That Gets Noticed
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Don't have years of formal work experience? No problem. Learn how to leverage your coursework, academic projects, leadership roles, and extracurricular activities to win internships and early career jobs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right" className="w-full sm:w-auto px-8 py-3.5">
                Build My Student Resume
              </Button>
            </Link>
            <Link to="/guides/resume-with-no-experience">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 py-3.5">
                No-Experience Guide
              </Button>
            </Link>
          </div>
        </div>

        {/* Student Resume Blueprint */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            The Ideal Student Resume Section Order
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Header & Contact Info</h3>
                <p className="text-xs text-slate-600 mt-0.5">Include your full name, location (city, state), clean university or professional email address, and LinkedIn profile.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Education (Put First)</h3>
                <p className="text-xs text-slate-600 mt-0.5">Place education near the top. Include your university/school name, degree, anticipated graduation date, major, GPA (if 3.5+), and relevant coursework.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Academic & Personal Projects</h3>
                <p className="text-xs text-slate-600 mt-0.5">Highlight semester capstones, research projects, open-source work, or club initiatives showing practical execution.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs flex-shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Experience & Volunteer Work</h3>
                <p className="text-xs text-slate-600 mt-0.5">Part-time jobs, campus tutoring, student organization leadership, and community service all demonstrate work ethic and collaboration.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs flex-shrink-0">5</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Technical & Soft Skills</h3>
                <p className="text-xs text-slate-600 mt-0.5">List software tools, languages, laboratory skills, and communication capabilities relevant to your field.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Advice Box */}
        <div className="p-6 bg-brand-50/70 rounded-2xl border border-brand-200/80 mb-12 flex gap-4">
          <Lightbulb className="w-6 h-6 text-brand-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-base font-bold text-brand-900">Resume Tip for Students: Quantify Your Impact</h3>
            <p className="text-xs sm:text-sm text-brand-800 mt-1 leading-relaxed">
              Instead of writing &ldquo;Helped organize campus charity drive&rdquo;, write &ldquo;Coordinated a 12-person student team to execute annual campus food drive, raising \$4,500 and gathering 2,000+ meals.&rdquo; Specific numbers demonstrate capability.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-sky-600 to-indigo-700 text-white rounded-2xl p-8 sm:p-10 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Ready to Land Your Next Internship or Job?
          </h2>
          <p className="text-sm text-sky-100 max-w-xl mx-auto mb-6">
            Build your free student resume today in minutes.
          </p>
          <Link to="/builder">
            <Button variant="primary" size="lg" className="bg-white text-sky-900 hover:bg-slate-100 font-bold px-8">
              Start Free Student Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

