"use client"

import { useState } from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { useSession } from "next-auth/react"
// @ts-ignore
import { Toaster, toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { dateFormatter } from '@/components/functions/dateFormat'
import { currencyFormatter } from '@/components/functions/currencyFormat'

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { invoiceSchema } from "@/app/dashboard/invoices/data/schema"
import { Label } from "../ui/label"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

const FormSchema = z.object({
  id: z.string({
    required_error: "ID not found.",
  }),
  status: z.string({
      required_error: "Please select status.",
  }),
  priority: z.string({
    required_error: "Please select priority.",
  })
})

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const invoice = invoiceSchema.parse(row.original)
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  // console.log('session', ' ', session?.user?.accessToken)
  

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: invoice.id,
      status: invoice.status,
      priority: invoice.priority
    }
  })
 
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    toast.loading("Memperbarui data wakaf...");

    const { id, status, priority, email, total, fullname, ...rest } = invoice;
    const statusChange = status !== values.status ? true : false

    const requestBody = {
      id: id,
      status: values.status,
      priority: values.priority,
      image: "not-found.webp",
      email,
      total,
      fullname,
      statusChange
    };
    
    const res = await fetch(`/api/invoices`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            // @ts-ignore
            "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        body: JSON.stringify(requestBody)
      })
    const data = await res.json()

    if (data.success) {
      toast.success('Pembaharuan wakaf sukses!');
      // @ts-ignore
      setTimeout(toast.dismiss(), 2000)
    } else {
      toast.error(data.message + ", mohon login ulang.");
      // @ts-ignore
      setTimeout(toast.dismiss(), 4000)
    }
  }

  return (
    <>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        > 
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-dvh overflow-y-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">ID - <span>{ invoice.id }</span></AlertDialogTitle>
          <AlertDialogDescription className="text-center">
              { invoice.fullname } - { invoice.email } <br />
              { dateFormatter(invoice.created_at) } 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Jenis</TableHead>
              <TableHead>Kuantitas</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead className="text-right">Jumlah</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Al-qur&lsquo;an Sedang</TableCell>
              <TableCell>{ invoice.items.QB_quantity }</TableCell>
              <TableCell>{ currencyFormatter.format(invoice.items.QB_price) }</TableCell>
              <TableCell className="text-right">{ currencyFormatter.format(invoice.items.QB_amount) }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Al-qur&lsquo;an Kecil</TableCell>
              <TableCell>{ invoice.items.QK_quantity }</TableCell>
              <TableCell>{ currencyFormatter.format(invoice.items.QK_price) }</TableCell>
              <TableCell className="text-right">{ currencyFormatter.format(invoice.items.QK_amount) }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Pengajar Quran</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">{ currencyFormatter.format(invoice.items.GN_amount) }</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{ currencyFormatter.format(invoice.total) }</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Label htmlFor="note">Catatan</Label>
        <Textarea id="note" disabled value={invoice.note} placeholder="tidak ada catatan" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className="hidden" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent defaultValue={invoice.status}>
                      <SelectItem value="Menunggu Pembayaran"><span className="flex gap-2 items-center"><QuestionMarkCircledIcon />Menunggu Pembayaran</span></SelectItem>
                      <SelectItem value="Pembayaran Diverifikasi"><span className="flex gap-2 items-center"><CircleIcon />Pembayaran Diverifikasi</span></SelectItem>
                      <SelectItem value="Naik Cetak"><span className="flex gap-2 items-center"><StopwatchIcon />Naik Cetak</span></SelectItem>
                      <SelectItem value="Selesai Cetak"><span className="flex gap-2 items-center"><CheckCircledIcon />Selesai Cetak</span></SelectItem>
                      <SelectItem value="Dikirim"><span className="flex gap-2 items-center"><CrossCircledIcon />Dikirim</span></SelectItem>
                      <SelectItem value="Diterima"><span className="flex gap-2 items-center"><CrossCircledIcon />Diterima</span></SelectItem>
                      <SelectItem value="Dibatalkan"><span className="flex gap-2 items-center"><CrossCircledIcon />Dibatalkan</span></SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioritas</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent defaultValue={invoice.priority}>
                      <SelectItem value="Tinggi"><span className="flex gap-2 items-center"><ArrowUpIcon />Tinggi</span></SelectItem>
                      <SelectItem value="Sedang"><span className="flex gap-2 items-center"><ArrowRightIcon />Sedang</span></SelectItem>
                      <SelectItem value="Rendah"><span className="flex gap-2 items-center"><ArrowDownIcon />Rendah</span></SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <AlertDialogCancel>Kembali</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit" className="bg-lime-500 border-2 border-transparent hover:border-lime-500 hover:bg-white hover:text-lime-500">Simpan</Button>
              </AlertDialogAction>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
    <Toaster richColors />
    </>
  )
}