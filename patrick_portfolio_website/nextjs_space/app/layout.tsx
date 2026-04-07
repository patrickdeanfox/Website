import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'Patrick Fox | Analytics Implementation Manager',
  description: 'Full-Stack BI Developer & AI Integration Specialist with 13+ years of experience. Explore my portfolio of analytics implementations, data engineering projects, and AI solutions.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Patrick Fox | Analytics Implementation Manager',
    description: 'Full-Stack BI Developer & AI Integration Specialist',
    images: ['/og-image.png'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={`${inter.className} bg-slate-950 text-white antialiased`}>
        <div data-hydration-error style={{display: 'none !important'}}></div>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
