import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import './polish.css'
import './editorial.css'
import './horizontal-work.css'
import './motion.css'
import './developer.css'
import '@/components/text/BlurText.css'
import '@/components/ui/motion-footer.css'
const spaceGrotesk = localFont({ src: './fonts/Space_Grotesk.woff2', variable: '--font-space-grotesk', display: 'swap', weight: '300 700' })
const jetbrainsMono = localFont({ src: './fonts/JetBrains_Mono.woff2', variable: '--font-jetbrains-mono', display: 'swap', weight: '400 600' })
const syne = localFont({ src: './fonts/Syne.woff2', variable: '--font-syne', display: 'swap', weight: '400 800' })

export const metadata: Metadata = {
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icon.svg` },
  title: 'Akshay Wesley — AI × Software Engineer',
  description: 'Building intelligent systems, products, and experiences. AI/ML, Full-stack development, Backend engineering, RAG/NLP/CV, Developer tools, Interactive products.',
  keywords: ['AI', 'Machine Learning', 'Software Engineering', 'Full-stack', 'Backend', 'RAG', 'NLP', 'Computer Vision', 'Developer Tools'],
  authors: [{ name: 'Akshay Wesley' }],
  creator: 'Akshay Wesley',
  publisher: 'Akshay Wesley',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://akshaywesley.dev',
    title: 'Akshay Wesley — AI × Software Engineer',
    description: 'Building intelligent systems, products, and experiences.',
    siteName: 'Akshay Wesley Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akshay Wesley — AI × Software Engineer',
    description: 'Building intelligent systems, products, and experiences.',
  },
}

export const viewport: Viewport = {
  themeColor: '#08090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${syne.variable}`}>
      <body className="min-h-screen">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}