'use client'

import type { Device } from '@/types/devices'
import { Suspense, useState } from 'react'
import { useGetDeviceId } from '@/hooks/useGetDevice'
import { useGetJsonData } from '@/hooks/useGetJsonData'
import { useGetUrlProductsState } from '@/hooks/useGetUrlProdutcsState'
import { useIsThumbnailsView } from '@/hooks/useVIewSwitch'
import { ProductFilterPopover } from '@/app/components/filter.productPopover'
import { FilterTermInput } from '@/app/components/filter.termInput'
import { FilterViewSwitch } from '@/app/components/filter.viewSwitch'
import { Loader } from '@/app/components/loader'
import { NotFound } from '@/app/components/notFound'
import { DeviceView } from '@/app/components/view.device'
import { TableView } from '@/app/components/view.table'
import { ThumbnailView } from '@/app/components/view.thumbnail'

function Body({ devices }: { devices?: Device[] }) {
  const productsSelected = useGetUrlProductsState()
  const isThumbnailView = useIsThumbnailsView()
  const [filtered, setFiltered] = useState<Device[] | undefined>()
  const [term, setTerm] = useState('')
  const deviceId = useGetDeviceId()
  let _devices = filtered || devices

  _devices = productsSelected.length
    ? _devices?.filter(item => productsSelected.includes(item.line.id))
    : _devices

  if (deviceId) {
    return <DeviceView id={deviceId} />
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <FilterTermInput
          term={term}
          setTerm={setTerm}
          count={_devices?.length || 0}
          setFiltered={devices => setFiltered(devices)}
        />

        <div className="flex items-center gap-1">
          <FilterViewSwitch />
          <ProductFilterPopover />
        </div>
      </div>

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
    <div className="flex h-full w-full flex-col overflow-y-hidden px-4 sm:px-8">
      <Suspense>
        <Body devices={data?.devices} />
      </Suspense>
    </div>
  )
}
