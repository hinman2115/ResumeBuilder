import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { ToolLayout } from './ToolLayout';
import { FILE_TOOLS } from '../../data/fileTools';

export const ComingSoonTool = ({ tool }) => {
  const availableTools = FILE_TOOLS.filter(t => t.status === 'available');

  return (
    <ToolLayout tool={tool}>
      <div className="py-8 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-5">
          <Clock className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>In Active Development</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {tool.title} is Coming Soon!
        </h2>

        <p className="mt-2 text-sm text-slate-600 max-w-md leading-relaxed">
          We are building a privacy-first, in-browser engine for {tool.title}. In the meantime, you can try our live file tools below.
        </p>

        {tool.features && tool.features.length > 0 && (
          <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 max-w-md w-full text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Planned Capabilities:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {tool.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-2 flex flex-col sm:flex-row items-center gap-3">
          <Link to="/file-tools">
            <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              Explore Available Tools
            </Button>
          </Link>
          <Link to="/builder">
            <Button variant="outline" size="md">
              Create My Resume
            </Button>
          </Link>
        </div>
      </div>
    </ToolLayout>
  );
};

