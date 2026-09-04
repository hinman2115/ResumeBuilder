import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { Button } from '../../components/common/Button';
import { extractZipArchive } from '../../utils/fileTools/zipUtils';
import { downloadBlob, formatBytes } from '../../utils/fileTools/formatters';
import { FolderArchive, Download, RotateCcw, File, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ExtractZip = () => {
  const tool = getToolBySlug('extract-zip');
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedFiles, setExtractedFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFilesSelected = async (newFiles) => {
    if (!newFiles[0]) return;
    const selectedFile = newFiles[0];
    setFile(selectedFile);
    setError(null);
    setIsProcessing(true);
    setProgress(15);

    try {
      const result = await extractZipArchive(selectedFile, (pct) => setProgress(pct));
      setExtractedFiles(result.files);
    } catch (err) {
      setError(err.message || 'Could not extract ZIP archive. Ensure it is a valid zip file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSingle = async (entry) => {
    try {
      const blob = await entry.getBlob();
      downloadBlob(blob, entry.name.split('/').pop());
    } catch (err) {
      setError(`Failed to download ${entry.name}: ${err.message}`);
    }
  };

  const handleDownloadAll = async () => {
    for (const entry of extractedFiles) {
      await handleDownloadSingle(entry);
      // Small pause between downloads to prevent browser blocking
      await new Promise(r => setTimeout(r, 200));
    }
  };

  const handleReset = () => {
    setFile(null);
    setExtractedFiles([]);
    setError(null);
    setProgress(0);
  };

  return (
    <ToolLayout tool={tool}>
      {isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Extracting ZIP archive..."
          subtitle="Decompressing files directly inside your browser."
        />
      ) : extractedFiles.length > 0 ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200/80">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm font-bold text-emerald-900">
                  Successfully Extracted {extractedFiles.length} {extractedFiles.length === 1 ? 'File' : 'Files'}
                </p>
                <p className="text-xs text-emerald-700">
                  From archive: <span className="font-semibold">{file?.name}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="primary"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                onClick={handleDownloadAll}
              >
                Download All
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={handleReset}
              >
                Start Over
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Archive Contents:
            </h4>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {extractedFiles.map((entry, idx) => (
                <div
                  key={`${entry.name}-${idx}`}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 flex-shrink-0">
                      <File className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                        {entry.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {formatBytes(entry.size)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(entry)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-brand-600 hover:border-brand-300 transition-colors shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <FileUploader
            onFilesSelected={handleFilesSelected}
            accept={tool.accept}
            acceptSummary={tool.acceptSummary}
            multiple={false}
            maxFileSizeMB={tool.maxFileSizeMB}
            allowedExtensions={['.zip']}
          />

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs sm:text-sm text-rose-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

