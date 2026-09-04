import { Link } from 'react-router-dom';
import { FileText, Shield, CheckCircle2, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Resume<span className="text-brand-400">Forge</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A universal online resume and CV builder, plus free in-browser PDF & file tools for job seekers, professionals, and students.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span>100% Privacy — All data and files processed locally in your browser</span>
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
                  Students & Interns
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-freshers" className="hover:text-white transition-colors">
                  Freshers & Graduates
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
                  Teachers & Educators
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-engineers" className="hover:text-white transition-colors">
                  Engineers & Technical
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

          {/* Column 4: Free PDF & File Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              PDF & File Tools
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/file-tools/merge-pdf" className="hover:text-white transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link to="/file-tools/split-pdf" className="hover:text-white transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link to="/file-tools/compress-pdf" className="hover:text-white transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link to="/file-tools/jpg-to-pdf" className="hover:text-white transition-colors">
                  JPG to PDF
                </Link>
              </li>
              <li>
                <Link to="/file-tools/pdf-to-jpg" className="hover:text-white transition-colors">
                  PDF to JPG
                </Link>
              </li>
              <li>
                <Link to="/file-tools/create-zip" className="hover:text-white transition-colors">
                  Create ZIP
                </Link>
              </li>
              <li>
                <Link to="/file-tools/extract-zip" className="hover:text-white transition-colors">
                  Extract ZIP
                </Link>
              </li>
              <li>
                <Link to="/file-tools" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
                  All File Tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Resume Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Resume Tools
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
                  CV Maker
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="hover:text-white transition-colors">
                  Online Resume Creator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeForge. Universal Free Online Resume & CV Builder.</p>
          <p className="flex items-center gap-1">
            Built for job seekers worldwide • 100% Free Client-Side Tool
          </p>
        </div>
      </div>
    </footer>
  );
};
