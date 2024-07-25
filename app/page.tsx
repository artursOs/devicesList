'use client'

import type { Device } from '@/types/devices'
import { Suspense, useState } from 'react'
import { useGetJsonData } from '@/hooks/useGetJsonData'
import { useGetUrlProductsState } from '@/hooks/useGetUrlProdutcsState'
import { useIsThumbnailsView } from '@/hooks/useVIewSwitch'
import { FilteringNav } from '@/app/components/filteringNav'
import { Loader } from '@/app/components/loader'
import { NotFound } from '@/app/components/notFound'
import { TableView } from '@/app/components/view.table'
import { ThumbnailView } from '@/app/components/view.thumbnail'

function Body({ devices }: { devices?: Device[] }) {
  const productsSelected = useGetUrlProductsState()
  const isThumbnailView = useIsThumbnailsView()
  const [filtered, setFiltered] = useState<Device[] | undefined>(devices)

  const _devices = productsSelected.length
    ? filtered?.filter(item => productsSelected.includes(item.line.id))
    : filtered

  return (
    <>
      <FilteringNav devices={_devices} setFiltered={setFiltered} />
      <div className="my-4 h-full grow overflow-auto">
        {!_devices?.length ? (
          <NotFound />
        ) : isThumbnailView ? (
          <ThumbnailView devices={_devices} />
        ) : (
          <TableView devices={_devices} />
        )}
      </div>
    </>
  )
}

export default function PageIndex() {
  const { data, isLoading } = useGetJsonData()

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-hidden px-8">
      <Suspense fallback={<FilteringNav devices={[]} />}>
        <Body devices={data?.devices} />
      </Suspense>
    </div>
  )
}
