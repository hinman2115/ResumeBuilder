import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Terminal, Cpu, GitBranch } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

export const DeveloperResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <SEO
        title="Resume Builder for Software Developers & Engineers | Tech Resume Templates"
        description="Create a technical software engineering resume that highlights programming languages, frameworks, cloud architecture, system design, and open-source GitHub projects."
        canonicalUrl="https://resumeforge.app/resume-builder-for-developers"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Resume Builder for Developers' }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>Software Engineers & Tech Professionals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Build a Clean, High-Impact Developer Resume
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Tech recruiters look for tech stack clarity, architectural scope, and measurable engineering impact. Build a resume that highlights your GitHub repositories, codebases, and systems.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder?template=modern">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right" className="w-full sm:w-auto px-8 py-3.5">
                Build Tech Resume
              </Button>
            </Link>
          </div>
        </div>

        {/* Tech Resume Tips */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            What Technical Recruiters Look For on a Developer Resume
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Precise Tech Stack Tags</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Group skills cleanly: Languages (JavaScript, TypeScript, Go), Frameworks (React, Node, Django), Cloud/DevOps (AWS, Docker, Kubernetes).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Architecture & Scale</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mention scale: &ldquo;Built Kafka streaming pipeline handling 50k events/sec with 99.99% uptime.&rdquo; Scale indicates senior engineering maturity.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <GitBranch className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Live Project Links</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Include GitHub profile, live project demos, and open-source pull request contributions directly in the project cards.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-sky-700 to-indigo-900 text-white rounded-2xl p-8 sm:p-10 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Build Your Developer Resume Free
          </h2>
          <p className="text-sm text-sky-100 max-w-xl mx-auto mb-6">
            Use the Modern template with badge skill pills and timeline layout.
          </p>
          <Link to="/builder?template=modern">
            <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8">
              Open Developer Template
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

