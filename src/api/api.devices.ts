import { Device } from '@/types/devices'

export async function fetchDevices(): Promise<
  { devices: Array<Device>; version: string } | undefined
> {
  try {
    const request = await fetch('https://static.ui.com/fingerprint/ui/public.json')
    return await request.json()
  } catch {
    //
  }
}
