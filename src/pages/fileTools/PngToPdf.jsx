import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { imagesToPdf } from '../../utils/fileTools/pdfUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { FileCheck, AlertCircle } from 'lucide-react';

export const PngToPdf = () => {
  const tool = getToolBySlug('png-to-pdf');
  const [files, setFiles] = useState([]);
  const [pageSize, setPageSize] = useState('a4'); // 'a4' | 'letter' | 'original'
  const [orientation, setOrientation] = useState('auto'); // 'auto' | 'portrait' | 'landscape'
  const [imageFit, setImageFit] = useState('fit'); // 'fit' | 'fill' | 'original'
  const [margin, setMargin] = useState('small'); // 'none' | 'small' | 'medium' | 'large'
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFilesSelected = (newFiles) => {
    setError(null);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemove = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    setFiles(prev => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleMoveDown = (index) => {
    if (index === prev.length - 1) return;
    setFiles(prev => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleClearAll = () => {
    setFiles([]);
    setError(null);
    setResult(null);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(15);

      const options = {
        pageSize,
        orientation,
        imageFit,
        margin
      };

      const res = await imagesToPdf(files, options, (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while converting PNG images to PDF.');
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
          originalFileName={files.length === 1 ? files[0].name : `${files.length} PNG images`}
          fileSize={result.size}
          downloadLabel="Download Generated PDF"
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} Pages • {pageSize.toUpperCase()}
              </span>
            ) : null
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Converting PNG images to PDF..."
          subtitle="Embedding graphics into page frames directly in your browser."
        />
      ) : (
        <div className="space-y-6">
          {files.length === 0 ? (
            <FileUploader
              onFilesSelected={handleFilesSelected}
              accept={tool.accept}
              acceptSummary={tool.acceptSummary}
              multiple={tool.multiple}
              maxFileSizeMB={tool.maxFileSizeMB}
              allowedExtensions={['.png']}
            />
          ) : (
            <div className="space-y-6">
              <FileList
                files={files}
                onRemove={handleRemove}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onAddMore={handleFilesSelected}
                onClearAll={handleClearAll}
                allowReorder={true}
                allowAddMore={true}
                accept=".png"
              />

              {/* Layout and Page Options */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  PDF Page & Layout Settings
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Page Size */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Page Size
                    </label>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="a4">A4 (Standard)</option>
                      <option value="letter">US Letter</option>
                      <option value="original">Original Image Size</option>
                    </select>
                  </div>

                  {/* Orientation */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Orientation
                    </label>
                    <select
                      value={orientation}
                      disabled={pageSize === 'original'}
                      onChange={(e) => setOrientation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50"
                    >
                      <option value="auto">Auto (Match Image)</option>
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>

                  {/* Image Fit */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Image Fit
                    </label>
                    <select
                      value={imageFit}
                      disabled={pageSize === 'original'}
                      onChange={(e) => setImageFit(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50"
                    >
                      <option value="fit">Fit (Keep Proportions)</option>
                      <option value="fill">Fill (Cover Page)</option>
                      <option value="original">Original Size</option>
                    </select>
                  </div>

                  {/* Margins */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Margins
                    </label>
                    <select
                      value={margin}
                      onChange={(e) => setMargin(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="none">No Margin</option>
                      <option value="small">Small Margin</option>
                      <option value="medium">Medium Margin</option>
                      <option value="large">Large Margin</option>
                    </select>
                  </div>
                </div>
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
                onClick={handleConvert}
                icon={<FileCheck className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Convert {files.length} {files.length === 1 ? 'PNG Image' : 'PNG Images'} to PDF
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};
