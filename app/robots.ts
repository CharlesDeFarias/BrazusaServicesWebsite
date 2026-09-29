import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/ops', '/api'] }],
    sitemap: 'https://www.brazusa.com/sitemap.xml',
  }
}
