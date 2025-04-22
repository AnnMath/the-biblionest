import type { Metadata } from 'next'
import { Playfair_Display, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import Header from '../components/header/header'
import Footer from '@/components/footer/footer'
import { Toaster } from '@/components/ui/sonner'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  style: ['normal', 'italic'],
})

const baskerville = Libre_Baskerville({
  variable: '--font-baskerville',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'The BiblioNest',
  description:
    'A gentle place to gather your reads. Powered by open data and open hearts.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${baskerville.variable} text-text-500 font-body antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Toaster position="bottom-center" theme="light" />
      </body>
    </html>
  )
}
