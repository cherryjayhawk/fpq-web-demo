import Navbar from '@/components/Navbar'
import { DataTable } from '@/components/admin/data-table'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import type { Metadata } from 'next'
import { columns } from './columns'
import SocialMedia from '@/components/SocialMedia'

export const metadata: Metadata = {
  title: 'Penyaluran Wakaf',
  description: 'Temukan riwayat lengkap penyaluran wakaf Al-Quran yang telah kami terima.',
}

async function getData() {
  try {
    const res = await fetch(`${process.env.WEBSERVICE_URL}invoices`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "X-API-KEY": `${process.env.API_KEY}`,
      },
      next: { revalidate: 5 },
    })
    
    if (!res.ok) {
      return { data: []}
    }
    
    return res.json()
  } catch (error) {
    console.error(error)
    return { data: []}
  }
}

async function Penyaluran() {
  const data: any = await getData()

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className='max-w-7xl min-h-dvh pt-20 pb-8 m-auto px-2'>
          <h1 className='text-left text-3xl font-bold text-cyan-600 p-2'>Riwayat Penyaluran</h1>
          <p className='text-left text-sm text-gray-500 px-2 pb-8'>Temukan riwayat lengkap penyaluran wakaf Al-Quran yang telah kami terima. </p>
          <DataTable columns={columns} data={data.data} usage='penyaluran' className='overflow-x-scroll' />
        </div>
        <Footer />
        <SocialMedia />
      </PageTransition>
    </>
  )
}

export default Penyaluran