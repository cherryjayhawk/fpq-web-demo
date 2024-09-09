"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel, 
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { currencyFormatter } from "../functions/currencyFormat"
import { dateFormatter } from "../functions/dateFormat"
import ArticleCard from "../ArticleCard"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  usage?: string
  className?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  usage,
  className
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  // console.log(table.getRowModel().rows)

  return (
    <div className={`${className} space-y-4`}>
      <DataTableToolbar table={table} usage={usage} />

      <div className="rounded-md border">
        <Table className="bg-transparent">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // console.log(header.getContext().header.id)
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className={`font-bold uppercase ${ usage === 'artikel' ? 'hidden' : ''}`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => 
                (<TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} 
                    className={`${ usage === 'artikel' && (cell.column.id == 'category' || cell.column.id == 'title') ? 'hidden p-0 m-0' : ''}`}>
                      {
                        usage === 'penyaluran' ? 
                          (cell.column.id === 'total' ? 
                            <span className="text-xs md:text-sm">{currencyFormatter.format(cell.renderValue() as number)}</span> :
                            (cell.column.id === 'updated_at' ? 
                              <span className="text-xs md:text-sm">{dateFormatter(cell.renderValue() as Date)}</span> :
                              (cell.column.id === 'actions' ? 
                                <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span> :
                                <span className="text-xs md:text-sm">{cell.renderValue() as React.ReactNode}</span>
                              )
                            )
                          )
                          : (usage === 'artikel' && cell.column.id === 'blog' ? 
                              // @ts-ignore
                              (<ArticleCard data={row.original} key={row.original._id} />)
                              : flexRender(cell.column.columnDef.cell, cell.getContext()))
                      }
                    </TableCell>
                  ))}
                </TableRow>)
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}