import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X, ArrowRight, LayoutTemplate, BookOpen } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E1E2E7] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#30313A] flex items-center justify-center text-white shadow-sm group-hover:bg-slate-700 transition-colors duration-200">
              <FileText className="w-5 h-5" />
            </div>
            <div>
                <span className="text-xl font-bold tracking-tight text-[#2F3038]">
                Resume<span className="text-brand-600">Forge</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 rounded-full border border-brand-200/60">
                Free
              </span>
            </div>
          </Link>

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
              to="/file-tools"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                isActive('/file-tools')
                  ? 'text-brand-600 bg-brand-50/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>File Tools</span>
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
              aria-label="Toggle Menu"
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
            to="/file-tools"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/file-tools') ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            File Tools
          </Link>
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
