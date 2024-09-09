"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/admin/data-table-view-options"
import { priorities, statuses } from "../../app/dashboard/invoices/data/data"
import { categories } from "@/app/baca/categories"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  usage?: string
}

export function DataTableToolbar<TData>({
  table,
  usage
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {
          usage === 'penyaluran' ? (
            <Input
            placeholder="Cari nama wakif"
            value={(table.getColumn("fullname")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("fullname")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />    
          ) : (usage === 'artikel' ? (
            <Input
            placeholder="Cari artikel"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />    
          ) :
            <Input
              placeholder="Cari email"
              value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
            />
          )
        }
        {/* Filter */}
        {usage !== 'penyaluran' ? (
           usage === 'artikel' && table.getColumn("category") && (
              <DataTableFacetedFilter
                column={table.getColumn("category")}
                title="Kategori"
                options={categories}
              />)
        ) : (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {usage !== 'penyaluran' && usage !== 'artikel' && table.getColumn("priority") && (
          <>
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Prioritas"
              options={priorities}
            />
          </>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* View */}
      {
        usage === 'penyaluran' ? (
          <Popover>
            <PopoverTrigger>
              <HelpCircle color="#6b7280" className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="text-sm">Setiap pembaharuan status penyaluran akan kami informasikan ke email Anda.</PopoverContent>
          </Popover>
        ) : (usage === 'artikel' ? '' :
          <DataTableViewOptions table={table} />
        )
      }
    </div>
  )
}