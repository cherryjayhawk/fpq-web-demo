'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Lusitana } from "next/font/google"
import { cn } from "@/lib/utils"
import SignOutButton from "@/components/SignOutButton"
import Image from "next/image"
import { ScrollText } from "lucide-react"

const lusitana = Lusitana({
    subsets: ["latin"],
    weight: ["400"],
  });

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
    const path = usePathname()

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center">
        <Image src={'/fpq-logo.png'} width={48} height={48} alt="Logo Forum Pelayan Quran" className="z-40" />
        <div className="flex items-end">
          <h1 className={`${lusitana.className} text-xl md:text-2xl text-cyan-900 z-40`}>
              PELAYAN<span className="text-cyan-500">QURAN</span>
          </h1>
        </div>
      </div>
      <div className="flex h-full items-center">
        <SignOutButton />
      </div>
    </div>
  )
}