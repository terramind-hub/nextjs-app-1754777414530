import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'
import CartProvider from '@/components/CartProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Terramind Store - Premium Ecommerce Experience',
  description: 'Discover premium products with seamless shopping experience. Fast delivery, secure payments, and exceptional customer service.',
  keywords: 'ecommerce, online shopping, premium products, fast delivery',
  authors: [{ name: 'Terramind' }],
  creator: 'Terramind',
  publisher: 'Terramind',
  openGraph: {
    title: 'Terramind Store - Premium Ecommerce Experience',
    description: 'Discover premium products with seamless shopping experience',
    type: 'website',
    locale: 'en_US',
    siteName: 'Terramind Store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terramind Store - Premium Ecommerce Experience',
    description: 'Discover premium products with seamless shopping experience',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-background">
              {children}
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}