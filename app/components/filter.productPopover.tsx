'use client'

import { cn } from '@/src/lib/utils'
import { useGetJsonData } from '@/hooks/useGetJsonData'
import { useProductUrlState } from '@/hooks/useGetUrlProdutcsState'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

function Item({
  label,
  id,
  checked,
  onClick
}: {
  onClick: (id: string) => void
  id: string
  label: string
  checked: boolean
}) {
  return (
    <div className="flex items-center gap-2 px-2">
      <Checkbox id={id} checked={checked} onClick={() => onClick(id)} />
      <label htmlFor={id} className="cursor-pointer text-sm text-black text-opacity-65">
        {label}
      </label>
    </div>
  )
}

export function ProductFilterPopover() {
  const { handleProductsUpdate, productsArr } = useProductUrlState()
  const selectedValues = new Set<string>(productsArr)

  const { data } = useGetJsonData()
  const res: Record<string, string> =
    data?.devices.reduce((acc, item) => {
      return {
        ...acc,
        [item.line.id]: item.line.name
      }
    }, {}) || {}

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            `h-auto p-1.5 text-black text-opacity-45 data-[state=open]:bg-neutral-1 data-[state=open]:text-primary-6`,
            `${productsArr.length ? 'bg-neutral-1 text-primary-6' : ''}`
          )}
        >
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] px-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-bold leading-none text-black text-opacity-85">
              Product line
            </h4>
          </div>

          <div className="flex max-h-80 flex-col gap-2 overflow-y-scroll">
            {Object.keys(res)?.map(id => (
              <Item
                key={id}
                label={res[id]}
                checked={selectedValues.has(id)}
                id={id}
                onClick={id => {
                  if (selectedValues.has(id)) {
                    selectedValues.delete(id)
                  } else {
                    selectedValues.add(id)
                  }

                  const values = Array.from(selectedValues)?.filter(Boolean)
                  handleProductsUpdate(values)
                }}
              />
            ))}
          </div>
          <span
            className="cursor-pointer text-sm text-[#F03A3E] text-opacity-85"
            onClick={() => {
              selectedValues.clear()
              const values = Array.from(selectedValues)?.filter(Boolean)
              handleProductsUpdate(values)
            }}
          >
            Reset
          </span>
        </div>
      </PopoverContent>
    </Popover>
  )
}
