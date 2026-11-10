import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://callnik.com'

  // Static pages — date = last git commit that touched the file
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                        lastModified: new Date('2026-10-25'), priority: 1   },
    { url: `${base}/pricing`,           lastModified: new Date('2026-10-25'), priority: 0.8 },
    { url: `${base}/how-it-works`,      lastModified: new Date('2026-10-25'), priority: 0.8 },
    { url: `${base}/faq`,               lastModified: new Date('2026-11-10'), priority: 0.6 },
    { url: `${base}/about`,             lastModified: new Date('2026-08-26'), priority: 0.5 },
    { url: `${base}/landing`,           lastModified: new Date('2026-11-09'), priority: 0.8 },
    { url: `${base}/blog`,              lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/terms`,             lastModified: new Date('2026-10-25'), priority: 0.3 },
    { url: `${base}/privacy`,           lastModified: new Date('2026-10-25'), priority: 0.3 },
    { url: `${base}/accessibility`,     lastModified: new Date('2026-09-22'), priority: 0.3 },
  ]

  // Blog posts — date = git commit that first created the file
  const blogPosts: MetadataRoute.Sitemap = [
    // 2026-10-29 — first batch
    { url: `${base}/blog/mazkirah-ai-asak-katan`,           lastModified: new Date('2026-10-29'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-orekh-din`,            lastModified: new Date('2026-10-29'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-rofeh`,                lastModified: new Date('2026-10-29'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-vs-mazkirah-enoshit`,  lastModified: new Date('2026-10-29'), priority: 0.7 },
    { url: `${base}/blog/shiot-shelo-naanu`,                lastModified: new Date('2026-10-29'), priority: 0.7 },
    // 2026-11-10 00:55 — second batch
    { url: `${base}/blog/mazkirah-ai-hashmal`,              lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-instaklator`,          lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-koach`,                lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-misparot`,             lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-naturopath`,           lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-pilates`,              lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-psikholog`,            lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-ro-heshbon`,           lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-rofe-shinyaim`,        lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-veterninar`,           lastModified: new Date('2026-11-10'), priority: 0.7 },
    // 2026-11-10 19:54 — third batch
    { url: `${base}/blog/mazkirah-ai-achazan`,              lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-morekh-sport`,         lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-nagar`,                lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-optika`,               lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-tzalam`,               lastModified: new Date('2026-11-10'), priority: 0.7 },
    // 2026-11-10 20:54
    { url: `${base}/blog/mazkirah-ai-ganan`,                lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-kosmait`,              lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-madrich-tiyulim`,      lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-moran-nehiga`,         lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-shiputznik`,           lastModified: new Date('2026-11-10'), priority: 0.7 },
    // 2026-11-10 20:56
    { url: `${base}/blog/mazkirah-ai-dietitanit`,           lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-meamenet-klavim`,      lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-merapeh-shnayim`,      lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-muzika-limudim`,       lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-photographer-b2b`,     lastModified: new Date('2026-11-10'), priority: 0.7 },
    // 2026-11-10 21:07
    { url: `${base}/blog/mazkirah-ai-askanim-refahiyim`,    lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-mazgan`,               lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-plumber-shravrav`,     lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-rehev-tushat`,         lastModified: new Date('2026-11-10'), priority: 0.7 },
    // 2026-11-10 21:09
    { url: `${base}/blog/mazkirah-ai-achizan-binyan`,       lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-afut-kadur-shel`,      lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-madricha-yoga`,        lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-mazkirah-mazkirut`,    lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-tour-guide-english`,   lastModified: new Date('2026-11-10'), priority: 0.7 },
    // 2026-11-10 21:11
    { url: `${base}/blog/mazkirah-ai-mazkirah-bi-english`,  lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-mishpat-gisha`,        lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-pysio-sport`,          lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-rehev-achizan`,        lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-seret-dvash`,          lastModified: new Date('2026-11-10'), priority: 0.7 },
    // 2026-11-10 21:15
    { url: `${base}/blog/mazkirah-ai-achiyan-sport-futsal`, lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-askanim-mishpatiyim`,  lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-mazkirah-refu-sport`,  lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-rof-kelev-vehavayot`,  lastModified: new Date('2026-11-10'), priority: 0.7 },
    { url: `${base}/blog/mazkirah-ai-shamai-itzuv`,         lastModified: new Date('2026-11-10'), priority: 0.7 },
    // mazkirah-ai-mazkirah-refa-mitabeket — added in batch 6 (21:07)
    { url: `${base}/blog/mazkirah-ai-mazkirah-refa-mitabeket`, lastModified: new Date('2026-11-10'), priority: 0.7 },
  ]

  return [...staticPages, ...blogPosts]
}
