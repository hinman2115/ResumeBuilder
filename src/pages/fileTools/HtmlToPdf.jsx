import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { htmlToPdf } from '../../utils/fileTools/docUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { Code2, AlertCircle, Type, UploadCloud } from 'lucide-react';

export const HtmlToPdf = () => {
  const tool = getToolBySlug('html-to-pdf');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'paste'
  const [files, setFiles] = useState([]);
  const [htmlContent, setHtmlContent] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFilesSelected = (newFiles) => {
    setError(null);
    setFiles(newFiles.slice(0, 1));
  };

  const handleConvert = async () => {
    const input = activeTab === 'upload' ? files[0] : htmlContent;
    if (!input || (typeof input === 'string' && !input.trim())) {
      setError(activeTab === 'upload' ? 'Please upload an .html file.' : 'Please enter or paste your HTML code.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(25);

      const res = await htmlToPdf(
        input,
        {
          title: documentTitle || (files[0] ? files[0].name.replace(/\.[^/.]+$/, '') : 'HTML Document')
        },
        (pct) => setProgress(pct)
      );
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while generating PDF from HTML.');
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
    setHtmlContent('');
    setDocumentTitle('');
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
          downloadLabel="Download Generated PDF"
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} {result.pageCount === 1 ? 'Page' : 'Pages'}
              </span>
            ) : null
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Converting HTML to PDF..."
          subtitle="Parsing DOM structure, formatting elements, and writing PDF pages in your browser."
        />
      ) : (
        <div className="space-y-6">
          {/* Mode Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              type="button"
              onClick={() => { setActiveTab('upload'); setError(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === 'upload'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload HTML File</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('paste'); setError(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === 'paste'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Paste HTML Code</span>
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div>
              {files.length === 0 ? (
                <FileUploader
                  onFilesSelected={handleFilesSelected}
                  accept={tool.accept}
                  acceptSummary={tool.acceptSummary}
                  multiple={false}
                  maxFileSizeMB={tool.maxFileSizeMB}
                  allowedExtensions={['.html', '.htm']}
                />
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600 border border-purple-100">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800">{files[0].name}</p>
                      <p className="text-[11px] text-slate-500">{(files[0].size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFiles([])}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-1 rounded-lg bg-rose-50 border border-rose-100"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Paste HTML Document Markup
              </label>
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="<h1>Hello World</h1><p>Enter your HTML code here...</p>"
                rows={10}
                className="w-full p-4 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 resize-y"
              />
            </div>
          )}

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              PDF Document Title (Optional)
            </label>
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              placeholder="e.g. Exported Page"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
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
            icon={<Code2 className="w-5 h-5" />}
            iconPosition="left"
            className="w-full shadow-md shadow-brand-500/20"
          >
            Convert HTML to PDF
          </Button>
        </div>
      )}
    </ToolLayout>
  );
};

