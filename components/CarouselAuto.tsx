'use client'
import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import anies from "@/public/anies.jpg"

export function CarouselAuto() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
    >
      <CarouselContent className="-ml-10 md:-ml-8">
          <CarouselItem className="pl-10 md:pl-8 basis-2/3 lg:basis-1/3">
            <div className="p-1 h-full">
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-between p-6 md:py-10 gap-4 h-full">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <Avatar className="aspect-square min-w-24 min-h-24">
                    <AvatarImage src='/anies.jpg' alt="avatar donatur" />
                    <AvatarFallback>FPQ</AvatarFallback>
                  </Avatar>
                  <p className="text-xs md:text-sm text-center text-gray-600">Insyaallah menjadi salah satu wadah kebaikan bagi umat islam dan Insyaallah menjadi wadah bagi mereka-mereka yang akan merangsang, mempelajari, dan menghafal Al-Quran dengan baik dan benar.</p>
                  <div>
                    <p className="font-semibold text-sm md:text-base text-center text-gray-700">H. Anies Rasyid Baswedan</p>
                    <p className="text-xs text-center text-gray-700">Mantan Gubernur DKI Jakarta</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="pl-10 md:pl-8 basis-2/3 lg:basis-1/3">
            <div className="p-1 h-full">
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-between p-6 md:py-10 gap-4 h-full">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <Avatar className="aspect-square min-w-24 min-h-24">
                    <AvatarImage src='/deni.jpg' alt="avatar donatur" />
                    <AvatarFallback>FPQ</AvatarFallback>
                  </Avatar>
                  <p className="text-xs md:text-sm text-center text-gray-600">Kategori penerbit Al-Quran Terinspiratif, penghargaan diberikan kepada Forum Pelayan Al-Quran, Tangerang Selatan. Penerbit terinspiratif adalah penerbit yang telah mewakafkan file master mushaf Al-Quran kepada LPMQ untuk dapat digunakan oleh seluruh penerbit Al-Quran di Indonesia.</p>
                  <div>
                    <p className="font-semibold text-sm md:text-base text-center text-gray-700">H. Deni Hudaeny Ahmad Arifin</p>
                    <p className="text-xs text-center text-gray-700">Kepala Bidang Pentashihan Kementrian Agama</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="pl-10 md:pl-8 basis-2/3 lg:basis-1/3">
            <div className="p-1 h-full">
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-between p-6 md:py-10 gap-4 h-full">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <Avatar className="aspect-square min-w-24 min-h-24">
                    <AvatarImage src='/bachtiarnasir.jpg' alt="avatar donatur" />
                    <AvatarFallback>FPQ</AvatarFallback>
                  </Avatar>
                  <p className="text-xs md:text-sm text-center text-gray-600">Selain punya mushafnya sendiri FAMY BISYAUQIN, ustadz Zarkasyi Afif juga saya kenal baik amanahnya dan perjuangannya. Maka ketika muslimin dan muslimat berwakaf di Pelayan Quran insyaallah akan sampai pada tujuannya.</p>
                  <div>
                    <p className="font-semibold text-sm md:text-base text-center text-gray-700">Ustadz Bachtiar Nasir</p>
                    <p className="text-xs text-center text-gray-700">Ulama</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="hidden lg:inline-flex" />
      <CarouselNext className="hidden lg:inline-flex" />
    </Carousel>
  )
}
