/**
 * Grimoire Media — Client-side thumbnail generation using Canvas API.
 */

/**
 * Generate a thumbnail from an image file (max 200px width).
 * @param {File} file - Image file
 * @returns {Promise<string>} Base64 data URL of thumbnail
 */
export async function generateImageThumbnail(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const maxW = 200;
      const scale = maxW / img.width;
      const w = maxW;
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Detect inscription type from file MIME.
 */
export function detectFileType(file) {
  if (!file) return 'note';
  const t = file.type || '';
  if (t.startsWith('image/')) return 'photo';
  if (t.startsWith('video/')) return 'video';
  if (t.startsWith('audio/')) return 'audio';
  if (t.includes('pdf') || t.includes('document')) return 'document';
  return 'note';
}
