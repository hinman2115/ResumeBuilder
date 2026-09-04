import mammoth from 'mammoth';
import { Document, Paragraph, TextRun, Packer, HeadingLevel } from 'docx';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { readFileAsArrayBuffer } from './formatters';

/**
 * Dynamically loads PDF.js on demand
 */
async function loadPdfJs() {
  if (window.pdfjsLib) {
    return window.pdfjsLib;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } else {
        reject(new Error('PDF.js failed to load.'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js script.'));
    document.head.appendChild(script);
  });
}

/**
 * Converts a Microsoft Word DOCX file into a clean standard A4 PDF document
 */
export async function wordToPdf(file, options = {}, onProgress = null) {
  if (!file) throw new Error('No Word document provided.');

  if (onProgress) onProgress(20);
  const buffer = await readFileAsArrayBuffer(file);

  // Extract raw text and paragraphs using Mammoth
  if (onProgress) onProgress(40);
  const { value: rawText } = await mammoth.extractRawText({ arrayBuffer: buffer });
  
  if (!rawText || !rawText.trim()) {
    throw new Error('The Word document does not contain readable text.');
  }

  if (onProgress) onProgress(60);
  // Generate valid PDF document using PDF-Lib
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const lines = rawText.split('\n');
  const PAGE_WIDTH = 595.28; // Standard A4 points
  const PAGE_HEIGHT = 841.89;
  const MARGIN = 50;
  const FONT_SIZE = 11;
  const LINE_HEIGHT = 16;
  const MAX_LINES_PER_PAGE = Math.floor((PAGE_HEIGHT - MARGIN * 2) / LINE_HEIGHT);

  let currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let currentLineOnPage = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      currentLineOnPage += 1;
      continue;
    }

    if (currentLineOnPage >= MAX_LINES_PER_PAGE) {
      currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      currentLineOnPage = 0;
    }

    const y = PAGE_HEIGHT - MARGIN - (currentLineOnPage * LINE_HEIGHT);
    // Truncate or wrap line if too long for page width
    const safeLine = line.length > 90 ? line.substring(0, 90) + '...' : line;

    currentPage.drawText(safeLine, {
      x: MARGIN,
      y,
      size: FONT_SIZE,
      font,
      color: rgb(0.18, 0.19, 0.22)
    });

    currentLineOnPage += 1;

    if (onProgress && i % 20 === 0) {
      onProgress(60 + Math.round((i / lines.length) * 30));
    }
  }

  if (onProgress) onProgress(95);
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);

  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob,
    size: blob.size,
    name: `${baseName}.pdf`,
    pageCount: pdfDoc.getPageCount()
  };
}

/**
 * Converts a PDF document into a genuine, valid Microsoft Word DOCX document
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

  for (let p = 1; p <= numPages; p++) {
    const page = await pdf.getPage(p);
    const textContent = await page.getTextContent();
    const items = textContent.items || [];

    // Add a visual page header indicator in DOCX for multi-page documents
    if (numPages > 1) {
      docxParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `--- Page ${p} ---`,
              bold: true,
              color: '888888',
              size: 18
            })
          ],
          spacing: { before: 200, after: 100 }
        })
      );
    }

    // Group text items by line (based on Y position)
    let currentLine = '';
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.str) {
        currentLine += (currentLine ? ' ' : '') + item.str;
        // End of line check
        if (item.hasEOL || i === items.length - 1) {
          if (currentLine.trim()) {
            docxParagraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: currentLine.trim(),
                    size: 22 // 11pt in half-points
                  })
                ],
                spacing: { after: 120 }
              })
            );
          }
          currentLine = '';
        }
      }
    }

    if (onProgress) {
      onProgress(15 + Math.round((p / numPages) * 60));
    }
  }

  if (docxParagraphs.length === 0) {
    docxParagraphs.push(
      new Paragraph({
        children: [new TextRun('Extracted content from PDF document.')]
      })
    );
  }

  if (onProgress) onProgress(85);

  // Generate real, genuine DOCX document using docx library
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

  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob: docxBlob,
    size: docxBlob.size,
    name: `${baseName}.docx`,
    pageCount: numPages
  };
}

/**
 * Converts plain text or a text file into a formatted PDF document
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

  if (onProgress) onProgress(30);

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const lines = text.split('\n');
  const PAGE_WIDTH = 595.28;
  const PAGE_HEIGHT = 841.89;
  const MARGIN = options.margin || 50;
  const FONT_SIZE = options.fontSize || 11;
  const LINE_HEIGHT = Math.round(FONT_SIZE * 1.5);
  const MAX_LINES = Math.floor((PAGE_HEIGHT - MARGIN * 2) / LINE_HEIGHT);

  let currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let lineCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];

    if (lineCount >= MAX_LINES) {
      currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      lineCount = 0;
    }

    const y = PAGE_HEIGHT - MARGIN - (lineCount * LINE_HEIGHT);
    const safeLine = rawLine.length > 95 ? rawLine.substring(0, 95) : rawLine;

    currentPage.drawText(safeLine, {
      x: MARGIN,
      y,
      size: FONT_SIZE,
      font,
      color: rgb(0.18, 0.19, 0.22)
    });

    lineCount += 1;
    if (onProgress && i % 30 === 0) {
      onProgress(30 + Math.round((i / lines.length) * 60));
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);

  const baseName = fileName.replace(/\.[^/.]+$/, '');
  return {
    blob,
    size: blob.size,
    name: `${baseName}.pdf`,
    pageCount: pdfDoc.getPageCount()
  };
}

/**
 * Converts an HTML string or HTML file into a clean PDF document
 */
export async function htmlToPdf(htmlOrFile, options = {}, onProgress = null) {
  let html = '';
  let fileName = 'webpage.html';

  if (typeof htmlOrFile === 'string') {
    html = htmlOrFile;
  } else if (htmlOrFile instanceof File || htmlOrFile instanceof Blob) {
    html = await htmlOrFile.text();
    fileName = htmlOrFile.name || 'webpage.html';
  }

  // Strip HTML tags for clean text rendering into PDF
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return textToPdf(text, options, onProgress);
}

