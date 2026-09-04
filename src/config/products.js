/**
 * Central Configuration for ResumeForge & FileForge Multi-Product Architecture
 */

export const PRODUCTS = {
  resume: {
    id: 'resume',
    name: 'ResumeForge',
    tagline: 'Build a professional resume in minutes.',
    description: 'Create an ATS-friendly, professional resume online with ResumeForge. Choose from modern templates, customize your content, and download an interview-ready PDF instantly.',
    homePath: '/',
    accentColor: '#026fc7',
    badgeText: 'Resume Builder',
    siteName: 'ResumeForge',
    domain: 'https://resumeforge.app',
    crossPromo: {
      targetId: 'file',
      targetName: 'FileForge',
      tagline: 'Free online PDF and file tools.',
      title: 'Need to edit, convert, or compress documents?',
      description: 'Use our dedicated companion product FileForge for 100% private, client-side PDF and file utilities.',
      buttonText: 'Open FileForge',
      path: '/file-tools'
    }
  },
  file: {
    id: 'file',
    name: 'FileForge',
    tagline: 'Free online PDF and file tools.',
    description: 'FileForge provides free online PDF and file tools for converting, merging, splitting, compressing, and managing files directly in your web browser with 100% privacy.',
    homePath: '/file-tools',
    accentColor: '#4f46e5',
    badgeText: 'PDF & File Tools',
    siteName: 'FileForge',
    domain: 'https://resumeforge.app',
    crossPromo: {
      targetId: 'resume',
      targetName: 'ResumeForge',
      tagline: 'Build a professional resume in minutes.',
      title: 'Looking to craft an interview-winning resume?',
      description: 'Use ResumeForge for ATS-optimized templates, real-time live preview, and instant A4 PDF export.',
      buttonText: 'Create Resume with ResumeForge',
      path: '/builder'
    }
  }
};

/**
 * Determines current product based on pathname
 * @param {string} pathname 
 * @returns {typeof PRODUCTS.resume | typeof PRODUCTS.file}
 */
export const getProductByPath = (pathname = '') => {
  if (typeof pathname === 'string' && pathname.startsWith('/file-tools')) {
    return PRODUCTS.file;
  }
  return PRODUCTS.resume;
};
