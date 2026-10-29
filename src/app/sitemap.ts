import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://callnik.com'
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/pricing`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/how-it-works`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/blog`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-asak-katan`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/blog/shiot-shelo-naanu`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-rofeh`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-orekh-din`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-vs-mazkirah-enoshit`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/terms`, lastModified: new Date(), priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), priority: 0.3 },
    { url: `${base}/accessibility`, lastModified: new Date(), priority: 0.3 },
  ]
}
