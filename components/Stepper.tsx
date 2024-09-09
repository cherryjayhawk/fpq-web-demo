"use client"

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { XCircleIcon } from 'lucide-react';
import { dateFormatter } from './functions/dateFormat';
import { logNotNull } from "@/components/functions/logNotNull"

export default function VerticalLinearStepper({ row }: { row: any}) {
  const [activeStep, setActiveStep] = useState(logNotNull(row.original.updated_list));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        > 
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col justify-start max-w-sm min-h-[60dvh] rounded px-12'>
        <DialogHeader>
          <DialogTitle className='text-cyan-500 text-lg text-center'>Riwayat Wakaf</DialogTitle>
        </DialogHeader>
        {
          !row.original.canceled ? (
            <Box sx={{ maxWidth: 400 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {row.original.updated_list.map((step: any, index: number) => (
                  <Step key={index} >
                    <StepLabel
                      optional={
                          <Typography variant="caption" className={`${ index <= activeStep ? 'text-cyan-600' : '' }`}>{ index < activeStep && step.updated_at !== null ? dateFormatter(step.updated_at) : 'Menunggu...' }</Typography>
                      }
                    >
                      {step.invoice_status}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep + 1 === row.original.updated_list.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>Wakaf telah sampai dan diterima di tujuan.</Typography>
                </Paper>
              )}
            </Box>
          ) : (
            <div className='flex flex-col justify-start items-center mt-16'>
              <XCircleIcon size={96} color="#a51818" />
              <p className='font-semibold text-red-700'>Dibatalkan</p>
              <p className='mt-12 text-center text-sm'>Mohon hubungi kami untuk informasi lebih lanjut.</p>
            </div>
          )
        }
      </DialogContent>
    </Dialog>
  );
}
