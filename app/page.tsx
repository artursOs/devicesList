'use client'

import type { Device } from '@/src/types/devices'
import { useRouter } from 'next/navigation'
import { useGetJsonData } from '@/src/hooks/useGetJsonData'
import { useGetUrlProductsState } from '@/src/hooks/useGetUrlProdutcsState'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { forwardRef, Suspense, useState } from 'react'
import { TableVirtuoso } from 'react-virtuoso'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { FilteringNav } from '@/app/components/filteringNav'
import { Loader } from '@/app/components/loader'
import { NotFound } from '@/app/components/notFound'
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

function DeviceTable<T extends Device>({
  columns,
  devices
}: {
  columns: ColumnDef<T>[]
  devices: T[]
}) {
  const router = useRouter()
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
                router.push('/view/' + row.original.id)
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

function TableView() {
  const productsSelected = useGetUrlProductsState()
  const { data, isLoading } = useGetJsonData()
  const [filtered, setFiltered] = useState<Device[] | undefined>()

  let devices = filtered || data?.devices || []
  devices = productsSelected.length
    ? devices.filter(item => productsSelected.includes(item.line.id))
    : devices

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex h-full w-full flex-col px-8">
      <FilteringNav devices={devices} setFiltered={setFiltered} />
      <div className="my-4 h-full grow overflow-auto">
        {!devices?.length ? <NotFound /> : <DeviceTable columns={columns} devices={devices} />}
      </div>
    </div>
  )
}

export default function PageIndex() {
  return (
    <Suspense>
      <TableView />
    </Suspense>
  )
}
