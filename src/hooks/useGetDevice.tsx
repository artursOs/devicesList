import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const DEVICE_KEY = 'deviceId'

export function useGetDeviceId() {
  const searchParams = useSearchParams()
  return searchParams.get(DEVICE_KEY)
}

export function useDevicePushToUrl() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleDeviceView(value?: string) {
    const newParams = new URLSearchParams(searchParams.toString())

    if (!value) {
      newParams.delete(DEVICE_KEY)
    } else {
      newParams.set(DEVICE_KEY, value)
    }

    router.push(pathname + '?' + newParams.toString())
  }

  return { handleDeviceView }
}
