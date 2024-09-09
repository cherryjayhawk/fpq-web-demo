'use client'
import Link from 'next/link'

function Recommendation(data: any) {
  let count = 0;

  return (
    <>
        {
          data.data.length > 0 ? data.data.map((post: any) => {
            count++
            return (
              <div key={post._id}>
                <Link href={`/baca/${post.slug}`}>
                  <div className='flex gap-4 hover:bg-gray-200 p-2 rounded'>
                    <div className='aspect-square text-lg font-semibold text-white bg-cyan-400 rounded-full flex justify-center items-center w-12'>0{count}</div>
                    <div className='flex flex-col'>
                      <div className='font-semibold text-sm line-clamp-1'>{post.title}</div>
                      <div className='text-sm line-clamp-1 text-cyan-600'>{post.category}</div>
                    </div>
                  </div>
                </Link>
                <hr className='my-1' />
              </div>
            )
          }) : (
            <div className='italic text-xs text-gray-700'>Tidak ada rekomendasi</div>
          )
        }
    </>
  )
}

export default Recommendation