import { Link } from 'react-router-dom';
import { FileText, Shield, ArrowRight, Layers } from 'lucide-react';
import { ProductBrand } from '../branding/ProductBrand';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <ProductBrand product="resume" size="md" link={true} />

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              ResumeForge is a free online resume and CV builder designed for job seekers worldwide. Build an interview-winning resume in minutes.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span>100% Privacy — All data is processed locally in your browser</span>
            </div>
          </div>

          {/* Column 2: Resume Builders by Role */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Resumes by Career
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/resume-builder-for-students" className="hover:text-white transition-colors">
                  Students &amp; Interns
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-freshers" className="hover:text-white transition-colors">
                  Freshers &amp; Graduates
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-professionals" className="hover:text-white transition-colors">
                  Experienced Pros
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-developers" className="hover:text-white transition-colors">
                  Software Developers
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-teachers" className="hover:text-white transition-colors">
                  Teachers &amp; Educators
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-engineers" className="hover:text-white transition-colors">
                  Engineers &amp; Technical
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Career Guides */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Career Guides
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/guides/how-to-make-a-resume" className="hover:text-white transition-colors">
                  How to Make a Resume
                </Link>
              </li>
              <li>
                <Link to="/guides/resume-with-no-experience" className="hover:text-white transition-colors">
                  Resume With No Experience
                </Link>
              </li>
              <li>
                <Link to="/guides/resume-vs-cv" className="hover:text-white transition-colors">
                  Resume vs CV Differences
                </Link>
              </li>
              <li>
                <Link to="/guides/how-to-write-resume-summary" className="hover:text-white transition-colors">
                  Writing a Summary
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
                  View All Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resume Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Resume Creation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/builder" className="hover:text-white transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-white transition-colors">
                  Resume Templates
                </Link>
              </li>
              <li>
                <Link to="/free-resume-builder" className="hover:text-white transition-colors">
                  Free Resume Maker
                </Link>
              </li>
              <li>
                <Link to="/cv-builder" className="hover:text-white transition-colors">
                  CV Builder
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="hover:text-white transition-colors">
                  Online Resume Creator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Sister Product Callout (FileForge) */}
          <div className="bg-slate-800/60 border border-slate-700/70 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-2">
                <span>Sister Product</span>
              </div>
              <h5 className="text-sm font-bold text-white mb-1.5">
                Need to work with PDFs or files?
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Visit <strong className="text-slate-200">FileForge</strong> — our free in-browser suite for PDF merging, converting, compressing, and ZIP utilities.
              </p>
            </div>
            <Link
              to="/file-tools"
              className="inline-flex items-center justify-center gap-1.5 w-full px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <span>Explore FileForge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeForge. Build a professional resume in minutes.</p>
          <p className="flex items-center gap-1">
            Part of the ResumeForge &amp; FileForge multi-utility platform.
          </p>
        </div>
      </div>
    </footer>
  );
};
