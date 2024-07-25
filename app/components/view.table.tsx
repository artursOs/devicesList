'use client'

import type { Device } from '@/types/devices'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { forwardRef, useState } from 'react'
import { TableVirtuoso } from 'react-virtuoso'
import { useDevicePushToUrl } from '@/hooks/useGetDevice'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ProductImage } from '@/app/components/productImage'

const columns: ColumnDef<Device>[] = [
  {
    id: 'img',
    size: 36,
    cell: ({ row }) => {
      return <ProductImage device={row.original} size={22} />
    }
  },
  {
    id: 'pLine',
    header: function HeaderCell() {
      return <span>Product Line</span>
    },
    cell: ({ row }) => {
      return (
        <p className="whitespace-nowrap text-black text-opacity-85">
          {row.original?.product?.name}
        </p>
      )
    }
  },
  {
    id: 'name',
    header: function HeaderCell() {
      return <span>Name</span>
    },
    cell: ({ row }) => {
      return (
        <p className="whitespace-nowrap text-black text-opacity-45">
          {row.original?.product?.name}
        </p>
      )
    }
  }
]

export function TableView<T extends Device>({ devices }: { devices: T[] }) {
  const { handleDeviceView } = useDevicePushToUrl()
  const table = useReactTable({
    data: devices,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const { rows } = table.getRowModel()
  const [isScrolling, setIsScrolling] = useState(false)

  return (
    <TableVirtuoso
      isScrolling={setIsScrolling}
      totalCount={devices.length}
      fixedHeaderContent={() =>
        table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id} className={`${isScrolling ? 'shadow' : ''}`}>
            {headerGroup.headers.map(header => (
              <TableHead key={header.id} className="bg-white">
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))
      }
      components={{
        Table: props => {
          return <Table {...props} className="w-full" />
        },

        TableHead: forwardRef(function TableHead(props, ref) {
          return <TableHeader {...props} ref={ref} />
        }),

        TableBody: forwardRef(function TBODY(props, ref) {
          return <TableBody ref={ref} {...props} />
        }),

        TableRow: props => {
          const row = rows[props['data-index']]
          return (
            <TableRow
              {...props}
              className="group"
              onClick={() => {
                handleDeviceView(row.original.id)
              }}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  style={{
                    width: cell.column.getSize() > 50 ? 'auto' : cell.column.getSize()
                  }}
                  className="border-t border-border bg-background text-black group-hover:bg-neutral-2"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          )
        }
      }}
    />
  )
}
