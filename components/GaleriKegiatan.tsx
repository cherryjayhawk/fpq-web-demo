import ThumbnailSlider from '@/components/ThumbnailSlider'
import SectionDescription from './SectionDescription'

function GaleriKegiatan() {
  return (
    <div className="max-w-7xl h-full m-auto">
      <div className='flex flex-col justify-center items-center '>
          <h1 className='text-center py-6 text-4xl md:text-4xl font-bold text-cyan-600'>Galeri Kegiatan</h1>
          <SectionDescription>
            <p className='text-center text-sm md:text-base text-gray-500 max-w-2xl'>Jelajahi galeri kegiatan kami pada momen-momen dalam menyebarkan Al-Quran kepada mereka yang membutuhkan.</p>
          </SectionDescription>
      </div>
        <ThumbnailSlider />
    </div>
  )
}

export default GaleriKegiatan