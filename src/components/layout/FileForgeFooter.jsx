import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, ArrowRight, Lock, Zap } from 'lucide-react';
import { ProductBrand } from '../branding/ProductBrand';

export const FileForgeFooter = () => {
  return (
    <footer className="bg-[#1b1c22] text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand & Security Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                File<span className="text-indigo-400">Forge</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Free online PDF and file tools. Convert, merge, split, compress, and organize documents directly inside your browser with zero server uploads.
            </p>

            <div className="space-y-2 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold">100% In-Browser Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span>Zero files uploaded to external servers</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span>Instant client-side WebAssembly processing</span>
              </div>
            </div>
          </div>

          {/* Column 2: PDF Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              PDF Tools
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
                <Link to="/file-tools/pdf-to-word" className="hover:text-white transition-colors">
                  PDF to Word
                </Link>
              </li>
              <li>
                <Link to="/file-tools/word-to-pdf" className="hover:text-white transition-colors">
                  Word to PDF
                </Link>
              </li>
              <li>
                <Link to="/file-tools/pdf-to-png" className="hover:text-white transition-colors">
                  PDF to PNG
                </Link>
              </li>
              <li>
                <Link to="/file-tools/rotate-pdf" className="hover:text-white transition-colors">
                  Rotate PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Image Converters */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Image Tools
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/file-tools/convert-image" className="hover:text-white transition-colors">
                  Convert Image
                </Link>
              </li>
              <li>
                <Link to="/file-tools/webp-to-jpg" className="hover:text-white transition-colors">
                  WebP to JPG
                </Link>
              </li>
              <li>
                <Link to="/file-tools/webp-to-png" className="hover:text-white transition-colors">
                  WebP to PNG
                </Link>
              </li>
              <li>
                <Link to="/file-tools/jpg-to-png" className="hover:text-white transition-colors">
                  JPG to PNG
                </Link>
              </li>
              <li>
                <Link to="/file-tools/png-to-pdf" className="hover:text-white transition-colors">
                  PNG to PDF
                </Link>
              </li>
              <li>
                <Link to="/file-tools/compress-image" className="hover:text-white transition-colors">
                  Compress Image
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Document & File Utilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              File Utilities
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/file-tools/create-zip" className="hover:text-white transition-colors">
                  Create ZIP Archive
                </Link>
              </li>
              <li>
                <Link to="/file-tools/extract-zip" className="hover:text-white transition-colors">
                  Extract ZIP
                </Link>
              </li>
              <li>
                <Link to="/file-tools/combine-files" className="hover:text-white transition-colors">
                  Combine Files
                </Link>
              </li>
              <li>
                <Link to="/file-tools/rename-files" className="hover:text-white transition-colors">
                  Batch Rename Files
                </Link>
              </li>
              <li>
                <Link to="/file-tools/text-to-pdf" className="hover:text-white transition-colors">
                  Text to PDF
                </Link>
              </li>
              <li>
                <Link to="/file-tools" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                  All 37 File Tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Sister Product Callout (ResumeForge) */}
          <div className="bg-slate-800/60 border border-slate-700/70 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-400 mb-2">
                <span>Sister Product</span>
              </div>
              <h5 className="text-sm font-bold text-white mb-1.5">
                Need to create a resume?
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Visit <strong className="text-slate-200">ResumeForge</strong> for ATS-friendly templates and instant A4 PDF export.
              </p>
            </div>
            <Link
              to="/builder"
              className="inline-flex items-center justify-center gap-1.5 w-full px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <span>Go to ResumeForge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FileForge. Free In-Browser PDF &amp; File Tools.</p>
          <p className="flex items-center gap-1">
            Part of the ResumeForge &amp; FileForge multi-utility platform.
          </p>
        </div>
      </div>
    </footer>
  );
};
