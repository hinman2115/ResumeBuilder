import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { deletePdfPages, getPdfPageCount } from '../../utils/fileTools/pdfUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { Trash2, AlertCircle } from 'lucide-react';

export const DeletePdfPages = () => {
  const tool = getToolBySlug('delete-pdf-pages');
  const [files, setFiles] = useState([]);
  const [pagesToDelete, setPagesToDelete] = useState('');
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
      if (count <= 1) {
        setError('This PDF only has 1 page. You cannot delete all pages.');
      }
    } catch {
      setTotalPages(1);
    }
  };

  const handleRemove = () => {
    setFiles([]);
    setPagesToDelete('');
    setError(null);
    setResult(null);
  };

  const handleDelete = async () => {
    if (!files[0]) return;
    if (!pagesToDelete.trim()) {
      setError('Please specify at least one page number to delete (e.g. 2, 4).');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(20);

      const res = await deletePdfPages(files[0], pagesToDelete, (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while deleting pages.');
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
    setPagesToDelete('');
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
          downloadLabel="Download Cleaned PDF"
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} Pages Remaining
              </span>
            ) : null
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Removing pages from PDF..."
          subtitle="Stripping selected pages directly inside your browser."
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

              {/* Page to delete input */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Pages to Remove
                  </label>
                  <span className="text-xs text-slate-500 font-medium">
                    Total: {totalPages} {totalPages === 1 ? 'page' : 'pages'}
                  </span>
                </div>

                <input
                  type="text"
                  value={pagesToDelete}
                  onChange={(e) => setPagesToDelete(e.target.value)}
                  placeholder="e.g. 2, 4 or 3-5"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                />

                <p className="text-xs text-slate-500">
                  Enter page numbers to remove separated by commas or ranges (e.g. <span className="font-mono font-semibold">2, 5</span>).
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
                onClick={handleDelete}
                icon={<Trash2 className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Delete Selected Pages
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

