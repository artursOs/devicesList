'use client'

import type { Device } from '@/src/types/devices'
import Link from 'next/link'
import { useGetJsonData } from '@/src/hooks/useGetJsonData'
import { useGetUrlProductsState } from '@/src/hooks/useGetUrlProdutcsState'
import { Suspense, useState } from 'react'
import { FilteringNav } from '@/app/components/filteringNav'
import { Loader } from '@/app/components/loader'
import { NotFound } from '@/app/components/notFound'
import { ProductImage } from '@/app/components/productImage'

function Thumbnail({ device }: { device: Device }) {
  return (
    <Link href={`/view/${device.id}`}>
      <article className="group relative flex min-h-[172px] w-[216px] cursor-pointer flex-col rounded-lg border border-neutral-3">
        <span className="absolute right-2 top-2 text-xs text-primary-6">{device.line.name}</span>
        <div className="mx-auto flex w-full justify-center rounded-t-lg bg-neutral-1 group-hover:bg-neutral-2">
          <ProductImage device={device} size={100} />
        </div>
        <div className="flex grow flex-col justify-between gap-1 p-2 group-hover:bg-neutral-1">
          <div className="text-sm text-black text-opacity-85">{device.product.name}</div>
          <div className="text-xs text-black text-opacity-45">{device.shortnames.join(', ')}</div>
        </div>
      </article>
    </Link>
  )
}

function ThumbnailView() {
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
    <div className="flex h-full w-full flex-col overflow-hidden px-8">
      <FilteringNav devices={devices} setFiltered={setFiltered} />
      {!devices?.length ? (
        <NotFound />
      ) : (
        <section className="my-4 flex flex-row flex-wrap gap-4 overflow-auto">
          {devices.map(device => (
            <Thumbnail key={device.id} device={device} />
          ))}
        </section>
      )}
    </div>
  )
}

export default function PageThumbnail() {
  return (
    <Suspense>
      <ThumbnailView />
    </Suspense>
  )
}
