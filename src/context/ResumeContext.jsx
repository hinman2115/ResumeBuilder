import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { defaultResumeData } from '../data/defaultResume';
import { emptyResumeData } from '../data/emptyResume';
import {
  loadResumeFromStorage,
  saveResumeToStorage,
  clearResumeFromStorage,
  getLastSavedTimestamp
} from '../utils/storage';

const ResumeContext = createContext(undefined);

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => loadResumeFromStorage());
  const [lastSaved, setLastSaved] = useState(() => getLastSavedTimestamp());
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((text, type = 'success') => {
    setToastMessage({ text, type });
  }, []);

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  // Auto-save to localStorage whenever resumeData changes
  useEffect(() => {
    saveResumeToStorage(resumeData);
    setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, [resumeData]);

  // Personal Info
  const updatePersonal = useCallback((fields) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, ...fields }
    }));
  }, []);

  // Summary
  const updateSummary = useCallback((summary) => {
    setResumeData(prev => ({ ...prev, summary }));
  }, []);

  // Experience
  const addExperience = useCallback(() => {
    const newExp = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [newExp, ...prev.experience]
    }));
    showToast('Added new experience entry', 'info');
  }, [showToast]);

  const updateExperience = useCallback((id, fields) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, ...fields } : exp)
    }));
  }, []);

  const removeExperience = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
    showToast('Experience entry removed', 'info');
  }, [showToast]);

  // Education
  const addEducation = useCallback(() => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [newEdu, ...prev.education]
    }));
    showToast('Added new education entry', 'info');
  }, [showToast]);

  const updateEducation = useCallback((id, fields) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, ...fields } : edu)
    }));
  }, []);

  const removeEducation = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
    showToast('Education entry removed', 'info');
  }, [showToast]);

  // Projects
  const addProject = useCallback(() => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: '',
      url: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
    showToast('Added new project entry', 'info');
  }, [showToast]);

  const updateProject = useCallback((id, fields) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => proj.id === id ? { ...proj, ...fields } : proj)
    }));
  }, []);

  const removeProject = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
    showToast('Project entry removed', 'info');
  }, [showToast]);

  // Skills
  const addSkill = useCallback((skill) => {
    const trimmed = skill?.trim();
    if (!trimmed) return;
    setResumeData(prev => {
      if (prev.skills.includes(trimmed)) return prev;
      return {
        ...prev,
        skills: [...prev.skills, trimmed]
      };
    });
  }, []);

  const removeSkill = useCallback((skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  }, []);

  const setSkills = useCallback((skills) => {
    setResumeData(prev => ({ ...prev, skills }));
  }, []);

  // Certifications
  const addCertification = useCallback(() => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      url: ''
    };
    setResumeData(prev => ({
      ...prev,
      certifications: [newCert, ...prev.certifications]
    }));
    showToast('Added new certification', 'info');
  }, [showToast]);

  const updateCertification = useCallback((id, fields) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => cert.id === id ? { ...cert, ...fields } : cert)
    }));
  }, []);

  const removeCertification = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
    showToast('Certification removed', 'info');
  }, [showToast]);

  // Customization
  const setTemplate = useCallback((template) => {
    setResumeData(prev => ({ ...prev, template }));
  }, []);

  const setAccentColor = useCallback((accentColor) => {
    setResumeData(prev => ({ ...prev, accentColor }));
  }, []);

  // Global Actions
  const loadSampleData = useCallback(() => {
    setResumeData(defaultResumeData);
    saveResumeToStorage(defaultResumeData);
    showToast('Loaded sample resume data', 'success');
  }, [showToast]);

  const resetResume = useCallback(() => {
    setResumeData(emptyResumeData);
    clearResumeFromStorage();
    showToast('Cleared resume data', 'info');
  }, [showToast]);

  const saveResumeNow = useCallback(() => {
    saveResumeToStorage(resumeData);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLastSaved(timeStr);
    showToast(`Resume saved successfully at ${timeStr}`, 'success');
  }, [resumeData, showToast]);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonal,
        updateSummary,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addProject,
        updateProject,
        removeProject,
        addSkill,
        removeSkill,
        setSkills,
        addCertification,
        updateCertification,
        removeCertification,
        setTemplate,
        setAccentColor,
        loadSampleData,
        resetResume,
        saveResumeNow,
        lastSaved,
        toastMessage,
        clearToast,
        showToast
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

