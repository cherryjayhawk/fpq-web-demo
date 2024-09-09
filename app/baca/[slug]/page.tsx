import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { client } from '@/sanity/lib/client'
import { Metadata } from 'next'
import PageTransition from '@/components/PageTransition'
import SocialMedia from '@/components/SocialMedia'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import { dateFormatter } from '@/components/functions/dateFormat'
import Recommendation from '@/components/Recommendation'
import { shuffle } from "@/components/functions/shuffle"

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
    console.error(error)
    return []
  }
}

async function getData(slug: string){
  const query = `
    *[_type == "post" && slug.current == "${slug}"] | order(_createdAt desc) {  
      title,
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

  return data[0]
}

export async function generateMetadata({ params }: { params: { slug: string } } ): Promise<Metadata> {
  const slug = params.slug;
  const article = await getData(slug);

  return {
    title: `${article.title}`,
    description: article.body[0],
    openGraph: {
      images: article.imagePost || "/fpq-logo.png",
      title: article.title,
      description: article.body[0],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug)
  const dataRand: any = await getDataRand()
  const rand = shuffle(dataRand).slice(0, 4)

  return (
    <>
        <Navbar />
        <PageTransition>
            <div className='max-w-7xl min-h-dvh pt-20 pb-8 m-auto px-2'>
                <div className='grid grid-cols-6 gap-2'>
                    <div className='col-span-6 lg:col-span-4 px-4'>
                        <h2 className={'text-left text-xl md:text-3xl font-bold text-cyan-600 px-2 pt-8 pb-4'}>{ data.title }</h2>
                        <div className='flex items-center gap-4 mb-4'>
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src={data.author.imageUrl} alt='Forum Pelayan Quran' />
                                <AvatarFallback>FPQ</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col gap-2'>
                                <span className='text-sm'>by <span className='font-medium'>{ data.author.name }</span></span>
                                <div className='text-xs flex items-center gap-2'>
                                  <span className='font-medium'>{ dateFormatter(data.publishedAt, '') }</span>
                                  <span>/</span>
                                  <span className='uppercase font-bold text-cyan-500'>{ data.category }</span>
                              </div>  
                            </div>
                        </div>
                        <Image src={data.imagePost} alt='' className='w-full my-2 mb-4' width={720} height={0} />
                        {
                          data.body.map((p: string) => {
                            return (
                              <div key={p}>
                                <p className='text-justify'>{ p }</p> <br />
                              </div>
                              )
                          })
                        }
                    </div>
                    <div className='hidden mt-24 lg:flex lg:col-span-2 lg:flex-col lg:items-center'>
                      <h2 className='font-semibold'>Rekomendasi</h2>
                      <div className='w-full my-6 px-6'>
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