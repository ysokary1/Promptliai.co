import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { getSiteSettings } from '@/lib/data'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings()

    if (settings) {
      return {
        title: settings.title,
        description: settings.description,
        generator: 'v0.app',
      }
    }
  } catch (error) {
    console.log('Using fallback metadata')
  }

  // Fallback metadata
  return {
    title: 'Promptli Ai | Never Miss a Lead, Never Miss a Buyer',
    description: 'Transform your business with AI-powered automation, chatbots, and intelligent solutions that work 24/7',
    generator: 'v0.app',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
