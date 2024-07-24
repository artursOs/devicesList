import type { Device } from '@/src/types/devices'
import { useQuery } from '@tanstack/react-query'

const endPoint = 'https://static.ui.com/fingerprint/ui/public.json'

export function useGetJsonData() {
  return useQuery({
    queryKey: [endPoint],
    queryFn: async (): Promise<{ devices: Array<Device>; version: string }> => {
      const response = await fetch(endPoint)
      return await response.json()
    }
  })
}
