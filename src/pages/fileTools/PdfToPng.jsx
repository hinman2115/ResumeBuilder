import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { pdfToImages, getPdfPageCount } from '../../utils/fileTools/pdfUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { ImagePlus, AlertCircle } from 'lucide-react';

export const PdfToPng = () => {
  const tool = getToolBySlug('pdf-to-png');
  const [files, setFiles] = useState([]);
  const [pageCount, setPageCount] = useState(null);
  const [pageScope, setPageScope] = useState('all'); // 'all' | 'custom'
  const [customRange, setCustomRange] = useState('');
  const [resolutionScale, setResolutionScale] = useState(2.0); // 1.0, 2.0, 3.0
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
      setPageCount(count);
      setCustomRange(count > 1 ? `1-${count}` : '1');
    } catch {
      setPageCount(1);
      setCustomRange('1');
    }
  };

  const handleRemove = () => {
    setFiles([]);
    setPageCount(null);
    setError(null);
    setResult(null);
  };

  const handleConvert = async () => {
    if (!files[0]) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(10);

      const options = {
        format: 'image/png',
        scale: parseFloat(resolutionScale),
        pageRange: pageScope === 'custom' ? customRange : ''
      };

      const res = await pdfToImages(files[0], options, (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while converting PDF to PNG images.');
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
          originalFileName={files[0]?.name}
          fileSize={result.size}
          downloadLabel={result.isZip ? 'Download All Pages (ZIP)' : 'Download PNG Image'}
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} {result.pageCount === 1 ? 'Page' : 'Pages'} Converted
              </span>
            ) : null
          }
          previewUrl={result.isZip ? null : (result.blob ? URL.createObjectURL(result.blob) : null)}
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Rendering PDF pages to PNG..."
          subtitle="Drawing high-resolution lossless graphics directly in your browser."
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

              {/* Conversion Options */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    PNG Render Settings
                  </h4>
                  {pageCount && (
                    <span className="text-xs text-slate-500 font-semibold bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      Total: {pageCount} {pageCount === 1 ? 'Page' : 'Pages'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pages to Convert
                    </label>
                    <select
                      value={pageScope}
                      onChange={(e) => setPageScope(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="all">All Pages ({pageCount || 1})</option>
                      <option value="custom">Selected Pages / Range</option>
                    </select>

                    {pageScope === 'custom' && (
                      <input
                        type="text"
                        value={customRange}
                        onChange={(e) => setCustomRange(e.target.value)}
                        placeholder="e.g. 1, 3, 5-7"
                        className="mt-2 w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Resolution / Quality
                    </label>
                    <select
                      value={resolutionScale}
                      onChange={(e) => setResolutionScale(parseFloat(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value={1.0}>1x Standard (72 DPI - Fast)</option>
                      <option value={2.0}>2x High Resolution (150 DPI - Recommended)</option>
                      <option value={3.0}>3x Ultra Resolution (300 DPI - Print Quality)</option>
                    </select>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 pt-1">
                  {pageCount === 1 ? 'Single page will download as a direct .png file.' : 'Multiple pages will be packaged into a zip file (pdf-pages.zip).'}
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
                icon={<ImagePlus className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Convert PDF to PNG
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};
