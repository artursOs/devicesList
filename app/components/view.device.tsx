'use client'

import type { Device } from '@/types/devices'
import { ChevronLeft } from 'lucide-react'
import { useDevicePushToUrl } from '@/hooks/useGetDevice'
import { useGetJsonData } from '@/hooks/useGetJsonData'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Loader } from '@/app/components/loader'
import { NotFound } from '@/app/components/notFound'
import { ProductImage } from '@/app/components/productImage'

function BackButton() {
  const { handleDeviceView } = useDevicePushToUrl()

  return (
    <Button
      onClick={() => {
        handleDeviceView()
      }}
      variant="ghost"
      className="h-[28px] px-1 text-sm text-black text-opacity-45 shadow"
    >
      <ChevronLeft width={20} height={20} />
      Back
    </Button>
  )
}

function InfoLine({ label, text }: { label: string; text: string }) {
  if (!text) {
    return null
  }

  return (
    <div className="flex flex-col flex-wrap justify-between py-2 text-sm text-opacity-85 sm:min-w-[400px] sm:flex-row sm:items-center sm:gap-8">
      <div className="whitespace-nowrap text-black text-opacity-85">{label}</div>
      <div className="text-black text-opacity-45 sm:text-right">{text}</div>
    </div>
  )
}

function DetailsJsonDialog({ device }: { device: Device }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="px-0">
          See All Details as JSON
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>

        <div className="max-h-[80dvh] overflow-y-scroll whitespace-pre text-xs">
          {JSON.stringify(device, undefined, 4)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InfoBody({ id }: { id: string }) {
  const { data, isLoading } = useGetJsonData()

  if (isLoading) {
    return <Loader />
  }

  const device = data?.devices.find(device => device.id === id)

  if (!device) {
    return <NotFound />
  }

  return (
    <article className="mt-7 flex items-start justify-center gap-8">
      <div className="">
        <div className="mb-10 h-full bg-neutral-1">
          <ProductImage device={device} size={260} />
        </div>
      </div>
      <div>
        <h1 className="mb-2 text-2xl font-bold">{device.product.name}</h1>
        <h4 className="mb-5 text-sm text-black text-opacity-45">{device.line.name}</h4>
        <InfoLine label="Product line" text={device.line.name} />
        <InfoLine label="ID" text={device.line.id} />
        <InfoLine label="Name" text={device.product.name} />
        <InfoLine label="Short Name" text={device.shortnames.join(', ')} />
        <InfoLine label="Max. Power" text={device.line.name} />
        <InfoLine label="Speed" text={device?.unifi?.network?.ethernetMaxSpeedMegabitsPerSecond} />
        <InfoLine label="Number of ports" text={device?.unifi?.network?.numberOfPorts} />
        <DetailsJsonDialog device={device} />
      </div>
    </article>
  )
}

export function DeviceView({ id }: { id: string }) {
  return (
    <div className="flex h-full w-full flex-col px-8 py-4">
      <div>
        <BackButton />
      </div>
      <InfoBody id={id} />
    </div>
  )
}
