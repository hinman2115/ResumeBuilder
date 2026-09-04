import { useState } from 'react';
import { getToolBySlug } from '../../data/fileTools';
import { ToolLayout } from '../../components/fileTools/ToolLayout';
import { FileUploader } from '../../components/fileTools/FileUploader';
import { ProcessingStatus } from '../../components/fileTools/ProcessingStatus';
import { DownloadResult } from '../../components/fileTools/DownloadResult';
import { Button } from '../../components/common/Button';
import { textToPdf } from '../../utils/fileTools/docUtils';
import { downloadBlob } from '../../utils/fileTools/formatters';
import { FileText, AlertCircle, Type, UploadCloud, Trash2, Eye } from 'lucide-react';

export const TextToPdf = () => {
  const tool = getToolBySlug('text-to-pdf');
  const [activeTab, setActiveTab] = useState('paste'); // 'paste' | 'upload'
  const [files, setFiles] = useState([]);
  const [textContent, setTextContent] = useState('');
  const [pageSize, setPageSize] = useState('a4'); // 'a4' | 'letter'
  const [fontSize, setFontSize] = useState(12); // 10, 12, 14, 16, 18, 20
  const [margin, setMargin] = useState('medium'); // 'small' | 'medium' | 'large'
  const [alignment, setAlignment] = useState('left'); // 'left' | 'center' | 'right'
  const [fontFamily, setFontFamily] = useState('helvetica'); // 'helvetica' | 'times' | 'courier'
  const [showPreview, setShowPreview] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFilesSelected = async (newFiles) => {
    setError(null);
    const file = newFiles[0];
    if (!file) return;
    setFiles([file]);
    const text = await file.text();
    setTextContent(text);
  };

  const handleClear = () => {
    setTextContent('');
    setFiles([]);
    setError(null);
  };

  const handleConvert = async () => {
    const input = textContent;
    if (!input || !input.trim()) {
      setError('Please enter, paste, or upload some text to convert into PDF.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(25);

      const res = await textToPdf(
        input,
        {
          pageSize,
          fontSize: parseInt(fontSize, 10) || 12,
          margin,
          alignment,
          fontFamily
        },
        (pct) => setProgress(pct)
      );
      setResult(res);
    } catch (err) {
      setError(err.message || 'An error occurred while generating PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result?.blob) {
      downloadBlob(result.blob, result.name || 'document.pdf');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setTextContent('');
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <ToolLayout tool={tool}>
      {result ? (
        <DownloadResult
          fileName={result.name || 'document.pdf'}
          originalFileName={files[0]?.name || 'Typed Text Document'}
          fileSize={result.size}
          downloadLabel="Download Generated PDF"
          additionalStats={
            result.pageCount ? (
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {result.pageCount} {result.pageCount === 1 ? 'Page' : 'Pages'} • {pageSize.toUpperCase()}
              </span>
            ) : null
          }
          onDownload={handleDownload}
          onReset={handleReset}
        />
      ) : isProcessing ? (
        <ProcessingStatus
          progress={progress}
          title="Converting text to PDF..."
          subtitle="Calculating line wraps and typesetting PDF pages in your browser."
        />
      ) : (
        <div className="space-y-6">
          {/* Mode Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              type="button"
              onClick={() => { setActiveTab('paste'); setError(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === 'paste'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Write or Paste Text</span>
            </button>
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
              <span>Upload .txt File</span>
            </button>
          </div>

          {activeTab === 'upload' && files.length === 0 && (
            <FileUploader
              onFilesSelected={handleFilesSelected}
              accept={tool.accept}
              acceptSummary={tool.acceptSummary}
              multiple={false}
              maxFileSizeMB={tool.maxFileSizeMB}
              allowedExtensions={['.txt']}
            />
          )}

          {/* Text Area & Editor Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Document Text Content ({textContent.length} characters)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showPreview ? 'Hide Preview' : 'Live Preview'}</span>
                </button>
                {textContent && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Type notes, articles, memos, or paragraphs here..."
              rows={9}
              className="w-full p-4 rounded-xl border border-slate-300 text-sm font-sans text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 resize-y"
            />
          </div>

          {/* Live Document Preview Card */}
          {showPreview && textContent && (
            <div className="p-6 rounded-xl border border-slate-300 bg-white shadow-sm space-y-2">
              <div className="flex items-center justify-between border-b pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>Page Layout Preview ({pageSize.toUpperCase()})</span>
                <span>Font: {fontFamily} • {fontSize}pt • {alignment}</span>
              </div>
              <div
                className="whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto"
                style={{
                  fontSize: `${fontSize}px`,
                  textAlign: alignment,
                  fontFamily: fontFamily === 'times' ? 'serif' : fontFamily === 'courier' ? 'monospace' : 'sans-serif'
                }}
              >
                {textContent}
              </div>
            </div>
          )}

          {/* Typography & Page Settings */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              PDF Formatting Settings
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {/* Page Size */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Page Size
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="a4">A4 (210 × 297 mm)</option>
                  <option value="letter">US Letter (8.5 × 11 in)</option>
                </select>
              </div>

              {/* Font Family */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Font Family
                </label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="helvetica">Helvetica (Sans-Serif)</option>
                  <option value="times">Times Roman (Serif)</option>
                  <option value="courier">Courier (Monospace)</option>
                </select>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Font Size
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value={10}>10 pt (Compact)</option>
                  <option value={12}>12 pt (Standard)</option>
                  <option value={14}>14 pt (Large)</option>
                  <option value={16}>16 pt (Heading)</option>
                  <option value={18}>18 pt (Title)</option>
                  <option value={20}>20 pt (Poster)</option>
                </select>
              </div>

              {/* Text Alignment */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Text Alignment
                </label>
                <select
                  value={alignment}
                  onChange={(e) => setAlignment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="left">Left Aligned</option>
                  <option value="center">Centered</option>
                  <option value="right">Right Aligned</option>
                </select>
              </div>

              {/* Margins */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Page Margins
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="small">Small (25 pt)</option>
                  <option value="medium">Medium (50 pt)</option>
                  <option value="large">Large (75 pt)</option>
                </select>
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
            onClick={handleConvert}
            icon={<FileText className="w-5 h-5" />}
            iconPosition="left"
            className="w-full shadow-md shadow-brand-500/20"
          >
            Generate PDF
          </Button>
        </div>
      )}
    </ToolLayout>
  );
};
