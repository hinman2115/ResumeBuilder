import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { extractPdfPages, getPdfPageCount } from '../../utils/fileTools/pdfUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { Copy, AlertCircle } from 'lucide-react';

export const ExtractPdfPages = () => {
  const tool = getToolBySlug('extract-pdf-pages');
  const [files, setFiles] = useState([]);
  const [pageRange, setPageRange] = useState('1');
  const [totalPages, setTotalPages] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFilesSelected = async (newFiles) => {
    setError(null);
    const file = newFiles[0];
    if (!file) return;

    setFiles([file]);
    try {
      const count = await getPdfPageCount(file);
      setTotalPages(count);
      setPageRange(count > 1 ? `1-${Math.min(2, count)}` : '1');
    } catch {
      setTotalPages(1);
      setPageRange('1');
    }
  };

  const handleRemove = () => {
    setFiles([]);
    setError(null);
    setResult(null);
  };

  const handleExtract = async () => {
    if (!files[0]) return;
    if (!pageRange.trim()) {
      setError('Please enter a valid page range (e.g. 1, 3, 5-7).');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(20);

      const res = await extractPdfPages(files[0], pageRange, (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while extracting pages.');
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
          fileSize={result.size}
          downloadLabel="Download Extracted PDF"
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} Pages Extracted
              </span>
            ) : null
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Extracting pages from PDF..."
          subtitle="Selecting and assembling specified pages in your browser."
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

              {/* Page range inputs */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Pages to Extract
                  </label>
                  <span className="text-xs text-slate-500 font-medium">
                    Total: {totalPages} {totalPages === 1 ? 'page' : 'pages'}
                  </span>
                </div>

                <input
                  type="text"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="e.g. 1, 3, 5-7"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                />

                <p className="text-xs text-slate-500">
                  Enter single numbers separated by commas or ranges with hyphens (e.g. <span className="font-mono font-semibold">1, 2, 4-6</span>).
                </p>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs sm:text-sm text-rose-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={handleExtract}
                icon={<Copy className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Extract Pages to PDF
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

