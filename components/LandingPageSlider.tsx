'use client'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// @ts-ignore
import { Thumbs, Autoplay } from "swiper"
import Image from 'next/image'
import slide1 from "@/public/landingpage1.jpg"
import slide2 from "@/public/landingpage2.jpg"
import slide3 from "@/public/landingpage3.jpg"
import "swiper/css"

function LandingPageSlider() {
    const [thumbSwiper, setThumbSwiper] = useState()

  return (
    <Swiper
    // @ts-ignore
      style={{"--swiper-navigation-color": "#fff"}}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      spaceBetween={10}
      thumbs={{ swiper: thumbSwiper }}
      navigation={true}
      modules={[Autoplay, Thumbs]}
      className=''
    >
      <SwiperSlide>
        <Image src={slide1} alt="" className="object-cover h-dvh opacity-40" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={slide2} alt="" className="object-cover h-dvh opacity-40" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={slide3} alt="" className="object-cover h-dvh opacity-40" />
      </SwiperSlide>
    </Swiper>
  )
}

export default LandingPageSlider