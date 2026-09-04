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
import { FileImage, AlertCircle } from 'lucide-react';

export const JpgToPdf = () => {
  const tool = getToolBySlug('jpg-to-pdf');
  const [files, setFiles] = useState([]);
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
    setFiles(prev => {
      if (index === prev.length - 1) return prev;
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
    if (files.length === 0) {
      setError('Please add at least one image to convert.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(10);

      const res = await imagesToPdf(files, {}, (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while converting images to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result?.blob) {
      downloadBlob(result.blob, result.name || 'converted-images.pdf');
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
          downloadLabel="Download Generated PDF"
          additionalStats={
            <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
              {files.length} {files.length === 1 ? 'Page' : 'Pages'}
            </span>
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Converting images to PDF..."
          subtitle="Embedding images into standard PDF pages inside your browser."
        />
      ) : (
        <div className="space-y-6">
          {files.length === 0 ? (
            <FileUploader
              onFilesSelected={handleFilesSelected}
              accept={tool.accept}
              acceptSummary={tool.acceptSummary}
              multiple={true}
              maxFileSizeMB={tool.maxFileSizeMB}
              allowedExtensions={['.jpg', '.jpeg', '.png', '.webp']}
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
                accept=".jpg,.jpeg,.png,.webp"
              />

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs sm:text-sm text-rose-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-slate-500">
                  Each image will become a full page in the output PDF document.
                </p>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  icon={<FileImage className="w-4 h-4" />}
                  onClick={handleConvert}
                  className="w-full sm:w-auto shadow-md shadow-brand-500/20"
                >
                  Convert {files.length} {files.length === 1 ? 'Image' : 'Images'} to PDF
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

