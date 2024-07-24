import { Device } from '@/src/types/devices'

export async function fetchDevices(): Promise<
  { devices: Array<Device>; version: string } | undefined
> {
  try {
    const request = await fetch('https://static.ui.com/fingerprint/ui/public.json')
    const payload = await request.json()

    return payload
  } catch {
    //
  }
}
