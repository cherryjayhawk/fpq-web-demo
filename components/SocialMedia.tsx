import Image from "next/image"

function SocialMedia() {
  return (
    <div className="flex flex-col fixed right-5 bottom-12 md:bottom-20 gap-2 z-50">
        <a href="https://wa.me/6281399910165" 
            aria-label="Hubungi kami di Whatsapp"
            title="Hubungi kami di Whatsapp"
            className="flex justify-center items-center bg-sky-100 border-2 rounded-full cursor-pointer border-lime-500">
            <Image src={'/whatsapp.png'} width={28} height={28} alt="" />
        </a>
    </div>
  )
}

export default SocialMedia