import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import Image from 'next/image';

const year = new Date().getFullYear()

function Footer() {
  return (
    <div className="w-full bg-cyan-500">
        <div className="flex flex-col justify-between items-center max-w-7xl px-4 py-10 mx-auto text-sky-100">
            <div className='grid grid-cols-1 md:grid-cols-3 w-full gap-4'>
                <div className='px-4'>
                    <h1 className='text-xl font-semibold mb-2'>Kontak</h1>
                    <hr className='w-16' />
                    <div className='flex gap-4 my-4'>
                        <MapPin size={24}  />
                        <p className='w-full text-sm hover:underline'><a href="https://maps.app.goo.gl/778hZLUwdGsNSF9s9">Jl. Raya Vila Inti Persada No.21A blok. A3, RT.01/RW.19, Pamulang Tim., Kec. Pamulang, Kota Tangerang Selatan, Banten 15417.</a></p>
                    </div>
                    <div className='flex gap-4 my-4'>
                        <Phone size={24} />
                        <p className='w-full text-sm'>{'(021)7446365'}</p>
                    </div>
                    <div className='flex gap-4 my-4'>
                        <Mail size={24} />
                        <p className='w-full text-sm hover:underline'><a href="mailto:pelayanquranmulia@gmail.com">pelayanquranmulia@gmail.com</a></p>
                    </div>
                </div>
                <div></div>
                <div className='px-4'>
                    <h1 className='text-xl font-semibold mb-2'>Sosial Media</h1>
                    <hr className='w-16' />
                    <div className='flex gap-4 my-4'>
                        <Image src={'/whatsapp-logo.png'} width={24} height={0} alt='' />
                        <p className='w-full text-sm hover:underline'><a href="https://wa.me/6281399910165">081399910165</a></p>
                    </div>
                    <div className='flex gap-4 my-4'>
                        <Facebook size={24} />
                        <p className='w-full text-sm hover:underline'><a href="https://www.facebook.com/Forum-Pelayan-Al-Quran-FPQ-جمعية-خدام-القران-100066982701914/">{'Forum Pelayan Al-Qur\'an (FPQ)'}</a></p>
                    </div>
                    <div className='flex gap-4 my-4'>
                        <Instagram size={24} />
                        <p className='w-full text-sm hover:underline'><a href="https://www.instagram.com/pelayanquran/">@pelayanquran</a></p>
                    </div>
                    <div className='flex gap-4 my-4'>
                        <Youtube size={24} />
                        <p className='w-full text-sm hover:underline'><a href="https://www.youtube.com/@pelayanquran">Pelayan Quran</a></p>
                    </div>
                </div>
            </div>
            <p className="flex justify-center w-full text-sm mt-6 mb-2">&copy; Pelayan Quran { year }. All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer