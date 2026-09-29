import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.brazusa.com'
  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/clean`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/condos`, changeFrequency: 'monthly', priority: 0.9 },
  ]
}
