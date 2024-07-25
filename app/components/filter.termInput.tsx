import type { Device } from '@/types/devices'
import type { ChangeEvent } from 'react'
import { Search } from 'lucide-react'
import { useTransition } from 'react'
import { useGetJsonData } from '@/hooks/useGetJsonData'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

export function FilterTermInput({
  count,
  term,
  setTerm,
  setFiltered
}: {
  term: string
  setTerm: (V: string) => void
  setFiltered: (device: Device[] | undefined) => void
  count: number
}) {
  const { data } = useGetJsonData()
  const [isPending, startTransition] = useTransition()

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value?.toLowerCase()
    setTerm(value)

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

  return (
    <div className="flex h-16 items-center justify-start gap-4">
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-muted-foreground" />
        <Input
          value={term || ''}
          placeholder="Search"
          className="bg-[#F6F6F8] pl-12 outline-primary-6 hover:bg-neutral-3 focus:outline-1 sm:w-[320px] sm:text-sm"
          onChange={onChange}
        />
      </div>
      {isPending && <Spinner />}
      <span className="text-xs text-neutral-4">{count} Devices</span>
    </div>
  )
}
