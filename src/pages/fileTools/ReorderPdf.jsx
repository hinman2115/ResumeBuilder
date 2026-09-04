import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { reorderPdf, getPdfPageCount } from '../../utils/fileTools/pdfUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { ArrowUpDown, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';

export const ReorderPdf = () => {
  const tool = getToolBySlug('reorder-pdf-pages');
  const [files, setFiles] = useState([]);
  const [pageOrder, setPageOrder] = useState([]); // array of 1-based page numbers
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
      if (count < 2) {
        setError('This document only has 1 page. Please select a multi-page PDF to reorder pages.');
      }
      setPageOrder(Array.from({ length: count }, (_, i) => i + 1));
    } catch {
      // default fallback
      setPageOrder([1, 2]);
    }
  };

  const handleRemove = () => {
    setFiles([]);
    setPageOrder([]);
    setError(null);
    setResult(null);
  };

  const handleMovePage = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= pageOrder.length) return;

    setPageOrder(prev => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const handleReorder = async () => {
    if (!files[0] || pageOrder.length < 2) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(20);

      const res = await reorderPdf(files[0], pageOrder, (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while reordering pages.');
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
    setPageOrder([]);
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
          downloadLabel="Download Reordered PDF"
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} Pages
              </span>
            ) : null
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Reordering PDF pages..."
          subtitle="Re-arranging page trees directly inside your browser."
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

              {/* Page order selector */}
              {pageOrder.length > 0 && (
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Arrange Page Sequence ({pageOrder.length} Pages)
                    </label>
                    <span className="text-xs text-slate-500 font-medium">
                      Use arrows to rearrange
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                    {pageOrder.map((pageNum, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-between gap-2"
                      >
                        <span className="text-xs font-bold text-slate-400">
                          Pos #{idx + 1}
                        </span>
                        <div className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center font-bold text-brand-700 text-sm">
                          P.{pageNum}
                        </div>
                        <div className="flex items-center gap-1 w-full justify-center">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMovePage(idx, -1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 transition-colors"
                            title="Move Earlier"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === pageOrder.length - 1}
                            onClick={() => handleMovePage(idx, 1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 transition-colors"
                            title="Move Later"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                onClick={handleReorder}
                icon={<ArrowUpDown className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Save New Page Order
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

