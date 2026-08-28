import html2pdf from 'html2pdf.js';

export async function exportResumeToPDF(elementId, options = {}) {
  const {
    fileName = 'Resume.pdf',
    onStart,
    onComplete,
    onError
  } = options;

  const element = document.getElementById(elementId);
  if (!element) {
    const err = new Error(`Element with id "${elementId}" not found for PDF export.`);
    onError?.(err);
    throw err;
  }

  onStart?.();

  try {
    const opt = {
      margin: 0,
      filename: fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        windowWidth: 794
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    await html2pdf().set(opt).from(element).save();
    onComplete?.();
  } catch (error) {
    console.error('PDF export failed:', error);
    onError?.(error);
    throw error;
  }
}

