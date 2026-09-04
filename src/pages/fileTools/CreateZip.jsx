import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { createZipArchive } from '../../utils/fileTools/zipUtils';
import { downloadBlob, formatBytes } from '../../utils/fileTools/formatters';
import { Archive, AlertCircle } from 'lucide-react';

export const CreateZip = () => {
  const tool = getToolBySlug('create-zip');
  const [files, setFiles] = useState([]);
  const [zipName, setZipName] = useState('archive');
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

  const handleClearAll = () => {
    setFiles([]);
    setError(null);
    setResult(null);
  };

  const handleCreateZip = async () => {
    if (files.length === 0) {
      setError('Please select at least one file to compress.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(10);

      const res = await createZipArchive(
        files,
        zipName || 'archive',
        (pct) => setProgress(pct)
      );
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while creating the ZIP archive.');
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

  const totalRawSize = files.reduce((acc, f) => acc + (f.size || 0), 0);

  return (
    <ToolLayout tool={tool}>
      {result ? (
        <DownloadResult
          fileName={result.name}
          fileSize={result.size}
          downloadLabel="Download ZIP Archive"
          additionalStats={
            <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
              {files.length} Files Packaged
            </span>
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Creating your ZIP archive..."
          subtitle="Compressing files with DEFLATE algorithm inside your browser."
        />
      ) : (
        <div className="space-y-6">
          {files.length === 0 ? (
            <FileUploader
              onFilesSelected={handleFilesSelected}
              accept="*/*"
              acceptSummary={tool.acceptSummary}
              multiple={true}
              maxFileSizeMB={tool.maxFileSizeMB}
            />
          ) : (
            <div className="space-y-6">
              <FileList
                files={files}
                onRemove={handleRemove}
                onAddMore={handleFilesSelected}
                onClearAll={handleClearAll}
                allowReorder={false}
                allowAddMore={true}
                accept="*/*"
              />

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ZIP File Name:
                </label>
                <div className="flex items-center gap-2 max-w-sm">
                  <input
                    type="text"
                    value={zipName}
                    onChange={(e) => setZipName(e.target.value.replace(/[^a-zA-Z0-9-_ ]/g, ''))}
                    placeholder="archive"
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                  <span className="text-sm font-bold text-slate-500">.zip</span>
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs sm:text-sm text-rose-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-slate-500">
                  Total uncompressed size: <span className="font-semibold text-slate-700">{formatBytes(totalRawSize)}</span>
                </p>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  icon={<Archive className="w-4 h-4" />}
                  onClick={handleCreateZip}
                  className="w-full sm:w-auto shadow-md shadow-brand-500/20"
                >
                  Create ZIP Archive
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

