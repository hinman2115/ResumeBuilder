import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { wordToPdf } from '../../utils/fileTools/docUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { FileCode2, AlertCircle } from 'lucide-react';

export const WordToPdf = () => {
  const tool = getToolBySlug('word-to-pdf');
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
      setProgress(20);

      const res = await wordToPdf(files[0], (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while converting Word document to PDF.');
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
          downloadLabel="Download PDF Document"
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} Pages Generated
              </span>
            ) : null
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Converting Word document to PDF..."
          subtitle="Parsing DOCX OpenXML structure and laying out PDF pages in your browser."
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
              allowedExtensions={['.docx']}
            />
          ) : (
            <div className="space-y-6">
              <FileList
                files={files}
                onRemove={handleRemove}
                allowReorder={false}
                allowAddMore={false}
              />

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p className="font-bold text-slate-800 mb-1">Standard A4 Output</p>
                <p className="text-slate-500">
                  Your DOCX headings, body paragraphs, and formatting will be rendered into a standard print-ready PDF document.
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
                icon={<FileCode2 className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Convert to PDF
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

