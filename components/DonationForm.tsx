'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { currencyFormatter } from './functions/currencyFormat'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { Label } from './ui/label'
import Image from 'next/image'
import isMobilePhone from "validator/lib/isMobilePhone"

const FormDataSchema = z.object({
    fullname: z.string().min(3, "Nama harus 3 atau lebih karakter."),
    email: z.string().min(3, 'Alamat email harus diisi.').email('Alamat email tidak valid'),
    phone: z.string().refine(isMobilePhone, { message: "Nomor tidak valid" }),
    note: z.string().max(225),
    GN_amount: z.string(),
})

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
  {
    id: 'Langkah 1',
    name: 'Nominal',
    fields: ['GN_amount']
  },
  {
    id: 'Langkah 2',
    name: 'Data Diri',
    fields: ['fullname', 'email', 'phone', 'note']
  },
  { id: 'Langkah 3', name: 'Pembayaran' }
]

export default function DonationForm() {
  const [open, setOpen] = useState(false)
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const [bayar, setBayar] = useState(false)

  const price = {
    QB_price: 89000,
    QK_price: 69000
  }
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [QB_quantity, setQB_quantity] = useState(0)
  const [QB_amount, setQB_amount] = useState(0)
  const [QK_quantity, setQK_quantity] = useState(0)
  const [QK_amount, setQK_amount] = useState(0)
  const [GN_amount, setGN_amount] = useState(0)
  const [total, setTotal] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setBayar(true)
    const {        
      GN_amount,
      ...r
    } = data

    const requestBody = {
      ...r,
      items: {
        QB_quantity: QB_quantity, 
        QB_price: price.QB_price,
        QB_amount: QB_amount, 
        QK_quantity: QK_quantity, 
        QK_price: price.QK_price,
        QK_amount: QK_amount,
        GN_amount: Number(GN_amount),
      },
      total: total
    }

    const res = await fetch(`/api/invoices`, {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    })
    const invoice = await res.json()
    setBayar(false)
    if (!invoice.success) {
      alert("Terjadi Kesalahan. Pembayaran tidak dapat diproses.")
      setOpen(false)
      setCurrentStep(0)
      setPreviousStep(0)
    }
    reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  const resetDefault = () => {
    setFullname('')
    setEmail('')
    setPhone('')
    setNote('')
    setQB_quantity(0)
    setQB_amount(0)
    setQK_quantity(0)
    setQK_amount(0)
    setGN_amount(0)
    setTotal(0)
    setPreviousStep(0)
    setCurrentStep(0)
  }

  useEffect(() => {
    setQB_amount(QB_quantity * price.QB_price)
  }, [QB_quantity, price.QB_price])

  useEffect(() => {
    setQK_amount(QK_quantity * price.QK_price)
  }, [QK_quantity, price.QK_price])

  useEffect(() => {
    setTotal(QB_amount + QK_amount + Number(GN_amount))
  }, [QB_amount, QK_amount, GN_amount])

  return (
<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <Button className={'w-full max-w-36 rounded-full px-4 py-2 border-2 border-transparent bg-lime-500 text-white font-bold hover:text-lime-500 hover:border-lime-500 hover:bg-sky-50 md:w-auto'}>Donasi yuk!</Button>
  </AlertDialogTrigger>
  <AlertDialogContent className='overflow-y-scroll h-[90dvh] rounded'>
    <section className='inset-0 flex flex-col justify-start mx-auto p-4 w-full max-w-lg shadow-2xl'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='flex space-x-8 space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-sky-600 transition-colors border-t-4 pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.name}
                  </span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-sky-600 border-t-4 pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600'>
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-gray-200 transition-colors border-t-4 pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <br />
      <hr />

      {/* Form */}
      <form className='py-4' onSubmit={handleSubmit(processForm)}>

        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Nominal
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Pilih opsi wakaf yang tersedia, kemudian klik Lanjut.
            </p>

            <div className='mt-6 flex flex-col gap-x-6 gap-y-4'>
            <Table className='w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-full">Jenis</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex flex-col gap-4 w-full font-medium">
                    <p>Al-Qur&apos;an Sedang (A5)</p>
                    <span>{ currencyFormatter.format(QB_amount) }</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className='flex justify-end items-center gap-4'>
                      <MinusCircle opacity={0.8} color={`${QB_quantity === 0 ? 'gray' : 'black'}`} className={`cursor-pointer ${QB_quantity === 0 && 'disabled'}`} onClick={() => QB_quantity > 0 && setQB_quantity(QB_quantity - 1)} />
                          <span>{ QB_quantity }</span>
                      <PlusCircle opacity={0.8} className='cursor-pointer' onClick={() => setQB_quantity(QB_quantity + 1)} />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-col gap-4 w-full font-medium">
                    <p>Al-Qur&apos;an Kecil (A6)</p>
                    <span>{ currencyFormatter.format(QK_amount) }</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className='flex justify-end gap-4'>
                      <MinusCircle opacity={0.8} color={`${QK_quantity === 0 ? 'gray' : 'black'}`} className={`cursor-pointer ${QB_quantity === 0 && 'disabled'}`} onClick={() => QK_quantity > 0 && setQK_quantity(QK_quantity - 1)} />
                          <span>{ QK_quantity }</span>
                      <PlusCircle opacity={0.8} className='cursor-pointer' onClick={() => setQK_quantity(QK_quantity + 1)} />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-col gap-4 w-full font-medium">
                    <Label htmlFor='GN_amount'>
                      Pengajar Al-Qur&apos;an
                    </Label>
                    <div className='flex'>
                      <span className='rounded-l-md rounded-r-none border-2 border-r-0 bg-slate-200 w-12 h-10 flex justify-center items-center'>Rp</span>
                      <Input
                        type='number'
                        id='GN_amount'
                        {...register('GN_amount')}
                        autoComplete='given-name'
                        step={1000}
                        min={0}
                        placeholder={'0'}
                        value={GN_amount === 0 ? '' : GN_amount}
                        onChange={e => setGN_amount(Number(e.target.value))}
                        className='block w-full rounded-l-none rounded-r-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>
                    <Label htmlFor='total' className='font-bold'>
                      Total
                    </Label>
                    <div className='flex'>
                      <span>{ currencyFormatter.format(total) }</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Data Diri
            </h2>
            <p className='mt-1 mb-4 text-sm leading-6 text-gray-600'>
              Lengkapi data berikut untuk berdonasi, kemudian klik Bayar.
            </p>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='fullname'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Nama Lengkap
                </label>
                <div className='mt-2'>
                  <Input
                    type='text'
                    id='fullname'
                    {...register('fullname')}
                    value={fullname}
                    placeholder='Nama lengkap'
                    onChange={e => setFullname(e.target.value)}
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.fullname?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.fullname?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Alamat Email 
                </label>
                <div className='mt-2'>
                  <Input
                    id='email'
                    type='email'
                    {...register('email')}
                    value={email}
                    placeholder='email@provider.com'
                    onChange={e => setEmail(e.target.value)}
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.email?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Nomor Telepon <span className='text-gray-400'>(whatsapp)</span>
                </label>
                <div className='mt-2'>
                  <Input
                    id='phone'
                    type='tel'
                    {...register('phone')}
                    value={phone}
                    placeholder='081234567890'
                    onChange={e => setPhone(e.target.value)}
                    autoComplete='phone'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.phone?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='note'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Catatan <span className='text-gray-400'>(opsional)</span>
                </label>
                <div className='mt-2'>
                  <Textarea
                    id='note'
                    maxLength={225}
                    {...register('note')}
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    autoComplete='family-name'
                    placeholder='Contoh: Mohon cantumkan wakaf atas nama ayah saya Alm. [nama], dan salurkan pada pesantren [nama]'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.note?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.note?.message}
                    </p>
                  )}
                </div>
              </div>
              <p className='text-xs text-gray-400 mt-4'>simbol (=), (*), (;) tidak diperkenankan.</p>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Pembayaran
            </h2>
            <p className='mt-1 mb-4 text-sm leading-6 text-gray-600'>
              Mohon pindai barcode di bawah untuk membayar.
            </p>
            <p className='mt-1 text-center text-sm leading-6 text-gray-600'>
              Nominal yang harus dibayarkan: 
            </p>
            <p className='mb-4 text-center text-sm leading-6 text-gray-700 font-semibold'>
              { currencyFormatter.format(total) } 
            </p>
            <Image src={'/barcode.jpg'} width={700} height={1000} alt='Forum Pelayan Quran Barcode' />
            <br />
            <p className='text-sm text-center'>Pembayaran anda akan kami konfirmasi secara manual.</p>
            <p className='text-sm text-center'>Mohon untuk menunggu...</p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className={`flex ${currentStep === 2 ? 'flex-col gap-4' : 'justify-between'}`}>
          {
            currentStep === 0  && (
              <AlertDialogCancel asChild>
                <Button 
                  type='button'
                  onClick={prev}
                  className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Tutup
                </Button>
              </AlertDialogCancel>
            ) 
          }
          {
            currentStep === 1  && (
                <Button 
                  type='button'
                  onClick={prev}
                  disabled={bayar}
                  className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Kembali
                </Button>
            ) 
          }
          {
            currentStep === 2  && (
              <AlertDialogCancel asChild>
                <Button
                  onClick={resetDefault}
                  type='button'
                  className='rounded px-2 py-1 text-sm font-semibold text-sky-50 bg-slate-950 hover:text-slate-900 shadow-sm hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Selesai
                </Button>
              </AlertDialogCancel>
            ) 
          }
          {
            currentStep !== 2  && (
              <Button
                type='button'
                onClick={next}
                disabled={currentStep === steps.length - 1 || total === 0 || bayar}
                className='rounded px-2 py-1 text-sm font-semibold text-sky-50 hover:text-slate-900 shadow-sm ring-1 ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
              >
                { currentStep === 0 ? 'Lanjut' : 'Bayar' }
              </Button>
            )
          }
        </div>
      </div>
    </section>
    </AlertDialogContent>
</AlertDialog>
  )
}