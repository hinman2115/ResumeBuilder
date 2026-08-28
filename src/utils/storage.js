import { defaultResumeData } from '../data/defaultResume';

const STORAGE_KEY = 'resumeforge_data';
const LAST_SAVED_KEY = 'resumeforge_last_saved';

export function saveResumeToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(LAST_SAVED_KEY, new Date().toISOString());
  } catch (error) {
    console.error('Failed to save resume to localStorage:', error);
  }
}

export function loadResumeFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultResumeData;
    }
    const parsed = JSON.parse(raw);
    return {
      personal: {
        fullName: parsed.personal?.fullName ?? '',
        title: parsed.personal?.title ?? '',
        email: parsed.personal?.email ?? '',
        phone: parsed.personal?.phone ?? '',
        location: parsed.personal?.location ?? '',
        linkedin: parsed.personal?.linkedin ?? '',
        github: parsed.personal?.github ?? '',
        portfolio: parsed.personal?.portfolio ?? ''
      },
      summary: parsed.summary ?? '',
      experience: Array.isArray(parsed.experience) ? parsed.experience : [],
      education: Array.isArray(parsed.education) ? parsed.education : [],
      projects: Array.isArray(parsed.projects) ? parsed.projects : [],
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
      template: parsed.template ?? 'modern',
      accentColor: parsed.accentColor ?? 'blue'
    };
  } catch (error) {
    console.error('Failed to load resume from localStorage:', error);
    return defaultResumeData;
  }
}

export function clearResumeFromStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_SAVED_KEY);
  } catch (error) {
    console.error('Failed to clear resume from localStorage:', error);
  }
}

export function getLastSavedTimestamp() {
  try {
    return localStorage.getItem(LAST_SAVED_KEY);
  } catch {
    return null;
  }
}

