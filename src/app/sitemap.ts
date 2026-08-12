import { MetadataRoute } from 'next';
import { MOCK_PRODUCTS } from '../utils/seed';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abuzz.store';

  const productUrls = MOCK_PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    '',
    '/about',
    '/blog',
    '/cart',
    '/checkout',
    '/contact',
    '/policies/bis-certification',
    '/policies/privacy',
    '/policies/terms',
    '/policies/refunds',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.7,
  }));

  return [...staticPages, ...productUrls];
}
