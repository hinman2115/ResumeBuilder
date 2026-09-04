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
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
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
