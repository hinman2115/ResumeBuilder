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
import { FileEdit, AlertCircle, ArrowRight, Info, ShieldCheck } from 'lucide-react';

export const RenameFiles = () => {
  const tool = getToolBySlug('rename-files');
  const [files, setFiles] = useState([]);
  // Single file state
  const [singleName, setSingleName] = useState('');
  // Multi-file batch state
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [baseName, setBaseName] = useState('');
  const [useSequential, setUseSequential] = useState(false);
  const [startNumber, setStartNumber] = useState(1);
  const [individualNames, setIndividualNames] = useState({});

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const sanitizeName = (name) => {
    return name.replace(/[/\\?%*:|"<>]/g, '_').trim();
  };

  const getExtension = (fileName) => {
    const match = fileName.match(/\.[^/.]+$/);
    return match ? match[0] : '';
  };

  const getBaseWithoutExt = (fileName) => {
    const ext = getExtension(fileName);
    return ext ? fileName.slice(0, -ext.length) : fileName;
  };

  const handleFilesSelected = (newFiles) => {
    setError(null);
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);

    if (updatedFiles.length === 1) {
      setSingleName(getBaseWithoutExt(updatedFiles[0].name));
    }
  };

  const handleRemove = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (updated.length === 1) {
      setSingleName(getBaseWithoutExt(updated[0].name));
    }
  };

  const computeNewName = (file, index) => {
    const ext = getExtension(file.name);

    // If individual custom name is specified for this file
    if (individualNames[index]?.trim()) {
      return `${sanitizeName(individualNames[index].trim())}${ext}`;
    }

    if (files.length === 1 && singleName.trim()) {
      return `${sanitizeName(singleName.trim())}${ext}`;
    }

    let coreName = baseName.trim() ? sanitizeName(baseName.trim()) : getBaseWithoutExt(file.name);
    if (useSequential) {
      const num = (parseInt(startNumber, 10) || 1) + index;
      coreName = `${coreName}-${num}`;
    }

    return `${prefix}${coreName}${suffix}${ext}`;
  };

  const validateNames = () => {
    if (files.length === 0) return 'Please select at least one file.';

    const names = files.map((file, idx) => computeNewName(file, idx));

    for (const name of names) {
      if (!name.trim() || name === getExtension(name)) {
        return 'Filename cannot be empty.';
      }
    }

    // Check duplicates in batch
    if (files.length > 1) {
      const set = new Set(names);
      if (set.size !== names.length) {
        return 'Multiple files have the same output name. Please enable sequential numbering or set unique names.';
      }
    }

    return null;
  };

  const handleRename = async () => {
    const validationError = validateNames();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(20);

      // Single file direct download
      if (files.length === 1) {
        const file = files[0];
        const newName = computeNewName(file, 0);
        const blob = new Blob([await file.arrayBuffer()], { type: file.type || 'application/octet-stream' });

        setResult({
          blob,
          name: newName,
          originalName: file.name,
          size: file.size,
          isSingle: true
        });
      } else {
        // Multiple files packaged into ZIP
        const renameFn = (file, idx) => computeNewName(file, idx);
        const res = await batchRenameFiles(files, renameFn, (pct) => setProgress(pct));
        setResult({
          ...res,
          isSingle: false
        });
      }
    } catch (err) {
      setError(err.message || 'An error occurred while renaming files.');
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
    setSingleName('');
    setPrefix('');
    setSuffix('');
    setBaseName('');
    setUseSequential(false);
    setIndividualNames({});
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <ToolLayout tool={tool}>
      {result ? (
        <DownloadResult
          fileName={result.name}
          originalFileName={result.originalName || `${files.length} files`}
          fileSize={result.size}
          downloadLabel={result.isSingle ? `Download ${result.name}` : 'Download Renamed Files (ZIP)'}
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
          title="Renaming files..."
          subtitle="Sanitizing file headers and preparing download directly in your browser."
        />
      ) : (
        <div className="space-y-6">
          {/* Browser Limitation Disclaimer */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 text-xs text-blue-800 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              For security reasons, web browsers cannot rename files directly on your computer. This tool creates a clean, renamed download of your files with the exact name and extension you specify.
            </p>
          </div>

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

              {/* Single File Rename Panel */}
              {files.length === 1 ? (
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Enter New File Name
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={singleName}
                      onChange={(e) => setSingleName(e.target.value)}
                      placeholder="e.g. Naman_Resume"
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    <span className="px-3 py-2.5 rounded-xl bg-slate-200/80 border border-slate-300 text-xs font-mono font-bold text-slate-700">
                      {getExtension(files[0].name)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Original name: <span className="font-mono text-slate-700">{files[0].name}</span>
                  </p>
                </div>
              ) : (
                /* Multi-File Batch Rename Panel */
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Batch Rename Settings ({files.length} Files)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Prefix</label>
                      <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        placeholder="e.g. final-"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Base Name</label>
                      <input
                        type="text"
                        value={baseName}
                        onChange={(e) => setBaseName(e.target.value)}
                        placeholder="Leave blank to keep original"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Suffix</label>
                      <input
                        type="text"
                        value={suffix}
                        onChange={(e) => setSuffix(e.target.value)}
                        placeholder="e.g. -v1"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-1 flex items-center gap-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={useSequential}
                        onChange={(e) => setUseSequential(e.target.checked)}
                        className="w-4 h-4 rounded text-slate-900 accent-slate-900"
                      />
                      <span>Add Numbering (-1, -2, -3)</span>
                    </label>

                    {useSequential && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span>Start at:</span>
                        <input
                          type="number"
                          min="1"
                          value={startNumber}
                          onChange={(e) => setStartNumber(e.target.value)}
                          className="w-16 px-2 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* Preview of file names */}
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-xs font-bold text-slate-600 block mb-2">Live Output Preview:</span>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto font-mono text-xs">
                      {files.map((f, i) => (
                        <div key={i} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-slate-200">
                          <span className="text-slate-400 truncate max-w-[45%]">{f.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span className="text-emerald-700 font-bold truncate max-w-[45%]">{computeNewName(f, i)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

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
                {files.length === 1 ? `Rename and Download (${singleName || 'file'}${getExtension(files[0].name)})` : `Rename ${files.length} Files & Download ZIP`}
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};
