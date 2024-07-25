import type { Device } from '@/types/devices'
import { ProductFilterPopover } from '@/app/components/filter.productPopover'
import { FilterTermInput } from '@/app/components/filter.termInput'
import { FilterViewSwitch } from '@/app/components/filter.viewSwitch'

export function FilteringNav({
  devices,
  setFiltered
}: {
  setFiltered?: (device?: Device[]) => void
  devices?: Device[]
}) {
  return (
    <div className="flex flex-wrap items-center justify-between">
      <FilterTermInput
        count={devices?.length || 0}
        setFiltered={devices => setFiltered?.(devices)}
      />

      <div className="flex items-center gap-1">
        <FilterViewSwitch />
        <ProductFilterPopover />
      </div>
    </div>
  )
}
