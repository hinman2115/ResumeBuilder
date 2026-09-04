import JSZip from 'jszip';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { readFileAsArrayBuffer } from './formatters';

/**
 * Creates a compressed .zip archive from an array of File objects
 * @param {File[]} files 
 * @param {string} zipName 
 * @param {Function} [onProgress] 
 * @returns {Promise<{ blob: Blob, size: number, name: string }>}
 */
export async function createZipArchive(files, zipName = 'archive.zip', onProgress = null) {
  if (!files || files.length === 0) {
    throw new Error('No files provided to create ZIP archive.');
  }

  const zip = new JSZip();

  // Add each file to root or subpath
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // Sanitize filename to prevent directory traversal
    const safeName = file.name.replace(/\.\./g, '').replace(/^\/+/, '');
    zip.file(safeName, file);
  }

  const blob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    },
    (metadata) => {
      if (onProgress) {
        onProgress(Math.round(metadata.percent));
      }
    }
  );

  const cleanZipName = zipName.endsWith('.zip') ? zipName : `${zipName}.zip`;

  return {
    blob,
    size: blob.size,
    name: cleanZipName
  };
}

/**
 * Extracts files from a ZIP archive
 * @param {File|Blob} zipFile 
 * @param {Function} [onProgress] 
 * @returns {Promise<{ files: Array<{ name: string, size: number, date: Date, getBlob: Function }> }>}
 */
export async function extractZipArchive(zipFile, onProgress = null) {
  if (!zipFile) {
    throw new Error('No ZIP file provided for extraction.');
  }

  const zip = await JSZip.loadAsync(zipFile);
  const entries = [];
  const keys = Object.keys(zip.files);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const item = zip.files[key];

    // Skip directory markers
    if (item.dir) continue;

    // Sanitize path against directory traversal
    const cleanPath = item.name.replace(/\.\./g, '').replace(/^\/+/, '');
    if (!cleanPath) continue;

    entries.push({
      name: cleanPath,
      size: item._data ? item._data.uncompressedSize : 0,
      date: item.date || new Date(),
      async getBlob() {
        return await item.async('blob');
      }
    });

    if (onProgress) {
      onProgress(Math.round(((i + 1) / keys.length) * 100));
    }
  }

  return {
    files: entries,
    count: entries.length
  };
}

/**
 * Batch renames multiple files and packages them into a ZIP archive
 */
export async function batchRenameFiles(files, options = {}, onProgress = null) {
  const {
    prefix = '',
    suffix = '',
    find = '',
    replace = '',
    numbering = true,
    startNumber = 1
  } = options;

  if (!files || files.length === 0) {
    throw new Error('No files provided for renaming.');
  }

  const zip = new JSZip();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.includes('.') ? '.' + file.name.split('.').pop() : '';
    let base = file.name.replace(/\.[^/.]+$/, '');

    // Find and replace
    if (find) {
      base = base.replaceAll(find, replace);
    }

    let finalName = `${prefix}${base}${suffix}`;
    if (numbering) {
      const numStr = String(startNumber + i).padStart(2, '0');
      finalName = `${finalName}_${numStr}`;
    }
    finalName = `${finalName}${ext}`.replace(/\.\./g, '').replace(/^\/+/, '');

    zip.file(finalName, file);

    if (onProgress) {
      onProgress(Math.round(((i + 1) / files.length) * 85));
    }
  }

  const blob = await zip.generateAsync(
    { type: 'blob', compression: 'DEFLATE' },
    (meta) => {
      if (onProgress) onProgress(85 + Math.round(meta.percent * 0.15));
    }
  );

  return {
    blob,
    size: blob.size,
    name: 'renamed-files.zip',
    count: files.length
  };
}

/**
 * Combines compatible files (PDFs, Images, Text) into a single unified PDF
 */
export async function combineFilesToPdf(files, onProgress = null) {
  if (!files || files.length === 0) {
    throw new Error('Please select files to combine.');
  }

  const finalPdf = await PDFDocument.create();
  const font = await finalPdf.embedFont(StandardFonts.Helvetica);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const name = file.name.toLowerCase();
    const buffer = await readFileAsArrayBuffer(file);

    if (name.endsWith('.pdf')) {
      const srcPdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = await finalPdf.copyPages(srcPdf, srcPdf.getPageIndices());
      pages.forEach(p => finalPdf.addPage(p));
    } else if (name.endsWith('.jpg') || name.endsWith('.jpeg')) {
      const img = await finalPdf.embedJpg(buffer);
      const page = finalPdf.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    } else if (name.endsWith('.png')) {
      const img = await finalPdf.embedPng(buffer);
      const page = finalPdf.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    } else if (name.endsWith('.txt')) {
      const text = await file.text();
      const page = finalPdf.addPage([595.28, 841.89]);
      const lines = text.split('\n').slice(0, 45); // First page preview
      lines.forEach((l, lIdx) => {
        page.drawText(l.substring(0, 85), {
          x: 50,
          y: 841.89 - 50 - (lIdx * 16),
          size: 11,
          font,
          color: rgb(0.2, 0.2, 0.2)
        });
      });
    }

    if (onProgress) {
      onProgress(Math.round(((i + 1) / files.length) * 90));
    }
  }

  const bytes = await finalPdf.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });

  if (onProgress) onProgress(100);

  return {
    blob,
    size: blob.size,
    name: 'combined-document.pdf',
    pageCount: finalPdf.getPageCount()
  };
}
