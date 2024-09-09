import ArticleCardSimple from "./ArticleCardSimple"
import { IArticleCard } from "@/app/baca/interface"
import { client } from '@/sanity/lib/client'
import Link from "next/link"
import SectionDescription from "./SectionDescription"
import Video from "./Video"
import { Button } from "./ui/button"
import { ArrowUpRight } from "lucide-react"

async function getData(){
  const query = `
    *[_type == "post"] [0...4] | order(_createdAt desc) {
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
}

async function Aktivitas() {
  const data: IArticleCard[] = await getData()

  return (
    <div className="w-full flex flex-col items-center px-4 py-6 justify-evenly bg-sky-100 md:-translate-y-0">
        <h2 className='text-center text-4xl md:text-4xl font-bold text-cyan-600'>Baca Artikel</h2>
        <SectionDescription>
            <p className='text-center text-sm md:text-base mt-1 md:mt-4 text-gray-500 max-w-2xl'>Temukan kisah sosok teladan, hikmah, dan kegiatan Forum Pelayan Quran.</p>
        </SectionDescription>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-7xl my-4 md:my-12 mx-auto w-full">
          <Video />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col lg:col-span-2">
            {
              data.map((data) => {
                return (<ArticleCardSimple data={data} key={data._id} />)
              })
            }
          </div>
        </div>
        <Link href={'/baca'}>
          <Button className="bg-lime-500 rounded-full border-2 hover:text-lime-500 hover:bg-sky-50 hover:border-lime-500 duration-300">Baca<ArrowUpRight className="scale-90" /></Button>
        </Link>
    </div>
  )
}

export default Aktivitas