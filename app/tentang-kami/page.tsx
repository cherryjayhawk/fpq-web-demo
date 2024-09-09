import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import AboutUsTabs from '@/components/AboutUsTabs'
import PageTransition from '@/components/PageTransition'
import SocialMedia from '@/components/SocialMedia'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Ajukan pesantren dan pengajar tujuan, serta temukan informasi seputar FPQ.',
}

function TentangKamiPage() {
  return (
    <>
        <Navbar />
        <PageTransition>
          <div className='max-w-7xl min-h-dvh pt-20 pb-8 m-auto px-2'>
              <h1 className='text-left text-3xl font-bold text-cyan-600 p-2'>Tentang Kami</h1>
              <p className='text-left text-sm text-gray-500 px-2 pb-8'>Temukan informasi seputar FPQ serta cara mengajukan pesantren dan pengajar tujuan.</p>
              <AboutUsTabs />
          </div>
          <Footer />
          <SocialMedia />
        </PageTransition>
    </>
  )
}

export default TentangKamiPage