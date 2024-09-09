import Navbar from '@/components/Navbar'
import LandingPage from '@/components/LandingPage'
import PenyaluranDonasi from '@/components/PenyaluranDonasi'
import Testimonial from '@/components/Testimonial'
import SocialMedia from '@/components/SocialMedia'
import Footer from '@/components/Footer'
import Aktivitas from '@/components/Aktivitas'
import GaleriKegiatan from '@/components/GaleriKegiatan'
import type { Metadata } from 'next'
import PageTransition from '@/components/PageTransition'
 
export const metadata: Metadata = {
  title: 'Beranda - Pelayan Quran',
  description: 'Wakaf Al Quran untuk disalurkan ke lembaga pendidikan Quran. Temukan informasi lebih lanjut untuk berkontribusi.',
}

export default function Home() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <LandingPage />
        <Aktivitas />
        <PenyaluranDonasi />
        <Testimonial />
        <GaleriKegiatan />
        <Footer />  
        <SocialMedia />
      </PageTransition>
    </>
  )
}
