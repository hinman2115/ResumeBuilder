import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { convertImage } from '../../utils/fileTools/imageUtils';
import { downloadBlob, formatBytes } from '../../utils/fileTools/formatters';
import { Sparkles, AlertCircle } from 'lucide-react';

export const ConvertImage = ({ forcedSlug = null, defaultTarget = 'jpeg' }) => {
  const location = useLocation();
  const slugFromPath = location.pathname.split('/').filter(Boolean).pop();
  const currentSlug = forcedSlug || slugFromPath || 'convert-image';
  const tool = getToolBySlug(currentSlug) || getToolBySlug('convert-image');

  // Determine initial target format based on current route
  const getInitialFormat = () => {
    if (currentSlug.endsWith('to-jpg') || currentSlug.endsWith('to-jpeg')) return 'jpeg';
    if (currentSlug.endsWith('to-png')) return 'png';
    if (currentSlug.endsWith('to-webp')) return 'webp';
    return defaultTarget || 'jpeg';
  };

  const [files, setFiles] = useState([]);
  const [targetFormat, setTargetFormat] = useState(getInitialFormat());
  const [quality, setQuality] = useState(0.9);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTargetFormat(getInitialFormat());
  }, [currentSlug]);

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

  const handleConvert = async () => {
    if (!files[0]) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(25);

      const res = await convertImage(
        files[0],
        targetFormat,
        parseFloat(quality),
        (pct) => setProgress(pct)
      );

      const url = URL.createObjectURL(res.blob);
      setPreviewUrl(url);
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while converting the image.');
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
          fileSize={result.size}
          downloadLabel={`Download ${targetFormat.toUpperCase()} Image`}
          previewUrl={previewUrl}
          additionalStats={
            result.dimensions ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.dimensions.width} × {result.dimensions.height} px
              </span>
            ) : null
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title={`Converting image to ${targetFormat.toUpperCase()}...`}
          subtitle="Processing image pixels and encoding format directly in your browser."
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

              {/* Conversion options */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target Format & Settings
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Convert To Format
                    </label>
                    <select
                      value={targetFormat}
                      onChange={(e) => setTargetFormat(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="jpeg">JPG / JPEG (Universal compatibility)</option>
                      <option value="png">PNG (Lossless & transparent)</option>
                      <option value="webp">WebP (Modern compressed web format)</option>
                    </select>
                  </div>

                  {targetFormat !== 'png' && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Output Quality
                        </label>
                        <span className="text-xs font-mono font-bold text-slate-600">
                          {Math.round(quality * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.4"
                        max="1.0"
                        step="0.05"
                        value={quality}
                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-slate-900 mt-2"
                      />
                    </div>
                  )}
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
                icon={<Sparkles className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Convert Image to {targetFormat.toUpperCase()}
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

