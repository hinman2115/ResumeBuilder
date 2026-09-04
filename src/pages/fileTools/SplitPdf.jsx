import { useState, useEffect } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { splitPdf, getPdfInfo } from '../../utils/fileTools/pdfUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { Scissors, AlertCircle, FileArchive, FileText } from 'lucide-react';

export const SplitPdf = () => {
  const tool = getToolBySlug('split-pdf');
  const [files, setFiles] = useState([]);
  const [pageCount, setPageCount] = useState(null);
  const [mode, setMode] = useState('all'); // 'all' | 'range'
  const [pageRange, setPageRange] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (files.length > 0) {
      getPdfInfo(files[0])
        .then(info => {
          setPageCount(info.pageCount);
          if (!pageRange && info.pageCount > 1) {
            setPageRange(`1-${Math.min(3, info.pageCount)}`);
          }
        })
        .catch(err => {
          setError(err.message || 'Could not inspect PDF.');
        });
    } else {
      setPageCount(null);
    }
  }, [files]);

  const handleFilesSelected = (newFiles) => {
    setError(null);
    setFiles(newFiles.slice(0, 1));
  };

  const handleRemove = () => {
    setFiles([]);
    setPageCount(null);
    setError(null);
    setResult(null);
  };

  const handleSplit = async () => {
    if (!files[0]) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(10);

      const res = await splitPdf(
        files[0],
        { mode, pageRange },
        (pct) => setProgress(pct)
      );
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while splitting the PDF.');
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
    setPageCount(null);
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
          downloadLabel={result.isZip ? 'Download All Pages (ZIP)' : 'Download Extracted PDF'}
          additionalStats={
            result.isZip ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.totalPages} Files (ZIP)
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.extractedCount} Pages
              </span>
            )
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Splitting PDF document..."
          subtitle="Extracting pages and preparing your file inside your browser."
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

              {pageCount !== null && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Total Document Pages:
                    </span>
                    <span className="text-sm font-black text-brand-700 bg-brand-50 px-3 py-0.5 rounded-full border border-brand-200/70">
                      {pageCount} {pageCount === 1 ? 'Page' : 'Pages'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-xs font-bold text-slate-700 block mb-2.5">
                      Choose Split Mode:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setMode('all')}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                          mode === 'all'
                            ? 'border-brand-500 bg-brand-50/70 shadow-2xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <FileArchive className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Extract All Pages</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Splits every page into an individual PDF inside a ZIP.
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMode('range')}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                          mode === 'range'
                            ? 'border-brand-500 bg-brand-50/70 shadow-2xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <FileText className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Custom Page Range</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Extract specific pages into a single new PDF document.
                          </p>
                        </div>
                      </button>
                    </div>

                    {mode === 'range' && (
                      <div className="mt-4 pt-3 border-t border-slate-200/60">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Enter Page Range (e.g. 1-3, 5, 8):
                        </label>
                        <input
                          type="text"
                          value={pageRange}
                          onChange={(e) => setPageRange(e.target.value)}
                          placeholder={`e.g. 1-${Math.min(2, pageCount || 1)}`}
                          className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-mono"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Separate ranges with dashes and numbers with commas (1 to {pageCount}).
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

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
                  icon={<Scissors className="w-4 h-4" />}
                  onClick={handleSplit}
                  className="w-full sm:w-auto shadow-md shadow-brand-500/20"
                >
                  Split PDF Document
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

