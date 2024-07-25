'use client'

import type { Device } from '@/types/devices'
import { useDevicePushToUrl } from '@/hooks/useGetDevice'
import { ProductImage } from '@/app/components/productImage'

function Thumbnail({ device }: { device: Device }) {
  const { handleDeviceView } = useDevicePushToUrl()

  return (
    <article
      onClick={() => {
        handleDeviceView(device.id)
      }}
      className="group relative flex min-h-[172px] w-[216px] cursor-pointer flex-col rounded-lg border border-neutral-3"
    >
      <span className="absolute right-2 top-2 text-xs text-primary-6">{device.line.name}</span>
      <div className="mx-auto flex w-full justify-center rounded-t-lg bg-neutral-1 group-hover:bg-neutral-2">
        <ProductImage device={device} size={100} />
      </div>
      <div className="flex grow flex-col justify-between gap-1 p-2 group-hover:bg-neutral-1">
        <div className="text-sm text-black text-opacity-85">{device.product.name}</div>
        <div className="text-xs text-black text-opacity-45">{device.shortnames.join(', ')}</div>
      </div>
    </article>
  )
}

export function ThumbnailView({ devices }: { devices: Device[] }) {
  return (
    <section className="my-4 flex flex-row flex-wrap gap-4 overflow-auto">
      {devices.map(device => (
        <Thumbnail key={device.id} device={device} />
      ))}
    </section>
  )
}
