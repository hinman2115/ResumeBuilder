import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Eye,
  Download,
  Layout,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { defaultResumeData } from '../data/defaultResume';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ProfessionalTemplate } from '../templates/ProfessionalTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';

export const Home = () => {
  const sampleData = defaultResumeData;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-gradient-to-b from-brand-50/70 via-white to-slate-50">
        {/* Subtle background glow decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-brand-400/10 via-sky-400/10 to-indigo-400/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Fast, Free & 100% Client-Side Resume Builder</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight lg:leading-none">
            Build a Professional Resume{' '}
            <span className="bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
              in Minutes
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Create an ATS-friendly, beautifully designed resume with live instant preview. Pick from 3 crafted templates, tailor colors, and download a crisp A4 PDF immediately.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="w-full sm:w-auto shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 text-base px-8 py-3.5"
              >
                Create My Resume
              </Button>
            </Link>
            <Link to="/templates">
              <Button
                variant="outline"
                size="lg"
                icon={<Layout className="w-4 h-4 text-slate-500" />}
                className="w-full sm:w-auto text-base px-6 py-3.5"
              >
                Explore Templates
              </Button>
            </Link>
          </div>

          {/* Quick value bullets */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> No signup required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> 100% Free & Private
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Instant A4 PDF Download
            </span>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">
              Why ResumeForge
            </h2>
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
              Everything you need to land your next interview
            </p>
            <p className="mt-4 text-base text-slate-600">
              Designed with hiring managers and applicant tracking systems in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 hover:border-brand-200 hover:shadow-md transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Easy to Build</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Intuitive step-by-step form with quick-add chips, pre-built suggestions, and smart helpers for work experience and skills.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 hover:border-brand-200 hover:shadow-md transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Professional Templates</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Choose between Modern, Professional, and Minimal styles. Switch seamlessly anytime without losing any of your typed data.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 hover:border-brand-200 hover:shadow-md transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Live A4 Preview</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                See exactly how your resume looks on a real A4 page with zoom controls, instant updates, and intelligent auto-hiding of blank fields.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 hover:border-brand-200 hover:shadow-md transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Instant PDF Download</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                One-click high-resolution PDF download with crystal clear text and crisp formatting — zero watermarks and zero fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview Showcase */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">
                Curated Designs
              </h2>
              <p className="text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
                Designed for every career stage
              </p>
            </div>
            <Link to="/templates">
              <Button variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                View All Templates
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Template Card 1: Modern */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col">
              <div className="bg-slate-100 p-4 border-b border-slate-200 relative group overflow-hidden h-[340px] flex justify-center items-start">
                <div className="transform scale-[0.38] origin-top w-[794px] pointer-events-none shadow-md rounded bg-white">
                  <ModernTemplate data={sampleData} />
                </div>
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <Link to="/builder?template=modern">
                    <Button variant="primary" size="md">
                      Use Modern Template
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-slate-900">Modern</h3>
                    <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Contemporary aesthetic with badge skill pills, color accents, and structured timeline bullets. Ideal for tech & product roles.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link to="/builder?template=modern" className="block w-full">
                    <Button variant="secondary" size="sm" className="w-full">
                      Customize Modern
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Template Card 2: Professional */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col">
              <div className="bg-slate-100 p-4 border-b border-slate-200 relative group overflow-hidden h-[340px] flex justify-center items-start">
                <div className="transform scale-[0.38] origin-top w-[794px] pointer-events-none shadow-md rounded bg-white">
                  <ProfessionalTemplate data={sampleData} />
                </div>
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <Link to="/builder?template=professional">
                    <Button variant="primary" size="md">
                      Use Professional Template
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-slate-900">Professional</h3>
                    <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                      Executive Classic
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Formal executive layout with centered typography and classic horizontal dividers. Ideal for finance, legal, consulting, and management.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link to="/builder?template=professional" className="block w-full">
                    <Button variant="secondary" size="sm" className="w-full">
                      Customize Professional
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Template Card 3: Minimal */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col">
              <div className="bg-slate-100 p-4 border-b border-slate-200 relative group overflow-hidden h-[340px] flex justify-center items-start">
                <div className="transform scale-[0.38] origin-top w-[794px] pointer-events-none shadow-md rounded bg-white">
                  <MinimalTemplate data={sampleData} />
                </div>
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <Link to="/builder?template=minimal">
                    <Button variant="primary" size="md">
                      Use Minimal Template
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-slate-900">Minimal</h3>
                    <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                      Clean Swiss
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sleek whitespace, lightweight typography, and uncluttered structure. Perfect for designers, creatives, and modern minimalists.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link to="/builder?template=minimal" className="block w-full">
                    <Button variant="secondary" size="sm" className="w-full">
                      Customize Minimal
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-gradient-to-tr from-brand-900 via-brand-800 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to stand out to top recruiters?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-100 max-w-xl mx-auto">
            Build your resume today in minutes. No credit card, no sign-up barrier, no hassle.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/builder">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="bg-white hover:bg-slate-100 text-brand-900 shadow-xl text-base px-8 py-3.5 font-bold"
              >
                Create My Resume Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

