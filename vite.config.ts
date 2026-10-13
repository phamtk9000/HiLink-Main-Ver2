import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// robots.txt and sitemap.xml, written into dist at build time. SITE_URL is the
// public origin of this site (set it in Vercel when the final domain is live).
const SITE_URL = (process.env.SITE_URL || 'https://hi-link-main-ver2.vercel.app').replace(/\/$/, '')
const PAGES = [
  '', '/about', '/solutions', '/workspace-leasing', '/workspace/quarter-house', '/property-management',
  '/concierge-services', '/business-services', '/industrial-logistics', '/business-club', '/partners', '/careers', '/news',
  '/contact', '/privacy-policy', '/terms',
]
function seoFiles() {
  return {
    name: 'hilink-seo-files',
    apply: 'build' as const,
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const url = (lang: string, p: string) => `${SITE_URL}/${lang}${p}`
      const entries = PAGES.flatMap((p) => ['en', 'vi'].map((lang) => `  <url>
    <loc>${url(lang, p)}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${url('en', p)}"/>
    <xhtml:link rel="alternate" hreflang="vi" href="${url('vi', p)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', p)}"/>
  </url>`)).join('\n')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
` })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
` })
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    seoFiles(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Long-lived vendor chunks: they change far less often than the pages, so
  // returning visitors keep them cached across deploys.
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router'],
          motion: ['motion/react'],
          gsap: ['gsap', 'gsap/ScrollTrigger', 'gsap/SplitText', 'lenis'],
        },
      },
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.avif', '**/*.webp'],
})
