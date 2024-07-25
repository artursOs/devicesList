import type { Device } from '@/types/devices'
import type { ChangeEvent, FocusEvent } from 'react'
import { Search } from 'lucide-react'
import { useTransition } from 'react'
import { useGetJsonData } from '@/hooks/useGetJsonData'
import { useSearchTermProduct } from '@/hooks/useSearchTermUrl'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

export function FilterTermInput({
  count,
  setFiltered
}: {
  setFiltered: (device: Device[] | undefined) => void
  count: number
}) {
  const { data } = useGetJsonData()
  const [isPending, startTransition] = useTransition()
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value?.toLowerCase()

    if (!value) {
      setFiltered(data?.devices)
      return
    }

    startTransition(() => {
      const occurrences = data?.devices.filter(({ shortnames, product, line }) => {
        const hasShortName = shortnames?.some(shortName =>
          shortName?.toLowerCase()?.includes(value)
        )
        const hasProductName = product?.name?.toLowerCase()?.includes(value)
        const hasDeviceLine = line?.name?.toLowerCase()?.includes(value)
        return hasShortName || hasProductName || hasDeviceLine
      })

      setFiltered(occurrences)
    })
  }

  const { handleTermUpdate } = useSearchTermProduct()

  function onBlurHandler(e: FocusEvent<HTMLInputElement>) {
    handleTermUpdate(e.target.value)
  }

  return (
    <div className="flex h-16 items-center justify-start gap-4">
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="w-[320px] bg-[#F6F6F8] pl-12 outline-primary-6 hover:bg-neutral-3 focus:outline-1"
          onChange={onChange}
          onBlur={onBlurHandler}
        />
      </div>
      {isPending && <Spinner />}
      <span className="text-xs text-neutral-4">{count} Devices</span>
    </div>
  )
}
