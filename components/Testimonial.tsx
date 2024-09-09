import { CarouselAuto } from "./CarouselAuto"
import SectionDescription from "./SectionDescription"

function Testimonial() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center py-6 justify-evenly bg-gradient-to-br from-cyan-500 from-60% to-teal-400 md:-translate-y-0">
        <h1 className='text-center text-4xl md:text-4xl font-bold text-sky-100'>Testimoni</h1>
        <SectionDescription>
            <p className='text-center text-sm md:text-base mt-4 text-sky-50 max-w-2xl'>Dengarkan cerita mereka tentang layanan kami yang telah memberikan manfaat dalam penyaluran wakaf Al-Quran.</p>
        </SectionDescription>
        <div className="flex justify-between items-center w-full max-w-7xl px-4 py-6 mx-auto ">
            <CarouselAuto />
        </div>
    </div>
  )
}

export default Testimonial