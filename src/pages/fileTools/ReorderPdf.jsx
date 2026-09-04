import { useState, useEffect } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { reorderPdf, getPdfPageCount, loadPdfJs } from '../../utils/fileTools/pdfUtils';
import { downloadBlob, readFileAsArrayBuffer } from '../../utils/fileTools/formatters';
import { ArrowUpDown, AlertCircle, ArrowLeft, ArrowRight, X, RotateCcw, FileText } from 'lucide-react';

export const ReorderPdf = () => {
  const tool = getToolBySlug('reorder-pdf') || getToolBySlug('reorder-pdf-pages');
  const [files, setFiles] = useState([]);
  const [pageOrder, setPageOrder] = useState([]); // array of 1-based page numbers
  const [thumbnails, setThumbnails] = useState({}); // { [pageNum]: dataUrl }
  const [totalPages, setTotalPages] = useState(0);
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
      if (count < 2) {
        setError('This document only has 1 page. Please select a multi-page PDF to reorder.');
      }
      setPageOrder(Array.from({ length: count }, (_, i) => i + 1));

      // Render thumbnails in background
      renderThumbnails(file, count);
    } catch {
      setTotalPages(1);
      setPageOrder([1]);
    }
  };

  const renderThumbnails = async (file, count) => {
    try {
      const pdfjsLib = await loadPdfJs();
      const buffer = await readFileAsArrayBuffer(file);
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const thumbs = {};

      const maxToRender = Math.min(count, 12); // render first 12 pages for performance
      for (let i = 1; i <= maxToRender; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.25 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        thumbs[i] = canvas.toDataURL('image/jpeg', 0.8);
      }
      setThumbnails(thumbs);
    } catch {
      // Thumbnails optional
    }
  };

  const handleRemoveFile = () => {
    setFiles([]);
    setPageOrder([]);
    setThumbnails({});
    setTotalPages(0);
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

  const handleRemovePage = (pageNumToRemove) => {
    if (pageOrder.length <= 1) {
      setError('A document must have at least 1 page.');
      return;
    }
    setPageOrder(prev => prev.filter(p => p !== pageNumToRemove));
  };

  const handleResetOrder = () => {
    if (totalPages > 0) {
      setPageOrder(Array.from({ length: totalPages }, (_, i) => i + 1));
      setError(null);
    }
  };

  const handleReorder = async () => {
    if (!files[0] || pageOrder.length === 0) return;

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
      downloadBlob(result.blob, result.name || 'reordered.pdf');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setPageOrder([]);
    setThumbnails({});
    setTotalPages(0);
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <ToolLayout tool={tool}>
      {result ? (
        <DownloadResult
          fileName={result.name || 'reordered.pdf'}
          originalFileName={files[0]?.name}
          fileSize={result.size}
          downloadLabel="Download Reordered PDF"
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} Pages • New Order Applied
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
                onRemove={handleRemoveFile}
                allowReorder={false}
                allowAddMore={false}
              />

              {/* Page order selector */}
              {pageOrder.length > 0 && (
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Arrange Page Order ({pageOrder.length} Pages)
                      </label>
                      <p className="text-xs text-slate-500">
                        Use arrows to reorder, or remove individual pages.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetOrder}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:text-slate-900 shadow-sm self-start"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Original Order</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {pageOrder.map((pageNum, idx) => (
                      <div
                        key={`${pageNum}-${idx}`}
                        className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-between gap-2 relative group"
                      >
                        {/* Remove Page Button */}
                        <button
                          type="button"
                          onClick={() => handleRemovePage(pageNum)}
                          title="Remove this page"
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                        >
                          <X className="w-3 h-3" />
                        </button>

                        <span className="text-[11px] font-bold text-slate-400">
                          Pos #{idx + 1}
                        </span>

                        {/* Thumbnail or Badge */}
                        {thumbnails[pageNum] ? (
                          <div className="w-16 h-20 rounded border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center">
                            <img src={thumbnails[pageNum]} alt={`Page ${pageNum}`} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-14 h-18 rounded-lg bg-brand-50 border border-brand-200 flex flex-col items-center justify-center text-brand-700 font-bold text-sm">
                            <FileText className="w-5 h-5 mb-1 opacity-60" />
                            <span>P.{pageNum}</span>
                          </div>
                        )}

                        <span className="text-xs font-bold text-slate-700">
                          Page {pageNum}
                        </span>

                        {/* Move Controls */}
                        <div className="flex items-center gap-1.5 w-full justify-center pt-1 border-t border-slate-100">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMovePage(idx, -1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 transition-colors"
                            title="Move Left"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === pageOrder.length - 1}
                            onClick={() => handleMovePage(idx, 1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 transition-colors"
                            title="Move Right"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
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
                Save Reordered PDF
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};
