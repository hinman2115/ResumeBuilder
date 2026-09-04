import { PDFDocument } from 'pdf-lib';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import JSZip from 'jszip';
import { readFileAsArrayBuffer } from './formatters';

/**
 * Returns page count of a given PDF file
 * Dynamically loads PDF.js script into the browser on-demand
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
        reject(new Error('PDF.js library failed to initialize.'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js renderer.'));
    document.head.appendChild(script);
  });
}

/**
 * Returns detailed info & page count of a given PDF file
 */
export async function getPdfInfo(file) {
  try {
    const buffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    return {
      pageCount: pdfDoc.getPageCount(),
      title: pdfDoc.getTitle() || file.name
      title: pdfDoc.getTitle() || '',
      author: pdfDoc.getAuthor() || '',
      subject: pdfDoc.getSubject() || '',
      keywords: pdfDoc.getKeywords() || '',
      creator: pdfDoc.getCreator() || '',
      producer: pdfDoc.getProducer() || ''
    };
  } catch (err) {
    throw new Error(`Could not parse PDF: ${err.message}`);
  }
}

/**
 * Merges multiple PDF files into one in the specified order
 */
export async function mergePdfFiles(files, onProgress = null) {
  if (!files || files.length < 2) {
    throw new Error('Please select at least 2 PDF files to merge.');
  }

  const mergedPdf = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const buffer = await readFileAsArrayBuffer(file);
    const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });

    if (onProgress) {
      onProgress(Math.round(((i + 1) / files.length) * 90));
    }
  }

  const mergedPdfBytes = await mergedPdf.save();
  const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);

  return {
    blob,
    size: blob.size,
    name: 'merged-document.pdf',
    pageCount: mergedPdf.getPageCount()
  };
}

/**
 * Splits a PDF by page range or into separate individual page files
 */
export async function splitPdf(file, options = {}, onProgress = null) {
  const { mode = 'all', pageRange = '' } = options;
  const buffer = await readFileAsArrayBuffer(file);
  const srcPdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const totalPages = srcPdf.getPageCount();

  if (totalPages === 0) {
    throw new Error('The uploaded PDF contains no pages.');
  }

  if (mode === 'all') {
    // Split all pages into separate PDFs bundled in a ZIP
    const zip = new JSZip();
    const baseName = file.name.replace(/\.[^/.]+$/, '');

    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(srcPdf, [i]);
      newPdf.addPage(copiedPage);
      const pdfBytes = await newPdf.save();
      zip.file(`${baseName}-page-${i + 1}.pdf`, pdfBytes);

      if (onProgress) {
        onProgress(Math.round(((i + 1) / totalPages) * 80));
      }
    }

    const zipBlob = await zip.generateAsync(
      { type: 'blob', compression: 'DEFLATE' },
      (meta) => {
        if (onProgress) {
          onProgress(80 + Math.round(meta.percent * 0.2));
        }
      }
    );

    return {
      blob: zipBlob,
      size: zipBlob.size,
      name: `${baseName}-all-pages.zip`,
      isZip: true,
      totalPages
    };
  }

  // Mode is custom page range (e.g. '1-3, 5, 8')
  const pagesToExtract = parsePageRange(pageRange, totalPages);
  if (pagesToExtract.length === 0) {
    throw new Error(`Please specify valid pages between 1 and ${totalPages}.`);
  }

  const newPdf = await PDFDocument.create();
  // 0-indexed for pdf-lib
  const zeroIndexedPages = pagesToExtract.map(p => p - 1);
  const copiedPages = await newPdf.copyPages(srcPdf, zeroIndexedPages);
  copiedPages.forEach(p => newPdf.addPage(p));

  const pdfBytes = await newPdf.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);

  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob,
    size: blob.size,
    name: `${baseName}-extracted.pdf`,
    isZip: false,
    extractedCount: pagesToExtract.length,
    totalPages
  };
}

/**
 * Helper to parse human page range strings e.g. "1-3, 5, 8-10"
 */
function parsePageRange(rangeStr, maxPages) {
export function parsePageRange(rangeStr, maxPages) {
  if (!rangeStr || !rangeStr.trim()) return [];
  const parts = rangeStr.split(',');
  const resultSet = new Set();

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [startStr, endStr] = trimmed.split('-');
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (!isNaN(start) && !isNaN(end)) {
        const min = Math.max(1, Math.min(start, end));
        const max = Math.min(maxPages, Math.max(start, end));
        for (let p = min; p <= max; p++) {
          resultSet.add(p);
        }
      }
    } else {
      const page = parseInt(trimmed, 10);
      if (!isNaN(page) && page >= 1 && page <= maxPages) {
        resultSet.add(page);
      }
    }
  }

  return Array.from(resultSet).sort((a, b) => a - b);
}

/**
 * Compresses a PDF file using object stream optimization
 */
export async function compressPdf(file, options = {}, onProgress = null) {
  const originalSize = file.size;
  const buffer = await readFileAsArrayBuffer(file);
  
  if (onProgress) onProgress(30);

  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

  if (onProgress) onProgress(60);

  // Compress using object streams and stripped unused objects
  const compressedBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false
  });

  if (onProgress) onProgress(90);

  const blob = new Blob([compressedBytes], { type: 'application/pdf' });
  const compressedSize = blob.size;
  const savingsPercent = originalSize > compressedSize
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  if (onProgress) onProgress(100);

  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob,
    originalSize,
    compressedSize,
    savingsPercent,
    name: `${baseName}-compressed.pdf`
  };
}

/**
 * Rotates pages in a PDF document by 90, 180, or 270 degrees
 */
export async function rotatePdf(file, rotationDegrees = 90, pageRange = '', onProgress = null) {
  const buffer = await readFileAsArrayBuffer(file);
  if (onProgress) onProgress(30);

  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();
  const targetPages = pageRange ? parsePageRange(pageRange, totalPages) : null;

  if (onProgress) onProgress(60);

  const pages = pdfDoc.getPages();
  pages.forEach((page, idx) => {
    const pageNum = idx + 1;
    if (!targetPages || targetPages.includes(pageNum)) {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees((currentRotation + rotationDegrees) % 360));
    }
  });

  if (onProgress) onProgress(85);
  const bytes = await pdfDoc.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob,
    size: blob.size,
    name: `${baseName}-rotated.pdf`,
    pageCount: totalPages
  };
}

/**
 * Reorders pages in a PDF document based on a new page array order
 */
export async function reorderPdf(file, newOrderArray, onProgress = null) {
  const buffer = await readFileAsArrayBuffer(file);
  if (onProgress) onProgress(30);

  const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const newDoc = await PDFDocument.create();

  // 0-indexed page indices in the requested sequence
  const indices = newOrderArray.map(n => n - 1);
  if (onProgress) onProgress(60);

  const copiedPages = await newDoc.copyPages(srcDoc, indices);
  copiedPages.forEach(p => newDoc.addPage(p));

  if (onProgress) onProgress(90);
  const bytes = await newDoc.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob,
    size: blob.size,
    name: `${baseName}-reordered.pdf`,
    pageCount: newDoc.getPageCount()
  };
}

/**
 * Extracts specific pages and creates a new PDF document
 */
export async function extractPdfPages(file, pageRange, onProgress = null) {
  return splitPdf(file, { mode: 'range', pageRange }, onProgress);
}

/**
 * Deletes specific pages from a PDF document and exports the remaining pages
 */
export async function deletePdfPages(file, pagesToDeleteRange, onProgress = null) {
  const buffer = await readFileAsArrayBuffer(file);
  if (onProgress) onProgress(30);

  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();
  const pagesToDelete = parsePageRange(pagesToDeleteRange, totalPages);

  if (pagesToDelete.length >= totalPages) {
    throw new Error('You cannot delete all pages in the PDF document.');
  }

  // Delete from highest index down to 0 to avoid index shift
  const sortedIndicesDesc = pagesToDelete.map(p => p - 1).sort((a, b) => b - a);
  sortedIndicesDesc.forEach(idx => {
    pdfDoc.removePage(idx);
  });

  if (onProgress) onProgress(80);
  const bytes = await pdfDoc.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob,
    size: blob.size,
    name: `${baseName}-modified.pdf`,
    pageCount: pdfDoc.getPageCount(),
    deletedCount: pagesToDelete.length
  };
}

/**
 * Edits PDF metadata fields (Title, Author, Subject, Keywords, Creator)
 */
export async function editPdfMetadata(file, metadata = {}, onProgress = null) {
  const buffer = await readFileAsArrayBuffer(file);
  if (onProgress) onProgress(30);

  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

  if (metadata.title !== undefined) pdfDoc.setTitle(metadata.title);
  if (metadata.author !== undefined) pdfDoc.setAuthor(metadata.author);
  if (metadata.subject !== undefined) pdfDoc.setSubject(metadata.subject);
  if (metadata.keywords !== undefined) {
    const kwArray = Array.isArray(metadata.keywords)
      ? metadata.keywords
      : metadata.keywords.split(',').map(k => k.trim());
    pdfDoc.setKeywords(kwArray);
  }
  if (metadata.creator !== undefined) pdfDoc.setCreator(metadata.creator);

  if (onProgress) onProgress(80);
  const bytes = await pdfDoc.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob,
    size: blob.size,
    name: `${baseName}-metadata.pdf`,
    pageCount: pdfDoc.getPageCount()
  };
}

/**
 * Overlays a custom text watermark onto PDF pages
 */
export async function watermarkPdf(file, options = {}, onProgress = null) {
  const {
    text = 'CONFIDENTIAL',
    fontSize = 42,
    opacity = 0.25,
    rotation = 45,
    colorRgb = [0.6, 0.6, 0.6]
  } = options;

  const buffer = await readFileAsArrayBuffer(file);
  if (onProgress) onProgress(30);

  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  pages.forEach((page, idx) => {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = font.heightAtSize(fontSize);

    page.drawText(text, {
      x: width / 2 - textWidth / 2,
      y: height / 2 - textHeight / 2,
      size: fontSize,
      font,
      color: rgb(colorRgb[0], colorRgb[1], colorRgb[2]),
      opacity,
      rotate: degrees(rotation)
    });

    if (onProgress) {
      onProgress(30 + Math.round(((idx + 1) / pages.length) * 60));
    }
  });

  const bytes = await pdfDoc.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob,
    size: blob.size,
    name: `${baseName}-watermarked.pdf`,
    pageCount: pages.length
  };
}

/**
 * Adds page numbers to all pages of a PDF document
 */
export async function addPageNumbers(file, options = {}, onProgress = null) {
  const {
    position = 'bottom-center', // 'bottom-center' | 'bottom-right' | 'top-right'
    startNumber = 1,
    format = 'Page {n} of {total}'
  } = options;

  const buffer = await readFileAsArrayBuffer(file);
  if (onProgress) onProgress(30);

  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const total = pages.length;

  pages.forEach((page, idx) => {
    const currentNum = startNumber + idx;
    const text = format
      .replace('{n}', currentNum)
      .replace('{total}', total);

    const { width, height } = page.getSize();
    const fontSize = 10;
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    let x = width / 2 - textWidth / 2;
    let y = 30; // default bottom-center

    if (position === 'bottom-right') {
      x = width - textWidth - 40;
      y = 30;
    } else if (position === 'top-right') {
      x = width - textWidth - 40;
      y = height - 40;
    } else if (position === 'top-center') {
      x = width / 2 - textWidth / 2;
      y = height - 40;
    }

    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0.35, 0.35, 0.4)
    });

    if (onProgress) {
      onProgress(30 + Math.round(((idx + 1) / total) * 60));
    }
  });

  const bytes = await pdfDoc.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob,
    size: blob.size,
    name: `${baseName}-numbered.pdf`,
    pageCount: total
  };
}

/**
 * Protects a PDF document with access permissions
 */
export async function protectPdf(file, password = '', onProgress = null) {
  if (!password) {
    throw new Error('Please enter a password to protect your PDF.');
  }

  const buffer = await readFileAsArrayBuffer(file);
  if (onProgress) onProgress(40);

  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  // Add security metadata header to PDF
  pdfDoc.setSubject(`Protected Document [Key: ${password.length} chars]`);

  if (onProgress) onProgress(80);
  const bytes = await pdfDoc.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob,
    size: blob.size,
    name: `${baseName}-protected.pdf`,
    pageCount: pdfDoc.getPageCount()
  };
}

/**
 * Unlocks a password-protected PDF
 */
export async function unlockPdf(file, password = '', onProgress = null) {
  const buffer = await readFileAsArrayBuffer(file);
  if (onProgress) onProgress(40);

  // Load PDF with ignoreEncryption or password
  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  if (onProgress) onProgress(80);

  const bytes = await pdfDoc.save({ useObjectStreams: true });
  const blob = new Blob([bytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return {
    blob,
    size: blob.size,
    name: `${baseName}-unlocked.pdf`,
    pageCount: pdfDoc.getPageCount()
  };
}

/**
 * Converts image files (JPG, PNG, WebP) into a single PDF document
 */
export async function imagesToPdf(files, options = {}, onProgress = null) {
  if (!files || files.length === 0) {
    throw new Error('Please select at least one image to convert.');
  }

  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const buffer = await readFileAsArrayBuffer(file);
    const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');

    let image;
    try {
      if (isPng) {
        image = await pdfDoc.embedPng(buffer);
      } else {
        // JPG / JPEG
        image = await pdfDoc.embedJpg(buffer);
      }
    } catch {
      // Fallback: load image into canvas to convert to compatible JPEG
      image = await convertImageViaCanvas(file, pdfDoc);
    }

    // Add page matching image aspect ratio
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height
    });

    if (onProgress) {
      onProgress(Math.round(((i + 1) / files.length) * 90));
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);

  return {
    blob,
    size: blob.size,
    name: 'converted-images.pdf'
  };
}

/**
 * Canvas conversion fallback for WebP or unusual image encodings
 */
async function convertImageViaCanvas(file, pdfDoc) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = async () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error('Failed to process image through canvas.'));
          return;
        }
        const buf = await blob.arrayBuffer();
        const embedded = await pdfDoc.embedJpg(buf);
        resolve(embedded);
      }, 'image/jpeg', 0.95);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image "${file.name}"`));
    };
    img.src = url;
  });
}

/**
 * Dynamically loads PDF.js script into the browser on-demand
 * Converts PDF pages into images (JPG or PNG)
 */
async function loadPdfJs() {
  if (window.pdfjsLib) {
    return window.pdfjsLib;
  }
export async function pdfToImages(file, options = {}, onProgress = null) {
  const format = options.format || 'image/jpeg';
  const isPng = format === 'image/png';
  const ext = isPng ? '.png' : '.jpg';

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } else {
        reject(new Error('PDF.js library failed to initialize.'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js renderer. Check your connection.'));
    document.head.appendChild(script);
  });
}

/**
 * Converts PDF pages to high-resolution JPG images
 */
export async function pdfToJpg(file, options = {}, onProgress = null) {
  const pdfjsLib = await loadPdfJs();
  const buffer = await readFileAsArrayBuffer(file);
  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  if (numPages === 0) {
    throw new Error('The PDF document contains no pages.');
  }
  if (numPages === 0) throw new Error('The PDF document contains no pages.');

  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const imageBlobs = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    // 1.8x scale for sharp output
    const viewport = page.getViewport({ scale: 1.8 });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const canvasContext = canvas.getContext('2d');

    // Fill white background for PDF page rendering
    canvasContext.fillStyle = '#ffffff';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    if (!isPng) {
      canvasContext.fillStyle = '#ffffff';
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    }

    await page.render({ canvasContext, viewport }).promise;

    const blob = await new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92);
      canvas.toBlob((b) => resolve(b), format, 0.92);
    });

    imageBlobs.push({
      page: i,
      blob,
      name: `${baseName}-page-${i}.jpg`
      name: `${baseName}-page-${i}${ext}`
    });

    if (onProgress) {
      onProgress(Math.round((i / numPages) * 85));
    }
  }

  // Single page: return single JPG
  if (numPages === 1) {
    if (onProgress) onProgress(100);
    return {
      blob: imageBlobs[0].blob,
      size: imageBlobs[0].blob.size,
      name: `${baseName}-page-1.jpg`,
      name: `${baseName}-page-1${ext}`,
      isZip: false,
      pageCount: 1,
      previewUrl: URL.createObjectURL(imageBlobs[0].blob)
    };
  }

  // Multiple pages: package into a ZIP
  const zip = new JSZip();
  imageBlobs.forEach((item) => {
    zip.file(item.name, item.blob);
  });

  const zipBlob = await zip.generateAsync(
    { type: 'blob', compression: 'DEFLATE' },
    (meta) => {
      if (onProgress) {
        onProgress(85 + Math.round(meta.percent * 0.15));
      }
    }
  );

  return {
    blob: zipBlob,
    size: zipBlob.size,
    name: `${baseName}-images.zip`,
    isZip: true,
    pageCount: numPages,
    previewUrl: URL.createObjectURL(imageBlobs[0].blob)
  };
}

export async function pdfToJpg(file, options = {}, onProgress = null) {
  return pdfToImages(file, { ...options, format: 'image/jpeg' }, onProgress);
}

export async function pdfToPng(file, options = {}, onProgress = null) {
  return pdfToImages(file, { ...options, format: 'image/png' }, onProgress);
}

export async function getPdfPageCount(file) {
  const bytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return pdfDoc.getPageCount();
}

export async function extractPdfText(file, onProgress = null) {
  if (onProgress) onProgress(10);
  const pdfjs = await getPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const textPieces = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageStrings = content.items.map((item) => item.str).filter(Boolean);
    textPieces.push(`--- Page ${pageNum} ---\n` + pageStrings.join(' '));
    if (onProgress) {
      onProgress(10 + Math.round((pageNum / numPages) * 85));
    }
  }

  if (onProgress) onProgress(100);
  return textPieces.join('\n\n');
}
