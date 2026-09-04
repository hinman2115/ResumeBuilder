import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { resizeImage } from '../../utils/fileTools/imageUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { Maximize2, AlertCircle, Link, Unlink } from 'lucide-react';

export const ResizeImage = () => {
  const tool = getToolBySlug('resize-image');
  const [files, setFiles] = useState([]);
  const [origDimensions, setOrigDimensions] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [lockRatio, setLockRatio] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFilesSelected = (newFiles) => {
    setError(null);
    const file = newFiles[0];
    if (!file) return;

    setFiles([file]);

    // Read original dimensions
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      setOrigDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      URL.revokeObjectURL(url);
    };
    img.src = url;
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

  const handleWidthChange = (val) => {
    const newWidth = parseInt(val, 10) || 0;
    setWidth(newWidth);
    if (lockRatio && origDimensions.width > 0) {
      const ratio = origDimensions.height / origDimensions.width;
      setHeight(Math.round(newWidth * ratio));
    }
  };

  const handleHeightChange = (val) => {
    const newHeight = parseInt(val, 10) || 0;
    setHeight(newHeight);
    if (lockRatio && origDimensions.height > 0) {
      const ratio = origDimensions.width / origDimensions.height;
      setWidth(Math.round(newHeight * ratio));
    }
  };

  const handleResize = async () => {
    if (!files[0]) return;
    if (width <= 0 || height <= 0) {
      setError('Please provide valid width and height dimensions.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(25);

      const res = await resizeImage(
        files[0],
        width,
        height,
        lockRatio,
        (pct) => setProgress(pct)
      );

      const url = URL.createObjectURL(res.blob);
      setPreviewUrl(url);
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while resizing the image.');
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
          downloadLabel="Download Resized Image"
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
          title="Resizing image..."
          subtitle="Resampling pixels and drawing to new dimensions directly in your browser."
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

              {/* Dimensions Input */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Image Dimensions (Pixels)
                  </h4>
                  {origDimensions.width > 0 && (
                    <span className="text-xs text-slate-500 font-mono">
                      Original: {origDimensions.width} × {origDimensions.height} px
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={width}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={height}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setLockRatio(!lockRatio)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    lockRatio
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {lockRatio ? <Link className="w-3.5 h-3.5" /> : <Unlink className="w-3.5 h-3.5" />}
                  <span>{lockRatio ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}</span>
                </button>
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
                onClick={handleResize}
                icon={<Maximize2 className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Resize Image ({width} × {height} px)
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

