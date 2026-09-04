import mammoth from 'mammoth';
import { Document, Paragraph, TextRun, Packer, PageBreak, ImageRun } from 'docx';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { readFileAsArrayBuffer } from './formatters';

/**
 * Dynamically loads PDF.js on demand
 */
async function loadPdfJs() {
  if (typeof window !== 'undefined' && window.pdfjsLib) {
    return window.pdfjsLib;
  }

  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      return reject(new Error('Browser environment required for PDF.js'));
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } else {
        reject(new Error('PDF.js failed to initialize.'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js script.'));
    document.head.appendChild(script);
  });
}

/**
 * Converts a Microsoft Word DOCX file into a clean standard PDF document.
 * Converts DOCX content into an intermediate HTML representation supporting
 * headings, bold, italic, underline, lists, tables, and images, then renders into PDF.
 */
export async function wordToPdf(file, options = {}, onProgress = null) {
  if (!file) throw new Error('No Word document provided.');

  if (onProgress) onProgress(20);
  const buffer = await readFileAsArrayBuffer(file);

  if (onProgress) onProgress(40);
  // Convert DOCX to rich HTML representation using Mammoth
  const mammothResult = await mammoth.convertToHtml({ arrayBuffer: buffer });
  const htmlContent = mammothResult.value;
  const warnings = mammothResult.messages.map(m => m.message);

  if (!htmlContent || !htmlContent.trim()) {
    throw new Error('The Word document does not contain readable content.');
  }

  if (onProgress) onProgress(65);

  const baseName = file.name.replace(/\.[^/.]+$/, '');

  // If in browser, use html2pdf.js for full styling and layout preservation
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '210mm';
      container.style.padding = '20mm 15mm';
      container.style.fontFamily = 'Arial, Calibri, sans-serif';
      container.style.fontSize = '11pt';
      container.style.lineHeight = '1.5';
      container.style.color = '#2F3038';
      container.style.background = '#FFFFFF';
      container.innerHTML = `
        <style>
          h1 { font-size: 22pt; margin-bottom: 8pt; color: #1e293b; font-weight: bold; }
          h2 { font-size: 16pt; margin-top: 14pt; margin-bottom: 6pt; color: #334155; font-weight: bold; }
          h3 { font-size: 13pt; margin-top: 10pt; margin-bottom: 4pt; color: #475569; font-weight: bold; }
          p { margin-bottom: 8pt; word-break: break-word; }
          ul, ol { margin-left: 20pt; margin-bottom: 8pt; }
          li { margin-bottom: 3pt; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 12pt; }
          th, td { border: 1px solid #cbd5e1; padding: 6pt 8pt; text-align: left; }
          th { background: #f8fafc; font-weight: bold; }
          img { max-width: 100%; height: auto; margin: 8pt 0; }
          a { color: #2563eb; text-decoration: underline; }
          strong, b { font-weight: bold; }
          em, i { font-style: italic; }
          u { text-decoration: underline; }
        </style>
        ${htmlContent}
      `;

      document.body.appendChild(container);

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${baseName}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      if (onProgress) onProgress(80);
      const pdfBlob = await html2pdf().from(container).set(opt).outputPdf('blob');
      document.body.removeChild(container);

      if (onProgress) onProgress(100);

      return {
        blob: pdfBlob,
        size: pdfBlob.size,
        name: `${baseName}.pdf`,
        warning: warnings.length > 0 ? `Converted with ${warnings.length} minor layout adjustments.` : null
      };
    } catch {
      // Fallback to pdf-lib layout engine
    }
  }

  // Fallback layout engine using pdf-lib
  const { value: rawText } = await mammoth.extractRawText({ arrayBuffer: buffer });
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const PAGE_WIDTH = 595.28;
  const PAGE_HEIGHT = 841.89;
  const MARGIN = 50;
  const FONT_SIZE = 11;
  const LINE_HEIGHT = 16;
  const MAX_LINES_PER_PAGE = Math.floor((PAGE_HEIGHT - MARGIN * 2) / LINE_HEIGHT);

  const lines = rawText.split('\n');
  let currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let lineCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      lineCount += 1;
      continue;
    }

    if (lineCount >= MAX_LINES_PER_PAGE) {
      currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      lineCount = 0;
    }

    const y = PAGE_HEIGHT - MARGIN - (lineCount * LINE_HEIGHT);
    const safeLine = line.length > 90 ? line.substring(0, 90) + '...' : line;
    const isHeading = line.length < 50 && (i === 0 || !lines[i - 1]?.trim());

    currentPage.drawText(safeLine, {
      x: MARGIN,
      y,
      size: isHeading ? 14 : FONT_SIZE,
      font: isHeading ? fontBold : font,
      color: rgb(0.18, 0.19, 0.22)
    });

    lineCount += isHeading ? 2 : 1;
    if (onProgress && i % 20 === 0) {
      onProgress(65 + Math.round((i / lines.length) * 30));
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);

  return {
    blob,
    size: blob.size,
    name: `${baseName}.pdf`,
    pageCount: pdfDoc.getPageCount(),
    warning: warnings.length > 0 ? warnings.slice(0, 2).join('; ') : null
  };
}

/**
 * Converts a PDF document into a genuine, valid Microsoft Word DOCX document.
 * Extracts text and paragraphs while preserving page boundaries.
 * For scanned or image-based pages, renders high-res page snapshots and warns the user.
 */
export async function pdfToWord(file, options = {}, onProgress = null) {
  if (!file) throw new Error('No PDF file provided.');

  if (onProgress) onProgress(15);
  const pdfjsLib = await loadPdfJs();
  const buffer = await readFileAsArrayBuffer(file);
  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  if (numPages === 0) throw new Error('The PDF file contains no pages.');

  const docxParagraphs = [];
  let totalExtractedCharacters = 0;
  let scannedPagesCount = 0;

  for (let p = 1; p <= numPages; p++) {
    const page = await pdf.getPage(p);
    const textContent = await page.getTextContent();
    const items = textContent.items || [];
    let pageTextLength = 0;

    // Add page boundary header
    if (p > 1) {
      docxParagraphs.push(
        new Paragraph({
          children: [new PageBreak()]
        })
      );
    }

    // Group items into lines
    let currentLine = '';
    const pageLines = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.str) {
        currentLine += (currentLine ? ' ' : '') + item.str;
        pageTextLength += item.str.trim().length;

        if (item.hasEOL || i === items.length - 1) {
          if (currentLine.trim()) {
            pageLines.push(currentLine.trim());
          }
          currentLine = '';
        }
      }
    }

    totalExtractedCharacters += pageTextLength;

    // Check if this page appears to be scanned or image-based (no selectable text)
    if (pageTextLength < 10) {
      scannedPagesCount += 1;

      // In browser, render the page to canvas and embed as ImageRun into DOCX
      if (typeof document !== 'undefined') {
        try {
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;

          const imageBlob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.9));
          if (imageBlob) {
            const imageBytes = new Uint8Array(await imageBlob.arrayBuffer());
            docxParagraphs.push(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imageBytes,
                    transformation: {
                      width: 520,
                      height: Math.round(520 * (viewport.height / viewport.width))
                    }
                  })
                ]
              })
            );
          }
          canvas.width = 0;
          canvas.height = 0;
        } catch {
          docxParagraphs.push(
            new Paragraph({
              children: [new TextRun({ text: `[Page ${p}: Scanned or image-only content]`, italic: true, color: '777777' })]
            })
          );
        }
      }
    } else {
      // Text-based page: add text paragraphs
      for (const line of pageLines) {
        const isHeading = line.length < 60 && /^[A-Z0-9\s:.-]+$/.test(line);
        docxParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line,
                bold: isHeading,
                size: isHeading ? 26 : 22 // 13pt or 11pt
              })
            ],
            spacing: { after: isHeading ? 160 : 100 }
          })
        );
      }
    }

    if (onProgress) {
      onProgress(15 + Math.round((p / numPages) * 70));
    }
  }

  if (docxParagraphs.length === 0) {
    docxParagraphs.push(
      new Paragraph({
        children: [new TextRun('Extracted content from PDF document.')]
      })
    );
  }

  if (onProgress) onProgress(88);

  // Generate real, genuine OOXML DOCX document using docx library
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docxParagraphs
      }
    ]
  });

  const docxBlob = await Packer.toBlob(doc);
  if (onProgress) onProgress(100);

  const isScannedPdf = totalExtractedCharacters < 30 || scannedPagesCount === numPages;
  const warningMessage = isScannedPdf
    ? 'This PDF appears to be scanned/image-based. Text extraction may be limited.'
    : scannedPagesCount > 0
    ? `${scannedPagesCount} page(s) appear to contain scanned images.`
    : null;

  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob: docxBlob,
    size: docxBlob.size,
    name: `${baseName}.docx`,
    originalName: file.name,
    pageCount: numPages,
    isScanned: isScannedPdf,
    warning: warningMessage
  };
}

/**
 * Converts plain text or a text file into a formatted PDF document with rich styling options.
 */
export async function textToPdf(textOrFile, options = {}, onProgress = null) {
  let text = '';
  let fileName = 'document.txt';

  if (typeof textOrFile === 'string') {
    text = textOrFile;
  } else if (textOrFile instanceof File || textOrFile instanceof Blob) {
    text = await textOrFile.text();
    fileName = textOrFile.name || 'document.txt';
  }

  if (!text || !text.trim()) {
    throw new Error('Please enter or upload some text to convert.');
  }

  if (onProgress) onProgress(20);

  const {
    pageSize = 'a4', // 'a4', 'letter'
    fontSize = 12, // 10, 12, 14, 16, 18, 20
    margin = 'medium', // 'small' (25), 'medium' (50), 'large' (75)
    alignment = 'left', // 'left', 'center', 'right'
    fontFamily = 'helvetica' // 'helvetica', 'times', 'courier'
  } = options;

  const marginValues = {
    small: 25,
    medium: 50,
    large: 75
  };
  const marginPt = typeof margin === 'number' ? margin : (marginValues[margin] || 50);

  const pdfDoc = await PDFDocument.create();

  // Select standard font
  let fontStandard = StandardFonts.Helvetica;
  if (fontFamily === 'times') fontStandard = StandardFonts.TimesRoman;
  else if (fontFamily === 'courier') fontStandard = StandardFonts.Courier;
  const font = await pdfDoc.embedFont(fontStandard);

  const PAGE_WIDTH = pageSize === 'letter' ? 612 : 595.28;
  const PAGE_HEIGHT = pageSize === 'letter' ? 792 : 841.89;
  const PRINTABLE_WIDTH = PAGE_WIDTH - marginPt * 2;
  const LINE_HEIGHT = Math.round(fontSize * 1.45);
  const MAX_LINES_PER_PAGE = Math.floor((PAGE_HEIGHT - marginPt * 2) / LINE_HEIGHT);

  // Helper to wrap a single paragraph into lines that fit within PRINTABLE_WIDTH
  const wrapParagraph = (para) => {
    if (!para) return [''];
    const words = para.split(/\s+/);
    const wrappedLines = [];
    let curLine = '';

    for (const word of words) {
      const candidate = curLine ? `${curLine} ${word}` : word;
      const textWidth = font.widthOfTextAtSize(candidate, fontSize);

      if (textWidth <= PRINTABLE_WIDTH) {
        curLine = candidate;
      } else {
        if (curLine) wrappedLines.push(curLine);
        curLine = word;
      }
    }
    if (curLine) wrappedLines.push(curLine);
    return wrappedLines;
  };

  // Split input into lines preserving original paragraph breaks
  const rawParagraphs = text.split('\n');
  const allFormattedLines = [];

  for (const para of rawParagraphs) {
    if (para.trim() === '') {
      allFormattedLines.push('');
    } else {
      const wrapped = wrapParagraph(para);
      allFormattedLines.push(...wrapped);
    }
  }

  let currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let lineOnPage = 0;

  for (let i = 0; i < allFormattedLines.length; i++) {
    const line = allFormattedLines[i];

    if (lineOnPage >= MAX_LINES_PER_PAGE) {
      currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      lineOnPage = 0;
    }

    if (line) {
      const textWidth = font.widthOfTextAtSize(line, fontSize);
      let x = marginPt;

      if (alignment === 'center') {
        x = marginPt + (PRINTABLE_WIDTH - textWidth) / 2;
      } else if (alignment === 'right') {
        x = marginPt + PRINTABLE_WIDTH - textWidth;
      }

      const y = PAGE_HEIGHT - marginPt - (lineOnPage * LINE_HEIGHT) - fontSize;

      currentPage.drawText(line, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0.18, 0.19, 0.22)
      });
    }

    lineOnPage += 1;

    if (onProgress && i % 25 === 0) {
      onProgress(30 + Math.round((i / allFormattedLines.length) * 60));
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);

  return {
    blob,
    size: blob.size,
    name: 'document.pdf',
    pageCount: pdfDoc.getPageCount()
  };
}

/**
 * Converts an HTML string or HTML file into a clean PDF document
 */
export async function htmlToPdf(htmlOrFile, options = {}, onProgress = null) {
  let html = '';
  let fileName = 'document.html';

  if (typeof htmlOrFile === 'string') {
    html = htmlOrFile;
  } else if (htmlOrFile instanceof File || htmlOrFile instanceof Blob) {
    html = await htmlOrFile.text();
    fileName = htmlOrFile.name || 'document.html';
  }

  const baseName = fileName.replace(/\.[^/.]+$/, '');

  // In browser, render HTML with html2pdf for true visual fidelity
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '210mm';
      container.style.padding = '15mm';
      container.style.background = '#ffffff';
      container.innerHTML = html;
      document.body.appendChild(container);

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${baseName}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      if (onProgress) onProgress(60);
      const pdfBlob = await html2pdf().from(container).set(opt).outputPdf('blob');
      document.body.removeChild(container);

      if (onProgress) onProgress(100);

      return {
        blob: pdfBlob,
        size: pdfBlob.size,
        name: `${baseName}.pdf`
      };
    } catch {
      // Fallback
    }
  }

  // Fallback: strip tags and convert text to PDF
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return textToPdf(text, options, onProgress);
}
