import type { Device } from '@/src/types/devices'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import GridViewIco from '@/public/gridView.svg'
import ListViewIco from '@/public/listView.svg'
import { useGetJsonData } from '@/src/hooks/useGetJsonData'
import { cn } from '@/src/lib/utils'
import { Search } from 'lucide-react'
import { ChangeEvent, PropsWithChildren, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { ProductFilterPopover } from '@/app/components/productLinePopover'

function SearchInput({
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

  return (
    <div className="flex h-16 items-center justify-start gap-4">
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="w-[320px] bg-[#F6F6F8] pl-12 outline-primary-6 hover:bg-neutral-3 focus:outline-1"
          onChange={onChange}
        />
      </div>
      {isPending && <Spinner />}
      <span className="text-xs text-neutral-4">{count} Devices</span>
    </div>
  )
}

function IcoLink({ href, children }: PropsWithChildren<{ href: string }>) {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const link = href + (searchParams ? '?' + searchParams.toString() : '')

  return (
    <Link
      href={link}
      className={cn(
        'rounded p-1.5 outline-1 outline-primary-6 transition-colors hover:bg-neutral-2 focus:border-primary-6',
        href === pathName ? 'bg-neutral-1 [&_svg]:text-primary' : '[&_svg]:text-[#838691]'
      )}
    >
      {children}
    </Link>
  )
}

export function FilteringNav({
  devices,
  setFiltered
}: {
  setFiltered: (device: Device[] | undefined) => void
  devices?: Device[]
}) {
  return (
    <div className="flex flex-wrap items-center justify-between">
      <SearchInput count={devices?.length || 0} setFiltered={devices => setFiltered(devices)} />

      <div className="flex items-center gap-1">
        <IcoLink href="/">
          <GridViewIco />
        </IcoLink>
        <IcoLink href="/thumbnailView">
          <ListViewIco />
        </IcoLink>
        <ProductFilterPopover />
      </div>
    </div>
  )
}
