import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Lue & Perez — B2B Export • Consolidation • Sourcing • Manufacturing',
  description: 'Trinidad & Tobago–based B2B export partner for Caribbean foods. Export logistics, consolidation, sourcing, manufacturing, and compliance.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
