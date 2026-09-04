import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { FileList } from '../../components/fileTools/FileList';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { pdfToWord } from '../../utils/fileTools/docUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { FileText, AlertCircle } from 'lucide-react';

export const PdfToWord = () => {
  const tool = getToolBySlug('pdf-to-word');
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
      setProgress(15);

      const res = await pdfToWord(files[0], (pct) => setProgress(pct));
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while converting PDF to Word document.');
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
          downloadLabel="Download Word Document (.docx)"
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} Pages Converted
              </span>
            ) : null
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Converting PDF to Word (.docx)..."
          subtitle="Extracting text layers and assembling formatted DOCX document directly in your browser."
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

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs sm:text-sm text-blue-900 leading-relaxed">
                <p className="font-bold mb-1">Standard Editable DOCX Format</p>
                <p className="text-blue-700">
                  Extracted text will be compiled into an editable Microsoft Word document compatible with Word, Google Docs, and LibreOffice.
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
                icon={<FileText className="w-5 h-5" />}
                iconPosition="left"
                className="w-full shadow-md shadow-brand-500/20"
              >
                Convert to Word (.docx)
              </Button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
};

