import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { compressImage } from '../../utils/fileTools/imageUtils';
import { downloadBlob, formatBytes } from '../../utils/fileTools/formatters';
import { Minimize2, AlertCircle } from 'lucide-react';

export const CompressImage = () => {
  const tool = getToolBySlug('compress-image');
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(0.75);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFilesSelected = (newFiles) => {
    setError(null);
    setFiles(newFiles.slice(0, 1));
  };

  const handleRemove = () => {
    setFiles([]);
    setError(null);
    setResult(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleCompress = async () => {
    if (!files[0]) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(25);

      const res = await compressImage(
        files[0],
        parseFloat(quality),
        2560,
        2560,
        (pct) => setProgress(pct)
      );

      const url = URL.createObjectURL(res.blob);
      setPreviewUrl(url);
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while compressing the image.');
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
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setError(null);
    setProgress(0);
  };

  return (
    <ToolLayout tool={tool}>
      {result ? (
        <DownloadResult
          fileName={result.name}
          fileSize={result.compressedSize}
          downloadLabel="Download Compressed Image"
          previewUrl={previewUrl}
          additionalStats={
            result.savingsPercent > 0 ? (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                Reduced by {result.savingsPercent}%
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                Optimized
              </span>
            )
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Compressing image..."
          subtitle="Optimizing image pixels and compressing file directly in your browser."
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
            />
          ) : (
            <div className="space-y-6">
              <FileList
                files={files}
                onRemove={handleRemove}
                allowReorder={false}
                allowAddMore={false}
              />

              {/* Compression Quality */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Compression Quality: {Math.round(quality * 100)}%
                  </label>
                  <span className="text-xs text-slate-500 font-mono">
                    Original: {formatBytes(files[0].size)}
                  </span>
                </div>

                <input
                  type="range"
                  min="0.3"
                  max="0.95"
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-slate-900"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Smaller File Size</span>
                  <span>Balanced</span>
                  <span>Higher Quality</span>
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
                onClick={handleCompress}
                icon={<Minimize2 className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Compress Image
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

