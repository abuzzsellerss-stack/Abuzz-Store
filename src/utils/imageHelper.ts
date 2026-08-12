/**
 * imageHelper.ts
 * Helper utility to standardize all product image URLs to the permanent cdn.abuzz.store CDN
 * and handle image load fallbacks gracefully.
 */

export const CDN_BASE_URL = 'https://cdn.abuzz.store/products';

export function formatImageUrl(url?: string): string {
  if (!url || typeof url !== 'string') {
    return `${CDN_BASE_URL}/ABBPS10_img1.jpg`;
  }

  let cleaned = url.trim();

  // If already absolute URL pointing to CDN
  if (cleaned.startsWith('https://cdn.abuzz.store/products/')) {
    if (cleaned.toLowerCase().endsWith('.png')) {
      return cleaned.replace(/\.png$/i, '.jpg');
    }
    return cleaned;
  }

  // Convert all old domain/local patterns to cdn.abuzz.store
  cleaned = cleaned.replace(/^https:\/\/abuzz\.store\/images\/products\//i, `${CDN_BASE_URL}/`);
  cleaned = cleaned.replace(/^https:\/\/abuzz\.store\/products\//i, `${CDN_BASE_URL}/`);
  cleaned = cleaned.replace(/^\/images\/products\//i, `${CDN_BASE_URL}/`);
  cleaned = cleaned.replace(/^\/products\//i, `${CDN_BASE_URL}/`);

  // If it's a relative path starting with / (e.g. /images/...)
  if (cleaned.startsWith('/')) {
    const filename = cleaned.split('/').pop() || '';
    cleaned = `${CDN_BASE_URL}/${filename}`;
  }

  // If it's just a raw filename (e.g. "AZ-TCT-12_img1.jpg")
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = `${CDN_BASE_URL}/${cleaned}`;
  }

  // All PNGs were compressed to JPG on Hostinger
  if (cleaned.toLowerCase().endsWith('.png')) {
    cleaned = cleaned.replace(/\.png$/i, '.jpg');
  }

  return cleaned;
}

/**
 * Automatically inspects browser CacheStorage and deletes outdated image caches
 * to free up memory and storage space.
 */
export async function clearOldImageCaches(): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) return;

  const currentAllowedCaches = ['abuzz-store-static-v2', 'abuzz-store-images-v2'];

  try {
    const keys = await window.caches.keys();
    for (const key of keys) {
      if (!currentAllowedCaches.includes(key) && (key.includes('abuzz-store') || key.includes('image'))) {
        console.log(`[Auto-Delete] Purging legacy image cache bucket: ${key}`);
        await window.caches.delete(key);
      }
    }
  } catch (err) {
    console.warn('[Cache Cleanup Warning]:', err);
  }
}

