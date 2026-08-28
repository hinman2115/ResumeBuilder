import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Download, Sparkles, Ban } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const FreeResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="100% Free Resume Builder – No Sign-Up & No Hidden Paywalls"
        description="Free resume builder with no subscriptions, no credit card required, and no watermarks. Create, customize, and download high-resolution A4 PDF resumes instantly."
        canonicalUrl="https://resumeforge.app/free-resume-builder"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Free Resume Builder' }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Free Forever • Zero Hidden Fees</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            The Free Resume Builder That Truly Has No Catch
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Tired of spending 30 minutes creating a resume only to be hit with a \$20 paywall when clicking download? ResumeForge is completely free from start to PDF export.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right" className="w-full sm:w-auto px-8 py-3.5">
                Start Building for Free
              </Button>
            </Link>
          </div>
        </div>

        {/* Comparison: ResumeForge vs Other Builders */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            How ResumeForge Compares to Other Resume Sites
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                  <th className="pb-3 px-4">Feature</th>
                  <th className="pb-3 px-4 text-brand-600">ResumeForge</th>
                  <th className="pb-3 px-4 text-slate-400">Typical Resume Sites</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Account / Sign-Up Required</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> No signup needed</td>
                  <td className="py-3.5 px-4 text-rose-500 flex items-center gap-1.5"><Ban className="w-4 h-4" /> Forced registration</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">PDF Download Fee</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> \$0 (100% Free)</td>
                  <td className="py-3.5 px-4 text-rose-500 flex items-center gap-1.5"><Ban className="w-4 h-4" /> \$2.95 trial / \$25/month</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Watermarks on PDF</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Zero watermarks</td>
                  <td className="py-3.5 px-4 text-rose-500 flex items-center gap-1.5"><Ban className="w-4 h-4" /> Watermarked unless paid</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Data Privacy</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Saved in your browser</td>
                  <td className="py-3.5 px-4 text-slate-500">Stored on remote servers</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Template Access</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> All templates unlocked</td>
                  <td className="py-3.5 px-4 text-rose-500 flex items-center gap-1.5"><Ban className="w-4 h-4" /> Premium lockouts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Unlimited Free Downloads</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Export as many versions of your resume as you want for different job applications with zero restrictions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Private & Confidential</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your resume data is stored directly in your local browser storage. We do not sell your personal information or spam your email.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Instant Live Editing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Watch your resume update dynamically as you type with real-time A4 page layout preview.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-8 sm:p-10 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Build Your Free Resume Now
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto mb-6">
            Get an interview-ready resume without spending a single dollar.
          </p>
          <Link to="/builder">
            <Button variant="primary" size="lg" className="bg-white text-emerald-900 hover:bg-slate-100 font-bold px-8">
              Start Free Resume Builder
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

