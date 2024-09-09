'use client'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// @ts-ignore
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper"
import "swiper/css"

import slide1 from "@/public/slide1.webp"
import slide2 from "@/public/slide2.jpg"
import slide3 from "@/public/slide3.webp"
import slide4 from "@/public/slide4.webp"
import slide5 from "@/public/slide5.jpg"
import slide6 from "@/public/slide6.jpg"
import Image from 'next/image'

function ThumbnailSlider() {
  const [thumbSwiper, setThumbSwiper] = useState()

  return (
    <div className='p-6 z-40'>
      <Swiper
      // @ts-ignore
        style={{"--swiper-navigation-color": "#fff"}}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='flex flex-col justify-center items-center max-h-[80dvh]'
      >
        <SwiperSlide>
          <Image src={slide1} alt="" className='aspect-video w-full object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide2} alt="" className='aspect-video w-full object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide3} alt="" className='aspect-video w-full object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide4} alt="" className='aspect-video w-full object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide5} alt="" className='aspect-video w-full object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide6} alt="" className='aspect-video w-full object-cover' />
        </SwiperSlide>
      </Swiper>
      <div className='my-2' />
      <Swiper
      // @ts-ignore
        onSwiper={setThumbSwiper}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
      >
        <SwiperSlide>
          <Image src={slide1} alt="" className='aspect-[4/3]' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide2} alt="" className='aspect-[4/3]' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide3} alt="" className='aspect-[4/3]' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide4} alt="" className='aspect-[4/3]' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide5} alt="" className='aspect-[4/3]' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide6} alt="" className='aspect-[4/3]' />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default ThumbnailSlider