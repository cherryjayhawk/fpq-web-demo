import { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { columns } from "@/components/admin/columns"
import { DataTable } from "@/components/admin/data-table"
import { invoiceSchema } from "./data/schema"

export const metadata: Metadata = {
  title: "Daftar Donasi",
  description: "An invoices tracker.",
}

async function getData() {
  try {
    const res = await fetch(`${process.env.WEBSERVICE_URL}invoices`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "X-API-KEY": `${process.env.API_KEY}`,
      },
      next: { revalidate: 5 },
    })
    
    if (!res.ok) {
      return { data: []}
    }
    
    return res.json()
  } catch (error) {
    console.error(error)
    return { data: []}
  }
}

export default async function Invoices() {
  const data: any = await getData()

  return (
    <>
      <div className="hidden min-h-dvh flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center justify-start space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Daftar Donasi</h2>
          </div>
        </div>
        <DataTable data={data.data} columns={columns} />
      </div>
    </>
  )
}
