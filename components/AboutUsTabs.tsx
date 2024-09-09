import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "./ui/separator"
import WakafMushaf from "./WakafMushaf"
import PesantrenTujuan from "@/components/PesantrenTujuan"
import PengajarTujuan from "./PengajarTujuan"

function AboutUsTabs() {
  return (
    <Tabs defaultValue="wakaf">
        <TabsList className="min-w-72 rounded-none h-fit">
            <TabsTrigger value="wakaf" className="w-full p-4">Wakaf Mushaf</TabsTrigger>
            <Separator className="hidden md:block" />
            <TabsTrigger value="rekomendasi-pesantren" className="w-full p-4">Pesantren Tujuan</TabsTrigger>
            <Separator className="hidden md:block" />
            <TabsTrigger value="rekomendasi-pengajar" className="w-full p-4">Pengajar Tujuan</TabsTrigger>
        </TabsList>
        <TabsContent value="wakaf">
            <WakafMushaf />
        </TabsContent>
        <TabsContent value="rekomendasi-pesantren">
            <PesantrenTujuan />
        </TabsContent>
        <TabsContent value="rekomendasi-pengajar">
            <PengajarTujuan />
        </TabsContent>
    </Tabs>
  )
}

export default AboutUsTabs