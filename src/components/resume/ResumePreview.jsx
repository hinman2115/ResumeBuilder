import { useState, useRef } from 'react';
import { Download, ZoomIn, ZoomOut, Printer } from 'lucide-react';
import { useResume } from '../../hooks/useResume';
import { TemplateRenderer } from './TemplateRenderer';
import { exportResumeToPDF } from '../../utils/pdf';
import { Button } from '../common/Button';
import { trackResumeDownloaded, generateUUID } from '../../services/statistics';

export const ResumePreview = () => {
  const { resumeData, showToast } = useResume();
  const [zoom, setZoom] = useState(0.9);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(0.9);

  const handleDownloadPDF = async () => {
    if (isExporting) return;
    setIsExporting(true);

    const sanitizedName = (resumeData.personal?.fullName || 'Resume').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${sanitizedName}_Resume.pdf`;
    const downloadEventId = generateUUID();

    try {
      await exportResumeToPDF('resume-export-container', {
        fileName,
        onStart: () => {
          showToast('Generating high-resolution PDF...', 'info');
        },
        onComplete: async () => {
          setIsExporting(false);
          // Track genuine successful download event in Supabase with standard UUID
          await trackResumeDownloaded(downloadEventId);
          showToast('PDF downloaded successfully!', 'success');
        },
        onError: () => {
          setIsExporting(false);
          showToast('Failed to export PDF. Please try again.', 'error');
        }
      });
    } catch {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100/80 rounded-2xl border border-slate-200/80 overflow-hidden shadow-inner">
      {/* Top Preview Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Live Preview
          </span>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            A4 Standard
          </span>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-md disabled:opacity-40 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-white rounded-md transition-colors"
              title="Reset Zoom"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 1.4}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-md disabled:opacity-40 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Print"
          >
            <Printer className="w-4 h-4" />
          </button>

          <Button
            type="button"
            size="sm"
            variant="primary"
            icon={<Download className="w-4 h-4" />}
            isLoading={isExporting}
            onClick={handleDownloadPDF}
            className="shadow-sm"
          >
            Download PDF
          </Button>
        </div>
      </div>

      {/* Canvas / Preview Container */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex justify-center items-start">
        <div
          ref={previewRef}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="transition-transform duration-150"
        >
          {/* Printable / Exportable A4 Sheet */}
          <div
            id="resume-export-container"
            className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm border border-slate-200/90 text-slate-900 relative overflow-hidden"
          >
            <TemplateRenderer data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};
