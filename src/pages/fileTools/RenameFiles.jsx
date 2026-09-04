import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { batchRenameFiles } from '../../utils/fileTools/zipUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { FileEdit, AlertCircle, ArrowRight } from 'lucide-react';

export const RenameFiles = () => {
  const tool = getToolBySlug('rename-files');
  const [files, setFiles] = useState([]);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [baseName, setBaseName] = useState('');
  const [useSequential, setUseSequential] = useState(false);
  const [startNumber, setStartNumber] = useState(1);
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

  const computeNewName = (file, index) => {
    const extMatch = file.name.match(/\.[^/.]+$/);
    const ext = extMatch ? extMatch[0] : '';
    const rawName = extMatch ? file.name.slice(0, extMatch.index) : file.name;

    let coreName = baseName.trim() ? baseName.trim() : rawName;
    if (useSequential) {
      coreName = `${coreName}_${(parseInt(startNumber, 10) || 1) + index}`;
    }

    return `${prefix}${coreName}${suffix}${ext}`;
  };

  const handleRename = async () => {
    if (files.length === 0) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(15);

      const renameFn = (file, idx) => computeNewName(file, idx);
      const res = await batchRenameFiles(files, renameFn, (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while batch renaming files.');
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
    setPrefix('');
    setSuffix('');
    setBaseName('');
    setUseSequential(false);
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
          downloadLabel="Download Renamed Files (ZIP)"
          additionalStats={
            result.fileCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.fileCount} Files Renamed
              </span>
            ) : null
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Renaming and packaging files..."
          subtitle="Applying rename rules and bundling into ZIP archive directly in your browser."
        />
      ) : (
        <div className="space-y-6">
          {files.length === 0 ? (
            <FileUploader
              onFilesSelected={handleFilesSelected}
              accept={tool.accept}
              acceptSummary={tool.acceptSummary}
              multiple={tool.multiple}
              maxFileSizeMB={tool.maxFileSizeMB}
            />
          ) : (
            <div className="space-y-6">
              <FileList
                files={files}
                onRemove={handleRemove}
                onAddMore={handleFilesSelected}
                onClearAll={() => setFiles([])}
                allowReorder={false}
                allowAddMore={true}
              />

              {/* Rename Rules Configuration */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Batch Rename Settings
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Prefix
                    </label>
                    <input
                      type="text"
                      value={prefix}
                      onChange={(e) => setPrefix(e.target.value)}
                      placeholder="e.g. final_"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      New Base Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={baseName}
                      onChange={(e) => setBaseName(e.target.value)}
                      placeholder="Leave blank to keep original"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Suffix
                    </label>
                    <input
                      type="text"
                      value={suffix}
                      onChange={(e) => setSuffix(e.target.value)}
                      placeholder="e.g. _v1"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={useSequential}
                      onChange={(e) => setUseSequential(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-900 accent-slate-900 cursor-pointer"
                    />
                    <span>Add Sequential Numbering (_1, _2, ...)</span>
                  </label>

                  {useSequential && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Start from:</span>
                      <input
                        type="number"
                        min="1"
                        value={startNumber}
                        onChange={(e) => setStartNumber(e.target.value)}
                        className="w-20 px-2.5 py-1 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                      />
                    </div>
                  )}
                </div>

                {/* Live Name Preview Table */}
                <div className="pt-3 border-t border-slate-200/80">
                  <span className="text-xs font-bold text-slate-600 block mb-2">
                    Live Name Preview (First 3 files):
                  </span>
                  <div className="space-y-1.5 font-mono text-xs">
                    {files.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-600 truncate bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-400 truncate max-w-[40%]">{f.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="text-emerald-700 font-bold truncate">{computeNewName(f, i)}</span>
                      </div>
                    ))}
                  </div>
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
                onClick={handleRename}
                icon={<FileEdit className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Rename {files.length} Files & Download ZIP
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

