import Link from 'next/link'
import CounterAnimation from './CounterAnimation'
import SectionDescription from './SectionDescription'
import { Button } from './ui/button'
import { ArrowUpRight } from 'lucide-react'

function PenyaluranDonasi() {
  return (
    <div className="flex flex-col items-center w-full max-w-7xl px-4 py-6 mx-auto">
        <h1 className='text-center text-4xl md:text-4xl font-bold text-cyan-600'>Penyaluran Donasi</h1>
        <SectionDescription>
            <p className='text-center text-sm md:text-base my-8 text-gray-500 max-w-2xl'>Forum Pelayan Al-Quran sejak tahun 2011 hingga saat ini telah menerbitkan dan mendistribusikan kurang lebih satu juta Mushaf Al-Quran ke seluruh pelosok negeri.</p>
        </SectionDescription>
        <div className='my-16 w-full flex flex-wrap justify-around gap-10 md:gap-8'>
            <div className='flex justify-center items-center md:h-96 w-96 rounded-full md:bg-blue-100'>
                <div>
                <span className='flex gap-2 w-full justify-center text-4xl font-bold text-cyan-500'><CounterAnimation number={1000000} />  +</span> 
                    <p className='text-center text-lg font-semibold text-gray-700 py-2 max-w-xs'>Total Mushaf Al-Quran yang telah tersalurkan</p>
                </div>
            </div>
            <div className='flex justify-center items-center md:h-96 w-96 rounded-full md:bg-blue-100'>
                <div>
                <span className='flex gap-2 w-full justify-center text-4xl font-bold text-cyan-500'><CounterAnimation number={500} />  +</span> 
                    <p className='text-center text-lg font-semibold text-gray-700 py-2 max-w-xs'>Total Pesantren dan Lembaga Tahfidz yang telah mendapat bantuan</p>
                </div>
            </div>
            <div className='flex justify-center items-center md:h-96 w-96 rounded-full md:bg-blue-100'>
                <div>
                <span className='flex gap-2 w-full justify-center text-4xl font-bold text-cyan-500'><CounterAnimation number={200} />  +</span> 
                    <p className='text-center text-lg font-semibold text-gray-700 py-2 max-w-xs'>Total Pengajar Al-Quran yang sudah menerima bantuan di seluruh Indonesia</p>
                </div>
            </div>
        </div>
        <div className='flex justify-center items-center w-96'>
        <Link href={'/penyaluran'}>
          <Button className="bg-lime-500 rounded-full border-2 hover:text-lime-500 hover:bg-sky-50 hover:border-lime-500 duration-300">Penyaluran<ArrowUpRight className="scale-90" /></Button>
        </Link>
        </div>
    </div>
  )
}

export default PenyaluranDonasi