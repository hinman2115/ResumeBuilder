import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { rotatePdf, getPdfPageCount } from '../../utils/fileTools/pdfUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { RotateCw, AlertCircle, Layers } from 'lucide-react';

export const RotatePdf = () => {
  const tool = getToolBySlug('rotate-pdf');
  const [files, setFiles] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [rotationMode, setRotationMode] = useState('all'); // 'all' | 'individual'
  const [allAngle, setAllAngle] = useState(90);
  const [pageRotations, setPageRotations] = useState({}); // { [pageNum]: angle }
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
      const initialMap = {};
      for (let i = 1; i <= count; i++) {
        initialMap[i] = 0;
      }
      setPageRotations(initialMap);
    } catch {
      setPageCount(1);
      setPageRotations({ 1: 0 });
    }
  };

  const handleRemove = () => {
    setFiles([]);
    setPageCount(1);
    setPageRotations({});
    setError(null);
    setResult(null);
  };

  const handlePageRotateClick = (pageNum) => {
    setPageRotations(prev => {
      const current = prev[pageNum] || 0;
      const next = (current + 90) % 360;
      return { ...prev, [pageNum]: next };
    });
  };

  const handleRotate = async () => {
    if (!files[0]) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(20);

      let rotationInput;
      if (rotationMode === 'all') {
        rotationInput = allAngle;
      } else {
        rotationInput = pageRotations;
      }

      const res = await rotatePdf(files[0], rotationInput, '', (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while rotating the PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result?.blob) {
      downloadBlob(result.blob, result.name || 'rotated.pdf');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setPageCount(1);
    setPageRotations({});
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <ToolLayout tool={tool}>
      {result ? (
        <DownloadResult
          fileName={result.name || 'rotated.pdf'}
          originalFileName={files[0]?.name}
          fileSize={result.size}
          downloadLabel="Download Rotated PDF"
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} Pages Rotated
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
          subtitle="Applying rotation angles directly inside your browser."
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

              {/* Rotation Mode Selector */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Rotation Mode
                  </h4>
                  <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {pageCount} {pageCount === 1 ? 'Page' : 'Pages'}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setRotationMode('all')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      rotationMode === 'all'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    Rotate All Pages
                  </button>
                  <button
                    type="button"
                    onClick={() => setRotationMode('individual')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      rotationMode === 'individual'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    Rotate Selected Pages
                  </button>
                </div>

                {rotationMode === 'all' ? (
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-2">
                      Angle for All Pages
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
                          onClick={() => setAllAngle(angle)}
                          className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex flex-col items-center justify-center gap-1.5 ${
                            allAngle === angle
                              ? 'bg-brand-50 border-brand-300 text-brand-700 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <RotateCw className="w-4 h-4" style={{ transform: `rotate(${angle - 90}deg)` }} />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="pt-2">
                    <p className="text-xs text-slate-500 mb-3">
                      Click each page card to rotate it by +90° increments.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {Array.from({ length: pageCount }, (_, idx) => {
                        const pageNum = idx + 1;
                        const angle = pageRotations[pageNum] || 0;
                        return (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => handlePageRotateClick(pageNum)}
                            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-brand-300 transition-all flex flex-col items-center justify-center gap-2 shadow-sm text-center"
                          >
                            <span className="text-xs font-bold text-slate-400">Page {pageNum}</span>
                            <div className="w-10 h-12 bg-slate-100 border border-slate-300 rounded flex items-center justify-center transition-transform" style={{ transform: `rotate(${angle}deg)` }}>
                              <Layers className="w-4 h-4 text-slate-600" />
                            </div>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${angle > 0 ? 'bg-brand-100 text-brand-700' : 'text-slate-400'}`}>
                              +{angle}°
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
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
                {rotationMode === 'all'
                  ? `Rotate All Pages (${allAngle}°)`
                  : 'Apply Custom Page Rotations'}
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};
