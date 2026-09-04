import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { pdfToJpg } from '../../utils/fileTools/pdfUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { Image, AlertCircle } from 'lucide-react';

export const PdfToJpg = () => {
  const tool = getToolBySlug('pdf-to-jpg');
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

  const handleConvert = async () => {
    if (!files[0]) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(10);

      const res = await pdfToJpg(files[0], {}, (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while converting PDF to JPG.');
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
    if (result?.previewUrl) {
      try {
        URL.revokeObjectURL(result.previewUrl);
      } catch {
        // ignore
      }
    }
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
          previewUrl={result.previewUrl}
          downloadLabel={result.isZip ? 'Download All JPGs (ZIP)' : 'Download JPG Image'}
          additionalStats={
            <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
              {result.pageCount} {result.pageCount === 1 ? 'Page' : 'Pages'}
            </span>
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Converting PDF pages to JPG..."
          subtitle="Rendering high-DPI raster images in your browser."
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

              <p className="text-xs text-slate-500 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                Multi-page PDF documents will be rendered at crisp 1.8x resolution and packaged into a ZIP download.
              </p>

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
                  icon={<Image className="w-4 h-4" />}
                  onClick={handleConvert}
                  className="w-full sm:w-auto shadow-md shadow-brand-500/20"
                >
                  Convert to JPG
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

