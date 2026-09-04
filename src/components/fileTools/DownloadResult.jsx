import { CheckCircle2, Download, RotateCcw, FileText, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { formatBytes } from '../../utils/fileTools/formatters';
import { Link } from 'react-router-dom';

export const DownloadResult = ({
  onDownload,
  onReset,
  fileName = 'processed-file',
  originalFileName = null,
  fileSize = null,
  downloadLabel = 'Download File',
  additionalStats = null,
  previewUrl = null,
  warning = null
}) => {
  return (
    <div className="w-full bg-[#F7F7FA] rounded-[16px] border border-[#E1E2E7] p-8 sm:p-12 text-center shadow-[var(--ui-shadow)] flex flex-col items-center justify-center animate-in fade-in duration-200">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 shadow-sm border border-emerald-100">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
        Conversion complete
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md">
        Processing completed successfully. You can now download your file or start another operation.
      </p>

      {/* Warning callout if present */}
      {warning && (
        <div className="w-full max-w-md mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-800 text-xs text-left leading-relaxed flex items-start gap-2.5">
          <span className="font-bold text-amber-900 flex-shrink-0">Notice:</span>
          <span>{warning}</span>
        </div>
      )}

      {/* File info card with Original & Output */}
      <div className="w-full max-w-md my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left space-y-3">
        {originalFileName && (
          <div className="flex items-center justify-between text-xs pb-2.5 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Original:</span>
            <span className="font-mono text-slate-700 truncate max-w-[220px]">{originalFileName}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-brand-600 flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Output</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {fileName}
              </p>
              {fileSize && (
                <p className="text-[11px] text-slate-500">
                  Size: {formatBytes(fileSize)}
                </p>
              )}
            </div>
          </div>

          {additionalStats && (
            <div className="text-right pl-3 flex-shrink-0">
              {additionalStats}
            </div>
          )}
        </div>
      </div>

      {/* Image Preview if available */}
      {previewUrl && (
        <div className="mb-6 max-w-xs rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          <img src={previewUrl} alt="Preview" className="w-full h-auto object-contain max-h-48 bg-slate-100" />
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <Button
          type="button"
          variant="primary"
          size="lg"
          icon={<Download className="w-5 h-5" />}
          iconPosition="left"
          onClick={onDownload}
          className="w-full sm:flex-1 shadow-md shadow-brand-500/20"
        >
          {downloadLabel}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          icon={<RotateCcw className="w-4 h-4" />}
          iconPosition="left"
          onClick={onReset}
          className="w-full sm:w-auto"
        >
          Start Over
        </Button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-4 text-xs font-semibold text-slate-500">
        <Link to="/file-tools" className="hover:text-brand-600 transition-colors flex items-center gap-1">
          <span>More File Tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <span>•</span>
        <Link to="/builder" className="hover:text-brand-600 transition-colors flex items-center gap-1">
          <span>Resume Builder</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

