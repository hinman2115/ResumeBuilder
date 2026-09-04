import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { rotatePdf } from '../../utils/fileTools/pdfUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { RotateCw, AlertCircle } from 'lucide-react';

export const RotatePdf = () => {
  const tool = getToolBySlug('rotate-pdf');
  const [files, setFiles] = useState([]);
  const [rotationAngle, setRotationAngle] = useState(90);
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

  const handleRotate = async () => {
    if (!files[0]) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(20);

      const res = await rotatePdf(files[0], rotationAngle, (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while rotating the PDF.');
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
          downloadLabel="Download Rotated PDF"
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} Pages • {rotationAngle}°
              </span>
            ) : null
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Rotating PDF document..."
          subtitle="Applying rotation to all pages directly inside your browser."
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

              {/* Rotation Options */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Rotation Angle
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { angle: 90, label: '90° Clockwise' },
                    { angle: 180, label: '180° Flip' },
                    { angle: 270, label: '270° (90° CCW)' }
                  ].map(({ angle, label }) => (
                    <button
                      key={angle}
                      type="button"
                      onClick={() => setRotationAngle(angle)}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex flex-col items-center justify-center gap-1.5 ${
                        rotationAngle === angle
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <RotateCw className={`w-4 h-4 ${rotationAngle === angle ? 'text-white' : 'text-slate-500'}`} style={{ transform: `rotate(${angle - 90}deg)` }} />
                      <span>{label}</span>
                    </button>
                  ))}
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
                onClick={handleRotate}
                icon={<RotateCw className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Rotate PDF ({rotationAngle}°)
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

