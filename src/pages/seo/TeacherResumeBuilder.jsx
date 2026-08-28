import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Award, Users, CheckCircle2 } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const TeacherResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="Resume Builder for Teachers & Educators – Teaching Resume Templates"
        description="Build an educator resume highlighting classroom management, curriculum development, student achievement metrics, state teaching licenses, and pedagogical certifications."
        canonicalUrl="https://resumeforge.app/resume-builder-for-teachers"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Resume Builder for Teachers' }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>K-12 Educators, Professors & Instructors</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Create an Outstanding Teaching & Education Resume
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Showcase your instructional philosophy, state licensing credentials, standardized test score gains, special education accommodations, and classroom leadership.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right" className="w-full sm:w-auto px-8 py-3.5">
                Create Teacher Resume
              </Button>
            </Link>
          </div>
        </div>

        {/* Essential Educator Sections */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Key Focus Areas on an Educator's Resume
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">State Licensure</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prominently list your state teaching certificate, endorsement subject areas, and grade-level authorizations.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Classroom Metrics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quantify literacy rate improvements, AP exam pass rates, parent-teacher satisfaction ratings, or individualized education plan (IEP) execution.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Curriculum Design</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Highlight STEM curriculum integration, hybrid digital classroom tools (Google Classroom, Canvas), and differentiated learning methodologies.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-emerald-800 text-white rounded-2xl p-8 sm:p-10 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Build Your Educator Resume Today
          </h2>
          <p className="text-sm text-emerald-100 max-w-xl mx-auto mb-6">
            Free, clean templates formatted to impress school districts, administrators, and university hiring committees.
          </p>
          <Link to="/builder">
            <Button variant="primary" size="lg" className="bg-white text-emerald-900 hover:bg-slate-100 font-bold px-8">
              Start Free Educator Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

