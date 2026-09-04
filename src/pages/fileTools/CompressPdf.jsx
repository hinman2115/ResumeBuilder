import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { compressPdf } from '../../utils/fileTools/pdfUtils';
import { downloadBlob, formatBytes } from '../../utils/fileTools/formatters';
import { Minimize2, AlertCircle, Sparkles } from 'lucide-react';

export const CompressPdf = () => {
  const tool = getToolBySlug('compress-pdf');
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFilesSelected = (newFiles) => {
    setError(null);
    setFiles(newFiles.slice(0, 1));
  };

  const handleRemove = () => {
    setFiles([]);
    setError(null);
    setResult(null);
  };

  const handleCompress = async () => {
    if (!files[0]) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(15);

      const res = await compressPdf(files[0], {}, (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while compressing the PDF document.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result?.blob) {
      downloadBlob(result.blob, result.name);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <ToolLayout tool={tool}>
      {result ? (
        <DownloadResult
          fileName={result.name}
          fileSize={result.compressedSize}
          downloadLabel="Download Compressed PDF"
          additionalStats={
            result.savingsPercent > 0 ? (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                Reduced by {result.savingsPercent}%
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                Optimized
              </span>
            )
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Compressing PDF document..."
          subtitle="Optimizing object streams and stripping redundant structures directly in your browser."
        />
      ) : (
        <div className="space-y-6">
          {files.length === 0 ? (
            <FileUploader
              onFilesSelected={handleFilesSelected}
              accept={tool.accept}
              acceptSummary={tool.acceptSummary}
              multiple={false}
              maxFileSizeMB={tool.maxFileSizeMB}
              allowedExtensions={['.pdf']}
            />
          ) : (
            <div className="space-y-6">
              <FileList
                files={files}
                onRemove={handleRemove}
                allowReorder={false}
                allowAddMore={false}
              />

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">Current File Size</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Optimization will compact streams and clean unreferenced objects.
                  </p>
                </div>
                <span className="text-sm font-black text-slate-800 bg-white px-3 py-1 rounded-lg border border-slate-200 font-mono">
                  {formatBytes(files[0].size)}
                </span>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs sm:text-sm text-rose-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  icon={<Minimize2 className="w-4 h-4" />}
                  onClick={handleCompress}
                  className="w-full sm:w-auto shadow-md shadow-brand-500/20"
                >
                  Compress PDF Now
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

