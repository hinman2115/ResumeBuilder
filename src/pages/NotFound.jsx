import { Link } from 'react-router-dom';
import { FileQuestion, ArrowRight, Home, LayoutTemplate, BookOpen } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/common/Button';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <SEO
        title="404 - Page Not Found | ResumeForge"
        description="The page you are looking for does not exist. Browse our free resume builder, professional templates, or career guides."
      />

      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <FileQuestion className="w-8 h-8" />
        </div>

        <h1 className="text-4xl font-black text-slate-900 tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mt-2">Page Not Found</h2>
        <p className="text-sm text-slate-600 mt-2 mb-8 leading-relaxed">
          The page you requested might have been moved, renamed, or is temporarily unavailable.
        </p>

        <div className="space-y-3">
          <Link to="/" className="block w-full">
            <Button variant="primary" size="md" className="w-full" icon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/builder" className="block">
              <Button variant="outline" size="sm" className="w-full">
                Resume Builder
              </Button>
            </Link>
            <Link to="/templates" className="block">
              <Button variant="outline" size="sm" className="w-full">
                Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

