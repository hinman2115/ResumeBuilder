import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, ShieldAlert, Cpu, Cog } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const EngineerResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="Resume Builder for Engineers – Mechanical, Electrical & Civil Engineering"
        description="Create an engineering resume highlighting technical problem-solving, CAD modeling, compliance standards (ISO, ASME, IEEE), patents, and multimillion-dollar project lifecycles."
        canonicalUrl="https://resumeforge.app/resume-builder-for-engineers"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Resume Builder for Engineers' }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Cog className="w-3.5 h-3.5" />
            <span>Mechanical, Electrical, Civil & Industrial Engineers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Engineering Resumes Structured for Technical Precision
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Highlight your technical certifications (FE/EIT, PE), CAD tool mastery (SolidWorks, AutoCAD, Revit), project budgets, manufacturing tolerances, and regulatory compliance.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right" className="w-full sm:w-auto px-8 py-3.5">
                Create Engineer Resume
              </Button>
            </Link>
          </div>
        </div>

        {/* Engineering Highlights */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Essential Components of a High-Impact Engineering Resume
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Software & Tooling</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                List engineering software proficiency: MATLAB, ANSYS FEA, SolidWorks, AutoCAD, LabVIEW, PLC programming, or Revit.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Standards & Compliance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mention adherence to standards: ISO 9001, OSHA, ASME Boiler codes, IEEE standards, Six Sigma Green/Black Belt quality control.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Capital Project Scope</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quantify deliverables: &ldquo;Managed \$2.4M plant automation upgrade delivering 18% cycle time reduction and zero safety infractions.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Build Your Engineering Resume Now
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-6">
            ATS-optimized templates engineered for technical precision and recruiter clarity.
          </p>
          <Link to="/builder">
            <Button variant="primary" size="lg" className="bg-brand-600 hover:bg-brand-500 font-bold px-8">
              Open Engineering Resume Builder
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

