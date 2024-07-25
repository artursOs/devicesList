'use client'

import type { Device } from '@/types/devices'
import Image from 'next/image'

function buildImgUrl(id: string, imgDef: string, size: number): string {
  return `https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${id}/default/${imgDef}.png&w=${size}&q=75`
}

export function ProductImage({ device, size }: { size: number; device: Device }) {
  if (!device) {
    return null
  }

  const img = buildImgUrl(device.id, device.images.default, size)
  return (
    <Image
      priority={false}
      unoptimized={true}
      src={img}
      height={size}
      width={size}
      alt={device.product.name}
    />
  )
}
