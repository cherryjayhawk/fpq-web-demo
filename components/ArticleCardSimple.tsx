import Image from 'next/image'
import { dateFormatter } from '@/components/functions/dateFormat'
import Link from 'next/link'
import { IArticleCard } from '@/app/baca/interface'

function ArticleCardSimple({ data }: { data: IArticleCard }) {
    return (
    <Link href={`/baca/${data.slug}`} >
    <div className={`flex items-start px-2 py-1 sm:p-2 col-span-1 lg:col-auto gap-4 bg-sky-100 hover:bg-slate-50 hover:scale-[1.01] duration-200`}>
        <Image src={data.imagePost} alt='' className='aspect-video w-24 md:w-28 lg:w-36 my-2' width={240} height={180} />
        <div className='flex flex-col justify-between w-full h-full'>
            <h3 className='text-sm md:text-base font-semibold'>{ data.title }</h3>
            <div className='text-xs flex items-center gap-2'>
                <span className='font-medium'>{ dateFormatter(data.publishedAt, '') }</span>
                <span>/</span>
                <span className='uppercase font-medium text-cyan-600'>{ data.category }</span>
            </div>  
        </div>
    </div>
    </Link>
  )
}

export default ArticleCardSimple