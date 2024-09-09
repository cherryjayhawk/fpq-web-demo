import { NextResponse } from "next/server"
import { headers } from 'next/headers'
import { sendMail } from "@/lib/mail"
import { template } from "@/components/functions/template"
import { currencyFormatter } from "@/components/functions/currencyFormat"

const subjects = {
    menunggu_pembayaran: "Wakaf menunggu pembayaran",
    pembayaran_diverifikasi: "Pembayaran diverifikasi",
    naik_cetak: "Wakaf Al-Qur'an naik cetak",
    selesai_cetak: "Wakaf Al-Qur'an naik cetak",
    dikirim: "Wakaf dikirim ke tujuan",
    diterima: "Wakaf telah diterima di tujuan",
    dibatalkan: "Wakaf dibatalkan"
}

function getSubject(status: string) {
    switch (status) {
        case "Menunggu Pembayaran":
            return subjects.menunggu_pembayaran
            break;
        case "Pembayaran Diverifikasi":
            return subjects.pembayaran_diverifikasi
            break;
        case "Naik Cetak":
            return subjects.naik_cetak
            break;
        case "Selesai Cetak":
            return subjects.selesai_cetak
            break;
        case "Dikirim":
            return subjects.dikirim
            break;
        case "Diterima":
            return subjects.diterima
            break;
        case "Dibatalkan":
            return subjects.dibatalkan
            break;
        default:
            return subjects.pembayaran_diverifikasi
            break;
    }
}

export async function PUT(request: Request){
    const header = headers()
    const body = await request.json()
    console.log("body: ", body)

    const subject = getSubject(body.status)
    const { id, fullname, email, total, statusChange, image } = await body

    const res = await fetch(`${process.env.WEBSERVICE_URL}invoices/${body.id}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-API-KEY": `${process.env.API_KEY}`,
            "Authorization": `${header.get('authorization')}`
        },
        body: JSON.stringify(body)
    })

    const data = await res.json()

    console.log("data: ", data)

    if (res.ok && statusChange) {
        await sendMail({
            to: email,
            subject: subject,
            body: template(id, body.status, fullname, currencyFormatter.format(total), `${process.env.NEXTAUTH_URL}penyaluran`, subject)
        })
    }

    return NextResponse.json(data)
}

export async function POST(request: Request){
    const header = headers()
    const body = await request.json()

    const res = await fetch(`${process.env.WEBSERVICE_URL}invoices`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-API-KEY": `${process.env.API_KEY}`,
            "Authorization": `${header.get('authorization')}`
        },
        body: JSON.stringify(body)
      })
    const data = await res.json()

    if (res.ok) {
        return NextResponse.json(data)
    } else {
        return NextResponse.json({ success: false})
    }
}