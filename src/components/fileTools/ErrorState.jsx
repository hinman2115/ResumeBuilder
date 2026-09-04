import { AlertCircle, RotateCcw, UploadCloud } from 'lucide-react';
import { Button } from '../common/Button';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Your file could not be processed. Please try another file.',
  onRetry = null,
  onReset = null
}) => {
  return (
    <div className="w-full bg-white rounded-[16px] border border-[#E1E2E7] p-8 text-center shadow-[0_1px_3px_rgba(47,48,56,0.04)] flex flex-col items-center justify-center animate-in fade-in duration-200">
      <div className="w-12 h-12 rounded-[12px] bg-[#fff0f0] text-[#ef4444] border border-[#fed7d7] flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="text-[18px] font-semibold text-[#2F3038]">
        {title}
      </h3>
      <p className="mt-1 text-[14px] text-[#6F707A] max-w-md leading-relaxed">
        {message}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <Button
            type="button"
            variant="primary"
            size="md"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
        {onReset && (
          <Button
            type="button"
            variant="outline"
            size="md"
            icon={<UploadCloud className="w-4 h-4" />}
            onClick={onReset}
          >
            Choose Another File
          </Button>
        )}
      </div>
    </div>
  );
};

