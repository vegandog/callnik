import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/dashboard/', '/settings/', '/setup/', '/calls/'] },
    ],
    sitemap: 'https://callnik.com/sitemap.xml',
  }
}
