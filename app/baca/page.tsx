import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { DataTable } from '@/components/admin/data-table'
import { client } from '@/sanity/lib/client'
import { IArticleCard } from './interface'
import { columns } from './columns'
import { Metadata } from 'next'
import PageTransition from '@/components/PageTransition'
import SocialMedia from '@/components/SocialMedia'
import Recommendation from '@/components/Recommendation'
import { shuffle } from "@/components/functions/shuffle"

async function getData(){
  try {
    const query = `
      *[_type == "post"] | order(_createdAt desc) {
        _id,    
        title,
        "slug": slug.current,
        publishedAt,
        "author": author-> {
          name,
          "imageUrl": image.asset->url
        },
        "category": categories[0]->title,
        "imagePost": mainImage.asset->url,
        "body": body[].children[0].text
    }
    `
    // @ts-ignore
    const data = await client.fetch(query, { cache: 'no-store' })
  
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

async function getDataRand() {
  try {
    const query = `
      *[_type == "post"] | order(_createdAt desc) {
        _id,    
        title,
        "slug": slug.current,
        "category": categories[0]->title,
    }
    `
    // @ts-ignore
    const data = await client.fetch(query, { cache: 'no-store' })
  
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'Baca',
  description: 'Temukan kisah sosok teladan, hikmah, dan kegiatan Forum Pelayan Quran.',
}

async function KegiatanPage() {
  const data: IArticleCard[] = await getData()
  const dataRand: any = await getDataRand()
  const rand = shuffle(dataRand).slice(0, 4)

  return (
    <>
      <Navbar />
      <PageTransition>
      <div className='max-w-7xl min-h-dvh pt-20 pb-8 m-auto px-2'>
        <h2 className={'text-left text-3xl font-bold text-cyan-600 p-2'}>Baca Artikel</h2>
        <p className='text-left text-sm text-gray-500 px-2 pb-8'>Temukan kisah sosok teladan, hikmah, dan kegiatan Forum Pelayan Quran.</p>
        <div className='grid grid-cols-6 gap-2'>
          <div className='col-span-6 lg:col-span-4'>
            <DataTable columns={columns} data={data} usage='artikel' />
          </div>
          <div className='hidden lg:flex lg:col-span-2 lg:flex-col lg:items-center'>
            <h2 className='font-semibold'>Rekomendasi</h2>
            <div className='w-full m-6'>
              <Recommendation data={rand} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <SocialMedia />
      </PageTransition>
    </>
  )
}

export default KegiatanPage