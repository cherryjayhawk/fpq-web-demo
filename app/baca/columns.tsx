'use client'

import { ColumnDef } from '@tanstack/react-table'
import { categories } from './categories'
import { IArticleCard } from './interface'

export const columns: ColumnDef<IArticleCard>[] = [
    {
      accessorKey: "blog",
      header: "Blog",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = categories.find(
          (category) => category.value === row.getValue("category")
        )
  
        if (!category) {
          return null
        }
  
        return (
          <div className="flex w-[100px] items-center">
            <span>{category.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "title",
      header: "Title",
    },
  ]