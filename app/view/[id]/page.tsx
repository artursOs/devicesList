import type { Device } from '@/types/devices'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { fetchDevices } from '@/api/api.devices'
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
import { BackButton } from '@/app/view/[id]/components/backBtn'

function InfoLine({ label, text }: { label: string; text: string }) {
  if (!text) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-8 py-2 text-sm text-opacity-85 sm:min-w-[400px]">
      <div className="whitespace-nowrap text-black text-opacity-85">{label}</div>
      <div className="text-right text-black text-opacity-45">{text}</div>
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

async function InfoBody({ id }: { id: string }) {
  const payload = await fetchDevices()
  const device = payload?.devices.find(device => device.id === id)

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

export default function View(props: { params: { id: string } }) {
  if (!props.params.id) {
    redirect('/404')
  }

  return (
    <div className="flex h-full w-full flex-col px-8 py-4">
      <div>
        <BackButton />
      </div>
      <Suspense fallback={<Loader />}>
        <InfoBody id={props.params.id} />
      </Suspense>
    </div>
  )
}
