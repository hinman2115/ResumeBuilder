import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { pdfToImages } from '../../utils/fileTools/pdfUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { ImagePlus, AlertCircle } from 'lucide-react';

export const PdfToPng = () => {
  const tool = getToolBySlug('pdf-to-png');
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

      const res = await pdfToImages(files[0], 'png', 1.0, 2.0, (pct) => setProgress(pct));
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

              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200/80 text-xs sm:text-sm text-purple-900 leading-relaxed">
                <p className="font-bold mb-1">Lossless PNG Quality</p>
                <p className="text-purple-700">
                  Each PDF page is rasterized at high resolution (2x retina scale) with crisp typography and clean vector edges. Multi-page documents are packaged into a convenient ZIP archive.
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

