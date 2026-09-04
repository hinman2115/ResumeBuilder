/**
 * File utility helpers & validators
 */

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function validateFile(file, options = {}) {
  const {
    maxSizeMB = 50,
    allowedExtensions = [],
    allowedMimeTypes = []
  } = options;

  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  // 1. Size check
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File "${file.name}" exceeds the maximum limit of ${maxSizeMB}MB (${formatBytes(file.size)}).`
    };
  }

  // 2. Extension check
  if (allowedExtensions.length > 0) {
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    const hasValidExt = allowedExtensions.some(e => e.toLowerCase() === ext);
    if (!hasValidExt) {
      return {
        valid: false,
        error: `File type "${ext}" is not supported. Allowed formats: ${allowedExtensions.join(', ')}`
      };
    }
  }

  // 3. Security: Disallow executable or dangerous script extensions
  const blockedExtensions = ['.exe', '.bat', '.cmd', '.sh', '.vbs', '.msi', '.com', '.scr', '.pif'];
  const ext = '.' + file.name.split('.').pop().toLowerCase();
  if (blockedExtensions.includes(ext)) {
    return {
      valid: false,
      error: `File "${file.name}" contains an unsafe executable format and is blocked.`
    };
  }

  return { valid: true };
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file into memory.'));
    reader.readAsArrayBuffer(file);
  });
}

