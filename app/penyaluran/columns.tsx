'use client'

import { ColumnDef } from '@tanstack/react-table'
import { statuses } from './statuses'
import { IPenyaluran } from './interface'
import VerticalLinearStepper from '@/components/Stepper'

export const columns: ColumnDef<IPenyaluran>[] = [
    {
      accessorKey: "fullname",
      header: "Nama Wakif",
    },
    {
      accessorKey: "total",
      header: "Jumlah",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.value === row.getValue("status")
        )
  
        if (!status) {
          return null
        }
  
        return (
          <div className="flex w-[100px] items-center">
            <span>{status.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "updated_at",
      header: "Update",
    },
    {
      id: "actions",
      // @ts-ignore
      cell: ({ row }) => <VerticalLinearStepper row={row} />,
    },
  ]
