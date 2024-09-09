import { Metadata } from "next"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Lusitana } from "next/font/google"
import { UserAuthForm } from "@/components/admin/auth-form"

export const metadata: Metadata = {
  title: "Masuk Admin",
  description: "Halaman masuk admin panel pelayan quran.",
}

const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400"],
});

const year = new Date().getFullYear()

export default function SignIn() {
  return (
    <>
      <div className="min-h-dvh container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute font-semibold hover:text-cyan-500 right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Beranda
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-8 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="flex items-center">
            <Image src={'/fpq-logo.png'} width={48} height={48} alt="Logo Forum Pelayan Quran" className="z-10" />
            <div className="flex items-end h-[40px]">
              <h1 className={`${lusitana.className} text-lg md:text-xl text-cyan-900 z-10`}>
                  PELAYAN<span className="text-cyan-500">QURAN</span>
              </h1>
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2 text-xs">
              &copy; Pelayan Quran { year }. All Rights Reserved.
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-xl font-semibold tracking-tight">
                Masuk sebagai Admin
              </h1>
              <p className="text-sm text-muted-foreground">
                Masukkan email dan password anda pada form di bawah ini
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}
