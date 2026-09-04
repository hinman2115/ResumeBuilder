import JSZip from 'jszip';

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

