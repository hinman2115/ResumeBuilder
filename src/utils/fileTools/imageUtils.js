/**
 * Client-Side Image Processing Utilities using HTML5 Canvas
 * Zero server uploads - 100% in-browser processing.
 */

export function loadImage(fileOrBlob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(fileOrBlob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to decode image "${fileOrBlob.name || 'file'}"`));
    };
    img.src = url;
  });
}

/**
 * Converts an image file to a specified format (image/jpeg, image/png, image/webp)
 */
export async function convertImage(file, targetMimeType = 'image/jpeg', quality = 0.92) {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;

  const ctx = canvas.getContext('2d');
  // Fill white background for JPEG output (since JPEG has no alpha channel)
  if (targetMimeType === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Canvas conversion failed.'))),
      targetMimeType,
      quality
    );
  });

  const extMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp'
  };
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const newName = `${baseName}${extMap[targetMimeType] || '.jpg'}`;

  return {
    blob,
    size: blob.size,
    name: newName,
    width: canvas.width,
    height: canvas.height,
    previewUrl: URL.createObjectURL(blob)
  };
}

/**
 * Compresses an image by adjusting resolution scale and JPEG/WebP compression quality
 */
export async function compressImage(file, options = {}) {
  const { quality = 0.75, maxWidth = 1920, maxHeight = 1920 } = options;
  const originalSize = file.size;
  const img = await loadImage(file);

  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;

  // Scale down if exceeds max dimensions
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Fill white background for non-PNG formats
  const targetMime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  if (targetMime === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Compression failed.'))),
      targetMime,
      quality
    );
  });

  const compressedSize = blob.size;
  const savingsPercent = originalSize > compressedSize
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const ext = targetMime === 'image/png' ? '.png' : '.jpg';

  return {
    blob,
    originalSize,
    compressedSize,
    savingsPercent,
    width,
    height,
    name: `${baseName}-compressed${ext}`,
    previewUrl: URL.createObjectURL(blob)
  };
}

/**
 * Resizes an image to specified width and height
 */
export async function resizeImage(file, targetWidth, targetHeight, options = {}) {
  const { keepAspectRatio = true, quality = 0.92 } = options;
  const img = await loadImage(file);
  const origW = img.naturalWidth || img.width;
  const origH = img.naturalHeight || img.height;

  let finalW = parseInt(targetWidth, 10) || origW;
  let finalH = parseInt(targetHeight, 10) || origH;

  if (keepAspectRatio) {
    if (targetWidth && !targetHeight) {
      finalH = Math.round((finalW / origW) * origH);
    } else if (targetHeight && !targetWidth) {
      finalW = Math.round((finalH / origH) * origW);
    } else if (targetWidth && targetHeight) {
      const ratio = Math.min(targetWidth / origW, targetHeight / origH);
      finalW = Math.round(origW * ratio);
      finalH = Math.round(origH * ratio);
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = finalW;
  canvas.height = finalH;
  const ctx = canvas.getContext('2d');

  const mime = file.type || 'image/jpeg';
  if (mime === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, finalW, finalH);
  }
  ctx.drawImage(img, 0, 0, finalW, finalH);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Resize failed.'))),
      mime,
      quality
    );
  });

  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const ext = file.name.includes('.') ? '.' + file.name.split('.').pop() : '.jpg';

  return {
    blob,
    size: blob.size,
    name: `${baseName}-${finalW}x${finalH}${ext}`,
    width: finalW,
    height: finalH,
    previewUrl: URL.createObjectURL(blob)
  };
}

/**
 * Rotates an image by 90, 180, or 270 degrees
 */
export async function rotateImage(file, degrees = 90, quality = 0.92) {
  const img = await loadImage(file);
  const rad = (degrees * Math.PI) / 180;
  const isPerpendicular = degrees === 90 || degrees === 270;

  const canvas = document.createElement('canvas');
  canvas.width = isPerpendicular ? img.naturalHeight || img.height : img.naturalWidth || img.width;
  canvas.height = isPerpendicular ? img.naturalWidth || img.width : img.naturalHeight || img.height;

  const ctx = canvas.getContext('2d');
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rad);
  ctx.drawImage(
    img,
    -(img.naturalWidth || img.width) / 2,
    -(img.naturalHeight || img.height) / 2
  );

  const mime = file.type || 'image/jpeg';
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Rotate failed.'))),
      mime,
      quality
    );
  });

  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const ext = file.name.includes('.') ? '.' + file.name.split('.').pop() : '.jpg';

  return {
    blob,
    size: blob.size,
    name: `${baseName}-rotated${ext}`,
    width: canvas.width,
    height: canvas.height,
    previewUrl: URL.createObjectURL(blob)
  };
}

