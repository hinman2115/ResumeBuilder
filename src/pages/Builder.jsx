import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  Edit3,
  Clock
} from 'lucide-react';
import { useResume } from '../hooks/useResume';
import { PersonalForm } from '../components/forms/PersonalForm';
import { SummaryForm } from '../components/forms/SummaryForm';
import { ExperienceForm } from '../components/forms/ExperienceForm';
import { EducationForm } from '../components/forms/EducationForm';
import { ProjectsForm } from '../components/forms/ProjectsForm';
import { SkillsForm } from '../components/forms/SkillsForm';
import { CertificationsForm } from '../components/forms/CertificationsForm';
import { TemplateSelector } from '../components/resume/TemplateSelector';
import { ResumePreview } from '../components/resume/ResumePreview';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';

export const Builder = () => {
  const [searchParams] = useSearchParams();
  const {
    resumeData,
    setTemplate,
    loadSampleData,
    resetResume,
    saveResumeNow,
    lastSaved
  } = useResume();

  const [activeTab, setActiveTab] = useState('edit');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  // Sync template from URL query param if present
  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam && ['modern', 'professional', 'minimal'].includes(templateParam)) {
      setTemplate(templateParam);
    }
  }, [searchParams, setTemplate]);

  return (
    <div className="min-h-screen bg-slate-100/60 pb-16">
      {/* Top Action & Status Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Document info & Save Status */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>{resumeData?.personal?.fullName ? `${resumeData.personal.fullName}'s Resume` : 'Untitled Resume'}</span>
                </h1>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {lastSaved ? (
                    <span>Auto-saved at {lastSaved}</span>
                  ) : (
                    <span>Saved locally</span>
                  )}
                </div>
              </div>

              {/* Mobile View Toggle (Visible only on small screens) */}
              <div className="flex sm:hidden bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    activeTab === 'edit'
                      ? 'bg-white text-brand-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    activeTab === 'preview'
                      ? 'bg-white text-brand-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon={<Sparkles className="w-4 h-4 text-amber-500" />}
                onClick={() => setIsSampleModalOpen(true)}
                title="Load realistic sample data"
              >
                Load Sample
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon={<RotateCcw className="w-4 h-4 text-slate-500" />}
                onClick={() => setIsResetModalOpen(true)}
                title="Clear all fields"
              >
                Clear Form
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                icon={<Save className="w-4 h-4" />}
                onClick={saveResumeNow}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor & Controls */}
          <div
            className={`lg:col-span-6 space-y-6 ${
              activeTab === 'preview' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Template & Color Picker Card */}
            <TemplateSelector />

            {/* Form Sections */}
            <div className="space-y-4">
              <PersonalForm />
              <SummaryForm />
              <ExperienceForm />
              <EducationForm />
              <ProjectsForm />
              <SkillsForm />
              <CertificationsForm />
            </div>
          </div>

          {/* Right Column: Live A4 Preview */}
          <div
            className={`lg:col-span-6 sticky top-36 ${
              activeTab === 'edit' ? 'hidden lg:block' : 'block'
            }`}
            style={{ maxHeight: 'calc(100vh - 160px)' }}
          >
            <div className="h-[calc(100vh-170px)] min-h-[600px]">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal: Clear Resume */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={resetResume}
        title="Clear Resume Form?"
        description="Are you sure you want to reset your resume? All entered experience, education, and personal details will be cleared. This action cannot be undone."
        confirmText="Yes, Clear All"
        confirmVariant="danger"
      />

      {/* Confirmation Modal: Load Sample Data */}
      <Modal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        onConfirm={loadSampleData}
        title="Load Sample Resume?"
        description="This will replace your current form entries with a complete sample resume (Alex Morgan). You can customize it as needed."
        confirmText="Load Sample"
        confirmVariant="primary"
      />
    </div>
  );
};

