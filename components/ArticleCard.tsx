import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { dateFormatter } from '@/components/functions/dateFormat'
import Link from 'next/link'
import { IArticleCard } from '@/app/baca/interface'

function ArticleCard({ data }: { data: IArticleCard}) {
    // console.log(data)
    return (
    <Link href={`/baca/${data?.slug}`} >
        <div className='flex items-start rounded w-full p-4 hover:bg-gray-200'>
            <div className='pr-8 w-full'>
                <div className='flex items-center gap-4 mb-2'>
                    <Avatar className='w-8 h-8'>
                        <AvatarImage src={data?.author?.imageUrl} alt='Forum Pelayan Quran' />
                        <AvatarFallback>FPQ</AvatarFallback>
                    </Avatar>
                    <span className='text-sm'>by <span className='font-medium'>{ data?.author?.name }</span></span>
                </div>
                <h3 className='text-sm md:text-xl font-semibold line-clamp-2 mb-3'>{ data?.title }</h3>
                <p className='text-xs md:text-sm my-2 max-w-96 line-clamp-3 mb-3'>{ data?.body[0] }</p>
                <div className='text-xs flex items-center gap-2'>
                    <span className='font-medium'>{ dateFormatter(data?.publishedAt, '') }</span>
                    <span>/</span>
                    <span className='uppercase font-medium text-cyan-600'>{ data?.category }</span>
                </div>  
            </div>
            <Image src={data?.imagePost} alt={data?.slug} className='aspect-[4/3] w-36 sm:w-40 md:w-48 lg:w-60 my-2' width={240} height={180} />
        </div>
    </Link>
  )
}

export default ArticleCard