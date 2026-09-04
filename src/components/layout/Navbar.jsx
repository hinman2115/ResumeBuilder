import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, LayoutTemplate, BookOpen, Layers } from 'lucide-react';
import { Button } from '../common/Button';
import { ProductBrand } from '../branding/ProductBrand';

export const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E1E2E7] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <ProductBrand product="resume" size="md" link={true} />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/'
                  ? 'text-brand-600 bg-brand-50/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/builder"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/builder')
                  ? 'text-brand-600 bg-brand-50/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Resume Builder
            </Link>

            <Link
              to="/templates"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                isActive('/templates')
                  ? 'text-brand-600 bg-brand-50/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutTemplate className="w-4 h-4" />
              <span>Templates</span>
            </Link>

            <Link
              to="/guides"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                isActive('/guides')
                  ? 'text-brand-600 bg-brand-50/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Career Guides</span>
            </Link>

            {/* Cross-Product Nav Link */}
            <Link
              to="/file-tools"
              className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 text-indigo-700 bg-indigo-50/60 hover:bg-indigo-100/60 border border-indigo-200/60 ml-1"
              title="Switch to FileForge — Free PDF & File Tools"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>FileForge Tools</span>
            </Link>
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/builder">
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="shadow-sm hover:shadow-brand-500/20"
              >
                Create My Resume
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle ResumeForge Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-5 space-y-2 animate-in slide-in-from-top duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              location.pathname === '/' ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </Link>
          <Link
            to="/builder"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/builder') ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Resume Builder
          </Link>
          <Link
            to="/templates"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/templates') ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Templates
          </Link>
          <Link
            to="/guides"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/guides') ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Career Guides
          </Link>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/file-tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200/80 text-sm font-semibold text-indigo-900"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Switch to FileForge (PDF &amp; File Tools)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
            </Link>
          </div>

          <div className="pt-2">
            <Link to="/builder" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Create My Resume
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
