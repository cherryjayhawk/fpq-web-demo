import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['200','400', '500', '600', '700'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: "Pelayan Quran",
    template: '%s - Pelayan Quran'
  },
  alternates: {
    canonical: "https://www.pelayanquran.id/",
    languages: {
      "id-ID": 'https://www.pelayanquran.id/'
    }
  },
  openGraph: {
    title: "Pelayan Quran",
    description: "Wakaf Al Quran untuk lembaga pendidikan Quran. Temukan informasi lebih lanjut untuk berkontribusi."
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-slate-50 text-slate-900`}>{children}</body>
    </html>
  )
}
