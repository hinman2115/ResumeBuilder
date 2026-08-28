import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Eye,
  Download,
  Layout,
  ArrowRight,
  CheckCircle2,
  Shield,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Code2,
  Building,
  DollarSign,
  Palette,
  Users
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { StatsSection } from '../components/home/StatsSection';
import { Button } from '../components/common/Button';
import { defaultResumeData } from '../data/defaultResume';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ProfessionalTemplate } from '../templates/ProfessionalTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';

const FAQS = [
  {
    question: "Is ResumeForge free?",
    answer: "Yes, ResumeForge is 100% free to use. You can create, edit, customize, and download your complete high-resolution A4 PDF resume without hidden paywalls, watermark extortion, or subscription fees."
  },
  {
    question: "Can I create a resume without an account?",
    answer: "Absolutely. No sign-up, email registration, or login is required. You can start creating your resume immediately upon visiting the website."
  },
  {
    question: "Can I create a resume if I have no work experience?",
    answer: "Yes! ResumeForge is designed for all career stages, including students, freshers, and career changers. You can easily highlight your education, academic projects, volunteer work, certifications, and technical skills instead of extensive employment history."
  },
  {
    question: "Can experienced professionals and executives use ResumeForge?",
    answer: "Yes. Our executive and professional layouts support reverse-chronological leadership histories, quantifiable revenue achievements, team management metrics, and multi-page international CVs."
  },
  {
    question: "Can I download my resume as a PDF?",
    answer: "Yes. With one click on the 'Download PDF' button, ResumeForge compiles your formatted resume into a crisp, vector-clean A4 PDF without any website UI, navigation bars, or watermarks."
  },
  {
    question: "Can I change resume templates without losing my typed data?",
    answer: "Yes! All templates share the same unified data structure. You can switch between Modern, Professional, and Minimal templates or change accent colors anytime without retyping your information."
  },
  {
    question: "Can I create a CV instead of a resume?",
    answer: "Yes. ResumeForge templates follow international standards suitable for US resumes, UK & European CVs, and global academic or corporate applications."
  },
  {
    question: "Does ResumeForge work on mobile devices?",
    answer: "Yes. The builder includes a responsive mobile layout with dedicated 'Edit' and 'Preview' tabs, making it easy to build or review your resume on smartphones and tablets."
  },
  {
    question: "Can I edit my resume later?",
    answer: "Yes. Your progress is automatically saved to your browser's local storage in real time. When you return to ResumeForge on the same device and browser, your resume is instantly restored."
  }
];

const UNIVERSAL_CAREERS = [
  { label: 'Students & Interns', icon: <GraduationCap className="w-4 h-4" />, url: '/resume-builder-for-students' },
  { label: 'Freshers & Graduates', icon: <Sparkles className="w-4 h-4" />, url: '/resume-builder-for-freshers' },
  { label: 'Experienced Professionals', icon: <Briefcase className="w-4 h-4" />, url: '/resume-builder-for-professionals' },
  { label: 'Software Developers & IT', icon: <Code2 className="w-4 h-4" />, url: '/resume-builder-for-developers' },
  { label: 'Teachers & Educators', icon: <Users className="w-4 h-4" />, url: '/resume-builder-for-teachers' },
  { label: 'Engineers & Architects', icon: <Building className="w-4 h-4" />, url: '/resume-builder-for-engineers' },
  { label: 'Doctors & Nurses', icon: <HeartPulse className="w-4 h-4" />, url: '/resume-builder' },
  { label: 'Accountants & Finance', icon: <DollarSign className="w-4 h-4" />, url: '/resume-builder' },
  { label: 'Designers & Creatives', icon: <Palette className="w-4 h-4" />, url: '/resume-builder' },
  { label: 'Managers & Executives', icon: <Briefcase className="w-4 h-4" />, url: '/resume-builder-for-professionals' },
  { label: 'Sales & Marketing', icon: <Zap className="w-4 h-4" />, url: '/resume-builder' },
  { label: 'Freelancers & Creators', icon: <Sparkles className="w-4 h-4" />, url: '/resume-builder' },
  { label: 'Career Changers', icon: <Sparkles className="w-4 h-4" />, url: '/guides/resume-with-no-experience' },
  { label: 'Anyone Seeking a Job', icon: <CheckCircle2 className="w-4 h-4" />, url: '/free-resume-builder' },
];

export const Home = () => {
  const sampleData = defaultResumeData;
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://resumeforge.app/#website',
        url: 'https://resumeforge.app/',
        name: 'ResumeForge',
        description: 'Universal Free Online Resume and CV Builder for Everyone',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://resumeforge.app/templates?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://resumeforge.app/#webapp',
        name: 'ResumeForge Resume Builder',
        url: 'https://resumeforge.app/builder',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://resumeforge.app/#faq',
        mainEntity: FAQS.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SEO
        title="Free Resume Builder – Create a Professional Resume Online | ResumeForge"
        description="Build a professional resume for any career with ResumeForge. 100% free universal resume & CV builder with live instant preview, customizable templates, and immediate A4 PDF export."
        canonicalUrl="https://resumeforge.app/"
        schemaData={homeSchema}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 pb-18 lg:pt-20 lg:pb-28 bg-gradient-to-b from-brand-50/70 via-white to-slate-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-brand-400/10 via-sky-400/10 to-indigo-400/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Universal Online Resume & CV Builder for Everyone</span>
          </div>

          {/* Primary H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight lg:leading-tight">
            Free Resume Builder – Create a Professional Resume Online
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Build a polished, ATS-compliant resume or CV using professional templates. Enter your information, customize styling, preview live, and download a crisp A4 PDF immediately.
          </p>

          {/* Action CTAs */}
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
                View Templates
              </Button>
            </Link>
          </div>

          {/* Key Value Checks */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No signup or login required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free & Private
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant A4 PDF Download
            </span>
          </div>
        </div>
      </section>

      {/* Universal Resume Builder Section: For Any Career */}
      <section className="py-14 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create a Resume for Any Career or Industry
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Whether you are a student, fresher, experienced executive, teacher, engineer, healthcare worker, or freelancer, ResumeForge provides flexible formatting tailored to your exact career goals.
            </p>
          </div>

          {/* Career Tags Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-5xl mx-auto">
            {UNIVERSAL_CAREERS.map((career, idx) => (
              <Link
                key={idx}
                to={career.url}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition-all duration-150 shadow-2xs group"
              >
                <span className="text-slate-500 group-hover:text-brand-600 transition-colors">{career.icon}</span>
                <span>{career.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Real Statistics Section */}
      <StatsSection />

      {/* Templates Preview Section */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Layout className="w-3.5 h-3.5" />
                <span>Professional Resume Templates</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
                Designed for Maximum Recruiter Impact
              </h2>
            </div>
            <Link to="/templates">
              <Button variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                Explore All Templates
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
                    Contemporary aesthetic with badge skill tags, color accents, and structured timeline bullets. Ideal for tech, marketing, product, and creative roles.
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
                      Executive Standard
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Formal executive layout with centered typography and classic horizontal dividers. Ideal for management, healthcare, education, legal, and finance.
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
                    Sleek whitespace, lightweight typography, and uncluttered structure. Perfect for engineers, researchers, consultants, writers, and startups.
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

      {/* How Our Resume Builder Works */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">
              Simple 4-Step Process
            </h2>
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
              How Our Resume Builder Works
            </p>
            <p className="mt-4 text-base text-slate-600">
              Create an ATS-friendly, professional resume in under 10 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm mb-4">1</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Enter Your Information</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Add your contact details, professional summary, work experience, education, key projects, and skills with helpful quick-add suggestions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-4">2</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Choose Template & Theme</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Select between Modern, Professional, and Minimal styles. Tailor accent colors to match your personal branding with 1 click.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">3</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Preview in Real Time</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                See your edits instantly on an authentic A4 canvas with zoom controls. Empty sections are automatically hidden for clean formatting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm mb-4">4</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Download Crisp A4 PDF</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Export a vector-clean PDF immediately without watermarks, paywalls, or fees. Ready to email or upload to job boards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use ResumeForge */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">
              The ResumeForge Advantage
            </h2>
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
              Why Job Seekers Choose ResumeForge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">100% Free & Private</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All data is stored directly in your local browser. We do not sell your personal information, require credit cards, or add watermarks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">ATS-Friendly Architecture</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clean semantic headings, standard typography, and logical ordering ensure automated screening software parses your application correctly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Seamless Template Switching</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Switch between modern, executive, and minimalist templates instantly. Your typed information is preserved 100% across all designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">
              Got Questions?
            </h2>
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
              Frequently Asked Questions
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Everything you need to know about creating and downloading your resume with ResumeForge.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200/80 bg-slate-50/40 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <span className="text-slate-400 p-1 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-gradient-to-tr from-brand-900 via-brand-800 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Build Your Professional Resume in Minutes
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-100 max-w-xl mx-auto">
            100% free, private, and interview-ready. No credit card, no sign-up barrier, no hassle.
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
