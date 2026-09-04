import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { ResumeProvider } from './context/ResumeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { trackVisitor } from './services/statistics';

// Core Pages
import { Home } from './pages/Home';
import { Templates } from './pages/Templates';
import { Builder } from './pages/Builder';
import { NotFound } from './pages/NotFound';

// SEO Landing Pages
import { GeneralResumeBuilder } from './pages/seo/GeneralResumeBuilder';
import { FreeResumeBuilder } from './pages/seo/FreeResumeBuilder';
import { CvBuilder } from './pages/seo/CvBuilder';
import { StudentResumeBuilder } from './pages/seo/StudentResumeBuilder';
import { FresherResumeBuilder } from './pages/seo/FresherResumeBuilder';
import { ProfessionalResumeBuilder } from './pages/seo/ProfessionalResumeBuilder';
import { DeveloperResumeBuilder } from './pages/seo/DeveloperResumeBuilder';
import { TeacherResumeBuilder } from './pages/seo/TeacherResumeBuilder';
import { EngineerResumeBuilder } from './pages/seo/EngineerResumeBuilder';

// Career Guides
import { GuidesIndex } from './pages/guides/GuidesIndex';
import { HowToMakeAResume } from './pages/guides/HowToMakeAResume';
import { ResumeWithNoExperience } from './pages/guides/ResumeWithNoExperience';
import { ResumeVsCv } from './pages/guides/ResumeVsCv';
import { HowToWriteResumeSummary } from './pages/guides/HowToWriteResumeSummary';
import { HowToListWorkExperience } from './pages/guides/HowToListWorkExperience';

// Lazy-Loaded File Tools (Heavy libraries loaded only on-demand)
const FileToolsIndex = lazy(() => import('./pages/fileTools/FileToolsIndex').then(m => ({ default: m.FileToolsIndex })));
const MergePdf = lazy(() => import('./pages/fileTools/MergePdf').then(m => ({ default: m.MergePdf })));
const SplitPdf = lazy(() => import('./pages/fileTools/SplitPdf').then(m => ({ default: m.SplitPdf })));
const CompressPdf = lazy(() => import('./pages/fileTools/CompressPdf').then(m => ({ default: m.CompressPdf })));
const JpgToPdf = lazy(() => import('./pages/fileTools/JpgToPdf').then(m => ({ default: m.JpgToPdf })));
const PdfToJpg = lazy(() => import('./pages/fileTools/PdfToJpg').then(m => ({ default: m.PdfToJpg })));
const CreateZip = lazy(() => import('./pages/fileTools/CreateZip').then(m => ({ default: m.CreateZip })));
const ExtractZip = lazy(() => import('./pages/fileTools/ExtractZip').then(m => ({ default: m.ExtractZip })));
const RotatePdf = lazy(() => import('./pages/fileTools/RotatePdf').then(m => ({ default: m.RotatePdf })));
const ReorderPdf = lazy(() => import('./pages/fileTools/ReorderPdf').then(m => ({ default: m.ReorderPdf })));
const ExtractPdfPages = lazy(() => import('./pages/fileTools/ExtractPdfPages').then(m => ({ default: m.ExtractPdfPages })));
const DeletePdfPages = lazy(() => import('./pages/fileTools/DeletePdfPages').then(m => ({ default: m.DeletePdfPages })));
const PdfMetadata = lazy(() => import('./pages/fileTools/PdfMetadata').then(m => ({ default: m.PdfMetadata })));
const ProtectPdf = lazy(() => import('./pages/fileTools/ProtectPdf').then(m => ({ default: m.ProtectPdf })));
const UnlockPdf = lazy(() => import('./pages/fileTools/UnlockPdf').then(m => ({ default: m.UnlockPdf })));
const WatermarkPdf = lazy(() => import('./pages/fileTools/WatermarkPdf').then(m => ({ default: m.WatermarkPdf })));
const AddPageNumbers = lazy(() => import('./pages/fileTools/AddPageNumbers').then(m => ({ default: m.AddPageNumbers })));
const PdfToWord = lazy(() => import('./pages/fileTools/PdfToWord').then(m => ({ default: m.PdfToWord })));
const WordToPdf = lazy(() => import('./pages/fileTools/WordToPdf').then(m => ({ default: m.WordToPdf })));
const PdfToPng = lazy(() => import('./pages/fileTools/PdfToPng').then(m => ({ default: m.PdfToPng })));
const PngToPdf = lazy(() => import('./pages/fileTools/PngToPdf').then(m => ({ default: m.PngToPdf })));
const PdfToTxt = lazy(() => import('./pages/fileTools/PdfToTxt').then(m => ({ default: m.PdfToTxt })));
const ConvertImage = lazy(() => import('./pages/fileTools/ConvertImage').then(m => ({ default: m.ConvertImage })));
const CompressImage = lazy(() => import('./pages/fileTools/CompressImage').then(m => ({ default: m.CompressImage })));
const ResizeImage = lazy(() => import('./pages/fileTools/ResizeImage').then(m => ({ default: m.ResizeImage })));
const RotateImage = lazy(() => import('./pages/fileTools/RotateImage').then(m => ({ default: m.RotateImage })));
const TextToPdf = lazy(() => import('./pages/fileTools/TextToPdf').then(m => ({ default: m.TextToPdf })));
const HtmlToPdf = lazy(() => import('./pages/fileTools/HtmlToPdf').then(m => ({ default: m.HtmlToPdf })));
const MarkdownToPdf = lazy(() => import('./pages/fileTools/MarkdownToPdf').then(m => ({ default: m.MarkdownToPdf })));
const CombineFiles = lazy(() => import('./pages/fileTools/CombineFiles').then(m => ({ default: m.CombineFiles })));
const RenameFiles = lazy(() => import('./pages/fileTools/RenameFiles').then(m => ({ default: m.RenameFiles })));
const DownloadAsZip = lazy(() => import('./pages/fileTools/DownloadAsZip').then(m => ({ default: m.DownloadAsZip })));
const GenericComingSoon = lazy(() => import('./pages/fileTools/GenericComingSoon').then(m => ({ default: m.GenericComingSoon })));

const FileToolsLoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500 py-16">
    <Loader2 className="w-8 h-8 animate-spin text-brand-600 mb-3" />
    <p className="text-sm font-semibold">Loading tool...</p>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App = () => {
  useEffect(() => {
    // Record unique anonymous visitor
    trackVisitor();
  }, []);

  return (
    <ResumeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#2F3038] font-sans selection:bg-slate-800 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Primary App Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/builder" element={<Builder />} />

              {/* File Tools Hub & Dedicated Tool Routes */}
              <Route
                path="/file-tools"
                element={
                  <Suspense fallback={<FileToolsLoadingFallback />}>
                    <FileToolsIndex />
                  </Suspense>
                }
              />
              <Route
                path="/file-tools/merge-pdf"
                element={
                  <Suspense fallback={<FileToolsLoadingFallback />}>
                    <MergePdf />
                  </Suspense>
                }
              />
              <Route
                path="/file-tools/split-pdf"
                element={
                  <Suspense fallback={<FileToolsLoadingFallback />}>
                    <SplitPdf />
                  </Suspense>
                }
              />
              <Route
                path="/file-tools/compress-pdf"
                element={
                  <Suspense fallback={<FileToolsLoadingFallback />}>
                    <CompressPdf />
                  </Suspense>
                }
              />
              <Route
                path="/file-tools/jpg-to-pdf"
                element={
                  <Suspense fallback={<FileToolsLoadingFallback />}>
                    <JpgToPdf />
                  </Suspense>
                }
              />
              <Route
                path="/file-tools/pdf-to-jpg"
                element={
                  <Suspense fallback={<FileToolsLoadingFallback />}>
                    <PdfToJpg />
                  </Suspense>
                }
              />
              <Route
                path="/file-tools/create-zip"
                element={
                  <Suspense fallback={<FileToolsLoadingFallback />}>
                    <CreateZip />
                  </Suspense>
                }
              />
              <Route
                path="/file-tools/extract-zip"
                element={
                  <Suspense fallback={<FileToolsLoadingFallback />}>
                    <ExtractZip />
                  </Suspense>
                }
              />
              {/* Catch-all for Coming Soon Tools */}
              {/* Additional Dedicated PDF Tools */}
              <Route path="/file-tools/rotate-pdf" element={<Suspense fallback={<FileToolsLoadingFallback />}><RotatePdf /></Suspense>} />
              <Route path="/file-tools/reorder-pdf-pages" element={<Suspense fallback={<FileToolsLoadingFallback />}><ReorderPdf /></Suspense>} />
              <Route path="/file-tools/reorder-pdf" element={<Suspense fallback={<FileToolsLoadingFallback />}><ReorderPdf /></Suspense>} />
              <Route path="/file-tools/extract-pdf-pages" element={<Suspense fallback={<FileToolsLoadingFallback />}><ExtractPdfPages /></Suspense>} />
              <Route path="/file-tools/delete-pdf-pages" element={<Suspense fallback={<FileToolsLoadingFallback />}><DeletePdfPages /></Suspense>} />
              <Route path="/file-tools/pdf-metadata" element={<Suspense fallback={<FileToolsLoadingFallback />}><PdfMetadata /></Suspense>} />
              <Route path="/file-tools/protect-pdf" element={<Suspense fallback={<FileToolsLoadingFallback />}><ProtectPdf /></Suspense>} />
              <Route path="/file-tools/unlock-pdf" element={<Suspense fallback={<FileToolsLoadingFallback />}><UnlockPdf /></Suspense>} />
              <Route path="/file-tools/watermark-pdf" element={<Suspense fallback={<FileToolsLoadingFallback />}><WatermarkPdf /></Suspense>} />
              <Route path="/file-tools/add-page-numbers" element={<Suspense fallback={<FileToolsLoadingFallback />}><AddPageNumbers /></Suspense>} />
              <Route path="/file-tools/pdf-to-word" element={<Suspense fallback={<FileToolsLoadingFallback />}><PdfToWord /></Suspense>} />
              <Route path="/file-tools/word-to-pdf" element={<Suspense fallback={<FileToolsLoadingFallback />}><WordToPdf /></Suspense>} />
              <Route path="/file-tools/pdf-to-png" element={<Suspense fallback={<FileToolsLoadingFallback />}><PdfToPng /></Suspense>} />
              <Route path="/file-tools/png-to-pdf" element={<Suspense fallback={<FileToolsLoadingFallback />}><PngToPdf /></Suspense>} />
              <Route path="/file-tools/pdf-to-txt" element={<Suspense fallback={<FileToolsLoadingFallback />}><PdfToTxt /></Suspense>} />

              {/* Image Tools */}
              <Route path="/file-tools/convert-image" element={<Suspense fallback={<FileToolsLoadingFallback />}><ConvertImage /></Suspense>} />
              <Route path="/file-tools/webp-to-jpg" element={<Suspense fallback={<FileToolsLoadingFallback />}><ConvertImage forcedSlug="webp-to-jpg" defaultTarget="jpeg" /></Suspense>} />
              <Route path="/file-tools/webp-to-png" element={<Suspense fallback={<FileToolsLoadingFallback />}><ConvertImage forcedSlug="webp-to-png" defaultTarget="png" /></Suspense>} />
              <Route path="/file-tools/jpg-to-png" element={<Suspense fallback={<FileToolsLoadingFallback />}><ConvertImage forcedSlug="jpg-to-png" defaultTarget="png" /></Suspense>} />
              <Route path="/file-tools/png-to-jpg" element={<Suspense fallback={<FileToolsLoadingFallback />}><ConvertImage forcedSlug="png-to-jpg" defaultTarget="jpeg" /></Suspense>} />
              <Route path="/file-tools/jpg-to-webp" element={<Suspense fallback={<FileToolsLoadingFallback />}><ConvertImage forcedSlug="jpg-to-webp" defaultTarget="webp" /></Suspense>} />
              <Route path="/file-tools/png-to-webp" element={<Suspense fallback={<FileToolsLoadingFallback />}><ConvertImage forcedSlug="png-to-webp" defaultTarget="webp" /></Suspense>} />
              <Route path="/file-tools/compress-image" element={<Suspense fallback={<FileToolsLoadingFallback />}><CompressImage /></Suspense>} />
              <Route path="/file-tools/resize-image" element={<Suspense fallback={<FileToolsLoadingFallback />}><ResizeImage /></Suspense>} />
              <Route path="/file-tools/rotate-image" element={<Suspense fallback={<FileToolsLoadingFallback />}><RotateImage /></Suspense>} />

              {/* Document Tools */}
              <Route path="/file-tools/text-to-pdf" element={<Suspense fallback={<FileToolsLoadingFallback />}><TextToPdf /></Suspense>} />
              <Route path="/file-tools/html-to-pdf" element={<Suspense fallback={<FileToolsLoadingFallback />}><HtmlToPdf /></Suspense>} />
              <Route path="/file-tools/markdown-to-pdf" element={<Suspense fallback={<FileToolsLoadingFallback />}><MarkdownToPdf /></Suspense>} />

              {/* File Utilities */}
              <Route path="/file-tools/combine-files" element={<Suspense fallback={<FileToolsLoadingFallback />}><CombineFiles /></Suspense>} />
              <Route path="/file-tools/rename-files" element={<Suspense fallback={<FileToolsLoadingFallback />}><RenameFiles /></Suspense>} />
              <Route path="/file-tools/rename-file" element={<Suspense fallback={<FileToolsLoadingFallback />}><RenameFiles /></Suspense>} />
              <Route path="/file-tools/download-as-zip" element={<Suspense fallback={<FileToolsLoadingFallback />}><DownloadAsZip /></Suspense>} />

              {/* Catch-all for any future tools */}
              <Route
                path="/file-tools/:toolSlug"
                element={
                  <Suspense fallback={<FileToolsLoadingFallback />}>
                    <GenericComingSoon />
                  </Suspense>
                }
              />

              {/* SEO Audience & Intent Landing Pages */}
              <Route path="/resume-builder" element={<GeneralResumeBuilder />} />
              <Route path="/free-resume-builder" element={<FreeResumeBuilder />} />
              <Route path="/cv-builder" element={<CvBuilder />} />
              <Route path="/resume-builder-for-students" element={<StudentResumeBuilder />} />
              <Route path="/resume-builder-for-freshers" element={<FresherResumeBuilder />} />
              <Route path="/resume-builder-for-professionals" element={<ProfessionalResumeBuilder />} />
              <Route path="/resume-builder-for-developers" element={<DeveloperResumeBuilder />} />
              <Route path="/resume-builder-for-teachers" element={<TeacherResumeBuilder />} />
              <Route path="/resume-builder-for-engineers" element={<EngineerResumeBuilder />} />

              {/* In-Depth Career Guides */}
              <Route path="/guides" element={<GuidesIndex />} />
              <Route path="/guides/how-to-make-a-resume" element={<HowToMakeAResume />} />
              <Route path="/guides/resume-with-no-experience" element={<ResumeWithNoExperience />} />
              <Route path="/guides/resume-vs-cv" element={<ResumeVsCv />} />
              <Route path="/guides/how-to-write-resume-summary" element={<HowToWriteResumeSummary />} />
              <Route path="/guides/how-to-list-work-experience" element={<HowToListWorkExperience />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </Router>
    </ResumeProvider>
  );
};

export default App;
