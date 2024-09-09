import Image from "next/image"
import DonationForm from "./DonationForm"
import landingpage from "@/public/landingpage1.jpg"

function LandingPage() {
  return (
  <>
    <div className="w-full h-full bg-gray-950">
      <Image src={landingpage} alt="landing page" className="absolute object-cover h-dvh opacity-40" />
      <div className="flex flex-col justify-evenly items-center max-w-7xl m-auto md:items-start h-dvh pt-20 md:pt-0">
        <div className="flex flex-col justify-center p-4 md:mt-20 z-20 w-full max-w-7xl md:max-w-2xl">
            <h1 className="text-4xl text-center font-bold text-sky-50 outline-8 outline-white md:text-left lg:text-6xl">Wakaf Quran <br /> <span className="my-2" /> untuk Generasi <br /> <span className="my-2" /> Qur&apos;ani</h1>
            <br />
            <p className="text-center text-sky-50 md:text-left pr-4">Forum Pelayan Quran (FPQ) mencetak dan mendistribusikan mushaf wakaf untuk para penghafal Al Quran di pesantren dan lembaga tahfidz di seluruh Indonesia.</p>
            <br />
            <div className="flex justify-center md:justify-start">
                <DonationForm />
            </div>
        </div>
        <p className="flex justify-center px-4 md:p-0 items-center text-xs md:text-sm text-center w-full max-w-xl mx-auto text-sky-50 opacity-100 z-10">
          &ldquo;Apabila anak adam (manusia) telah meninggal dunia, maka terputuslah amalnya darinya, kecuali tiga perkara, yaitu sedekah jariyah (sedekah yang pahalanya terus mengalir), ilmu yang bermanfaat, atau anak saleh yang selalu mendoakannya.&rdquo; (HR Muslim No. 1631).
        </p>
      </div>
    </div>
  </>
  )
}

export default LandingPage